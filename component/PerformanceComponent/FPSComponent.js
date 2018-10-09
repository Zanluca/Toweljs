import { Component } from "../Component";

export class FPSComponent extends Component{

    constructor({owner}) {
       super({ owner : owner });
       this.__FPS = 0;
       this.__elapsedTime = 0;
       this.__FPSCounter = 0;
       this.__lastTime = 0;
    }

    get FPS(){
        return this.__FPS;
    }

    onUpdate(deltaTime){
        let now = new Date().getTime();
        this.__FPSCounter++;
        this.__elapsedTime += deltaTime;

        if (this.__elapsedTime >= 1){
            this.__FPS = this.__FPSCounter;
            this.__FPSCounter = 0;
            this.__elapsedTime -= 1;
        }
    }

    get tag() {
        return FPSComponent.tag;
    }

    static get tag() {
        return "FPS_COMPONENT"
    }
}