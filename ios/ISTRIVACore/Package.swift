// swift-tools-version: 5.10
import PackageDescription

let package = Package(
    name: "ISTRIVACore",
    defaultLocalization: "de",
    platforms: [
        .iOS(.v17),
        .macOS(.v13)
    ],
    products: [
        .library(name: "ISTRIVACore", targets: ["ISTRIVACore"])
    ],
    targets: [
        .target(
            name: "ISTRIVACore",
            resources: [.process("Resources")]
        ),
        .testTarget(
            name: "ISTRIVACoreTests",
            dependencies: ["ISTRIVACore"]
        )
    ]
)
