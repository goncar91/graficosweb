import { MyScene } from "./MyScene";
import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";

export class Movement {
  private myScene: MyScene;

  // Movimiento. Teclado
  private moveSpeed = 0.05;
  private moveForward = false;
  private moveBackward = false;
  private moveLeft = false;
  private moveRight = false;

  // Rotación. Ratón
  private mouseSensitivity = 0.002;
  private cameraPitch = 0; // Para limitar la rotación vertical

  private velocity = new THREE.Vector3();
  private direction = new THREE.Vector3();
  private controls: PointerLockControls;

  constructor(myscene: MyScene) {
    this.myScene = myscene;
    this.controls = new PointerLockControls(
      this.myScene.getCamera,
      this.myScene.getRenderer.domElement
    );
    // Event listeners para detectar las pulsaciones de teclas
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "w":
          this.moveForward = true;
          break;
        case "s":
          this.moveBackward = true;
          break;
        case "a":
          this.moveLeft = true;
          break;
        case "d":
          this.moveRight = true;
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "w":
          this.moveForward = false;
          break;
        case "s":
          this.moveBackward = false;
          break;
        case "a":
          this.moveLeft = false;
          break;
        case "d":
          this.moveRight = false;
          break;
      }
    });
    // Configurar PointerLockControls

    this.myScene.getScene.add(this.controls.getObject());

    // Bloquear el puntero cuando se hace clic en la pantalla
    document.addEventListener("click", () => {
      this.controls.lock();
    });

    // Manejar el cambio de estado del puntero bloqueado
    this.controls.addEventListener("lock", () => {
      console.log("Pointer locked");
    });
    this.controls.addEventListener("unlock", () => {
      console.log("Pointer unlocked");
    });

    this.animate();
  }

  private updateMovement() {
    const camera = this.myScene.getCamera;
    const direction = new THREE.Vector3();

    // Movimiento hacia adelante y atrás
    if (this.moveForward) {
      direction.setFromMatrixColumn(camera.matrix, 0);
      direction.crossVectors(camera.up, direction);
      camera.position.addScaledVector(direction, this.moveSpeed);
    }
    if (this.moveBackward) {
      direction.setFromMatrixColumn(camera.matrix, 0);
      direction.crossVectors(camera.up, direction);
      camera.position.addScaledVector(direction, -this.moveSpeed);
    }

    // Movimiento hacia la izquierda y derecha
    if (this.moveLeft) {
      direction.setFromMatrixColumn(camera.matrix, 0);
      camera.position.addScaledVector(direction, -this.moveSpeed);
    }
    if (this.moveRight) {
      direction.setFromMatrixColumn(camera.matrix, 0);
      camera.position.addScaledVector(direction, this.moveSpeed);
    }
  }

  // Actualizar y renderizar la escena
  private animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.updateMovement();
    this.myScene.getRenderer.render(
      this.myScene.getScene,
      this.myScene.getCamera
    );
  }

  private updateRotation(event: MouseEvent) {
    if (this.controls.isLocked) {
      // Calcular la dirección del movimiento
      this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
      this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
      this.direction.normalize(); // Esta asegura que la diagonal no sea más rápida

      if (this.moveForward || this.moveBackward)
        this.velocity.z -= this.direction.z * this.moveSpeed * 0.1;
      if (this.moveLeft || this.moveRight)
        this.velocity.x -= this.direction.x * this.moveSpeed * 0.1;

      // Desplazar la cámara
      this.controls.moveRight(-this.velocity.x * 0.1);
      this.controls.moveForward(-this.velocity.z * 0.1);

      // Aplicar fricción
      this.velocity.x -= this.velocity.x * 0.1;
      this.velocity.z -= this.velocity.z * 0.1;
    }

    this.myScene.getRenderer.render(
      this.myScene.getScene,
      this.myScene.getCamera
    );
  }
}
