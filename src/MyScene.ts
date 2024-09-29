import * as THREE from "three";
import Player from "./Player";
import { Movement } from "./Movement";

export class MyScene {
  private scene: THREE.Scene;
  private renderer: THREE.Renderer;
  private camera: THREE.PerspectiveCamera;
  private player: Player;
  private movement: Movement;

  constructor() {
    this.scene = this.createScene();
    this.renderer = this.createRenderer();
    this.camera = this.createCamera();
    this.player = new Player();
    this.scene.add(this.player.getMesh);
    this.movement = new Movement(this);
    this.animate();
  }

  createScene() {
    return new THREE.Scene();
  }

  createRenderer() {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    return renderer;
  }

  createCamera() {
    let camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, 5);
    return camera;
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    // Actualizar lógica de animación

    this.renderer.render(this.scene, this.getCamera);
  }

  public get getScene(): THREE.Scene {
    return this.scene;
  }

  public get getCamera(): THREE.PerspectiveCamera {
    return this.camera;
  }

  public get getRenderer(): THREE.Renderer {
    return this.renderer;
  }
}
