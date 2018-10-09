import { Component } from "./Component";
import { vec3, mat4 } from "../libs/gl-matrix/gl-matrix";
import { GameObject } from "../gameObject/GameObject";

export class ScaleComponent extends Component{
    /**
     * Creates an instance of ScaleComponent.
     * @memberof ScaleComponent
     */
    constructor({owner}) {
        super({owner : owner});
        this.__scale = vec3.create();
        this.__scale[0] = 1;
        this.__scale[1] = 1;
        this.__scale[2] = 1;
    }
    
    get x() {
        return this.__scale[0];
    }

    get y() {
        return this.__scale[1];
    }

    get z() {
        return this.__scale[2];
    }

    set x(x) {
        this.__scale[0] = x;
        mat4.scale(this.owner.matrix, this.owner.matrix, [x, 1, 1]);
    }

    set y(y) {
        this.__scale[1] = y;
        mat4.scale(this.owner.matrix, this.owner.matrix, [1, y, 1]);
    }
    
    set z(z) {
        this.__scale[2] = z;
        mat4.scale(this.owner.matrix, this.owner.matrix, [1, 1, z]);
    }

    scale(matrix){
        mat4.scale(matrix, matrix, this.__scale);
    }

    get tag(){
        return ScaleComponent.tag;
    }

    static get tag(){
        return "SCALE_COMPONENT";
    }
}