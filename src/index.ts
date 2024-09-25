import * as THREE from 'three';

// Crear la escena
const scene = new THREE.Scene();

// Crear la cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Crear el renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear una geometría de cubo
const geometry = new THREE.BoxGeometry();
// Crear un material básico de color rojo
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// Crear la malla combinando geometría y material
const cube = new THREE.Mesh(geometry, material);

// Añadir el cubo a la escena
scene.add(cube);

// Función de animación
function animate() {
  requestAnimationFrame(animate);

  // Rotar el cubo
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Renderizar la escena desde la perspectiva de la cámara
  renderer.render(scene, camera);
}

// Iniciar la animación
animate();