export const normalvert = `
uniform sampler2D texturePosition;
uniform float cameraConstant;
varying vec4 vColor;
varying vec2 vUv;
void main(){
  vec3 pos=texture2D(texturePosition,uv).xyz;

  vec3 c=vec3(1.0);
  vColor=vec4(c,1.);
  // ポイントのサイズを決定
  vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );
  gl_PointSize = 1.2 * cameraConstant / ( - mvPosition.z );

  // uv情報の引き渡し
  vUv = uv;

  // 変換して格納
  gl_Position = projectionMatrix * mvPosition;
}
`;