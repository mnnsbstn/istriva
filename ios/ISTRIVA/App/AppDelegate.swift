import UIKit
import OneSignalFramework

final class AppDelegate: NSObject, UIApplicationDelegate {
    static let oneSignalAppID = "cd00c6cc-ad14-4246-9cde-4de743ce8238"

    func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [
            UIApplication.LaunchOptionsKey: Any
        ]? = nil
    ) -> Bool {
#if DEBUG
        OneSignal.Debug.setLogLevel(.LL_WARN)
#endif
        OneSignal.initialize(Self.oneSignalAppID, withLaunchOptions: launchOptions)

        Task { @MainActor in
            NotificationService.shared.startObserving()
        }
        return true
    }
}
