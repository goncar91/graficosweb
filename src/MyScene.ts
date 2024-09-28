import * as THREE from 'three';



export class MyScene {

    private scene:THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.Renderer;


    constructor() {
      this.scene = this.crearEscena();
      this.camera = this.crearCamara();
      this.renderer = this.crearRenderer();
      this.crearSuelos();
      this.crearParedes();
      this.animar();
    }
  
    crearEscena() {
      return new THREE.Scene();
    }
  
    crearCamara() {
      const camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camara.position.set(0, 1, 5);
      return camara;
    }
  
    crearRenderer() {
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);
      return renderer;
    }
  
    crearSuelos() {
      // Código para crear suelos
    }
  
    crearParedes() {
      // Código para crear paredes
    }
  
    animar() {
      requestAnimationFrame(() => this.animar());
      // Actualizar lógica de animación
      this.renderer.render(this.scene, this.camera);
    }

    public get getScene(): THREE.Scene {
        return this.scene;
      }
    
      public get getCamera(): THREE.PerspectiveCamera {
        return this.camera;
      }
  }
  
  
  