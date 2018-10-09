import { Point3D } from "../geometric/Point3D";
import { mat4 } from "../libs/gl-matrix/gl-matrix";
import { ComponentList } from "../utils/ComponentList";

/**
 * 
 * 
 * @export
 * @class PerspectiveCamera
 * @author Gabriel Zanluca
 */
export class PerspectiveCamera {
	/**
	 * Creates an instance of PerspectiveCamera.
	 * @memberof PerspectiveCamera
	 */
	constructor({ aspect = 1, near = 0, far = 0, fovy = 0, position = new Point3D(0, 0, 0), target = new Point3D(0,0,0), up = new Point3D(0, 1, 0) }) {
		this.__near = near;
		this.__far = far;
		this.__aspect = aspect;
		this.__fovy = fovy;
		this.__position = position;
		this.__target = target;
		this.__up = up;
		this.__projection = mat4.create();
		this.__matrix = mat4.create();
		mat4.perspective(this.__projection, fovy, aspect, near, far);
		mat4.lookAt(this.__matrix, [position.x, position.y, position.z], [target.x, target.y, target.y], [up.x, up.y, up.z]);
		this.__listComponents = new ComponentList();
	}

	/**
	 * @returns {number[]} projection
	 * 
	 * @readonly
	 * @memberof PerspectiveCamera
	 */
	get projection() {
		return this.__projection;
	}

	/**
	 * @returns {number[]} matrix
	 * 
	 * @readonly
	 * @memberof PerspectiveCamera
	 */
	get matrix() {
		return this.__matrix;
	}

	/**
	 * @returns {number} near
	 * 
	 * @memberof PerspectiveCamera
	 */
	get near() {
		return this.__near;
	}

	/**
	 * @returns {number} far
	 * 
	 * @memberof PerspectiveCamera
	 */
	get far() {
		return this.__far;
	}

	/**
	 * @returns {Point3D} position
	 * 
	 * @memberof PerspectiveCamera
	 */
	get position() {
		return this.__position;
	}

	/**
	 * @returns {number} aspect
	 * 
	 * @memberof PerspectiveCamera
	 */
	get aspect() {
		return this.__aspect;
	}

	/**
	 * @returns {number} fovy
	 * 
	 * @memberof PerspectiveCamera
	 */
	get fovy() {
		return this.__fovy;
	}

	get target() {
		return this.__target;
	}

	get up() {
		return this.__up;
	}

	get listComponents() {
		return this.__listComponents
	}

	/**
	 * @param {number} near
	 * 
	 * @memberof PerspectiveCamera
	 */
	set near(near) {
		this.__near = near;
		this.updateValues();
	}

	/**
	 * @param {number} far
	 * 
	 * @memberof PerspectiveCamera
	 */
	set far(far) {
		this.__far = far;
		this.updateValues();
	}

	/**
	 * @param {Point3D} position
	 * 
	 * @memberof PerspectiveCamera
	 */
	set position(position) {
		this.__position = position;
		this.updateValues();
	}

	/**
	 * @param {number} aspect
	 * 
	 * @memberof PerspectiveCamera
	 */
	set aspect(aspect) {
		this.__aspect = aspect;		
		this.updateValues();
	}

	/**
	 * @param {number} fovy
	 * 
	 * @memberof PerspectiveCamera
	 */
	set fovy(fovy) {
		this.__fovy = fovy;
		this.updateValues();
	}
	
	set target(target) {
		this.__target = target;
		this.updateValues();
	}

	set up(up) {
		this.__up = up;
		this.updateValues();
	}

	updateValues(){
		mat4.perspective(this.__projection, this.fovy, this.aspect, this.near, this.far);
		mat4.lookAt(this.__matrix, this.position.toVector(), this.target.toVector(), this.up.toVector());	
	}
}