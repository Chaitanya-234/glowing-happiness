'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Save, Download, RotateCcw, Pause } from 'lucide-react';

const DEFAULT_VERTEX_SHADER = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const DEFAULT_FRAGMENT_SHADER = `
precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec3 col = 0.5 + 0.5*cos(time+uv.xyx+vec3(0,2,4));
  gl_FragColor = vec4(col,1.0);
}
`;

const ShaderShowdown = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fragmentShaderSource, setFragmentShaderSource] = useState(DEFAULT_FRAGMENT_SHADER);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // WebGL State
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const animationFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl');
    if (!gl) {
      setError('WebGL not supported');
      return;
    }
    glRef.current = gl;

    // Initial setup
    const program = createProgram(gl, DEFAULT_VERTEX_SHADER, fragmentShaderSource);
    if (program) {
      programRef.current = program;
      initBuffers(gl, program);
      renderLoop();
    }

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (glRef.current && isPlaying) {
       const gl = glRef.current;
       const program = createProgram(gl, DEFAULT_VERTEX_SHADER, fragmentShaderSource);
       if (program) {
         programRef.current = program;
         setError(null);
       }
    }
  }, [fragmentShaderSource, isPlaying]);

  const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      if (type === gl.FRAGMENT_SHADER) {
          setError(gl.getShaderInfoLog(shader));
      }
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  };

  const createProgram = (gl: WebGLRenderingContext, vsSource: string, fsSource: string) => {
    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return null;

    const program = gl.createProgram();
    if (!program) return null;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setError(gl.getProgramInfoLog(program));
      return null;
    }
    return program;
  };

  const initBuffers = (gl: WebGLRenderingContext, program: WebGLProgram) => {
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // Full screen quad
    const positions = [
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
  };

  const renderLoop = () => {
    if (!glRef.current || !programRef.current) return;
    const gl = glRef.current;
    const program = programRef.current;

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.useProgram(program);

    // Uniforms
    const timeLocation = gl.getUniformLocation(program, 'time');
    const resolutionLocation = gl.getUniformLocation(program, 'resolution');

    gl.uniform1f(timeLocation, (Date.now() - startTimeRef.current) / 1000);
    gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(renderLoop);
    }
  };

  // Restart loop if isPlaying changes
  useEffect(() => {
      if(isPlaying) {
          renderLoop();
      } else {
          cancelAnimationFrame(animationFrameRef.current);
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);


  return (
    <div className="flex flex-col lg:flex-row h-[80vh] w-full max-w-7xl mx-auto gap-4 p-4">
      {/* Editor Section */}
      <div className="flex-1 flex flex-col bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
            <h3 className="text-sm font-bold text-gray-300">Fragment Shader (GLSL)</h3>
            <div className="flex gap-2">
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
                >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>
                 <button
                    onClick={() => setFragmentShaderSource(DEFAULT_FRAGMENT_SHADER)}
                    className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
                    title="Reset Code"
                >
                    <RotateCcw size={16} />
                </button>
            </div>
        </div>
        <div className="flex-1 relative">
             <textarea
                className="w-full h-full bg-black text-green-400 font-mono p-4 resize-none focus:outline-none text-sm leading-relaxed"
                value={fragmentShaderSource}
                onChange={(e) => setFragmentShaderSource(e.target.value)}
                spellCheck={false}
            />
            {error && (
                <div className="absolute bottom-0 left-0 right-0 bg-red-900/90 text-red-200 text-xs p-2 font-mono border-t border-red-700">
                    ERROR: {error}
                </div>
            )}
        </div>
      </div>

      {/* Preview Section */}
      <div className="flex-1 bg-black border border-gray-800 rounded-xl overflow-hidden relative flex flex-col">
         <div className="px-4 py-2 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
            <h3 className="text-sm font-bold text-gray-300">Live Preview</h3>
            <span className="text-xs text-gray-500 font-mono">{Math.round((Date.now() - startTimeRef.current) / 1000)}s</span>
         </div>
         <div className="flex-1 relative bg-checkerboard">
            <canvas
                ref={canvasRef}
                width={600}
                height={600}
                className="w-full h-full object-contain"
            />
         </div>
      </div>
    </div>
  );
};

export default ShaderShowdown;
