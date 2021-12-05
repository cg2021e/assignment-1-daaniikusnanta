export function normalVector(p1, p2, p3) {
    var v1 = [p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2]];
    var v2 = [p3[0] - p1[0], p3[1] - p1[1], p3[2] - p1[2]];
    var n = [v1[1] * v2[2] - v1[2] * v2[1],
                v1[2] * v2[0] - v1[0] * v2[2],
                v1[0] * v2[1] - v1[1] * v2[0]];
    var d = Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]);
    return [n[0] / d, n[1] / d, n[2] / d];
}

export function color(r, g, b) {
    return [r / 255, g / 255, b / 255];
}

// export const color = (r, g, b) => {
//     return [r/255, g/255, b/255];
// }

export function degToRad(degrees) {
    return degrees * (Math.PI/180);
}