import { RenderComponent } from "./RenderComponent";
import { JSUtils } from "../utils/JSUtils";
import { Game } from "../game/Game";
import { mat4, vec3, mat3 } from "../libs/gl-matrix/gl-matrix";

// position of each face of the cube
const VERTICES = [
    // Front face
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0,

    // Back face
    -1.0, -1.0, -1.0,
    -1.0, 1.0, -1.0,
    1.0, 1.0, -1.0,
    1.0, -1.0, -1.0,

    // Top face
    -1.0, 1.0, -1.0,
    -1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0, -1.0,

    // Bottom face
    -1.0, -1.0, -1.0,
    1.0, -1.0, -1.0,
    1.0, -1.0, 1.0,
    -1.0, -1.0, 1.0,

    // Right face
    1.0, -1.0, -1.0,
    1.0, 1.0, -1.0,
    1.0, 1.0, 1.0,
    1.0, -1.0, 1.0,

    // Left face
    -1.0, -1.0, -1.0,
    -1.0, -1.0, 1.0,
    -1.0, 1.0, 1.0,
    -1.0, 1.0, -1.0,
];

const INDICES = [
    0, 1, 2, 0, 2, 3,    // front
    4, 5, 6, 4, 6, 7,    // back
    8, 9, 10, 8, 10, 11,   // top
    12, 13, 14, 12, 14, 15,   // bottom
    16, 17, 18, 16, 18, 19,   // right
    20, 21, 22, 20, 22, 23,   // left
];

const VERTEXNORMALS = [
    // Front
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,

    // Back
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,

    // Top
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,

    // Bottom
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,

    // Right
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,

    // Left
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0
];

export class CubeRenderComponent extends RenderComponent {

    constructor({ owner }) {
        super({ owner: owner });        
        this.__numberOfFace = 6;
        this.__numberOfVertexPerFace = 4
        this.__numberOfVertex = VERTICES.length/3;
    }

    vertexShaderSource() {
        return `
        attribute vec4 aVertexPosition;
        attribute vec4 aVertexColor;
        attribute vec3 aVertexNormal;
  
        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;
        uniform mat4 uCameraMatrix;
        uniform mat4 uNormalMatrix;
        uniform vec3 u_viewWorldPosition;
  
        varying lowp vec4 vColor;
        varying highp vec3 reflectedLightColor;
  
        void main() { 
          gl_Position = uProjectionMatrix * uCameraMatrix * uModelViewMatrix * aVertexPosition;
          reflectedLightColor = vec3(1.0,1.0,1.0);
          vColor = aVertexColor;`
            + this.__lightCode +
            `}`;
    };
    //u_projection * u_camera * u_transform * 
    fragmentShaderSource() {
        return `varying lowp vec4 vColor;

        varying highp vec3 reflectedLightColor;

        void main() {
          gl_FragColor = vColor;
          gl_FragColor.rgb *= reflectedLightColor;

        }`;
    };

    onLoad() {
        super.onLoad();

        let game = new Game();
        let gl = game.context;

        if (this.__program) {
            gl.deleteProgram(this.__program);
        }

        // console.log(gl.getShaderSource(this.vertexShader));

        this.__program = JSUtils.createProgram(this.vertexShader, this.fragmentShader);
        // console.log(gl.getAttribLocation(this.__program, "aVertexNormal"));
        this.__positionAttributeLocation = gl.getAttribLocation(this.__program, "aVertexPosition");
        this.__positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.__positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(VERTICES), gl.STATIC_DRAW);

        this.__vertexNomralAttribute = 2;

        this.__indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.__indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(INDICES), gl.STATIC_DRAW);

        this.__modelViewMatrix = gl.getUniformLocation(this.__program, 'uModelViewMatrix');

        this.__projectionMatrix = gl.getUniformLocation(this.__program, 'uProjectionMatrix');

        this.__cameraMatrix = gl.getUniformLocation(this.__program, 'uCameraMatrix');


        this.__normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.__normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(VERTEXNORMALS), gl.STATIC_DRAW);

        this.__normalMatrix = gl.getUniformLocation(this.__program, 'uNormalMatrix');

        this.__cameraPosAttributeLocation = gl.getUniformLocation(this.__program, 'u_viewWorldPosition');;

        if (game.scene.lights.length > 0) {
            this.__lightColor = gl.getUniformLocation(this.__program, 'uLightColor');
            this.__lightColor2 = gl.getUniformLocation(this.__program, 'uLightColor2');
            this.__lightPosition = gl.getUniformLocation(this.__program, 'uLightPosition');
            this.__lightType = gl.getUniformLocation(this.__program, 'uLightType');
            this.__shininess = gl.getUniformLocation(this.__program, 'uShininess');
            this.__lightDirection = gl.getUniformLocation(this.__program, 'uLightDirection');
            this.__innerLimit = gl.getUniformLocation(this.__program, 'uInnerLimit');
            this.__outerLimit = gl.getUniformLocation(this.__program, 'uOuterLimit');
            //console.log(gl.getShaderSource(this.vertexShader));
        }

    }

    onRender(context, projectionMatrix) {
        super.onRender(context, projectionMatrix);
        let camera = new Game().camera;

        {
            let size = 3;
            let type = context.FLOAT;
            let normalize = false;
            let stride = 0;
            let offset = 0;

            context.bindBuffer(context.ARRAY_BUFFER, this.__positionBuffer);
            context.vertexAttribPointer(this.__positionAttributeLocation, size, type, normalize, stride, offset);
            context.enableVertexAttribArray(this.__positionAttributeLocation);
        }

        context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, this.__indexBuffer);

        {
            let size = 4;
            let type = context.FLOAT;
            let normalize = false;
            let stride = 0;
            let offset = 0;

            context.bindBuffer(context.ARRAY_BUFFER, this.__colorBuffer);
            context.vertexAttribPointer(this.__colorLocation, size, type, normalize, stride, offset);
            context.enableVertexAttribArray(this.__colorLocation);
        }

        context.useProgram(this.__program);

        let matTemp = mat4.create();
        mat4.multiply(matTemp, camera.projection, camera.matrix);
        //console.log(matTemp);
        let viewMatrix = mat4.create();
        mat4.multiply(viewMatrix, projectionMatrix, this.__owner.matrix);

        context.uniformMatrix4fv(this.__projectionMatrix, false, camera.projection);
        context.uniformMatrix4fv(this.__modelViewMatrix, false, viewMatrix);
        context.uniformMatrix4fv(this.__cameraMatrix, false, camera.matrix);

        let normalMatrix = mat4.create();

        mat4.invert(normalMatrix, viewMatrix);
        mat4.transpose(normalMatrix, normalMatrix);
        context.uniformMatrix4fv(this.__normalMatrix, false, normalMatrix);
        context.uniform3fv(this.__cameraPosAttributeLocation, camera.position.toVector());
        {
            let numComponents = 3;
            let type = context.FLOAT;
            let normalize = false;
            let stride = 0;
            let offset = 0;

            context.bindBuffer(context.ARRAY_BUFFER, this.__normalBuffer);
            context.vertexAttribPointer(
                this.__vertexNomralAttribute,
                numComponents,
                type,
                normalize,
                stride,
                offset);

            context.enableVertexAttribArray(this.__vertexNomralAttribute);
        }

        let scene = new Game().scene;

        if (scene.lights.length > 0) {
            let inf = scene.ligthsInfo;
            context.uniform3fv(this.__lightPosition, inf.positions);
            context.uniform3fv(this.__lightDirection, inf.lookAt);
            context.uniform3fv(this.__lightColor, inf.colors);
            context.uniform3fv(this.__lightColor2, inf.secondColor);
            context.uniform1fv(this.__innerLimit, inf.lowLimmit);
            context.uniform1fv(this.__outerLimit, inf.highLimmit);
            context.uniform1iv(this.__lightType, inf.types);
            context.uniform1fv(this.__shininess, inf.shininess);
        }

        {
            let offset = 0;
            let vertexCount = 36;
            let type = context.UNSIGNED_SHORT;
            context.drawElements(context.TRIANGLES, vertexCount, type, offset);
        }
        this.renderChild(context, viewMatrix);

    }

    get tag() {
        return CubeRenderComponent.tag;
    }

    static get tag() {
        return "CUBE_RENDER_COMPONENT"
    }
}