///
/// 2017-10-31 Ben Scott <bescott@andrew.cmu.edu>
///
/// dream shader pass
///
import * as M from '../module.js'
import { Pass } from './module.js'
import { Dream } from '../shaders/module.js'

export default class DreamPass extends Pass {
    constructor({
            pow=[1.0, 1.0, 1.0],
            mul=[1.0, 1.0, 1.0],
            add=[0.1, 0.1, 0.1],
            mhu=[1.2, 1.0, 1.0],
            color=0XFFFFFF, filter=0XFFFFFF,
            accent=0XFFFFFF, other=0XFFFFFF,
            noise=0.5, scan=0.05, lines=2048,
            creep=1.0, darken=1.0, noir=0.0,
            hue=0.0, fill=1.0, time=0.0,
            gray=false, }={}) { super()
        let shader = Dream
        this.uniforms = M.UniformsUtils.clone(shader.uniforms)
        this.material = new M.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: shader.vertexShader,
            fragmentShader: shader.fragmentShader })
        color = M.OdysseyDoors.AbandonedIce[0]
        filter = M.OdysseyDoors.AbandonedIce[2]
        accent = M.OdysseyDoors.AbandonedIce[3]
        other = M.OdysseyDoors.AbandonedIce[1]

        // SereneFright AbandonedIce RustedWounds BurnedMemory
        // IllFireburst SomnolentEnd IncisionAils VeinEnergies
        // PiercingLove DoorsReality
        this.uniforms.gray.value = gray
        this.uniforms.time.value = time
        this.uniforms.hue.value = hue
        this.uniforms.noir.value = noir
        this.uniforms.scan.value = scan
        this.uniforms.lines.value = lines
        this.uniforms.noise.value = noise
        this.uniforms.fill.value = fill
        this.uniforms.color.value = new M.Color(color)
        this.uniforms.filter.value = new M.Color(filter)
        this.uniforms.accent.value = new M.Color(accent)
        this.uniforms.mulHue.value = new M.Vector3(...mhu)
        this.uniforms.powRGB.value = new M.Vector3(...pow)
        this.uniforms.mulRGB.value = new M.Vector3(...mul)
        this.uniforms.addRGB.value = new M.Vector3(...add)
        this.scene = new M.Scene()
        this.camera = new M.OrthographicCamera(-1,1,1,-1,0,1)
        this.quad = new M.Mesh(new M.PlaneBufferGeometry(2,2),null)
        this.quad.frustumCulled = false
        this.scene.add(this.quad)
    }

    render(renderer, write, read, delta, mask) {
        this.uniforms.tex.value = read.texture
        this.uniforms.time.value += delta
        this.quad.material = this.material
        if (this.renderToScreen) renderer.render(this.scene,this.camera)
        else renderer.render(this.scene,this.camera,write,this.clear)
    }
}