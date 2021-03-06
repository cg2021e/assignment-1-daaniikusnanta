import { degToRad } from './utils.js';
import { creme } from './colors.js';
import { verticesBox, indicesBox, verticesJournal, indicesJournal} from './vertices-and-indices.js';

function main() {
    //Access the canvas through DOM: Document Object Model
    var canvas = document.getElementById('myCanvas');   // The paper
    var canvasWidth = canvas.getBoundingClientRect().width;
    var canvasHeight = canvas.getBoundingClientRect().height;
    var gl = canvas.getContext('webgl');                // The brush and the paints

    var vertices = verticesJournal.concat(verticesBox);
    indicesBox.forEach((v, i, arr) => {
        arr[i] += verticesJournal.length/9;
    });
    var indices = indicesJournal.concat(indicesBox);
    console.log(verticesJournal.length/9);
    
    // Create a linked-list for storing the vertices data
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Create a linked-list for storing the indices data
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    var vertexShaderSource = `
        attribute vec3 aPosition;
        attribute vec3 aColor;
        attribute vec3 aNormal;
        varying vec3 vColor;
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform mat4 uModel;
        uniform mat4 uView;
        uniform mat4 uProjection;
        void main() {
            gl_Position = uProjection * uView * uModel * (vec4(aPosition * 2. / 3., 1.));
            vColor = aColor;
            vNormal = aNormal;
            vPosition = (uModel * (vec4(aPosition * 2. / 3., 1.))).xyz;
        }
    `;

    var fragmentShaderSource = `
        precision mediump float;
        varying vec3 vColor;
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform vec3 uLightConstant;        // It represents the light color
        uniform float uAmbientIntensity;    // It represents the light intensity
        // uniform vec3 uLightDirection;
        uniform vec3 uLightPosition;
        uniform mat3 uNormalModel;
        uniform vec3 uViewerPosition;
        uniform float uShininessConstant;
        void main() {
            vec3 ambient = uLightConstant * uAmbientIntensity;
            // vec3 lightDirection = uLightDirection;
            vec3 lightDirection = uLightPosition - vPosition;
            vec3 normalizedLight = normalize(lightDirection);  // [2., 0., 0.] becomes a unit vector [1., 0., 0.]
            vec3 normalizedNormal = normalize(uNormalModel * vNormal);
            float cosTheta = dot(normalizedNormal, normalizedLight);
            vec3 diffuse = vec3(0., 0., 0.);
            if (cosTheta > 0.) {
                float diffuseIntensity = cosTheta;
                diffuse = uLightConstant * diffuseIntensity;
            }
            vec3 reflector = reflect(-lightDirection, normalizedNormal);
            vec3 normalizedReflector = normalize(reflector);
            vec3 normalizedViewer = normalize(uViewerPosition - vPosition);
            float cosPhi = dot(normalizedReflector, normalizedViewer);
            vec3 specular = vec3(0., 0., 0.);
            if (cosPhi > 0.) {
                float shininessConstant = uShininessConstant; 
                float specularIntensity = pow(cosPhi, shininessConstant); 
                specular = uLightConstant * specularIntensity;
            }
            vec3 phong = ambient + diffuse + specular;
            gl_FragColor = vec4(phong * vColor, 1.);
        }
    `;

    // Create .c in GPU
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);

    // Compile .c into .o
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    // Prepare a .exe shell (shader program)
    var shaderProgram = gl.createProgram();

    // Put the two .o files into the shell
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    // Link the two .o files, so together they can be a runnable program/context.
    gl.linkProgram(shaderProgram);

    // Start using the context (analogy: start using the paints and the brushes)
    gl.useProgram(shaderProgram);

    // Teach the computer how to collect
    //  the positional values from ARRAY_BUFFER
    //  to each vertex being processed
    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(
        aPosition, 
        3, 
        gl.FLOAT, 
        false, 
        9 * Float32Array.BYTES_PER_ELEMENT, 
        0
    );
    gl.enableVertexAttribArray(aPosition);
    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(
        aColor, 
        3, 
        gl.FLOAT, 
        false, 
        9 * Float32Array.BYTES_PER_ELEMENT, 
        3 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(aColor);
    var aNormal = gl.getAttribLocation(shaderProgram, "aNormal");
    gl.vertexAttribPointer(
        aNormal, 
        3, 
        gl.FLOAT, 
        false, 
        9 * Float32Array.BYTES_PER_ELEMENT, 
        6 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(aNormal);

    // Connect the uniform transformation matrices
    var uModel = gl.getUniformLocation(shaderProgram, "uModel");
    var uView = gl.getUniformLocation(shaderProgram, "uView");
    var uProjection = gl.getUniformLocation(shaderProgram, "uProjection");

    // Set the projection matrix in the vertex shader
    var projection = glMatrix.mat4.create();
    var ratio = canvasWidth/canvasHeight;
    glMatrix.mat4.perspective(
        projection,
        Math.PI / 3,            // field of view
        ratio,              // ratio
        0.5,            // near clip
        10              // far clip
    );
    gl.uniformMatrix4fv(uProjection, false, projection);

    // Set the view matrix in the vertex shader
    var view = glMatrix.mat4.create();
    var camera = [0, 0, 2];
    var cameraTarget = [0, 0, 0];
    glMatrix.mat4.lookAt(
        view,
        camera,      // camera position
        cameraTarget,      // the point where camera looks at
        [0, 1, 0]       // up vector of the camera
    );
    gl.uniformMatrix4fv(uView, false, view);

    // Define the lighting and shading
    var uLightConstant = gl.getUniformLocation(shaderProgram, "uLightConstant");
    var uAmbientIntensity = gl.getUniformLocation(shaderProgram, "uAmbientIntensity");
    gl.uniform3fv(uLightConstant, [1.0, 1.0, 1.0]);

    var lightDeltaY = 0.0;
    var cameraDeltaX = 0.0;
    var lightPosition = [0, 0, 0];

    var uNormalModel = gl.getUniformLocation(shaderProgram, "uNormalModel");
    var uViewerPosition = gl.getUniformLocation(shaderProgram, "uViewerPosition");
    gl.uniform3fv(uViewerPosition, camera);
    var uShininessConstant = gl.getUniformLocation(shaderProgram, "uShininessConstant");
    var uLightPosition = gl.getUniformLocation(shaderProgram, "uLightPosition");

    // Keyboard control
    function onKeydown(event) {
        if (event.keyCode == 87) lightDeltaY = 0.01;
        else if (event.keyCode == 83) lightDeltaY = -0.01;
        else if (event.keyCode == 65) cameraDeltaX = -0.01;
        else if (event.keyCode == 68) cameraDeltaX = 0.01;
    }

    function onKeyup(event) {
        if (event.keyCode == 87) lightDeltaY = 0.0;
        else if (event.keyCode == 83) lightDeltaY = 0.0;
        else if (event.keyCode == 65) cameraDeltaX = 0.0;
        else if (event.keyCode == 68) cameraDeltaX = 0.0;
    }
    document.addEventListener("keydown", onKeydown, false);
    document.addEventListener("keyup", onKeyup, false);

    // Model for cube
    var modelCube = glMatrix.mat4.create();
    var normalModelCube = glMatrix.mat3.create();
    glMatrix.mat3.normalFromMat4(normalModelCube, modelCube);
    var cubeTranslation = [0, 0, 0];

    // Model and normal model for right object
    var modelRight = glMatrix.mat4.create();
    glMatrix.mat4.rotate(modelRight, modelRight, degToRad(270), [0, 1, 0]);
    glMatrix.mat4.rotate(modelRight, modelRight, degToRad(330), [0, 0, 1]);
    glMatrix.mat4.translate(modelRight, modelRight, [0, 0, -0.9]);
    var normalModelRight = glMatrix.mat3.create();
    glMatrix.mat3.normalFromMat4(normalModelRight, modelRight);

    // Model and normal model for left object
    var modelLeft = glMatrix.mat4.create();
    glMatrix.mat4.rotate(modelLeft, modelLeft, degToRad(30), [1, 0, 0]);
    glMatrix.mat4.rotate(modelLeft, modelLeft, degToRad(0), [0, 0, 1]);
    glMatrix.mat4.translate(modelLeft, modelLeft, [-0.7, 0, 0]);
    var normalModelLeft = glMatrix.mat3.create();
    glMatrix.mat3.normalFromMat4(normalModelLeft, modelLeft);

    function render() {
        
        // Update light position
        lightPosition[1] += lightDeltaY;
        gl.uniform3fv(uLightPosition, lightPosition);

        // Update camera position
        camera[0] += cameraDeltaX;
        cameraTarget[0] += cameraDeltaX;
        glMatrix.mat4.lookAt(
            view,
            camera,
            cameraTarget,
            [0, 1, 0]
        );
        gl.uniformMatrix4fv(uView, false, view);
        gl.uniform3fv(uViewerPosition, camera);
        
        // Update cube position
        cubeTranslation[1] = lightDeltaY;
        glMatrix.mat4.translate(modelCube, modelCube, cubeTranslation);

        // Reset the frame buffer
        gl.enable(gl.DEPTH_TEST);
        gl.clearColor(...creme, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        
        // Draw right journal
        gl.uniformMatrix4fv(uModel, false, modelRight);
        gl.uniformMatrix3fv(uNormalModel, false, normalModelRight);
        gl.uniform1f(uShininessConstant, 200);   //Metal
        gl.uniform1f(uAmbientIntensity, 0.363)        
        gl.drawElements(gl.TRIANGLES, indicesJournal.length, gl.UNSIGNED_SHORT, 0);

        // Draw left journal
        gl.uniformMatrix4fv(uModel, false, modelLeft);
        gl.uniform1f(uShininessConstant, 10);    //lPlastic
        gl.uniformMatrix3fv(uNormalModel, false, normalModelLeft);
        gl.uniform1f(uAmbientIntensity, 0.363)
        gl.drawElements(gl.TRIANGLES, indicesJournal.length, gl.UNSIGNED_SHORT, 0);
        
        // Draw the cube
        gl.uniformMatrix4fv(uModel, false, modelCube);
        gl.uniformMatrix3fv(uNormalModel, false, normalModelCube);
        gl.uniform1f(uAmbientIntensity, 1.0)
        gl.drawElements(gl.TRIANGLES, indicesBox.length, gl.UNSIGNED_SHORT, indicesJournal.length * Uint16Array.BYTES_PER_ELEMENT);
    
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

window.onload = main;