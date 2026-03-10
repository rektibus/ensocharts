/**
 * ZenithRenderer.ts — High-performance WebGL2 market data renderer.
 *
 * Thin wrapper that owns GL state (programs, uniforms, VBOs, textures)
 * and delegates all rendering to extracted layer functions in `zenith/layers/`.
 *
 * DESIGN PRINCIPLES (DI-18 through DI-24):
 * - PERSISTENT VBOs: All buffers created once at init, updated via bufferSubData
 * - ZERO-ALLOCATION RENDER: Pre-allocated staging arrays, no per-frame JS objects
 * - DUAL COORDINATE SYSTEM: Index-based X → NDC, price-based Y → NDC
 * - INSTANCED RENDERING: Candles/liqs use per-instance buffers
 * - WASM INTEGRATION: SAB provides Float64Array bar data, WASM manages indicators
 */
import * as Shaders from './ZenithShaders';
// import { ZenithSchema } from './ZenithSchema';
import type { Chart } from '../index';
import type { RendererContext } from './layers/types';
import {
    renderCandles as _renderCandles,
    renderHeatmap as _renderHeatmap,
    renderLiquidations as _renderLiquidations,
    renderFootprint as _renderFootprint,
    renderHistograms as _renderHistograms,
    renderLobHeatmap as _renderLobHeatmap,
    renderDepthOverlay as _renderDepthOverlay,
    renderGrid as _renderGrid,
    renderSHM as _renderSHM,
    renderAllIndicators as _renderAllIndicators,
    renderCrosshair as _renderCrosshair,
    renderHorizontalLine as _renderHorizontalLine,
    renderVerticalLine as _renderVerticalLine,
    renderHighlightBar as _renderHighlightBar,
    renderBackgroundShade as _renderBackgroundShade,
} from './layers';

// const FC = ZenithSchema.FIELD_COUNT;
// const O = ZenithSchema.OFFSETS;

// Maximum bars/liq the renderer can handle without reallocation
const MAX_BARS = 100000;
const MAX_LIQS = 10000;

/** Per-layer enable/disable flags (DI-22) */
export interface RenderLayerFlags {
    candles: boolean;
    heatmap: boolean;
    footprint: boolean;
    histogram: boolean;
    liquidations: boolean;
    lobHeatmap: boolean;
    depthOverlay: boolean;
    indicators: boolean;
    heatmapPixelated: boolean;
    shm: boolean;
    patterns: boolean;
}



export class ZenithRenderer {
    private gl: WebGL2RenderingContext;

    // ─── Shader programs ───
    private candleProgram: WebGLProgram;
    private heatmapProgram: WebGLProgram;
    private liqProgram: WebGLProgram;
    private footprintProgram: WebGLProgram;
    private histogramProgram: WebGLProgram;
    private lobHeatmapProgram: WebGLProgram;
    private depthOverlayProgram: WebGLProgram;
    private indicatorProgram: WebGLProgram;
    private shmProgram: WebGLProgram;
    private gridProgram: WebGLProgram;
    private barFigureProgram: WebGLProgram;
    private circleFigureProgram: WebGLProgram;
    private bandProgram: WebGLProgram;
    private areaProgram: WebGLProgram;
    private hlineProgram: WebGLProgram;
    private ohlcBarProgram: WebGLProgram;
    private baselineAreaProgram: WebGLProgram;
    private baselineLineProgram: WebGLProgram;
    private vlineProgram: WebGLProgram;
    private bgshadeProgram: WebGLProgram;

    // ─── Cached uniform locations (W8 fix) ───
    private uniforms: {
        candle: {
            scaleY: WebGLUniformLocation; transY: WebGLUniformLocation;
            totalBarSpace: WebGLUniformLocation; barSpace: WebGLUniformLocation;
            rightOffset: WebGLUniformLocation; bodyWidth: WebGLUniformLocation;
            wickWidth: WebGLUniformLocation; dpr: WebGLUniformLocation;
            viewportSize: WebGLUniformLocation; mode: WebGLUniformLocation;
            borderWidth: WebGLUniformLocation;
            bullColor: WebGLUniformLocation; bearColor: WebGLUniformLocation;
            bullBorderColor: WebGLUniformLocation; bearBorderColor: WebGLUniformLocation
        };
        grid: {
            direction: WebGLUniformLocation; canvasW: WebGLUniformLocation; canvasH: WebGLUniformLocation;
            lineWidth: WebGLUniformLocation; gridColor: WebGLUniformLocation
        };
        heatmap: { matrix: WebGLUniformLocation; time: WebGLUniformLocation };
        liq: { matrix: WebGLUniformLocation };
        footprint: { matrix: WebGLUniformLocation; buyTex: WebGLUniformLocation; sellTex: WebGLUniformLocation };
        histogram: { side: WebGLUniformLocation; color: WebGLUniformLocation; profile: WebGLUniformLocation };
        lobHeatmap: { matrix: WebGLUniformLocation; lobTex: WebGLUniformLocation; midPrice: WebGLUniformLocation; range: WebGLUniformLocation };
        depthOverlay: { matrix: WebGLUniformLocation; lobTex: WebGLUniformLocation; midPrice: WebGLUniformLocation; range: WebGLUniformLocation };
        indicator: { matrix: WebGLUniformLocation; barWidth: WebGLUniformLocation; color: WebGLUniformLocation; dpr: WebGLUniformLocation; viewportSize: WebGLUniformLocation };
        shm: { texture: WebGLUniformLocation; matrix: WebGLUniformLocation };
        barFigure: { scaleY: WebGLUniformLocation; transY: WebGLUniformLocation; baseline: WebGLUniformLocation; color: WebGLUniformLocation; dpr: WebGLUniformLocation; viewportSize: WebGLUniformLocation };
        circleFigure: { scaleY: WebGLUniformLocation; transY: WebGLUniformLocation; radius: WebGLUniformLocation; color: WebGLUniformLocation; viewportSize: WebGLUniformLocation };
        band: { scaleY: WebGLUniformLocation; transY: WebGLUniformLocation; dpr: WebGLUniformLocation; viewportSize: WebGLUniformLocation; fillColor: WebGLUniformLocation; lineColor: WebGLUniformLocation };
        area: { scaleY: WebGLUniformLocation; transY: WebGLUniformLocation; baseline: WebGLUniformLocation; dpr: WebGLUniformLocation; viewportSize: WebGLUniformLocation; fillColor: WebGLUniformLocation };
        hline: { priceY: WebGLUniformLocation; scaleY: WebGLUniformLocation; transY: WebGLUniformLocation; dpr: WebGLUniformLocation; viewportSize: WebGLUniformLocation; lineWidth: WebGLUniformLocation; color: WebGLUniformLocation };
        ohlcBar: { scaleY: WebGLUniformLocation; transY: WebGLUniformLocation; totalBarSpace: WebGLUniformLocation; barSpace: WebGLUniformLocation; rightOffset: WebGLUniformLocation; bodyWidth: WebGLUniformLocation; dpr: WebGLUniformLocation; viewportSize: WebGLUniformLocation; mode: WebGLUniformLocation; bullColor: WebGLUniformLocation; bearColor: WebGLUniformLocation };
        baselineArea: { scaleY: WebGLUniformLocation; transY: WebGLUniformLocation; baseline: WebGLUniformLocation; viewportSize: WebGLUniformLocation; topFillColor: WebGLUniformLocation; bottomFillColor: WebGLUniformLocation };
        baselineLine: { scaleY: WebGLUniformLocation; transY: WebGLUniformLocation; baseline: WebGLUniformLocation; viewportSize: WebGLUniformLocation; topLineColor: WebGLUniformLocation; bottomLineColor: WebGLUniformLocation };
        vline: { xNdc: WebGLUniformLocation; dpr: WebGLUniformLocation; viewportSize: WebGLUniformLocation; lineWidth: WebGLUniformLocation; color: WebGLUniformLocation };
        bgshade: { x0Ndc: WebGLUniformLocation; x1Ndc: WebGLUniformLocation; dpr: WebGLUniformLocation; viewportSize: WebGLUniformLocation; color: WebGLUniformLocation };
    };

    // ─── Persistent VBOs (W1/W7 fix) ───
    private quadVbo: WebGLBuffer;
    private candleDataVbo: WebGLBuffer;
    private heatmapQuadVbo: WebGLBuffer;
    private liqDataVbo: WebGLBuffer;
    private footprintDataVbo: WebGLBuffer;
    private indicatorDataVbo: WebGLBuffer;
    private vao: WebGLVertexArrayObject;
    private gridDataVbo: WebGLBuffer;

    // ─── Pre-allocated staging arrays (W2 fix) ───
    private candleStaging: Float32Array;
    private heatmapQuadStaging: Float32Array;
    private footprintStaging: Float32Array;
    private indicatorStaging: Float32Array;
    private gridStaging: Float32Array;
    private _identity: Float32Array;

    // ─── Textures (persistent) ───
    private heatmapTexture: WebGLTexture;
    private buyDensityTexture: WebGLTexture;
    private sellDensityTexture: WebGLTexture;
    private histogramTexture: WebGLTexture;
    private lobDensityTexture: WebGLTexture;
    private shmTexture: WebGLTexture;

    // ─── Layer toggles (W12 fix) ───
    public layers: RenderLayerFlags = {
        candles: true,
        heatmap: true,
        footprint: false,
        histogram: true,
        liquidations: true,
        lobHeatmap: true,
        depthOverlay: true,
        indicators: true,
        heatmapPixelated: false, // false = smooth (Bookmap), true = discrete grid (Coinglass)
        shm: true,
        patterns: true,
    };

    // Pattern-specific rendering sub-settings (set by ChartPane.applySettings)
    public patternSettings = {
        showNecklines: true,
        showTargets: true,
        showStops: true,
        tf15m: true,
        tf1h: true,
        tf4h: true,
    };

    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;

        // ─── Compile all shader programs ───
        this.candleProgram = this.createProgram(Shaders.CANDLE_VS, Shaders.CANDLE_FS);
        this.heatmapProgram = this.createProgram(Shaders.HEATMAP_VS, Shaders.HEATMAP_FS);
        this.liqProgram = this.createProgram(Shaders.LIQ_VS, Shaders.LIQ_FS);
        this.footprintProgram = this.createProgram(Shaders.FOOTPRINT_VS, Shaders.FOOTPRINT_FS);
        this.histogramProgram = this.createProgram(Shaders.HISTOGRAM_VS, Shaders.HISTOGRAM_FS);
        this.lobHeatmapProgram = this.createProgram(Shaders.LOB_HEATMAP_VS, Shaders.LOB_HEATMAP_FS);
        this.depthOverlayProgram = this.createProgram(Shaders.DEPTH_OVERLAY_VS, Shaders.DEPTH_OVERLAY_FS);
        this.indicatorProgram = this.createProgram(Shaders.INDICATOR_VS, Shaders.INDICATOR_FS);
        this.shmProgram = this.createProgram(Shaders.SHM_VS, Shaders.SHM_FS);
        this.gridProgram = this.createProgram(Shaders.GRID_VS, Shaders.GRID_FS);
        this.barFigureProgram = this.createProgram(Shaders.BAR_FIGURE_VS, Shaders.BAR_FIGURE_FS);
        this.circleFigureProgram = this.createProgram(Shaders.CIRCLE_FIGURE_VS, Shaders.CIRCLE_FIGURE_FS);
        this.bandProgram = this.createProgram(Shaders.BAND_VS, Shaders.BAND_FS);
        this.areaProgram = this.createProgram(Shaders.AREA_VS, Shaders.AREA_FS);
        this.hlineProgram = this.createProgram(Shaders.HLINE_VS, Shaders.HLINE_FS);
        this.ohlcBarProgram = this.createProgram(Shaders.OHLC_BAR_VS, Shaders.OHLC_BAR_FS);
        this.baselineAreaProgram = this.createProgram(Shaders.BASELINE_AREA_VS, Shaders.BASELINE_AREA_FS);
        this.baselineLineProgram = this.createProgram(Shaders.BASELINE_LINE_VS, Shaders.BASELINE_LINE_FS);
        this.vlineProgram = this.createProgram(Shaders.VLINE_VS, Shaders.VLINE_FS);
        this.bgshadeProgram = this.createProgram(Shaders.BGSHADE_VS, Shaders.BGSHADE_FS);

        // ─── Cache ALL uniform locations once (W8 fix) ───
        this.uniforms = {
            candle: {
                scaleY: gl.getUniformLocation(this.candleProgram, 'u_scaleY')!,
                transY: gl.getUniformLocation(this.candleProgram, 'u_transY')!,
                totalBarSpace: gl.getUniformLocation(this.candleProgram, 'u_totalBarSpace')!,
                barSpace: gl.getUniformLocation(this.candleProgram, 'u_barSpace')!,
                rightOffset: gl.getUniformLocation(this.candleProgram, 'u_rightOffset')!,
                bodyWidth: gl.getUniformLocation(this.candleProgram, 'u_bodyWidth')!,
                wickWidth: gl.getUniformLocation(this.candleProgram, 'u_wickWidth')!,
                dpr: gl.getUniformLocation(this.candleProgram, 'u_dpr')!,
                viewportSize: gl.getUniformLocation(this.candleProgram, 'u_viewportSize')!,
                mode: gl.getUniformLocation(this.candleProgram, 'u_mode')!,
                borderWidth: gl.getUniformLocation(this.candleProgram, 'u_borderWidth')!,
                bullColor: gl.getUniformLocation(this.candleProgram, 'u_bullColor')!,
                bearColor: gl.getUniformLocation(this.candleProgram, 'u_bearColor')!,
                bullBorderColor: gl.getUniformLocation(this.candleProgram, 'u_bullBorderColor')!,
                bearBorderColor: gl.getUniformLocation(this.candleProgram, 'u_bearBorderColor')!
            },
            grid: {
                direction: gl.getUniformLocation(this.gridProgram, 'u_direction')!,
                canvasW: gl.getUniformLocation(this.gridProgram, 'u_canvasW')!,
                canvasH: gl.getUniformLocation(this.gridProgram, 'u_canvasH')!,
                lineWidth: gl.getUniformLocation(this.gridProgram, 'u_lineWidth')!,
                gridColor: gl.getUniformLocation(this.gridProgram, 'u_gridColor')!
            },
            heatmap: {
                matrix: gl.getUniformLocation(this.heatmapProgram, 'u_matrix')!,
                time: gl.getUniformLocation(this.heatmapProgram, 'u_time')!
            },
            liq: {
                matrix: gl.getUniformLocation(this.liqProgram, 'u_matrix')!
            },
            footprint: {
                matrix: gl.getUniformLocation(this.footprintProgram, 'u_matrix')!,
                buyTex: gl.getUniformLocation(this.footprintProgram, 'u_buy_v')!,
                sellTex: gl.getUniformLocation(this.footprintProgram, 'u_sell_v')!
            },
            histogram: {
                side: gl.getUniformLocation(this.histogramProgram, 'u_side')!,
                color: gl.getUniformLocation(this.histogramProgram, 'u_color')!,
                profile: gl.getUniformLocation(this.histogramProgram, 'u_profile')!
            },
            lobHeatmap: {
                matrix: gl.getUniformLocation(this.lobHeatmapProgram, 'u_matrix')!,
                lobTex: gl.getUniformLocation(this.lobHeatmapProgram, 'u_lob_density')!,
                midPrice: gl.getUniformLocation(this.lobHeatmapProgram, 'u_mid_price')!,
                range: gl.getUniformLocation(this.lobHeatmapProgram, 'u_range')!
            },
            depthOverlay: {
                matrix: gl.getUniformLocation(this.depthOverlayProgram, 'u_matrix')!,
                lobTex: gl.getUniformLocation(this.depthOverlayProgram, 'u_lob_density')!,
                midPrice: gl.getUniformLocation(this.depthOverlayProgram, 'u_mid_price')!,
                range: gl.getUniformLocation(this.depthOverlayProgram, 'u_range')!
            },
            indicator: {
                matrix: gl.getUniformLocation(this.indicatorProgram, 'u_matrix')!,
                barWidth: gl.getUniformLocation(this.indicatorProgram, 'u_barWidth')!,
                color: gl.getUniformLocation(this.indicatorProgram, 'u_color')!,
                dpr: gl.getUniformLocation(this.indicatorProgram, 'u_dpr')!,
                viewportSize: gl.getUniformLocation(this.indicatorProgram, 'u_viewportSize')!
            },
            shm: {
                texture: gl.getUniformLocation(this.shmProgram, 'u_shm')!,
                matrix: gl.getUniformLocation(this.shmProgram, 'u_matrix')!
            },
            barFigure: {
                scaleY: gl.getUniformLocation(this.barFigureProgram, 'u_scaleY')!,
                transY: gl.getUniformLocation(this.barFigureProgram, 'u_transY')!,
                baseline: gl.getUniformLocation(this.barFigureProgram, 'u_baseline')!,
                color: gl.getUniformLocation(this.barFigureProgram, 'u_color')!,
                dpr: gl.getUniformLocation(this.barFigureProgram, 'u_dpr')!,
                viewportSize: gl.getUniformLocation(this.barFigureProgram, 'u_viewportSize')!
            },
            circleFigure: {
                scaleY: gl.getUniformLocation(this.circleFigureProgram, 'u_scaleY')!,
                transY: gl.getUniformLocation(this.circleFigureProgram, 'u_transY')!,
                radius: gl.getUniformLocation(this.circleFigureProgram, 'u_radius')!,
                color: gl.getUniformLocation(this.circleFigureProgram, 'u_color')!,
                viewportSize: gl.getUniformLocation(this.circleFigureProgram, 'u_viewportSize')!
            },
            band: {
                scaleY: gl.getUniformLocation(this.bandProgram, 'u_scaleY')!,
                transY: gl.getUniformLocation(this.bandProgram, 'u_transY')!,
                dpr: gl.getUniformLocation(this.bandProgram, 'u_dpr')!,
                viewportSize: gl.getUniformLocation(this.bandProgram, 'u_viewportSize')!,
                fillColor: gl.getUniformLocation(this.bandProgram, 'u_fillColor')!,
                lineColor: gl.getUniformLocation(this.bandProgram, 'u_lineColor')!
            },
            area: {
                scaleY: gl.getUniformLocation(this.areaProgram, 'u_scaleY')!,
                transY: gl.getUniformLocation(this.areaProgram, 'u_transY')!,
                baseline: gl.getUniformLocation(this.areaProgram, 'u_baseline')!,
                dpr: gl.getUniformLocation(this.areaProgram, 'u_dpr')!,
                viewportSize: gl.getUniformLocation(this.areaProgram, 'u_viewportSize')!,
                fillColor: gl.getUniformLocation(this.areaProgram, 'u_fillColor')!
            },
            hline: {
                priceY: gl.getUniformLocation(this.hlineProgram, 'u_priceY')!,
                scaleY: gl.getUniformLocation(this.hlineProgram, 'u_scaleY')!,
                transY: gl.getUniformLocation(this.hlineProgram, 'u_transY')!,
                dpr: gl.getUniformLocation(this.hlineProgram, 'u_dpr')!,
                viewportSize: gl.getUniformLocation(this.hlineProgram, 'u_viewportSize')!,
                lineWidth: gl.getUniformLocation(this.hlineProgram, 'u_lineWidth')!,
                color: gl.getUniformLocation(this.hlineProgram, 'u_color')!
            },
            ohlcBar: {
                scaleY: gl.getUniformLocation(this.ohlcBarProgram, 'u_scaleY')!,
                transY: gl.getUniformLocation(this.ohlcBarProgram, 'u_transY')!,
                totalBarSpace: gl.getUniformLocation(this.ohlcBarProgram, 'u_totalBarSpace')!,
                barSpace: gl.getUniformLocation(this.ohlcBarProgram, 'u_barSpace')!,
                rightOffset: gl.getUniformLocation(this.ohlcBarProgram, 'u_rightOffset')!,
                bodyWidth: gl.getUniformLocation(this.ohlcBarProgram, 'u_bodyWidth')!,
                dpr: gl.getUniformLocation(this.ohlcBarProgram, 'u_dpr')!,
                viewportSize: gl.getUniformLocation(this.ohlcBarProgram, 'u_viewportSize')!,
                mode: gl.getUniformLocation(this.ohlcBarProgram, 'u_mode')!,
                bullColor: gl.getUniformLocation(this.ohlcBarProgram, 'u_bullColor')!,
                bearColor: gl.getUniformLocation(this.ohlcBarProgram, 'u_bearColor')!
            },
            baselineArea: {
                scaleY: gl.getUniformLocation(this.baselineAreaProgram, 'u_scaleY')!,
                transY: gl.getUniformLocation(this.baselineAreaProgram, 'u_transY')!,
                baseline: gl.getUniformLocation(this.baselineAreaProgram, 'u_baseline')!,
                viewportSize: gl.getUniformLocation(this.baselineAreaProgram, 'u_viewportSize')!,
                topFillColor: gl.getUniformLocation(this.baselineAreaProgram, 'u_topFillColor')!,
                bottomFillColor: gl.getUniformLocation(this.baselineAreaProgram, 'u_bottomFillColor')!
            },
            baselineLine: {
                scaleY: gl.getUniformLocation(this.baselineLineProgram, 'u_scaleY')!,
                transY: gl.getUniformLocation(this.baselineLineProgram, 'u_transY')!,
                baseline: gl.getUniformLocation(this.baselineLineProgram, 'u_baseline')!,
                viewportSize: gl.getUniformLocation(this.baselineLineProgram, 'u_viewportSize')!,
                topLineColor: gl.getUniformLocation(this.baselineLineProgram, 'u_topLineColor')!,
                bottomLineColor: gl.getUniformLocation(this.baselineLineProgram, 'u_bottomLineColor')!
            },
            vline: {
                xNdc: gl.getUniformLocation(this.vlineProgram, 'u_xNdc')!,
                dpr: gl.getUniformLocation(this.vlineProgram, 'u_dpr')!,
                viewportSize: gl.getUniformLocation(this.vlineProgram, 'u_viewportSize')!,
                lineWidth: gl.getUniformLocation(this.vlineProgram, 'u_lineWidth')!,
                color: gl.getUniformLocation(this.vlineProgram, 'u_color')!
            },
            bgshade: {
                x0Ndc: gl.getUniformLocation(this.bgshadeProgram, 'u_x0Ndc')!,
                x1Ndc: gl.getUniformLocation(this.bgshadeProgram, 'u_x1Ndc')!,
                dpr: gl.getUniformLocation(this.bgshadeProgram, 'u_dpr')!,
                viewportSize: gl.getUniformLocation(this.bgshadeProgram, 'u_viewportSize')!,
                color: gl.getUniformLocation(this.bgshadeProgram, 'u_color')!
            }
        };

        // ─── Create persistent VBOs (W1/W7 fix) ───
        this.vao = gl.createVertexArray()!;

        // Unit quad for instancing (static — never changes)
        const quad = new Float32Array([-0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5]);
        this.quadVbo = gl.createBuffer()!;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.quadVbo);
        gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

        // Dynamic VBOs — pre-allocated at max size, updated via bufferSubData
        this.candleDataVbo = gl.createBuffer()!;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.candleDataVbo);
        gl.bufferData(gl.ARRAY_BUFFER, MAX_BARS * 6 * 4, gl.DYNAMIC_DRAW);

        this.heatmapQuadVbo = gl.createBuffer()!;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.heatmapQuadVbo);
        gl.bufferData(gl.ARRAY_BUFFER, 16 * 4, gl.DYNAMIC_DRAW);

        this.liqDataVbo = gl.createBuffer()!;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.liqDataVbo);
        gl.bufferData(gl.ARRAY_BUFFER, MAX_LIQS * 4 * 4, gl.DYNAMIC_DRAW);

        this.footprintDataVbo = gl.createBuffer()!;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.footprintDataVbo);
        gl.bufferData(gl.ARRAY_BUFFER, MAX_BARS * 4 * 4, gl.DYNAMIC_DRAW);

        this.indicatorDataVbo = gl.createBuffer()!;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.indicatorDataVbo);
        // Indicators are X, Y per point. 2 floats per point.
        gl.bufferData(gl.ARRAY_BUFFER, MAX_BARS * 2 * 4, gl.DYNAMIC_DRAW);

        this.gridDataVbo = gl.createBuffer()!;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.gridDataVbo);
        gl.bufferData(gl.ARRAY_BUFFER, 64 * 4, gl.DYNAMIC_DRAW); // max 64 lines

        // ─── Pre-allocated staging arrays (W2 fix) ───
        this.candleStaging = new Float32Array(MAX_BARS * 6);
        this.heatmapQuadStaging = new Float32Array(16);
        this.footprintStaging = new Float32Array(MAX_BARS * 4);
        this.indicatorStaging = new Float32Array(MAX_BARS * 6); // Max 6 floats per bar needed by band rendering
        this.gridStaging = new Float32Array(64); // max 64 grid lines per direction

        // ─── Create persistent textures ───
        this.heatmapTexture = this.createR32FTexture(gl.LINEAR);
        this.buyDensityTexture = this.createR32FTexture(gl.NEAREST);
        this.sellDensityTexture = this.createR32FTexture(gl.NEAREST);
        this.histogramTexture = this.createR32FTexture(gl.LINEAR);
        this.lobDensityTexture = this.createR32FTexture(gl.LINEAR);
        this.shmTexture = this.createR32FTexture(gl.NEAREST); // NEAREST for discrete pixel cells

        // Identity matrix for renderers that compute NDC on the JS side
        this._identity = new Float32Array([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
    }

    // ─── Coordinate helpers: index-based X, price-based Y → NDC ───

    private indexToNdcX(dataIndex: number, matrix: Float32Array): number {
        const totalBarSpace = matrix[0];
        const barSpace = matrix[1];
        const rightOffset = matrix[2];
        const xPx = totalBarSpace - (rightOffset - dataIndex - 0.5) * barSpace;
        return xPx / totalBarSpace * 2.0 - 1.0;
    }

    private priceToNdcY(price: number, matrix: Float32Array): number {
        return price * matrix[5] + matrix[13];
    }

    // ─── Context Builder ───
    // Exposes the class's private GL state as a RendererContext
    // that standalone layer functions can consume.

    private vpWidth: number = 0;
    private vpHeight: number = 0;

    setViewportSize(w: number, h: number) {
        this.vpWidth = Math.max(1, w);
        this.vpHeight = Math.max(1, h);
        if (this._ctx) {
            this._ctx.vpWidth = this.vpWidth || this.gl.drawingBufferWidth;
            this._ctx.vpHeight = this.vpHeight || this.gl.drawingBufferHeight;
        }
    }

    private _ctx: RendererContext | null = null;

    getContext(): RendererContext {
        if (this._ctx) return this._ctx;
        this._ctx = {
            gl: this.gl,
            vpWidth: this.vpWidth || this.gl.drawingBufferWidth,
            vpHeight: this.vpHeight || this.gl.drawingBufferHeight,
            programs: {
                candle: this.candleProgram,
                heatmap: this.heatmapProgram,
                liq: this.liqProgram,
                footprint: this.footprintProgram,
                histogram: this.histogramProgram,
                lobHeatmap: this.lobHeatmapProgram,
                depthOverlay: this.depthOverlayProgram,
                indicator: this.indicatorProgram,
                shm: this.shmProgram,
                grid: this.gridProgram,
                barFigure: this.barFigureProgram,
                circleFigure: this.circleFigureProgram,
                band: this.bandProgram,
                area: this.areaProgram,
                hline: this.hlineProgram,
                ohlcBar: this.ohlcBarProgram,
                baselineArea: this.baselineAreaProgram,
                baselineLine: this.baselineLineProgram,
                vline: this.vlineProgram,
                bgshade: this.bgshadeProgram,
            },
            uniforms: this.uniforms as any,
            vao: this.vao,
            quadVbo: this.quadVbo,
            candleDataVbo: this.candleDataVbo,
            heatmapQuadVbo: this.heatmapQuadVbo,
            liqDataVbo: this.liqDataVbo,
            footprintDataVbo: this.footprintDataVbo,
            indicatorDataVbo: this.indicatorDataVbo,
            gridDataVbo: this.gridDataVbo,
            candleStaging: this.candleStaging,
            heatmapQuadStaging: this.heatmapQuadStaging,
            footprintStaging: this.footprintStaging,
            indicatorStaging: this.indicatorStaging,
            gridStaging: this.gridStaging,
            heatmapTexture: this.heatmapTexture,
            buyDensityTexture: this.buyDensityTexture,
            sellDensityTexture: this.sellDensityTexture,
            histogramTexture: this.histogramTexture,
            lobDensityTexture: this.lobDensityTexture,
            shmTexture: this.shmTexture,
            identity: this._identity,
            layers: this.layers,
            patternSettings: this.patternSettings,
            indexToNdcX: this.indexToNdcX.bind(this),
            priceToNdcY: this.priceToNdcY.bind(this),
            cssColorToFloat4: this.cssColorToFloat4.bind(this),
            createR32FTexture: this.createR32FTexture.bind(this),
        };
        return this._ctx;
    }

    // ─── Main Render Entry Point ───

    render(symbol: string, wasmState: any, matrix: Float32Array, chart?: Chart) {
        const storeId = wasmState.getStoreId?.(symbol);
        if (storeId === undefined) return;
        const count = wasmState.getBarCount?.(symbol) || 0;
        if (count === 0) return;
        const ctx = this.getContext();

        if (this.layers.candles) _renderCandles(ctx, storeId, wasmState, count, matrix);
        if (this.layers.heatmap) _renderHeatmap(ctx, storeId, wasmState, count, matrix);
        if (this.layers.liquidations) _renderLiquidations(ctx, storeId, wasmState, count, matrix);
        if (this.layers.footprint) _renderFootprint(ctx, storeId, wasmState, count, matrix);
        if (this.layers.histogram) _renderHistograms(ctx, storeId, wasmState, count, matrix);
        if (this.layers.lobHeatmap) _renderLobHeatmap(ctx, storeId, wasmState, count, matrix);
        if (this.layers.depthOverlay) _renderDepthOverlay(ctx, storeId, wasmState, count, matrix);
        if (this.layers.shm) _renderSHM(ctx, storeId, wasmState, count, matrix);

        if (chart) _renderAllIndicators(ctx, chart, count, matrix);
    }

    // ─── Public API — Thin wrappers for external callers ───

    renderGrid(hTicks: number[], vTicks: number[], canvasW: number, canvasH: number) {
        _renderGrid(this.getContext(), hTicks, vTicks, canvasW, canvasH);
    }

    renderCrosshair(
        mouseXNdc: number, mousePriceY: number, matrix: Float32Array,
        color = 'rgba(255, 255, 255, 0.4)', lineWidth = 1
    ) {
        _renderCrosshair(this.getContext(), mouseXNdc, mousePriceY, matrix, color, lineWidth);
    }

    renderHorizontalLine(priceY: number, matrix: Float32Array, color = '#ffffff', lineWidth = 1) {
        _renderHorizontalLine(this.getContext(), priceY, matrix, color, lineWidth);
    }

    renderVerticalLine(xNdc: number, color = '#ffffff', lineWidth = 1) {
        _renderVerticalLine(this.getContext(), xNdc, color, lineWidth);
    }

    renderHighlightBar(barIndex: number, matrix: Float32Array, color = 'rgba(255, 255, 255, 0.06)') {
        _renderHighlightBar(this.getContext(), barIndex, matrix, color);
    }

    renderBackgroundShade(x0Ndc: number, x1Ndc: number, color = 'rgba(255, 255, 255, 0.05)') {
        _renderBackgroundShade(this.getContext(), x0Ndc, x1Ndc, color);
    }

    // ─── Color Utility (used by context + external callers) ───

    private cssColorToFloat4(css: string): Float32Array {
        const out = new Float32Array(4);
        if (css.startsWith('#')) {
            const hex = css.length === 4
                ? css[1] + css[1] + css[2] + css[2] + css[3] + css[3]
                : css.slice(1);
            out[0] = parseInt(hex.slice(0, 2), 16) / 255;
            out[1] = parseInt(hex.slice(2, 4), 16) / 255;
            out[2] = parseInt(hex.slice(4, 6), 16) / 255;
            out[3] = 1.0;
        } else {
            const m = css.match(/[\d.]+/g);
            if (m) {
                out[0] = parseFloat(m[0]) / 255;
                out[1] = parseFloat(m[1]) / 255;
                out[2] = parseFloat(m[2]) / 255;
                out[3] = m[3] ? parseFloat(m[3]) : 1.0;
            } else {
                out[0] = 0.16; out[1] = 0.67; out[2] = 0.53; out[3] = 1.0;
            }
        }
        return out;
    }

    // ─── GL Helpers ───

    private createR32FTexture(filter: number): WebGLTexture {
        const gl = this.gl;
        const tex = gl.createTexture()!;
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        return tex;
    }

    private createProgram(vs: string, fs: string): WebGLProgram {
        const gl = this.gl;
        const v = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(v, vs);
        gl.compileShader(v);
        if (!gl.getShaderParameter(v, gl.COMPILE_STATUS)) {
            console.error('[ZenithRenderer] VS compile error:', gl.getShaderInfoLog(v));
        }
        const f = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(f, fs);
        gl.compileShader(f);
        if (!gl.getShaderParameter(f, gl.COMPILE_STATUS)) {
            console.error('[ZenithRenderer] FS compile error:', gl.getShaderInfoLog(f));
        }
        const p = gl.createProgram()!;
        gl.attachShader(p, v);
        gl.attachShader(p, f);
        gl.linkProgram(p);
        if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
            console.error('[ZenithRenderer] Link error:', gl.getProgramInfoLog(p));
        }
        gl.detachShader(p, v);
        gl.detachShader(p, f);
        gl.deleteShader(v);
        gl.deleteShader(f);
        return p;
    }
}