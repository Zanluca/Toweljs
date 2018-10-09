import { Component } from "./Component";
import { vec3, mat4 } from "../libs/gl-matrix/gl-matrix";
import { GameObject } from "../gameObject/GameObject";
import { JSUtils } from "../utils/JSUtils";

export class ScaleComponent extends Component{
    /**
     * Creates an instance of ScaleComponent.
     * @memberof ScaleComponent
     */
    constructor({owner}) {
        super({owner : owner});
        this.__scale = vec3.create();
    }
    
    get x() {
        return this.__scale[0];
    }

    get y() {
        return this.__scale[1];
    }

    get z() {
        return this.__scale[2];
    }

    transformMatrix(a, b) {
        console.log("TransformMatrix: ")
		let result = mat4.create();
        for (var i=0; i < 16; ++i) {
            // console.log("i%4: " + (i%4));
            // console.log("i/4*4: " + (Math.floor(i/4)*4));
            // console.log("(i%4)+4: " + ((i%4)+4));
            // console.log("(i%4)+8: " + ((i%4)+8));
            // console.log("i/4*4+2: " + (Math.floor(i/4)*4+2));
            // console.log("(i%4)+12: " + ((i%4)+12));
            // console.log("i/4*4+3: " + (Math.floor(i/4)*4+3));
            result[i] = a[i%4] * b[Math.floor(i/4)*4]  + a[(i%4)+4] * b[Math.floor(i/4)*4+1] + a[(i%4)+8] * b[Math.floor(i/4)*4+2] + a[(i%4)+12] * b[Math.floor(i/4)*4+3];
        }
        JSUtils.printMatrix(result);
	}

    set x(x) {
        this.__scale[0] = x;

        let xP = this.owner.matrix[12];
        let yP = this.owner.matrix[13];
        let zP = this.owner.matrix[14];

        let matrizGLobal = mat4.identity(mat4.create());

        let matTempTrans = mat4.identity(mat4.create());

        matTempTrans[12] = this.owner.matrix[12] * -1;
        matTempTrans[13] = this.owner.matrix[13] * -1;
        matTempTrans[14] = this.owner.matrix[14] * -1 ;

        mat4.multiply(matrizGLobal, matTempTrans, matrizGLobal);

        let matScale = mat4.identity(mat4.create());
        matScale[0] = x;

        mat4.multiply(matrizGLobal, matScale, matrizGLobal);

        let matrizTmpTranslacaoInversa = mat4.identity(mat4.create());

        matrizTmpTranslacaoInversa[12] = xP;
        matrizTmpTranslacaoInversa[13] = yP;
        matrizTmpTranslacaoInversa[14] = zP;

        this.transformMatrix(matrizTmpTranslacaoInversa, matrizGLobal);
        console.log("Mult:")
        mat4.multiply(matrizGLobal, matrizTmpTranslacaoInversa, matrizGLobal);
        JSUtils.printMatrix(matrizGLobal);

        mat4.multiply(this.owner.matrix, matrizGLobal, this.owner.matrix);
    }

    set y(y) {
        this.__scale[1] = y;

        let xP = this.owner.matrix[12];
        let yP = this.owner.matrix[13];
        let zP = this.owner.matrix[14];

        let matTemp = mat4.identity(mat4.create());

        matTemp[12] = - this.owner.matrix[12];
        matTemp[13] = - this.owner.matrix[13];
        matTemp[14] = - this.owner.matrix[14];

        let matScale = mat4.identity(mat4.create());
        matScale[5] = y;

        mat4.multiply(matScale, matTemp, matScale);

        matTemp[12] = xP;
        matTemp[13] = yP;
        matTemp[14] = zP;

        //mat4.multiply(matScale, matTemp, matScale);

        mat4.multiply(this.owner.matrix, this.owner.matrix, matScale);

        console.log(this.owner.matrix);

        //mat4.scale(this.owner.matrix, this.owner.matrix, [1, y, 1]);
    }
    
    set z(z) {
        this.__scale[2] = z;

        let xP = this.owner.matrix[12];
        let yP = this.owner.matrix[13];
        let zP = this.owner.matrix[14];

        let matTemp = mat4.identity(mat4.create());

        matTemp[12] = - this.owner.matrix[12];
        matTemp[13] = - this.owner.matrix[13];
        matTemp[14] = - this.owner.matrix[14];

        let matScale = mat4.identity(mat4.create());
        matScale[10] = z;

        mat4.multiply(matScale, matTemp, matScale);

        matTemp[12] = xP;
        matTemp[13] = yP;
        matTemp[14] = zP;

        mat4.multiply(matScale, matTemp, matScale);

        mat4.multiply(this.owner.matrix, this.owner.matrix, matScale);

        //mat4.scale(this.owner.matrix, this.owner.matrix, [1, 1, z]);
    }

    // scale(matrix){
    //     mat4.scale(matrix, matrix, this.__scale);
    // }

    get tag(){
        return ScaleComponent.tag;
    }

    static get tag(){
        return "SCALE_COMPONENT";
    }
}