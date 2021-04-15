let texture=false;
function init() {

    // setup the scene for rendering
    var camera = initCamera(new THREE.Vector3(0, 0, 70));
    var loaderScene = new BaseLoaderScene(camera);
    camera.lookAt(new THREE.Vector3(0,0,0));  
   
    var textureLoader = new THREE.TextureLoader();
    var sphere = new THREE.SphereGeometry(10, 20, 20);
    var material=new THREE.MeshPhongMaterial({
        map: textureLoader.load('./assets/textures/earth/Earth.png'),
        normalMap:textureLoader.load("./assets/textures/earth/EarthNormal.png"),
        specularMap:textureLoader.load("./assets/textures/earth/EarthSpec.png"),
        normalScale: new THREE.Vector2(6,6)});
    var earth = new THREE.Mesh(sphere,material);
    earth.position.x = 0;
    earth.position.y = 0;
    earth.position.z = -100;   
    earth.name= "static";
    loaderScene.render(earth,camera);
    }