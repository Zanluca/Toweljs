import { GameObject } from "./GameObject";
import { CubeRenderComponent } from "../component/CubeRenderComponent";
import { Point3D } from "../geometric/Point3D";
import { Color } from "../geometric/Color";

export class CubeGameObject extends GameObject{
    constructor({point =  new Point3D(0,0,0), color = new Color()}) {
        super({oringin : point, color : color});
        this.__listComponents.addComponent(new CubeRenderComponent({owner : this}));
        this.render.onLoad();
        this.render.color = color;
    }

    get render() {
        return this.listComponents[CubeRenderComponent.tag];
    }

    get tag(){
        return "CUBE_OBJECT";
    }
}