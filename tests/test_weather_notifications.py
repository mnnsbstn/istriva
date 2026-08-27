import sys
import unittest
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo


sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))

import send_weather_updates as weather  # noqa: E402


def forecast(
    *,
    code=1,
    minimum=22,
    maximum=29,
    rain=15,
    wind=18,
    gusts=30,
):
    return {
        "daily": {
            "weather_code": [code],
            "temperature_2m_min": [minimum],
            "temperature_2m_max": [maximum],
            "precipitation_probability_max": [rain],
            "precipitation_sum": [0],
            "wind_speed_10m_max": [wind],
            "wind_gusts_10m_max": [gusts],
        }
    }


class ScheduleTests(unittest.TestCase):
    def test_summer_time_sends_at_nine_in_zagreb(self):
        now = datetime(2026, 8, 27, 7, 5, tzinfo=ZoneInfo("UTC"))
        self.assertTrue(weather.should_send_now(now))

    def test_summer_time_skips_second_dst_window(self):
        now = datetime(2026, 8, 27, 8, 5, tzinfo=ZoneInfo("UTC"))
        self.assertFalse(weather.should_send_now(now))

    def test_winter_time_sends_at_nine_in_zagreb(self):
        now = datetime(2026, 1, 15, 8, 5, tzinfo=ZoneInfo("UTC"))
        self.assertTrue(weather.should_send_now(now))

    def test_winter_time_skips_first_dst_window(self):
        now = datetime(2026, 1, 15, 7, 5, tzinfo=ZoneInfo("UTC"))
        self.assertFalse(weather.should_send_now(now))

    def test_force_ignores_local_hour(self):
        now = datetime(2026, 8, 27, 12, 0, tzinfo=ZoneInfo("UTC"))
        self.assertTrue(weather.should_send_now(now, force=True))


class MessageTests(unittest.TestCase):
    def test_regular_weather_message(self):
        title, body = weather.build_message("Pula", forecast())
        self.assertEqual(title, "🌤️ Wetter in Pula")
        self.assertIn("22–29 °C", body)
        self.assertIn("Regen 15 %", body)
        self.assertIn("Gute Bedingungen", body)

    def test_rain_advice(self):
        _, body = weather.build_message("Pula", forecast(code=61, rain=70))
        self.assertIn("Regenoption", body)

    def test_wind_advice_takes_priority(self):
        _, body = weather.build_message("Pula", forecast(code=61, rain=70, gusts=55))
        self.assertIn("Fähren und Bootstouren", body)

    def test_heat_advice(self):
        _, body = weather.build_message("Pula", forecast(maximum=33))
        self.assertIn("Mittagshitze", body)

    def test_missing_weather_value_is_rejected(self):
        broken = forecast()
        broken["daily"]["temperature_2m_max"] = []
        with self.assertRaisesRegex(ValueError, "temperature_2m_max"):
            weather.build_message("Pula", broken)


class NotificationPayloadTests(unittest.TestCase):
    def test_payload_targets_region_and_weather_topics(self):
        payload = weather.build_notification("pula", "Pula", forecast(), "2026-08-27")

        self.assertEqual(payload["app_id"], weather.ONESIGNAL_APP_ID)
        self.assertEqual(payload["target_channel"], "push")
        self.assertEqual(
            payload["url"],
            "https://mnnsbstn.github.io/istriva/?destination=pula",
        )
        self.assertEqual(
            payload["filters"],
            [
                {
                    "field": "tag",
                    "key": "destination",
                    "relation": "=",
                    "value": "pula",
                },
                {"operator": "AND"},
                {
                    "field": "tag",
                    "key": "notification_topics",
                    "relation": "=",
                    "value": "weather",
                },
                {"operator": "OR"},
                {
                    "field": "tag",
                    "key": "destination",
                    "relation": "=",
                    "value": "pula",
                },
                {"operator": "AND"},
                {
                    "field": "tag",
                    "key": "notification_topics",
                    "relation": "=",
                    "value": "weather_news",
                },
            ],
        )

    def test_idempotency_key_is_stable_per_date_and_destination(self):
        first = weather.idempotency_key("2026-08-27", "pula")
        second = weather.idempotency_key("2026-08-27", "pula")
        other = weather.idempotency_key("2026-08-27", "rovinj")
        self.assertEqual(first, second)
        self.assertNotEqual(first, other)
        self.assertEqual(len(first), 36)

    def test_manual_runs_get_a_distinct_idempotency_key(self):
        daily = weather.idempotency_key("2026-08-27", "pula", "daily")
        manual = weather.idempotency_key("2026-08-27", "pula", "33118843266")
        self.assertNotEqual(daily, manual)

    def test_every_location_has_unique_idempotency_key(self):
        keys = {
            weather.idempotency_key("2026-08-27", destination)
            for destination in weather.LOCATIONS
        }
        self.assertEqual(len(keys), len(weather.LOCATIONS))


if __name__ == "__main__":
    unittest.main()
