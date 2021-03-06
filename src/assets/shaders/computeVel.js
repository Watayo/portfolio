
export const computeVel = `
// 移動方向についていろいろ計算できるシェーダー。
// 今回はなにもしてない。
// ここでVelのx y zについて情報を上書きすると、それに応じて移動方向が変わる
uniform float time;

vec3 mod289(vec3 x){
  return x-floor(x*(1./289.))*289.;
}

vec4 mod289(vec4 x){
  return x-floor(x*(1./289.))*289.;
}

vec4 permute(vec4 x){
  return mod289(((x*34.)+1.)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159-.85373472095314*r;
}

float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);
  const vec4 D=vec4(0.,.5,1.,2.);

  // First corner
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);

  // Other corners
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;// 2.0*C.x = 1/3 = C.y
  vec3 x3=x0-D.yyy;// -1.0+3.0*C.x = -0.5 = -D.y

  // Permutations
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));

  // Gradients: 7x7 points over a square, mapped onto an octahedron.
  // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_=.142857142857;// 1.0/7.0
  vec3 ns=n_*D.wyz-D.xzx;

  vec4 j=p-49.*floor(p*ns.z*ns.z);//  mod(p,7*7)

  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.*x_);// mod(j,N)

  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.-abs(x)-abs(y);

  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0=floor(b0)*2.+1.;
  vec4 s1=floor(b1)*2.+1.;
  vec4 sh=-step(h,vec4(0.));

  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;

  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);

  //Normalise gradients
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;
  p1*=norm.y;
  p2*=norm.z;
  p3*=norm.w;

  // Mix final noise value
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
  m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),
  dot(p2,x2),dot(p3,x3)));
}

vec3 snoiseVec3(vec3 x){
  float s=snoise(vec3(x));
  float s1=snoise(vec3(x.y-19.1,x.z+33.4,x.x+47.2));
  float s2=snoise(vec3(x.z+74.2,x.x-124.5,x.y+99.4));
  vec3 c=vec3(s,s1,s2);
  return c;
}

vec3 snoiseDelta(vec3 pos){
  float del=.1;
  vec3 a=snoiseVec3(vec3(pos.x,pos.y,pos.z));
  vec3 b=snoiseVec3(vec3(pos.x+del,pos.y+del,pos.z+del));
  vec3 dt=vec3(a.x-b.x,a.y-b.y,a.z-b.z)/del;
  return dt;
}

vec3 curlNoise(vec3 pos,float id){
  const float e=.001;
  const float e2=2.*e;

  vec3 dx=vec3(e,0.,0.);
  vec3 dy=vec3(0.,e,0.);
  vec3 dz=vec3(0.,0.,e);

  vec3 p_x0=snoiseVec3(pos-dx);
  vec3 p_x1=snoiseVec3(pos+dx);
  vec3 p_y0=snoiseVec3(pos-dy);
  vec3 p_y1=snoiseVec3(pos+dy);
  vec3 p_z0=snoiseVec3(pos-dz);
  vec3 p_z1=snoiseVec3(pos+dz);

  float x=p_y1.z-p_y0.z-p_z1.y+p_z0.y;
  float y=p_z1.x-p_z0.x-p_x1.z+p_x0.z;
  float z=p_x1.y-p_x0.y-p_y1.x+p_y0.x;

  return normalize(vec3(x,y,z)/e2);
}

void main(){

  /*
  if(gl_FragCoord.x >= 1.0) return;

  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec3 pos = texture2D( texturePosition, uv ).xyz;
  vec3 vel = texture2D( textureVelocity, uv ).xyz;
  float idParticle = uv.y * resolution.x + uv.x;

  vel.xyz += 40.0 * vec3(
    snoise( vec4( 0.1 * pos.xyz, 7.225 + 0.5 * time ) ),
    snoise( vec4( 0.1 * pos.xyz, 3.553 + 0.5 * time ) ),
    snoise( vec4( 0.1 * pos.xyz, 1.259 + 0.5 * time ) )
  ) * 0.2;
  vel += -pos * length(pos) * 0.1;
  vel.xyz *= 0.9 + abs(sin(uv.y * 9.0)) * 0.03;

  gl_FragColor = vec4( vel.xyz, 1.0 );
  */


  const float delta = 1./60.;
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  float idParticle=uv.y*resolution.x+uv.x;
  vec3 pos=texture2D(texturePosition,uv).xyz;
  vec3 vel=texture2D(textureVelocity,uv).xyz;

  vel+=curlNoise(0.0025 * pos,idParticle)*20.;
  //  vel -= snoiseDelta( 0.00010 * pos) * 0.1;
  vel-=normalize(0.0025 * pos)*length(0.0025 * pos)*1.7;
  vel*=.63;

  gl_FragColor=vec4(vel.xyz,1.);
}
`;