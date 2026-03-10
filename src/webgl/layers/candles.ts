/**
 * Candle rendering layer — extracted from ZenithRenderer.ts
 * Renders OHLC candlesticks with wick, border, and body passes.
 * Uses TradingView-inspired optimal width calculation.
 */
import type { RendererContext } from './types';
import { FC, O, MAX_BARS } from './types';

/**
 * Optimal candlestick width calculation — ported from TradingView lightweight-charts.
 * Source: lightweight-charts/src/renderers/optimal-bar-width.ts
 */
function optimalCandlestickWidth(barSpacing: number, pixelRatio: number): number {
    const barSpacingSpecialCaseFrom = 2.5;
    const barSpacingSpecialCaseTo = 4;
    const barSpacingSpecialCaseCoeff = 3;
    if (barSpacing >= barSpacingSpecialCaseFrom && barSpacing <= barSpacingSpecialCaseTo) {
        return Math.floor(barSpacingSpecialCaseCoeff * pixelRatio);
    }
    const barSpacingReducingCoeff = 0.2;
    const coeff = 1 - barSpacingReducingCoeff * Math.atan(
        Math.max(barSpacingSpecialCaseTo, barSpacing) - barSpacingSpecialCaseTo
    ) / (Math.PI * 0.5);
    const res = Math.floor(barSpacing * coeff * pixelRatio);
    const scaledBarSpacing = Math.floor(barSpacing * pixelRatio);
    const optimal = Math.min(res, scaledBarSpacing);
    return Math.max(Math.floor(pixelRatio), optimal);
}

export function renderCandles(ctx: RendererContext, id: number, wasm: any, count: number, matrix: Float32Array): void {
    const gl = ctx.gl;
    const barView: Float64Array = wasm.getFloat64View(id);
    const n = Math.min(count, MAX_BARS);
    const dpr = window.devicePixelRatio || 1;
    const barSpacing = matrix[1]; // CSS pixels per bar

    // TradingView-inspired bar width calculation
    let barWidth = optimalCandlestickWidth(barSpacing, dpr);

    // Wick width: 1 CSS pixel = Math.floor(dpr) device pixels
    let wickWidth = Math.min(
        Math.floor(dpr),
        Math.floor(barSpacing * dpr)
    );
    wickWidth = Math.max(Math.floor(dpr), Math.min(wickWidth, barWidth));

    // Parity matching: wick and body must have same odd/even width
    if (barWidth >= 2) {
        if ((wickWidth % 2) !== (barWidth % 2)) {
            barWidth--;
        }
    }

    // Border width calculation (from TradingView _calculateBorderWidth)
    const BarBorderWidth = 1;
    let borderWidth = Math.floor(BarBorderWidth * dpr);
    if (barWidth <= 2 * borderWidth) {
        borderWidth = Math.floor((barWidth - 1) * 0.5);
    }
    borderWidth = Math.max(Math.floor(dpr), borderWidth);
    const drawBorder = barWidth > borderWidth * 2;
    const drawBody = !drawBorder || barWidth > borderWidth * 2;

    // Fill staging array: [open, high, low, close, isBull] (5 floats per bar)
    for (let i = 0; i < n; i++) {
        const src = i * FC;
        const dst = i * 5;
        ctx.candleStaging[dst + 0] = barView[src + O.open];
        ctx.candleStaging[dst + 1] = barView[src + O.high];
        ctx.candleStaging[dst + 2] = barView[src + O.low];
        ctx.candleStaging[dst + 3] = barView[src + O.close];
        ctx.candleStaging[dst + 4] = barView[src + O.close] > barView[src + O.open] ? 1 : 0;
    }

    // Update persistent VBO
    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.candleDataVbo);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, ctx.candleStaging.subarray(0, n * 5));

    // Setup VAO + attribs
    gl.bindVertexArray(ctx.vao);

    // Quad vertices (location 0)
    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.quadVbo);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(0, 0);

    // Instance data: OHLC (location 1) + flags (location 2)
    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.candleDataVbo);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 20, 0);
    gl.vertexAttribDivisor(1, 1);
    gl.enableVertexAttribArray(2);
    gl.vertexAttribIPointer(2, 1, gl.UNSIGNED_INT, 20, 16);
    gl.vertexAttribDivisor(2, 1);

    gl.useProgram(ctx.programs.candle);

    const u = ctx.uniforms.candle;

    // Y-axis uniforms
    gl.uniform1f(u.scaleY, matrix[5]);
    gl.uniform1f(u.transY, matrix[13]);

    // X-axis uniforms
    gl.uniform1f(u.totalBarSpace, matrix[0]);
    gl.uniform1f(u.barSpace, matrix[1]);
    gl.uniform1f(u.rightOffset, matrix[2]);

    // Pixel-perfect sizing uniforms
    gl.uniform1f(u.bodyWidth, barWidth);
    gl.uniform1f(u.wickWidth, wickWidth);
    gl.uniform1f(u.dpr, dpr);

    // Viewport size in device pixels
    const vpWidth = ctx.vpWidth;
    const vpHeight = ctx.vpHeight;
    gl.uniform2f(u.viewportSize, vpWidth, vpHeight);

    // Border width
    gl.uniform1f(u.borderWidth, drawBorder ? borderWidth : 0);

    // Theme colors — read from CSS variables
    const root = document.documentElement;
    const bullCss = getComputedStyle(root).getPropertyValue('--enso-buy').trim() || '#29ab87';
    const bearCss = getComputedStyle(root).getPropertyValue('--enso-sell').trim() || '#eb4d4d';
    const bullRgb = ctx.cssColorToFloat4(bullCss);
    const bearRgb = ctx.cssColorToFloat4(bearCss);
    gl.uniform4fv(u.bullColor, bullRgb);
    gl.uniform4fv(u.bearColor, bearRgb);

    // Border colors — slightly darker for visual definition
    const bullBorderRgb = ctx.cssColorToFloat4(bullCss);
    const bearBorderRgb = ctx.cssColorToFloat4(bearCss);
    for (let c = 0; c < 3; c++) { bullBorderRgb[c] *= 0.7; bearBorderRgb[c] *= 0.7; }
    gl.uniform4fv(u.bullBorderColor, bullBorderRgb);
    gl.uniform4fv(u.bearBorderColor, bearBorderRgb);

    // Pass 1: Draw wicks (behind everything)
    gl.uniform1i(u.mode, 1);
    gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, n);

    // Pass 2: Draw borders (if bar wide enough)
    if (drawBorder) {
        gl.uniform1i(u.mode, 2);
        gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, n);
    }

    // Pass 3: Draw bodies (on top, inset by border)
    if (drawBody) {
        gl.uniform1i(u.mode, 0);
        gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, n);
    }
}
