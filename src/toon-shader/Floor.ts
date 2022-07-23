import * as THREE from 'three'

export class Floor extends THREE.Mesh {
  constructor() {
    super()
    this.geometry = new THREE.PlaneBufferGeometry(10, 10, 2)
    this.material = new THREE.MeshStandardMaterial({ color: '#7a7775' })
    this.receiveShadow = true

    this.rotation.x = -Math.PI / 2
  }
}
