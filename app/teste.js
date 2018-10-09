import { Scene } from "../game/Scene";
import { Point3D } from "../geometric/Point3D";
import { PerspectiveCamera } from "../game/PerspectiveCamera";
import { Game } from "../game/Game";
import { Color } from "../geometric/Color";
import { SphereGameObject } from "../gameObject/SphereGameObject";

let scene = new Scene();
let camera = new PerspectiveCamera({near: 0.1, far : 500, aspect : 1, fovy : 45 * Math.PI / 180, position : new Point3D(0, 0, 15)});

let canvas = document.getElementById("glCanvas");

// @ts-ignore
let context = canvas.getContext("webgl2");

let game = new Game(context, scene, camera);

let blue = new Color({b : 1});

let sphere = new SphereGameObject({color : blue, radius : 1, latitudeBands : 10, longitudeBands : 10});

scene.addGameObject(sphere);

