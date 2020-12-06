#version 330 compatibility

uniform float	uTimeFrag;			// "Time", from Animate( )
in vec2  		vST;				// texture coords
in vec3			vColor;				// color based off of xyz coordinates
float uSize =	0.3;
float uS0 =		uSize / 2.;
float uT0 =		uSize / 2.;
const float PI = 3.14159265;

//lighting
uniform float	uKa, uKd, uKs;		// coefficients of each type of lighting
uniform vec3	uSpecularColor;		// light color
uniform float	uShininess;			// specular exponent

in  vec3		vN;					// normal vector
in  vec3		vL;					// vector from point to light
in  vec3		vE;					// vector from point to eye

void
main( )
{
	vec3 Normal = normalize(vN);
	vec3 Light  = normalize(vL);
	vec3 Eye    = normalize(vE);

	float distance;
	vec3 myColor = vColor;

	for (float i=0; i<=1; i+= 0.2) {
		for (float j=0; j<=1; j+=0.2) {
			distance = distance(vST.st, vec2(i,j));
			if (distance <= (0 + uTimeFrag/(7*2*PI)))
				discard;
		}
	}


	


	vec3 ambient = uKa * myColor;

	float d = max( dot(Normal,Light), 0. );       // only do diffuse if the light can see the point
	vec3 diffuse = uKd * d * myColor;

	float s = 0.;
	if( dot(Normal,Light) > 0. )	          // only do specular if the light can see the point
	{
		vec3 ref = normalize(  reflect( -Light, Normal )  );
		s = pow( max( dot(Eye,ref),0. ), uShininess );
	}
	vec3 specular = uKs * s * uSpecularColor;
	
	gl_FragColor = vec4( ambient + diffuse + specular,  1. );
	//gl_FragColor = vec4( myColor,  1. );

}
