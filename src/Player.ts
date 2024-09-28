import { Object3D } from "three";
import InputHandler from "./InputHandler";

class Player {
  private object: Object3D;
  private inputHandler: InputHandler;
  private velocity: { x: number; y: number; z: number };
  private speed: number;
  private runSpeed: number;
  private isJumping: boolean;
  private jumpStrength: number;
  private isOnGround: boolean;

  constructor(object: Object3D) {
    this.object = object;
    this.inputHandler = new InputHandler();
    this.velocity = { x: 0, y: 0, z: 0 };
    this.speed = 0.1;
    this.runSpeed = 0.2;
    this.isJumping = false;
    this.jumpStrength = 5;
    this.isOnGround = true; // Suponiendo que el jugador comienza en el suelo
  }

  update(delta: number) {
    // Movimiento lateral
    if (
      this.inputHandler.isKeyDown("ArrowLeft") ||
      this.inputHandler.isKeyDown("a")
    ) {
      this.object.position.x -= this.speed;
    }
    if (
      this.inputHandler.isKeyDown("ArrowRight") ||
      this.inputHandler.isKeyDown("d")
    ) {
      this.object.position.x += this.speed;
    }

    // Carrera
    if (this.inputHandler.isKeyDown("Shift")) {
      this.speed = this.runSpeed;
    } else {
      this.speed = 0.1;
    }

    // Salto
    if (this.inputHandler.isKeyDown(" ") && this.isOnGround) {
      this.isJumping = true;
      this.velocity.y = this.jumpStrength;
      this.isOnGround = false;
    }

    // Aplicar la gravedad
    if (!this.isOnGround) {
      this.velocity.y -= 9.8 * delta; // Gravedad simple
    }

    // Actualizar la posición del jugador
    this.object.position.y += this.velocity.y * delta;

    // Simular el aterrizaje
    if (this.object.position.y <= 0) {
      this.object.position.y = 0;
      this.isOnGround = true;
      this.isJumping = false;
      this.velocity.y = 0;
    }
  }
}

export default Player;
