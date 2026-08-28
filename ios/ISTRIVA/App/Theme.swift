import SwiftUI

extension Color {
    static let istrivaLime = Color(red: 229 / 255, green: 1, blue: 66 / 255)
    static let istrivaInk = Color.black
    static let istrivaSurface = Color.white
    static let istrivaMuted = Color(red: 96 / 255, green: 100 / 255, blue: 95 / 255)
    static let istrivaSand = Color(red: 243 / 255, green: 244 / 255, blue: 239 / 255)
    static let istrivaLimeSoft = Color(red: 248 / 255, green: 1, blue: 210 / 255)

    init(hex: String) {
        let cleaned = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var value: UInt64 = 0
        Scanner(string: cleaned).scanHexInt64(&value)
        let red = Double((value >> 16) & 0xFF) / 255
        let green = Double((value >> 8) & 0xFF) / 255
        let blue = Double(value & 0xFF) / 255
        self.init(red: red, green: green, blue: blue)
    }
}

struct IstrivaCardModifier: ViewModifier {
    func body(content: Content) -> some View {
        content
            .background(Color.istrivaSurface)
            .clipShape(RoundedRectangle(cornerRadius: 22, style: .continuous))
            .overlay {
                RoundedRectangle(cornerRadius: 22, style: .continuous)
                    .stroke(Color.black.opacity(0.1), lineWidth: 1)
            }
            .shadow(color: .black.opacity(0.08), radius: 24, y: 12)
    }
}

extension View {
    func istrivaCard() -> some View {
        modifier(IstrivaCardModifier())
    }
}
