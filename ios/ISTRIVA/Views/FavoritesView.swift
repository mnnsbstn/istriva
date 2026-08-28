import SwiftUI
import ISTRIVACore

struct FavoritesView: View {
    @EnvironmentObject private var model: AppModel

    var body: some View {
        NavigationStack {
            Group {
                if model.favoriteStops.isEmpty {
                    ContentUnavailableView(
                        "Noch keine Favoriten",
                        systemImage: "heart",
                        description: Text("Markiert Ausflugsziele im Tagesplan mit dem Herz.")
                    )
                } else {
                    List(model.favoriteStops) { stop in
                        VStack(alignment: .leading, spacing: 8) {
                            HStack {
                                Text(stop.icon)
                                Text(stop.title)
                                    .font(.headline)
                                Spacer()
                                Button {
                                    model.toggleFavorite(stop)
                                } label: {
                                    Image(systemName: "heart.fill")
                                        .foregroundStyle(.red)
                                }
                                .buttonStyle(.plain)
                                .accessibilityLabel("Aus Favoriten entfernen")
                            }

                            Text(stop.description)
                                .font(.subheadline)
                                .foregroundStyle(.secondary)

                            if let url = stop.googleMapsURL {
                                Link(destination: url) {
                                    Label("Google Maps", systemImage: "map")
                                        .font(.caption.bold())
                                }
                            }
                        }
                        .padding(.vertical, 6)
                    }
                    .listStyle(.plain)
                }
            }
            .navigationTitle("Favoriten")
            .toolbarBackground(Color.istrivaLime, for: .navigationBar)
            .toolbarBackground(.visible, for: .navigationBar)
        }
    }
}
