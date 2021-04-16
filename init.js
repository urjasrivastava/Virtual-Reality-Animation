let texture=true;
function init() {

    // setup the scene for rendering
    var camera = initCamera(new THREE.Vector3(0, 0, 150));
    var loaderScene = new BaseLoaderScene(camera, true, true, true);
    camera.lookAt(new THREE.Vector3(0,0,0));  
   
    var textureLoader = new THREE.TextureLoader();
    var sphere = new THREE.SphereGeometry(10, 20, 20);
    var material=new THREE.MeshPhongMaterial({
        map: textureLoader.load('./assets/textures/earth/Earth.png'),
        normalMap:textureLoader.load("./assets/textures/earth/EarthNormal.png"),
        specularMap:textureLoader.load("./assets/textures/earth/EarthSpec.png"),
        normalScale: new THREE.Vector2(6,6)});
    var earth = new THREE.Mesh(sphere,material);
    earth.position.x = -50;
    earth.position.y = 0;
    earth.position.z = -300;  
    earth.scale.set(1.5, 1.5, 1.5); 
    earth.receiveShadow = true;
    earth.name= "static";

    sphere = new THREE.SphereGeometry(20, 50, 50);
    material=new THREE.MeshPhongMaterial({
        map: textureLoader.load('./assets/textures/mars/mars_1k_color.jpg'),
        normalMap:textureLoader.load("./assets/textures/mars/mars_1k_normal.jpg"),
        normalScale: new THREE.Vector2(6,6)});
    var mars = new THREE.Mesh(sphere,material);
    mars.position.x = 50;
    mars.position.y = 5;
    mars.position.z = -250; 
    mars.scale.set(0.7, 0.7, 0.7); 
    mars.receiveShadow = true;
    mars.castShadow = true; 
    mars.name= "static";

    var hedron= new THREE.IcosahedronGeometry(10);
    material =new THREE.MeshPhongMaterial({
        map: textureLoader.load('./assets/textures/dynamic-obstacles/m_asteroid.jpg'),
    });
    var asteroid1 = new THREE.Mesh(hedron,material);
    asteroid1.position.x =-100;
    asteroid1.position.y = 5;
    asteroid1.position.z = -50; 
    asteroid1.name="dynamic"

    hedron= new THREE.DodecahedronGeometry(5);
    material =new THREE.MeshPhongMaterial({
        map: textureLoader.load('./assets/textures/dynamic-obstacles/m_meteorite.jpg',),
    });
    var asteroid2 = new THREE.Mesh(hedron,material);
    asteroid2.position.x =100;
    asteroid2.position.y = 5;
    asteroid2.position.z = -50; 
    asteroid2.name="dynamic"

    hedron= new THREE.IcosahedronGeometry(8);
    material =new THREE.MeshPhongMaterial({
        map: textureLoader.load('./assets/textures/dynamic-obstacles/m_metal.jpg',),
    });
    var asteroid3 = new THREE.Mesh(hedron,material);
    asteroid3.position.x =90;
    asteroid3.position.y = 8;
    asteroid3.position.z = -70; 
    asteroid3.name="dynamic"

    group = new THREE.Group();
  
    var loader = new THREE.OBJLoader();
    
    loader.load('./assets/models/spaceship/SciFi_Fighter_AK5.obj', function (spaceship) {

    var material=new THREE.MeshPhongMaterial({
      map: textureLoader.load('./assets/models/spaceship/spaceship_diffuse.jpg'),
      normalMap:textureLoader.load("./assets/models/spaceship/spaceship_normal.jpg"),
      lightMap:textureLoader.load("./assets/models/spaceship/spaceship_lights.jpg"),
      normalScale: new THREE.Vector2(1,1)} );

    spaceship.children.forEach(function (child) {
      child.material = material;
      child.geometry.computeVertexNormals();
      child.geometry.computeFaceNormals();     
    });
    spaceship.scale.set(0.02, 0.02, 0.02);
    spaceship.position.set(-40, -40, -100);
    spaceship.castShadow = true;

    var follower1 = spaceship.clone();
    follower1.position.set(-40, -40, -30);
    follower1.scale.set(0.02, 0.02, 0.02);

    var follower2 = spaceship.clone();
    follower2.position.set(-40, -40, 20);
    follower2.scale.set(0.02, 0.02, 0.02);

    /*                                  // for child-parent
    spaceship.add(follower1);      
    spaceship.add(follower2);
    console.log(spaceship.children);
    loaderScene.render(spaceship, camera, true);
    */

    group.add(spaceship);             // for group
    group.add(follower1);
    group.add(follower2);
    group.position.set(-50, 0, -300);
    loaderScene.render(group, camera, true);

    
  });

    loaderScene.render(asteroid1, camera, false);
    loaderScene.render(asteroid2, camera, false);
    loaderScene.render(asteroid3, camera, false);
    loaderScene.render(mars, camera, false);
    loaderScene.render(earth, camera, false);

}