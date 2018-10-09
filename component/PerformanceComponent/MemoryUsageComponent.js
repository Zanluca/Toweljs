import { Component } from "../Component";

export class MemoryUsageComponent extends Component{

    constructor({ owner }) {
        super({ owner : owner });
        this.__menoryUsage = 0;
    }

    get memoryUsage() {
        return this.__menoryUsage;
    }


    onUpdate(deltaTime){
        super.onUpdate(deltaTime);
        window.performance.now();
        // @ts-ignore
        let memoryUsage = window.performance.memory.usedJSHeapSize;
        this.__menoryUsage = memoryUsage;
    }

    get tag() {
        return MemoryUsageComponent.tag;
    }

    static get tag() {
        return "MEMORY_USAGE_COMPONENT"
    }
}