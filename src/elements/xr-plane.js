/* ====================================================================================================
* Plane
* ==================================================================================================== */

class XRPlane extends HTMLElement {
    constructor() {
        super();
    }
  
    connectedCallback() {
  
        // Create Plane
        let geometry = new THREE.PlaneGeometry(5, 5, 1, 1);
        let material = new THREE.MeshPhongMaterial( { color: '#999999' } );
        let object = new THREE.Mesh( geometry, material );
  
        // Get attribtes from element and add to the object
        Array.from(this.attributes).forEach(({ name, value }) => {
            eval('object.' + XRattr(name, value));
        });

        // Add the object to the scene
        $XR.Scene.add(object);
    }
  
    disconnectedCallback() {
  
        // Remove from XRApp variable
        delete $XR.Scene.remove($XR.Scene.getObject(this.getAttribute('id')));
    }
  
  }
  
  if (!customElements.get("xr-plane")) { customElements.define("xr-plane", XRPlane); }
  