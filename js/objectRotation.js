function buildAxis( src, dst, colorHex, dashed ) {
  var geom = new THREE.Geometry(),
      mat; 

  if(dashed) {
          mat = new THREE.LineDashedMaterial({ linewidth: 3, color: colorHex, dashSize: 3, gapSize: 3 });
  } else {
          mat = new THREE.LineBasicMaterial({ linewidth: 3, color: colorHex });
  }

  geom.vertices.push( src.clone() );
  geom.vertices.push( dst.clone() );
  geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

  var axis = new THREE.Line( geom, mat, THREE.LinePieces );

  return axis;
}

function buildAxes( length ) {
  var axes = new THREE.Object3D();

  axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), 0xFF0000, false ) ); // +X
  axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -length, 0, 0 ), 0xFF0000, true) ); // -X
  axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), 0x00FF00, false ) ); // +Y
  axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -length, 0 ), 0x00FF00, true ) ); // -Y
  axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), 0x0000FF, false ) ); // +Z
  axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -length ), 0x0000FF, true ) ); // -Z

  return axes;
}

var body = document.getElementById('container');
var width = window.getComputedStyle(body).width.split('px')[0] * 1;
var height = window.getComputedStyle(body).height.split('px')[0] * 1;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, width / height, 0.1, 1000 );
var angle = 0;
var axis = new THREE.Vector3(0, 1, 0);
var initialPosition = new THREE.Vector3(5, 0, 0);
var renderer = new THREE.WebGLRenderer();

axis.normalize();
scene.background = new THREE.Color(0xffffff);

renderer.setSize( width, height );
body.appendChild( renderer.domElement );

var light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 0, 1, 1 ).normalize();
scene.add(light);

var texture = new THREE.TextureLoader().load('textures/box.jpg');

var geometry = new THREE.BoxGeometry( 1, 1, 1);
var material = new THREE.MeshPhongMaterial( { map: texture } );
var cube = new THREE.Mesh(geometry, material);
cube.position.x = 5;

scene.add(cube);
camera.position.set(3, 5, 12);
camera.lookAt(new THREE.Vector3(0, 0, 0));

axes = buildAxes(1000);
scene.add(axes);

function render() {
  requestAnimationFrame(render);
  angle += 0.01;
  cube.rotation.set(0, angle, 0);
  cube.position.copy(initialPosition).applyAxisAngle(axis, angle);
  renderer.render(scene, camera);
}

render();