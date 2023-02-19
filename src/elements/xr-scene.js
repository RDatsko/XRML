import { Loop } from '../base/loop.js';
import { StereoEffect } from '../../node_modules/three/examples/jsm/effects/StereoEffect.js';


/* ====================================================================================================
* Scene
* ==================================================================================================== */

class XRScene extends HTMLElement {
    constructor() {
        super();
  
        $XR.Scene = new THREE.Scene();
        $XR.Scene.background = new THREE.Color(0x000000);

        $XR.Effect = new StereoEffect($XR.Renderer);
        $XR.Effect.setSize(window.innerWidth, window.innerHeight);
    }
  
    connectedCallback() {
        if($XR.Camera != null) {
            $XR.Loop = new Loop($XR.Camera, $XR.Scene, $XR.Renderer);
            $XR.Loop.start();
        }
    }
  
  }
  
  if (!customElements.get("xr-scene")) { customElements.define("xr-scene", XRScene); }

  