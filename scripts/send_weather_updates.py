#!/usr/bin/env python3
"""Send region-specific daily weather notifications through OneSignal."""

from __future__ import annotations

import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import uuid
from datetime import datetime
from typing import Any
from zoneinfo import ZoneInfo


ONESIGNAL_APP_ID = "cd00c6cc-ad14-4246-9cde-4de743ce8238"
ONESIGNAL_API_URL = "https://api.onesignal.com/notifications"
OPEN_METEO_API_URL = "https://api.open-meteo.com/v1/forecast"
APP_URL = "https://mnnsbstn.github.io/istriva/"
ICON_URL = f"{APP_URL}icon-512.png"
LOCAL_TIMEZONE = ZoneInfo("Europe/Zagreb")
SEND_HOURS = (9, 12, 15, 18, 21)

LOCATIONS: dict[str, dict[str, Any]] = {
    "pula": {"name": "Pula", "latitude": 44.8666, "longitude": 13.8496},
    "fazana": {"name": "Fažana & Brijuni", "latitude": 44.927, "longitude": 13.803},
    "medulin": {"name": "Medulin & Kamenjak", "latitude": 44.8225, "longitude": 13.935},
    "rovinj": {"name": "Rovinj", "latitude": 45.0812, "longitude": 13.6387},
    "porec": {"name": "Poreč", "latitude": 45.2272, "longitude": 13.5958},
    "vrsar": {"name": "Vrsar & Lim-Bucht", "latitude": 45.149, "longitude": 13.605},
    "novigrad": {"name": "Novigrad", "latitude": 45.316, "longitude": 13.561},
    "umag": {"name": "Umag & Savudrija", "latitude": 45.431, "longitude": 13.523},
    "labin": {"name": "Labin & Rabac", "latitude": 45.095, "longitude": 14.123},
    "motovun": {"name": "Motovun & Grožnjan", "latitude": 45.336, "longitude": 13.829},
    "buzet": {"name": "Buzet, Roč & Hum", "latitude": 45.409, "longitude": 13.966},
}


def env_flag(name: str) -> bool:
    return os.environ.get(name, "").strip().lower() in {"1", "true", "yes", "on"}


def should_send_now(now: datetime, force: bool = False) -> bool:
    if force:
        return True
    return now.astimezone(LOCAL_TIMEZONE).hour in SEND_HOURS


def request_json(
    url: str,
    *,
    payload: dict[str, Any] | None = None,
    headers: dict[str, str] | None = None,
    attempts: int = 3,
) -> dict[str, Any]:
    body = json.dumps(payload).encode("utf-8") if payload is not None else None
    request_headers = {"Accept": "application/json", **(headers or {})}
    if body is not None:
        request_headers["Content-Type"] = "application/json; charset=utf-8"

    last_error: Exception | None = None

    for attempt in range(attempts):
        request = urllib.request.Request(
            url,
            data=body,
            headers=request_headers,
            method="POST" if body is not None else "GET",
        )
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                return json.load(response)
        except urllib.error.HTTPError as error:
            last_error = error
            retryable = error.code == 429 or error.code >= 500
            if not retryable or attempt == attempts - 1:
                detail = error.read().decode("utf-8", errors="replace")
                raise RuntimeError(f"HTTP {error.code} for {url}: {detail}") from error
            retry_after = error.headers.get("Retry-After")
            delay = int(retry_after) if retry_after and retry_after.isdigit() else (attempt + 1) * 3
            time.sleep(delay)
        except (urllib.error.URLError, TimeoutError) as error:
            last_error = error
            if attempt == attempts - 1:
                raise RuntimeError(f"Request failed for {url}: {error}") from error
            time.sleep((attempt + 1) * 3)

    raise RuntimeError(f"Request failed for {url}: {last_error}")


def fetch_forecast(location: dict[str, Any]) -> dict[str, Any]:
    query = urllib.parse.urlencode(
        {
            "latitude": location["latitude"],
            "longitude": location["longitude"],
            "daily": (
                "weather_code,temperature_2m_max,temperature_2m_min,"
                "precipitation_probability_max,precipitation_sum,"
                "wind_speed_10m_max,wind_gusts_10m_max"
            ),
            "timezone": "Europe/Zagreb",
            "forecast_days": 1,
        }
    )
    return request_json(f"{OPEN_METEO_API_URL}?{query}")


def first_daily_value(forecast: dict[str, Any], key: str) -> float:
    try:
        value = forecast["daily"][key][0]
    except (KeyError, IndexError, TypeError) as error:
        raise ValueError(f"Open-Meteo response is missing daily.{key}[0]") from error
    if value is None:
        raise ValueError(f"Open-Meteo returned no value for daily.{key}[0]")
    return float(value)


def describe_weather(code: int) -> tuple[str, str]:
    if code == 0:
        return "klar", "☀️"
    if code <= 2:
        return "leicht bewölkt", "🌤️"
    if code == 3:
        return "bedeckt", "☁️"
    if code in {45, 48}:
        return "nebelig", "🌫️"
    if 51 <= code <= 67:
        return "regnerisch", "🌧️"
    if 71 <= code <= 77:
        return "winterlich", "🌨️"
    if 80 <= code <= 82:
        return "wechselhaft mit Schauern", "🌦️"
    if code >= 95:
        return "gewittrig", "⛈️"
    return "wechselhaft", "🌤️"


def build_advice(
    send_hour: int,
    *,
    code: int,
    rain_probability: int,
    wind: int,
    gusts: int,
    maximum: int,
) -> str:
    if code >= 95:
        return "Gewitter möglich – Ausflüge flexibel planen."
    if gusts >= 50 or wind >= 35:
        return "Windig – Fähren und Bootstouren bitte prüfen."
    if rain_probability >= 55:
        return "Die Regenoption ist in ISTRIVA vorbereitet."

    if send_hour <= 9:
        if maximum >= 28:
            return "Es wird warm – den Tagesplan am besten früh starten."
        return "Guter Start in den Tag – Tagesplan und Wetter im Blick behalten."

    if send_hour == 12:
        if maximum >= 28:
            return "Mittagshitze meiden und genug Wasser einpacken."
        return "Jetzt lohnt sich eine Schattenpause oder ein entspannter Mittagsstopp."

    if send_hour == 15:
        if maximum >= 28:
            return "Strand und Baden sind jetzt oft angenehmer als zur Mittagszeit."
        return "Guter Zeitpunkt für einen späteren Ausflug oder Strandbesuch."

    if send_hour == 18:
        if rain_probability >= 35:
            return "Abends kann es wechselhafter werden – Plan flexibel halten."
        return "Abendsonne und Konoba-Zeit – gut für einen entspannten Ausklang."

    if send_hour >= 21:
        return "Kurzer Blick auf morgen lohnt sich – der Tagesplan ist schon vorbereitet."

    return "Gute Bedingungen für euren Tagesplan."


def build_message(
    location_name: str,
    forecast: dict[str, Any],
    send_hour: int | None = None,
) -> tuple[str, str]:
    code = round(first_daily_value(forecast, "weather_code"))
    minimum = round(first_daily_value(forecast, "temperature_2m_min"))
    maximum = round(first_daily_value(forecast, "temperature_2m_max"))
    rain_probability = round(first_daily_value(forecast, "precipitation_probability_max"))
    wind = round(first_daily_value(forecast, "wind_speed_10m_max"))
    gusts = round(first_daily_value(forecast, "wind_gusts_10m_max"))
    condition, emoji = describe_weather(code)
    advice_hour = send_hour if send_hour is not None else 12
    advice = build_advice(
        advice_hour,
        code=code,
        rain_probability=rain_probability,
        wind=wind,
        gusts=gusts,
        maximum=maximum,
    )

    title = f"{emoji} Wetter in {location_name}"
    body = (
        f"Heute {minimum}–{maximum} °C und {condition}. "
        f"Regen {rain_probability} %, Wind bis {wind} km/h. {advice}"
    )
    return title, body


def idempotency_key(
    local_date: str,
    destination: str,
    send_hour: int,
    context: str = "daily",
) -> str:
    return str(
        uuid.uuid5(
            uuid.NAMESPACE_URL,
            f"bura-weather-v3:{context}:{local_date}:{send_hour:02d}:{destination}",
        )
    )


def audience_filters(destination: str) -> list[dict[str, str]]:
    destination_filter = {
        "field": "tag",
        "key": "destination",
        "relation": "=",
        "value": destination,
    }
    return [
        destination_filter,
        {"operator": "AND"},
        {
            "field": "tag",
            "key": "notification_topics",
            "relation": "=",
            "value": "weather",
        },
        {"operator": "OR"},
        destination_filter.copy(),
        {"operator": "AND"},
        {
            "field": "tag",
            "key": "notification_topics",
            "relation": "=",
            "value": "weather_news",
        },
    ]


def build_notification(
    destination: str,
    location_name: str,
    forecast: dict[str, Any],
    local_date: str,
    send_hour: int,
    context: str = "daily",
) -> dict[str, Any]:
    title, body = build_message(location_name, forecast, send_hour)
    launch_url = f"{APP_URL}?{urllib.parse.urlencode({'destination': destination})}"

    return {
        "app_id": ONESIGNAL_APP_ID,
        "target_channel": "push",
        "name": f"ISTRIVA Wetter {location_name} {local_date} {send_hour:02d}:00",
        "headings": {"en": title, "de": title},
        "contents": {"en": body, "de": body},
        "url": launch_url,
        "chrome_web_icon": ICON_URL,
        "firefox_icon": ICON_URL,
        "web_push_topic": f"bura-weather-{destination}",
        "ttl": 3 * 60 * 60,
        "idempotency_key": idempotency_key(local_date, destination, send_hour, context),
        "filters": audience_filters(destination),
    }


def send_notification(payload: dict[str, Any], api_key: str) -> dict[str, Any]:
    return request_json(
        ONESIGNAL_API_URL,
        payload=payload,
        headers={"Authorization": f"Key {api_key}"},
    )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--force",
        action="store_true",
        default=env_flag("BURA_FORCE_SEND"),
        help="send outside the configured local hour",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        default=env_flag("BURA_DRY_RUN"),
        help="fetch forecasts and print messages without contacting OneSignal",
    )
    parser.add_argument(
        "--location",
        choices=["all", *LOCATIONS],
        default=os.environ.get("BURA_LOCATION", "all"),
        help="send for one destination or all destinations",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    now = datetime.now(tz=ZoneInfo("UTC"))
    local_now = now.astimezone(LOCAL_TIMEZONE)

    if not should_send_now(now, args.force):
        send_hours = ", ".join(f"{hour:02d}:00" for hour in SEND_HOURS)
        print(
            f"Skipping: local time is {local_now:%H:%M}; "
            f"configured send hours are {send_hours} ({LOCAL_TIMEZONE.key})."
        )
        return 0

    api_key = os.environ.get("ONESIGNAL_API_KEY", "").strip()
    if not args.dry_run and not api_key:
        print("ONESIGNAL_API_KEY is required unless --dry-run is used.", file=sys.stderr)
        return 2

    destinations = LOCATIONS if args.location == "all" else {args.location: LOCATIONS[args.location]}
    idempotency_context = os.environ.get("BURA_IDEMPOTENCY_CONTEXT", "daily").strip() or "daily"
    send_hour = local_now.hour
    failures: list[str] = []

    for destination, location in destinations.items():
        try:
            forecast = fetch_forecast(location)
            payload = build_notification(
                destination,
                location["name"],
                forecast,
                local_now.date().isoformat(),
                send_hour,
                idempotency_context,
            )

            if args.dry_run:
                print(
                    f"[dry-run] {destination}: "
                    f"{payload['headings']['de']} — {payload['contents']['de']}"
                )
                continue

            response = send_notification(payload, api_key)
            notification_id = response.get("id")
            recipients = response.get("recipients", 0)
            if not notification_id:
                warning = (
                    f"{destination}: OneSignal matched no recipients "
                    f"(response={json.dumps(response, ensure_ascii=False)})"
                )
                print(f"::warning::{warning}")
                if args.location != "all":
                    failures.append(warning)
                continue
            print(f"Sent {destination}: notification={notification_id}, recipients={recipients}")
        except Exception as error:  # Continue so one region cannot block all others.
            failures.append(f"{destination}: {error}")
            print(f"Failed {destination}: {error}", file=sys.stderr)

    if failures:
        print(f"{len(failures)} destination(s) failed.", file=sys.stderr)
        return 1

    print(f"Completed {len(destinations)} destination(s) at {local_now:%Y-%m-%d %H:%M %Z}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
