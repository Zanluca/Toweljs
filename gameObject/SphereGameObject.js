import { GameObject } from "./GameObject";
import { Point3D } from "../geometric/Point3D";
import { Color } from "../geometric/Color";
import { SphereRenderComponent } from "../component/SphereRenderComponent";

export class SphereGameObject extends GameObject {
    constructor({position =  new Point3D(0,0,0), color = new Color(), radius = 1, latitudeBands = 16, longitudeBands = 16}) {
        super({oringin : position, color : color});
        this.__radius = radius;
        this.__latitudeBands = latitudeBands;
        this.__longitudeBands = longitudeBands;
        this.__listComponents.addComponent(new SphereRenderComponent({owner : this}));
        this.render.onLoad();
        this.render.color = color;
    }

    get radius() {
        return this.__radius;
    }

    get latitudeBands() {
        return this.__latitudeBands;
    }

    get longitudeBands() {
        return this.__longitudeBands;
    }

    
    get render() {
        return this.listComponents[SphereRenderComponent.tag];
    }
    
    set radius(radius) {
        this.__radius = radius;
    }

    set longitudeBands(longitudeBands) {
        this.__longitudeBands = longitudeBands;
    }

    set latitudeBands(latitudeBands) {
        this.__latitudeBands = latitudeBands;
    }

    get tag(){
        return "SPHERE_OBJECT";
    }
}