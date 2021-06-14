precision mediump float;

uniform sampler2D indexTexture;
varying vec2 texCoords;
void main(){
    vec3 tex=vec3(texture2D(indexTexture,texCoords));
    gl_FragColor=vec4(tex,1.);
}