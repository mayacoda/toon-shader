import * as THREE from 'three'
import { Engine } from '../../engine/Engine'
import { Resource } from '../../engine/Resources'
import { ToonShaderMaterial } from '../ToonShaderMaterial'

export class Tentacle extends THREE.Group {
  public static resource: Resource = {
    name: 'tentacle',
    path: 'models/tentacle.glb',
    type: 'gltf',
  }

  constructor(engine: Engine) {
    super()

    const gltfScene = engine.resources.getItem(Tentacle.resource.name)
    this.add(...gltfScene.scene.children)

    this.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })

    const outside = this.getObjectByName('Tentacle_1') as THREE.Mesh
    const inside = this.getObjectByName('Tentacle_2') as THREE.Mesh
    const sucker = this.getObjectByName('Tentacle_3') as THREE.Mesh

    outside.material = new ToonShaderMaterial({ color: '#231312' })
    inside.material = new ToonShaderMaterial({ color: '#e57a7a' })
    sucker.material = new ToonShaderMaterial({ color: '#b25c73' })
  }
}
