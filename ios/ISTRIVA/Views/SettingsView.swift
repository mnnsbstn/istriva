import SwiftUI
import ISTRIVACore

struct SettingsView: View {
    @EnvironmentObject private var model: AppModel

    var body: some View {
        NavigationStack {
            Form {
                Section("Aktuelle Region") {
                    Picker(
                        "Destination",
                        selection: Binding(
                            get: { model.selectedDestinationID },
                            set: model.selectDestination
                        )
                    ) {
                        ForEach(model.destinations) { destination in
                            Text(destination.name).tag(destination.id)
                        }
                    }
                }

                Section("Familie") {
                    Stepper(
                        "Erwachsene: \(model.family.adults)",
                        value: Binding(
                            get: { model.family.adults },
                            set: model.updateAdults
                        ),
                        in: 1...8
                    )
                    Stepper(
                        "Kinder: \(model.family.children)",
                        value: Binding(
                            get: { model.family.children },
                            set: model.updateChildren
                        ),
                        in: 0...8
                    )
                }

                NativeNotificationSettings(
                    service: model.notificationService
                )

                Section("Über ISTRIVA") {
                    LabeledContent("Slogan", value: "Mehr erleben. Weniger planen.")
                    LabeledContent("Regionen", value: "\(model.destinations.count)")
                    LabeledContent(
                        "Version",
                        value: Bundle.main.object(
                            forInfoDictionaryKey: "CFBundleShortVersionString"
                        ) as? String ?? "1.0"
                    )
                    Link(
                        "Datenschutz & Support",
                        destination: URL(string: "https://mnnsbstn.github.io/istriva/")!
                    )
                }
            }
            .navigationTitle("Einstellungen")
            .toolbarBackground(Color.istrivaLime, for: .navigationBar)
            .toolbarBackground(.visible, for: .navigationBar)
        }
    }

    @ViewBuilder
    private func NativeNotificationSettings(
        service: NotificationService
    ) -> some View {
        NotificationSettingsSection(service: service)
    }

    private struct NotificationSettingsSection: View {
        @EnvironmentObject private var model: AppModel
        @ObservedObject var service: NotificationService

        var body: some View {
            Section("Benachrichtigungen") {
                Toggle(
                    "Wetter-Updates",
                    isOn: Binding(
                        get: { model.notificationTopics.weather },
                        set: {
                            model.updateNotificationTopics(
                                weather: $0,
                                news: model.notificationTopics.news
                            )
                        }
                    )
                )
                Toggle(
                    "Istrien-News & Hinweise",
                    isOn: Binding(
                        get: { model.notificationTopics.news },
                        set: {
                            model.updateNotificationTopics(
                                weather: model.notificationTopics.weather,
                                news: $0
                            )
                        }
                    )
                )

                if service.isSubscribed {
                    Label("Benachrichtigungen sind aktiv", systemImage: "checkmark.circle.fill")
                        .foregroundStyle(.green)
                    Button("Benachrichtigungen deaktivieren", role: .destructive) {
                        model.disableNotifications()
                    }
                } else if model.notificationTopics.tagValue != nil {
                    Button {
                        model.updateNotificationTopics(
                            weather: model.notificationTopics.weather,
                            news: model.notificationTopics.news
                        )
                    } label: {
                        if service.isRequestInFlight {
                            ProgressView()
                        } else {
                            Label("Benachrichtigungen aktivieren", systemImage: "bell")
                        }
                    }
                    .disabled(service.isRequestInFlight)
                }
            } footer: {
                Text("Die Zustellung erfolgt über OneSignal und wird nach Region und Thema gefiltert.")
            }
        }
    }
}
