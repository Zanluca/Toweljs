
export class Color {
    /**
     * Creates an instance of Color.
     * @memberof Color
     */
    constructor({r = 0, g = 0, b = 0, a = 1}){
          Object.assign(this, {__r : r, __g : g, __b: b, __a : a})
    }

    get r() {
        return this.__r;
    }

    get g() {
        return this.__g;
    }

    get b() {
        return this.__b;
    }

    set r(value) {
        this.__r = value;
    }

    set g(value){
        this.__g = value;
    }

    set b(value) {
        this.__b = value;
    }

    set propertyName(value) {
        this.__a = value;
    }

    get a() {
        return this.__a;
    }

    /**
     * 
     * 
     * @static
     * @param {Color} color1 
     * @param {Color} color2 
     * @returns 
     * @memberof Color
     */
    static addColor(color1, color2){
        let newR = color1.r + color2.r;
        let newG = color1.g + color2.g;
        let newB = color1.b + color2.b;
        return new Color({r : newR, b : newB, g : newG});
    }

    static subtractColor(color1, color2){
        let newR = color1.r - color2.r;
        let newG = color1.g - color2.g;
        let newB = color1.b - color2.b;
        return new Color({r : newR, b : newB, g : newG});    
    }
    
    /**
     * 
     * 
     * @param {Number} num 
     * @memberof Color
     */
    multiply(num){
        this.r = this.r * num;
        this.g = this.g * num;
        this.b = this.b * num;
    }
}
