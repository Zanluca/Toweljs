
import { Color } from "../geometric/Color";
import { Point3D } from "../geometric/Point3D";
import { Light } from "./Light";

/**
 * 
 * 
 * @export
 * @class PointLight
 * @author Gabriel Zanluca
 * @extends {Light}
 */
export class PointLight extends Light {
    constructor({ color = new Color({ r: 1, b: 1, g: 1 }), position = new Point3D(0, 0, 0), shininess = 1, secondColor = new Color({ r: 1, g: 1, b: 1 }) }) {
        super({ color: color, position: position});
        this.__shininess = shininess;
        this.__secondColor = secondColor
    }
    
    get type() {
        return PointLight.type();
    }

    /**
     * @param {number} shininess
     * 
     * @memberof PointLight
     */
    set shininess(shininess) {
        this.__shininess = shininess;
    }

    /**
     * @returns {number}
     * 
     * @memberof PointLight
     */
    get shininess() {
        return this.__shininess;
    }

    /**
     * @param {Color} secondColor
     * 
     * @memberof PointLight
     */
    set secondColor(secondColor) {
        this.__secondColor = secondColor;
    }

    /**
     * @returns {Color}
     * 
     * @memberof PointLight
     */
    get secondColor() {
        return this.__secondColor;
    }

    /**
     * 
     * 
     * @static
     * @returns {number}
     * @memberof PointLight
     */
    static type() {
        return 1;
    }
}