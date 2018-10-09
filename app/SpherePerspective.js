import { Scene } from "../game/Scene";
import { Point3D } from "../geometric/Point3D";
import { PerspectiveCamera } from "../game/PerspectiveCamera";
import { Game } from "../game/Game";
import { Color } from "../geometric/Color";
import { CubeGameObject } from "../gameObject/CubeGameObject";
import { SphereGameObject } from "../gameObject/SphereGameObject";
import { DirectionalLight } from "../Light/DirectionalLight";
import { PointLight } from "../Light/PointLight";
import { SpotLight } from "../Light/SpotLight";

let scene = new Scene();

let color5 = new Color({g : 1, r: 1, b : 0.2});

let canvas = document.getElementById("glCanvas");
// @ts-ignore
let context = canvas.getContext("webgl2");

let camera = new PerspectiveCamera({near: 0.1, far : 100, aspect : canvas.clientWidth/canvas.clientHeight, fovy : 45 * Math.PI/180, position : new Point3D(0, 0, 10)});

let game = new Game(context, scene, camera);

let red = new Color({r : 1, g : 0.6, b:0.6});
let blue = new Color({b : 1});
let green = new Color({r : 0.2, g : 1, b : 0.2});
let turquoise = new Color({g : 1, b: 1});
let yellow = new Color({g : 1, r: 1});
let purple = new Color({b : 1, r: 1, g : 0.2});
let white = new Color({r : 1, g : 1, b : 1});

let sphere = new SphereGameObject({color : red});

// scene.addGameObject(sphere);
let sphere2 = new SphereGameObject({color : green});

scene.addGameObject(sphere2);
let l = new DirectionalLight({color : white, position : new Point3D(0, 0, -7.5)});
let l2 = new DirectionalLight({color : white, position : new Point3D(0, 0, 7.5)});
let l3 = new DirectionalLight({color : white, position : new Point3D(5, 0, 10)});
let l4 = new DirectionalLight({color : white, position : new Point3D(5, 0, 10)});
let lp = new PointLight({position : new Point3D(20, 30, 50), shininess : 11.9, secondColor : red, color : red});
let sl = new SpotLight({position : new Point3D(0, 10, 10), color : white, innerLimit : 1, outerLimit : 2, target : new Point3D(0, 0, 0)});
// scene.addLight(sl);
scene.addLight(l2);
// scene.addLight(l3);
// scene.addLight(l4);

let cube = new CubeGameObject({color : red});
let cube2 = new CubeGameObject({color : red});
// let cube3 = new CubeGameObject({color : green});

cube.rotation.onUpdate = (deltaTime) => {
    cube.rotation.y = 0.5 * deltaTime;
}

cube.translate.x = 0.89;
// sphere.rotation.y = -10 * Math.PI/180;
// sphere2.translate.x = -5;

// sphere2.translate.z = -20;

cube.scale.y = 2.5;
let escala = 1;
// sphere2.scale.y = 3.5;

cube2.rotation.onUpdate = (deltaTime) => {
    // cube2.rotation.x = 2 * deltaTime;
    cube2.rotation.y = 0.5 * deltaTime;
}
sphere2.rotation.onUpdate = (deltaTime) => {
    sphere2.scale.x = 1 + (0.05 * deltaTime);
    sphere2.scale.y = 1 + (0.05 * deltaTime);
    // sphere2.rotation.x = 0.05 * deltaTime;
    // sphere2.rotation.y = 0.5 * deltaTime;
    // sphere.rotation.y = 0.5 * deltaTime;
}

cube2.translate.x = 4.5;
// cube2.translate.y = 2;
// cube2.translate.y = 1;
// cube2.translate.z = -3;

// sphere.rotation.onUpdate = (deltaTime) => {
//     //this.x = 0.3 * deltaTime;
//     sphere.rotation.y = 0.7 * deltaTime;
// }

// cube3.translate.x = -3;
// cube3.translate.y = 2;
// cube3.translate.y = 1;
// cube3.translate.z = -5;

// scene.addGameObject(cube);
// scene.addGameObject(cube2);
// scene.addGameObject(cube3);

// cube3.render.colorFace(0, red);
// cube3.render.colorFace(1, blue);
// cube3.render.colorFace(2, green);
// cube3.render.colorFace(3, turquoise);
// cube3.render.colorFace(4, yellow);
// cube3.render.colorFace(5, purple);


// for (let index = 0; index < 960; index++) {
// 	let color = new Color({r : Math.random(), g : Math.random(), b :  Math.random()})
//     sphere.render.colorVertex(index, color);
        
//   }

