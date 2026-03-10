/**
 * Shared types for ZenithRenderer layer extraction.
 *
 * Each render layer is a standalone function that receives a RendererContext
 * containing all the GL resources it needs (programs, uniforms, VBOs, textures).
 * This avoids "god class" coupling while keeping zero-allocation rendering.
 */

import { ZenithSchema } from '../ZenithSchema';

// Re-export constants for layer convenience
export const FC = ZenithSchema.FIELD_COUNT;
export const O = ZenithSchema.OFFSETS;
export const MAX_BARS = 100000;
export const MAX_LIQS = 10000;

/** Per-layer enable/disable flags */
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

/**
 * Shared GL resources that every layer can read from.
 * Constructed once by ZenithRenderer, passed to layer functions.
 */
export interface RendererContext {
    gl: WebGL2RenderingContext;
    vpWidth: number;
    vpHeight: number;

    // Shader programs
    programs: {
        candle: WebGLProgram;
        heatmap: WebGLProgram;
        liq: WebGLProgram;
        footprint: WebGLProgram;
        histogram: WebGLProgram;
        lobHeatmap: WebGLProgram;
        depthOverlay: WebGLProgram;
        indicator: WebGLProgram;
        shm: WebGLProgram;
        grid: WebGLProgram;
        barFigure: WebGLProgram;
        circleFigure: WebGLProgram;
        band: WebGLProgram;
        area: WebGLProgram;
        hline: WebGLProgram;
        ohlcBar: WebGLProgram;
        baselineArea: WebGLProgram;
        baselineLine: WebGLProgram;
        vline: WebGLProgram;
        bgshade: WebGLProgram;
    };

    // Cached uniform locations (resolved once at init)
    uniforms: Record<string, Record<string, WebGLUniformLocation>>;

    // Persistent VBOs
    vao: WebGLVertexArrayObject;
    quadVbo: WebGLBuffer;
    candleDataVbo: WebGLBuffer;
    heatmapQuadVbo: WebGLBuffer;
    liqDataVbo: WebGLBuffer;
    footprintDataVbo: WebGLBuffer;
    indicatorDataVbo: WebGLBuffer;
    gridDataVbo: WebGLBuffer;

    // Pre-allocated staging arrays (zero per-frame allocation)
    candleStaging: Float32Array;
    heatmapQuadStaging: Float32Array;
    footprintStaging: Float32Array;
    indicatorStaging: Float32Array;
    gridStaging: Float32Array;

    // Persistent textures
    heatmapTexture: WebGLTexture;
    buyDensityTexture: WebGLTexture;
    sellDensityTexture: WebGLTexture;
    histogramTexture: WebGLTexture;
    lobDensityTexture: WebGLTexture;
    shmTexture: WebGLTexture;

    // Identity matrix
    identity: Float32Array;

    // Layer toggles
    layers: RenderLayerFlags;

    // Pattern settings
    patternSettings: {
        showNecklines: boolean;
        showTargets: boolean;
        showStops: boolean;
        tf15m: boolean;
        tf1h: boolean;
        tf4h: boolean;
    };

    // Helper methods
    indexToNdcX(dataIndex: number, matrix: Float32Array): number;
    priceToNdcY(price: number, matrix: Float32Array): number;
    cssColorToFloat4(css: string): Float32Array;
    createR32FTexture(filter: number): WebGLTexture;
}
