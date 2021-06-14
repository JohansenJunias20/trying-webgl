

export function onRenderFrame(gl:WebGL2RenderingContext):void{
    // gl.bindVertexArray();
    gl.clearColor(0.2, 0.85, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    // requestAnimationFrame(onRenderFrame);



    requestAnimationFrame(()=> onRenderFrame(gl))
}