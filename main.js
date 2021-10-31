function main() {
    /**
     * @type {HTMLCanvasElement} canvas
     */
    var canvas = document.getElementById('myCanvas');

    /**
     * @type {WebGLRenderingContext} gl
     */
    var gl = canvas.getContext('webgl')
    
    var vertices = [
        -0.9600, -0.1775, 0.278, 0.286, 0.267, // Top Cover
        -0.8275,  0.2825, 0.278, 0.286, 0.267, 
        -0.4650,  0.2900, 0.278, 0.286, 0.267, 
        -0.3350, -0.1500, 0.278, 0.286, 0.267,

        -0.9300, -0.2150, 0.176, 0.149, 0.137, // Bottom Cover
        -0.3500, -0.2025, 0.176, 0.149, 0.137,
        -0.3525, -0.1500, 0.176, 0.149, 0.137,
        -0.9600, -0.1775, 0.176, 0.149, 0.137,

        -0.3825, -0.1850, 0.686, 0.650, 0.525, // Paper
        -0.3675, -0.1525, 0.686, 0.650, 0.525,
        -0.9300, -0.1950, 0.686, 0.650, 0.525,
        -0.9450, -0.1800, 0.686, 0.650, 0.525,

        -0.9600, -0.1775, 0.372, 0.345, 0.282, // Top Cover Accent
        -0.8275,  0.2825, 0.372, 0.345, 0.282, 
        -0.7375, -0.1700, 0.372, 0.345, 0.282,
        -0.7175, -0.1075, 0.372, 0.345, 0.282,
        -0.7000, -0.0375, 0.372, 0.345, 0.282,
        -0.6875,  0.0200, 0.372, 0.345, 0.282,
        -0.6800,  0.0750, 0.372, 0.345, 0.282,
        -0.6750,  0.1200, 0.372, 0.345, 0.282,
        -0.6750,  0.1650, 0.372, 0.345, 0.282,
        -0.6800,  0.2175, 0.372, 0.345, 0.282,
        -0.6850,  0.2575, 0.372, 0.345, 0.282,
        -0.7025,  0.2850, 0.372, 0.345, 0.282,

        -0.4150,  0.1575, 0.494, 0.462, 0.407, // Strap
        -0.3975,  0.0900, 0.494, 0.462, 0.407,
        -0.5125,  0.0975, 0.494, 0.462, 0.407,
        -0.5475,  0.1100, 0.494, 0.462, 0.407,
        -0.5600,  0.1375, 0.494, 0.462, 0.407,
        -0.5525,  0.1525, 0.494, 0.462, 0.407,
        -0.5225,  0.1600, 0.494, 0.462, 0.407,

        // Vertices for top right picture
        0.1225,  0.2775, 0.278, 0.286, 0.267, // Top Cover
        0.6575,  0.2975, 0.278, 0.286, 0.267,
        0.7450,  0.0025, 0.278, 0.286, 0.267,
        0.0050,  0.0025, 0.278, 0.286, 0.267,

        0.0250,  0.0050, 0.176, 0.149, 0.137, // Bottom Cover
        0.0250, -0.0475, 0.176, 0.149, 0.137,
        0.7325, -0.0450, 0.176, 0.149, 0.137,
        0.7350,  0.0050, 0.176, 0.149, 0.137,

        0.0350, -0.0225, 0.686, 0.650, 0.525, // Paper
        0.0350, -0.0125, 0.686, 0.650, 0.525,
        0.7225, -0.0175, 0.686, 0.650, 0.525,
        0.7225, -0.0050, 0.686, 0.650, 0.525,

        0.1225,  0.2775, 0.372, 0.345, 0.282, // Top Cover Accent
        0.6575,  0.2975, 0.372, 0.345, 0.282,
        0.0850,  0.1975, 0.372, 0.345, 0.282,
        0.1350,  0.1950, 0.372, 0.345, 0.282,
        0.1950,  0.1875, 0.372, 0.345, 0.282,
        0.2650,  0.1850, 0.372, 0.345, 0.282,
        0.3325,  0.1850, 0.372, 0.345, 0.282,
        0.3950,  0.1875, 0.372, 0.345, 0.282,
        0.4625,  0.1900, 0.372, 0.345, 0.282,
        0.5200,  0.1950, 0.372, 0.345, 0.282,
        0.5725,  0.1975, 0.372, 0.345, 0.282,
        0.6225,  0.2075, 0.372, 0.345, 0.282,
        0.6775,  0.2150, 0.372, 0.345, 0.282,

        0.3150, -0.0500, 0.494, 0.462, 0.407, // Strap Side
        0.3075, -0.0050, 0.494, 0.462, 0.407,
        0.4175,  0.0000, 0.494, 0.462, 0.407,
        0.4225, -0.0475, 0.494, 0.462, 0.407,

        0.4175,  0.0000, 0.494, 0.462, 0.407, // Strap Top
        0.3075, -0.0050, 0.494, 0.462, 0.407,
        0.3125,  0.0900, 0.494, 0.462, 0.407, 
        0.3325,  0.1125, 0.494, 0.462, 0.407,
        0.3625,  0.1200, 0.494, 0.462, 0.407,
        0.3925,  0.1125, 0.494, 0.462, 0.407,
        0.4100,  0.0925, 0.494, 0.462, 0.407,
    ];

    var indices = [
        0, 1, 2,
        0, 2, 3,
        4, 5, 6,
        4, 6, 7,
        8, 9, 10,
        9, 10, 11,
        12, 13, 14,
        12, 14, 15,
        12, 15, 16,
        12, 16, 17,
        12, 17, 18,
        12, 18, 19,
        12, 19, 20,
        12, 20, 21,
        12, 21, 22,
        12, 22, 23,
        13, 12, 23,
        24, 25, 26,
        24, 26, 27,
        24, 27, 28,
        25, 28, 29,
        25, 29, 30,
        24, 25, 30,

        31, 32, 33,
        31, 33, 34,
        35, 36, 37,
        35, 37, 38,
        39, 40, 41, 
        39, 41, 42, 
        43, 44, 45,
        43, 45, 46,
        43, 46, 47,
        43, 47, 48,
        43, 48, 49,
        43, 49, 50,
        43, 50, 51,
        43, 51, 52,
        43, 52, 53,
        43, 53, 54,
        43, 54, 55,
        43, 44, 55,
        56, 57, 58,
        56, 58, 59,
        60, 61, 62,
        60, 62, 63,
        60, 63, 64,
        60, 64, 65,
        60, 61, 65
    ];

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    var vertexShaderSource = `
        attribute vec2 aPosition;
        attribute vec3 aColor;
        varying vec3 vColor;
        uniform mat4 uTransformationMatrix;
        void main() {
            gl_Position = uTransformationMatrix * vec4(aPosition, 0.0, 1.0);
            vColor = aColor;
        }
    `;

    var fragmentShaderSource = `
        precision mediump float;
        varying vec3 vColor;
        void main() {
            gl_FragColor = vec4(vColor, 1.0);
        }
    `;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    var shaderProgram = gl.createProgram();

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    gl.linkProgram(shaderProgram);

    gl.useProgram(shaderProgram);

    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(
        aPosition, 
        2, 
        gl.FLOAT, 
        false, 
        5 * Float32Array.BYTES_PER_ELEMENT, 
        0
    );
    gl.enableVertexAttribArray(aPosition);
    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(
        aColor, 
        3, 
        gl.FLOAT, 
        false, 
        5 * Float32Array.BYTES_PER_ELEMENT, 
        2 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(aColor);

    var freeze = false;

    const btn = document.getElementById("myButton");

    btn.addEventListener("click", ()=>{
        freeze = !freeze;
        if (btn.innerText === "Animate"){
            btn.innerText = "Stop";
        } else {
            btn.innerText= "Animate";
        }
    });

    var uTransformationMatrix = gl.getUniformLocation(shaderProgram, 'uTransformationMatrix');
    
    var speed = 0.0163;
    var ty = 0;

    function render() {
        if (!freeze){
            if (ty >= 0.67 || ty <= -0.97) {
                speed = -speed;
            }
            ty += speed;
            
            var translationMatrixLeft = new Float32Array([
                1.0, 0.0, 0.0, 0.0,
                0.0, 1.0, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 1.0,
            ]);

            var translationMatrixRight = new Float32Array([
                1.0, 0.0, 0.0, 0.0,
                0.0, 1.0, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                0.0, ty , 0.0, 1.0,
            ]);

            gl.clearColor(0.941, 0.886, 0.714, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
        
            gl.uniformMatrix4fv(uTransformationMatrix, false, translationMatrixLeft);    
            gl.drawElements(gl.TRIANGLES, 69, gl.UNSIGNED_SHORT, 0);
            
            gl.uniformMatrix4fv(uTransformationMatrix, false, translationMatrixRight);
            gl.drawElements(gl.TRIANGLES, indices.length - 69, gl.UNSIGNED_SHORT, 69 * Uint16Array.BYTES_PER_ELEMENT);
        }
        requestAnimationFrame(render);
    }   
    requestAnimationFrame(render);
}