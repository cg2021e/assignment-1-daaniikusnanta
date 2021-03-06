import { white, beige, brown } from "./colors.js";
import { normalVector, hexToColor } from "./utils.js";

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
     0.31,  0.06, -0.15,    ...beige,   ...normalVector([0.24,  0.07, -0.14], [0.31,  0.07, -0.15], [0.24,  0.06, -0.14]), // Index 141

    // Cover - Top - Accent
    -0.67,  0.0602,  0.01,    ...beige,   0, 1, 0,     //142
    -0.67,  0.0602,   1.0,    ...beige,   0, 1, 0,        //143 
    -0.22,  0.0602,   1.0,    ...beige,   0, 1, 0,        //144
    -0.15,  0.0602,  0.50,    ...beige,   0, 1, 0,        //145
    -0.12,  0.0602,  0.01,    ...beige,   0, 1, 0,     //146
    -0.15,  0.0602, -0.50,    ...beige,   0, 1, 0,        //147
    -0.22,  0.0602,  -1.0,    ...beige,   0, 1, 0,        //148
    -0.67,  0.0602,  -1.0,    ...beige,   0, 1, 0         //149
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

    //Cover - Top - Accent
    142, 143, 144,  142, 144, 145,
    142, 145, 146,  142, 146, 147,
    142, 147, 148,  142, 148, 149
];

var verticesPlane = [
     10, 0, 10,      ...hexToColor("163163"),   0, 1, 0,
     10, 0,-10,      ...hexToColor("163163"),   0, 1, 0, 
    -10, 0,-10,      ...hexToColor("163163"),   0, 1, 0,
    -10, 0, 10,      ...hexToColor("163163"),   0, 1, 0
]

var indicesPlane = [
    0, 1, 2,   0, 2, 3
]

export {verticesBox, indicesBox, verticesJournal, indicesJournal, verticesPlane, indicesPlane};