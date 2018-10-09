import {Component} from "./Component";
import { JSUtils } from "../utils/JSUtils";
import { Game } from "../game/Game";
import { Color } from "../geometric/Color";

export class RenderComponent extends Component {
    /**
     * Creates an instance of RenderComponent.
     * @memberof RenderComponent
     */
    constructor({owner}) {
        super({owner : owner});      
        this.__positionAttributeLocation = undefined;        
        this.__vertexNomralAttribute = undefined;
        this.__positionBuffer = undefined;
        this.__modelViewMatrix = undefined;
        this.__projectionMatrix = undefined;               
        this.__program = undefined;
        this.__colorLocation = undefined;
        this.__numberOfFace = 0;
        this.__numberOfVertexPerFace = 0;
        this.__ColorChanelNumber = 4;        
        this.__cameraMatrix = undefined;
        this.__normalBuffer = undefined;
        this.__lightCode = "";
        this.__cameraPosAttributeLocation = undefined;
        this.__numberOfVertex = 0;
        this.__indexBuffer = undefined;
        this.__normalMatrix = undefined;
        this.__lightPosition = undefined;
        this.__lightColor = undefined;
        this.__lightColor2 = undefined;
        this.__lightType = undefined;
        this.__shininess = undefined;
        this.__lightDirection = undefined;
        this.__innerLimit = undefined;
        this.__outerLimit = undefined;
    }

    vertexShaderSource() {
        return "Please implement abstract method vertexShaderSource."
    };

    onLoad(){        
        let game = new Game();
        let gl = game.context;
        let ligths = "";
        if (game.scene.lights.length > 0){
            ligths += "#define LIGHT_COUNT " + game.scene.lights.length + "\n ";
            ligths += "uniform int uLightType[LIGHT_COUNT]; ";
            ligths += "uniform vec3 uLightPosition[LIGHT_COUNT]; ";
            ligths += "uniform vec3 uLightColor[LIGHT_COUNT]; ";
            ligths += "uniform vec3 uLightColor2[LIGHT_COUNT]; ";
            ligths += "uniform vec3 uLightDirection[LIGHT_COUNT]; ";
            ligths += "uniform float uShininess[LIGHT_COUNT]; ";
            ligths += "uniform float uInnerLimit[LIGHT_COUNT]; ";
            ligths += "uniform float uOuterLimit[LIGHT_COUNT]; ";
            
            this.__lightCode = " ";
            this.__lightCode += "reflectedLightColor = vec3(0.0,0,0); ";
            this.__lightCode += "for(int i = 0; i < LIGHT_COUNT; i++) { ";
            this.__lightCode += " if (uLightType[i] == 0) { ";
            this.__lightCode += "  highp vec3 directionalLightColor = uLightColor[i]; "
            this.__lightCode += "  highp vec3 directionalVector = normalize(uLightPosition[i]); ";
            this.__lightCode += "  highp vec3 transformedNormal = mat3(uNormalMatrix) * aVertexNormal; ";
            this.__lightCode += "  highp float directional = max(dot(transformedNormal, directionalVector), 0.0); "
            this.__lightCode += "  reflectedLightColor += (directionalLightColor * directional); ";
            this.__lightCode += " } else ";
            this.__lightCode += " if (uLightType[i] == 1) {";
            this.__lightCode += "  highp vec3 directionalLightColor = uLightColor[i]; "
            this.__lightCode += "  highp vec3 surfaceWorldPosition = (uModelViewMatrix * aVertexPosition).xyz; "
            this.__lightCode += "  highp vec3 v_surfaceToLight = uLightPosition[i] - surfaceWorldPosition; "
            this.__lightCode += "  highp vec3 transformedNormal = mat3(uNormalMatrix) * aVertexNormal; ";
            this.__lightCode += "  highp vec3 surfaceToLightDirection = normalize(v_surfaceToLight); ";
            this.__lightCode += "  highp vec3 v_surfaceToView = u_viewWorldPosition - surfaceWorldPosition; ";
            this.__lightCode += "  highp vec3 surfaceToViewDirection = normalize(v_surfaceToView); ";
            this.__lightCode += "  highp vec3 halfVector = normalize(surfaceToLightDirection + surfaceToViewDirection); ";
            this.__lightCode += "  float specular = 0.0; ";
            this.__lightCode += "  highp float light = max(dot(transformedNormal, surfaceToLightDirection), 0.0); "
            this.__lightCode += "  if (light > 0.0) { ";
            this.__lightCode += "    specular = pow(dot(transformedNormal, halfVector), uShininess[i]);"
            this.__lightCode += "  } ";
            this.__lightCode += "  vColor.rgb += specular * uLightColor2[i]; ";
            this.__lightCode += "  reflectedLightColor += light; ";
            this.__lightCode += " } else ";
            this.__lightCode += " if (uLightType[i] == 2) { ";
            this.__lightCode += "  highp vec3 directionalLightColor = uLightColor[i]; "
            this.__lightCode += "  highp vec3 surfaceWorldPosition = (uModelViewMatrix * aVertexPosition).xyz; "
            this.__lightCode += "  highp vec3 v_surfaceToLight = uLightPosition[i] - surfaceWorldPosition; "
            this.__lightCode += "  highp vec3 transformedNormal = mat3(uNormalMatrix) * aVertexNormal; ";
            this.__lightCode += "  highp vec3 surfaceToLightDirection = normalize(v_surfaceToLight); ";
            this.__lightCode += "  highp vec3 v_surfaceToView = u_viewWorldPosition - surfaceWorldPosition; ";
            this.__lightCode += "  highp vec3 surfaceToViewDirection = normalize(v_surfaceToView); ";
            this.__lightCode += "  highp vec3 halfVector = normalize(surfaceToLightDirection + surfaceToViewDirection); ";
            this.__lightCode += "  float dotFromDirection = dot(surfaceToLightDirection, - uLightDirection[i]); ";
            this.__lightCode += "  float limitRange = uInnerLimit[i] - uOuterLimit[i]; ";
            this.__lightCode += "  float inLight = clamp((dotFromDirection - uOuterLimit[i]) / limitRange, 0.0, 1.0); ";
            this.__lightCode += "  float specular = inLight * pow(dot(transformedNormal, halfVector), uShininess[i]); ";
            this.__lightCode += "  highp float light = inLight * max(dot(transformedNormal, surfaceToLightDirection), 0.0); ";
            this.__lightCode += "  vColor.rgb += specular * uLightColor2[i]; ";
            this.__lightCode += "  reflectedLightColor += light; ";
            this.__lightCode += " }"
            this.__lightCode += " } ";
        } else {
            ligths = "";
            this.__lightCode = "";
        }
        
        this.__vertexShader = JSUtils.createShader(gl.VERTEX_SHADER, ligths + this.vertexShaderSource());
        this.__fragmentShader = JSUtils.createShader(gl.FRAGMENT_SHADER, this.fragmentShaderSource());  
    }

    fragmentShaderSource() {
        return "Please implement abstract method fragmentShaderSource."
    };

    get vertexShader() {
        return this.__vertexShader;
    }

    get fragmentShader () {
        return this.__fragmentShader;
    }

    get program() {
        return this.__program;
    }

    renderChild(context, parentMatrix) {
        for (let i = 0; i < this.owner.child.length; i++) {
            const child = this.owner.child[i];
            child.render.onBeforeRender(context);
            child.render.onRender(context, parentMatrix);            
        }
    }

    /**
     * 
     * @param {Color} color
     * @memberof CubeRenderComponent
     */
    set color(color){
        let game = new Game();
        let gl = game.context;

        this.__vertexColors = [];

        for (let i = 0; i < this.__numberOfVertex; i++) {
            const c = [color.r, color.g, color.b, color.a];
            // for (let j = 0; j < this.__numberOfVertexPerFace; j++) {
                this.__vertexColors = this.__vertexColors.concat(c);                
            // }            
        }

        this.__colorLocation = gl.getAttribLocation(this.__program, "aVertexColor");
        this.__colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.__colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.__vertexColors), gl.STATIC_DRAW);
    }
    /**
     * 
     * 
     * @param {Number} face 
     * @param {Color} color 
     * @returns 
     * @memberof RenderComponent
     */
    colorFace(face, color){
        if (!color) {
            let r = this.__vertexColors[(face * this.__ColorChanelNumber * this.__numberOfVertexPerFace)];
            let g = this.__vertexColors[(face * this.__ColorChanelNumber * this.__numberOfVertexPerFace) + 1];
            let b = this.__vertexColors[(face * this.__ColorChanelNumber * this.__numberOfVertexPerFace) + 2];
            let a = this.__vertexColors[(face * this.__ColorChanelNumber * this.__numberOfVertexPerFace) + 3];
            let c = new Color({r, g, b, a});
            return c;
        }
        else {
            let newColor = [];
            for (let i = 0; i < this.__numberOfVertexPerFace; i++) {
                newColor.push(color.r, color.g, color.b, color.a);
            }

            Array.prototype.splice.apply(this.__vertexColors, [face * this.__ColorChanelNumber * this.__numberOfVertexPerFace,
                                                               this.__ColorChanelNumber * this.__numberOfVertexPerFace].concat(newColor))

            // this.__vertexColors.splice.apply(face * this.__ColorChanelNumber * this.__numberOfVertexPerFace, 
            //                                   this.__ColorChanelNumber * this.__numberOfVertexPerFace, 
            //                                   newColor);
            
            let game = new Game();
            let gl = game.context;
            this.__colorLocation = gl.getAttribLocation(this.__program, "aVertexColor");
            this.__colorBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.__colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.__vertexColors), gl.STATIC_DRAW);
        }
    }
    /**
     * 
     * 
     * @param {Number} vertex 
     * @param {Color} color 
     * @returns 
     * @memberof RenderComponent
     */
    colorVertex(vertex, color){
        if (!color){
            let r = this.__vertexColors[(vertex * this.__ColorChanelNumber)];
            let g = this.__vertexColors[(vertex * this.__ColorChanelNumber) + 1];
            let b = this.__vertexColors[(vertex * this.__ColorChanelNumber) + 2];
            let a = this.__vertexColors[(vertex * this.__ColorChanelNumber) + 3];
            let c = new Color({r, g, b, a});
            return c;
        }
        else {
            this.__vertexColors.splice(vertex * this.__ColorChanelNumber, this.__ColorChanelNumber, color.r, color.g, color.b, color.a);

            let game = new Game();
            let gl = game.context;
            this.__colorLocation = gl.getAttribLocation(this.__program, "aVertexColor");
            this.__colorBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.__colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.__vertexColors), gl.STATIC_DRAW);
        }   
    }
    
}