import "./style/styles.css";

import * as THREE from 'three';
window.THREE = THREE;

import { VRButton } from '../node_modules/three/examples/jsm/webxr/VRButton.js';
//import { StereoEffect } from '../node_modules/three/examples/jsm/effects/StereoEffect.js';
//import { LineLoop } from "three";

/*
 * XR_
 */

/*
class XR_ extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
    }

}

if (!customElements.get("xr-_")) { customElements.define("xr-_", XR_); }
*/

require('./base/loop.js');
require('./base/resizer.js');

require('./elements/xr-cube.js');
require('./elements/xr-light.js');
require('./elements/xr-model.js');
require('./elements/xr-plane.js');
require('./elements/xr-sphere.js');

require('./elements/xr-camera.js');
require('./elements/xr-scene.js');




/* ====================================================================================================
 * Application
 * ==================================================================================================== */

class XRAPP {
    constructor() {
        this.Effect;
        this.Camera;
        this.Scene;
        this.Renderer;
        this.Loop;

        this.Variables = {
            curVar: null,
            stereo: false,
            xrSession: null,
            fakeVR: false,

            // Phone motion
            orientation_a: 0,
            orientation_b: 0,
            orientation_g: 0,
            alphaOffset: 25,
            screenOrientation: 0
        };

        this.Resources = new Array();

        this.init();
        this.setupXR();
    }

    init() {
        // Setup Renderer
        this.Renderer = new THREE.WebGLRenderer({ antialias: true });
        this.Renderer.setPixelRatio(window.devicePixelRatio);
        this.Renderer.setSize(window.innerWidth, window.innerHeight);
        //        this.Renderer.physicallyCorrectLights = true;

        this.Renderer.shadowMap.enabled = true;
        this.Renderer.shadowMap.type = THREE.VSMShadowMap;
        this.Renderer.outputEncoding = THREE.sRGBEncoding;
        this.Renderer.toneMapping = THREE.ACESFilmicToneMapping;

        // Create VR scene <div>
        const VRdiv = document.createElement("div");
        VRdiv.id = "VRScene";
        VRdiv.style.cssText = "position: absolute; top: 0; width: 100vw; height: 100vh; display: block;";
        document.body.insertAdjacentElement("afterbegin", VRdiv);
        document.querySelector("#VRScene").append(this.Renderer.domElement);

        document.body.appendChild( VRButton.createButton( this.Renderer ) );
        this.Renderer.xr.enabled = true;

        // Attach VR Canvas to div element
        this.Container = document.querySelector("#VRScene");
        this.Container.append(this.Renderer.domElement);
    }

    setupXR() {
        this.Renderer.xr.addEventListener("sessionstart", () => {
            this.Variables.xrSession = this.Renderer.xr.getSession();
        })

        this.Renderer.xr.addEventListener("sessionend", () => {
        this.Variables.xrSession = null;
        })

        document.write(`
            <button id='VRIcon' class='toggleVR' style="position: fixed; bottom: 10px; left: 10px; outline: none; border: none; background: none; width: 60px; z-index: 10000;" onclick='$XR.toggleVR()' title='Toggle VR Mode for Mobile Devices Only'>
                <svg style="width: 100%; fill: white; stroke: rgba(0,0,0,0.25);" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 62.7 52.375" enable-background="new 0 0 62.7 41.9" xml:space="preserve"><path d="M53.4,5.5h-44c-2.1,0-3.7,1.7-3.7,3.7v22.6c0,2.1,1.7,3.7,3.7,3.7h13.4c1.1,0,2.1-0.6,2.5-1.6l3-7.5c1.2-2.6,4.9-2.5,6,0.1  l2.6,7.3c0.4,1,1.4,1.7,2.5,1.7h13.9c2.1,0,3.7-1.7,3.7-3.7V9.3C57.2,7.2,55.5,5.5,53.4,5.5z M20.4,27c-3.2,0-5.7-2.6-5.7-5.7  s2.6-5.7,5.7-5.7s5.7,2.6,5.7,5.7S23.6,27,20.4,27z M42.4,27c-3.2,0-5.7-2.6-5.7-5.7s2.6-5.7,5.7-5.7s5.7,2.6,5.7,5.7  S45.6,27,42.4,27z"/></svg>
            </button>

            <svg id="VROverlay" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none meet" width="100vw" height="100vh" viewBox="0, 0, 2000, 1000" style="position: absolute; top: 0; left: 0; bottom: 0; right: 0; z-index: 9999; display: none;"><g id="svgg"><path id="path0" d="M 0 0 L 0 1000 L 1000000 1000 L 1000000 0 L 0 0 z M 500.04492 15 C 636.69612 15.006191 768.82704 43.380704 892.76562 99.34375 C 896.20268 100.89576 898.95249 103.64562 900.50391 107.08398 C 1013.1637 356.78574 1013.1657 643.21219 900.50781 892.91602 C 898.9564 896.35438 896.20466 899.10424 892.76758 900.65625 C 768.82901 956.61724 636.69909 984.9898 499.95508 985 C 363.30182 984.99379 231.171 956.61724 107.23242 900.65625 C 103.79536 899.10424 101.04557 896.35438 99.494141 892.91602 C -13.163603 643.21219 -13.163603 356.78574 99.494141 107.08398 C 101.04557 103.64562 103.79536 100.89576 107.23242 99.34375 C 231.171 43.380704 363.3009 15.0062 500.04492 15 z M 1500.0449 15 C 1636.6961 15.006191 1768.827 43.380704 1892.7656 99.34375 C 1896.2026 100.89576 1898.9525 103.64562 1900.5039 107.08398 L 1900.5078 107.08398 C 2013.1656 356.78574 2013.1656 643.21219 1900.5078 892.91602 C 1898.9564 896.35438 1896.2047 899.10424 1892.7676 900.65625 C 1768.8291 956.61724 1636.6991 984.9898 1499.9551 985 C 1363.3019 984.99379 1231.1709 956.61724 1107.2324 900.65625 C 1103.7953 899.10424 1101.0455 896.35438 1099.4941 892.91602 C 986.8364 643.21219 986.8364 356.78574 1099.4941 107.08398 C 1101.0455 103.64562 1103.7953 100.89576 1107.2324 99.34375 C 1231.1709 43.380704 1363.3009 15.0062 1500.0449 15 z " stroke="none" fill="#000000" fill-rule="evenodd"></path></g></svg>
        `);
    }

    start() {
        this.Loop.start();
    }

    stop() {
        this.Loop.stop();
    }

    toggleVR() {
        if (
            DeviceMotionEvent &&
            typeof DeviceMotionEvent.requestPermission === "function"
        ) {
            DeviceMotionEvent.requestPermission();
        }

        if (this.Variables.fakeVR) {
            this.Variables.fakeVR = false;

            document.getElementById("VROverlay").style.display = "none";

            window.removeEventListener("devicemotion", this.handleMotion);
            window.removeEventListener("deviceorientation", this.handleOrientation);
            window.removeEventListener(
                "orientationchange",
                this.handleOrientationChange
            );
        } else {
            this.Variables.fakeVR = true;

            window.addEventListener("devicemotion", this.handleMotion);
            window.addEventListener("deviceorientation", this.handleOrientation);
            window.addEventListener(
                "orientationchange",
                this.handleOrientationChange
            );

            document.getElementById("VROverlay").style.display = "block";
        }

        $XR.Loop.stop();
        $XR.Loop.start();
    }

    handleMotion(event) {
        //alert('alpha: ' + event.rotationRate.alpha);
        //alert('beta: ' + event.rotationRate.beta);
        //alert('gamma: ' + event.rotationRate.gamma);
    }

    handleOrientation(event) {
        if (window.screen.orientation) {
            $XR.Variables.screenOrientation = window.screen.orientation.angle;
        } else if (typeof window.orientation === "number") {
            $XR.Variables.screenOrientation = window.orientation;
        } else if (window.screen.mozOrientationn) {
            $XR.Variables.screenOrientation = {
                "portrait-primary": 0,
                "portrait-secondary": 180,
                "landscape-primary": 90,
                "landscape-secondary": 270
            }[window.screen.mozOrientation];
        }
        $XR.Variables.orientation_a = event.alpha;
        $XR.Variables.orientation_b = event.beta;
        $XR.Variables.orientation_g = event.gamma;

        var rotType = $XR.Variables.screenOrientation === 0 || $XR.Variables.screenOrientation === 180 ? "YXZ" : "YZX";

        if (rotType == "YZX") {
            if ($XR.Variables.orientation_g >= 0) {
                $XR.Variables.orientation_b = $XR.Variables.orientation_b + $XR.Variables.alphaOffset;
            } else {
                $XR.Variables.orientation_b = $XR.Variables.orientation_b - $XR.Variables.alphaOffset;
            }
        }

        var d2r = Math.PI / 180;

        const zee = new THREE.Vector3(0, 0, 1);
        const euler = new THREE.Euler();
        const q0 = new THREE.Quaternion();
        const q1 = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5)); // - PI/2 around the x-axis

        euler.set(
            $XR.Variables.orientation_b * d2r,
            $XR.Variables.orientation_a * d2r,
            -$XR.Variables.orientation_g * d2r,
            "YXZ"
        );
        $XR.Camera.quaternion.setFromEuler(euler);
        $XR.Camera.quaternion.multiply(q1);
        $XR.Camera.quaternion.multiply(q0.setFromAxisAngle(zee, -$XR.Variables.screenOrientation));
    }

    handleOrientationChange(event) {}
}


window.$XR = new XRAPP();
