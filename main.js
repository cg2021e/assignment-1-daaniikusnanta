function main() {
    //Access the canvas through DOM: Document Object Model
    var canvas = document.getElementById('myCanvas');   // The paper
    var gl = canvas.getContext('webgl');                // The brush and the paints

    //Color
    function color(r, g, b) {
        return [r/255, g/255, b/255];
    };

    var white = [1.0, 1.0, 1.0];
    var brown = [...color(53, 39, 19)];
    var beige = [...color(110, 89, 58)];
    var creme = [...color(230, 216, 170)];

    function normalVector(p1, p2, p3) {
        var v1 = [p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2]];
        var v2 = [p3[0] - p1[0], p3[1] - p1[1], p3[2] - p1[2]];
        var n = [v1[1] * v2[2] - v1[2] * v2[1],
                    v1[2] * v2[0] - v1[0] * v2[2],
                    v1[0] * v2[1] - v1[1] * v2[0]];
        var d = Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]);
        return [n[0] / d, n[1] / d, n[2] / d];
    };

    // Define vertices data consisting of position and color properties
    var verticesBox = [
        // Face A       // Red      // Surface orientation (normal vector)
        -0.1, -0.1, -0.1,     ...white,    0, 0, -1,   // Index:  0    
         0.1, -0.1, -0.1,     ...white,    0, 0, -1,   // Index:  1
         0.1,  0.1, -0.1,     ...white,    0, 0, -1,   // Index:  2
        -0.1,  0.1, -0.1,     ...white,    0, 0, -1,   // Index:  3
        // Face B       // Yellow
        -0.1, -0.1,  0.1,     ...white,    0, 0, 1,    // Index:  4
         0.1, -0.1,  0.1,     ...white,    0, 0, 1,    // Index:  5
         0.1,  0.1,  0.1,     ...white,    0, 0, 1,    // Index:  6
        -0.1,  0.1,  0.1,     ...white,    0, 0, 1,    // Index:  7
        // Face C       // Green
        -0.1, -0.1, -0.1,     ...white,    -1, 0, 0,   // Index:  8
        -0.1,  0.1, -0.1,     ...white,    -1, 0, 0,   // Index:  9
        -0.1,  0.1,  0.1,     ...white,    -1, 0, 0,   // Index: 10
        -0.1, -0.1,  0.1,     ...white,    -1, 0, 0,   // Index: 11
        // Face D       // Blue
         0.1, -0.1, -0.1,     ...white,    1, 0, 0,    // Index: 12
         0.1,  0.1, -0.1,     ...white,    1, 0, 0,    // Index: 13
         0.1,  0.1,  0.1,     ...white,    1, 0, 0,    // Index: 14
         0.1, -0.1,  0.1,     ...white,    1, 0, 0,    // Index: 15
        // Face E       // Orange
        -0.1, -0.1, -0.1,     ...white,    0, -1, 0,   // Index: 16
        -0.1, -0.1,  0.1,     ...white,    0, -1, 0,   // Index: 17
         0.1, -0.1,  0.1,     ...white,    0, -1, 0,   // Index: 18
         0.1, -0.1, -0.1,     ...white,    0, -1, 0,   // Index: 19
        // Face F       // White
        -0.1,  0.1, -0.1,     ...white,    0, 1, 0,    // Index: 20
        -0.1,  0.1,  0.1,     ...white,    0, 1, 0,    // Index: 21
         0.1,  0.1,  0.1,     ...white,    0, 1, 0,    // Index: 22
         0.1,  0.1, -0.1,     ...white,    0, 1, 0     // Index: 23
    ];

    var indicesBox = [
        0, 1, 2,     0, 2, 3,     // Face A
        4, 5, 6,     4, 6, 7,     // Face B
        8, 9, 10,    8, 10, 11,   // Face C
        12, 13, 14,  12, 14, 15,  // Face D
        16, 17, 18,  16, 18, 19,  // Face E
        20, 21, 22,  20, 22, 23,  // Face F     
    ];

    var verticesJournal = [
        //Paper - Front         //Texture   //Normal vector
        -0.67, -0.05,  0.97,    ...white,    0, 0, 1,
        -0.67,  0.05,  0.97,    ...white,    0, 0, 1,
         0.65,  0.05,  0.97,    ...white,    0, 0, 1,
         0.65, -0.05,  0.97,    ...white,    0, 0, 1,
        //Paper - Side
         0.65, -0.05, -0.97,    ...white,    1, 0, 0,
         0.65, -0.05,  0.97,    ...white,    1, 0, 0,
         0.65,  0.05,  0.97,    ...white,    1, 0, 0,
         0.65,  0.05, -0.97,    ...white,    1, 0, 0,
        //Paper - Back
         0.65, -0.05, -0.97,    ...white,    0, 0, -1,
         0.65,  0.05, -0.97,    ...white,    0, 0, -1,
        -0.67,  0.05, -0.97,    ...white,    0, 0, -1,
        -0.67, -0.05, -0.97,    ...white,    0, 0, -1,
    
        //Cover - Top - Top
        -0.67,  0.06,     1,    ...brown,    0, 1, 0,
         0.67,  0.06,     1,    ...brown,    0, 1, 0,
         0.67,  0.06,    -1,    ...brown,    0, 1, 0,
        -0.67,  0.06,    -1,    ...brown,    0, 1, 0,
        //Cover - Top - Front
        -0.67,  0.06,     1,    ...brown,    0, 0, 1,
        -0.67,  0.05,     1,    ...brown,    0, 0, 1,
         0.67,  0.06,     1,    ...brown,    0, 0, 1,
         0.67,  0.05,     1,    ...brown,    0, 0, 1,
        //Cover - Top - Side
         0.67,  0.06,     1,    ...brown,    1, 0, 0,
         0.67,  0.05,     1,    ...brown,    1, 0, 0,
        -0.67,  0.06,    -1,    ...brown,    1, 0, 0,
        -0.67,  0.05,    -1,    ...brown,    1, 0, 0,
        //Cover - Top - Back
         0.67,  0.06,    -1,    ...brown,    0, 0, -1,
         0.67,  0.05,    -1,    ...brown,    0, 0, -1,
        -0.67,  0.06,    -1,    ...brown,    0, 0, -1,
        -0.67,  0.05,    -1,    ...brown,    0, 0, -1,
        //Cover - Top - Bottom
        -0.67,  0.05,     1,    ...brown,    0, -1, 0,
         0.67,  0.05,     1,    ...brown,    0, -1, 0,
         0.67,  0.05,    -1,    ...brown,    0, -1, 0,
        -0.67,  0.05,    -1,    ...brown,    0, -1, 0,
    
        //Cover - Side - Outer Side
        -0.67, -0.06,     1,    ...beige,   -1, 0, 0,
        -0.67,  0.06,     1,    ...beige,   -1, 0, 0,
        -0.67,  0.06,    -1,    ...beige,   -1, 0, 0,
        -0.67, -0.06,    -1,    ...beige,   -1, 0, 0,
        //Cover - Side - Front
        -0.67,  0.06,     1,    ...beige,   0, 0, 1,
        -0.67, -0.06,     1,    ...beige,   0, 0, 1,
        -0.66,  0.06,     1,    ...beige,   0, 0, 1,
        -0.66, -0.06,     1,    ...beige,   0, 0, 1,
        //Cover - Side - Back
        -0.67,  0.06,    -1,    ...beige,   0, 0,-1,
        -0.67, -0.06,    -1,    ...beige,   0, 0,-1,
        -0.66,  0.06,    -1,    ...beige,   0, 0,-1,
        -0.66, -0.06,    -1,    ...beige,   0, 0,-1,
        //Cover - Side - Inner Side
        -0.66, -0.06,     1,    ...beige,   1, 0, 0,
        -0.66,  0.06,     1,    ...beige,   1, 0, 0,
        -0.66,  0.06,    -1,    ...beige,   1, 0, 0,
        -0.66, -0.06,    -1,    ...beige,   1, 0, 0,
    
        //Cover - Bottom - Bottom
        -0.67, -0.06,    -1,    ...beige,   0, -1, 0,
        -0.67, -0.06,     1,    ...beige,   0, -1, 0,
         0.67, -0.06,     1,    ...beige,   0, -1, 0,  
         0.67, -0.06,    -1,    ...beige,   0, -1, 0,
        //Cover - Bottom - Front
        -0.67, -0.06,     1,    ...beige,   0, 0, 1,
         0.67, -0.06,     1,    ...beige,   0, 0, 1,  
        -0.67, -0.05,     1,    ...beige,   0, 0, 1,
         0.67, -0.05,     1,    ...beige,   0, 0, 1, 
        //Cover - Bottom - Side
         0.67, -0.06,     1,    ...beige,   1, 0, 0,
         0.67, -0.06,    -1,    ...beige,   1, 0, 0,
         0.67, -0.05,     1,    ...beige,   1, 0, 0,
         0.67, -0.05,    -1,    ...beige,   1, 0, 0,
        //Cover - Bottom - Back
         0.67, -0.06,    -1,    ...beige,   0, 0, -1,
        -0.67, -0.06,    -1,    ...beige,   0, 0, -1,
         0.67, -0.05,    -1,    ...beige,   0, 0, -1,
        -0.67, -0.05,    -1,    ...beige,   0, 0, -1,
        //Cover - Bottom - Top
        -0.67, -0.05,    -1,    ...beige,   0, -1, 0,
        -0.67, -0.05,     1,    ...beige,   0, -1, 0,
         0.67, -0.05,     1,    ...beige,   0, -1, 0,  
         0.67, -0.05,    -1,    ...beige,   0, -1, 0,
    
        //Strap - Side - Outer Side
         0.68, -0.06, -0.15,    ...beige,   1, 0, 0,
         0.68, -0.06,  0.15,    ...beige,   1, 0, 0,
         0.68,  0.07,  0.15,    ...beige,   1, 0, 0,
         0.68,  0.07, -0.15,    ...beige,   1, 0, 0,
        //Strap - Side - Front
         0.68,  0.07,  0.15,    ...beige,   0, 0, 1,
         0.68, -0.06,  0.15,    ...beige,   0, 0, 1,
         0.67,  0.07,  0.15,    ...beige,   0, 0, 1,
         0.67, -0.06,  0.15,    ...beige,   0, 0, 1,
        //Strap - Side - Bottom
         0.68, -0.06,  0.15,    ...beige,   0, -1, 0,
         0.68, -0.06, -0.15,    ...beige,   0, -1, 0,
         0.67, -0.06,  0.15,    ...beige,   0, -1, 0,
         0.67, -0.06, -0.15,    ...beige,   0, -1, 0,
        //Strap - Side - Back
         0.68, -0.06, -0.15,    ...beige,   0, 0, -1,
         0.68,  0.07, -0.15,    ...beige,   0, 0, -1,
         0.67, -0.06, -0.15,    ...beige,   0, 0, -1,
         0.67,  0.07, -0.15,    ...beige,   0, 0, -1,
         //Strap - Side - Inner Side
         0.67, -0.06, -0.15,    ...beige,   1, 0, 0,
         0.67, -0.06,  0.15,    ...beige,   1, 0, 0,
         0.67,  0.07,  0.15,    ...beige,   1, 0, 0,
         0.67,  0.07, -0.15,    ...beige,   1, 0, 0,
        
        //Strap - Top - Top
         0.68,  0.07, -0.15,    ...beige,   0, 1, 0,
         0.68,  0.07,  0.15,    ...beige,   0, 1, 0,
         0.31,  0.07,  0.15,    ...beige,   0, 1, 0,
         0.31,  0.07, -0.15,    ...beige,   0, 1, 0,
        //Strap - Top - Front
         0.68,  0.07,  0.15,    ...beige,   0, 0, 1,
         0.31,  0.07,  0.15,    ...beige,   0, 0, 1,
         0.68,  0.06,  0.15,    ...beige,   0, 0, 1,
         0.31,  0.06,  0.15,    ...beige,   0, 0, 1,
        //Strap - Top - Back
         0.68,  0.07, -0.15,    ...beige,   0, 0, -1,
         0.31,  0.07, -0.15,    ...beige,   0, 0, -1,
         0.68,  0.06, -0.15,    ...beige,   0, 0, -1,
         0.31,  0.06, -0.15,    ...beige,   0, 0, -1, //Index 99

         //Strap - Top2 - Top
         0.31,  0.07,     0,    ...beige,   0, 1, 0,
         0.31,  0.07,  0.15,    ...beige,   0, 1, 0,
         0.24,  0.07,  0.14,    ...beige,   0, 1, 0,
         0.17,  0.07,  0.11,    ...beige,   0, 1, 0,
         0.14,  0.07,  0.06,    ...beige,   0, 1, 0,
         0.12,  0.07,  0.01,    ...beige,   0, 1, 0,
         0.14,  0.07, -0.06,    ...beige,   0, 1, 0,
         0.17,  0.07, -0.11,    ...beige,   0, 1, 0,
         0.24,  0.07, -0.14,    ...beige,   0, 1, 0,
         0.31,  0.07, -0.15,    ...beige,   0, 1, 0, //Index 109

         //Strap - Top2 - Sides
         0.31,  0.07,  0.15,    ...beige,   ...normalVector([0.31,  0.07,  0.15], [0.24,  0.07,  0.14], [0.31,  0.06,  0.15]), // Side 1
         0.24,  0.07,  0.14,    ...beige,   ...normalVector([0.31,  0.07,  0.15], [0.24,  0.07,  0.14], [0.31,  0.06,  0.15]),
         0.31,  0.06,  0.15,    ...beige,   ...normalVector([0.31,  0.07,  0.15], [0.24,  0.07,  0.14], [0.31,  0.06,  0.15]),
         0.24,  0.06,  0.14,    ...beige,   ...normalVector([0.31,  0.07,  0.15], [0.24,  0.07,  0.14], [0.31,  0.06,  0.15]),

         0.24,  0.07,  0.14,    ...beige,   ...normalVector([0.31,  0.07,  0.15], [0.24,  0.07,  0.14], [0.31,  0.06,  0.15]), // Side 2
         0.17,  0.07,  0.11,    ...beige,   ...normalVector([0.31,  0.07,  0.15], [0.24,  0.07,  0.14], [0.31,  0.06,  0.15]),
         0.24,  0.06,  0.14,    ...beige,   ...normalVector([0.31,  0.07,  0.15], [0.24,  0.07,  0.14], [0.31,  0.06,  0.15]),
         0.17,  0.06,  0.11,    ...beige,   ...normalVector([0.31,  0.07,  0.15], [0.24,  0.07,  0.14], [0.31,  0.06,  0.15]),

         0.17,  0.07,  0.11,    ...beige,   ...normalVector([0.17,  0.07,  0.11], [0.14,  0.07,  0.06], [0.17,  0.06,  0.11]), // Side 3
         0.14,  0.07,  0.06,    ...beige,   ...normalVector([0.17,  0.07,  0.11], [0.14,  0.07,  0.06], [0.17,  0.06,  0.11]),
         0.17,  0.06,  0.11,    ...beige,   ...normalVector([0.17,  0.07,  0.11], [0.14,  0.07,  0.06], [0.17,  0.06,  0.11]),
         0.14,  0.06,  0.06,    ...beige,   ...normalVector([0.17,  0.07,  0.11], [0.14,  0.07,  0.06], [0.17,  0.06,  0.11]),

         0.14,  0.07,  0.06,    ...beige,   ...normalVector([0.14,  0.07,  0.06], [0.12,  0.07,  0.01], [0.14,  0.06,  0.06]), // Side 4
         0.12,  0.07,  0.01,    ...beige,   ...normalVector([0.14,  0.07,  0.06], [0.12,  0.07,  0.01], [0.14,  0.06,  0.06]),
         0.14,  0.06,  0.06,    ...beige,   ...normalVector([0.14,  0.07,  0.06], [0.12,  0.07,  0.01], [0.14,  0.06,  0.06]),
         0.12,  0.06,  0.01,    ...beige,   ...normalVector([0.14,  0.07,  0.06], [0.12,  0.07,  0.01], [0.14,  0.06,  0.06]),

         0.12,  0.07,  0.01,    ...beige,   ...normalVector([0.12,  0.07,  0.01], [ 0.14,  0.07, -0.06], [0.12,  0.06,  0.01]), // Side 5
         0.14,  0.07, -0.06,    ...beige,   ...normalVector([0.12,  0.07,  0.01], [ 0.14,  0.07, -0.06], [0.12,  0.06,  0.01]),
         0.12,  0.06,  0.01,    ...beige,   ...normalVector([0.12,  0.07,  0.01], [ 0.14,  0.07, -0.06], [0.12,  0.06,  0.01]),
         0.14,  0.06, -0.06,    ...beige,   ...normalVector([0.12,  0.07,  0.01], [ 0.14,  0.07, -0.06], [0.12,  0.06,  0.01]),

         0.14,  0.07, -0.06,    ...beige,   ...normalVector([0.14,  0.07, -0.06], [0.17,  0.07, -0.11], [0.14,  0.06, -0.06]), // Side 6 
         0.17,  0.07, -0.11,    ...beige,   ...normalVector([0.14,  0.07, -0.06], [0.17,  0.07, -0.11], [0.14,  0.06, -0.06]),
         0.14,  0.06, -0.06,    ...beige,   ...normalVector([0.14,  0.07, -0.06], [0.17,  0.07, -0.11], [0.14,  0.06, -0.06]),
         0.17,  0.06, -0.11,    ...beige,   ...normalVector([0.14,  0.07, -0.06], [0.17,  0.07, -0.11], [0.14,  0.06, -0.06]),

         0.17,  0.07, -0.11,    ...beige,   ...normalVector([0.17,  0.07, -0.11], [ 0.24,  0.07, -0.14], [0.17,  0.06, -0.11]), // Side 7
         0.24,  0.07, -0.14,    ...beige,   ...normalVector([0.17,  0.07, -0.11], [ 0.24,  0.07, -0.14], [0.17,  0.06, -0.11]),
         0.17,  0.06, -0.11,    ...beige,   ...normalVector([0.17,  0.07, -0.11], [ 0.24,  0.07, -0.14], [0.17,  0.06, -0.11]),
         0.24,  0.06, -0.14,    ...beige,   ...normalVector([0.17,  0.07, -0.11], [ 0.24,  0.07, -0.14], [0.17,  0.06, -0.11]),

         0.24,  0.07, -0.14,    ...beige,   ...normalVector([0.24,  0.07, -0.14], [0.31,  0.07, -0.15], [0.24,  0.06, -0.14]), // Side 8
         0.31,  0.07, -0.15,    ...beige,   ...normalVector([0.24,  0.07, -0.14], [0.31,  0.07, -0.15], [0.24,  0.06, -0.14]),
         0.24,  0.06, -0.14,    ...beige,   ...normalVector([0.24,  0.07, -0.14], [0.31,  0.07, -0.15], [0.24,  0.06, -0.14]),
         0.31,  0.06, -0.15,    ...beige,   ...normalVector([0.24,  0.07, -0.14], [0.31,  0.07, -0.15], [0.24,  0.06, -0.14]),
    ];
    
    var indicesJournal = [
        //Paper
        0, 1, 2,    0, 2, 3, //Front
        4, 5, 6,    4, 6, 7, //Side
        8, 9, 10,   8, 10, 11, //Back
    
        // Cover - Top
        12, 13, 14,  12, 14, 15, //Top
        16, 17, 18,  16, 18, 19, //Front
        20, 21, 22,  20, 22, 23, //Side
        24, 25, 26,  24, 26, 27, //Back
        28, 29, 30,  28, 30, 31, //Bottom
    
        // Cover - Side
        32, 33, 34,  32, 34, 35, //Outer Side
        36, 37, 38,  36, 38, 39, //Front
        40, 41, 42,  40, 42, 43, //Back
        44, 45, 46,  44, 46, 47, //Inner Side
    
        //Cover - Bottom
        48, 49, 50,  48, 50, 51, //Bottom
        52, 53, 54,  52, 54, 55, //Front
        56, 57, 58,  56, 58, 59, //Side
        60, 61, 62,  60, 62, 63, //Back
        64, 65, 66,  64, 66, 67, //Top
    
        //Strap - Side
        68, 69, 70,  68, 70, 71, //Outer Side
        72, 73, 74,  72, 74, 75, //Front
        76, 77, 78,  76, 78, 79, //Bottom
        80, 81, 82,  80, 82, 83, //Back
        84, 85, 86,  84, 86, 87, //Inner Side

        //Strap - Top
        88, 89, 90,  88, 90, 91, //Top
        92, 93, 94,  92, 94, 95,  //Front
        96, 97, 98,  96, 98, 99, //Back

        //Strap - Top2
        100, 101, 102,   100, 102, 103,
        100, 103, 104,   100, 104, 105,
        100, 105, 106,   100, 106, 107,
        100, 107, 108,   100, 108, 109,

        //Strap - Top2 - Sides
        110, 111, 112,   110, 112, 113, // Side 1
        114, 115, 116,   114, 116, 117, // Side 2
        118, 119, 120,   118, 120, 121, // Side 3
        122, 123, 124,   122, 124, 125, // Side 4
        126, 127, 128,   126, 128, 129, // Side 5
        130, 131, 132,   130, 132, 133, // Side 6
        134, 135, 136,   134, 136, 137, // Side 7
        138, 139, 140,   138, 140, 141, // Side 8
    ];

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
    glMatrix.mat4.perspective(
        projection,
        Math.PI / 3,    // field of view
        1,              // ratio
        0.5,            // near clip
        10              // far clip
    );
    gl.uniformMatrix4fv(uProjection, false, projection);

    // Set the view matrix in the vertex shader
    var view = glMatrix.mat4.create();
    var camera = [0, 0, 3.5];
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
    gl.uniform3fv(uLightConstant, [1.0, 1.0, 1.0]);   // orange light
     // light intensity: 40%

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

    // Utility degree to radian function
    function degToRad(degrees) {
        return degrees * (Math.PI/180);
    }

    // Model for cube
    var modelCube = glMatrix.mat4.create();
    var normalModelCube = glMatrix.mat4.create();
    glMatrix.mat3.normalFromMat4(normalModelCube, modelCube);
    var cubeTranslation = [0, 0, 0];

    // Model and normal model for right object
    var modelRight = glMatrix.mat4.create();
    glMatrix.mat4.rotate(modelRight, modelRight, degToRad(270), [0, 1, 0]);
    glMatrix.mat4.rotate(modelRight, modelRight, degToRad(330), [0, 0, 1]);
    glMatrix.mat4.translate(modelRight, modelRight, [0, 0, -1]);
    var normalModelRight = glMatrix.mat3.create();
    glMatrix.mat3.normalFromMat4(normalModelRight, modelRight);

    // Model and normal model for left object
    var modelLeft = glMatrix.mat4.create();
    glMatrix.mat4.rotate(modelLeft, modelLeft, degToRad(30), [1, 0, 0]);
    glMatrix.mat4.rotate(modelLeft, modelLeft, degToRad(0), [0, 0, 1]);
    glMatrix.mat4.translate(modelLeft, modelLeft, [-0.78, 0, 0]);
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
        gl.uniform1f(uShininessConstant, 500);
        gl.uniform1f(uAmbientIntensity, 0.340)        
        gl.drawElements(gl.TRIANGLES, indicesJournal.length, gl.UNSIGNED_SHORT, 0);

        // Draw left journal
        gl.uniformMatrix4fv(uModel, false, modelLeft);
        gl.uniform1f(uShininessConstant, 5);
        gl.uniformMatrix3fv(uNormalModel, false, normalModelLeft);
        gl.uniform1f(uAmbientIntensity, 0.340)
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