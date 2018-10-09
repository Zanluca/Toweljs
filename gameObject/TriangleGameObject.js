import { GameObject } from "./GameObject";
import { TriangleRenderComponent } from "../component/TriangleRenderComponent";
import { Game } from "../game/Game";
import { Point3D } from "../geometric/Point3D";

export class TriangleGameObject extends GameObject{

    constructor({oringin, color, points}) {
        super({oringin : oringin, color});
        this.__points = points;
        this.listComponents.addComponent(new TriangleRenderComponent({owner : this, positions : points}));
        this.render.onLoad();
        this.listComponents[TriangleRenderComponent.tag].color = color;
    }

    get render(){
        return this.listComponents[TriangleRenderComponent.tag];
    }

    get points() {
        return this.__points;
    }

    set points(points) {
        this.__points = points;
    }

    get tag(){
        return "TRIANGLE_OBJECT";
    }
}