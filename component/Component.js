import { JSUtils } from "../utils/JSUtils";
/**
 * 
 * 
 * @export
 * @class Component
 * @author Gabriel Zanluca
 */
export class Component {
    /**
     * Creates an instance of Component.
     * @memberof Component
     */
    constructor({ owner }) {
        this.__id = JSUtils.generateUUID();
        this.__enabled = true;
        this.__owner = owner;
    }

    /**
     * @returns {string} id
     * 
     * @readonly
     * @memberof Component
     */
    get id() {
        return this.__id;
    }

    /**
     * @returns {boolean} enabled 
     * 
     * @memberof Component
     */
    get enabled() {
        return this.__enabled;
    }


    /**
     * @param {boolean} enabled
     * 
     * @memberof Component
     */
    set enabled(enabled) {
        this.__enabled = enabled;
    }

    /**
     * @returns {any}
     * 
     * @memberof Component
     */
    get owner() {
        return this.__owner;
    }

    /**
     * @param {any} owner
     * 
     * @memberof Component
     */
    set owner(owner) {
        this.__owner = owner;
    }

    /**
     * 
     * 
     * @param {number} keyCode 
     * @memberof Component
     */
    onKeyDown(keyCode) { }

    /**
     * 
     * 
     * @param {number} keyCode 
     * @memberof Component
     */
    onKeyUp(keyCode) { }
    /**
     * 
     * 
     * @param {number} keyCode 
     * @memberof Component
     */
    onKeyPress(keyCode) { }

    /**
     * 
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} wich 
     * @memberof Component
     */
    onClick(x, y, wich) { }

    /**
     * 
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} wich 
     * @memberof Component
     */
    onMouseDown(x, y, wich) { }

    /**
     * 
     * 
     * @param {number} x 
     * @param {number} y 
     * @memberof Component
     */
    onMouseMove(x, y) { }

    /**
     * 
     * 
     * @param {WebGLRenderingContext} context 
     * @memberof Component
     */
    onBeforeRender(context) { }

    /**
     * 
     * 
     * @param {WebGLRenderingContext} context
     * @param {number[]} projectionMatrix  
     * @memberof Component
     */
    onRender(context, projectionMatrix) { }

    /**
     * 
     * 
     * @param {number} delta 
     * @memberof Component
     */
    onUpdate(delta) { }

    onLoad() { }

    onDestroy() { }

    get tag() {
        return "COMPONENT";
    }
}