#include <common>
#include <packing>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>

// toon shading
uniform vec3 uColor;
uniform float uGlossiness;

// subsurface scattering
uniform sampler2D uLuminosityMap;
uniform vec3 uSubsurfaceColor;

// diffuse and baked ambient occlusion
uniform sampler2D uDiffuseMap;
uniform sampler2D uAOMap;

varying vec3 vNormal;
varying vec3 vViewDir;
varying vec2 vUv;

void main() {
    // shadow map
    DirectionalLightShadow directionalLight = directionalLightShadows[0];

    float shadow = getShadow(
    directionalShadowMap[0],
    directionalLight.shadowMapSize,
    directionalLight.shadowBias,
    directionalLight.shadowRadius,
    vDirectionalShadowCoord[0]
    );

    // directional light
    float NdotL = dot(vNormal, directionalLights[0].direction);
    float lightIntensity = smoothstep(0.0, 0.01, NdotL * shadow);
    vec3 lightColor = directionalLights[0].color;
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

    // diffuse and baked ambient occlusion
    vec3 diffuse = texture2D(uDiffuseMap, vUv).rgb;
    vec3 ao = texture2D(uAOMap, vUv).rgb;

    vec3 color = diffuse * ao;

    // subsurface scattering
//    float thicknessDistortion = 1.0;
//    float thicknessPower = 1.0;
//    float thicknessScale = 1.0;
//    float thicknessAttenuation = 1.0;
//    vec3 thicknessAmbient = vec3(1.0);
//
//    float thicknessMap = texture2D(uLuminosityMap, vUv).r;
//
//    vec3 thickness = uSubsurfaceColor * thicknessMap;
//    vec3 scatteringHalf = normalize(directionalLights[0].direction + (vNormal * thicknessDistortion));
//    float scatteringDot = pow(saturate(dot(vViewDir, -scatteringHalf)), thicknessPower) * thicknessScale;
//    vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * thickness;
//
//    vec3 subsurface = scatteringIllu * thicknessAttenuation * directionalLights[0].color;

    // in the thickness map, darker areas are considered thinner
    vec3 thicknessMapColor = texture2D(uLuminosityMap, vUv).rgb;

    // we invert the thickness map (1.0 - thicknessMapColor) so that lighter areas are considered thinner
    // we then smoothstep the values so we only consider values between 0.75 and 1.0
    vec3 thickness = smoothstep(0.75, 1.0, 1.0 - thicknessMapColor);

    // by inverting the NdotL value, we get the amount of light that is going through the object
    // remember that a negative NdotL value means that the normal and the light are pointing in opposite directions,
    // so we are behind the source of the ligth
    vec3 scatterStrength = vec3(1.0 - NdotL);
    vec3 scatter = scatterStrength * thickness * diffuse.rgb * uSubsurfaceColor;

    gl_FragColor = vec4(color * (ambientLightColor + light + specular + rim + scatter), 1.0);;
    gl_FragColor += vec4(scatterStrength * thickness * diffuse.rgb, 1.0);

//    gl_FragColor = vec4(thicknessMapColor, 1.0);
}
