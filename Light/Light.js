import { Color } from "../geometric/Color";
import { Point3D } from "../geometric/Point3D";

export class Light {
    /**
     * Creates an instance of Light.
     * @memberof Light
     */
    constructor({ color = new Color({ r: 0, b: 0, g: 0 }), position = new Point3D(0, 0, 0) }) {
        this.__color = color;
        this.__position = position;
    }
    /**
     * 
     * @returns {Color}
     * @memberof Light
     */
    get color() {
        return this.__color;
    }

    /**
     * 
     * @returns {Point3D}
     * @memberof Light
     */
    get position() {
        return this.__position;
    }
    /**
     * 
     * @return {number}
     * @readonly
     * @memberof Light
     */
    get type() {
        return Light.type();
    }
    /**
     * @param {Color} color
     * 
     * @memberof Light
     */
    set color(color) {
        this.__color = color;
    }
    /**
     * 
     * @param {Point3D} position
     * @memberof Light
     */
    set position(position) {
        this.__position = position;
    }
    /**
     * 
     * 
     * @returns {number}
     * @memberof Light
     */
    get shininess() {
        return 0;
    }
    /**
     * 
     * 
     * @returns {Color}
     * @memberof Light
     */
    get secondColor() {
        let c = new Color({ r: 0, b: 0, g: 0 });
        return c;
    }
    /**
     * 
     * 
     * @returns {number}
     * @memberof Light
     */
    get innerLimit() {
        return 0;
    }
    /**
     * 
     * 
     * @returns {number}
     * @memberof Light
     */
    get outerLimit() {
        return 0;
    }
    /**
     * 
     * 
     * @returns {number[]}
     * @memberof Light
     */
    get targetLook() {
        return [0, 0, 0];
    }
    /**
     * 
     * 
     * @static
     * @returns {number}
     * @memberof Light
     */
    static type() {
        return -1;
    }
}