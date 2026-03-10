/**
 * Grid, crosshair, highlight, and overlay rendering — extracted from ZenithRenderer.ts
 * Renders chart grid lines, crosshair, bar highlight, vertical lines, and background shades.
 */
import type { RendererContext } from './types';

export function renderGrid(ctx: RendererContext, hTicks: number[], vTicks: number[], canvasW: number, canvasH: number): void {
    const gl = ctx.gl;

    gl.useProgram(ctx.programs.grid);
    gl.uniform1f(ctx.uniforms.grid.canvasW, canvasW);
    gl.uniform1f(ctx.uniforms.grid.canvasH, canvasH);
    gl.uniform1f(ctx.uniforms.grid.lineWidth, 1.0);

    // Grid color — read from CSS or use a subtle default
    const root = document.documentElement;
    const gridCss = getComputedStyle(root).getPropertyValue('--enso-grid').trim();
    const gridRgb = gridCss ? ctx.cssColorToFloat4(gridCss) : new Float32Array([1, 1, 1, 0.06]);
    gl.uniform4fv(ctx.uniforms.grid.gridColor, gridRgb);

    gl.bindVertexArray(ctx.vao);

    // Quad vertices (location 0) — spans [-1,1]
    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.quadVbo);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(0, 0);

    // Instance data: tick coordinates (location 1)
    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.gridDataVbo);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 1, gl.FLOAT, false, 4, 0);
    gl.vertexAttribDivisor(1, 1);

    // Draw horizontal lines
    const nh = Math.min(hTicks.length, 64);
    if (nh > 0) {
        for (let i = 0; i < nh; i++) ctx.gridStaging[i] = hTicks[i];
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, ctx.gridStaging.subarray(0, nh));
        gl.uniform1i(ctx.uniforms.grid.direction, 0);
        gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, nh);
    }

    // Draw vertical lines
    const nv = Math.min(vTicks.length, 64);
    if (nv > 0) {
        for (let i = 0; i < nv; i++) ctx.gridStaging[i] = vTicks[i];
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, ctx.gridStaging.subarray(0, nv));
        gl.uniform1i(ctx.uniforms.grid.direction, 1);
        gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, nv);
    }
}

export function renderCrosshair(
    ctx: RendererContext,
    mouseXNdc: number,
    mousePriceY: number,
    matrix: Float32Array,
    color: string = 'rgba(255, 255, 255, 0.4)',
    lineWidth: number = 1
): void {
    renderHorizontalLine(ctx, mousePriceY, matrix, color, lineWidth);
    renderVerticalLine(ctx, mouseXNdc, color, lineWidth);
}

export function renderHorizontalLine(
    ctx: RendererContext,
    priceY: number,
    matrix: Float32Array,
    color: string = '#ffffff',
    lineWidth: number = 1
): void {
    const gl = ctx.gl;
    const u = ctx.uniforms.hline;
    const dpr = window.devicePixelRatio || 1;

    gl.useProgram(ctx.programs.hline);
    gl.uniform1f(u.priceY, priceY);
    gl.uniform1f(u.scaleY, matrix[5]);
    gl.uniform1f(u.transY, matrix[13]);
    gl.uniform1f(u.dpr, dpr);
    gl.uniform2f(u.viewportSize, ctx.vpWidth, ctx.vpHeight);
    gl.uniform1f(u.lineWidth, lineWidth);
    gl.uniform4fv(u.color, ctx.cssColorToFloat4(color));

    gl.bindVertexArray(ctx.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.quadVbo);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(0, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

export function renderVerticalLine(
    ctx: RendererContext,
    xNdc: number,
    color: string = '#ffffff',
    lineWidth: number = 1
): void {
    const gl = ctx.gl;
    const u = ctx.uniforms.vline;
    const dpr = window.devicePixelRatio || 1;

    gl.useProgram(ctx.programs.vline);
    gl.uniform1f(u.xNdc, xNdc);
    gl.uniform1f(u.dpr, dpr);
    gl.uniform2f(u.viewportSize, ctx.vpWidth, ctx.vpHeight);
    gl.uniform1f(u.lineWidth, lineWidth);
    gl.uniform4fv(u.color, ctx.cssColorToFloat4(color));

    gl.bindVertexArray(ctx.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.quadVbo);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(0, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

export function renderHighlightBar(
    ctx: RendererContext,
    barIndex: number,
    matrix: Float32Array,
    color: string = 'rgba(255, 255, 255, 0.06)'
): void {
    const x0 = ctx.indexToNdcX(barIndex - 0.5, matrix);
    const x1 = ctx.indexToNdcX(barIndex + 0.5, matrix);
    renderBackgroundShade(ctx, x0, x1, color);
}

export function renderBackgroundShade(
    ctx: RendererContext,
    x0Ndc: number,
    x1Ndc: number,
    color: string = 'rgba(255, 255, 255, 0.05)'
): void {
    const gl = ctx.gl;
    const u = ctx.uniforms.bgshade;
    const dpr = window.devicePixelRatio || 1;

    gl.useProgram(ctx.programs.bgshade);
    gl.uniform1f(u.x0Ndc, x0Ndc);
    gl.uniform1f(u.x1Ndc, x1Ndc);
    gl.uniform1f(u.dpr, dpr);
    gl.uniform2f(u.viewportSize, ctx.vpWidth, ctx.vpHeight);
    gl.uniform4fv(u.color, ctx.cssColorToFloat4(color));

    gl.bindVertexArray(ctx.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, ctx.quadVbo);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(0, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}
