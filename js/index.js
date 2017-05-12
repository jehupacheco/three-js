var body = document.getElementById('container');
var width = window.getComputedStyle(body).width.split('px')[0] * 1;
var height = window.getComputedStyle(body).height.split('px')[0] * 1;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 60, width / height, 0.1, 1000 );

var posZ = 5;
var angle = 0;

scene.background = new THREE.Color(0xffffff);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( width, height );
body.appendChild( renderer.domElement );

var light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 0, 1, 1 ).normalize();
scene.add(light);

var texture = new THREE.TextureLoader().load('textures/box.jpg');

var geometry = new THREE.BoxGeometry( 1, 1, 1);
var material = new THREE.MeshPhongMaterial( { map: texture } );
var cubes = [];

for (var i = 0; i < 5; i++) {
  cubes[i] = new THREE.Mesh( geometry, material );
  cubes[i].position.z = -i*2;
  cubes[i].position.x = -(i%2)*2;
  scene.add(cubes[i]);
}

// camera.position.z = posZ;
// camera.position.x = 1;
camera.matrixAutoUpdate = false;

function render() {
  requestAnimationFrame( render );
  camera.position.set(1, 0, posZ);
  camera.rotation.set(0, angle, 0)
  // var m = new THREE.Matrix4().makeTranslation(1,0,posZ);
  // camera.matrix.copy(m);
  camera.updateMatrix();
  renderer.render( scene, camera );
}

document.body.addEventListener('keydown', function(e) {
  switch (e.key) {
    case 'ArrowUp':
      posZ -= 0.1;
      // camera.position.z -= 0.1;
      break;
    case 'ArrowDown':
      posZ += 0.1;
      // camera.position.z += 0.1;
      break;
    case 'ArrowRight':
      angle -= 0.1;
      break;
    case 'ArrowLeft':
      angle += 0.1;
      break;
    default:
      break;
  }
});

render();