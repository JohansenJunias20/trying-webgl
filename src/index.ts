
// import Shader from './shader';
import { Shader } from './shader';
// import { onRenderFrame } from './render';
import { Mesh } from './mesh';
import Camera from './camera';
import { Matrix4, Vector3 } from 'math.gl';

//global variable on window.____
declare global {

    interface Window {
        gl: WebGL2RenderingContext;
        camera: Camera;
    }
}
var mesh: Mesh;
var KeyboardState: any = {};

// var camera: Camera;
var InitDemo = async function () {

    var canvas = <HTMLCanvasElement>document.getElementById("game-surface");
    // console.log({width:canvas.width,height:canvas.height})

    document.onkeydown = function (e) {
        e = e || window.event;
        // pressed.
        KeyboardState[e.keyCode] = true;
        // console.log(e);
    }

    document.onkeyup = function (e) {
        e = e || window.event;
        delete KeyboardState[e.keyCode];
    }


    window.camera = new Camera(new Vector3(0, 0, 0), canvas.width / canvas.height);
    // camera = new Camera(new Vector3(0, 0, -1), canvas.width / canvas.height);

    window.gl = <WebGL2RenderingContext>canvas.getContext('webgl2');
    const gl = window.gl;
    if (!gl) {
        alert("does not support webgl");
    }
    mesh = new Mesh(true, false);
    // mesh.init();
    // mesh.createBoxVertices();
    await mesh.loadObjFrom("/resources/obj/fixbox.obj");
    await mesh.setupObject();
    await mesh.setTexture("/resources/texture/Grass_Block_TEX.png");
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
    // console.log(window.camera.position)
    if (KeyboardState[87]) {
        console.log("w is pressed")
        window.camera.position.z += 0.1;
        // console.log(window.camera.getProjectionMatrix())
        console.log({ cameraPositon: window.camera.position, lookingAt: new Vector3(window.camera.position).add(window.camera.front), up: window.camera.up })
        // console.log(window.camera.position)
    }
    if (KeyboardState[83]) {
        console.log("s is pressed")
        window.camera.position.z -= 0.1;
        // console.log(window.camera.getViewMatrix())
        // console.log(window.camera.position)

    }
    // console.log(deltaTime)
}
InitDemo();