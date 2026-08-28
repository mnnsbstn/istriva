import Foundation
import OneSignalFramework

@MainActor
final class NotificationService: NSObject, ObservableObject {
    static let shared = NotificationService()

    @Published private(set) var isSubscribed = false
    @Published private(set) var isRequestInFlight = false

    private override init() {
        super.init()
    }

    func startObserving() {
        OneSignal.User.pushSubscription.addObserver(self)
        isSubscribed = OneSignal.User.pushSubscription.optedIn
    }

    func requestPermission(destination: String, topics: String) {
        guard !isRequestInFlight else { return }
        isRequestInFlight = true

        OneSignal.Notifications.requestPermission({ [weak self] accepted in
            Task { @MainActor in
                guard let self else { return }
                if accepted {
                    OneSignal.User.pushSubscription.optIn()
                    self.sync(destination: destination, topics: topics)
                }
                self.isSubscribed = OneSignal.User.pushSubscription.optedIn
                self.isRequestInFlight = false
            }
        }, fallbackToSettings: true)
    }

    func disable() {
        OneSignal.User.pushSubscription.optOut()
        isSubscribed = false
    }

    func sync(destination: String, topics: String) {
        OneSignal.User.addTags([
            "destination": destination,
            "notification_topics": topics
        ])
    }
}

extension NotificationService: OSPushSubscriptionObserver {
    nonisolated func onPushSubscriptionDidChange(
        state: OSPushSubscriptionChangedState
    ) {
        Task { @MainActor in
            isSubscribed = state.current.optedIn
        }
    }
}
