import { Component } from "./Component";
import { vec3, mat4 } from "../libs/gl-matrix/gl-matrix";
import { GameObject } from "../gameObject/GameObject";

 
 export class RotateComponent extends Component{
    /**
     * Creates an instance of RotateComponent.
     * @memberof RotateComponent
     */
    constructor({owner}) {
        super({owner : owner});
        this.__rotation = vec3.create();         
     }

     get x() {
         return this.__rotation[0];
     }

     get y() {
         return this.__rotation[1];
     }

     get z() {
         return this.__rotation[2];
     }

     set x(x) {
         this.__rotation[0] = x;
         mat4.rotateX(this.owner.matrix, this.owner.matrix, x);
     }

     set y(y) {
         this.__rotation[1] = y;         
         mat4.rotateY(this.owner.matrix, this.owner.matrix, y);
     }

     set z(z) {
         this.__rotation[2] = z;
         mat4.rotateZ(this.owner.matrix, this.owner.matrix, z);
     }

     rotateAll(matrix){
         mat4.rotateX(matrix, matrix, this.x);
         mat4.rotateY(matrix, matrix, this.y);
         mat4.rotateZ(matrix, matrix, this.z);
     }

     get tag(){
        return RotateComponent.tag;
    }

     static get tag(){
         return "ROTATE_COMPONENT";
     }
 }