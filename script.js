import * as THREE from "./libs/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";

const { loader, scene, renderer, camera } = init();

makeSurface();

testCube();

function testCube() {
  let cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshPhongMaterial({
      color: 0x333333,
      emissive: 0,
      shininess: 25,
    })
  );

  cube.position.set(0, 1, 0);

  scene.add(cube);

  cube.castShadow = true;
}

// ANIMATE

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// INIT

function init() {
  const loader = new THREE.TextureLoader();

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.shadowMapEnabled = true;
  renderer.shadowMapSoft = true;

  renderer.shadowCameraNear = 3;
  renderer.shadowCameraFar = camera.far;
  renderer.shadowCameraFov = 50;

  renderer.shadowMapBias = 0.0039;
  renderer.shadowMapDarkness = 0.5;
  renderer.shadowMapWidth = 1024;
  renderer.shadowMapHeight = 1024;

  const light = new THREE.DirectionalLight();

  document.body.appendChild(renderer.domElement);

  light.position.set(-1, 1, 1);
  camera.position.set(-10, 10, 10);

  const texture = loader.load("./textures/sky.jpg", () => {
    const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
    rt.fromEquirectangularTexture(renderer, texture);
    scene.background = rt;
  });

  scene.background = texture;

  new OrbitControls(camera, renderer.domElement);

  light.castShadow = true;

  scene.add(light);
  return { loader, scene, light, renderer, camera };
}

// GET SURFACE

function makeSurface() {
  let surface = new THREE.BoxGeometry(1000, 0.001, 1000);

  const grass = loader.load("./textures/grass.jpg");

  grass.wrapS = THREE.RepeatWrapping;
  grass.wrapT = THREE.RepeatWrapping;

  grass.repeat.set(100, 100);

  let phong = new THREE.MeshPhongMaterial({
    emissive: 0,
    map: grass,
  });

  let ground = new THREE.Mesh(surface, phong);

  scene.add(ground);
  ground.receiveShadow = true;
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
