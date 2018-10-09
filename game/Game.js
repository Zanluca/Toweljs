import { Scene } from "./Scene";
import { ComponentList } from "../utils/ComponentList";
import { RenderSystem } from "../system/RenderSystem";
import { mat4 } from "../libs/gl-matrix/gl-matrix";
import { LogicSystem } from "../system/LogicSystem";
import { KeySystem } from "../system/KeySystem";

let INSTACE = undefined;
/**
 * 
 * 
 * @export
 * @class Game
 * @author Gabriel Zanluca
 */
export class Game {
    /**
     * Creates an instance of Game.
     * @param {WebGLRenderingContext} context 
     * @param {Scene} scene 
     * @param {any} camera 
     * @memberof Game
     */
    constructor(context = undefined, scene  = undefined, camera  = undefined) {
        if (!INSTACE) {
            this.__context = context;
            this.__scene = scene;
            this.__listComponents = new ComponentList();
            this.__requestAnimFrame = undefined;
            this.__lastUpdateTime = 0;
            this.__projection = mat4.create();
            this.__camera = camera;
            INSTACE = this;
            this.startGameLoop();
        }

        return INSTACE;
    }

    /**
     *
     * @returns {ComponentList}
     * @readonly
     * @memberof Game
     */
    get listComponents() {
        return this.__listComponents;
    }

    /**
     * @return {WebGLRenderingContext}
     * 
     * @readonly
     * @memberof Game
     */
    get context() {
        return this.__context;
    }

    /**
     * 
     *@return {Scene} 
     * @readonly
     * @memberof Game
     */
    get scene() {
        return this.__scene;
    }

    /**
     * 
     *@returns {number[]} 
     * @readonly
     * @memberof Game
     */
    get projection() {
        return this.__projection;
    }

    get camera() {
        return this.__camera;
    }

    startGameLoop() {
        let Loop = () => {
            this.__requestAnimFrame = window.requestAnimationFrame(Loop);
            this.gameLoop();
        };

        Loop();

        window.addEventListener("keypress", KeySystem.fireKeyPressListener);
        window.addEventListener("keydown", KeySystem.fireKeyDownListener);
        window.addEventListener("keyup", KeySystem.fireKeyUpListner);
    }

    stopGame() {
        window.cancelAnimationFrame(this.__requestAnimFrame);
        /**
         * Trazer o resto de remover eventos.
         */
    }

    gameLoop() {
        //if (this.__paused) {
        this.renderGame();
        let now = Date.now();
        let deltaTime = (now - this.__lastUpdateTime) / 1000;
        this.updateGame(deltaTime);
        //}
        this.__lastUpdateTime = Date.now();
    }

    /**
     * 
     * 
     * @param {number} deltaTime 
     * @memberof Game
     */
    updateGame(deltaTime) {
        LogicSystem.fireUpdateListener(deltaTime);
    }

    renderGame() {
        RenderSystem.fireRenderListener();
    }
}