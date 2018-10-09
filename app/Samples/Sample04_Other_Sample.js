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
import { OrthogonalCamera } from "../../game/OrthogonalCamera";

const oneMB = 1048576;

let scene = new Scene();
// let cameraOrtho = new OrthogonalCamera({left : -25, right : 25, top : 25, bottom : -25, near : 1, far : 10});
let camera = new PerspectiveCamera({ near: 0.1, far: 500, aspect: 1, fovy: 45 * Math.PI / 180, position: new Point3D(0, 0, 15) });

let canvas = document.getElementById("glCanvas");
// @ts-ignore
let context = canvas.getContext("webgl2");

let game = new Game(context, scene, camera);
