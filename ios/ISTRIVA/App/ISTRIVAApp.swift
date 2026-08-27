import SwiftUI

@main
struct ISTRIVAApp: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self) private var appDelegate
    @StateObject private var model = AppModel()

    var body: some Scene {
        WindowGroup {
            RootView()
                .environmentObject(model)
                .preferredColorScheme(.light)
                .tint(.istrivaLime)
                .onOpenURL(perform: model.handle)
        }
    }
}
