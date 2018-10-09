import { Component } from "./Component";
import { vec3, mat4 } from "../libs/gl-matrix/gl-matrix";
import { GameObject } from "../gameObject/GameObject";

 
 export class NewRotateComponent extends Component{
    /**
     * Creates an instance of NewRotateComponent.
     * @memberof ScaleComponent
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
         this.owner.matrix[5] = Math.cos(this.__rotation[0]);
         this.owner.matrix[9] = -Math.sin(this.__rotation[0]);
         this.owner.matrix[6] = Math.sin(this.__rotation[0]);
         this.owner.matrix[10] = Math.cos(this.__rotation[0]);
     }

     set y(y) {
        this.__rotation[1] = y;
        this.owner.matrix[0] = Math.cos(this.__rotation[0]);
        this.owner.matrix[8] = -Math.sin(this.__rotation[0]);
        this.owner.matrix[2] = Math.sin(this.__rotation[0]);
        this.owner.matrix[10] = Math.cos(this.__rotation[0]);

        let matRotY = mat4.create();


        matRotY[0] = Math.cos(this.__rotation[1]);
        matRotY[8] = -Math.sin(this.__rotation[1]);
        matRotY[2] = Math.sin(this.__rotation[1]);
        matRotY[10] = Math.cos(this.__rotation[1]);

        mat4.multiply(this.owner.matrix, this.owner.matrix, matRotY);
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
        return NewRotateComponent.tag;
    }

     static get tag(){
         return "NEW_ROTATE_COMPONENT";
     }
 }