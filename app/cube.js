import { Scene } from "../game/Scene";
import { Point3D } from "../geometric/Point3D";
import { PerspectiveCamera } from "../game/PerspectiveCamera";
import { Game } from "../game/Game";
import { Color } from "../geometric/Color";
import { CubeGameObject } from "../gameObject/CubeGameObject";
import { Component } from "../component/Component";

class MyComponente extends Component{
    constructor({owner}) {
        super({owner : owner}); 
    }

    onUpdate(deltaTime){
        this.owner.rotation.y = 0.9 * deltaTime;
    }
}

let scene = new Scene();
let camera = new PerspectiveCamera({near: 0.1, far : 500, aspect : 1, fovy : 45 * Math.PI / 180, position : new Point3D(0, 0, 15)});

let canvas = document.getElementById("glCanvas");
// @ts-ignore
let context = canvas.getContext("webgl2");

let game = new Game(context, scene, camera);

let red = new Color({r : 1});

let cube = new CubeGameObject({color : red});

let myComponente = new MyComponente({owner: cube});

cube.listComponents.addComponent(myComponente);

scene.addGameObject(cube);

let cubeChild = new CubeGameObject({color : red, point : new Point3D(3,0,0)});

cube.addGameObject(cubeChild);

