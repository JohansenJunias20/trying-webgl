
// import Shader from './shader';
import { Shader } from './shader';
// import { onRenderFrame } from './render';
import { Mesh } from './mesh';
import Camera from './camera';
import { Matrix4, Vector2, Vector3 } from 'math.gl';

//global variable on window.____
declare global {

    interface Window {
        gl: WebGL2RenderingContext;
        camera: Camera;
    }
}
var mesh: Mesh;
var KeyboardState: any = {};
var mouseMove = false;
var mouseMovement = new Vector2(0, 0);
function lockChangeAlert() {
    document.onmousemove = (e) => {
        // mospos.x = e.clientX;
        // mospos.y = e.clientY;
        // console.log(e)
        // console.log({e})
        mouseMovement.x = e.movementX* 0.5;
        mouseMovement.y = e.movementY* 0.5;
        mouseMove = true;
        // console.log("mose move inside locking state")
    }
}
document.addEventListener("pointerlockchange", lockChangeAlert, false);

// var camera: Camera;
var InitDemo = async function () {
    alert("please use W/A/S/D to move camera and left click to the canvas for camera rotation")
    var canvas = <HTMLCanvasElement>document.getElementById("game-surface");
    // console.log({width:canvas.width,height:canvas.height})
    // canvas.style.cursor = "none";
    canvas.onclick = function () {
        canvas.requestPointerLock();
    }
    // canvas.requestPointerLock();
    document.onkeydown = function (e) {
        e = e || window.event;
        // pressed.
        KeyboardState[e.keyCode] = true;
        console.log(e.keyCode);
    }
    document.onkeyup = function (e) {
        e = e || window.event;
        delete KeyboardState[e.keyCode];
    }


    window.camera = new Camera(new Vector3(0, 0, 0), canvas.width / canvas.height);

    window.gl = <WebGL2RenderingContext>canvas.getContext('webgl2');
    const gl = window.gl;
    if (!gl) {
        alert("does not support webgl");
    }
    mesh = new Mesh(true, false);
    await mesh.loadObjFrom("/resources/obj/fixbox.obj");
    await mesh.setupObject();
    await mesh.setTexture("/resources/texture/Grass_Block_TEX.png");
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
    const cameraSpeed: number = 0.01;
    if (KeyboardState[87]) {
        // console.log(typeof(cameraSpeed * deltaTime))
        // console.log(new Vector3(window.camera.front))
        // console.log(new Vector3(window.camera.front).multiply(cameraSpeed * deltaTime))
        // var test = new Vector3(window.camera.front).multiplyVectors(cameraSpeed * deltaTime);
        window.camera.position.add(new Vector3(window.camera.front).multiplyByScalar(cameraSpeed * deltaTime));
        // console.log({ cameraPositon: window.camera.position, lookingAt: new Vector3(window.camera.position).add(window.camera.front), up: window.camera.up })
    }
    if (KeyboardState[83]) {
        // window.camera.position.z -= cameraSpeed * deltaTime;
        window.camera.position.sub(new Vector3(window.camera.front).multiplyByScalar(cameraSpeed * deltaTime));

    }
    if (KeyboardState[65]) {
        window.camera.position.sub(new Vector3(window.camera.right).multiplyScalar(cameraSpeed * deltaTime));

    }
    if (KeyboardState[68]) {
        window.camera.position.add(new Vector3(window.camera.right).multiplyScalar(cameraSpeed * deltaTime));
        // window.camera.position.x -= cameraSpeed * deltaTime;

    }

    const sensitivity = 0.6;
    if (firstTime) {
        lastMousePosition = new Vector2(mospos.x, mospos.y);
    }
    else {
        if (mouseMove) {

            var deltaX: number;
            var deltaY: number;
            deltaX = mospos.x - lastMousePosition.x;
            deltaY = mospos.y - lastMousePosition.y;
            lastMousePosition = new Vector2(mospos.x, mospos.y)
            window.camera.Yaw += mouseMovement.x * sensitivity;
            // window.camera.Yaw += deltaX * sensitivity;
            window.camera.Pitch += mouseMovement.y * sensitivity;
            // window.camera.Pitch += deltaY * sensitivity;
            mouseMove = false;
        }
    }
}
var mospos = new Vector2(0, 0);
var firstTime = false;
var lastMousePosition = new Vector2(0, 0);

InitDemo();