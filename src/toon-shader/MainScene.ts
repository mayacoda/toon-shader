import { Experience } from '../engine/Experience'
import { Engine } from '../engine/Engine'
import { Floor } from './Floor'
import { Sphere } from './Sphere'
import * as THREE from 'three'

export class MainScene implements Experience {
  sphere!: Sphere
  constructor(private engine: Engine) {}

  resources = []

  init() {
    const floor = new Floor()
    this.engine.scene.add(floor)

    this.sphere = new Sphere()
    this.engine.scene.add(this.sphere)

    const ambientLight = new THREE.AmbientLight('#ffffff', 1)
    this.engine.scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight('#dca109', 1)
    directionalLight.position.set(1, 1, 1)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 1024
    directionalLight.shadow.mapSize.height = 1024
    this.engine.scene.add(directionalLight)
  }

  update() {}

  resize() {}
}
