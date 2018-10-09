import { Point3D } from "../geometric/Point3D";
import { Color } from "../geometric/Color";
import { mat4 } from "../libs/gl-matrix/gl-matrix";
import { Light } from "./Light";
/**
 * 
 * 
 * @export
 * @class SpotLight
 * @author Gabriel Zanluca
 * @extends {Light}
 */
export class SpotLight extends Light {

    constructor({ position = new Point3D(0, 0, 0), color = new Color({ r: 1, g: 1, b: 1 }), innerLimit = 0, outerLimit = 0, target = new Point3D(0, 0, 0) }) {
        super({ color: color, position: position });
        this.__outerLimit = (Math.PI / 180) * outerLimit;
        this.__innerLimit = (Math.PI / 180) * innerLimit;
        this.__target = target;
        this.__shininess = 1;
        this.__matrix = mat4.create();
        mat4.lookAt(this.__matrix, [position.x, position.y, position.z], target.toVector(), [0, 1, 0]);
    }


    get innerLimit() {
        return this.__innerLimit;
    }

    get outerLimit() {
        return this.__outerLimit;
    }

    get target() {
        return this.__target;
    }

    /**
     * @param {number} shininess
     * 
     * @memberof PointLight
     */
    set shininess(shininess) {
        this.__shininess = shininess;
    }

    get shininess() {
        return this.__shininess;
    }

    get targetLook() {
        return [-this.__matrix[8], -this.__matrix[9], -this.__matrix[10]];
    }

    get type() {
        return SpotLight.type();
    }

    static type() {
        return 2;
    }
}