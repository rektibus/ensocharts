/**
 * Depth rendering layers — extracted from ZenithRenderer.ts
 * Includes both LOB Heatmap and Depth Overlay curve rendering.
 */
import type { RendererContext } from './types';
import { FC, O } from './types';
import { ZenithSchema } from '../ZenithSchema';

export function renderLobHeatmap(ctx: RendererContext, id: number, wasm: any, count: number, matrix: Float32Array): void {
    const gl = ctx.gl;

    if (!wasm.getLobHeatmapView) return;
    const view = wasm.getLobHeatmapView(id);
    if (!view || view.length === 0) return;

    const width = ZenithSchema.MAX_BINS;
    const height = count;

    gl.bindTexture(gl.TEXTURE_2D, ctx.lobDensityTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R32F, width, height, 0, gl.RED, gl.FLOAT, view);

    gl.useProgram(ctx.programs.lobHeatmap);
    gl.uniformMatrix4fv(ctx.uniforms.lobHeatmap.matrix, false, matrix);

    const barView: Float64Array = wasm.getFloat64View(id);
    const lastTsIdx = (count - 1) * FC;
    const midPrice = (barView[lastTsIdx + O.high] + barView[lastTsIdx + O.low]) * 0.5;
    gl.uniform1f(ctx.uniforms.lobHeatmap.midPrice, midPrice);
    gl.uniform1f(ctx.uniforms.lobHeatmap.range, barView[lastTsIdx + O.high] * 1.5);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, ctx.lobDensityTexture);
    gl.uniform1i(ctx.uniforms.lobHeatmap.lobTex, 0);

    const firstTs = barView[O.timestamp];
    const lastTs = barView[lastTsIdx + O.timestamp];
    const minP = barView[lastTsIdx + O.low] * 0.5;
    const maxP = barView[lastTsIdx + O.high] * 1.5;

    ctx.heatmapQuadStaging[0] = firstTs; ctx.heatmapQuadStaging[1] = minP;
    ctx.heatmapQuadStaging[2] = 0; ctx.heatmapQuadStaging[3] = 0;
    ctx.heatmapQuadStaging[4] = lastTs; ctx.heatmapQuadStaging[5] = minP;
    ctx.heatmapQuadStaging[6] = 0; ctx.heatmapQuadStaging[7] = 1;
    ctx.heatmapQuadStaging[8] = firstTs; ctx.heatmapQuadStaging[9] = maxP;
    ctx.heatmapQuadStaging[10] = 1; ctx.heatmapQuadStaging[11] = 0;
    ctx.heatmapQuadStaging[12] = lastTs; ctx.heatmapQuadStaging[13] = maxP;
    ctx.heatmapQuadStaging[14] = 1; ctx.heatmapQuadStaging[15] = 1;

    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.heatmapQuadVbo);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, ctx.heatmapQuadStaging);

    gl.bindVertexArray(ctx.vao);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 16, 0);
    gl.vertexAttribDivisor(0, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 16, 8);
    gl.vertexAttribDivisor(1, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

export function renderDepthOverlay(ctx: RendererContext, id: number, wasm: any, count: number, matrix: Float32Array): void {
    const gl = ctx.gl;

    if (!wasm.getLobHeatmapView) return;
    const view = wasm.getLobHeatmapView(id);
    if (!view || view.length === 0) return;

    const width = ZenithSchema.MAX_BINS;
    const height = count;

    gl.bindTexture(gl.TEXTURE_2D, ctx.lobDensityTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R32F, width, height, 0, gl.RED, gl.FLOAT, view);

    gl.useProgram(ctx.programs.depthOverlay);
    gl.uniformMatrix4fv(ctx.uniforms.depthOverlay.matrix, false, ctx.identity);

    const barView: Float64Array = wasm.getFloat64View(id);
    const lastTsIdx = (count - 1) * FC;
    const midPrice = (barView[lastTsIdx + O.high] + barView[lastTsIdx + O.low]) * 0.5;

    gl.uniform1f(ctx.uniforms.depthOverlay.midPrice, midPrice);
    gl.uniform1f(ctx.uniforms.depthOverlay.range, barView[lastTsIdx + O.high] * 1.5);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, ctx.lobDensityTexture);
    gl.uniform1i(ctx.uniforms.depthOverlay.lobTex, 0);

    const minP = barView[lastTsIdx + O.low] * 0.1;
    const maxP = barView[lastTsIdx + O.high] * 1.5;

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

    gl.bindVertexArray(ctx.vao);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 16, 0);
    gl.vertexAttribDivisor(0, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 16, 8);
    gl.vertexAttribDivisor(1, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}
