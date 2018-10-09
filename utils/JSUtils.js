import { Game } from "../game/Game";

/**
 * 
 * 
 * @author Gabriel Zanluca
 * @export
 * @class JSUtils
 */
export class JSUtils {
    /**
     * 
     * 
     * @static
     * @returns {String}
     * @memberof JSUtils
     */
    static generateUUID() {
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            let r = Math.random()*16 | 0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
		return uuid;
    }

    /**
     * 
     * 
     * @static
     * @param {Number} type 
     * @param {String} source 
     * @memberof JSUtils
     */
    static createShader(type, source) {
        let game = new Game();
        let gl = game.context; 
        let shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success){
            return shader;    
        }
        
        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    }

    static createProgram(vertexShader, fragmentShader) {
        let game = new Game();
        let gl = game.context;
        let program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        let success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (success) {
            return program;
        }
        
        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
    }

    static printMatrix(matrix) {

        console.log(matrix[0] + " " + matrix[4] + " " + matrix[8] + " " + matrix[12] + " ");
        console.log(matrix[1] + " " + matrix[5] + " " + matrix[9] + " " + matrix[13] + " ");
        console.log(matrix[2] + " " + matrix[6] + " " + matrix[10] + " " + matrix[14] + " ");
        console.log(matrix[3] + " " + matrix[7] + " " + matrix[11] + " " + matrix[15] + " ");
        
    
         // console.log(matrix);
      }
}