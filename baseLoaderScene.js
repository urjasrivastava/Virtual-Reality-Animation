/**
 * Simple base class, which setups a simple scene which is used to 
 * demonstrate the different loaders. This create a scene, three
 * lights, and slowly rotates the model, around the z-axis
 */
function BaseLoaderScene(groundLights, texture, spotlight, attach) {
  self = this;
  // setup some default elements
  this.attach = attach;
  this.camera = initCamera(new THREE.Vector3(0, 0, 70));
  this.scene = new THREE.Scene();
  this.stats = initStats();
  this.clock = new THREE.Clock();
  this.withLights = groundLights;
  this.spotlight = spotlight;
  this.texture = texture;
  this.flyControls;
  this.firstPersonControl;
  this.earth, this.mars, this.candycylinder1, this.candycylinder2, this.asteroid1, this.asteroid2, this.asteroid3, this.candy1, this.candy2, this.candy3;
  this.renderer = initRenderer({
    antialias: true
  });
  
  this.group = new THREE.Group();
  this.group_of_asteriods = new THREE.Group();
  this.group_of_candies = new THREE.Group();
  this.mario;
  this.astronaut;
  this.alein;

  this.initObjects = function () {
    var textureLoader = new THREE.TextureLoader();
    var material;

    var sphere = new THREE.SphereGeometry(10, 20, 20);
    material = new THREE.MeshPhongMaterial({
      map: textureLoader.load("./assets/textures/earth/Earth.png"),
      normalMap:
        textureLoader.load("./assets/textures/earth/EarthNormal.png"),
      specularMap:
        textureLoader.load("./assets/textures/earth/EarthSpec.png"),
      normalScale: new THREE.Vector2(6, 6)
    });
    self.earth = new THREE.Mesh(sphere, material);
    self.earth.position.x = -50;
    self.earth.position.y = 0;
    self.earth.position.z = -300;
    self.earth.name = "static";
    sphere = new THREE.SphereGeometry(20, 50, 50);
    material = new THREE.MeshPhongMaterial({
      map: textureLoader.load('./assets/textures/mars/mars_1k_color.jpg'),
      normalMap: textureLoader.load("./assets/textures/mars/mars_1k_normal.jpg"),
      normalScale: new THREE.Vector2(6, 6)
    });
    self.mars = new THREE.Mesh(sphere, material);
    self.mars.position.x = 50;
    self.mars.position.y = 5;
    self.mars.position.z = -250;
    self.mars.name = "static";


    var cylinder = new THREE.CylinderGeometry(10, 10, 50);
    material = new THREE.MeshPhongMaterial({
      map: textureLoader.load("./assets/textures/dynamic-obstacles/m_candy3.jpg"),
    });
    self.candycylinder1 = new THREE.Mesh(cylinder, material);
    self.candycylinder1.position.x = -50;
    self.candycylinder1.position.y = 0;
    self.candycylinder1.position.z = -300;
    self.candycylinder1.name = "static";

    cylinder = new THREE.CylinderGeometry(10, 10, 40);
    material = new THREE.MeshPhongMaterial({
      map: textureLoader.load('./assets/textures/dynamic-obstacles/m_candy5.jpg'),
    });
    self.candycylinder2 = new THREE.Mesh(cylinder, material);
    self.candycylinder2.position.x = 50;
    self.candycylinder2.position.y = 5;
    self.candycylinder2.position.z = -250;
    self.candycylinder2.name = "static";


    var hedron = new THREE.IcosahedronGeometry(10);
    material = new THREE.MeshPhongMaterial({
      map: textureLoader.load('./assets/textures/dynamic-obstacles/m_asteroid.jpg'),
    });
    self.asteroid1 = new THREE.Mesh(hedron, material);
    self.asteroid1.position.x = -100;
    self.asteroid1.position.y = 5;
    self.asteroid1.position.z = -50;
    self.asteroid1.name = "dynamic"
    //self.asteroid1.scale.set(0.65, 0.65, 0.65);
    self.group_of_asteriods.add(self.asteroid1);

    material = new THREE.MeshPhongMaterial({
      map: textureLoader.load('./assets/textures/dynamic-obstacles/m_candy1.jpg'),
    });

    self.candy1 = new THREE.Mesh(hedron, material);
    self.candy1.position.x = -100;
    self.candy1.position.y = 5;
    self.candy1.position.z = -50;
    self.candy1.name = "dynamic"
    self.group_of_candies.add(self.candy1);

    hedron = new THREE.DodecahedronGeometry(5);
    material = new THREE.MeshPhongMaterial({
      map: textureLoader.load('./assets/textures/dynamic-obstacles/m_meteorite.jpg'),
    });
    self.asteroid2 = new THREE.Mesh(hedron, material);
    self.asteroid2.position.x = 100;
    self.asteroid2.position.y = 5;
    self.asteroid2.position.z = -50;
    self.asteroid2.name = "dynamic"
    self.group_of_asteriods.add(self.asteroid2);

    material = new THREE.MeshPhongMaterial({
      map: textureLoader.load('./assets/textures/dynamic-obstacles/m_candy2.jpg'),
    });

    self.candy2 = new THREE.Mesh(hedron, material);
    self.candy2.position.x = 100;
    self.candy2.position.y = 5;
    self.candy2.position.z = -50;
    self.candy2.name = "dynamic"
    self.group_of_candies.add(self.candy2);

    hedron = new THREE.IcosahedronGeometry(8);
    material = new THREE.MeshPhongMaterial({
      map: textureLoader.load('./assets/textures/dynamic-obstacles/m_metal.jpg'),
    });
    self.asteroid3 = new THREE.Mesh(hedron, material);
    self.asteroid3.position.x = 90;
    self.asteroid3.position.y = 8;
    self.asteroid3.position.z = -70;
    self.asteroid3.name = "dynamic";
    self.group_of_asteriods.add(self.asteroid3);

    material = new THREE.MeshPhongMaterial({
      map: textureLoader.load('./assets/textures/dynamic-obstacles/m_candy4.jpg'),
    });

    self.candy3 = new THREE.Mesh(hedron, material);
    self.candy3.position.x = 90;
    self.candy3.position.y = 8;
    self.candy3.position.z = -70;
    self.candy3.name = "dynamic"
    self.group_of_candies.add(self.candy3);

    self.group = new THREE.Group();
    var loader = new THREE.OBJLoader();
    loader.load('./assets/models/spaceship/SciFi_Fighter_AK5.obj', function (spaceship) {

      var material = new THREE.MeshPhongMaterial({
        map: textureLoader.load('./assets/models/spaceship/spaceship_diffuse.jpg'),
        normalMap: textureLoader.load("./assets/models/spaceship/spaceship_normal.jpg"),
        specularMap: textureLoader.load("./assets/models/spaceship/spaceship_lights.jpg"),
        normalScale: new THREE.Vector2(1, 1)
      });

      spaceship.children.forEach(function (child) {
        child.material = material;
        child.geometry.computeVertexNormals();
        child.geometry.computeFaceNormals();
      });
      spaceship.scale.set(0.03, 0.03, 0.03);
      spaceship.position.set(-40, -40, -100);
      spaceship.castShadow = true;
      spaceship.name = "leader"

      var follower1 = spaceship.clone();
      follower1.position.set(-40, -40, -30);
      follower1.scale.set(0.03, 0.03, 0.03);
      follower1.name = "1";
      var follower2 = spaceship.clone();
      follower2.position.set(-40, -40, 40);
      follower2.scale.set(0.03, 0.03, 0.03);
      follower2.name = "2";
      self.group.add(spaceship);             // for group
      self.group.add(follower1);
      self.group.add(follower2);
      self.group.position.set(0, 0, -50);

      

      if (self.texture === 1) {   // alien for space texture
        var _objloader = new THREE.OBJLoader();
        _objloader.load('./assets/models/astronaut/astronaut.obj', function (astronaut) {

            var material = new THREE.MeshPhongMaterial({
            emissiveMap: textureLoader.load("./assets/models/astronaut/Astronaut_red_emis.jpg"),
            specularMap: textureLoader.load("./assets/models/astronaut/Astronaut_red_spec.jpg"),
            normalScale: new THREE.Vector2(1, 1)
          });

          astronaut.children.forEach(function (child) {
            child.material = material;
            child.geometry.computeVertexNormals();
            child.geometry.computeFaceNormals();
          });
          self.astronaut = astronaut;
          self.astronaut.scale.set(0.2, 0.2, 0.2);
          self.astronaut.position.set(0, -10, -50);
          self.astronaut.rotation.y = 3;
          self.astronaut.castShadow = true;
          self.astronaut.name = "avatar_1"
          if (self.attach === 1) {
            self.astronaut.position.set(-40, -40, -50);
            self.group.add(self.astronaut);
          }
        });
      }
   
      else if (self.texture === 2) {
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath("./assets/models/mario-sculpture-obj/")
        mtlLoader.load('mario-sculpture.mtl', function (materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load('./assets/models/mario-sculpture-obj/mario-sculpture.obj', function (mario) {
          self.mario = mario;
          self.mario.scale.set(.2, .2, .2);
          self.mario.position.set(0, -10, -50);
          self.mario.rotation.y = 60;
          self.mario.name = "avatar_2";
          if (self.attach === 1) {
            self.mario.position.set(-40, -40, -50);
            self.group.add(self.mario); 
          }

        });
      });
    }
    
    });
  }
  this.updateScene = function () {
    var urls = [
      './assets/textures/cubemap/top.png',
      './assets/textures/cubemap/top.png',
      './assets/textures/cubemap/top.png',
      './assets/textures/cubemap/top.png',
      './assets/textures/cubemap/top.png',
      './assets/textures/cubemap/top.png'
    ];
    var urls1 = [
      './assets/textures/cubemap/top1.png',
      './assets/textures/cubemap/top1.png',
      './assets/textures/cubemap/top1.png',
      './assets/textures/cubemap/top1.png',
      './assets/textures/cubemap/top1.png',
      './assets/textures/cubemap/top1.png'
    ];

    self.scene = new THREE.Scene();
    var cubeLoader = new THREE.CubeTextureLoader();
    if (self.texture === 1) {
      self.scene.background = cubeLoader.load(urls);
      self.scene.add(self.earth);
      self.scene.add(self.mars);
      if(self.attach === 0) {
         self.scene.add(self.astronaut);
      }
      self.scene.add(self.group_of_asteriods);
    }
    else if (self.texture === 2){
      self.scene.background = cubeLoader.load(urls1);
      self.scene.add(self.candycylinder1);
      self.scene.add(self.candycylinder2);
      if (self.attach === 0) {
          self.scene.add(self.mario);
      }
      self.scene.add(self.group_of_candies);
    }

    if (self.withLights === 1)
      self._addLights();
    if (self.spotlight === 1)
      self.addSpotLight();
    self.scene.add(self.group);
    //console.log(self.scene)
    self.render(self.scene, self.camera);
  }
  //this.trackballControls = initTrackballControls(this.camera, this.renderer);

  /**
   * Start the render loop of the provided object
   * 
   * @param {Three.Object3D} mesh render this mesh or object
   * @param {*} camera render using the provided camera settings
   */
  this.render = function () {
    self._render();
  }

  /**
   * Internal function, called continously to render the scene
   */
  this._render = function () {
    self.stats.update();
    //self.trackballControls.update(self.clock.getDelta());

    if (self.flyControls !== undefined)
      self.flyControls.update(self.clock.getDelta());

     // orbit of spaceship fleet
    self.group.position.x = 160 * Math.cos(self.clock.getElapsedTime()) - 50; 
    self.group.position.z = 160 * Math.sin(self.clock.getElapsedTime()) - 300;   // orbit for asteroids 

    if (self.texture === 1) {
      self.earth.rotation.y = self.clock.getElapsedTime() * 2;      // rotation of earth & mars
      self.mars.rotation.y = self.clock.getElapsedTime() * 1.5; 
      self.group_of_asteriods.position.x = 100 * Math.cos(self.clock.getElapsedTime()) - 5;
      self.group_of_asteriods.position.y = 100 * Math.sin(self.clock.getElapsedTime()) - 5;
      self.group_of_asteriods.children[0].position.x = 100 * Math.cos(-self.clock.getElapsedTime()) -10;
      self.group_of_asteriods.children[0].position.y = 100 * Math.sin(-self.clock.getElapsedTime()) -10;
    } 
    else if (self.texture === 2) {
      self.candycylinder1.rotation.y = self.clock.getElapsedTime() * 2;
      self.candycylinder2.rotation.y = self.clock.getElapsedTime() * 1.5;   
      self.group_of_candies.position.x = 100 * Math.cos(self.clock.getElapsedTime()) - 5;
      self.group_of_candies.position.y = 100 * Math.sin(self.clock.getElapsedTime()) - 5;
      self.group_of_candies.children[0].position.x = 100 * Math.cos(-self.clock.getElapsedTime()) -10;
      self.group_of_candies.children[0].position.y = 100 * Math.sin(-self.clock.getElapsedTime()) -10;
    }
    
    requestAnimationFrame(self._render);
    self.renderer.render(self.scene, self.camera);
  }
  this.addSpotLight = function () {
    var spotLight = new THREE.SpotLight("#ffffff");
    spotLight.position.set(-20, 90, 30);
    spotLight.target = self.group;
    spotLight.distance = 0;
    spotLight.angle = 0.4;
    self.scene.add(spotLight);
  }

  /**
   * Internal function, which adds a number of lights to the scene.
   */
  this._addLights = function () {
    var keyLight = new THREE.SpotLight(0xffffff);
    keyLight.position.set(00, 80, 80);
    keyLight.intensity = 2;
    keyLight.lookAt(new THREE.Vector3(0, 15, 0));
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.height = 4096;
    keyLight.shadow.mapSize.width = 4096;
    keyLight.name = "ground"
    this.scene.add(keyLight);

    var backlight1 = new THREE.SpotLight(0xaaaaaa);
    backlight1.position.set(150, 40, -20);
    backlight1.intensity = 0.5;
    backlight1.lookAt(new THREE.Vector3(0, 15, 0));
    backlight1.name = "ground"
    this.scene.add(backlight1);

    var backlight2 = new THREE.SpotLight(0xaaaaaa);
    backlight2.position.set(-150, 40, -20);
    backlight2.intensity = 0.5;
    backlight2.lookAt(new THREE.Vector3(0, 15, 0));
    backlight2.name = "ground"
    this.scene.add(backlight2);
  }

  // add the lights

  this.updateTexture = function (texture) {
    self.texture = texture;
    self.updateScene();
  }
  this.updateLights = function (lights) {
    self.withLights = lights;
    self.updateScene();
  }
  this.updateCamera = function (cam) {
    if (cam === 1) {
      self.flyControls = undefined;
      self.firstPersonControl = undefined;
      self.camera = initCamera(new THREE.Vector3(0, 0, 70));
    }
    if (cam === 2) {
      self.flyControls = initFlyControls(self.camera, self.renderer);
    }
    self.render(self.scene, self.camera);
  }
  this.updateSpotLights = function (spotlight) {
    self.spotlight = spotlight;
    self.updateScene();
  }
  this.updateAvatar = function (attach) {
    self.attach = attach;
    self.updateScene();
  }

}