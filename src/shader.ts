import { Vector3, Matrix4 } from "math.gl"
import $ from 'jquery';

interface Uniform {
    key: WebGLUniformLocation,
    name: string
}
export class Shader {
    uniforms: Array<Uniform>;
    gl = window.gl;
    constructor() {
        this.Handle = WebGLProgram;
        this.uniforms = new Array<Uniform>();
        console.log("costruct shader")
        // this.uniform = new unifo
    }

    async init(vertPath: string, fragPath: string) {
        const gl = this.gl;
        var response = await fetch(vertPath);
        var vertexCode: string = await response.text();
        response = await fetch(fragPath);
        var fragmentCode: string = await response.text();
        // console.log(vertexCode);
        // console.log(fragmentCode);
        var vertexShader = <WebGLShader>gl.createShader(gl.VERTEX_SHADER);
        var fragmentShader = <WebGLShader>gl.createShader(gl.FRAGMENT_SHADER);

        gl.shaderSource(vertexShader, vertexCode);
        gl.shaderSource(fragmentShader, fragmentCode);

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

        this.Handle = <WebGLProgram>gl.createProgram();
        console.log("init handle")
        console.log(this.Handle)
        console.log(typeof(this.Handle))
        gl.attachShader(this.Handle, vertexShader);
        gl.attachShader(this.Handle, fragmentShader);
        gl.linkProgram(this.Handle);
        var code: number;
        code = gl.getProgramParameter(this.Handle, gl.LINK_STATUS);
        if (!code)
            throw new Error(`Error linking program ${this.Handle}`);

        gl.detachShader(this.Handle, vertexShader);
        gl.detachShader(this.Handle, fragmentShader);
        gl.deleteShader(vertexShader)
        gl.deleteShader(fragmentShader)

        //get all uniforms of a shader.
        var uniformCount: number = gl.getProgramParameter(this.Handle, gl.ACTIVE_UNIFORMS);
        console.log(`uniform count: ${uniformCount}`)
        for (let i = 0; i < uniformCount; i++) {
            var info: WebGLActiveInfo | null = gl.getActiveUniform(this.Handle, i);
            // name
            if (info?.name)
                var key = gl.getUniformLocation(this.Handle, "transform");
            else
                continue;

            if (key)
                this.uniforms.push({
                    key: key,
                    name: info.name
                })

        }

    }
    use() {
        window.gl.useProgram(this.Handle);
    }
    setMatrix4(uniformName: string, data: Matrix4) {
        const gl = this.gl;
        gl.useProgram(this.Handle);
        // console.log(data.toFloat32Array());
        var test = this.uniforms.find((uniform) => uniform.name == uniformName)
        if (test)
            gl.uniformMatrix4fv(test.key, true, data.toFloat32Array());

    }
    getAttribLocation(name: string): number {
        console.log("getAttriblocation")
        console.log("handle:")
        console.log(this.Handle)
        console.log(typeof(this.Handle));
        // window.gl.getAttribLocation()
        return window.gl.getAttribLocation(this.Handle, name);
    }
    // setInt
    Handle: WebGLProgram;
}