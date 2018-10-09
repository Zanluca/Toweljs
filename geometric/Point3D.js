import { Point2D } from "./Point2D";

export class Point3D extends Point2D{

    constructor(x, y, z) {
        super(x,y);
        this.__z = z;
    }

    get z() {
        return this.__z;
    }

    set z(z) {
        this.__z = z;
    }

    toVector(){
        return [this.x, this.y, this.z];
    }

    toVectorI(){
        return [-this.x, -this.y, -this.z];
    }
}