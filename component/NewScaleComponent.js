import { Component } from "./Component";
import { vec3, mat4 } from "../libs/gl-matrix/gl-matrix";
import { GameObject } from "../gameObject/GameObject";

export class NewScaleComponent extends Component{
    /**
     * Creates an instance of NewScaleComponent. 
     * @memberof ScaleComponent
     */
    constructor({owner}) {
        super({owner : owner});
        this.__scale = vec3.create();
    }
    
    get x() {
        return this.owner.matrix[0];
    }

    get y() {
        return this.owner.matrix[5];
    }

    get z() {
        return this.owner.matrix[10];
    }

    set x(x) {
        this.owner.matrix[0] = x;
    }

    set y(y) {
        this.owner.matrix[5] = y;
    }
    
    set z(z) {
        this.owner.matrix[10] = z;
    }

    scale(matrix){
        mat4.scale(matrix, matrix, this.__scale);
    }

    get tag(){
        return NewScaleComponent.tag;
    }

    static get tag(){
        return "NEW_SCALE_COMPONENT";
    }
}