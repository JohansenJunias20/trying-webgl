precision mediump float;
attribute vec3 aPosition;
uniform mat4 transform;
void main(){
    gl_Position=vec4(aPosition,1.)*transform;
}
