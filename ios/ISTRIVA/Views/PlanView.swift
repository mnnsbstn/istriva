import SwiftUI
import ISTRIVACore

struct PlanView: View {
    @EnvironmentObject private var model: AppModel

    private var shareURL: URL {
        var components = URLComponents(string: "https://mnnsbstn.github.io/istriva/")!
        components.queryItems = [
            URLQueryItem(name: "destination", value: model.selectedDestinationID)
        ]
        return components.url!
    }

    var body: some View {
        ScrollView {
            LazyVStack(spacing: 26) {
                hero
                WeatherCard()
                planner
            }
            .padding(.horizontal, 16)
            .padding(.top, 28)
            .padding(.bottom, 32)
        }
        .background(
            LinearGradient(
                colors: [.white, .istrivaLime.opacity(0.08), .white],
                startPoint: .topTrailing,
                endPoint: .bottomLeading
            )
        )
        .safeAreaInset(edge: .top, spacing: 0) {
            BrandHeader()
        }
        .refreshable {
            await model.refreshWeather()
        }
    }

    private var hero: some View {
        VStack(alignment: .leading, spacing: 16) {
            Label("DOBRO JUTRO, FAMILIE!", systemImage: "sun.max.fill")
                .font(.caption2.bold())
                .tracking(1.6)

            Text("Euer perfekter Tag\nin \(model.selectedDestination.name).")
                .font(.system(size: 44, weight: .black, design: .rounded))
                .minimumScaleFactor(0.75)
                .lineLimit(3)

            Text("Von Küstenstädten bis zu Bergdörfern – wir planen euren entspannten Familientag überall in Istrien.")
                .foregroundStyle(.secondary)

            Picker(
                "Aktuelle Region",
                selection: Binding(
                    get: { model.selectedDestinationID },
                    set: model.selectDestination
                )
            ) {
                ForEach(model.destinations) { destination in
                    Text(destination.name).tag(destination.id)
                }
            }
            .pickerStyle(.menu)
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding()
            .background(.white)
            .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
            .overlay {
                RoundedRectangle(cornerRadius: 14, style: .continuous)
                    .stroke(.black, lineWidth: 1)
            }
            .shadow(color: .istrivaLime, radius: 0, x: 6, y: 6)
        }
    }

    private var planner: some View {
        VStack(alignment: .leading, spacing: 20) {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 4) {
                    Text("\(model.selectedDestination.shortName.uppercased()) · \(Date.now.formatted(.dateTime.day().month(.wide)).uppercased())")
                        .font(.caption2.bold())
                        .tracking(1.3)
                    Text("Euer Tagesplan")
                        .font(.largeTitle.bold())
                }

                Spacer()

                ShareLink(
                    item: shareURL,
                    subject: Text("Unser Familientag in \(model.selectedDestination.name)"),
                    message: Text("\(model.family.description): \(model.currentPlan.name)")
                ) {
                    Image(systemName: "square.and.arrow.up")
                        .frame(width: 42, height: 42)
                        .background(.white)
                        .clipShape(RoundedRectangle(cornerRadius: 12))
                        .overlay {
                            RoundedRectangle(cornerRadius: 12)
                                .stroke(.black.opacity(0.12))
                        }
                }

                Button(action: model.showAlternative) {
                    Image(systemName: "arrow.clockwise")
                        .frame(width: 42, height: 42)
                        .background(Color.istrivaLime)
                        .clipShape(RoundedRectangle(cornerRadius: 12))
                }
                .disabled(model.availableAlternativeCount < 2)
                .opacity(model.availableAlternativeCount < 2 ? 0.45 : 1)
                .accessibilityLabel("Alternative Route anzeigen")
            }

            PlannerControls()

            HStack {
                Text(model.currentPlan.name)
                    .font(.caption.bold())
                Spacer()
                metric("\(model.currentPlan.stops.count)", "Stopps")
                metric(model.currentPlan.distance, "Wege")
                metric(model.currentPlan.budget, "Budget")
            }

            ForEach(model.currentPlan.stops) { stop in
                StopCard(stop: stop)
            }
        }
        .padding(18)
        .istrivaCard()
    }

    private func metric(_ value: String, _ label: String) -> some View {
        VStack(spacing: 1) {
            Text(value).font(.caption.bold())
            Text(label).font(.caption2)
        }
        .padding(.horizontal, 8)
        .padding(.vertical, 6)
        .background(Color.istrivaSand)
        .clipShape(RoundedRectangle(cornerRadius: 8))
    }
}

private struct BrandHeader: View {
    @EnvironmentObject private var model: AppModel

    var body: some View {
        HStack(spacing: 10) {
            Image("ISTRIVALogo")
                .resizable()
                .interpolation(.high)
                .frame(width: 52, height: 52)

            VStack(alignment: .leading, spacing: 2) {
                Text("ISTRIVA")
                    .font(.headline.bold())
                    .foregroundStyle(.white)
                Text("Mehr erleben. Weniger planen.")
                    .font(.system(size: 8, weight: .bold))
                    .foregroundStyle(Color.istrivaLime)
            }

            Spacer()

            Text("\(model.family.total)")
                .font(.headline.bold())
                .foregroundStyle(.black)
                .frame(width: 34, height: 34)
                .background(Color.istrivaLime)
                .clipShape(Circle())
                .accessibilityLabel("\(model.family.total) Personen")
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 8)
        .background(.black)
    }
}

private struct WeatherCard: View {
    @EnvironmentObject private var model: AppModel

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            if let weather = model.weather {
                HStack(spacing: 14) {
                    Image(systemName: weather.symbol)
                        .font(.system(size: 30))
                        .frame(width: 64, height: 64)
                        .background(Color.istrivaLime)
                        .clipShape(Circle())

                    VStack(alignment: .leading, spacing: 2) {
                        Text("AKTUELLES WETTER")
                            .font(.caption2.bold())
                            .tracking(1)
                        Text("\(weather.temperature.rounded(), specifier: "%.0f")°")
                            .font(.system(size: 38, weight: .black))
                        Text("\(weather.condition) · gefühlt \(weather.apparentTemperature.rounded(), specifier: "%.0f")°")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                }

                Divider()

                VStack(spacing: 12) {
                    HStack {
                        weatherMetric("drop.fill", "\(Int(weather.rainProbability.rounded())) %", "Regen")
                        Spacer()
                        weatherMetric("wind", "\(Int(weather.windSpeed.rounded())) km/h", "Wind")
                        Spacer()
                        weatherMetric(
                            "sunset.fill",
                            weather.sunset?.formatted(date: .omitted, time: .shortened) ?? "–",
                            "Sonnenuntergang"
                        )
                    }

                    HStack {
                        weatherMetric(
                            "sun.max.fill",
                            weather.uvIndex.formatted(.number.precision(.fractionLength(0...1))),
                            "UV-Index"
                        )
                        Spacer()
                        weatherMetric(
                            "humidity.fill",
                            "\(Int(weather.humidity.rounded())) %",
                            "Luftfeuchtigkeit"
                        )
                        Spacer()
                        Color.clear.frame(maxWidth: .infinity)
                    }
                }
            } else if model.isLoadingWeather {
                HStack {
                    ProgressView().tint(.black)
                    Text("Wetter wird geladen …")
                }
            } else {
                Label(
                    model.weatherError ?? "Keine Wetterdaten verfügbar.",
                    systemImage: "wifi.slash"
                )
            }

            if let weatherError = model.weatherError, model.weather != nil {
                Text(weatherError)
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
        }
        .padding(20)
        .overlay(alignment: .top) {
            Color.istrivaLime.frame(height: 4)
        }
        .istrivaCard()
    }

    private func weatherMetric(_ symbol: String, _ value: String, _ label: String) -> some View {
        VStack(spacing: 4) {
            Image(systemName: symbol)
            Text(value).font(.caption.bold())
            Text(label).font(.caption2).foregroundStyle(.secondary)
        }
    }
}

private struct PlannerControls: View {
    @EnvironmentObject private var model: AppModel

    var body: some View {
        VStack(spacing: 14) {
            HStack {
                VStack(alignment: .leading) {
                    Text("ERWACHSENE").font(.caption2.bold())
                    Stepper(
                        "\(model.family.adults)",
                        value: Binding(
                            get: { model.family.adults },
                            set: model.updateAdults
                        ),
                        in: 1...8
                    )
                }

                Divider()

                VStack(alignment: .leading) {
                    Text("KINDER").font(.caption2.bold())
                    Stepper(
                        "\(model.family.children)",
                        value: Binding(
                            get: { model.family.children },
                            set: model.updateChildren
                        ),
                        in: 0...8
                    )
                }
            }

            Picker(
                "Wetter",
                selection: Binding(
                    get: { model.weatherMode },
                    set: model.selectWeather
                )
            ) {
                ForEach(WeatherMode.allCases) { mode in
                    Label(mode.title, systemImage: mode.symbol).tag(mode)
                }
            }
            .pickerStyle(.segmented)

            Picker(
                "Tempo",
                selection: Binding(
                    get: { model.pace },
                    set: model.selectPace
                )
            ) {
                ForEach(TravelPace.allCases) { pace in
                    Text(pace.title).tag(pace)
                }
            }
            .pickerStyle(.segmented)
        }
        .padding(14)
        .background(Color.istrivaLimeSoft)
        .clipShape(RoundedRectangle(cornerRadius: 14))
    }
}

private struct StopCard: View {
    @EnvironmentObject private var model: AppModel
    let stop: PlanStop

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack {
                Text(stop.time)
                    .font(.headline.monospacedDigit())
                Text(stop.category)
                    .font(.caption2.bold())
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(Color.istrivaLime)
                    .clipShape(Capsule())
                Spacer()
                Text(stop.duration)
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }

            HStack(alignment: .top, spacing: 14) {
                VStack(alignment: .leading, spacing: 8) {
                    if let url = stop.googleMapsURL {
                        Link(destination: url) {
                            HStack {
                                Text(stop.title)
                                    .font(.title3.bold())
                                Image(systemName: "arrow.up.right")
                                    .font(.caption)
                            }
                            .foregroundStyle(.black)
                        }
                    }

                    Text(stop.description)
                        .font(.subheadline)
                        .foregroundStyle(.secondary)

                    FlexibleTagLayout(tags: stop.metadata)
                }

                Spacer(minLength: 0)

                Text(stop.icon)
                    .font(.system(size: 32))
                    .frame(width: 74, height: 74)
                    .background(Color(hex: stop.colorHex))
                    .clipShape(RoundedRectangle(cornerRadius: 14))
            }

            HStack {
                if let url = stop.googleMapsURL {
                    Link(destination: url) {
                        Label("Google Maps", systemImage: "map")
                            .font(.caption.bold())
                    }
                }

                Spacer()

                Button {
                    model.toggleFavorite(stop)
                } label: {
                    Image(systemName: model.isFavorite(stop) ? "heart.fill" : "heart")
                }
                .accessibilityLabel(
                    model.isFavorite(stop)
                        ? "Aus Favoriten entfernen"
                        : "Zu Favoriten hinzufügen"
                )
            }
        }
        .padding(.vertical, 12)
        .overlay(alignment: .bottom) {
            Divider()
        }
    }
}

private struct FlexibleTagLayout: View {
    let tags: [String]

    var body: some View {
        ViewThatFits(in: .horizontal) {
            HStack(spacing: 8) {
                tagViews
            }
            VStack(alignment: .leading, spacing: 5) {
                tagViews
            }
        }
    }

    @ViewBuilder
    private var tagViews: some View {
        ForEach(tags, id: \.self) { tag in
            Text(tag)
                .font(.caption2)
                .foregroundStyle(.secondary)
        }
    }
}
