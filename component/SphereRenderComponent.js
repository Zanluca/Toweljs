import { RenderComponent } from "./RenderComponent";
import { Game } from "../game/Game";
import { JSUtils } from "../utils/JSUtils";
import { mat4 } from "../libs/gl-matrix/gl-matrix";

export class SphereRenderComponent extends RenderComponent {

    constructor({ owner }) {
        super({ owner: owner });
        this.__vertexPositionData = [];
        this.__normalData = [];
        this.__indexData = [];
        this.__lineNormals = [];
        this.__numberOfFace = owner.latitudeBands + 1;
        this.__numberOfVertexPerFace = 3;
        this.__radius = owner.radius;
        this.__latitudeBands = owner.latitudeBands;
        this.__longitudeBands = owner.longitudeBands;
        this.__numberOfVertex = (this.__latitudeBands + 1) * (this.__latitudeBands + 1);
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
        this.__program = JSUtils.createProgram(this.vertexShader, this.fragmentShader);

        this.__positionAttributeLocation = gl.getAttribLocation(this.__program, "aVertexPosition");
        this.__positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.__positionBuffer);

        this.__vertexPositionData = [];
        this.__normalData = [];
        this.__lineNormals = [];

        for (let latNumber = 0; latNumber <= this.__latitudeBands; latNumber++) {
            let theta = latNumber * Math.PI / this.__latitudeBands;
            let sinTheta = Math.sin(theta);
            let cosTheta = Math.cos(theta);

            for (let longNumber = 0; longNumber <= this.__longitudeBands; longNumber++) {
                let phi = longNumber * 2 * Math.PI / this.__longitudeBands;
                let sinPhi = Math.sin(phi);
                let cosPhi = Math.cos(phi);

                let x = cosPhi * sinTheta;
                let y = cosTheta;
                let z = sinPhi * sinTheta;

                this.__normalData.push(x);
                this.__normalData.push(y);
                this.__normalData.push(-z);

                this.__lineNormals.push(x);
                this.__lineNormals.push(y);
                this.__lineNormals.push(z);
                this.__lineNormals.push((this.__radius + 0.5) * x);
                this.__lineNormals.push((this.__radius + 0.5) * y);
                this.__lineNormals.push((this.__radius + 0.5) * z);

                this.__vertexPositionData.push(this.__radius * x);
                this.__vertexPositionData.push(this.__radius * y);
                this.__vertexPositionData.push(this.__radius * -z);
            }

        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.__vertexPositionData), gl.STATIC_DRAW);
        this.__vertexNomralAttribute = 2;

        this.__indexData = [];
        for (let latNumber = 0; latNumber < this.__latitudeBands; latNumber++) {
            for (let longNumber = 0; longNumber < this.__longitudeBands; longNumber++) {
                let first = (latNumber * (this.__longitudeBands + 1)) + longNumber
                let second = first + this.__longitudeBands + 1;
                this.__indexData.push(first);
                this.__indexData.push(second);

                this.__indexData.push(first + 1);

                this.__indexData.push(second);
                this.__indexData.push(second + 1);
                this.__indexData.push(first + 1);
            }
        }

        this.__indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.__indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.__indexData), gl.STATIC_DRAW);

        this.__modelViewMatrix = gl.getUniformLocation(this.__program, 'uModelViewMatrix');

        this.__projectionMatrix = gl.getUniformLocation(this.__program, 'uProjectionMatrix');

        this.__cameraMatrix = gl.getUniformLocation(this.__program, 'uCameraMatrix');

        this.__normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.__normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.__normalData), gl.STATIC_DRAW);

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
            let vertexCount = this.__indexData.length;
            let type = context.UNSIGNED_SHORT;
            let size = this.__lineNormals.length / 3;
            // context.drawArrays(context.LINES, 0, size)
            context.drawElements(context.TRIANGLES, vertexCount, type, offset);
        }
        this.renderChild(context, viewMatrix);

    }

    get tag() {
        return SphereRenderComponent.tag;
    }

    static get tag() {
        return "SPHERE_RENDER_COMPONENT"
    }
}