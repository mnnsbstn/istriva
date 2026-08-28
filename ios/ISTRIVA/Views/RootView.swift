import SwiftUI

struct RootView: View {
    @EnvironmentObject private var model: AppModel

    var body: some View {
        TabView {
            PlanView()
                .tabItem {
                    Label("Tagesplan", systemImage: "list.bullet.rectangle")
                }

            ExploreView()
                .tabItem {
                    Label("Entdecken", systemImage: "map")
                }

            FavoritesView()
                .tabItem {
                    Label("Favoriten", systemImage: "heart")
                }

            SettingsView()
                .tabItem {
                    Label("Einstellungen", systemImage: "slider.horizontal.3")
                }
        }
        .toolbarBackground(.black, for: .tabBar)
        .toolbarBackground(.visible, for: .tabBar)
        .toolbarColorScheme(.dark, for: .tabBar)
        .task {
            await model.start()
        }
    }
}
