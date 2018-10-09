import { Scene } from "../../game/Scene";
import { Point3D } from "../../geometric/Point3D";
import { PerspectiveCamera } from "../../game/PerspectiveCamera";
import { Game } from "../../game/Game";
import { Color } from "../../geometric/Color";
import { CubeGameObject } from "../../gameObject/CubeGameObject";
import { PointLight } from "../../Light/PointLight";
import { FPSComponent } from "../../component/PerformanceComponent/FPSComponent";
import { MemoryUsageComponent } from "../../component/PerformanceComponent/MemoryUsageComponent";
import { MoveCameraComponent } from "../../component/MoveCameraComponent";

const oneMB = 1048576;

let scene = new Scene();
let camera = new PerspectiveCamera({ near: 0.1, far: 500, aspect: 1, fovy: 45 * Math.PI / 180, position: new Point3D(0, 0, 15) });

let canvas = document.getElementById("glCanvas");
// @ts-ignore
let context = canvas.getContext("webgl2");

let game = new Game(context, scene, camera);

let red = new Color({ r: 1 });
let blue = new Color({ b: 1 });
let green = new Color({ g: 1 });
let turquoise = new Color({ g: 1, b: 1 });
let yellow = new Color({ g: 1, r: 1 });
let purple = new Color({ b: 1, r: 1 });
let white = new Color({ r: 1, g: 1, b: 1 });

let cube = new CubeGameObject({ color: red });
let cube2 = new CubeGameObject({ color: blue });
let cube3 = new CubeGameObject({ color: green });

let pointLight = new PointLight({ position: new Point3D(2, 8, 5), shininess: 100.9, secondColor: yellow, color: white });

scene.addLight(pointLight);

cube.rotation.onUpdate = (deltaTime) => {
    cube.rotation.z = 2 * deltaTime;
}

cube.translate.z = -5;

cube2.rotation.onUpdate = (deltaTime) => {
    cube2.rotation.x = 2 * deltaTime;
    cube2.rotation.y = 2 * deltaTime;
}

cube2.translate.x = 3;
cube2.translate.y = 2;
cube2.translate.y = 1;
cube2.translate.z = -3;

cube3.rotation.onUpdate = (deltaTime) => {
    cube3.rotation.y = 0.7 * deltaTime;
}

cube3.translate.x = -3;
cube3.translate.y = 2;
cube3.translate.y = 1;
cube3.translate.z = -5;

scene.addGameObject(cube);
scene.addGameObject(cube2);
scene.addGameObject(cube3);

cube3.render.colorFace(0, red);
cube3.render.colorFace(1, blue);
cube3.render.colorFace(2, green);
cube3.render.colorFace(3, turquoise);
cube3.render.colorFace(4, yellow);
cube3.render.colorFace(5, purple);


for (let index = 0; index < 24; index++) {
    let color = new Color({ r: Math.random(), g: Math.random(), b: Math.random() })
    cube2.render.colorVertex(index, color);

}


let memory = new MemoryUsageComponent({ owner: game });

memory.onRender = function (context, projectionMatrix) {
    let elemente = document.getElementById("memory");
    elemente.innerHTML = "Memory: " + (this.memoryUsage / oneMB).toFixed(2) + "MB";
}

let fps = new FPSComponent({ owner: game });

fps.onRender = function (context, projectionMatrix) {
    let elemente = document.getElementById("FPS");
    elemente.innerHTML = "FPS: " + this.FPS;
}

let moveCamera = new MoveCameraComponent({ owner: camera });

camera.listComponents.addComponent(moveCamera);

game.listComponents.addComponent(fps);
game.listComponents.addComponent(memory);

