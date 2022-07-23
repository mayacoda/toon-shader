import * as THREE from 'three'
import { ToonShaderMaterial } from './ToonShaderMaterial'

export class Sphere extends THREE.Mesh {
  material: ToonShaderMaterial

  constructor() {
    super()

    this.geometry = new THREE.SphereBufferGeometry(0.5, 64, 64)
    this.material = new ToonShaderMaterial()

    this.castShadow = true

    this.position.y = 0.5
  }
}
