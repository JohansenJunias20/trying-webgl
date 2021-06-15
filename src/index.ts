
// import Shader from './shader';
import { Shader } from './shader';
// import { onRenderFrame } from './render';
import { Mesh } from './mesh';

//global variable on window.____
declare global {

    interface Window {
        gl: WebGL2RenderingContext;
    }
}
var mesh: Mesh;
var InitDemo = async function () {

    var canvas = <HTMLCanvasElement>document.getElementById("game-surface");
    /** @type {WebGL2RenderingContext} */
    window.gl = <WebGL2RenderingContext>canvas.getContext('webgl2');
    const gl = window.gl;
    if (!gl) {
        alert("does not support webgl");
    }
    mesh = new Mesh(true,false);
    // mesh.init();
    // mesh.createBoxVertices();
    await mesh.loadObjFrom("/public/resources/obj/fixbox.obj");
    await mesh.setupObject();
    await mesh.setTexture("resources/texture/Grass_Block_TEX.png");
    // await mesh.setTexture("resources/texture/box.png");
    // var shader: Shader = new Shader();
    // await shader.init("http://localhost:5500/shader/transform/shader.vert", "http://localhost:5500/shader/shader.frag");
    // // gl.vertext
    // ;
    // var vao = gl.createVertexArray();
    // gl.bindVertexArray(vao);
    // var vbo = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // var location = gl.getAttribLocation(shader.Handle, "aPosition");
    // gl.enableVertexAttribArray(location);
    // gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 3 * Float32Array.BYTES_PER_ELEMENT, 0);

    // shader.use(gl);
    onRenderFrame(then);

}
var then = 0;
function onRenderFrame(now: number) {
    const deltaTime = now - then;
    then = now;
    onUpdateFrame(deltaTime);
    // if (now)
    // console.log(now)
    const gl = window.gl;
    gl.clearColor(0.2, 0.3, 0.3, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // mesh = new Mesh();
    mesh.render();
    requestAnimationFrame(onRenderFrame);
}
function onUpdateFrame(deltaTime: number) {
    mesh.update(deltaTime);
    // console.log(deltaTime)
}
InitDemo();