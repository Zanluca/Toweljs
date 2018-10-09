/**
 * 
 * 
 * @export
 * @class Point2D
 */
export class Point2D {
    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     */
    constructor (x, y) {
        this.__x = x;
        this.__y = y;
    }

    /**
     * @returns {Number} - position x
     */
    get x() {
        return this.__x;
    }

    /**
     * 
     * @param {Number} x 
     */
    set x(x) {
        this.__x = x
    }

    /**
     * @returns {Number} - position y
     */
    get y() {
        return this.__y;
    }

    /**
     * 
     * @param {Number} y 
     */
    set y(y) {
        this.__y = y
    }

    toVector(){
        return [this.x, this.y];
    }

    toVectorI(){
        return [-this.x, -this.y];
    }
}