
const cubeVertices = new Float32Array([
    // Front face
    -0.5, -0.5, 0.5,  0,  0,  1,
     0.5, -0.5, 0.5,  0,  0,  1,
     0.5,  0.5, 0.5,  0,  0,  1,
    -0.5, -0.5, 0.5,  0,  0,  1,
     0.5,  0.5, 0.5,  0,  0,  1,
    -0.5,  0.5, 0.5,  0,  0,  1,

    // Back face
    -0.5, -0.5, -0.5,  0,  0, -1,
    -0.5,  0.5, -0.5,  0,  0, -1,
     0.5,  0.5, -0.5,  0,  0, -1,
    -0.5, -0.5, -0.5,  0,  0, -1,
     0.5,  0.5, -0.5,  0,  0, -1,
     0.5, -0.5, -0.5,  0,  0, -1,

    // Top face
    -0.5,  0.5, -0.5,  0,  1,  0,
    -0.5,  0.5,  0.5,  0,  1,  0,
     0.5,  0.5,  0.5,  0,  1,  0,
    -0.5,  0.5, -0.5,  0,  1,  0,
     0.5,  0.5,  0.5,  0,  1,  0,
     0.5,  0.5, -0.5,  0,  1,  0,

    // Bottom face
    -0.5, -0.5, -0.5,  0, -1,  0,
     0.5, -0.5, -0.5,  0, -1,  0,
     0.5, -0.5,  0.5,  0, -1,  0,
    -0.5, -0.5, -0.5,  0, -1,  0,
     0.5, -0.5,  0.5,  0, -1,  0,
    -0.5, -0.5,  0.5,  0, -1,  0,

    // Right face
     0.5, -0.5, -0.5,  1,  0,  0,
     0.5,  0.5, -0.5,  1,  0,  0,
     0.5,  0.5,  0.5,  1,  0,  0,
     0.5, -0.5, -0.5,  1,  0,  0,
     0.5,  0.5,  0.5,  1,  0,  0,
     0.5, -0.5,  0.5,  1,  0,  0,

    // Left face
    -0.5, -0.5, -0.5, -1,  0,  0,
    -0.5, -0.5,  0.5, -1,  0,  0,
    -0.5,  0.5,  0.5, -1,  0,  0,
    -0.5, -0.5, -0.5, -1,  0,  0,
    -0.5,  0.5,  0.5, -1,  0,  0,
    -0.5,  0.5, -0.5, -1,  0,  0,
]);
