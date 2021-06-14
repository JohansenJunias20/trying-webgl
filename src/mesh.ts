import { Shader } from "./shader";
import { Vector3, Matrix4 } from 'math.gl';
import toRad from "./helper/math";
import Texture from "./texture";

export class Mesh {
    vertices: Array<number>;
    shader: Shader;
    vao: WebGLVertexArrayObject | null;
    vbo: WebGLBuffer | null;
    transform: Matrix4;
    texture: Texture;
    constructor() {
        this.vertices = [];
        this.shader = new Shader();
        this.vao = 0;
        this.vbo = 0;
        this.transform = new Matrix4(); // sama seperti identity
        // this.transform.identity();
        console.log(this.transform);
        this.onceTime = false;
        this.texture = new Texture();
        // this.shader.init();

    }
    async setupObject() {
        const gl = window.gl;
        // await this.shader.init("/shader/transform/shader.vert", "/shader/shader.frag");
        await this.shader.init("/shader/texture/shader.vert", "/shader/texture/shader.frag");
        await this.texture.init("/public/resources/texture/box.png");

        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);

        this.vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

        // var location = gl.getAttribLocation(this.shader.Handle, "aPosition");
        var location = this.shader.getAttribLocation("aPosition");
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);


        var location = this.shader.getAttribLocation("aTexCoord");
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT,
            3 * Float32Array.BYTES_PER_ELEMENT);
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
           -0.5, -0.5, -0.5, 0.0, 0.0, // bottom-left
            0.5,  0.5, -0.5,  1.0, 1.0, // top-right
            0.5, -0.5, -0.5,   1.0, 0.0, // bottom-right       
            0.5,  0.5, -0.5,  1.0, 1.0, // top-right
           -0.5, -0.5, -0.5,  0.0, 0.0, // bottom-left
           -0.5,  0.5, -0.5,  0.0, 1.0, // top-left
           // front face
           -0.5, -0.5,  0.5,  0.0, 0.0, // bottom-left
            0.5, -0.5,  0.5,  1.0, 0.0, // bottom-right
            0.5,  0.5,  0.5,  1.0, 1.0, // top-right
            0.5,  0.5,  0.5,  1.0, 1.0, // top-right
           -0.5,  0.5,  0.5,  0.0, 1.0, // top-left
           -0.5, -0.5,  0.5,  0.0, 0.0, // bottom-left
           // left face
           -0.5,  0.5,  0.5,  1.0, 0.0, // top-right
           -0.5,  0.5, -0.5,  1.0, 1.0, // top-left
           -0.5, -0.5, -0.5,  0.0, 1.0, // bottom-left
           -0.5, -0.5, -0.5,  0.0, 1.0, // bottom-left
           -0.5, -0.5,  0.5,  0.0, 0.0, // bottom-right
           -0.5,  0.5,  0.5,  1.0, 0.0, // top-right
           // right face
            0.5,  0.5,  0.5,  1.0, 0.0, // top-left
            0.5, -0.5, -0.5,  0.0, 1.0, // bottom-right
            0.5,  0.5, -0.5,   1.0, 1.0, // top-right       
            0.5, -0.5, -0.5,  0.0, 1.0, // bottom-right
            0.5,  0.5,  0.5,  1.0, 0.0, // top-left
            0.5, -0.5,  0.5,  0.0, 0.0, // bottom-left    
           // bottom face
           -0.5, -0.5, -0.5,  0.0, 1.0, // top-right
            0.5, -0.5, -0.5,  1.0, 1.0, // top-left
            0.5, -0.5,  0.5,  1.0, 0.0, // bottom-left
            0.5, -0.5,  0.5,  1.0, 0.0, // bottom-left
           -0.5, -0.5,  0.5,  0.0, 0.0, // bottom-right
           -0.5, -0.5, -0.5,  0.0, 1.0, // top-right
           // top face
           -0.5,  0.5, -0.5,  0.0, 1.0, // top-left
            0.5,  0.5 , 0.5,  1.0, 0.0, // bottom-right
            0.5,  0.5, -0.5,  1.0, 1.0, // top-right     
            0.5,  0.5,  0.5,  1.0, 0.0, // bottom-right
           -0.5,  0.5, -0.5,  0.0, 1.0, // top-left
           -0.5,  0.5,  0.5,   0.0, 0.0  // bottom-left          
        ]
    }
    onceTime: boolean;
    update(deltaTime: number) {
        this.rotation += 0.001 * deltaTime;
        this.transform.identity();
        this.transform.rotateZ(this.rotation);
        this.transform.rotateY(this.rotation);
    }
    render() {
        const gl = window.gl;
        gl.enable(gl.DEPTH_TEST);
        this.shader.use();
        if (!this.onceTime) {
            // console.log(this.transform[0]);
            this.onceTime = true;
        }
        this.texture.use(0);
        this.shader.setInt("indexTexture", 0);
        this.shader.setMatrix4("transform", this.transform);
        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 5);

    }
}