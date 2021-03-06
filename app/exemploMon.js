import { Scene } from "../game/Scene";
import { Point3D } from "../geometric/Point3D";
import { PerspectiveCamera } from "../game/PerspectiveCamera";
import { Game } from "../game/Game";
import { Color } from "../geometric/Color";
import { CubeGameObject } from "../gameObject/CubeGameObject";
import { SphereGameObject } from "../gameObject/SphereGameObject";
import { DirectionalLight } from "../Light/DirectionalLight";

let canvas = document.getElementById("glCanvas");

// @ts-ignore
let context = canvas.getContext("webgl");

let scene = new Scene();
let camera = new PerspectiveCamera({near: 0.1, far : 500, aspect : 1, fovy : 45 * Math.PI / 180, position : new Point3D(0, 0, 15)});

let game = new Game(context, scene, camera);

let red = new Color({r : 1});
let blue = new Color({b : 1});
let white = new Color({r : 1, g : 1, b : 1});

let cube = new CubeGameObject({color : red});
let sphere = new SphereGameObject({color : blue});

let directLight = new DirectionalLight({color : white, position : new Point3D(2, 8, 5)});

scene.addLight(directLight);

cube.rotation.onUpdate = (deltaTime) => {
    cube.rotation.y = 0.9 * deltaTime;
}

sphere.rotation.onUpdate = (deltaTime) => {
    cube.rotation.y = 0.9 * deltaTime;
}

cube.translate.z = -5;
sphere.translate.x = 3;

scene.addGameObject(cube);
cube.addGameObject(sphere);
