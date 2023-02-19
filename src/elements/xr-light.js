/* ====================================================================================================
 * Light
 * ==================================================================================================== */

class XRLight extends HTMLElement {
    constructor() {
        super();
    }
  
    connectedCallback() {
  
        // Create Light
        let object = new THREE.PointLight(0xffffff);
  
        // Get attribtes from element and add to the object
        Array.from(this.attributes).forEach(({ name, value }) => {
            eval('object.' + XRattr(name, value));
        });

        // Add the object to the scene
        $XR.Scene.add(object);
    }
  
    disconnectedCallback() {
  
        // Remove from XRApp variable
        delete $XR.Scene.remove($XR.Scene.getObjectByName(this.getAttribute('id')));
    }
  
  }
  
  if (!customElements.get("xr-light")) { customElements.define("xr-light", XRLight); }
  