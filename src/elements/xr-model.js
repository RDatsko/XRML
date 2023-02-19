/*
 * XRModel
 */

import { DRACOLoader } from '../../node_modules/three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from '../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

class XRModel extends HTMLElement {
    constructor() {
        super();
    }

    static observedAttributes = ["src"];

    connectedCallback() {

        this.modelUrl = this.getAttribute('src');

//        let object = new THREE.Group();

        const loader = new GLTFLoader();
        loader.load(this.modelUrl, (gltf) => {
            $XR.Scene.add(gltf.scene);
        });
/*
        // Create Model
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("vendor/three/examples/js/libs/draco/");
        dracoLoader.setDecoderConfig({ type: "js" });

        const loader = new GLTFLoader()
            .setDRACOLoader(dracoLoader)
            .load(this.modelUrl, (gltf) => {
                this.updateTransform();
                this.add(gltf.scene);

//                worldOctree.fromGraphNode(gltf.scene);

                gltf.scene.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;

                        //child.castShadow = false;
                        //child.receiveShadow = false;

                        if (child.material.map) {
                            child.material.map.anisotropy = 4;
                        }
                    }
                });

                console.log(this.object);
            });
*/

        // Add the object to the scene
        //$XR.Scene.add(object);
    }

    updateMaterials(model) {
        model.traverse((child) => {
            child.material = new THREE.MeshNormalMaterial();

            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;

                //child.castShadow = false;
                //child.receiveShadow = false;

                if (child.material.map) {
                    child.material.map.anisotropy = 4;
                }
            }
        });
    }

    updateTransform() {}

    dispose() {}

    rotate(x, y, z) {
        this.rotation.x = THREE.MathUtils.degToRad(x);
        this.rotation.y = THREE.MathUtils.degToRad(y);
        this.rotation.z = THREE.MathUtils.degToRad(z);
    }

    scale(x, y, z) {
        this.scale.set(x, y, z);
    }

    setCollider() {
//        worldOctree.fromGraphNode(this);
    }

}

if (!customElements.get("xr-model")) { customElements.define("xr-model", XRModel); }
