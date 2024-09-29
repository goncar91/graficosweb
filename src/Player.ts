import * as THREE from "three";

import { Object3D } from "three";

class Player {
  private mesh: Object3D;

  constructor() {
    // Crea un objeto 3D que representará al jugador (puede ser un cubo simple)
    const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
    const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.mesh = new THREE.Mesh(playerGeometry, playerMaterial);
  }

  public get getMesh(): THREE.Object3D {
    return this.mesh;
  }
}

export default Player;
