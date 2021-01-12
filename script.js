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

scene.background = new THREE.Color(0x224333)

let geometry = new THREE.IcosahedronGeometry()

let phong = new THREE.MeshPhongMaterial({
  color: 0x12ee66,
  emissive: 0,
  specular: 0x44aa00,
  shininess: 300
})

let cube = new THREE.Mesh(geometry, phong);
let cube2 = new THREE.Mesh(geometry, phong);
let cube3 = new THREE.Mesh(geometry, phong);
let cube4 = new THREE.Mesh(geometry, phong);

cube.position.x = 2
cube2.position.x = -2
cube3.position.y = 2
cube4.position.y = -2

scene.add(light)
scene.add(cube);
scene.add(cube2);
scene.add(cube3);
scene.add(cube4)

let rotationMatrix = new THREE.Vector3(1,1,0);
let rotationMatrix2 = new THREE.Vector3(0,1,1);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  rotateAroundObjectAxis(cube, rotationMatrix, (Math.PI / 180)/4);
  rotateAroundObjectAxis(cube2, rotationMatrix2, -(Math.PI / 180)/4);
  rotateAroundObjectAxis(cube3, rotationMatrix2, (Math.PI / 180)/4);
  rotateAroundObjectAxis(cube4, rotationMatrix, -(Math.PI / 180)/4);
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