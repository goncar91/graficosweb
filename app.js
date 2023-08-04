import * as THREE from "./three.min.js"
console.log(THREE);
const scene = new THREE.Scene();
const fov = 75; // Grados
const aspect = window.innerWidth / window.innerHeight; // Relación de aspecto
const near = 0.1; // Si el objeto está más cerca que esta distancia no se renderiza
const far = 5; // Si el objeto está más lejos que esta distancia no se renderiza

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.z = 2;;


const canvas = document.querySelector("#canvas");
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//CUBO
const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;

const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);


const color = 0xffffff;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);


renderer.render(scene, camera);

function render(time) {
    time *= 0.001;
  
    cube.rotation.x = time;
    cube.rotation.y = time;
  
    renderer.render(scene, camera);
  
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);