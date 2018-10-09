import { Game } from "../game/Game";
import { Component } from "../component/Component";
import { GameObject } from "../gameObject/GameObject";

export class KeySystem{
    static fireKeyUpListner(event){
        let game = new Game();

        for (let key in game.listComponents) {
            let  component = game.listComponents[key];
            component.onKeyUp(event.keyCode);
        }

        let scene = game.scene;

        if (scene) {
            for (let key in scene.listComponents){
                let component = scene.listComponents[key];
                component.onKeyUp(event.keyCode);
            }
            for (let gameObject of scene.gameObjectList) {
                if (gameObject instanceof GameObject){
                    for (let index in gameObject.listComponents) {
                        let component = gameObject.listComponents[index];
                        if (component instanceof Component){
                            component.onKeyUp(event.keyCode);
                        }
                    }
                    KeySystem.updateChildKeyUp(gameObject.child, event);
                }
            }  
        }

        let camera = game.camera;

        if (camera){
            for (let key in camera.listComponents) {
                let component = camera.listComponents[key];
                component.onKeyUp(event.keyCode);
            }
        }
    }

    static updateChildKeyUp(child, event){
        for (let gameObject of child) {
            for (let index in gameObject.listComponents) {
                let component = gameObject.listComponents[index];
                if (component instanceof Component){
                    component.onKeyUp(event.keyCode);
                }
            }
            KeySystem.updateChildKeyUp(gameObject.child, event);    
        }
    }

    static fireKeyDownListener(event){
        let game = new Game();

        for (let key in game.listComponents) {
            let  component = game.listComponents[key];
            component.onKeyDown(event.keyCode);
        }

        let scene = game.scene;

        if (scene) {
            for (let key in scene.listComponents){
                let component = scene.listComponents[key];
                component.onKeyDown(event.keyCode);
            }
            for (let gameObject of scene.gameObjectList) {
                if (gameObject instanceof GameObject){
                    for (let index in gameObject.listComponents) {
                        let component = gameObject.listComponents[index];
                        if (component instanceof Component){
                            component.onKeyDown(event.keyCode);
                        }
                    }
                    KeySystem.updateChildKeyUp(gameObject.child, event);
                }
            }  
        }

        let camera = game.camera;

        if (camera){
            for (let key in camera.listComponents) {
                let component = camera.listComponents[key];
                component.onKeyDown(event.keyCode);
            }
        }
    }

    static updateChildKeyDown(child, event){
        for (let gameObject of child) {
            for (let index in gameObject.listComponents) {
                let component = gameObject.listComponents[index];
                if (component instanceof Component){
                    component.onKeyDown(event.keyCode);
                }
            }
            KeySystem.updateChildKeyDown(gameObject.child, event);    
        }
    }

    static fireKeyPressListener(event){
        let game = new Game();

        for (let key in game.listComponents) {
            let  component = game.listComponents[key];
            component.onKeyPress(event.keyCode);
        }

        let scene = game.scene;

        if (scene) {
            for (let key in scene.listComponents){
                let component = scene.listComponents[key];
                component.onKeyPress(event.keyCode);
            }
            for (let gameObject of scene.gameObjectList) {
                if (gameObject instanceof GameObject){
                    for (let index in gameObject.listComponents) {
                        let component = gameObject.listComponents[index];
                        if (component instanceof Component){
                            component.onKeyPress(event.keyCode);
                        }
                    }
                    KeySystem.updateChildKeyUp(gameObject.child, event);
                }
            }  
        }

        let camera = game.camera;

        if (camera){
            for (let key in camera.listComponents) {
                let component = camera.listComponents[key];
                component.onKeyPress(event.keyCode);
            }
        }
    }

    static updateChildKeyPress(child, event){
        for (let gameObject of child) {
            for (let index in gameObject.listComponents) {
                let component = gameObject.listComponents[index];
                if (component instanceof Component){
                    component.onKeyPress(event.keyCode);
                }
            }
            KeySystem.updateChildKeyPress(gameObject.child, event);    
        }
    }

    static get tag () {
        return "KEY_SYSTEM";
    }
}