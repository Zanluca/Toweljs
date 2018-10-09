import { mat4 } from "../libs/gl-matrix/gl-matrix";
import { Point3D } from "../geometric/Point3D";
import { ComponentList } from "../utils/ComponentList";

/**
 * 
 * 
 * @export
 * @class OrthogonalCamera
 * @author Gabriel Zanluca
 */
export class OrthogonalCamera {
    /**
     * Creates an instance of OrthogonalCamera.
     * @memberof OrthogonalCamera
     */
    constructor({ left, right, bottom, top, near, far }) {
        this.__projection = mat4.create();
        this.__left = left;
        this.__right = right;
        this.__bottom = bottom;
        this.__top = top;
        this.__near = near;
        this.__far = far;
        mat4.ortho(this.__projection, left, right, bottom, top, near, far);
        this.__listComponents = new ComponentList();
    }
    /**
     * @returns {number[]}
     * 
     * @readonly
     * @memberof OrthogonalCamera
     */
    get projection() {
        return this.__projection;
    }

    /**
     * @returns {Point3D} position
     * 
     * @readonly
     * @memberof OrthogonalCamera
     */
    get position() {
        return new Point3D(0, 0, 0);
    }

    /**
     * @returns {number[]}
     * 
     * @readonly
     * @memberof OrthogonalCamera
     */
    get matrix() {
        return mat4.create();
    }

    get listComponents() {
		return this.__listComponents
    }

    get left() {
        return this.__left;
    }
    
    get right() {
        return this.__right;
    }

    get bottom() {
        return this.__bottom;
    }

    get top() {
        return this.__top;
    }

    get near() {
        return this.__near;
    }

    get far() {
        return this.__far;
    }

    updateValues(){
        mat4.ortho(this.__projection, this.left, this.right, this.bottom, this.top, this.near, this.far);
    }

    set left(left) {
        this.__left = left;
        this.updateValues();
    }

    set right(right) {
        this.__right = right;
        this.updateValues();
    }

    set bottom(bottom) {
        this.__bottom = bottom;
        this.updateValues();
    }

    set top(top) {
        this.__top = top;
        this.updateValues();
    }

    set near(near) {
        this.__near = near;
        this.updateValues();
    }

    set far(far) {
        this.__far = far;
        this.updateValues();
    }

}