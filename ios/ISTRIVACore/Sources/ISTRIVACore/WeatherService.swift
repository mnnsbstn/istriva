import Foundation
#if canImport(FoundationNetworking)
import FoundationNetworking
#endif

public enum WeatherServiceError: LocalizedError {
    case invalidURL
    case invalidResponse
    case incompleteForecast

    public var errorDescription: String? {
        switch self {
        case .invalidURL:
            "Die Wetteradresse ist ungültig."
        case .invalidResponse:
            "Der Wetterdienst hat nicht erfolgreich geantwortet."
        case .incompleteForecast:
            "Der Wetterdienst hat unvollständige Daten geliefert."
        }
    }
}

public protocol WeatherServicing: Sendable {
    func fetchWeather(for destination: Destination) async throws -> WeatherSnapshot
}

public struct OpenMeteoWeatherService: WeatherServicing {
    private let session: URLSession

    public init(session: URLSession = .shared) {
        self.session = session
    }

    public func fetchWeather(for destination: Destination) async throws -> WeatherSnapshot {
        async let forecastPayload = fetchForecast(for: destination)
        async let seaSurfaceTemperature = fetchSeaSurfaceTemperature(for: destination)
        let payload = try await forecastPayload

        guard let rainProbability = payload.daily.precipitationProbabilityMax.first else {
            throw WeatherServiceError.incompleteForecast
        }

        return WeatherSnapshot(
            temperature: payload.current.temperature,
            apparentTemperature: payload.current.apparentTemperature,
            weatherCode: payload.current.weatherCode,
            windSpeed: payload.current.windSpeed,
            precipitation: payload.current.precipitation,
            rainProbability: rainProbability,
            humidity: payload.current.humidity,
            uvIndex: payload.current.uvIndex,
            seaSurfaceTemperature: await seaSurfaceTemperature,
            sunset: payload.daily.sunset.first.flatMap(Self.parseLocalDate),
            observedAt: Self.parseLocalDate(payload.current.time) ?? Date()
        )
    }

    private func fetchForecast(for destination: Destination) async throws -> OpenMeteoResponse {
        var components = URLComponents(string: "https://api.open-meteo.com/v1/forecast")
        components?.queryItems = [
            URLQueryItem(name: "latitude", value: String(destination.latitude)),
            URLQueryItem(name: "longitude", value: String(destination.longitude)),
            URLQueryItem(
                name: "current",
                value: "temperature_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation,relative_humidity_2m,uv_index"
            ),
            URLQueryItem(
                name: "daily",
                value: "precipitation_probability_max,sunset"
            ),
            URLQueryItem(name: "timezone", value: "Europe/Zagreb"),
            URLQueryItem(name: "forecast_days", value: "1")
        ]

        guard let url = components?.url else {
            throw WeatherServiceError.invalidURL
        }

        var request = URLRequest(url: url)
        request.cachePolicy = .reloadIgnoringLocalAndRemoteCacheData
        request.timeoutInterval = 20

        let (data, response) = try await session.data(for: request)
        guard let httpResponse = response as? HTTPURLResponse,
              200..<300 ~= httpResponse.statusCode else {
            throw WeatherServiceError.invalidResponse
        }

        return try JSONDecoder().decode(OpenMeteoResponse.self, from: data)
    }

    private func fetchSeaSurfaceTemperature(for destination: Destination) async -> Double? {
        var components = URLComponents(string: "https://marine-api.open-meteo.com/v1/marine")
        components?.queryItems = [
            URLQueryItem(name: "latitude", value: String(destination.latitude)),
            URLQueryItem(name: "longitude", value: String(destination.longitude)),
            URLQueryItem(name: "current", value: "sea_surface_temperature"),
            URLQueryItem(name: "timezone", value: "Europe/Zagreb")
        ]

        guard let url = components?.url else { return nil }

        var request = URLRequest(url: url)
        request.cachePolicy = .reloadIgnoringLocalAndRemoteCacheData
        request.timeoutInterval = 20

        do {
            let (data, response) = try await session.data(for: request)
            guard let httpResponse = response as? HTTPURLResponse,
                  200..<300 ~= httpResponse.statusCode else {
                return nil
            }
            let payload = try JSONDecoder().decode(MarineResponse.self, from: data)
            return payload.current.seaSurfaceTemperature
        } catch {
            return nil
        }
    }

    private static func parseLocalDate(_ value: String) -> Date? {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.calendar = Calendar(identifier: .gregorian)
        formatter.timeZone = TimeZone(identifier: "Europe/Zagreb")
        formatter.dateFormat = "yyyy-MM-dd'T'HH:mm"
        return formatter.date(from: value)
    }
}

private struct OpenMeteoResponse: Decodable {
    let current: Current
    let daily: Daily

    struct Current: Decodable {
        let time: String
        let temperature: Double
        let apparentTemperature: Double
        let weatherCode: Int
        let windSpeed: Double
        let precipitation: Double
        let humidity: Double
        let uvIndex: Double

        enum CodingKeys: String, CodingKey {
            case time
            case temperature = "temperature_2m"
            case apparentTemperature = "apparent_temperature"
            case weatherCode = "weather_code"
            case windSpeed = "wind_speed_10m"
            case precipitation
            case humidity = "relative_humidity_2m"
            case uvIndex = "uv_index"
        }
    }

    struct Daily: Decodable {
        let precipitationProbabilityMax: [Double]
        let sunset: [String]

        enum CodingKeys: String, CodingKey {
            case precipitationProbabilityMax = "precipitation_probability_max"
            case sunset
        }
    }
}

private struct MarineResponse: Decodable {
    let current: Current

    struct Current: Decodable {
        let seaSurfaceTemperature: Double

        enum CodingKeys: String, CodingKey {
            case seaSurfaceTemperature = "sea_surface_temperature"
        }
    }
}
