import { JSUtils } from "../utils/JSUtils";
import { ComponentList } from "../utils/ComponentList";
import { Component } from "../component/Component";
import { Point3D } from "../geometric/Point3D";
import { Color } from "../geometric/Color";
import { RotateComponent } from "../component/RotateComponent";
import { mat4 } from "../libs/gl-matrix/gl-matrix";
import { TranslateComponent } from "../component/TranslateComponent";
import { ScaleComponent } from "../component/ScaleComponent";
import { RenderComponent } from "../component/RenderComponent";

export class GameObject {
    /**
     * Creates an instance of GameObject.
     * @memberof GameObject
     */
    constructor({ oringin = new Point3D(0, 0, 0), color = new Color(), }) {
        this.__id = JSUtils.generateUUID();
        this.__matrix = mat4.create();
        this.__oringin = oringin;
        this.__color = color;
        this.__listComponents = new ComponentList();
        this.__listComponents.addComponent(new TranslateComponent({ owner: this }));
        this.__listComponents.addComponent(new RotateComponent({ owner: this }));
        this.__listComponents.addComponent(new ScaleComponent({ owner: this }));
        this.translate.translation = [oringin.x, oringin.y, oringin.z];
        this.__children = [];
    }

    get id() {
        return this.__id;
    }

    get listComponents() {
        return this.__listComponents;
    }

    get tag() {
        return undefined;
    }

    get matrix() {
        return this.__matrix;
    }

    set matrix(matrix) {
        this.__matrix = matrix;
    }

    get translate() {
        return this.listComponents[TranslateComponent.tag];
    }

    get rotation() {
        return this.listComponents[RotateComponent.tag];
    }

    get scale() {
        return this.listComponents[ScaleComponent.tag];
    }

    get color() {
        return this.__color;
    }

    set color(color) {
        this.__color = color;
        this.render.color = color;
    }
    /**
     * 
     * 
     * @readonly
     * @memberof GameObject
     * @returns {RenderComponent}
     */
    get render() {
        return undefined;
    }

    /**
     * 
     * 
     * @param {GameObject} gameObject 
     * @memberof GameObject
     */
    addGameObject(gameObject){
        this.__children.push(gameObject);
        for (let componentKey in gameObject.listComponents) {
            let component = gameObject.listComponents[componentKey];
            component.onLoad();
        }
    }

    onLoad() { }

    destroy() {
        for (let component of this.__listComponents) {
            if (component instanceof Component) {
                component.onDestroy();
            }
        }
        //this.__layer.listGameObjects =  ArrayUtils.removeElement(this.__layer.listGameObjects, this);
    }

    get child(){
        return this.__children;
    }

}