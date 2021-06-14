
canvas = document.getElementById("game-surface");
/**  @type {WebGL2RenderingContext} */
var gl = canvas.getContext('webgl2');
console.log(gl)
var vao = gl.createVertexArray();
console.log("hello world")
console.log(`vao : ${vao}`)