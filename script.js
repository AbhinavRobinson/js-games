import * as THREE from "./libs/three.module.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const light = new THREE.DirectionalLight()

document.body.appendChild(renderer.domElement);

light.position.set(-1,1,1)
camera.position.z = 5;

scene.background = new THREE.Color(0x111)

let geometry = new THREE.TorusGeometry(1, 0.5, 32, 100);

let phong = new THREE.MeshPhongMaterial({
  color: 0xaaaaaa,
  emissive: 25,
  specular: 0x0f0f0f,
  shininess: 100
})

let cube = new THREE.Mesh(geometry, phong);

scene.add(light)
scene.add(cube);

let rotationMatrix = new THREE.Vector3(1,1,1);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  rotateAroundObjectAxis(cube, rotationMatrix, (Math.PI / 180)/4);
}
animate();

// HELPERS

var rotObjectMatrix;
function rotateAroundObjectAxis(object, axis, radians) {
    rotObjectMatrix = new THREE.Matrix4();
    rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);

    object.matrix.multiply(rotObjectMatrix);
    object.rotation.setFromRotationMatrix(object.matrix);
}

// END OF HELPERS