export const computePos = `
// 現在の位置情報を決定する

void main(){
  const float delta = 1./60.;
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec3 pos = texture2D( texturePosition, uv ).xyz;
  vec4 tmpVel = texture2D( textureVelocity, uv );
  // velが移動する方向(もう一つ下のcomputeShaderVelocityを参照)
  vec3 vel = tmpVel.xyz;

  // 移動する方向に速度を掛け合わせた数値を現在地に加える。
  pos += vel * delta;
  gl_FragColor = vec4( pos, 1.0 );

}

`;
