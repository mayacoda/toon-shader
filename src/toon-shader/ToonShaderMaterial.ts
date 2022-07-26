import * as THREE from 'three'
import toonVertexShader from './shaders/toon.vert'
import toonFragmentShader from './shaders/toon.frag'

export class ToonShaderMaterial extends THREE.ShaderMaterial {
  constructor({ color = '#fff' }: { color: string }) {
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

    this.vertexShader = toonVertexShader
    this.fragmentShader = toonFragmentShader
  }
}
