import XCTest
@testable import ISTRIVACore

final class ISTRIVACoreTests: XCTestCase {
    private let repository = PlannerRepository.bundled

    func testBundledCatalogContainsAllRegions() {
        XCTAssertEqual(repository.catalog.schemaVersion, 1)
        XCTAssertEqual(repository.destinations.count, 11)
        XCTAssertEqual(
            Set(repository.destinations.map(\.id)),
            Set([
                "pula", "fazana", "medulin", "rovinj", "porec", "vrsar",
                "novigrad", "umag", "labin", "motovun", "buzet"
            ])
        )
    }

    func testEveryPlanContainsNavigableStops() throws {
        for destination in repository.destinations {
            XCTAssertFalse(destination.plans.isEmpty, destination.id)
            for plan in destination.plans {
                XCTAssertGreaterThanOrEqual(plan.stops.count, 3, "\(destination.id)/\(plan.id)")
                for stop in plan.stops {
                    XCTAssertFalse(stop.mapQuery.isEmpty)
                    XCTAssertEqual(stop.googleMapsURL?.host, "www.google.com")
                    XCTAssertTrue(stop.googleMapsURL?.absoluteString.contains("/maps/dir/") == true)
                }
            }
        }
    }

    func testPulaBalancedOutdoorPlanCyclesAlternatives() throws {
        let plans = try repository.plans(
            destinationID: "pula",
            weather: .sun,
            pace: .balanced
        )
        XCTAssertEqual(plans.count, 2)
        XCTAssertNotEqual(plans[0].name, plans[1].name)
        XCTAssertEqual(
            try repository.plan(
                destinationID: "pula",
                weather: .sun,
                pace: .balanced,
                alternativeIndex: 2
            ).id,
            plans[0].id
        )
    }

    func testRegionalRelaxedPlanUsesThreeStops() throws {
        let plan = try repository.plan(
            destinationID: "rovinj",
            weather: .sun,
            pace: .relaxed,
            alternativeIndex: 0
        )
        XCTAssertEqual(plan.stops.count, 3)
    }

    func testFamilySettingsClampAndDescribeValues() {
        var settings = FamilySettings(adults: 0, children: 20)
        XCTAssertEqual(settings.adults, 1)
        XCTAssertEqual(settings.children, 8)
        XCTAssertEqual(settings.total, 9)
        XCTAssertEqual(settings.description, "1 Erwachsener · 8 Kinder")

        settings.updateAdults(3)
        settings.updateChildren(1)
        XCTAssertEqual(settings.description, "3 Erwachsene · 1 Kind")
    }

    func testNotificationTopicTagValues() {
        XCTAssertEqual(NotificationTopics(weather: true, news: true).tagValue, "weather_news")
        XCTAssertEqual(NotificationTopics(weather: true, news: false).tagValue, "weather")
        XCTAssertEqual(NotificationTopics(weather: false, news: true).tagValue, "news")
        XCTAssertNil(NotificationTopics(weather: false, news: false).tagValue)
    }

    func testWeatherSnapshotSelectsRainPlan() {
        let snapshot = WeatherSnapshot(
            temperature: 22,
            apparentTemperature: 23,
            weatherCode: 61,
            windSpeed: 12,
            precipitation: 0.4,
            rainProbability: 70,
            humidity: 68,
            uvIndex: 5.2,
            sunset: nil,
            observedAt: Date()
        )
        XCTAssertTrue(snapshot.recommendsRainPlan)
        XCTAssertEqual(snapshot.condition, "Regen")
        XCTAssertEqual(snapshot.symbol, "cloud.rain.fill")
    }
}
