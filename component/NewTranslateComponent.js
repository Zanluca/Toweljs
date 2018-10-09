import { Component } from "./Component";
import { vec3, mat4 } from "../libs/gl-matrix/gl-matrix";
import { GameObject } from "../gameObject/GameObject";

export class NewTranslateComponent extends Component{
    /**
     * Creates an instance of NewTranslateComponent.
     * @memberof NewTranslateComponent 
     */
    constructor({owner}) {
        super({owner : owner});
        this.__translation = vec3.create();
    }

    get x() {
        return this.owner.matrix[12];
    }

    get y() {
        return this.owner.matrix[13];
    }

    get z() {
        return this.owner.matrix[14];
    }

    set x(x) {
        this.owner.matrix[12] = x;
    }

    set y(y) {
        this.owner.matrix[13] = y;
    }

    set z(z) {
        this.owner.matrix[14] = z;
    }

    translate(matrix){
        mat4.translate(matrix, matrix, this.__translation);
    }

    set translation(translation){
        vec3.set(this.__translation, translation[0], translation[1], translation[2]);
        this.owner.matrix[12] = translation[0];
        this.owner.matrix[13] = translation[1];
        this.owner.matrix[14] = translation[2];
    }

    get tag(){
        return NewTranslateComponent.tag;
    }

    static get tag(){
        return "NEW_TRANSLATE_COMPONENT";
    }
}