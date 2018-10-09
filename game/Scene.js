import { GameObject } from "../gameObject/GameObject";
import { Light } from "../Light/Light";
import { ComponentList } from "../utils/ComponentList";

/**
 * 
 * 
 * @export
 * @class Scene
 * @author Gabriel Zanluca
 */
export class Scene {
    /**
     * Creates an instance of Scene.
     * @memberof Scene
     */
    constructor() {
        this.__gameObjectList = new Array();
        this.__listComponents = new ComponentList();
        this.__lights = new Array();
    }

    get listComponents() {
        return this.__listComponents
    }

    /**
     * 
     * 
     * @readonly
     * @memberof Scene
     * @returns {GameObject[]} 
     */
    get gameObjectList() {
        return this.__gameObjectList;
    }

    /**
     * 
     * 
     * @readonly
     * @memberof Scene
     * @returns {Light[]}
     */
    get lights() {
        return this.__lights;
    }

    /**
     * 
     * 
     * @param {Light} light 
     * @memberof Scene
     */
    addLight(light) {
        this.__lights.push(light);
        for (let index = 0; index < this.__gameObjectList.length; index++) {
            const object = this.__gameObjectList[index];
            object.render.onLoad();
        }
    }

    /**
     * 
     * 
     * @param {Light} light 
     * @memberof Scene
     */
    removeLight(light) {
        let index = this.__lights.findIndex(l => l == light);
        this.__lights.splice(index, 1);
        for (let index = 0; index < this.__gameObjectList.length; index++) {
            const object = this.__gameObjectList[index];
            object.render.onLoad();
        }
    }

    /**
     * 
     * 
     * @param {GameObject} gameObject 
     * @memberof Scene
     */
    addGameObject(gameObject) {
        this.__gameObjectList.push(gameObject);
        for (let componentKey in gameObject.listComponents) {
            let component = gameObject.listComponents[componentKey];
            component.onLoad();
        }
    }

    /**
     * 
     * 
     * @param {GameObject} gameObject 
     * @memberof Scene
     */
    removeGameObject(gameObject) {
        let index = this.__gameObjectList.findIndex(g => g == gameObject);
        
        this.__gameObjectList.splice(index, 1);
    }

    /**
     * 
     * 
     * @returns {Object}
     * @memberof Scene
     */
    get ligthsInfo() {
        let positionsVector = [], colorVector = [], typesVector = [];
        let secondColorVector = [], shininessVector = [], lookAtVector = [];
        let lowLimmitVector = [], highLimmitVector = [];

        this.__lights.forEach(light => {
            positionsVector = positionsVector.concat([light.position.x, light.position.y, light.position.z]);
            colorVector = colorVector.concat([light.color.r, light.color.g, light.color.b]);
            typesVector = typesVector.concat([light.type]);
            shininessVector = shininessVector.concat([light.shininess]);
            secondColorVector = secondColorVector.concat([light.secondColor.r, light.secondColor.g, light.secondColor.b]);
            lookAtVector = lookAtVector.concat([light.targetLook[0], light.targetLook[1], light.targetLook[2]]);
            lowLimmitVector = lowLimmitVector.concat(light.innerLimit);
            highLimmitVector = highLimmitVector.concat(light.outerLimit);
        });

        return {
            positions: positionsVector,
            colors: colorVector,
            types: typesVector,
            shininess: shininessVector,
            secondColor: secondColorVector,
            lookAt: lookAtVector,
            lowLimmit: lowLimmitVector,
            highLimmit: highLimmitVector
        }
    }
}