/**
 * WebGL2 renderer smoke test.
 * This is a graphics-pipeline test, not Minecraft rendering or game code.
 */
export function createRenderer(gl) {
  const vertex = compile(gl, gl.VERTEX_SHADER, `#version 300 es
    in vec3 aPosition;
    in vec3 aColor;
    uniform mat4 uMvp;
    out vec3 vColor;
    void main() {
      gl_Position = uMvp * vec4(aPosition, 1.0);
      vColor = aColor;
    }`);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, `#version 300 es
    precision highp float;
    in vec3 vColor;
    out vec4 outColor;
    void main() { outColor = vec4(vColor, 1.0); }`);
  const program = gl.createProgram();
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) || "Shader program link failed");
  }
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);

  const vertices = new Float32Array([
    // position             // color
    -1,-1, 1,  0.25,0.75,0.35,  1,-1, 1,  0.25,0.75,0.35,  1, 1, 1,  0.25,0.75,0.35,
    -1,-1, 1,  0.25,0.75,0.35,  1, 1, 1,  0.25,0.75,0.35, -1, 1, 1,  0.25,0.75,0.35,
    -1,-1,-1,  0.25,0.45,0.85, -1, 1,-1,  0.25,0.45,0.85,  1, 1,-1,  0.25,0.45,0.85,
    -1,-1,-1,  0.25,0.45,0.85,  1, 1,-1,  0.25,0.45,0.85,  1,-1,-1,  0.25,0.45,0.85,
    -1, 1,-1,  0.9,0.65,0.25, -1, 1, 1,  0.9,0.65,0.25,  1, 1, 1,  0.9,0.65,0.25,
    -1, 1,-1,  0.9,0.65,0.25,  1, 1, 1,  0.9,0.65,0.25,  1, 1,-1,  0.9,0.65,0.25,
    -1,-1,-1,  0.75,0.3,0.3,  1,-1,-1,  0.75,0.3,0.3,  1,-1, 1,  0.75,0.3,0.3,
    -1,-1,-1,  0.75,0.3,0.3,  1,-1, 1,  0.75,0.3,0.3, -1,-1, 1,  0.75,0.3,0.3,
    1,-1,-1,  0.7,0.35,0.8,  1, 1,-1,  0.7,0.35,0.8,  1, 1, 1,  0.7,0.35,0.8,
    1,-1,-1,  0.7,0.35,0.8,  1, 1, 1,  0.7,0.35,0.8,  1,-1, 1,  0.7,0.35,0.8,
    -1,-1,-1,  0.25,0.7,0.8, -1,-1, 1,  0.25,0.7,0.8, -1, 1, 1,  0.25,0.7,0.8,
    -1,-1,-1,  0.25,0.7,0.8, -1, 1, 1,  0.25,0.7,0.8, -1, 1,-1,  0.25,0.7,0.8
  ]);

  const vao = gl.createVertexArray();
  const buffer = gl.createBuffer();
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  const stride = 6 * Float32Array.BYTES_PER_ELEMENT;
  const position = gl.getAttribLocation(program, "aPosition");
  const color = gl.getAttribLocation(program, "aColor");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 3, gl.FLOAT, false, stride, 0);
  gl.enableVertexAttribArray(color);
  gl.vertexAttribPointer(color, 3, gl.FLOAT, false, stride, 3 * Float32Array.BYTES_PER_ELEMENT);
  gl.bindVertexArray(null);

  const mvpLocation = gl.getUniformLocation(program, "uMvp");
  let frame = 0;
  let raf = 0;
  let running = false;

  function render(time) {
    if (!running) return;
    const width = gl.drawingBufferWidth;
    const height = gl.drawingBufferHeight;
    gl.viewport(0, 0, width, height);
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.035, 0.055, 0.08, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    const projection = perspective(Math.PI / 3, width / Math.max(1, height), 0.1, 100);
    const view = multiply(translation(0, 0, -4.2), multiply(rotationX(-0.35), rotationY(time * 0.00035)));
    gl.useProgram(program);
    gl.uniformMatrix4fv(mvpLocation, false, multiply(projection, view));
    gl.bindVertexArray(vao);
    gl.drawArrays(gl.TRIANGLES, 0, 36);
    gl.bindVertexArray(null);
    frame++;
    raf = requestAnimationFrame(render);
  }

  return Object.freeze({
    start() { if (!running) { running = true; raf = requestAnimationFrame(render); } },
    stop() { running = false; cancelAnimationFrame(raf); },
    get framesRendered() { return frame; },
    dispose() { this.stop(); gl.deleteBuffer(buffer); gl.deleteVertexArray(vao); gl.deleteProgram(program); }
  });
}

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) || "Shader compilation failed";
    gl.deleteShader(shader);
    throw new Error(message);
  }
  return shader;
}
function perspective(fov, aspect, near, far) {
  const f = 1 / Math.tan(fov / 2), nf = 1 / (near - far);
  return new Float32Array([
    f/aspect,0,0,0, 0,f,0,0, 0,0,(far+near)*nf,-1, 0,0,2*far*near*nf,0
  ]);
}
function multiply(a,b) {
  const out = new Float32Array(16);
  for(let c=0;c<4;c++) for(let r=0;r<4;r++)
    out[c*4+r]=a[r]*b[c*4]+a[4+r]*b[c*4+1]+a[8+r]*b[c*4+2]+a[12+r]*b[c*4+3];
  return out;
}
function translation(x,y,z) {
  const m=new Float32Array(16); m[0]=m[5]=m[10]=m[15]=1; m[12]=x;m[13]=y;m[14]=z; return m;
}
function rotationX(a) {
  const c=Math.cos(a),s=Math.sin(a),m=new Float32Array(16);
  m[0]=1;m[5]=c;m[6]=s;m[9]=-s;m[10]=c;m[15]=1;return m;
}
function rotationY(a) {
  const c=Math.cos(a),s=Math.sin(a),m=new Float32Array(16);
  m[0]=c;m[2]=-s;m[5]=1;m[8]=s;m[10]=c;m[15]=1;return m;
}
