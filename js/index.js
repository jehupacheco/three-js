var body = document.getElementById('container');
var width = window.getComputedStyle(body).width.split('px')[0] * 1;
var height = window.getComputedStyle(body).height.split('px')[0] * 1;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

var directionAngle = 0;
var rotationAngle = 0;
var quaternion = new THREE.Quaternion();
var rotationAxis = new THREE.Vector3(0, 1, 0);
var initialPosition = new THREE.Vector3(0, 0, 0);

scene.background = new THREE.Color(0xffffff);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( width, height );
body.appendChild( renderer.domElement );

var light = new THREE.DirectionalLight(0xffffff);
light.position.set(1, 0, 1).normalize();
scene.add(light);

var light2 = new THREE.DirectionalLight(0xffffff);
light2.position.set(-1, 0, 0).normalize();
scene.add(light2);

var texture = new THREE.TextureLoader().load('textures/box.jpg');

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshPhongMaterial({ map: texture });
var cubes = [];

for (var i = 0; i < 5; i++) {
  cubes[i] = new THREE.Mesh( geometry, material );
  cubes[i].position.z = - 5 -i*2;
  cubes[i].position.x = -(i%2)*2;
  scene.add(cubes[i]);
}

var i = 0;

function render() {
  requestAnimationFrame(render);
  camera.position.copy(initialPosition).applyAxisAngle(rotationAxis, directionAngle);
  camera.rotation.set(0, rotationAngle, 0);
  renderer.render(scene, camera);

  if (i == 0) console.log(camera.position);
  i++
  i = i % 50;
}

document.body.addEventListener('keydown', function(e) {
  switch (e.key) {
    case 'ArrowUp':
      initialPosition.z -= 0.1;
      directionAngle = rotationAngle;
      break;
    case 'ArrowDown':
      initialPosition.z += 0.1;
      directionAngle = rotationAngle;
      break;
    case 'ArrowRight':
      initialPosition.x += 0.1;
      directionAngle = rotationAngle;
      break;
    case 'ArrowLeft':
      initialPosition.x -= 0.1;
      directionAngle = rotationAngle;
      break;
    case 'q':
      rotationAngle += 0.05;
      break;
    case 'e':
      rotationAngle -= 0.05;
      break;
    default:
      break;
  }
});

render();