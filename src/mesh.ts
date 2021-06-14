import { Shader } from "./shader";
import { Vector3, Matrix4 } from 'math.gl';
import toRad from "./helper/math";

export class Mesh {
    vertices: Array<number>;
    shader: Shader;
    vao: WebGLVertexArrayObject | null;
    vbo: WebGLBuffer | null;
    transform: Matrix4;
    constructor() {
        this.vertices = [];
        this.shader = new Shader();
        this.vao = 0;
        this.vbo = 0;
        this.transform = new Matrix4(); // sama seperti identity
        // this.transform.identity();
        console.log(this.transform);
        this.onceTime = false;
        // this.shader.init();

    }
    async setupObject() {
        const gl = window.gl;
        await this.shader.init("/shader/transform/shader.vert", "/shader/shader.frag");

        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);

        this.vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

        // var location = gl.getAttribLocation(this.shader.Handle, "aPosition");
        var location = this.shader.getAttribLocation("aPosition");
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
        // this.transform = this.transform.scale([0.3, 0.3, 0.3]);
        // console.log()
        var value = {
            radians: Math.PI
        }
        // Math.d
        // this.shader.setMatrix4("transform", this.transform.rotateZ(toRad(45)));

        // location = this.shader.getAttribLocation("transform");
        // this.shader
        // gl.enableVertexAttribArray(location);
        // gl.vertexAttribPointer(location,)
        // var location = gl.getattribl
    }
    rotation: number = 0;
    createBoxVertices() {
        this.vertices = [
            // back face
            -0.4, -0.4, -0.4,
            0.4, 0.4, -0.4,
            0.4, -0.4, -0.4,
            0.4, 0.4, -0.4,
            -0.4, -0.4, -0.4,
            -0.4, 0.4, -0.4,
            // front face
            -0.4, -0.4, 0.4,
            0.4, -0.4, 0.4,
            0.4, 0.4, 0.4,
            0.4, 0.4, 0.4,
            -0.4, 0.4, 0.4,
            -0.4, -0.4, 0.4,
            // left face
            -0.4, 0.4, 0.4,
            -0.4, 0.4, -0.4,
            -0.4, -0.4, -0.4,
            -0.4, -0.4, -0.4,
            -0.4, -0.4, 0.4,
            -0.4, 0.4, 0.4,
            // right face
            0.4, 0.4, 0.4,
            0.4, -0.4, -0.4,
            0.4, 0.4, -0.4,
            0.4, -0.4, -0.4,
            0.4, 0.4, 0.4,
            0.4, -0.4, 0.4,
            // bottom face
            -0.4, -0.4, -0.4,
            0.4, -0.4, -0.4,
            0.4, -0.4, 0.4,
            0.4, -0.4, 0.4,
            -0.4, -0.4, 0.4,
            -0.4, -0.4, -0.4,
            // top face
            -0.4, 0.4, -0.4,
            0.4, 0.4, 0.4,
            0.4, 0.4, -0.4,
            0.4, 0.4, 0.4,
            -0.4, 0.4, -0.4,
            -0.4, 0.4, 0.4,]
    }
    onceTime: boolean;
    update(deltaTime:number){
        this.rotation += 0.001 * deltaTime;
        this.transform.identity();
        // console.log(deltaTime)
        this.transform.rotateZ(this.rotation);
        this.transform.rotateY(this.rotation);
    }
    render() {
        const gl = window.gl;
        this.shader.use();
        if (!this.onceTime) {
            // console.log(this.transform[0]);
            this.onceTime = true;
        }
        this.shader.setMatrix4("transform", this.transform);
        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 3);

    }
}