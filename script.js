import * as THREE from "./libs/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";

const { scene, renderer, camera } = init();

makeSurface();



// ANIMATE

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// INIT

function init() {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  const light = new THREE.DirectionalLight();

  document.body.appendChild(renderer.domElement);

  light.position.set(-1, 1, 1);
  camera.position.set(-10, 10, 10);

  scene.background = new THREE.Color(0x224333);

  new OrbitControls(camera, renderer.domElement);

  scene.add(light);
  return { scene, light, renderer, camera };
}

// GET SURFACE

function makeSurface() {
  let surface = new THREE.BoxGeometry(1000, 0.001, 1000);

  let phong = new THREE.MeshPhongMaterial({
    color: 0x12ee66,
    emissive: 0,
    specular: 0x44aa00,
    shininess: 300,
  });

  let ground = new THREE.Mesh(surface, phong);

  scene.add(ground);
}

// HELPERS

var rotObjectMatrix;
function rotateAroundObjectAxis(object, axis, radians) {
  rotObjectMatrix = new THREE.Matrix4();
  rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);

  object.matrix.multiply(rotObjectMatrix);
  object.rotation.setFromRotationMatrix(object.matrix);
}

// END OF HELPERS
