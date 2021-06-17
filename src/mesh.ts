import { Shader } from "./shader";
import { Vector3, Matrix4, Vector2 } from 'math.gl';
import { toRad } from "./helper/math";
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
    lengthVertice: number;
    position: Vector3;
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
        this.texture = new Texture();
        this.position = new Vector3(0, 0, 0);
        if (this.status.texture && this.status.normal) {
            this.lengthVertice = 8;
        }
        else if (this.status.texture) {
            this.lengthVertice = 5;
            console.log("LENGTH VERTICE : ", 5)

        }
        else if (this.status.normal) {

            this.lengthVertice = 6;
        }
        else {
            this.lengthVertice = 3;
            console.log("LENGTH VERTICE : ", 3)

        }
        // this.shader.init();

    }
    async setupObject() {
        const gl = window.gl;
        // await this.shader.init("/shader/transform/shader.vert", "/shader/shader.frag");
        // await this.shader.init("/shader/texture/shader.vert", "/shader/texture/shader.frag");
        await this.shader.init("/shader/camera/camera.vert", "/shader/texture/texture.frag");

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
    async setTexture(urlTexture: string) {
        await this.texture.init(urlTexture);

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

        const gl = window.gl;
        var location = this.shader.getAttribLocation("aPosition");
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location, 3, gl.FLOAT, false, this.lengthVertice * Float32Array.BYTES_PER_ELEMENT, 0);

        if (this.status.texture) {

            var location = this.shader.getAttribLocation("aTexCoord");
            gl.enableVertexAttribArray(location);
            gl.vertexAttribPointer(location, 2, gl.FLOAT, false, this.lengthVertice * Float32Array.BYTES_PER_ELEMENT,
                3 * Float32Array.BYTES_PER_ELEMENT);
        }

        if (this.status.normal) {
            // var location = this.shader.getAttribLocation("aTexCoord");
            // gl.enableVertexAttribArray(location);
            // gl.vertexAttribPointer(location, 2, gl.FLOAT, false, this.lengthVertice * Float32Array.BYTES_PER_ELEMENT,
            //     3 * Float32Array.BYTES_PER_ELEMENT);
        }
    }

    update(deltaTime: number) {
        this.rotation += 0.001 * deltaTime;
        // this.position.z += 0.0001 * deltaTime;
        // this.position.z -= 0.01;
        this.transform.identity();
        // this.transform.scale(0.2);
        // this.transform.rotateZ(this.rotation);
        // this.transform.rotateY(this.rotation);
        this.transform.translate(this.position);
    }
    async loadObjFrom(url: string) {
        var res = await fetch(url);
        var parsed = await res.text();
        var lines = parsed.split('\n');
        var positions: Array<Vector3> = [];
        var textures: Array<Vector2> = [];
        var normals: Array<Vector3> = [];
        var positionIndices: Array<number> = [];
        var textureIndices: Array<number> = [];
        var normalIndices: Array<number> = [];
        lines.forEach(line => {
            var words = line.split(' ');
            switch (words[0]) {
                case "v":
                    var temp: Vector3;
                    temp = new Vector3();
                    temp.x = +words[1];
                    temp.y = +words[2];
                    temp.z = +words[3];
                    positions.push(temp);
                    break;
                case "vt":
                    var temp1: Vector2;
                    temp1 = new Vector2();
                    temp1.x = +words[1];
                    temp1.y = +words[2];
                    textures.push(temp1); // convert string to number
                    break;
                case "vn":
                    temp = new Vector3();
                    temp.x = +words[1];
                    temp.y = +words[2];
                    temp.z = +words[3];
                    normals.push(temp); // convert string to number
                    break;
                case "f":
                    words.splice(0, 1);
                    words.forEach(face => {
                        positionIndices.push(+face.split("/")[0] - 1);
                        textureIndices.push(+face.split("/")[1] - 1);
                        normalIndices.push(+face.split("/")[2] - 1);
                    })


                    break;
                default:
                    break;
            }
        });

        this.vertices = [];
        console.log(textureIndices.length)
        console.log(positionIndices.length)
        for (let i = 0; i < positionIndices.length; i++) {
            this.vertices.push(positions[positionIndices[i]].x);
            this.vertices.push(positions[positionIndices[i]].y);
            this.vertices.push(positions[positionIndices[i]].z);

            this.vertices.push(textures[textureIndices[i]].x);
            this.vertices.push(textures[textureIndices[i]].y);
            // this.vertices.push(normals[normalIndices[i]].x);
            // this.vertices.push(normals[normalIndices[i]].y);
            // this.vertices.push(normals[normalIndices[i]].z);
        }
        // this.vertices = this.vertices.slice(0,90);
        var result: Array<number>;
        result = [];
        console.log(this.vertices.length)
        for (let i = 0; i < this.vertices.length; i++) {
            if (i % 5 == 0) {
                console.log(result)
                result = []
            }
            result.push(this.vertices[i]);

        }
    }
    render() {
        const gl = window.gl;
        gl.enable(gl.DEPTH_TEST);
        this.shader.use();
        this.shader.setMatrix4("transform", this.transform);
        this.shader.setMatrix4("view", window.camera.getViewMatrix());
        this.shader.setMatrix4("projection", window.camera.getProjectionMatrix());
        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / this.lengthVertice);

    }
}