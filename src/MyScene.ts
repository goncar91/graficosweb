import * as THREE from "three";
import Player from "./Player";

export class MyScene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.Renderer;
  private player: Player;

  constructor() {
    this.scene = this.createScene();
    this.camera = this.createCamera();
    this.renderer = this.createRenderer();

    // Crea un objeto 3D que representará al jugador (puede ser un cubo simple)
    const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
    const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const playerMesh = new THREE.Mesh(playerGeometry, playerMaterial);

    this.player = new Player(playerMesh);
    this.scene.add(playerMesh);

    this.animate(0);
  }

  createScene() {
    return new THREE.Scene();
  }

  createCamera() {
    const camara = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camara.position.set(0, 1, 5);
    return camara;
  }

  createRenderer() {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    return renderer;
  }

  animate(time: number) {
    requestAnimationFrame(() => this.animate(time));
    // Actualizar lógica de animación

    const delta = time * 0.001; // Convertir el tiempo a segundos
    this.player.update(delta);

    this.renderer.render(this.scene, this.camera);
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
