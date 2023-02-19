/* ====================================================================================================
* Sphere
* ==================================================================================================== */

class XRSphere extends HTMLElement {
    constructor() {
        super();
    }
  
    connectedCallback() {
  
        // Create Sphere
        let geometry = new THREE.SphereGeometry(.75, 32, 32);
        let material = new THREE.MeshStandardMaterial({ color: new THREE.Color(0x0000ff) });
        let object = new THREE.Mesh(geometry, material);
  
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
  
  if (!customElements.get("xr-sphere")) { customElements.define("xr-sphere", XRSphere); }
  