import Foundation

public enum WeatherMode: String, Codable, CaseIterable, Identifiable, Sendable {
    case sun
    case rain

    public var id: String { rawValue }

    public var title: String {
        switch self {
        case .sun: "Outdoor"
        case .rain: "Regenoption"
        }
    }

    public var symbol: String {
        switch self {
        case .sun: "sun.max.fill"
        case .rain: "cloud.rain.fill"
        }
    }
}

public enum TravelPace: String, Codable, CaseIterable, Identifiable, Sendable {
    case balanced
    case relaxed
    case active

    public var id: String { rawValue }

    public var title: String {
        switch self {
        case .balanced: "Ausgewogen"
        case .relaxed: "Ganz entspannt"
        case .active: "Abenteuerlich"
        }
    }
}

public struct PlannerCatalog: Codable, Sendable {
    public let schemaVersion: Int
    public let destinations: [Destination]

    public init(schemaVersion: Int, destinations: [Destination]) {
        self.schemaVersion = schemaVersion
        self.destinations = destinations
    }
}

public struct Destination: Codable, Identifiable, Hashable, Sendable {
    public let id: String
    public let name: String
    public let shortName: String
    public let latitude: Double
    public let longitude: Double
    public let plans: [DayPlan]

    public init(
        id: String,
        name: String,
        shortName: String,
        latitude: Double,
        longitude: Double,
        plans: [DayPlan]
    ) {
        self.id = id
        self.name = name
        self.shortName = shortName
        self.latitude = latitude
        self.longitude = longitude
        self.plans = plans
    }
}

public struct DayPlan: Codable, Identifiable, Hashable, Sendable {
    public let id: String
    public let weather: WeatherMode
    public let pace: TravelPace
    public let variant: Int
    public let name: String
    public let distance: String
    public let budget: String
    public let stops: [PlanStop]

    public init(
        id: String,
        weather: WeatherMode,
        pace: TravelPace,
        variant: Int,
        name: String,
        distance: String,
        budget: String,
        stops: [PlanStop]
    ) {
        self.id = id
        self.weather = weather
        self.pace = pace
        self.variant = variant
        self.name = name
        self.distance = distance
        self.budget = budget
        self.stops = stops
    }
}

public struct PlanStop: Codable, Identifiable, Hashable, Sendable {
    public let time: String
    public let category: String
    public let duration: String
    public let title: String
    public let description: String
    public let metadata: [String]
    public let colorHex: String
    public let icon: String
    public let mapQuery: String

    public var id: String { "\(time)-\(title)-\(mapQuery)" }

    public init(
        time: String,
        category: String,
        duration: String,
        title: String,
        description: String,
        metadata: [String],
        colorHex: String,
        icon: String,
        mapQuery: String
    ) {
        self.time = time
        self.category = category
        self.duration = duration
        self.title = title
        self.description = description
        self.metadata = metadata
        self.colorHex = colorHex
        self.icon = icon
        self.mapQuery = mapQuery
    }

    public var googleMapsURL: URL? {
        var components = URLComponents(string: "https://www.google.com/maps/dir/")
        components?.queryItems = [
            URLQueryItem(name: "api", value: "1"),
            URLQueryItem(name: "destination", value: mapQuery)
        ]
        return components?.url
    }
}

public struct FamilySettings: Codable, Equatable, Sendable {
    public var adults: Int
    public var children: Int

    public var total: Int { adults + children }

    public init(adults: Int = 2, children: Int = 2) {
        self.adults = Self.clamp(adults, minimum: 1, maximum: 8)
        self.children = Self.clamp(children, minimum: 0, maximum: 8)
    }

    public mutating func updateAdults(_ value: Int) {
        adults = Self.clamp(value, minimum: 1, maximum: 8)
    }

    public mutating func updateChildren(_ value: Int) {
        children = Self.clamp(value, minimum: 0, maximum: 8)
    }

    public var description: String {
        let adultText = adults == 1 ? "1 Erwachsener" : "\(adults) Erwachsene"
        let childText = children == 1 ? "1 Kind" : "\(children) Kinder"
        return "\(adultText) · \(childText)"
    }

    private static func clamp(_ value: Int, minimum: Int, maximum: Int) -> Int {
        min(maximum, max(minimum, value))
    }
}

public struct NotificationTopics: Codable, Equatable, Sendable {
    public var weather: Bool
    public var news: Bool

    public init(weather: Bool = true, news: Bool = true) {
        self.weather = weather
        self.news = news
    }

    public var tagValue: String? {
        switch (weather, news) {
        case (true, true): "weather_news"
        case (true, false): "weather"
        case (false, true): "news"
        case (false, false): nil
        }
    }
}

public struct WeatherSnapshot: Codable, Equatable, Sendable {
    public let temperature: Double
    public let apparentTemperature: Double
    public let weatherCode: Int
    public let windSpeed: Double
    public let precipitation: Double
    public let rainProbability: Double
    public let humidity: Double
    public let uvIndex: Double
    public let seaSurfaceTemperature: Double?
    public let sunset: Date?
    public let observedAt: Date

    public init(
        temperature: Double,
        apparentTemperature: Double,
        weatherCode: Int,
        windSpeed: Double,
        precipitation: Double,
        rainProbability: Double,
        humidity: Double,
        uvIndex: Double,
        seaSurfaceTemperature: Double? = nil,
        sunset: Date?,
        observedAt: Date
    ) {
        self.temperature = temperature
        self.apparentTemperature = apparentTemperature
        self.weatherCode = weatherCode
        self.windSpeed = windSpeed
        self.precipitation = precipitation
        self.rainProbability = rainProbability
        self.humidity = humidity
        self.uvIndex = uvIndex
        self.seaSurfaceTemperature = seaSurfaceTemperature
        self.sunset = sunset
        self.observedAt = observedAt
    }

    public var recommendsRainPlan: Bool {
        rainProbability >= 55
            || precipitation >= 0.2
            || (51...82).contains(weatherCode)
    }

    public var condition: String {
        switch weatherCode {
        case 0: "Klar"
        case 1...2: "Leicht bewölkt"
        case 3: "Bedeckt"
        case 45, 48: "Nebelig"
        case 51...57: "Nieselregen"
        case 61...67: "Regen"
        case 71...77: "Schnee"
        case 80...82: "Regenschauer"
        case 95...99: "Gewitter"
        default: "Wechselhaft"
        }
    }

    public var symbol: String {
        switch weatherCode {
        case 0: "sun.max.fill"
        case 1...2: "cloud.sun.fill"
        case 3: "cloud.fill"
        case 45, 48: "cloud.fog.fill"
        case 51...67, 80...82: "cloud.rain.fill"
        case 71...77: "cloud.snow.fill"
        case 95...99: "cloud.bolt.rain.fill"
        default: "cloud.sun.fill"
        }
    }
}
