import * as THREE from 'three'
import toonVertexShader from './shaders/toon.vert'
import toonFragmentShader from './shaders/toon.frag'

type ToolShaderParameters = {
  color?: string
  aoMap?: THREE.Texture
  luminosityMap?: THREE.Texture
  diffuseMap?: THREE.Texture
}

export class ToonShaderMaterial extends THREE.ShaderMaterial {
  constructor({
    color = '#fff',
    aoMap,
    diffuseMap,
    luminosityMap,
  }: ToolShaderParameters) {
    super({
      lights: true,
      uniforms: {
        ...THREE.UniformsLib.lights,
        uGlossiness: {
          value: 20,
        },
        uColor: {
          value: new THREE.Color(color),
        },
        uDiffuseMap: {
          value: diffuseMap,
        },
        uLuminosityMap: {
          value: luminosityMap,
        },
        uAOMap: {
          value: aoMap,
        },
        uSubsurfaceColor: {
          value: new THREE.Color('#4fff34'),
        },
      },
    })

    this.vertexShader = toonVertexShader
    this.fragmentShader = toonFragmentShader
  }
}
