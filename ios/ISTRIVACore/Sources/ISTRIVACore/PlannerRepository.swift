import Foundation

public enum PlannerRepositoryError: LocalizedError {
    case missingCatalog
    case missingDestination(String)
    case missingPlan(destination: String, weather: WeatherMode, pace: TravelPace)

    public var errorDescription: String? {
        switch self {
        case .missingCatalog:
            "Der eingebettete ISTRIVA-Katalog konnte nicht geladen werden."
        case let .missingDestination(id):
            "Die Region \(id) ist nicht im Katalog enthalten."
        case let .missingPlan(destination, weather, pace):
            "Für \(destination), \(weather.rawValue) und \(pace.rawValue) wurde kein Plan gefunden."
        }
    }
}

public final class PlannerRepository: @unchecked Sendable {
    public static let bundled: PlannerRepository = {
        do {
            return try PlannerRepository()
        } catch {
            preconditionFailure("Invalid bundled planner catalog: \(error)")
        }
    }()

    public let catalog: PlannerCatalog

    public var destinations: [Destination] {
        catalog.destinations
    }

    public convenience init() throws {
        try self.init(bundle: .module)
    }

    public init(bundle: Bundle) throws {
        guard let url = bundle.url(forResource: "destinations", withExtension: "json") else {
            throw PlannerRepositoryError.missingCatalog
        }
        let data = try Data(contentsOf: url)
        catalog = try JSONDecoder().decode(PlannerCatalog.self, from: data)
    }

    public init(catalog: PlannerCatalog) {
        self.catalog = catalog
    }

    public func destination(id: String) throws -> Destination {
        guard let destination = destinations.first(where: { $0.id == id }) else {
            throw PlannerRepositoryError.missingDestination(id)
        }
        return destination
    }

    public func plans(
        destinationID: String,
        weather: WeatherMode,
        pace: TravelPace
    ) throws -> [DayPlan] {
        let destination = try destination(id: destinationID)
        let exact = destination.plans.filter {
            $0.weather == weather && $0.pace == pace
        }
        if !exact.isEmpty {
            return exact.sorted(by: { $0.variant < $1.variant })
        }

        let weatherFallback = destination.plans.filter {
            $0.weather == weather && $0.pace == .balanced
        }
        if !weatherFallback.isEmpty {
            return weatherFallback.sorted(by: { $0.variant < $1.variant })
        }

        let finalFallback = destination.plans.filter {
            $0.weather == .sun && $0.pace == .balanced
        }
        guard !finalFallback.isEmpty else {
            throw PlannerRepositoryError.missingPlan(
                destination: destinationID,
                weather: weather,
                pace: pace
            )
        }
        return finalFallback.sorted(by: { $0.variant < $1.variant })
    }

    public func plan(
        destinationID: String,
        weather: WeatherMode,
        pace: TravelPace,
        alternativeIndex: Int
    ) throws -> DayPlan {
        let available = try plans(
            destinationID: destinationID,
            weather: weather,
            pace: pace
        )
        let safeIndex = abs(alternativeIndex) % available.count
        return available[safeIndex]
    }
}
