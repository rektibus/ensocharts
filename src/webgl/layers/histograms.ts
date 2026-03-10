/**
 * Histogram (VPSV) rendering layer — extracted from ZenithRenderer.ts
 * Renders volume profile as a single textured quad.
 */
import type { RendererContext } from './types';
import { ZenithSchema } from '../ZenithSchema';

export function renderHistograms(ctx: RendererContext, id: number, wasm: any, count: number, _matrix: Float32Array): void {
    const gl = ctx.gl;
    wasm.aggregateVpsv(id, 0, count);
    const aggrView = wasm.getAggrView(id);
    if (!aggrView) return;

    gl.bindTexture(gl.TEXTURE_2D, ctx.histogramTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R32F, ZenithSchema.MAX_BINS, 1, 0, gl.RED, gl.FLOAT, aggrView);

    gl.useProgram(ctx.programs.histogram);
    gl.uniform1f(ctx.uniforms.histogram.side, 1.0);
    gl.uniform4f(ctx.uniforms.histogram.color, 0.3, 0.6, 0.9, 0.4);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, ctx.histogramTexture);
    gl.uniform1i(ctx.uniforms.histogram.profile, 0);

    gl.bindVertexArray(ctx.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.quadVbo);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(0, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}
