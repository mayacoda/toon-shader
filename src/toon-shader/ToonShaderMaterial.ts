import * as THREE from 'three'
import toonVertexShader from './shaders/toon.vert'
import toonFragmentShader from './shaders/toon.frag'

export class ToonShaderMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      lights: true,
      uniforms: {
        ...THREE.UniformsLib.lights,
        uGlossiness: {
          value: 20,
        },
      },
    })

    console.log(THREE.UniformsLib.lights)

    this.vertexShader = toonVertexShader
    this.fragmentShader = toonFragmentShader
  }
}
