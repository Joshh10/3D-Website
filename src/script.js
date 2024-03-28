import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const canvas = document.getElementById('webgl');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
scene.add(camera);
camera.lookAt(scene.position);

const geometry = new THREE.BoxGeometry();

const material = new THREE.MeshStandardMaterial({ color: "blue" });
const material2 = new THREE.MeshStandardMaterial({ color: "purple" });

const cube = new THREE.Mesh(geometry, material);
const light = new THREE.DirectionalLight("white" , 20);
const ambientlight = new THREE.AmbientLight("white", 2);
const cube2 = new THREE.Mesh(geometry, material2);

const gridHelper = new THREE.GridHelper(200, 10);
//scene.add(gridHelper);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: "white" });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(400));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(7500).fill().forEach(addStar);

scene.add(ambientlight);
scene.add(light);
scene.add(cube);
scene.add(cube2);

cube.scale.x = 50;
cube.scale.y = 50;
cube.scale.z = 50;

cube.position.x = 0;
cube.position.y = 0;
cube.position.z = -50;
cube.rotation.y = Math.PI * 0.5;

cube2.scale.x = 45;
cube2.scale.y = 45;
cube2.scale.z = 45;

cube2.position.x = 0;
cube2.position.y = 0;
cube2.position.z = 50;
cube2.rotation.y = Math.PI * 0.5;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});

const controls = new OrbitControls(camera, canvas);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("black");
renderer.render(scene, camera);

const clock = new THREE.Clock();

function tick() {
  const t = clock.getElapsedTime();
  //cube.scale.x = Math.cos(t);
  cube.rotation.set(t, t, t);
  cube.position.x = Math.sin(t);
  cube.position.y = Math.cos(t);

  cube2.rotation.set(t, t, t);
  cube2.position.x = Math.sin(t);
  cube2.position.y = Math.cos(t);
  

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);


}

tick();
