/* ====================================================================================================
 * Cube
 * ==================================================================================================== */

class XRCube extends HTMLElement {
    constructor() {
        super();
    }
  
    connectedCallback() {

        // Create Cube
        let geometry = new THREE.BoxGeometry()
        let material = new THREE.MeshStandardMaterial({ color: new THREE.Color(0xffffff) })

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

    static get observedAttributes() {
//        return [/* array of attribute names to monitor for changes */];
        return ['position','position.x','position.z','position.y','rotation','rotation.x','rotation.z','rotation.y',]
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
//        console.log(eval('object.' + XRattr(name, newValue)));
//        eval('object.' + XRattr(name, newValue));
    }
  
  }
  
  if (!customElements.get("xr-cube")) { customElements.define("xr-cube", XRCube); }
  