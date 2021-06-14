// import gl from "./gl";

import gl from "./gl";

function loadImage(imageUrl: string): Promise<HTMLImageElement | string> {
    return new Promise((res, rej) => {
        try {

            var image = new Image();
            image.src = imageUrl;
            image.onload = function () {
                res(image);
            }
        }
        catch (exception) {
            rej(exception);
        }
    })

}

export default class Texture {
    Handle: WebGLTexture | null;
    constructor() {
        const gl = window.gl;
        this.Handle = gl.createTexture();
        // gl.texImage2D();
    }

    async init(urlImage: string) {
        const gl = window.gl;
        var image = await loadImage(urlImage);
        if (typeof (image) == 'string') {
            throw new Error(image);

        }
        gl.bindTexture(gl.TEXTURE_2D, this.Handle);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, image.width, image.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.generateMipmap(gl.TEXTURE_2D);
    }
    use(textureUnit: number) {
        const gl = window.gl;
        gl.activeTexture(textureUnit);
        gl.bindTexture(gl.TEXTURE_2D, this.Handle);
        // gl.activeTexture(gl.TEXTURE0);

    }

}