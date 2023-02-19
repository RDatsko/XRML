/* ====================================================================================================
* Loop
* ==================================================================================================== */

export class Loop {
    constructor(camera, scene, renderer) {
        this.updatables = [];
    }
  
    start() {
        $XR.Renderer.setAnimationLoop(() =>  {
            this.tick();
  
            if($XR.Variables.fakeVR) {
                $XR.Effect.render($XR.Scene, $XR.Camera);
            } else {
                $XR.Renderer.render($XR.Scene, $XR.Camera);
            }
        });
    }
  
    stop() {
        $XR.Renderer.setAnimationLoop(null);
    }
  
    tick() {
        //const deltaTime = Math.min(0.05, clock.getDelta()) / STEPS_PER_FRAME;
  
  //        for (let i = 0; i < STEPS_PER_FRAME; i++) {
            //player.update(deltaTime);
            //player.teleportIfOob();
  //            app.Controls.update();
  //        }
    }
  }
