
function init() {
    loader= new BaseLoaderScene(1,1,1,1,1);
    loader.initObjects();
    loader.initMovingObjects();
    var controls = new function () {
        var self = this;
        this.texture = 1;
        this.groundLights=1;
        this.spotLight=1;
        this.cam=1;
        this.attach = 1;
        this.headlights = 1;
        
        this.turnShipLight = function (e){
            this.headlights=e;
            loader.updateShipLights(this.headlights);
        }
        this.changeTexture = function (e) {
            this.texture=e;
            loader.updateTexture(this.texture);
        }
        this.changeGroundLights=function(e){
            this.groundLights=e;
            loader.updateLights(this.groundLights);
        }
        this.changeCamera=function(e){
            this.cam=e;
            loader.updateCamera(this.cam);            
        }
        this.changeSpotLight=function(e){
            this.spotLight=e;  
            loader.updateSpotLights(this.spotLight);
        }
        this.attachAvatar = function(e) {
            this.attach = e;
            loader.updateAvatar(this.attach);
        }
    }
    var gui = new dat.GUI();
    gui.add(controls, 'texture', 1, 2).step(1).onChange(controls.changeTexture);
    gui.add(controls,'groundLights',1,2).step(1).onChange(controls.changeGroundLights);
    gui.add(controls,'cam',1,3).step(1).onChange(controls.changeCamera);
    gui.add(controls,'spotLight',1,2).step(1).onChange(controls.changeSpotLight);
    gui.add(controls, 'attach',1,2).step(1).onChange(controls.attachAvatar);
    gui.add(controls,'headlights',1,2).step(1).onChange(controls.turnShipLight);
    // setup the scene for rendering
    controls.changeTexture(1);
    controls.attachAvatar(1);
}