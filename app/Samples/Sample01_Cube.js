import { Scene } from "../../game/Scene";
import { Point3D } from "../../geometric/Point3D";
import { PerspectiveCamera } from "../../game/PerspectiveCamera";
import { Color } from "../../geometric/Color";
import { CubeGameObject } from "../../gameObject/CubeGameObject";
import { Game } from "../../game/Game";

let canvas = document.getElementById("glCanvas");

// @ts-ignore
let context = canvas.getContext("webgl");

let scene = new Scene();
let camera = new PerspectiveCamera({ near: 0.1, far: 500, aspect: 1, fovy: 45 * Math.PI / 180, position: new Point3D(0, 0, 15) });

let game = new Game(context, scene, camera);

let red = new Color({ r: 1 });

let cube = new CubeGameObject({ color: red });

scene.addGameObject(cube);
