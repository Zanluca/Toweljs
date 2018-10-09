import { Scene } from "../game/Scene";
import { Game } from "../game/Game";
import { TriangleGameObject } from "../gameObject/TriangleGameObject";
import { Color } from "../geometric/Color";
import { CubeGameObject } from "../gameObject/CubeGameObject";
import { Point2D } from "../geometric/Point2D";
import { ScaleComponent } from "../component/ScaleComponent";
import { RotateComponent } from "../component/RotateComponent";
import { mat4 } from "../libs/gl-matrix/gl-matrix";
import { TranslateComponent } from "../component/TranslateComponent";
import { OrthogonalCamera } from "../game/OrthogonalCamera";
import { NewRotateComponent } from "../component/NewRotateComponent";
import { NewScaleComponent } from "../component/NewScaleComponent";
import { NewTranslateComponent } from "../component/NewTranslateComponent";
import { CubeRenderComponent } from "../component/CubeRenderComponent";
import { Point3D } from "../geometric/Point3D";
import { PerspectiveCamera } from "../game/PerspectiveCamera";
import { DirectionalLight } from "../Light/DirectionalLight";
import { PointLight } from "../Light/PointLight";
import { SpotLight } from "../Light/SpotLight";

  function printMatrix(matrix) {

    console.log(matrix[0] + " " + matrix[4] + " " + matrix[8] + " " + matrix[12] + " ");
    console.log(matrix[1] + " " + matrix[5] + " " + matrix[9] + " " + matrix[13] + " ");
    console.log(matrix[2] + " " + matrix[6] + " " + matrix[10] + " " + matrix[14] + " ");
    console.log(matrix[3] + " " + matrix[7] + " " + matrix[11] + " " + matrix[15] + " ");
    

     // console.log(matrix);
  }
  let scene = new Scene();
  let camera = new OrthogonalCamera({left : -25, right : 25, top : 25, bottom : -25, near : 1, far : 10});
  let cameraP = new PerspectiveCamera({near: 0.1, far : 500, aspect : 1, fovy : 45 * Math.PI / 180, position : new Point3D(-3.21, 5.54, 7.09)});
  let canvas = document.getElementById("glCanvas");
  // @ts-ignore
  let canvasGL = canvas.getContext("webgl2");
  let game = new Game(canvasGL, scene, cameraP);
  let color1 = new Color({r : 1});
  let color2 = new Color({b : 1});
  let color3 = new Color({g : 1});
  let color4 = new Color({g : 0.5, b: 0.5});
  let color5 = new Color({g : 1, r: 1});
  let color6 = new Color({b : 1, r: 1});
  let color7 = new Color({g : 1, b : 1, r: 1});
  let color8 = new Color({g : 1, b : 0.2, r: 0.2});
  let color9 = new Color({g : 0.6, b : 0.6, r: 1});
  let color10 = new Color({r : 1, g : 0.2, b: 0.2});

  let cube = new CubeGameObject({color : color8});
  let cube2 = new CubeGameObject({color : color2});
  let cube3 = new CubeGameObject({color : color3});
  let cube4 = new CubeGameObject({color : color3});

  let l = new DirectionalLight({color : color5, position : new Point3D(2, 8, 5)});
  let l2 = new DirectionalLight({color : color7, position : new Point3D(0.85, 0.8, 0.75)});
  let l3 = new DirectionalLight({color : new Color({r:1, g:1, b:1, a:1}), position : new Point3D(-0.17, 2.24, -3.15)});
  let lp = new PointLight({position : new Point3D(-0.17, 40.24, -5), shininess : 3.9, secondColor : color10, color : color9});
  let sl = new SpotLight({position : new Point3D(-6, 2.25, 7.50), color : color9, innerLimit : 20.5, outerLimit : 31.5, target : new Point3D(-2,0,0)});
  // scene.addLight(l);
  // scene.addLight(lp);
  // scene.addLight(l2);
  scene.addLight(sl);
  
  let r1 = cube.listComponents[RotateComponent.tag]; 
      
  r1.onUpdate = (deltaTime) => {
	  //r1.z = 2 * deltaTime;
    //r1.x = 0.01 * deltaTime;
  }
      
  let t1 = cube.listComponents[TranslateComponent.tag];
  // ts1.z = -5;
  let s1 = cube.listComponents[ScaleComponent.tag];
  //s1.z = 5;
  s1.x = 3;

  let t2 = cube2.listComponents[TranslateComponent.tag];
      
  let r2 = cube2.listComponents[RotateComponent.tag];
      
  r2.onUpdate = (deltaTime) => {
	  r2.x = 2 * deltaTime;
    r2.y = 2 * deltaTime;
  }
      
  let r3 = cube.listComponents[RotateComponent.tag];
  // r3.x = (Math.PI/180) * 10;

  let r4 = cube4.listComponents[RotateComponent.tag];
  r4.z = (Math.PI/180) * 10;
  r3.onUpdate = (deltaTime) => {
	  //r3.x = 0.3 * deltaTime;
    // r3.y = 0.7 * deltaTime;
    // r3.z = deltaTime;
  }
      
  // mat4.translate(cube3.matrix, cube3.matrix, [-3,0,0]);
  // mat4.translate(cube3.matrix, cube3.matrix, [0,2,0]);
  // mat4.translate(cube3.matrix, cube3.matrix, [0,1,0]);
  mat4.translate(cube3.matrix, cube3.matrix, [-0.0, 0.0, -6.0]);
  
  mat4.translate(cube4.matrix, cube4.matrix, [-3,0,0]);
  mat4.translate(cube4.matrix, cube4.matrix, [0,2,0]);
  mat4.translate(cube4.matrix, cube4.matrix, [0,1,0]);
  mat4.translate(cube4.matrix, cube4.matrix, [0,0, 2]);
  
  // //mat4.scale(cube.matrix, cube.matrix, [.5, .5, .5]);
  // //mat4.scale(cube2.matrix, cube2.matrix, [.7, .7, .7]);
  let s = cube3.listComponents[ScaleComponent.tag];
  let t3 = cube3.listComponents[TranslateComponent.tag];
  t3.x = -3;
  t3.y = 2;
  t3.y = 1;
  t3.z = -5;
  
  s.x = 2.2;
  s.x = 1;
      
  scene.addGameObject(cube);
  // scene.addGameObject(cube2);
  // scene.addGameObject(cube3);
  //scene.addGameObject(cube4);
      
      
  t2.x = 3;
  t2.y = 2;
  t2.y = 1;
  t2.z = -3;
  
  cube3.listComponents[CubeRenderComponent.tag].colorFace(0, color1); //vermelho
  cube3.listComponents[CubeRenderComponent.tag].colorFace(1, color2); //azul
  cube3.listComponents[CubeRenderComponent.tag].colorFace(2, color3); //verde
  cube3.listComponents[CubeRenderComponent.tag].colorFace(3, color4); //turquesa
  cube3.listComponents[CubeRenderComponent.tag].colorFace(4, color5); //amarelo
  cube3.listComponents[CubeRenderComponent.tag].colorFace(5, color6); //roxo

  for (let index = 0; index < 24; index++) {
	let color = new Color({r : Math.random(), g : Math.random(), b :  Math.random()})
    cube2.listComponents[CubeRenderComponent.tag].colorVertex(index, color);
        
  }
      
  // console.log("CUBO: ");
  // printMatrix(cube.matrix);
  // console.log("CUBO3: ");
  // printMatrix(cube3.matrix);