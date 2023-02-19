import { Loop } from '../base/loop.js';
import { Resizer } from '../base/resizer.js';

/* ====================================================================================================
* Camera
* ==================================================================================================== */

class XRCamera extends HTMLElement {
    constructor() {
        super();
  
        $XR.Camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
        $XR.Camera.position.set(0, 1.7, 0);
    }
  
    connectedCallback() {
        if($XR.Scene != null) {
            $XR.Loop = new Loop($XR.Camera, $XR.Scene, $XR.Renderer);
            $XR.Loop.start();
        }

        if($XR.rezier == null) {
            $XR.Resizer = new Resizer($XR.Container, $XR.Camera, $XR.Renderer)
        }
    }
  
  }
  
  if (!customElements.get("xr-camera")) { customElements.define("xr-camera", XRCamera); }

