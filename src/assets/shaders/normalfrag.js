export const normalfrag = `
varying vec4 vColor;
void main() {
  // 丸い形に色をぬるための計算
  float f = length( gl_PointCoord - vec2( 0.5, 0.5 ) );

  if ( f > 0.15 ) {
      discard;
  }

  gl_FragColor = vColor;
}
`;