/**
 * Footprint rendering layer — extracted from ZenithRenderer.ts
 * Renders bid/ask density within each candle body using textures.
 */
import type { RendererContext } from './types';
import { FC, O, MAX_BARS } from './types';
import { ZenithSchema } from '../ZenithSchema';

export function renderFootprint(ctx: RendererContext, id: number, wasm: any, count: number, matrix: Float32Array): void {
    const gl = ctx.gl;
    const buyView = wasm.getVBuyView(id);
    const sellView = wasm.getVSellView(id);
    if (!buyView || buyView.length === 0) return;

    const barView: Float64Array = wasm.getFloat64View(id);
    const n = Math.min(count, MAX_BARS);
    const width = ZenithSchema.MAX_BINS;

    gl.bindTexture(gl.TEXTURE_2D, ctx.buyDensityTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R32F, width, n, 0, gl.RED, gl.FLOAT, buyView);
    gl.bindTexture(gl.TEXTURE_2D, ctx.sellDensityTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R32F, width, n, 0, gl.RED, gl.FLOAT, sellView);

    // Compute NDC X per bar, keep price data for Y
    for (let i = 0; i < n; i++) {
        const src = i * FC;
        const ndcX = ctx.indexToNdcX(i, matrix);
        const bottom = Math.min(barView[src + O.open], barView[src + O.close]);
        const top = Math.max(barView[src + O.open], barView[src + O.close]);
        const h = Math.max(top - bottom, 1.0);

        ctx.footprintStaging[i * 4 + 0] = ndcX;
        ctx.footprintStaging[i * 4 + 1] = h;
        ctx.footprintStaging[i * 4 + 2] = ctx.priceToNdcY((top + bottom) * 0.5, matrix);
        ctx.footprintStaging[i * 4 + 3] = (i + 0.5) / n;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.footprintDataVbo);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, ctx.footprintStaging.subarray(0, n * 4));

    gl.useProgram(ctx.programs.footprint);
    gl.uniformMatrix4fv(ctx.uniforms.footprint.matrix, false, ctx.identity);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, ctx.buyDensityTexture);
    gl.uniform1i(ctx.uniforms.footprint.buyTex, 0);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, ctx.sellDensityTexture);
    gl.uniform1i(ctx.uniforms.footprint.sellTex, 1);

    gl.bindVertexArray(ctx.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.quadVbo);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.footprintDataVbo);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 1, gl.FLOAT, false, 16, 0);
    gl.vertexAttribDivisor(1, 1);
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 16, 4);
    gl.vertexAttribDivisor(2, 1);

    gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, n);
}
