/**
 * Liquidation rendering layer — extracted from ZenithRenderer.ts
 * Renders liquidation markers as instanced quads at NDC coordinates.
 */
import type { RendererContext } from './types';
import { FC, O, MAX_LIQS } from './types';

export function renderLiquidations(ctx: RendererContext, id: number, wasm: any, _count: number, matrix: Float32Array): void {
    const gl = ctx.gl;
    const liqCount = wasm.getLiquidationCount(id);
    if (liqCount === 0) return;

    const view: Float64Array = wasm.getLiquidationView(id);
    const barView: Float64Array = wasm.getFloat64View(id);
    const n = Math.min(liqCount, MAX_LIQS);
    const barCount = wasm.getBarCount?.(_count) || _count;

    gl.useProgram(ctx.programs.liq);
    gl.uniformMatrix4fv(ctx.uniforms.liq.matrix, false, ctx.identity);

    gl.bindVertexArray(ctx.vao);

    // Quad vertices
    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.quadVbo);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(0, 0);

    // Convert liq data to NDC coordinates
    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.liqDataVbo);
    const liqF32 = new Float32Array(n * 4);
    for (let i = 0; i < n; i++) {
        const liqTs = view[i * 4 + 0];
        const liqPrice = view[i * 4 + 1];
        // Find closest bar index by timestamp (bars are sorted)
        let barIdx = 0;
        for (let j = 0; j < barCount; j++) {
            if (barView[j * FC + O.timestamp] <= liqTs) barIdx = j;
            else break;
        }
        liqF32[i * 4 + 0] = ctx.indexToNdcX(barIdx, matrix);
        liqF32[i * 4 + 1] = ctx.priceToNdcY(liqPrice, matrix);
        liqF32[i * 4 + 2] = view[i * 4 + 2]; // Size
        liqF32[i * 4 + 3] = view[i * 4 + 3]; // Side
    }
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, liqF32);

    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 16, 0);
    gl.vertexAttribDivisor(1, 1);

    gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, n);
}
