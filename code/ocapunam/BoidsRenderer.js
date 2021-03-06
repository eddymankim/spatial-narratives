import * as THREE from '../ocapunam/module.js'

import {Boid, Swarm} from '../ocapunam/boids.js'

export default class BoidsRenderer {
    constructor({
            path = '../../data/',
            width = 1024,
            height = 1024,
            fog = { color: 0x111111, near: 1e2, far: 1e4 },
            ambient = 0x14031B,
            update = (time) => { },
            framerate = 60,
            boidCount = 100,
            }={}) {

        let clock = new THREE.Clock()
        // let listener = new THREE.AudioListener()

        // let renderer = new THREE.WebGLRenderer()
        //     renderer.setPixelRatio(window.devicePixelRatio)
        //     renderer.setSize(width, height)
        //     // renderer.setClearColor(ambient, 0)


        // let scene = new THREE.Scene()
            //scene.fog = new THREE.Fog(...Object.values(fog))
            // scene.add(new THREE.AmbientLight(ambient))

        // var camera = new THREE.OrthographicCamera(width/-2, width/2, height/2, height/-2, -1000, 1000)
        //     scene.add(camera)
        

        let swarm = this.swarm = new Swarm(width, height)
            swarm.createBoids(null, boidCount)
            // swarm.id = setInterval(swarm.animate, 33)
            
        //for (let boid in swarm.boids) scene.add(boid.mesh)

        const render = () => {        
            // update(clock.getDelta())
            swarm.animate()

            // renderer.render(scene, camera)
            requestAnimationFrame(render.bind(this))
            // setTimeout(render.bind(this), framerate)
            //console.log(swarm.boids[0])
        }

        this.init = () => render()

        // window.addEventListener('load', () => this.init(), false)
    }
}

