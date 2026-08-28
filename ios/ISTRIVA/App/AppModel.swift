import Foundation
import SwiftUI
import ISTRIVACore

@MainActor
final class AppModel: ObservableObject {
    @Published private(set) var destinations: [Destination]
    @Published private(set) var selectedDestinationID: String
    @Published private(set) var family: FamilySettings
    @Published var weatherMode: WeatherMode = .sun
    @Published var pace: TravelPace = .balanced
    @Published private(set) var weather: WeatherSnapshot?
    @Published private(set) var weatherError: String?
    @Published private(set) var isLoadingWeather = false
    @Published private(set) var alternativeIndex = 0
    @Published private(set) var favoriteStopIDs: Set<String>
    @Published private(set) var notificationTopics: NotificationTopics

    let notificationService: NotificationService

    private let repository: PlannerRepository
    private let weatherService: any WeatherServicing
    private let defaults: UserDefaults
    private var weatherWasManuallySelected = false

    private enum Key {
        static let destination = "istriva.native.destination"
        static let family = "istriva.native.family"
        static let favorites = "istriva.native.favorites"
        static let topics = "istriva.native.notification-topics"
        static let weatherPrefix = "istriva.native.weather."
    }

    init(
        repository: PlannerRepository = .bundled,
        weatherService: any WeatherServicing = OpenMeteoWeatherService(),
        defaults: UserDefaults = .standard
    ) {
        self.repository = repository
        self.weatherService = weatherService
        self.notificationService = .shared
        self.defaults = defaults
        destinations = repository.destinations

        let storedDestination = defaults.string(forKey: Key.destination)
        selectedDestinationID = repository.destinations.contains(where: { $0.id == storedDestination })
            ? (storedDestination ?? "pula")
            : "pula"
        family = Self.decode(FamilySettings.self, key: Key.family, defaults: defaults)
            ?? FamilySettings()
        favoriteStopIDs = Set(defaults.stringArray(forKey: Key.favorites) ?? [])
        notificationTopics = Self.decode(
            NotificationTopics.self,
            key: Key.topics,
            defaults: defaults
        ) ?? NotificationTopics()
        weather = Self.decode(
            WeatherSnapshot.self,
            key: Key.weatherPrefix + selectedDestinationID,
            defaults: defaults
        )
    }

    var selectedDestination: Destination {
        destinations.first(where: { $0.id == selectedDestinationID })
            ?? destinations[0]
    }

    var currentPlan: DayPlan {
        do {
            return try repository.plan(
                destinationID: selectedDestinationID,
                weather: weatherMode,
                pace: pace,
                alternativeIndex: alternativeIndex
            )
        } catch {
            preconditionFailure("Bundled planner data is incomplete: \(error)")
        }
    }

    var availableAlternativeCount: Int {
        (try? repository.plans(
            destinationID: selectedDestinationID,
            weather: weatherMode,
            pace: pace
        ).count) ?? 1
    }

    var favoriteStops: [PlanStop] {
        var unique: [String: PlanStop] = [:]
        for stop in destinations.flatMap(\.plans).flatMap(\.stops) {
            unique[stop.id] = stop
        }
        return favoriteStopIDs
            .compactMap { unique[$0] }
            .sorted { $0.title.localizedStandardCompare($1.title) == .orderedAscending }
    }

    func start() async {
        syncNotificationTags()
        await refreshWeather()
    }

    func selectDestination(_ id: String) {
        guard destinations.contains(where: { $0.id == id }) else { return }
        selectedDestinationID = id
        defaults.set(id, forKey: Key.destination)
        alternativeIndex = 0
        weatherWasManuallySelected = false
        weather = Self.decode(
            WeatherSnapshot.self,
            key: Key.weatherPrefix + id,
            defaults: defaults
        )
        syncNotificationTags()
        Task { await refreshWeather() }
    }

    func selectWeather(_ value: WeatherMode) {
        weatherMode = value
        weatherWasManuallySelected = true
        alternativeIndex = 0
    }

    func selectPace(_ value: TravelPace) {
        pace = value
        alternativeIndex = 0
    }

    func showAlternative() {
        guard availableAlternativeCount > 1 else { return }
        alternativeIndex = (alternativeIndex + 1) % availableAlternativeCount
    }

    func updateAdults(_ value: Int) {
        family.updateAdults(value)
        persist(family, key: Key.family)
    }

    func updateChildren(_ value: Int) {
        family.updateChildren(value)
        persist(family, key: Key.family)
    }

    func toggleFavorite(_ stop: PlanStop) {
        if favoriteStopIDs.contains(stop.id) {
            favoriteStopIDs.remove(stop.id)
        } else {
            favoriteStopIDs.insert(stop.id)
        }
        defaults.set(Array(favoriteStopIDs).sorted(), forKey: Key.favorites)
    }

    func isFavorite(_ stop: PlanStop) -> Bool {
        favoriteStopIDs.contains(stop.id)
    }

    func updateNotificationTopics(weather: Bool, news: Bool) {
        notificationTopics = NotificationTopics(weather: weather, news: news)
        persist(notificationTopics, key: Key.topics)

        guard let tagValue = notificationTopics.tagValue else {
            notificationService.disable()
            return
        }

        if notificationService.isSubscribed {
            notificationService.sync(
                destination: selectedDestinationID,
                topics: tagValue
            )
        } else {
            notificationService.requestPermission(
                destination: selectedDestinationID,
                topics: tagValue
            )
        }
    }

    func disableNotifications() {
        notificationService.disable()
    }

    func refreshWeather() async {
        isLoadingWeather = true
        weatherError = nil

        do {
            let snapshot = try await weatherService.fetchWeather(for: selectedDestination)
            weather = snapshot
            persist(snapshot, key: Key.weatherPrefix + selectedDestinationID)
            if !weatherWasManuallySelected {
                weatherMode = snapshot.recommendsRainPlan ? .rain : .sun
                alternativeIndex = 0
            }
        } catch {
            weatherError = weather == nil
                ? "Wetter momentan nicht verfügbar."
                : "Zwischengespeicherte Wetterdaten."
        }

        isLoadingWeather = false
    }

    func handle(url: URL) {
        let queryDestination = URLComponents(
            url: url,
            resolvingAgainstBaseURL: false
        )?.queryItems?.first(where: { $0.name == "destination" })?.value

        if let queryDestination {
            selectDestination(queryDestination)
            return
        }

        if url.scheme == "istriva", url.host == "destination" {
            let pathDestination = url.pathComponents.dropFirst().first
            if let pathDestination {
                selectDestination(pathDestination)
            }
        }
    }

    private func syncNotificationTags() {
        guard notificationService.isSubscribed,
              let topics = notificationTopics.tagValue else { return }
        notificationService.sync(
            destination: selectedDestinationID,
            topics: topics
        )
    }

    private func persist<T: Encodable>(_ value: T, key: String) {
        if let data = try? JSONEncoder().encode(value) {
            defaults.set(data, forKey: key)
        }
    }

    private static func decode<T: Decodable>(
        _ type: T.Type,
        key: String,
        defaults: UserDefaults
    ) -> T? {
        guard let data = defaults.data(forKey: key) else { return nil }
        return try? JSONDecoder().decode(type, from: data)
    }
}
