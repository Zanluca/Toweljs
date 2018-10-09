import { Color } from "../geometric/Color";
import { Point3D } from "../geometric/Point3D";
import { Light } from "./Light";
/**
 * 
 * 
 * @export
 * @class DirectionalLight
 * @author Gabriel Zanluca
 * @extends {Light}
 */
export class DirectionalLight extends  Light{
    constructor({color = new Color({r:0, b:0, g : 0}), position = new Point3D(0,0,0) }) {
        super({color : color, position : position});
    }

    get type(){
        return DirectionalLight.type();
    }

    static type(){
        return 0;
    }
}