import * as THREE from 'three'
import toonVertexShader from './shaders/toon.vert'
import toonFragmentShader from './shaders/toon.frag'

export class ToonShaderMaterial extends THREE.ShaderMaterial {
  constructor({ color }: { color: string }) {
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
      },
    })

    // console.log(THREE.UniformsLib.lights)

    this.vertexShader = toonVertexShader
    this.fragmentShader = toonFragmentShader
  }
}
