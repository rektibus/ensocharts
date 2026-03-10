/**
 * Heatmap rendering layer — extracted from ZenithRenderer.ts
 * Renders trade volume heatmap as a textured quad.
 */
import type { RendererContext } from './types';
import { FC, O } from './types';
import { ZenithSchema } from '../ZenithSchema';

export function renderHeatmap(ctx: RendererContext, id: number, wasm: any, count: number, matrix: Float32Array): void {
    const gl = ctx.gl;
    if (!wasm.getLiqHeatmapView) return;
    const view = wasm.getLiqHeatmapView(id);
    if (!view || view.length === 0) return;
    const width = ZenithSchema.MAX_BINS;
    const height = count;

    gl.bindTexture(gl.TEXTURE_2D, ctx.heatmapTexture);
    const filter = ctx.layers.heatmapPixelated ? gl.NEAREST : gl.LINEAR;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R32F, width, height, 0, gl.RED, gl.FLOAT, view);

    gl.useProgram(ctx.programs.heatmap);
    gl.uniformMatrix4fv(ctx.uniforms.heatmap.matrix, false, ctx.identity);
    gl.uniform1f(ctx.uniforms.heatmap.time, performance.now());

    // Compute NDC corners from data indices and price range
    const barView: Float64Array = wasm.getFloat64View(id);
    let minP = Infinity, maxP = -Infinity;
    for (let i = 0; i < count; i++) {
        const lo = barView[i * FC + O.low];
        const hi = barView[i * FC + O.high];
        if (lo < minP) minP = lo;
        if (hi > maxP) maxP = hi;
    }
    const padding = (maxP - minP) * 0.05;
    minP -= padding;
    maxP += padding;

    const x0 = ctx.indexToNdcX(0, matrix);
    const x1 = ctx.indexToNdcX(count - 1, matrix);
    const y0 = ctx.priceToNdcY(minP, matrix);
    const y1 = ctx.priceToNdcY(maxP, matrix);

    ctx.heatmapQuadStaging[0] = x0; ctx.heatmapQuadStaging[1] = y0;
    ctx.heatmapQuadStaging[2] = 0; ctx.heatmapQuadStaging[3] = 0;
    ctx.heatmapQuadStaging[4] = x1; ctx.heatmapQuadStaging[5] = y0;
    ctx.heatmapQuadStaging[6] = 0; ctx.heatmapQuadStaging[7] = 1;
    ctx.heatmapQuadStaging[8] = x0; ctx.heatmapQuadStaging[9] = y1;
    ctx.heatmapQuadStaging[10] = 1; ctx.heatmapQuadStaging[11] = 0;
    ctx.heatmapQuadStaging[12] = x1; ctx.heatmapQuadStaging[13] = y1;
    ctx.heatmapQuadStaging[14] = 1; ctx.heatmapQuadStaging[15] = 1;

    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.heatmapQuadVbo);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, ctx.heatmapQuadStaging);

    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 16, 0);
    gl.vertexAttribDivisor(0, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 16, 8);
    gl.vertexAttribDivisor(1, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}
