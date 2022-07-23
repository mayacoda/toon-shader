varying vec3 vNormal;
varying vec3 vViewDir;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 clipPosition = projectionMatrix * viewPosition;

    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(-viewPosition.xyz);

    gl_Position = clipPosition;
}
