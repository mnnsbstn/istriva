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
APP_URL = "https://mnnsbstn.github.io/istria-vacay-planner/"
ICON_URL = f"{APP_URL}icon-512.png"
LOCAL_TIMEZONE = ZoneInfo("Europe/Zagreb")
SEND_HOUR = 9

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
    return now.astimezone(LOCAL_TIMEZONE).hour == SEND_HOUR


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


def build_message(location_name: str, forecast: dict[str, Any]) -> tuple[str, str]:
    code = round(first_daily_value(forecast, "weather_code"))
    minimum = round(first_daily_value(forecast, "temperature_2m_min"))
    maximum = round(first_daily_value(forecast, "temperature_2m_max"))
    rain_probability = round(first_daily_value(forecast, "precipitation_probability_max"))
    wind = round(first_daily_value(forecast, "wind_speed_10m_max"))
    gusts = round(first_daily_value(forecast, "wind_gusts_10m_max"))
    condition, emoji = describe_weather(code)

    if code >= 95:
        advice = "Gewitter möglich – Ausflüge flexibel planen."
    elif gusts >= 50 or wind >= 35:
        advice = "Windig – Fähren und Bootstouren bitte prüfen."
    elif rain_probability >= 55:
        advice = "Die Regenoption ist in Bura vorbereitet."
    elif maximum >= 30:
        advice = "Mittagshitze meiden und genug Wasser einpacken."
    else:
        advice = "Gute Bedingungen für euren Tagesplan."

    title = f"{emoji} Wetter in {location_name}"
    body = (
        f"Heute {minimum}–{maximum} °C und {condition}. "
        f"Regen {rain_probability} %, Wind bis {wind} km/h. {advice}"
    )
    return title, body


def idempotency_key(local_date: str, destination: str) -> str:
    return str(uuid.uuid5(uuid.NAMESPACE_URL, f"bura-weather:{local_date}:{destination}"))


def build_notification(
    destination: str,
    location_name: str,
    forecast: dict[str, Any],
    local_date: str,
) -> dict[str, Any]:
    title, body = build_message(location_name, forecast)
    launch_url = f"{APP_URL}?{urllib.parse.urlencode({'destination': destination})}"

    return {
        "app_id": ONESIGNAL_APP_ID,
        "target_channel": "push",
        "name": f"Bura Wetter {location_name} {local_date}",
        "headings": {"en": title, "de": title},
        "contents": {"en": body, "de": body},
        "url": launch_url,
        "chrome_web_icon": ICON_URL,
        "firefox_icon": ICON_URL,
        "web_push_topic": f"bura-weather-{destination}",
        "ttl": 6 * 60 * 60,
        "idempotency_key": idempotency_key(local_date, destination),
        "filters": [
            {
                "field": "tag",
                "key": "destination",
                "relation": "=",
                "value": destination,
            },
            {"operator": "AND"},
            {
                "field": "tag",
                "key": "notification_topics",
                "relation": "in_array",
                "value": "weather,weather_news",
            },
        ],
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
        print(f"Skipping: local time is {local_now:%H:%M}; configured send hour is {SEND_HOUR:02d}:00.")
        return 0

    api_key = os.environ.get("ONESIGNAL_API_KEY", "").strip()
    if not args.dry_run and not api_key:
        print("ONESIGNAL_API_KEY is required unless --dry-run is used.", file=sys.stderr)
        return 2

    destinations = LOCATIONS if args.location == "all" else {args.location: LOCATIONS[args.location]}
    failures: list[str] = []

    for destination, location in destinations.items():
        try:
            forecast = fetch_forecast(location)
            payload = build_notification(destination, location["name"], forecast, local_now.date().isoformat())

            if args.dry_run:
                print(
                    f"[dry-run] {destination}: "
                    f"{payload['headings']['de']} — {payload['contents']['de']}"
                )
                continue

            response = send_notification(payload, api_key)
            notification_id = response.get("id") or "no-id"
            recipients = response.get("recipients", 0)
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
