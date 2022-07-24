import { Experience } from '../engine/Experience'
import { Engine } from '../engine/Engine'
import { Floor } from './Floor'
import { Sphere } from './geometries/Sphere'
import * as THREE from 'three'
import { Knot } from './geometries/Knot'
import { Cylinder } from './geometries/Cylinder'
import { Tentacle } from './geometries/Tentacle'

export class MainScene implements Experience {
  constructor(private engine: Engine) {}

  resources = [Tentacle.resource]

  init() {
    const floor = new Floor()
    this.engine.scene.add(floor)

    const sphere = new Sphere()
    this.engine.scene.add(sphere)

    const knot = new Knot()
    knot.position.x = -1.25
    this.engine.scene.add(knot)

    const cylinder = new Cylinder()
    cylinder.position.x = 1.25
    this.engine.scene.add(cylinder)

    const tentacle = new Tentacle(this.engine)
    tentacle.position.z = -2.5
    this.engine.scene.add(tentacle)

    const ambientLight = new THREE.AmbientLight('#ffffff', 1)
    this.engine.scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight('#f8f1e6', 0.5)
    directionalLight.position.set(1, 1, 1)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 1024
    directionalLight.shadow.mapSize.height = 1024
    this.engine.scene.add(directionalLight)
  }

  update() {}

  resize() {}
}
