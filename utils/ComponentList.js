import {Component} from "../component/Component";

export class ComponentList extends Array {

    constructor() {
        super();
        Object.setPrototypeOf(this, ComponentList.prototype);
    }
    
    /**
     * 
     * 
     * @param {Component} component 
     * @memberof ComponentList
     */
    addComponent(component) {
        if (component instanceof Component)
            this[component.tag] = component;
        else
            console.error("Parament not is a component!");
    }

    contains(component) {
      return this.find(c => c == component) > 0;  
    }

    /**
     * 
     * 
     * @param {String} id 
     * @returns {Comment} component
     * @memberof ComponentList
     */
    getByID(id){
        return this.find(c => c.id == id);
    }

    removeByID(id) {
        let indexOf = this.findIndex(c => c.id == id);

        if (indexOf != -1){
            this.splice(indexOf, 1);
        }
        
    }

    removeByKey(key) {
        this.removeByID(this[key]);
    }
}