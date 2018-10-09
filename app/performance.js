import { Scene } from "../game/Scene";
import { Point3D } from "../geometric/Point3D";
import { PerspectiveCamera } from "../game/PerspectiveCamera";
import { Game } from "../game/Game";
import { Color } from "../geometric/Color";
import { CubeGameObject } from "../gameObject/CubeGameObject";
// @ts-ignore
import { PointLight } from "../Light/PointLight";
import { SphereGameObject } from "../gameObject/SphereGameObject";
import { DirectionalLight } from "../Light/DirectionalLight";
import { MemoryUsageComponent } from "../component/PerformanceComponent/MemoryUsageComponent";
import { FPSComponent } from "../component/PerformanceComponent/FPSComponent";
import { MoveCameraComponent } from "../component/MoveCameraComponent";
import { Component } from "../component/Component";

class RotateSphere extends Component{
    onUpdate(deltaTime){
        this.owner.rotation.x = 0.1 * deltaTime;
        this.owner.rotation.y = 0.1 * deltaTime;
    }
}

function initSphere(){
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 5; j++) {
            let sphere = new SphereGameObject({ color: green, radius: 1, latitudeBands: 60, longitudeBands: 60, position : new Point3D(positionX, positionY, 0)});
            spheres.push(sphere);
            positionX += 2;
        }
        positionY -= 4
        positionX = -30;
    }
    
    for (let i = 0; i < spheres.length; i++) {
        let component = new RotateSphere({owner :spheres[i] });
        spheres[i].listComponents.addComponent(component);
        scene.addGameObject(spheres[i]);
    }
}

let scene = new Scene();

let canvas = document.getElementById("glCanvas");
// @ts-ignore
canvas.width = window.innerWidth * window.devicePixelRatio;
// @ts-ignore
canvas.height = window.innerHeight * window.devicePixelRatio;
// @ts-ignore
let context = canvas.getContext("webgl");
let camera = new PerspectiveCamera({ near: 0.1, far: 1000, aspect: window.innerWidth / window.innerHeight, fovy: 75 * Math.PI / 180, position: new Point3D(0, 0, 25) });

let game = new Game(context, scene, camera);

let spheres = [];

let green = new Color({ r: 1 });
let white = new Color({ r: 1, g: 1, b: 1 });


let directLight = new DirectionalLight({ color: white, position: new Point3D(-.24, 3.34, 7.5) });
// let lp = new PointLight({position : new Point3D(20, 30, 50), shininess : 25.9, secondColor : red, color : red});

scene.addLight(directLight);

var positionX = -30;
var positionY = 15;

initSphere();

let fps = new FPSComponent({owner : game});

fps.onRender = function (context, projectionMatrix) {
    let elemente = document.getElementById("FPS");
    elemente.innerHTML = "FPS: " + this.FPS;
}

game.listComponents.addComponent(fps);



