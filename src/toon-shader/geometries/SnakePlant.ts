import { Group, Mesh } from 'three'
import { Resource } from '../../engine/Resources'
import { GameEntity } from '../../engine/GameEntity'
import { Engine } from '../../engine/Engine'
import { ToonShaderMaterial } from '../ToonShaderMaterial'

const MODEL = 'snake-plant'
const LUMINOSITY_MAP = 'snake-luminosity-map'
const DIFFUSE_MAP = 'snake-diffuse-map'
const AO_MAP = 'snake-ao-map'

export class SnakePlant extends Group implements GameEntity {
  static resources: Resource[] = [
    {
      name: MODEL,
      path: 'models/snake-plant.glb',
      type: 'gltf',
    },
    {
      name: LUMINOSITY_MAP,
      path: 'textures/snake-luminosity.png',
      type: 'texture',
    },
    {
      name: DIFFUSE_MAP,
      path: 'textures/snake-diffuse.png',
      type: 'texture',
    },
    {
      name: AO_MAP,
      path: 'textures/snake-ao.png',
      type: 'texture',
    },
  ]
  constructor(private engine: Engine) {
    super()

    const gltf = this.engine.resources.getItem(MODEL)
    const luminosityMap = this.engine.resources.getItem(LUMINOSITY_MAP)
    const diffuseMap = this.engine.resources.getItem(DIFFUSE_MAP)
    const aoMap = this.engine.resources.getItem(AO_MAP)

    luminosityMap.flipY = false
    diffuseMap.flipY = false
    aoMap.flipY = false

    const toonMaterial = new ToonShaderMaterial({
      color: '#e57a7a',
      luminosityMap,
      diffuseMap,
      aoMap,
    })

    gltf.scene.children.forEach((child: Mesh) => {
      child.material = toonMaterial
      // child.material = standardMaterial
      child.castShadow = true
      child.receiveShadow = true
    })

    this.engine.scene.add(gltf.scene)
  }

  resize(): void {}

  update(): void {}
}
