---
layout: cover
background: ./assets/backgrounds/cover.svg
info: |
  ## AR Mobile
title: "AR Mobile"
---

<style>
code {
  font-size: 1.25em !important;
}
</style>

# AR Mobile 📱

<hr />

<br/>

Vladimír Vrška \<<vvr@ciklum.com>\>, Tomáš Horáček \<<toh@ciklum.com>\>

---
layout: cover
background: ./assets/backgrounds/cover.svg
---

# Table of Contents

### 📖 1. AR on Apple platforms
### 📽️ 2. Demo

---
layout: cover
background: ./assets/backgrounds/cover.svg
---

# 📖 1. AR on Apple platforms

---

<div style="font-size: 150%">

# ARKit SDK

<v-clicks depth="2">

- 🤖 understands surroundings
  - cameras, device motion, LiDAR
- 🏭 scene processing
  - 🚪 detecting planes (floor, table, wall, window, door, ...)
- ⚓ anchoring
- 💀 face & body tracking

</v-clicks>

</div>

---

<div style="font-size: 150%">

# RealityKit SDK

<v-clicks depth="2">

- 🧑‍🔬 3D engine for ARKit
- 🎲 place 3D objects into real world
- 🏋️ physics
- 🔦 realistic lighting

</v-clicks>

</div>

---
layout: center
---

<div style="text-align: center;">

# ARKit & RealityKit

<br/>
<br/>

### available on iOS, ipadOS, and visionOS

</div>

---
layout: cover
background: ./assets/backgrounds/cover.svg
---

# 📽️ 2. Demo

---
layout: center
---

<div style="width:223px">
  <video width="886" height="1920" controls>
    <source src="/assets/videos/video-final.mp4" type="video/mp4">
  </video>
</div>

---
layout: two-cols
---

# SwiftUI

```swift
struct ContentView: View {
  var body: some View {
    ZStack(alignment: .bottom) {
      DiceARViewContainer()

      HStack {
        Button {
          DiceManager.shared.actionStream
            .send(.toggleSceneUnderstanding)
        } label: {
          SystemIcon(name: "move.3d")
        }
        Button {
          DiceManager.shared.actionStream
            .send(.addDice)
        } label: {
          SystemIcon(name: "plus")
        }
        // ... 2 more buttons
      }
    }
  }
}
```

::right::

<div style="width: 230px; margin-left: 100px">

![](/assets/images/swiftui.png)

</div>

---
layout: video-right
---

## DiceARViewContainer

```swift
struct DiceARViewContainer: UIViewRepresentable {
  func makeUIView(context: Context) -> ARView {
    let arView = ARView(frame: .zero)
    
    arView.environment.sceneUnderstanding.options = [
      .default, .collision, .physics,
    ]

    let arWorldConfig = ARWorldTrackingConfiguration()
    arWorldConfig.planeDetection = [.horizontal]

    arView.session.run(arWorldConfig)
    
    return arView
  }
}
```

<v-click>

```swift
arView.debugOptions = !showDebug ? [] : [
  .showPhysics, .showAnchorOrigins, .showFeaturePoints,
  .showSceneUnderstanding, .showAnchorGeometry,
]
```

</v-click>

::right::

<video v-click width="886" height="1920" controls>
  <source src="/assets/videos/video1.mp4" type="video/mp4">
</video>

---
layout: center
---

<div style="zoom: 1">

<video width="675" height="472" controls>
  <source src="/assets/videos/lidar.mp4" type="video/mp4">
</video>

</div>

---
layout: video-right
---

## FocusEntity

https://github.com/maxxfrazer/FocusEntity

<v-click>

```swift
func addFocusEntity() {
  guard let arView = self.arView else { return }

  self.focusEntity = FocusEntity(
    on: arView,
    style: .classic(color: .yellow)
  )
}
```

</v-click>

::right::

<video v-click width="886" height="1920" controls>
  <source src="/assets/videos/video2.mp4" type="video/mp4">
</video>

---

## addDice

<v-click>

![](/assets/images/dice.png)

</v-click>

---
layout: video-right
---

## addDice

```swift
func addDice() {
  let diceEntity = try! ModelEntity.loadModel(named: "Dice")

  diceEntity.scale = [0.2, 0.2, 0.2]
  diceEntity.position = focusEntity.position

  let diceAnchor = AnchorEntity()

  diceAnchor.addChild(diceEntity)

  arView.scene.addAnchor(diceAnchor)
}
```

::right::

<video v-click width="886" height="1920" controls>
  <source src="/assets/videos/video3.mp4" type="video/mp4">
</video>

---
layout: video-right
---

## addDicePhysics

```swift
func addDicePhysics(diceEntity: ModelEntity) {
  let boxShape = ShapeResource.generateBox(
    size: diceEntity.visualBounds(relativeTo: diceEntity).extents
  )

  diceEntity.collision = CollisionComponent(shapes: [boxShape])

  diceEntity.physicsBody = PhysicsBodyComponent(
    massProperties: PhysicsMassProperties(
      shape: boxShape,
      mass: 1.5
    ),
    material: nil,
    mode: .dynamic
  )
}
```

::right::

<video v-click width="886" height="1920" controls>
  <source src="/assets/videos/video4.mp4" type="video/mp4">
</video>

---
layout: video-right
---

## createTablePlane

```swift
func createTablePlane(focusPosition: SIMD3<Float>) -> ModelEntity {
  let tableEntity = ModelEntity(
    mesh: MeshResource.generatePlane(width: 0.5, depth: 0.5),
    materials: [
      SimpleMaterial(
        color: .red.withAlphaComponent(0.35), isMetallic: false
      )
    ]
  )
  tableEntity.position = focusEntity.position

  tableEntity.collision = CollisionComponent(
    shapes: [.generateBox(width: 0.5, height: 0.001, depth: 0.5)]
  )

  tableEntity.physicsBody = PhysicsBodyComponent(
    massProperties: .default, material: nil,
    mode: .static
  )

  return tableEntity
}
```

::right::

<video v-click width="886" height="1920" controls>
  <source src="/assets/videos/video5.mp4" type="video/mp4">
</video>

---
layout: video-right
---

## pokeDice

```swift
func pokeDice() {
  guard let diceEntity = self.diceEntity else { return }

  diceEntity.addForce([0.2, 0.5, 0.2], relativeTo: nil)

  diceEntity
    .addTorque(
      [
        Float.random(in: 0...0.4),
        Float.random(in: 0...0.4),
        Float.random(in: 0...0.4),
      ],
      relativeTo: nil
    )
}
```

::right::

<video v-click width="886" height="1920" controls>
  <source src="/assets/videos/video6.mp4" type="video/mp4">
</video>

---
layout: video-right
---

## addFloor

```swift
func addFloor() -> AnchorEntity {
  let floorEntity = ModelEntity(
    mesh: MeshResource.generatePlane(width: 10, depth: 10),
    materials: [SimpleMaterial(color: .blue, isMetallic: false)]
  )

  floorEntity.collision = CollisionComponent(shapes: [
    .generateBox(width: 10, height: 0.001, depth: 10)
  ])
  floorEntity.physicsBody = PhysicsBodyComponent(
    massProperties: .default, material: nil, mode: .static
  )

  let floorPlaneAnchor = AnchorEntity(
    .plane([.horizontal],
      classification: [.floor],
      minimumBounds: [0.5, 0.5]
    )
  )
  floorPlaneAnchor.addChild(floorEntity)

  arView.scene.addAnchor(diceAnchor)
}
```

::right::

<video v-click width="886" height="1920" controls>
  <source src="/assets/videos/video7.mp4" type="video/mp4">
</video>

---
layout: center
---

<v-clicks>

<h1 style="scale: 2">
  ✅ Done<br/><br/>
</h1>

<h1 style="scale: 2">
  😀 Easy
</h1>

</v-clicks>

---
layout: cover
background: ./assets/backgrounds/cover.svg
---

# 🙋 QA

---
layout: cover
background: ./assets/backgrounds/cover.svg
---

# Thank You!
