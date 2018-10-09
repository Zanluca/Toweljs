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

  function printMatrix(matrix) {

    console.log(matrix[0] + " " + matrix[4] + " " + matrix[8] + " " + matrix[12] + " ");
    console.log(matrix[1] + " " + matrix[5] + " " + matrix[9] + " " + matrix[13] + " ");
    console.log(matrix[2] + " " + matrix[6] + " " + matrix[10] + " " + matrix[14] + " ");
    console.log(matrix[3] + " " + matrix[7] + " " + matrix[11] + " " + matrix[15] + " ");
    

      console.log(matrix);
  }


    let scene = new Scene();
    let camera = new OrthogonalCamera({left : -25, right : 25, top : 25, bottom : -25, near : 1, far : 10});

    let positions = [
      1.0,  1.0,
     -1.0,  1.0,
      1.0, -1.0
      ];
    let positions2 = [
        -0.1, 0,
        0, -0.5,
        -0.7, 0,
      ];

      let canvas = document.getElementById("glCanvas");
      // @ts-ignore
      let canvasGL = canvas.getContext("experimental-webgl");
      let game = new Game(canvasGL, scene, camera);
      let color1 = new Color({r : 1});
      let color2 = new Color({b : 1});
      let color3 = new Color({g : 1});
      let p = new Point3D(-0.0,0.0, -2.0);
      let triangle = new TriangleGameObject({points : positions, color: color1, oringin : p});
      triangle.render.colorVertex(0, color3);
      
      scene.addGameObject(triangle);
      printMatrix(triangle.matrix);