struct DirectionalLight {
    vec3 direction;
    vec3 color;
    float distance;
};

uniform DirectionalLight directionalLights[NUM_DIR_LIGHTS];
uniform vec3 ambientLightColor;
uniform vec3 uColor;
uniform float uGlossiness;

varying vec3 vNormal;
varying vec3 vViewDir;

void main() {
    // directional light
    float NdotL = dot(vNormal, directionalLights[0].direction);
    float lightIntensity = smoothstep(0.0, 0.01, NdotL);
    vec3 light = directionalLights[0].color * lightIntensity;

    // specular light
    vec3 halfVector = normalize(directionalLights[0].direction + vViewDir);
    float NdotH = dot(vNormal, halfVector);

    float specularIntensity = pow(NdotH * lightIntensity, uGlossiness * uGlossiness);
    float specularIntensitySmooth = smoothstep(0.05, 0.1, specularIntensity);

    vec3 specular = specularIntensitySmooth * directionalLights[0].color;

    // rim lighting
    float rimDot = 1.0 - dot(vViewDir, vNormal);
    float rimAmount = 0.6;

    float rimThreshold = 0.2;
    float rimIntensity = rimDot * pow(NdotL, rimThreshold);
    rimIntensity = smoothstep(rimAmount - 0.01, rimAmount + 0.01, rimIntensity);

    vec3 rim = rimIntensity * directionalLights[0].color;

    gl_FragColor = vec4(uColor * (ambientLightColor + light + specular + rim), 1.0);


    //    gl_FragColor =  vec4(ambientLightColor, 1.0);
    //    gl_FragColor = vec4(vViewDir, 1.0);
}
