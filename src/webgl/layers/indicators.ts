/**
 * Indicator figure rendering — extracted from ZenithRenderer.ts
 *
 * Contains all figure renderers for external indicators:
 * line, bar, circle, band, area, baseline_area, ohlc_bar, stepped_line.
 * The main entry point renderAllIndicators() iterates all indicator panes
 * and dispatches to the correct figure renderer.
 */
import type { RendererContext } from './types';
import { MAX_BARS } from './types';
import { calculateColumnPositions } from '../ZenithHelpers';
import type { Chart } from '../../index';

/**
 * Optimal candlestick width — used by OHLC bar figure renderer.
 * Ported from TradingView lightweight-charts.
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

// ─── Main entry point ───

export function renderAllIndicators(ctx: RendererContext, chart: Chart, count: number, matrix: Float32Array): void {
    const gl = ctx.gl;
    const n = Math.min(count, MAX_BARS);

    gl.useProgram(ctx.programs.indicator);
    gl.uniformMatrix4fv(ctx.uniforms.indicator.matrix, false, ctx.identity);

    // barWidth in NDC for the indicator shader
    const barSpace = matrix[1];
    const totalBarSpace = matrix[0];
    const barWidthNdc = (barSpace * 0.8) / totalBarSpace * 2.0;
    gl.uniform1f(ctx.uniforms.indicator.barWidth, barWidthNdc);

    // Pixel-perfect uniforms for indicator snapping
    const dpr = window.devicePixelRatio || 1;
    gl.uniform1f(ctx.uniforms.indicator.dpr, dpr);
    gl.uniform2f(ctx.uniforms.indicator.viewportSize, ctx.vpWidth, ctx.vpHeight);

    gl.bindVertexArray(ctx.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.indicatorDataVbo);

    type InternalChart = Chart & { getChartStore: () => any; getDrawPanes: () => any[] };
    const chartInternal = chart as InternalChart;
    const store = chartInternal.getChartStore();
    const panes = chartInternal.getDrawPanes() || [];

    for (const pane of panes) {
        const indicators = store.getIndicatorsByPaneId(pane.getId()) || [];

        for (const indicator of indicators) {
            if (!indicator.visible || indicator.renderer !== 'external') continue;
            if (!indicator.result || indicator.result.length === 0) continue;

            for (const figure of indicator.figures) {
                if (figure.type === 'line') {
                    renderLineFigure(ctx, indicator, figure, n, matrix);
                } else if (figure.type === 'bar') {
                    renderBarFigure(ctx, indicator, figure, n, matrix);
                } else if (figure.type === 'circle') {
                    renderCircleFigure(ctx, indicator, figure, n, matrix);
                } else if (figure.type === 'band') {
                    renderBandFigure(ctx, indicator, figure, n, matrix);
                } else if (figure.type === 'area') {
                    renderAreaFigure(ctx, indicator, figure, n, matrix);
                } else if (figure.type === 'baseline_area') {
                    renderBaselineAreaFigure(ctx, indicator, figure, n, matrix);
                } else if (figure.type === 'ohlc_bar') {
                    renderOhlcBarFigure(ctx, indicator, figure, n, matrix);
                } else if (figure.type === 'stepped_line') {
                    renderSteppedLineFigure(ctx, indicator, figure, n, matrix);
                }
            }
        }
    }
}

// ─── Line Figure ───

function renderLineFigure(
    ctx: RendererContext,
    indicator: { result: any[]; figures: any[] },
    figure: { key: string; styles?: { color?: string } },
    count: number,
    matrix: Float32Array
): void {
    const gl = ctx.gl;
    const n = Math.min(count, MAX_BARS);
    const data = indicator.result;
    const key = figure.key;

    let validCount = 0;
    for (let i = 0; i < n; i++) {
        const val = data[i]?.[key];
        if (val === undefined || isNaN(val)) continue;
        ctx.indicatorStaging[validCount * 2] = ctx.indexToNdcX(i, matrix);
        ctx.indicatorStaging[validCount * 2 + 1] = val;
        validCount++;
    }
    if (validCount < 2) return;

    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.indicatorDataVbo);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, ctx.indicatorStaging.subarray(0, validCount * 2));

    gl.useProgram(ctx.programs.indicator);
    gl.uniformMatrix4fv(ctx.uniforms.indicator.matrix, false, matrix);

    const color = figure.styles?.color || '#ffffff';
    gl.uniform4fv(ctx.uniforms.indicator.color, ctx.cssColorToFloat4(color));

    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(0, 0);

    gl.drawArrays(gl.LINE_STRIP, 0, validCount);
}

// ─── Bar Figure (histogram columns) ───

function renderBarFigure(
    ctx: RendererContext,
    indicator: { result: any[]; figures: any[] },
    figure: { key: string; styles?: { color?: string; baseline?: number } },
    count: number,
    matrix: Float32Array
): void {
    const gl = ctx.gl;
    const n = Math.min(count, MAX_BARS);
    const data = indicator.result;
    const key = figure.key;
    const dpr = window.devicePixelRatio || 1;
    const barSpace = matrix[1];
    const totalBarSpaceCss = ctx.vpWidth / dpr;
    const rightOffset = (matrix[12] + 1) / matrix[0];

    const xCssPositions: number[] = [];
    const values: number[] = [];
    for (let i = 0; i < n; i++) {
        const val = data[i]?.[key];
        if (val === undefined || isNaN(val)) continue;
        const deltaFromRight = rightOffset - i;
        const xCss = totalBarSpaceCss - (deltaFromRight - 0.5) * barSpace;
        xCssPositions.push(xCss);
        values.push(val);
    }

    if (values.length === 0) return;

    const columns = calculateColumnPositions(xCssPositions, barSpace, dpr);

    if (ctx.indicatorStaging.length < columns.length * 3) {
        ctx.indicatorStaging = new Float32Array(columns.length * 3);
    }

    for (let i = 0; i < columns.length; i++) {
        const col = columns[i];
        const leftNdc = (col.left / ctx.vpWidth) * 2.0 - 1.0;
        const rightNdc = ((col.right + 1) / ctx.vpWidth) * 2.0 - 1.0;
        ctx.indicatorStaging[i * 3] = leftNdc;
        ctx.indicatorStaging[i * 3 + 1] = rightNdc;
        ctx.indicatorStaging[i * 3 + 2] = values[i];
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.indicatorDataVbo);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, ctx.indicatorStaging.subarray(0, columns.length * 3));

    gl.useProgram(ctx.programs.barFigure);

    gl.uniform1f(ctx.uniforms.barFigure.scaleY, matrix[5]);
    gl.uniform1f(ctx.uniforms.barFigure.transY, matrix[13]);
    gl.uniform1f(ctx.uniforms.barFigure.baseline, figure.styles?.baseline ?? 0);
    gl.uniform1f(ctx.uniforms.barFigure.dpr, dpr);
    gl.uniform2f(ctx.uniforms.barFigure.viewportSize, ctx.vpWidth, ctx.vpHeight);

    const color = figure.styles?.color || '#5470c6';
    gl.uniform4fv(ctx.uniforms.barFigure.color, ctx.cssColorToFloat4(color));

    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.quadVbo);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.indicatorDataVbo);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(1, 1);

    gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, columns.length);
}

// ─── Circle Figure (dot markers) ───

function renderCircleFigure(
    ctx: RendererContext,
    indicator: { result: any[]; figures: any[] },
    figure: { key: string; styles?: { color?: string; radius?: number } },
    count: number,
    matrix: Float32Array
): void {
    const gl = ctx.gl;
    const n = Math.min(count, MAX_BARS);
    const data = indicator.result;
    const key = figure.key;
    const dpr = window.devicePixelRatio || 1;

    let validCount = 0;
    for (let i = 0; i < n; i++) {
        const val = data[i]?.[key];
        if (val === undefined || isNaN(val)) continue;
        ctx.indicatorStaging[validCount * 2] = ctx.indexToNdcX(i, matrix);
        ctx.indicatorStaging[validCount * 2 + 1] = val;
        validCount++;
    }
    if (validCount === 0) return;

    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.indicatorDataVbo);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, ctx.indicatorStaging.subarray(0, validCount * 2));

    gl.useProgram(ctx.programs.circleFigure);

    gl.uniform1f(ctx.uniforms.circleFigure.scaleY, matrix[5]);
    gl.uniform1f(ctx.uniforms.circleFigure.transY, matrix[13]);
    const radiusCss = figure.styles?.radius ?? 4;
    gl.uniform1f(ctx.uniforms.circleFigure.radius, radiusCss * dpr);
    gl.uniform2f(ctx.uniforms.circleFigure.viewportSize, ctx.vpWidth, ctx.vpHeight);

    const color = figure.styles?.color || '#ffffff';
    gl.uniform4fv(ctx.uniforms.circleFigure.color, ctx.cssColorToFloat4(color));

    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.quadVbo);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.indicatorDataVbo);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(1, 1);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, validCount);
}

// ─── Band/Channel Figure (Bollinger, Keltner, Donchian) ───

function renderBandFigure(
    ctx: RendererContext,
    indicator: { result: any[]; figures: any[] },
    figure: { keys?: { upper?: string; lower?: string }; styles?: { fillColor?: string; lineColor?: string } },
    count: number,
    matrix: Float32Array
): void {
    const gl = ctx.gl;
    const n = Math.min(count, MAX_BARS);
    const data = indicator.result;
    const upperKey = figure.keys?.upper;
    const lowerKey = figure.keys?.lower;
    if (!upperKey || !lowerKey) return;

    let validCount = 0;
    for (let i = 0; i < n; i++) {
        const upper = data[i]?.[upperKey];
        const lower = data[i]?.[lowerKey];
        if (upper === undefined || lower === undefined || isNaN(upper) || isNaN(lower)) continue;
        const x = ctx.indexToNdcX(i, matrix);
        ctx.indicatorStaging[validCount * 3] = x;
        ctx.indicatorStaging[validCount * 3 + 1] = upper;
        ctx.indicatorStaging[validCount * 3 + 2] = lower;
        validCount++;
    }
    if (validCount < 2) return;

    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.indicatorDataVbo);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, ctx.indicatorStaging.subarray(0, validCount * 3));

    gl.useProgram(ctx.programs.band);

    gl.uniform1f(ctx.uniforms.band.scaleY, matrix[5]);
    gl.uniform1f(ctx.uniforms.band.transY, matrix[13]);
    const dpr = window.devicePixelRatio || 1;
    gl.uniform1f(ctx.uniforms.band.dpr, dpr);
    gl.uniform2f(ctx.uniforms.band.viewportSize, ctx.vpWidth, ctx.vpHeight);

    const fillColor = figure.styles?.fillColor || 'rgba(25, 200, 100, 0.25)';
    gl.uniform4fv(ctx.uniforms.band.fillColor, ctx.cssColorToFloat4(fillColor));

    gl.bindVertexArray(ctx.vao);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 12, 0);
    gl.vertexAttribDivisor(0, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Expand data from back to front to avoid overwriting
    for (let i = validCount - 1; i >= 0; i--) {
        const x = ctx.indicatorStaging[i * 3];
        const upper = ctx.indicatorStaging[i * 3 + 1];
        const lower = ctx.indicatorStaging[i * 3 + 2];

        const ndcUpper = upper * matrix[5] + matrix[13];
        const devYUpper = Math.round((1.0 - ndcUpper) * 0.5 * ctx.vpHeight);
        const snappedUpper = 1.0 - devYUpper / ctx.vpHeight * 2.0;

        const ndcLower = lower * matrix[5] + matrix[13];
        const devYLower = Math.round((1.0 - ndcLower) * 0.5 * ctx.vpHeight);
        const snappedLower = 1.0 - devYLower / ctx.vpHeight * 2.0;

        ctx.indicatorStaging[i * 4] = x;
        ctx.indicatorStaging[i * 4 + 1] = snappedUpper;
        ctx.indicatorStaging[i * 4 + 2] = x;
        ctx.indicatorStaging[i * 4 + 3] = snappedLower;
    }

    gl.bufferSubData(gl.ARRAY_BUFFER, 0, ctx.indicatorStaging.subarray(0, validCount * 4));
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, validCount * 2);

    // Stroke lines
    const lineColor = figure.styles?.lineColor || 'rgba(25, 200, 100, 1.0)';
    gl.useProgram(ctx.programs.indicator);
    gl.uniformMatrix4fv(ctx.uniforms.indicator.matrix, false, ctx.identity);
    gl.uniform4fv(ctx.uniforms.indicator.color, ctx.cssColorToFloat4(lineColor));

    const upperOffset = validCount * 4;
    for (let i = 0; i < validCount; i++) {
        ctx.indicatorStaging[upperOffset + i * 2] = ctx.indicatorStaging[i * 4];
        ctx.indicatorStaging[upperOffset + i * 2 + 1] = ctx.indicatorStaging[i * 4 + 1];
    }
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, ctx.indicatorStaging.subarray(upperOffset, upperOffset + validCount * 2));
    gl.drawArrays(gl.LINE_STRIP, 0, validCount);

    for (let i = 0; i < validCount; i++) {
        ctx.indicatorStaging[upperOffset + i * 2] = ctx.indicatorStaging[i * 4 + 2];
        ctx.indicatorStaging[upperOffset + i * 2 + 1] = ctx.indicatorStaging[i * 4 + 3];
    }
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, ctx.indicatorStaging.subarray(upperOffset, upperOffset + validCount * 2));
    gl.drawArrays(gl.LINE_STRIP, 0, validCount);
}

// ─── Area Fill Figure ───

function renderAreaFigure(
    ctx: RendererContext,
    indicator: { result: any[]; figures: any[] },
    figure: { key: string; styles?: { fillColor?: string; lineColor?: string; baseline?: number } },
    count: number,
    matrix: Float32Array
): void {
    const gl = ctx.gl;
    const n = Math.min(count, MAX_BARS);
    const data = indicator.result;
    const key = figure.key;
    const baseline = figure.styles?.baseline ?? 0;

    let validCount = 0;
    for (let i = 0; i < n; i++) {
        const val = data[i]?.[key];
        if (val === undefined || isNaN(val)) continue;
        const x = ctx.indexToNdcX(i, matrix);

        const ndcVal = val * matrix[5] + matrix[13];
        const devYVal = Math.round((1.0 - ndcVal) * 0.5 * ctx.vpHeight);
        const snappedVal = 1.0 - devYVal / ctx.vpHeight * 2.0;

        const ndcBase = baseline * matrix[5] + matrix[13];
        const devYBase = Math.round((1.0 - ndcBase) * 0.5 * ctx.vpHeight);
        const snappedBase = 1.0 - devYBase / ctx.vpHeight * 2.0;

        ctx.indicatorStaging[validCount * 4] = x;
        ctx.indicatorStaging[validCount * 4 + 1] = snappedVal;
        ctx.indicatorStaging[validCount * 4 + 2] = x;
        ctx.indicatorStaging[validCount * 4 + 3] = snappedBase;
        validCount++;
    }
    if (validCount < 2) return;

    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.indicatorDataVbo);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, ctx.indicatorStaging.subarray(0, validCount * 4));

    gl.useProgram(ctx.programs.indicator);
    gl.uniformMatrix4fv(ctx.uniforms.indicator.matrix, false, ctx.identity);

    const fillColor = figure.styles?.fillColor || 'rgba(0, 150, 255, 0.2)';
    gl.uniform4fv(ctx.uniforms.indicator.color, ctx.cssColorToFloat4(fillColor));

    gl.bindVertexArray(ctx.vao);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(0, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, validCount * 2);

    const lineColor = figure.styles?.lineColor || 'rgba(0, 150, 255, 1.0)';
    gl.uniform4fv(ctx.uniforms.indicator.color, ctx.cssColorToFloat4(lineColor));

    const lineOffset = validCount * 4;
    for (let i = 0; i < validCount; i++) {
        ctx.indicatorStaging[lineOffset + i * 2] = ctx.indicatorStaging[i * 4];
        ctx.indicatorStaging[lineOffset + i * 2 + 1] = ctx.indicatorStaging[i * 4 + 1];
    }
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, ctx.indicatorStaging.subarray(lineOffset, lineOffset + validCount * 2));
    gl.drawArrays(gl.LINE_STRIP, 0, validCount);
}

// ─── Baseline Area Figure (dual-color fill) ───

function renderBaselineAreaFigure(
    ctx: RendererContext,
    indicator: { result: any[]; figures: any[] },
    figure: { key: string; styles?: { topFillColor?: string; bottomFillColor?: string; topLineColor?: string; bottomLineColor?: string; baseline?: number } },
    count: number,
    matrix: Float32Array
): void {
    const gl = ctx.gl;
    const n = Math.min(count, MAX_BARS);
    const data = indicator.result;
    const key = figure.key;
    const baseline = figure.styles?.baseline ?? 0;

    let validCount = 0;
    for (let i = 0; i < n; i++) {
        const val = data[i]?.[key];
        if (val === undefined || isNaN(val)) continue;
        const x = ctx.indexToNdcX(i, matrix);

        ctx.indicatorStaging[validCount * 4] = x;
        ctx.indicatorStaging[validCount * 4 + 1] = val;
        ctx.indicatorStaging[validCount * 4 + 2] = x;
        ctx.indicatorStaging[validCount * 4 + 3] = baseline;
        validCount++;
    }
    if (validCount < 2) return;

    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.indicatorDataVbo);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, ctx.indicatorStaging.subarray(0, validCount * 4));

    gl.useProgram(ctx.programs.baselineArea);
    gl.uniform1f(ctx.uniforms.baselineArea.scaleY, matrix[5]);
    gl.uniform1f(ctx.uniforms.baselineArea.transY, matrix[13]);
    gl.uniform1f(ctx.uniforms.baselineArea.baseline, baseline);
    gl.uniform2f(ctx.uniforms.baselineArea.viewportSize, ctx.vpWidth, ctx.vpHeight);

    const topCol = figure.styles?.topFillColor || 'rgba(0, 200, 100, 0.4)';
    const botCol = figure.styles?.bottomFillColor || 'rgba(255, 50, 50, 0.4)';
    gl.uniform4fv(ctx.uniforms.baselineArea.topFillColor, ctx.cssColorToFloat4(topCol));
    gl.uniform4fv(ctx.uniforms.baselineArea.bottomFillColor, ctx.cssColorToFloat4(botCol));

    gl.bindVertexArray(ctx.vao);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(0, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, validCount * 2);

    // Stroke dual-color line
    const topLineCol = figure.styles?.topLineColor || 'rgba(0, 200, 100, 1.0)';
    const botLineCol = figure.styles?.bottomLineColor || 'rgba(255, 50, 50, 1.0)';

    gl.useProgram(ctx.programs.baselineLine);
    gl.uniform1f(ctx.uniforms.baselineLine.scaleY, matrix[5]);
    gl.uniform1f(ctx.uniforms.baselineLine.transY, matrix[13]);
    gl.uniform1f(ctx.uniforms.baselineLine.baseline, baseline);
    gl.uniform2f(ctx.uniforms.baselineLine.viewportSize, ctx.vpWidth, ctx.vpHeight);
    gl.uniform4fv(ctx.uniforms.baselineLine.topLineColor, ctx.cssColorToFloat4(topLineCol));
    gl.uniform4fv(ctx.uniforms.baselineLine.bottomLineColor, ctx.cssColorToFloat4(botLineCol));

    const lineOffset = validCount * 4;
    for (let i = 0; i < validCount; i++) {
        ctx.indicatorStaging[lineOffset + i * 2] = ctx.indicatorStaging[i * 4];
        ctx.indicatorStaging[lineOffset + i * 2 + 1] = ctx.indicatorStaging[i * 4 + 1];
    }

    gl.bufferSubData(gl.ARRAY_BUFFER, 0, ctx.indicatorStaging.subarray(lineOffset, lineOffset + validCount * 2));
    gl.drawArrays(gl.LINE_STRIP, 0, validCount);
}

// ─── Stepped Line Figure (staircase) ───

function renderSteppedLineFigure(
    ctx: RendererContext,
    indicator: { result: any[]; figures: any[] },
    figure: { key: string; styles?: { color?: string; lineWidth?: number } },
    count: number,
    matrix: Float32Array
): void {
    const gl = ctx.gl;
    const n = Math.min(count, MAX_BARS);
    const data = indicator.result;
    const key = figure.key;

    let validCount = 0;
    let prevY = 0;

    for (let i = 0; i < n; i++) {
        const val = data[i]?.[key];
        if (val === undefined || isNaN(val)) continue;

        const x = ctx.indexToNdcX(i, matrix);
        const ndcY = val * matrix[5] + matrix[13];
        const devY = Math.round((1.0 - ndcY) * 0.5 * ctx.vpHeight);
        const snappedY = 1.0 - devY / ctx.vpHeight * 2.0;

        if (validCount === 0) {
            ctx.indicatorStaging[0] = x;
            ctx.indicatorStaging[1] = snappedY;
            validCount++;
        } else {
            ctx.indicatorStaging[validCount * 2] = x;
            ctx.indicatorStaging[validCount * 2 + 1] = prevY;
            validCount++;
            ctx.indicatorStaging[validCount * 2] = x;
            ctx.indicatorStaging[validCount * 2 + 1] = snappedY;
            validCount++;
        }
        prevY = snappedY;
    }

    if (validCount < 2) return;

    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.indicatorDataVbo);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, ctx.indicatorStaging.subarray(0, validCount * 2));

    gl.useProgram(ctx.programs.indicator);
    gl.uniformMatrix4fv(ctx.uniforms.indicator.matrix, false, ctx.identity);
    const color = figure.styles?.color || '#ffffff';
    gl.uniform4fv(ctx.uniforms.indicator.color, ctx.cssColorToFloat4(color));

    gl.bindVertexArray(ctx.vao);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(0, 0);

    gl.drawArrays(gl.LINE_STRIP, 0, validCount);
}

// ─── OHLC Bar Figure (stem + open/close ticks) ───

function renderOhlcBarFigure(
    ctx: RendererContext,
    indicator: { result: any[]; figures: any[] },
    figure: { keys?: { open?: string; high?: string; low?: string; close?: string }; styles?: { bullColor?: string; bearColor?: string; width?: number } },
    count: number,
    matrix: Float32Array
): void {
    const gl = ctx.gl;
    const n = Math.min(count, MAX_BARS);
    const data = indicator.result;
    const k = figure.keys;
    if (!k || !k.open || !k.high || !k.low || !k.close) return;
    const dpr = window.devicePixelRatio || 1;

    let validCount = 0;
    const floatView = new Float32Array(ctx.candleStaging.buffer);
    const uintView = new Uint32Array(ctx.candleStaging.buffer);

    for (let i = 0; i < n; i++) {
        const row = data[i];
        const o = row?.[k.open]; const h = row?.[k.high];
        const l = row?.[k.low]; const c = row?.[k.close];
        if (o === undefined || isNaN(o)) continue;

        const isBull = c >= o;
        const flags = isBull ? 1 : 0;

        const bI = validCount * 5;
        floatView[bI] = o;
        floatView[bI + 1] = h;
        floatView[bI + 2] = l;
        floatView[bI + 3] = c;
        uintView[bI + 4] = flags;
        validCount++;
    }
    if (validCount === 0) return;

    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.candleDataVbo);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, ctx.candleStaging.subarray(0, validCount * 5));

    gl.useProgram(ctx.programs.ohlcBar);

    gl.uniform1f(ctx.uniforms.ohlcBar.scaleY, matrix[5]);
    gl.uniform1f(ctx.uniforms.ohlcBar.transY, matrix[13]);
    gl.uniform1f(ctx.uniforms.ohlcBar.totalBarSpace, ctx.vpWidth / dpr);
    const barSpaceCss = matrix[1];
    gl.uniform1f(ctx.uniforms.ohlcBar.barSpace, barSpaceCss);
    const rightOffset = (matrix[12] + 1) / matrix[0] + count;
    gl.uniform1f(ctx.uniforms.ohlcBar.rightOffset, rightOffset);
    gl.uniform1f(ctx.uniforms.ohlcBar.dpr, dpr);
    gl.uniform2f(ctx.uniforms.ohlcBar.viewportSize, ctx.vpWidth, ctx.vpHeight);

    const bodyWidthCss = figure.styles?.width || optimalCandlestickWidth(barSpaceCss, dpr);
    gl.uniform1f(ctx.uniforms.ohlcBar.bodyWidth, bodyWidthCss * dpr);

    const bullColor = figure.styles?.bullColor || '#26A69A';
    const bearColor = figure.styles?.bearColor || '#EF5350';
    gl.uniform4fv(ctx.uniforms.ohlcBar.bullColor, ctx.cssColorToFloat4(bullColor));
    gl.uniform4fv(ctx.uniforms.ohlcBar.bearColor, ctx.cssColorToFloat4(bearColor));

    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.quadVbo);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.candleDataVbo);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 20, 0);
    gl.vertexAttribDivisor(1, 1);

    gl.enableVertexAttribArray(2);
    gl.vertexAttribIPointer(2, 1, gl.UNSIGNED_INT, 20, 16);
    gl.vertexAttribDivisor(2, 1);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Mode 0: Stem (High to Low)
    gl.uniform1i(ctx.uniforms.ohlcBar.mode, 0);
    gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, validCount);

    // Mode 1: Open Tick (Left)
    gl.uniform1i(ctx.uniforms.ohlcBar.mode, 1);
    gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, validCount);

    // Mode 2: Close Tick (Right)
    gl.uniform1i(ctx.uniforms.ohlcBar.mode, 2);
    gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, validCount);
}
