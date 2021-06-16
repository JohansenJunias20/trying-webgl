precision mediump float;
attribute vec3 aPosition;
attribute vec2 aTexCoord;
uniform mat4 projection;
uniform mat4 view;
uniform mat4 transform;
varying vec2 texCoords;
void main(){
    texCoords=aTexCoord;
    gl_Position=vec4(aPosition,1.)*transform*view*projection;
}
