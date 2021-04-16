
function BaseLoaderScene(providedCamera, shouldAddLights, shouldRotate, texture) {

  self = this;

  // setup some default elements
  this.scene = new THREE.Scene();
  this.stats = initStats();
  this.clock = new THREE.Clock();
  this.t = 0;

  this.camera = providedCamera;
  this.withLights = (shouldAddLights !== undefined) ? shouldAddLights : true;
  this.shouldRotate = (shouldRotate !== undefined) ? shouldRotate : true;
  this.texture=(texture !== undefined) ? texture : true;

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

  var cubeLoader = new THREE.CubeTextureLoader();
  if(this.texture===true)
  this.scene.background = cubeLoader.load(urls);
  else
  this.scene.background = cubeLoader.load(urls1);
  // initialize basic renderer
  this.renderer = initRenderer({
    antialias: true
  });
  this.renderer.shadowMap.enabled = true;

  this.trackballControls = initTrackballControls(this.camera, this.renderer);

  
  this.render = function (mesh, camera, orbit) {
    self.scene.add(mesh);
    self.camera = camera;
    self.mesh = mesh;
    self.t = 0;
    self._render(orbit);
    //console.log(self.scene)
  }

  this._render = function (orbit) {
    self.stats.update();
    self.trackballControls.update(self.clock.getDelta());

    /*                                                  // for child-parent
    self.mesh.children.forEach(function (child) {
      if (orbit) {
        self.t += 0.004;          
        child.position.x = 160 * Math.cos(self.t) - 50;
        child.position.z = 160 * Math.sin(self.t) - 300 ; 
      }
      self.renderer.render(self.scene, self.camera);
    }); 
    */

    if (orbit) {              // for group
      self.t += 0.004;          
      self.mesh.position.x = 160 * Math.cos(self.t) - 50;
      self.mesh.position.z = 160 * Math.sin(self.t) - 300 ;
    }
    self.renderer.render(self.scene, self.camera);

    requestAnimationFrame(self._render);
  }

  
  this._addLights = function () {
    var keyLight = new THREE.SpotLight(0xffffff);
    keyLight.position.set(-100, 100, 100);
    keyLight.intensity = 2;
    keyLight.lookAt(new THREE.Vector3(0, 15, 0));
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.height = 4096;
    keyLight.shadow.mapSize.width = 4096;
    this.scene.add(keyLight);

    var backlight1 = new THREE.SpotLight(0xaaaaaa);
    backlight1.position.set(150, 40, -20);
    backlight1.intensity = 0.5;
    backlight1.lookAt(new THREE.Vector3(0, 15, 0));
    this.scene.add(backlight1);

    var backlight2 = new THREE.SpotLight(0xaaaaaa);
    backlight2.position.set(-150, 40, -20);
    backlight2.intensity = 0.5;
    backlight2.lookAt(new THREE.Vector3(0, 15, 0));
    this.scene.add(backlight2);
  }

  if (this.withLights) this._addLights();

}