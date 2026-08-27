import MapKit
import SwiftUI
import ISTRIVACore

struct ExploreView: View {
    @EnvironmentObject private var model: AppModel

    private let istriaRegion = MKCoordinateRegion(
        center: CLLocationCoordinate2D(latitude: 45.1, longitude: 13.85),
        span: MKCoordinateSpan(latitudeDelta: 0.85, longitudeDelta: 0.85)
    )

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 18) {
                    Map(initialPosition: .region(istriaRegion)) {
                        ForEach(model.destinations) { destination in
                            Marker(
                                destination.shortName,
                                coordinate: CLLocationCoordinate2D(
                                    latitude: destination.latitude,
                                    longitude: destination.longitude
                                )
                            )
                            .tint(
                                destination.id == model.selectedDestinationID
                                    ? .istrivaLime
                                    : .black
                            )
                        }
                    }
                    .frame(height: 300)
                    .clipShape(RoundedRectangle(cornerRadius: 22, style: .continuous))

                    ForEach(model.destinations) { destination in
                        destinationCard(destination)
                    }
                }
                .padding()
            }
            .navigationTitle("Istrien entdecken")
            .toolbarBackground(Color.istrivaLime, for: .navigationBar)
            .toolbarBackground(.visible, for: .navigationBar)
        }
    }

    private func destinationCard(_ destination: Destination) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                VStack(alignment: .leading, spacing: 3) {
                    Text(destination.name)
                        .font(.title3.bold())
                    Text(destination.plans.first?.name ?? "Familientag entdecken")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
                Spacer()
                if destination.id == model.selectedDestinationID {
                    Image(systemName: "checkmark.circle.fill")
                        .foregroundStyle(Color.istrivaLime)
                        .font(.title2)
                }
            }

            HStack {
                Button("Als Region wählen") {
                    model.selectDestination(destination.id)
                }
                .buttonStyle(.borderedProminent)
                .tint(.black)

                Spacer()

                if let url = googleMapsURL(for: destination) {
                    Link(destination: url) {
                        Label("Google Maps", systemImage: "map")
                            .font(.caption.bold())
                    }
                }
            }
        }
        .padding()
        .istrivaCard()
    }

    private func googleMapsURL(for destination: Destination) -> URL? {
        var components = URLComponents(string: "https://www.google.com/maps/dir/")
        components?.queryItems = [
            URLQueryItem(name: "api", value: "1"),
            URLQueryItem(
                name: "destination",
                value: "\(destination.latitude),\(destination.longitude)"
            )
        ]
        return components?.url
    }
}
