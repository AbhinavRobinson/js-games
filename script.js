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
var material = new THREE.MeshBasicMaterial({
  wireframe: true,
  wireframeLinewidth: 0.001,
});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  cube.rotation.x += 0.001;
  cube.rotation.y += 0.002;
}
animate();
