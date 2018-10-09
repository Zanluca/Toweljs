import { Game } from "../game/Game";
import { GameObject } from "../gameObject/GameObject";
import { Component } from "../component/Component";

export class LogicSystem {
    static fireUpdateListener (deltaTime) {
        let game = new Game();
       
        for (let key in game.listComponents) {
            let  component = game.listComponents[key];
            component.onUpdate(deltaTime);
        }

        let scene = game.scene;

        if (scene) {
            for (let key in scene.listComponents){
                let component = scene.listComponents[key];
                component.onUpdate(deltaTime);
            }
            for (let gameObject of scene.gameObjectList) {
                if (gameObject instanceof GameObject){
                    for (let index in gameObject.listComponents) {
                        let component = gameObject.listComponents[index];
                        if (component instanceof Component){
                            component.onUpdate(deltaTime);
                        }
                    }
                    LogicSystem.updateChild(gameObject.child, deltaTime);
                }
            }  
        }

        let camera = game.camera;

        if (camera){
            for (let key in camera.listComponent) {
                let component = camera.listComponent[key];
                component.onUpdate(deltaTime);
            }
        }
    }

    static updateChild(child, deltaTime){
        for (let gameObject of child) {
            for (let index in gameObject.listComponents) {
                let component = gameObject.listComponents[index];
                if (component instanceof Component){
                    component.onUpdate(deltaTime);
                }
            }
            LogicSystem.updateChild(gameObject.child, deltaTime);    
        }
    }

    static get tag () {
        return "LOGIC_SYSTEM";
    }
}