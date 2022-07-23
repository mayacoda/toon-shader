import './style.scss'
import { Engine } from './engine/Engine'
import { MainScene } from './toon-shader/MainScene'

new Engine({
  canvas: document.querySelector('#canvas') as HTMLCanvasElement,
  experience: MainScene,
  info: {
    title: 'Three.js Toon Shader',
    documentTitle: 'Three.js Toon Shader',
    description: 'GLSL Toon Shader with Three.js',
    twitter: 'https://twitter.com/maya_ndljk',
    github: 'https://github.com/mayacoda/toon-shader'
  }
})
