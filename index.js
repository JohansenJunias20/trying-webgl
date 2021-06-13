

var vertices = [
    -1.0, 0.0, 0.0,
    0.0, 1.0, 0.0,
    1.0, 0.0, 0.0
]
var vertShader =
    `
precision mediump float;
attribute vec3 aPosition;

void main(){
    gl_Position = vec4(aPosition,1.0);
}

`;
var fragShader =
    `
precision mediump float;

void main(){
    gl_FragColor = vec4(0.4,0.9,0.3,1.0);
}
`;
var InitDemo = function () {
    var canvas = document.getElementById("game-surface");
    /** @type {WebGLRenderingContext} */
    var gl = canvas.getContext('webgl');
    if (!gl) {
        alert("does not support webgl");
    }
    gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertShader);
    gl.shaderSource(fragmentShader, fragShader);

    gl.compileShader(vertexShader);

    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error("Error compiling vertex shader!", gl.getShaderInfoLog(vertexShader));
        return;
    }
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error("Error compiling fragment shader!", gl.getShaderInfoLog(fragmentShader));
        return;
    }
    var handleShader = gl.createProgram();
    gl.attachShader(handleShader, vertexShader);
    gl.attachShader(handleShader, fragmentShader);
    gl.linkProgram(handleShader);
    gl.detachShader(handleShader, vertexShader);
    gl.detachShader(handleShader, fragmentShader);
    gl.deleteShader(vertexShader)
    gl.deleteShader(fragmentShader)
    // var vao = gl.createVertexArray();
    // gl.bindVertexArray(vao);
    var vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var location = gl.getAttribLocation(handleShader, "aPosition");
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.useProgram(handleShader);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

}