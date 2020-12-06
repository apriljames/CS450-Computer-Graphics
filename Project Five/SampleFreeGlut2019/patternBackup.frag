#version 330 compatibility

uniform float	uTime;		// "Time", from Animate( )
in vec2  	vST;		// texture coords
float uSize = 0.3;
float uS0 = uSize / 2.;
float uT0 = uSize / 2.;

void
main( )
{
	//vec3 myColor = vec3( 1., 0., 0. );
	//if( uS0 - uSize/2. <= vST.s && vST.s <= uS0 + uSize/2. && uT0 - uSize/2. <= vST.t && vST.t <= uT0 + uSize/2. )
	//{
	//	myColor = vec3( 1., 0.5, 0. );
	//}
	//gl_FragColor = vec4( myColor,  1. );

  vec2 st = vST;
  vec3 color = vec3(0.0);
  float d = 0.0;

  // Remap the space to -1. to 1.
  st = st *2.-1.;

  // Make the distance field
   d = length( abs(st)-.6 );
  // d = length( min(abs(st)-.3,0.) );
  // d = length( max(abs(st)-.3,0.) );

  // Visualize the distance field
  gl_FragColor = vec4(vec3(fract(d*10.0)),1.0);

  // Drawing with the distance field
  // gl_FragColor = vec4(vec3( step(.3,d) ),1.0);
  // gl_FragColor = vec4(vec3( step(.3,d) * step(d,.4)),1.0);
  // gl_FragColor = vec4(vec3( smoothstep(.3,.4,d)* smoothstep(.6,.5,d)) ,1.0);
}
