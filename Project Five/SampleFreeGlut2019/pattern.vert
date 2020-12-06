#version 330 compatibility

uniform float	uTimeVert;		// "Time", from Animate( )
out vec2  	vST;				// texture coords
out vec3	vColor;				//color based on vertex location

out  vec3  vN;					// normal vector
out  vec3  vL;					// vector from point to light
out  vec3  vE;					// vector from point to eye

vec3 LightPosition =	vec3(  0., 5., 5. );

const float PI = 		3.14159265;
const float AMP = 		0.5;		// amplitude
const float W = 		.8;		// frequency
const float speed =		.8;

void
main( )
{ 
	//vertex manipulation
	vST = gl_MultiTexCoord0.st;
	vec3 vert = gl_Vertex.xyz;
	vert.x = gl_Vertex.x + sin(gl_Vertex.z*W + uTimeVert) * AMP;
	vert.y = gl_Vertex.y + cos(gl_Vertex.x*W + uTimeVert) * AMP;
	vert.z = gl_Vertex.z + sin(gl_Vertex.y*2*W + uTimeVert) * AMP;

	//vec4 position = gl_Vertex;
	vColor = vec3(vST.s, vST.t, vST.s/vST.t);			//setting rgb from xyz

	//lighting
	
	vec4 ECposition = gl_ModelViewMatrix * vec4( vert, 1. );
	vN = normalize( gl_NormalMatrix * gl_Normal );			// normal vector
	vL = LightPosition - ECposition.xyz;					// vector from the point to the light position
	vE = vec3( 0., 0., 0. ) - ECposition.xyz;				// vector from the point to the eye position 
	
	gl_Position = gl_ModelViewProjectionMatrix * vec4( vert, 1. );
}
