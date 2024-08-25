var width = window.innerWidth;
var height = window.innerHeight;
var action = {}, mixer, fadeAction;
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);
document.addEventListener( 'mousedown', onDocumentMouseDown, false );

var scene = new THREE.Scene;
/*scene.fog = new THREE.FogExp2( 0x2fc2fd, 0.0004 );*/

var loader = new THREE.JSONLoader;
var skinnedMesh;

var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);

camera.position.y = 150;
camera.position.z = 400;
var coords = [
{
  x: -1,
  y: 1,
  z: 0
},
{
  x: 0,
  y: 1,
  z: 0
},
{
  x: 1,
  y: 1,
  z: 0
},
{
  x: -1,
  y: 0,
  z: 0
},
{
  x: 0,
  y: 0,
  z: 0
},
{
  x: 1,
  y: 0,
  z: 0
},
{
  x: -1,
  y: -1,
  z: 0
},
{
  x: 0,
  y: -1,
  z: 0
},
{
  x: 1,
  y: -1,
  z: 0
},
{
  x: -1,
  y: 1,
  z: 1
},
{
  x: 0,
  y: 1,
  z: 1
},
{
  x: 1,
  y: 1,
  z: 1
},
{
  x: -1,
  y: 0,
  z: 1
},
{
  x: 0,
  y: 0,
  z: 1
},
{
  x: 1,
  y: 0,
  z: 1
},
{
  x: -1,
  y: -1,
  z: 1
},
{
  x: 0,
  y: -1,
  z: 1
},
{
  x: 1,
  y: -1,
  z: 1
},
{
  x: 0,
  y: 1,
  z: -1
},
{
  x: 1,
  y: 1,
  z: -1
},
{
  x: -1,
  y: 0,
  z: -1
},
{
  x: 0,
  y: 0,
  z: -1
},
{
  x: 1,
  y: 0,
  z: -1
},
// {
//   x: -1,
//   y: -1,
//   z: 1
// },
{
  x: 0,
  y: -1,
  z: -1
},
{
  x: -1,
  y: 1,
  z: -1
},
{
  x: 1,
  y: -1,
  z: -1
},
{
  x: -1,
  y: -1,
  z: -1
}
];
console.log(coords.length)
var cube;
coords.forEach(function(obj){
    cube = new THREE.Mesh( new THREE.CubeGeometry( 50, 50, 50 ), new THREE.MeshNormalMaterial() );
    cube.position.y = 60*obj.y;
    cube.position.x = 60*obj.x;
    cube.position.z = 60*obj.z;
    cube.callback = function() { console.log( this ); }
    scene.add(cube);
});

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onDocumentMouseDown( event ) {
    event.preventDefault();
    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
    var meshes = [];
    scene.children.forEach(function(obj){
      if(obj.type == "Mesh"){
        meshes.push(obj);
      }
    })
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( meshes ); 
    if ( intersects.length > 0 ) {
        // console.log(intersects[0].object);
        TweenMax.to(intersects[0].object.rotation, 1, { y:"+=" + Math.PI/4});
    }
    TweenLite.ticker.addEventListener("tick", render);
}
/*
loader.load( 'model/anim_hair.json', function( geometry, materials ) {
	materials.forEach( function ( material ) {
		material.skinning = true;
	});

	skinnedMesh = new THREE.SkinnedMesh(
	geometry,
	new THREE.MultiMaterial( materials ));
	skinnedMesh.scale.set(30,30,30);
	mixer = new THREE.AnimationMixer( skinnedMesh );
	action.walk = mixer.clipAction( geometry.animations[ 0 ] );
  action.walk.setEffectiveWeight( 1 ).play();
  skinnedMesh.position.y = -50;
  skinnedMesh.traverse(function(child){
  	if(!child instanceof THREE.Mesh){
  		child.geometry.computeVertexNormals();
  	}
  });
  scene.add( skinnedMesh );
	scene.add(camera);
});*/
controls = new THREE.OrbitControls( camera, renderer.domElement );
				//controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
				controls.enableDamping = true;
				controls.dampingFactor = 0.25;
				controls.enableZoom = true;


var skyboxGeometry = new THREE.BoxGeometry(10000, 10000, 10000);
var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
 
scene.add(skybox);
var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 300, 50);
scene.add(pointLight);

pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, -300, -50);
 
scene.add(pointLight);
/*var texture = THREE.ImageUtils.loadTexture("img/infinitemirrorspace_spherical.jpg");
texture.minFilter = THREE.LinearFilter;

sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1000, 20, 20),
  new THREE.MeshBasicMaterial({
    map: texture
  })
);

sphere.scale.x = -1;
scene.add(sphere);*/
light = new THREE.AmbientLight( 0xfffffff );
scene.add( light );
var clock = new THREE.Clock;

animate();
function animate(){
    requestAnimationFrame(animate);
    render();
};
function render() {
    var delta = clock.getDelta();
    /*controls.update();*/
    /*if (mixer) 
        mixer.update(delta); 
    if(skinnedMesh)
        camera.lookAt(skinnedMesh.position);*/
    renderer.render(scene, camera);
}
function rotateCamera(arg){
    var x,y,z;
    switch(arg){
       case 1 : x = 200, z = 200, y = 150;break;
       case 2 : x = 250, z = 70, y = 150;break;
       case 3 : x = 250, z = -70, y = 150;break;
       case 4 : x = -200, z = -200, y = 150;break;
       case 5 : x = 0, z = 400, y = 150;break;
    }
    TweenMax.to(camera.position, 1, { x:x, y:y, z:z});
    console.log(arg);    
    TweenLite.ticker.addEventListener("tick", render);
}
 