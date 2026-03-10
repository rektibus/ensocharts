/**
 * SHM (Stochastic Heat Map) rendering — extracted from ZenithRenderer.ts
 * Renders 28 rows of colored cells at the bottom 15% of the chart.
 */
import type { RendererContext } from './types';
import { FC, O } from './types';

export function renderSHM(ctx: RendererContext, id: number, wasm: any, count: number, matrix: Float32Array): void {
    const gl = ctx.gl;
    if (count < 2) return;

    const shmView = wasm.getShmView?.(id);
    if (!shmView || shmView.length === 0) return;

    const oscCount = 28;
    const width = oscCount;
    const height = Math.min(count, 2000);

    gl.bindTexture(gl.TEXTURE_2D, ctx.shmTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R32F, width, height, 0, gl.RED, gl.FLOAT,
        new Float32Array(shmView.buffer, shmView.byteOffset, width * height));

    gl.useProgram(ctx.programs.shm);
    gl.uniformMatrix4fv(ctx.uniforms.shm.matrix, false, ctx.identity);
    gl.uniform1i(ctx.uniforms.shm.texture, 0);

    // Compute price range for SHM positioning
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

    // SHM lives in the bottom 15% of the price range
    const shmTop = minP + (maxP - minP) * 0.15;
    const shmBottom = minP;

    // Compute NDC corners
    const x0 = ctx.indexToNdcX(0, matrix);
    const x1 = ctx.indexToNdcX(count - 1, matrix);
    const y0 = ctx.priceToNdcY(shmBottom, matrix);
    const y1 = ctx.priceToNdcY(shmTop, matrix);

    ctx.heatmapQuadStaging[0] = x0; ctx.heatmapQuadStaging[1] = y0;
    ctx.heatmapQuadStaging[2] = 0; ctx.heatmapQuadStaging[3] = 0;
    ctx.heatmapQuadStaging[4] = x1; ctx.heatmapQuadStaging[5] = y0;
    ctx.heatmapQuadStaging[6] = 1; ctx.heatmapQuadStaging[7] = 0;
    ctx.heatmapQuadStaging[8] = x0; ctx.heatmapQuadStaging[9] = y1;
    ctx.heatmapQuadStaging[10] = 0; ctx.heatmapQuadStaging[11] = 1;
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
