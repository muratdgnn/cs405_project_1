function multiplyMatrices(matrixA, matrixB) {
    var result = [];

    for (var i = 0; i < 4; i++) {
        result[i] = [];
        for (var j = 0; j < 4; j++) {
            var sum = 0;
            for (var k = 0; k < 4; k++) {
                sum += matrixA[i * 4 + k] * matrixB[k * 4 + j];
            }
            result[i][j] = sum;
        }
    }

    // Flatten the result array
    return result.reduce((a, b) => a.concat(b), []);
}
function createIdentityMatrix() {
    return new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]);
}
function createScaleMatrix(scale_x, scale_y, scale_z) {
    return new Float32Array([
        scale_x, 0, 0, 0,
        0, scale_y, 0, 0,
        0, 0, scale_z, 0,
        0, 0, 0, 1
    ]);
}

function createTranslationMatrix(x_amount, y_amount, z_amount) {
    return new Float32Array([
        1, 0, 0, x_amount,
        0, 1, 0, y_amount,
        0, 0, 1, z_amount,
        0, 0, 0, 1
    ]);
}

function createRotationMatrix_Z(radian) {
    return new Float32Array([
        Math.cos(radian), -Math.sin(radian), 0, 0,
        Math.sin(radian), Math.cos(radian), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ])
}

function createRotationMatrix_X(radian) {
    return new Float32Array([
        1, 0, 0, 0,
        0, Math.cos(radian), -Math.sin(radian), 0,
        0, Math.sin(radian), Math.cos(radian), 0,
        0, 0, 0, 1
    ])
}

function createRotationMatrix_Y(radian) {
    return new Float32Array([
        Math.cos(radian), 0, Math.sin(radian), 0,
        0, 1, 0, 0,
        -Math.sin(radian), 0, Math.cos(radian), 0,
        0, 0, 0, 1
    ])
}

function getTransposeMatrix(matrix) {
    return new Float32Array([
        matrix[0], matrix[4], matrix[8], matrix[12],
        matrix[1], matrix[5], matrix[9], matrix[13],
        matrix[2], matrix[6], matrix[10], matrix[14],
        matrix[3], matrix[7], matrix[11], matrix[15]
    ]);
}

const vertexShaderSource = `
attribute vec3 position;
attribute vec3 normal; // Normal vector for lighting

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 normalMatrix;

uniform vec3 lightDirection;

varying vec3 vNormal;
varying vec3 vLightDirection;

void main() {
    vNormal = vec3(normalMatrix * vec4(normal, 0.0));
    vLightDirection = lightDirection;

    gl_Position = vec4(position, 1.0) * projectionMatrix * modelViewMatrix; 
}

`

const fragmentShaderSource = `
precision mediump float;

uniform vec3 ambientColor;
uniform vec3 diffuseColor;
uniform vec3 specularColor;
uniform float shininess;

varying vec3 vNormal;
varying vec3 vLightDirection;

void main() {
    vec3 normal = normalize(vNormal);
    vec3 lightDir = normalize(vLightDirection);
    
    // Ambient component
    vec3 ambient = ambientColor;

    // Diffuse component
    float diff = max(dot(normal, lightDir), 0.0);
    vec3 diffuse = diff * diffuseColor;

    // Specular component (view-dependent)
    vec3 viewDir = vec3(0.0, 0.0, 1.0); // Assuming the view direction is along the z-axis
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);
    vec3 specular = spec * specularColor;

    gl_FragColor = vec4(ambient + diffuse + specular, 1.0);
}

`


function getChatGPTModelViewMatrix() {
    const transformationMatrix = new Float32Array([
        // you should paste the response of the chatGPT here:

        0.17677669, -0.28661165, 0.36959946, 0.3,
        0.30618623, 0.36959946, 0.14016505, -0.25,
       -0.35355338, 0.17677669, 0.30618623, 0,
        0, 0, 0, 1

    ]);
    return getTransposeMatrix(transformationMatrix);
}



function getModelViewMatrix() {

    const scalingMatrix = createScaleMatrix(0.5, 0.5, 1);

    
    const rotation_X = createRotationMatrix_X((30 * Math.PI) / 180); 
    const rotation_Y = createRotationMatrix_Y((45 * Math.PI) / 180); 
    const rotation_Z = createRotationMatrix_Z((60 * Math.PI) / 180); 

    const translationMatrix = createTranslationMatrix(0.3, -0.25, 0);


    let total_Matrix = multiplyMatrices(translationMatrix, rotation_X);
    total_Matrix = multiplyMatrices(total_Matrix, rotation_Y);
    total_Matrix = multiplyMatrices(total_Matrix, rotation_Z);
    total_Matrix = multiplyMatrices(total_Matrix, scalingMatrix);

    return new Float32Array(total_Matrix);

}




function getPeriodicMovement(startTime) {

    
    const elapsed = (Date.now() - startTime) % 10000;
    const t = (elapsed <= 10000 / 2) ? (elapsed / (10000 / 2)) : (1 - (elapsed - 10000 / 2) / (10000 / 2));

    const interpolatedMatrix = [];
    for(let i = 0; i<16; i++)
    {
        interpolatedMatrix[i] = createIdentityMatrix()[i] + t * (getModelViewMatrix()[i]- createIdentityMatrix()[i]);
    }

    return interpolatedMatrix;
    

}


