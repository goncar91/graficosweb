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

  private running = false;
  private speedRun = this.moveSpeed * 2;

  private isJump = false;
  private velocity = 0;
  private gravity = -9.8;
  private jumpStrength = 5;
  private cubePositionY = 0;

  private prevTime = 0;

  private controls: PointerLockControls;

  constructor(myscene: MyScene) {
    this.myScene = myscene;
    this.controls = new PointerLockControls(
      this.myScene.getCamera,
      this.myScene.getRenderer.domElement
    );
    // Event listeners para detectar las pulsaciones de teclas
    document.addEventListener("keydown", (event) => {
      console.log("event.key", event.key);
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
        case " ":
          this.isJump = true;
          break;
        case "Shift":
          this.running = true;
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
        case " ":
          this.isJump = false;
          break;
        case "Shift":
          this.running = false;
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

    this.animate(0);
  }

  private updateMovement(delta: number) {
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

    if (this.isJump) {
      this.velocity += this.gravity * delta;
      this.cubePositionY += this.velocity * delta;

      if (camera.position.y <= 1) {
        camera.position.y = 1;
        this.isJump = false;
        this.velocity = 0;
      }

      camera.position.y = this.cubePositionY;
    }
  }

  // Actualizar y renderizar la escena
  private animate(time: number) {
    requestAnimationFrame(this.animate.bind(this));

    // Calcular delta en segundos
    const delta = (time - this.prevTime) / 1000;
    this.prevTime = time;

    this.updateMovement(delta);
    this.myScene.getRenderer.render(
      this.myScene.getScene,
      this.myScene.getCamera
    );
  }
}
