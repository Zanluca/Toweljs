import {RenderComponent} from "./RenderComponent";
import { JSUtils } from "../utils/JSUtils";
import { Game } from "../game/Game";

export class TriangleRenderComponent extends RenderComponent {
    /**
     * Creates an instance of TriangleRenderComponent.
     * @memberof TriangleRenderComponent
     */
    constructor({owner, positions}) {
        super({owner});
        this.__positions = positions;
        this.__positionAttributeLocation = undefined;
        this.__positionBuffer =  undefined;
        this.__colorLocation = undefined;
        this.__colorBuffer = undefined;        
        this.__numberOfFace = 1;
        this.__numberOfVertexPerFace = 3;
    }

    vertexShaderSource() {
        return "attribute vec4 a_position; " +
                "attribute vec4 aVertexColor; " +
                "varying vec4 v_color; " +
                "uniform mat4 uModelViewMatrix; " +
                "uniform mat4 uProjectionMatrix; "+
                "void main() { " +                           
                    "gl_Position = uProjectionMatrix * uModelViewMatrix * a_position; " +
                    "v_color = aVertexColor; " +
                "}"
    };

    fragmentShaderSource() {
        return "precision mediump float; " + 
               "varying vec4 v_color; " +      
               "void main() { " +
                    "gl_FragColor = v_color; " +
               "}"
    };

    onLoad() {
        super.onLoad();
        let game =  new Game();
        let gl = game.context;

        this.__program = JSUtils.createProgram(this.vertexShader, this.fragmentShader);
        this.__positionAttributeLocation = gl.getAttribLocation(this.__program, "a_position");
        this.__positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.__positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.__positions), gl.STATIC_DRAW);

        this.__modelViewMatrix = gl.getUniformLocation(this.__program, 'uModelViewMatrix');

        this.__projectionMatrix = gl.getUniformLocation(this.__program, 'uProjectionMatrix');
    };

    onRender(gl, projectionMatrix){
        
        let camera = new Game().camera;

        {                       
            // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
            let size = 2;          // 2 components per iteration
            let type = gl.FLOAT;   // the data is 32bit floats
            let normalize = false; // don't normalize the data
            let stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
            let offset = 0;        // start at the beginning of the buffer             
            // Bind the position buffer.
            gl.bindBuffer(gl.ARRAY_BUFFER, this.__positionBuffer);
            gl.vertexAttribPointer(this.__positionAttributeLocation, size, type, normalize, stride, offset);
            gl.enableVertexAttribArray(this.__positionAttributeLocation);
        }
        
        {           
            let size = 4;
            let type = gl.FLOAT;
            let normalize = false;
            let stride = 0;
            let offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.__colorBuffer);
            gl.vertexAttribPointer(this.__colorLocation, size, type, normalize, stride, offset);
            gl.enableVertexAttribArray(this.__colorLocation);
        }
        
        // Tell it to use our program (pair of shaders)
        gl.useProgram(this.__program);

        gl.uniformMatrix4fv(this.__projectionMatrix, false, camera.projection);
        gl.uniformMatrix4fv(this.__modelViewMatrix, false, this.owner.matrix);

        let primitiveType = gl.TRIANGLES;
        let count = 3;
        let offset = 0;
        gl.drawArrays(primitiveType, offset, count);
    }

    get tag (){
        return TriangleRenderComponent.tag;
    }

    static get tag () {
        return "TRIANGLE_RENDER_COMPONENT"
    }
}