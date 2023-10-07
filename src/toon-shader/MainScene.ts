import { Experience } from '../engine/Experience'
import { Engine } from '../engine/Engine'
import * as THREE from 'three'
import { SnakePlant } from './geometries/SnakePlant'

export class MainScene implements Experience {
  constructor(private engine: Engine) {}

  resources = [...SnakePlant.resources]

  init() {
    const snakePlant = new SnakePlant(this.engine)
    this.engine.scene.add(snakePlant)

    const ambientLight = new THREE.AmbientLight('#0b83a8', 0.5)
    this.engine.scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight('#ffa600', 0.3)
    directionalLight.position.set(1, 1, 1)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 1024 * 4
    directionalLight.shadow.mapSize.height = 1024 * 4
    directionalLight.shadow.radius = 10

    this.engine.scene.add(directionalLight)

    this.engine.debug.gui
      .addColor(ambientLight, 'color')
      .name('Ambient Light')
      .onChange(() => {
        ambientLight.color.set(ambientLight.color)
      })
    this.engine.debug.gui
      .add(ambientLight, 'intensity', 0, 1, 0.01)
      .name('Ambient Intensity')

    this.engine.debug.gui
      .addColor(directionalLight, 'color')
      .name('Directional Light')
      .onChange(() => {
        directionalLight.color.set(directionalLight.color)
      })

    this.engine.debug.gui
      .add(directionalLight, 'intensity', 0, 1, 0.01)
      .name('Directional Intensity')

    console.log(this.engine.scene.toJSON())
  }

  update() {}

  resize() {}
}
