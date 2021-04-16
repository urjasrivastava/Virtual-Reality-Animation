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
    var obs = new THREE.Mesh(sphere,material);
    obs.position.x = -50;
    obs.position.y = 0;
    obs.position.z = -300;   
    obs.name= "static";
     sphere = new THREE.SphereGeometry(20, 50, 50);
     material=new THREE.MeshPhongMaterial({
        map: textureLoader.load('./assets/textures/mars/mars_1k_color.jpg'),
        normalMap:textureLoader.load("./assets/textures/mars/mars_1k_normal.jpg"),
        normalScale: new THREE.Vector2(6,6)});
    var obs1 = new THREE.Mesh(sphere,material);
    obs1.position.x = 50;
    obs1.position.y = 5;
    obs1.position.z = -250;   
    obs1.name= "static";
    var hedron= new THREE.IcosahedronGeometry(10);
    material =new THREE.MeshPhongMaterial({
        map: textureLoader.load('./assets/textures/dynamic-obstacles/m_asteroid.jpg'),
    });
    var obs2 = new THREE.Mesh(hedron,material);
    obs2.position.x =-100;
    obs2.position.y = 5;
    obs2.position.z = -50; 
    obs2.name="dynamic"
    hedron= new THREE.DodecahedronGeometry(5);
    material =new THREE.MeshPhongMaterial({
        map: textureLoader.load('./assets/textures/dynamic-obstacles/m_meteorite.jpg',),
    });
    var obs3 = new THREE.Mesh(hedron,material);
    obs3.position.x =100;
    obs3.position.y = 5;
    obs3.position.z = -50; 
    obs3.name="dynamic"
    hedron= new THREE.IcosahedronGeometry(8);
    material =new THREE.MeshPhongMaterial({
        map: textureLoader.load('./assets/textures/dynamic-obstacles/m_metal.jpg',),
    });
    var obs4 = new THREE.Mesh(hedron,material);
    obs4.position.x =90;
    obs4.position.y = 8;
    obs4.position.z = -70; 
    obs4.name="dynamic"
    loaderScene.render(obs4,camera);
    loaderScene.render(obs3,camera);
    loaderScene.render(obs2,camera);
    loaderScene.render(obs1,camera);
    loaderScene.render(obs,camera);
    }