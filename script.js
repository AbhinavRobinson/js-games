import * as THREE from "./libs/three.module.js";

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.TorusGeometry(1, 0.5, 16, 50);
var material = new THREE.MeshNormalMaterial({wireframe:true});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;
var xAxis = new THREE.Vector3(1,1,1);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  rotateAroundObjectAxis(cube, xAxis, (Math.PI / 180)/4);
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