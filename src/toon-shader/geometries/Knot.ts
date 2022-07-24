import * as THREE from 'three'
import { ToonShaderMaterial } from '../ToonShaderMaterial'

export class Knot extends THREE.Mesh {
  material: ToonShaderMaterial

  constructor() {
    super()

    this.geometry = new THREE.TorusKnotBufferGeometry(1, 0.4, 128, 64)
    this.material = new ToonShaderMaterial({ color: '#a15218' })

    this.scale.setScalar(0.3)

    this.castShadow = true

    this.position.y = 0.5
  }
}
