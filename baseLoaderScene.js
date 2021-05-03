
function BaseLoaderScene(groundLights, texture, spotlight, attach, intensity) {
  self = this;
  // setup some default elements
  this.intensity = intensity;
  this.attach = attach;
  this.camera = initCamera(new THREE.Vector3(-20, 0, 200));
  this.avatar_camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  this.scene = new THREE.Scene();
  this.stats = initStats();
  this.clock = new THREE.Clock();
  this.withLights = groundLights;
  this.spotlight = spotlight;
  this.texture = texture;
  this.flyControls;
  this.camera_selected = 1;
  this.firstPersonControl;
  this.earth, this.mars, this.candycylinder1, this.candycylinder2, this.asteroid1, this.asteroid2, this.asteroid3, this.candy1, this.candy2, this.candy3;
  this.astronaut, this.mario;
  this.renderer = initRenderer({
    antialias: true
  });

  this.group = new THREE.Group();
  this.group_of_asteriods = new THREE.Group();
  this.group_of_candies = new THREE.Group();

  this.Collision_object_names = ['Mars', 'Asteriods', 'Satellite']

  // To remove unwanted warnings in console 
  console.warn = () => { };

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
    self.mars.receiveShadow = true;
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

  }
  this.initMovingObjects = function () {
    var textureLoader = new THREE.TextureLoader();
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

      var pointColor = "#00ff00";
      var tailLight = new THREE.PointLight(pointColor);
      tailLight.decay = 0.1
      tailLight.position.set(-40, -38, 40)
      tailLight.intensity = intensity * 2;
      tailLight.castShadow = true;

      var sphereLighttail = new THREE.SphereGeometry(9);
      var sphereLightMaterialtail = new THREE.MeshBasicMaterial({
        color: 0x00ff00
      });
      var sphereLightMeshtail = new THREE.Mesh(sphereLighttail, sphereLightMaterialtail);
      sphereLightMeshtail.position.copy(tailLight.position)

      var spotLight1 = new THREE.SpotLight(0xff0000);
      spotLight1.position.set(-30, -48, -20);
      spotLight1.intensity = self.intensity * 100;
      spotLight1.distance = 0;
      spotLight1.angle = 6;

      if (texture === 1) {
        spotLight1.target = self.earth
      }
      else {
        spotLight1.target = self.candycylinder1
      }

      var follower1 = spaceship.clone();
      follower1.position.set(-40, -40, -30);
      follower1.scale.set(0.03, 0.03, 0.03);
      follower1.name = "1";
      var follower2 = spaceship.clone();
      follower2.position.set(-40, -40, 40);
      follower2.scale.set(0.03, 0.03, 0.03);
      follower2.name = "2";
      // for group
      self.group.add(spaceship);
      self.group.add(follower1);
      self.group.add(follower2);
      if (self.intensity === 1) {
        self.group.add(sphereLightMeshtail);
        self.group.add(tailLight);
        self.group.add(spotLight1);
      }
      self.group.position.set(0, 30, -50);


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
          astronaut.scale.set(0.2, 0.2, 0.2);
          astronaut.position.set(-40, -50, -100);
          astronaut.rotation.y = 3;
          astronaut.castShadow = true;
          astronaut.name = "avatar_1"
          self.astronaut = astronaut;
          if (self.attach === 1) {
            //astronaut.position.set(-40, -50, -50);
            self.group.add(astronaut);
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
            mario.scale.set(.2, .2, .2);
            mario.position.set(-40, -30, -50);
            mario.rotation.y = 60;
            mario.name = "avatar_2";
            self.mario = mario;
            if (self.attach === 1) {
              //mario.position.set(-40, -30, -50);
              self.group.add(mario);
            }
          });
        });
      }
    });
    this.satellite;
    var loader_ = new THREE.OBJLoader();
    loader_.load('./assets/models/Chandra/chandra_v09.obj', function (satellite) {
      var material = new THREE.MeshPhongMaterial({
        map: textureLoader.load('./assets/models/Chandra/texture/chandra_tex_01.png'),
        specularMap: textureLoader.load("./assets/models/Chandra/texture/foil_gold_ramp.png"),
        normalMap: textureLoader.load("./assets/models/Chandra/texture/foil_n.png"),
        normalScale: new THREE.Vector2(1, 1)
      });

      satellite.children.forEach(function (child) {
        child.material = material;
        child.geometry.computeVertexNormals();
        child.geometry.computeFaceNormals();
      });

      satellite.scale.set(2, 2, 2);
      satellite.position.set(50, 5, -250);
      satellite.castShadow = true;
      satellite.name = "satellite"
      self.satellite = satellite;
      self.updateScene();

    });
  }

  const xSpeed = 1;
  const zSpeed = 1;
  const ySpeed = 1;

  window.addEventListener("keydown", function (event) {

    if (self.attach === 2) {

      switch (event.key) {

        case "ArrowUp":
          if (self.texture === 1)
            self.astronaut.position.z -= zSpeed;
          else if (self.texture === 2)
            console.log("mario moving")
          self.mario.position.z -= zSpeed;
          break;

        case "ArrowDown":
          if (self.texture === 1)
            self.astronaut.position.z += zSpeed;
          else if (self.texture === 2)
            self.mario.position.z += zSpeed;
          break;

        case "ArrowLeft":
          if (self.texture === 1)
            self.astronaut.position.x -= xSpeed;
          else if (self.texture === 2)
            self.mario.position.x -= xSpeed;
          break;

        case "ArrowRight":
          if (self.texture === 1)
            self.astronaut.position.x += xSpeed;
          else if (self.texture === 2)
            self.mario.position.x += xSpeed;
          break;

        case "w":
          if (self.texture === 1)
            self.astronaut.position.y += ySpeed;
          else if (self.texture === 2)
            self.mario.position.y += ySpeed;
          break;

        case "s":
          if (self.texture === 1)
            self.astronaut.position.y -= ySpeed;
          else if (self.texture === 2)
            self.mario.position.y -= ySpeed;
          break;

      }
    }
  }, true);

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
      self.scene.add(self.satellite);
      self.scene.add(self.mars);
      self.scene.add(self.group_of_asteriods);
      if (self.attach === 2) {
        self.scene.add(self.astronaut);
      }

    }
    else if (self.texture === 2) {
      self.scene.background = cubeLoader.load(urls1);
      self.scene.add(self.candycylinder1);
      self.scene.add(self.candycylinder2);
      self.scene.add(self.group_of_candies);
      if (self.attach === 2) {
        self.scene.add(self.mario);
      }

    }
    // pointLight.position.copy(spaceship.position);
    if (self.withLights === 1)
      self._addLights();
    if (self.spotlight === 1)
      self.addSpotLight();
    self.scene.add(self.group);
    self.render(self.scene, self.camera);
  }
  //this.trackballControls = initTrackballControls(this.camera, this.renderer);

  this.render = function () {
    self._render();
  }

  this._render = function () {
    self.stats.update();
    //self.trackballControls.update(self.clock.getDelta());

    if (self.flyControls !== undefined)
      self.flyControls.update(self.clock.getDelta());
    // orbit of spaceship fleet
    self.group.position.x = 200 * Math.cos(self.clock.getElapsedTime() * 0.5) - 100;
    self.group.position.z = 400 * Math.sin(self.clock.getElapsedTime() * 0.5) - 300;   // orbit for asteroids 
    // console.log(self.group.position)
    if (self.texture === 1) {
      self.earth.rotation.y = self.clock.getElapsedTime() * 2;      // rotation of earth & mars
      self.mars.rotation.y = self.clock.getElapsedTime() * 1.5;
      self.group_of_asteriods.position.z = 100;
      self.group_of_asteriods.children[0].position.z = -400;
      self.group_of_asteriods.position.x = 100 * Math.cos(self.clock.getElapsedTime() * 0.6) - 5;
      self.group_of_asteriods.position.y = 100 * Math.sin(self.clock.getElapsedTime() * 0.6) - 5;
      self.group_of_asteriods.children[0].position.x = 100 * Math.cos(-self.clock.getElapsedTime() * 0.5) - 10;
      self.group_of_asteriods.children[0].position.y = 100 * Math.sin(-self.clock.getElapsedTime() * 0.5) - 10;

      self.satellite.rotation.y = self.clock.getElapsedTime();
      self.satellite.position.x = 50 * Math.cos(self.clock.getElapsedTime()) + 50;
      self.satellite.position.y = 50 * Math.cos(self.clock.getElapsedTime()) + 5;
      self.satellite.position.z = 75 * Math.sin(self.clock.getElapsedTime()) - 250;
    }
    else if (self.texture === 2) {
      self.candycylinder1.rotation.y = self.clock.getElapsedTime() * 2;
      self.candycylinder2.rotation.y = self.clock.getElapsedTime() * 1.5;
      self.group_of_candies.position.x = 100 * Math.cos(self.clock.getElapsedTime()) - 5;
      self.group_of_candies.position.y = 100 * Math.sin(self.clock.getElapsedTime()) - 5;
      self.group_of_candies.children[0].position.x = 100 * Math.cos(-self.clock.getElapsedTime() * 0.5) - 10;
      self.group_of_candies.children[0].position.y = 100 * Math.sin(-self.clock.getElapsedTime() * 0.5) - 10;
    }

    self.groupBBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    self.groupBBox.setFromObject(self.group);
    self.static1BBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    if (self.texture === 1)
      self.static1BBox.setFromObject(self.mars);
    else
      self.static1BBox.setFromObject(self.candycylinder2);
    self.static2BBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    if (self.texture === 1)
      self.static2BBox.setFromObject(self.earth);
    else
      self.static2BBox.setFromObject(self.candycylinder1);
    self.dynamicObstaclesBBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    if (self.texture === 1)
      self.dynamicObstaclesBBox.setFromObject(self.group_of_asteriods);
    else
      self.dynamicObstaclesBBox.setFromObject(self.group_of_candies);
    self.avatarBBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    if (self.texture === 1)
      self.avatarBBox.setFromObject(self.astronaut);
    else
      self.avatarBBox.setFromObject(self.mario);
    self.satellite_BBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    self.satellite_BBox.setFromObject(self.satellite);

    var Collision_objects = [];
    Collision_objects.push(self.static1BBox);
    Collision_objects.push(self.dynamicObstaclesBBox);
    Collision_objects.push(self.static2BBox);
    if (self.texture === 1)
      Collision_objects.push(self.satellite_BBox);

    var i = 0;
    for (i = 0; i < Collision_objects.length; i++) {         // for checking spaceship collisions
      if (self.groupBBox.intersectsBox(Collision_objects[i])) {
        console.log("Collision of spaceship with " + self.Collision_object_names[i]);
        self.group.position.x -= 50;
      }
    }

    var temp_arr = [];
    var Collision_objects_avatar = temp_arr.concat(Collision_objects);
    Collision_objects_avatar.push(self.groupBBox);

    if (self.attach === 2) {
      for (i = 0; i < Collision_objects_avatar.length; i++) {
        if (self.avatarBBox.intersectsBox(Collision_objects_avatar[i])) {
          if (self.texture === 1)
            self.astronaut.position.x -= 5;
          else
            self.mario.position.x -= 5;
          console.log("Avatar collision")
        }

      }
    }
    if (self.camera_selected === 3) {
      if (self.attach === 2) {
        if (self.texture === 1) {
          self.camera.position.set(self.astronaut.position.x, self.astronaut.position.y, self.astronaut.position.z);
        }
        else if (self.texture === 2) {
          self.camera.position.set(self.mario.position.x, self.mario.position.y, self.mario.position.z);
        }
      }
      else if (self.attach === 1) {
        self.camera.position.set(self.group.position.x, self.group.position.y, self.group.position.z);
      }
      if (self.firstPersonControl !== undefined)
      self.firstPersonControl.update(self.clock.getDelta());
    }
    
    self.renderer.render(self.scene, self.camera);
    requestAnimationFrame(self._render);

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
    self.initMovingObjects();
    self.updateScene();
  }
  this.updateLights = function (lights) {
    self.withLights = lights;
    self.updateScene();
  }
  this.updateShipLights = function (intensity) {
    self.intensity = intensity
    self.initMovingObjects();
    self.updateScene();
  }
  this.updateCamera = function (cam) {
    if (cam === 1) {
      self.camera_selected = 1;
      self.flyControls = undefined;
      self.firstPersonControl = undefined;
      self.camera = initCamera(new THREE.Vector3(-30, 0, 150));
      self.render(self.scene, self.camera);
    }
    if (cam === 2) {
      self.camera_selected = 2;
      self.camera = initCamera(new THREE.Vector3(-30, 0, 150));
      self.firstPersonControl = undefined;
      self.flyControls = initFlyControls(self.camera, self.renderer);
      self.render(self.scene, self.camera);
    }
    if (cam === 3) {
      self.flyControls = undefined;
      self.camera_selected = 3;
      if (self.attach === 2) {
        if (self.texture === 1) {
          self.camera.position.set(self.astronaut.position.x, self.astronaut.position.y, self.astronaut.position.z);
        }
        else if (self.texture === 2) {
          self.camera.position.set(self.mario.position.x, self.mario.position.y, self.mario.position.z);
        }
      }
      else if (self.attach === 1) {
        self.camera.position.set(self.group.position.x, self.group.position.y, self.group.position.z);
      }
      self.firstPersonControl = initFirstPersonControls(self.camera);
      self.render(self.scene, self.camera);
    }
  }
  this.updateSpotLights = function (spotlight) {
    self.spotlight = spotlight;
    self.updateScene();
  }

  this.updateAvatar = function (attach) {
    self.attach = attach;
    self.initMovingObjects();
    self.updateScene();
  }

}