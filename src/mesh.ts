import { Shader } from "./shader";
import { Vector3, Matrix4 } from 'math.gl';
import toRad from "./helper/math";
import Texture from "./texture";

interface Status {
    texture: boolean,
    normal: boolean
}

export class Mesh {
    vertices: Array<number>;
    shader: Shader;
    vao: WebGLVertexArrayObject | null;
    vbo: WebGLBuffer | null;
    transform: Matrix4;
    texture: Texture;
    status: Status;
    constructor(texture = false, normal = false) {
        this.status = {
            texture,
            normal
        }

        this.vertices = [];
        this.shader = new Shader();
        this.vao = 0;
        this.vbo = 0;
        this.transform = new Matrix4(); // sama seperti identity
        // this.transform.identity();
        console.log(this.transform);
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

        this.layoutVertices();
        // var location = gl.getAttribLocation(this.shader.Handle, "aPosition");

        // this.transform = this.transform.scale([0.3, 0.3, 0.3]);
        // console.log()

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
            0.5, 0.5, -0.5, 1.0, 1.0, // top-right
            0.5, -0.5, -0.5, 1.0, 0.0, // bottom-right       
            0.5, 0.5, -0.5, 1.0, 1.0, // top-right
            -0.5, -0.5, -0.5, 0.0, 0.0, // bottom-left
            -0.5, 0.5, -0.5, 0.0, 1.0, // top-left
            // front face
            -0.5, -0.5, 0.5, 0.0, 0.0, // bottom-left
            0.5, -0.5, 0.5, 1.0, 0.0, // bottom-right
            0.5, 0.5, 0.5, 1.0, 1.0, // top-right
            0.5, 0.5, 0.5, 1.0, 1.0, // top-right
            -0.5, 0.5, 0.5, 0.0, 1.0, // top-left
            -0.5, -0.5, 0.5, 0.0, 0.0, // bottom-left
            // left face
            -0.5, 0.5, 0.5, 1.0, 0.0, // top-right
            -0.5, 0.5, -0.5, 1.0, 1.0, // top-left
            -0.5, -0.5, -0.5, 0.0, 1.0, // bottom-left
            -0.5, -0.5, -0.5, 0.0, 1.0, // bottom-left
            -0.5, -0.5, 0.5, 0.0, 0.0, // bottom-right
            -0.5, 0.5, 0.5, 1.0, 0.0, // top-right
            // right face
            0.5, 0.5, 0.5, 1.0, 0.0, // top-left
            0.5, -0.5, -0.5, 0.0, 1.0, // bottom-right
            0.5, 0.5, -0.5, 1.0, 1.0, // top-right       
            0.5, -0.5, -0.5, 0.0, 1.0, // bottom-right
            0.5, 0.5, 0.5, 1.0, 0.0, // top-left
            0.5, -0.5, 0.5, 0.0, 0.0, // bottom-left    
            // bottom face
            -0.5, -0.5, -0.5, 0.0, 1.0, // top-right
            0.5, -0.5, -0.5, 1.0, 1.0, // top-left
            0.5, -0.5, 0.5, 1.0, 0.0, // bottom-left
            0.5, -0.5, 0.5, 1.0, 0.0, // bottom-left
            -0.5, -0.5, 0.5, 0.0, 0.0, // bottom-right
            -0.5, -0.5, -0.5, 0.0, 1.0, // top-right
            // top face
            -0.5, 0.5, -0.5, 0.0, 1.0, // top-left
            0.5, 0.5, 0.5, 1.0, 0.0, // bottom-right
            0.5, 0.5, -0.5, 1.0, 1.0, // top-right     
            0.5, 0.5, 0.5, 1.0, 0.0, // bottom-right
            -0.5, 0.5, -0.5, 0.0, 1.0, // top-left
            -0.5, 0.5, 0.5, 0.0, 0.0  // bottom-left          
        ]
    }
    layoutVertices() {
        var lengthVertice: number;
        if (this.status.texture && this.status.normal) {
            lengthVertice = 8;
        }
        else if (this.status.texture) {
            lengthVertice = 5;

        }
        else if (this.status.normal) {

            lengthVertice = 6;
        }
        else {
            lengthVertice = 3;

        }
        const gl = window.gl;
        var location = this.shader.getAttribLocation("aPosition");
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location, 3, gl.FLOAT, false, lengthVertice * Float32Array.BYTES_PER_ELEMENT, 0);

        if (this.status.texture) {

            var location = this.shader.getAttribLocation("aTexCoord");
            gl.enableVertexAttribArray(location);
            gl.vertexAttribPointer(location, 2, gl.FLOAT, false, lengthVertice * Float32Array.BYTES_PER_ELEMENT,
                3 * Float32Array.BYTES_PER_ELEMENT);
        }

        if (this.status.normal) {
            var location = this.shader.getAttribLocation("aTexCoord");
            gl.enableVertexAttribArray(location);
            gl.vertexAttribPointer(location, 2, gl.FLOAT, false, lengthVertice * Float32Array.BYTES_PER_ELEMENT,
                3 * Float32Array.BYTES_PER_ELEMENT);
        }
    }
    update(deltaTime: number) {
        this.rotation += 0.001 * deltaTime;
        this.transform.identity();
        this.transform.rotateZ(this.rotation);
        this.transform.rotateY(this.rotation);
    }
    async loadObjFrom(url: string) {
        var res = await fetch(url);
        var parsed = await res.text();
        var lines = parsed.split('\n');
        var positions: Array<number> = [];
        var textures: Array<number> = [];
        var normals: Array<number> = [];
        var positionIndices: Array<number> = [];
        var textureIndices: Array<number> = [];
        var normalIndices: Array<number> = [];
        lines.forEach(line => {
            var words = line.split(' ');
            switch (words[0]) {
                case "v":
                    positions.push(+words[1]); // convert string to number
                    positions.push(+words[2]);
                    positions.push(+words[3]);
                    break;
                case "vt":
                    textures.push(+words[1]); // convert string to number
                    textures.push(+words[2]);
                    break;
                case "vn":
                    normals.push(+words[1]); // convert string to number
                    normals.push(+words[2]);
                    normals.push(+words[3]);
                    break;
                case "f":
                    words.slice(0, 1);
                    words.forEach(face => {
                        positionIndices.push(+face.split("/")[0]);
                        textureIndices.push(+face.split("/")[1]);
                        normalIndices.push(+face.split("/")[2]);
                    })


                    break;
                default:
                    break;
            }
        });

        this.vertices = [];
        for (let i = 0; i < positionIndices.length; i++) {
            this.vertices.push(positions[positionIndices[i]]);
            this.vertices.push(textures[textureIndices[i]]);
            this.vertices.push(normals[normalIndices[i]]);
        }

        // if()
    }
    render() {
        const gl = window.gl;
        gl.enable(gl.DEPTH_TEST);
        this.shader.use();
        this.texture.use(0);
        this.shader.setInt("indexTexture", 0);
        this.shader.setMatrix4("transform", this.transform);
        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 5);

    }
}