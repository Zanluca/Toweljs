import { Component } from "./Component";
import { Point3D } from "../geometric/Point3D";

export class MoveCameraComponent extends Component {
    constructor({ owner }) {
        super({ owner: owner });
    }

    onKeyDown(keyCode) {
        if (keyCode == 38) {
            this.owner.position.y += 1;
            this.owner.target.y += 1;
        } else if (keyCode == 37) {
            this.owner.position.x -= 1;
            this.owner.target.x -= 1;
        } else if (keyCode == 39) {
            this.owner.position.x += 1;
            this.owner.target.x += 1;
        } else if (keyCode == 40) {
            this.owner.position.y -= 1;
            this.owner.target.y -= 1;
        } else if (keyCode == 49) {
            this.owner.position.z += 1;
        } else if (keyCode == 50) {
            this.owner.position.z -= 1;
        }
        this.owner.updateValues();
    }

    get tag() {
        return MoveCameraComponent.tag;
    }

    static get tag() {
        return "MOVE_CAMERA_COMPONENT"
    }
}