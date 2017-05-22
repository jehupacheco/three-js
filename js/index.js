var body = document.getElementById('container');
var width = window.getComputedStyle(body).width.split('px')[0] * 1;
var height = window.getComputedStyle(body).height.split('px')[0] * 1;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000);
var i = 0;
var initialPosition = new THREE.Vector3(0, 0, 0);
var initialAngle = 0;
var rotationAngle = initialAngle;
var directionAngle = rotationAngle - initialAngle;
var rotationAxis = new THREE.Vector3(0, 1, 0);
var renderer = new THREE.WebGLRenderer();
var person;

var deltaX = 0;
var deltaZ = 0;

init();
animate();

function init() {
  scene.background = new THREE.Color(0xffffff);
  // camera.position.set(0, 4, 5);
  // camera.rotation.set(-Math.PI/6, 0, 0);

  renderer.setSize( width, height );
  renderer.setPixelRatio( window.devicePixelRatio );
  body.appendChild( renderer.domElement );


  // Lights
  var light = new THREE.DirectionalLight(0xffffff);
  light.position.set(1, 0, 1).normalize();
  scene.add(light);

  var light2 = new THREE.DirectionalLight(0xffffff);
  light2.position.set(-1, 0, 0).normalize();
  scene.add(light2);

  // Boxes
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

  // Person
  // var mtlLoader = new THREE.MTLLoader();
  // mtlLoader.setPath('obj/male/');
  // mtlLoader.load('male02.mtl', function(materials) {
  //   materials.preload();

  //   var objLoader = new THREE.OBJLoader();
  //   objLoader.setMaterials(materials);
  //   objLoader.setPath('obj/male/');
  //   objLoader.load('male02.obj', function(object) {
  //     person = object;
  //     person.scale.set(0.01, 0.01, 0.01);
  //     person.rotation.set(0, Math.PI, 0);
  //     scene.add(person);
  //     person.position.copy(initialPosition);
  //   });
  // });

  camera.position.copy(initialPosition);

  document.body.addEventListener('keydown', function(e) {
    switch (e.key) {
      case 'ArrowUp':
        deltaZ = -0.1;
        directionAngle = rotationAngle - initialAngle;
        break;
      case 'ArrowDown':
        deltaZ = 0.1;
        directionAngle = rotationAngle - initialAngle;
        break;
      case 'ArrowRight':
        deltaX = 0.1;
        directionAngle = rotationAngle - initialAngle;
        break;
      case 'ArrowLeft':
        deltaX = -0.1;
        directionAngle = rotationAngle - initialAngle;
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
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  camera.position.x += deltaX*Math.cos(directionAngle) + deltaZ*Math.sin(directionAngle);
  camera.position.z += deltaZ*Math.cos(directionAngle) - deltaX*Math.sin(directionAngle);

  clearDeltas();
  camera.rotation.set(0, rotationAngle, 0);

  // if (i == 0) {
  //   console.log(directionAngle);
  // }

  i++;
  i = i % 50;
  renderer.render(scene, camera);
}

function clearDeltas() {
  deltaX = 0;
  deltaZ = 0;
}