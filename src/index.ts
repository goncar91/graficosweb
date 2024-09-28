import * as THREE from 'three';
import groundTextureImage from './assets/suelo/texture.jpg'; // Importa la imagen para que Webpack la procese
import { MyScene }  from './MyScene';

let myScene = new  MyScene();


let scene = myScene.getScene;

// Crear una geometría de cubo
const geometry = new THREE.BoxGeometry();
// Crear un material básico de color rojo
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// Crear la malla combinando geometría y material
const cube = new THREE.Mesh(geometry, material);

// Añadir el cubo a la escena
scene.add(cube);


createFloor(scene);

function createFloor(scene:THREE.Scene){
  // Cargar la textura del suelo
  const textureLoader = new THREE.TextureLoader();
  const groundTexture = textureLoader.load(groundTextureImage);
  console.log(groundTexture);
  groundTexture.wrapS = THREE.RepeatWrapping;
  groundTexture.wrapT = THREE.RepeatWrapping;
  groundTexture.repeat.set(20, 20);

  // Crear un material con la textura
  const groundMaterial = new THREE.MeshBasicMaterial({ map: groundTexture });

  // Crear una geometría de plano para el suelo
  const groundGeometry = new THREE.PlaneGeometry(100, 100);

  // Crear la malla combinando geometría y material
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI/2;
  ground.position.y=-1;
  scene.add(ground);
}