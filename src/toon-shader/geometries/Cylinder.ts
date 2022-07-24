import * as THREE from 'three'
import { ToonShaderMaterial } from '../ToonShaderMaterial'

export class Cylinder extends THREE.Mesh {
  material: ToonShaderMaterial

  constructor() {
    super()

    this.geometry = new THREE.CylinderBufferGeometry(0, 0.5, 1, 32, 8)
    this.material = new ToonShaderMaterial({ color: '#6b8847' })

    this.castShadow = true

    this.position.y = 0.5
  }
}
