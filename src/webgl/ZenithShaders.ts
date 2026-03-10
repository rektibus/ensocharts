/**
 * ZenithShaders.ts — All GLSL shader sources for the Zenith WebGL renderer.
 *
 * Centralized shader module (DI-21). Each primitive's vertex/fragment shader
 * is a named constant. No inline shader strings in the renderer.
 */

export const CANDLE_VS = `#version 300 es
    layout(location = 0) in vec2 a_pos;
    layout(location = 1) in vec4 a_ohlc;
    layout(location = 2) in uint a_flags;

    // Y-axis mapping (price → NDC)
    uniform float u_scaleY;
    uniform float u_transY;

    // X-axis mapping (index → pixel → NDC)
    uniform float u_totalBarSpace; // canvas width in CSS pixels
    uniform float u_barSpace;      // width per bar in CSS pixels
    uniform float u_rightOffset;   // dataCount + lastBarRightSideDiffBarCount

    // Pixel-perfect sizing (TradingView-inspired)
    uniform float u_bodyWidth;     // pre-computed optimal bar body width in device pixels
    uniform float u_wickWidth;     // pre-computed wick width in device pixels
    uniform float u_dpr;           // device pixel ratio
    uniform vec2 u_viewportSize;   // viewport in device pixels (width, height)

    uniform int u_mode; // 0 = body, 1 = wick, 2 = border
    uniform float u_borderWidth; // border thickness in device pixels
    uniform vec4 u_bullColor;
    uniform vec4 u_bearColor;
    uniform vec4 u_bullBorderColor;
    uniform vec4 u_bearBorderColor;
    out vec4 v_color;
    flat out float f_borderWidth;
    flat out vec4 f_bodyDevRect; // left, top, right, bottom in device pixels

    void main() {
        bool isBull = (a_flags & 1u) != 0u;

        float open = a_ohlc.x;
        float high = a_ohlc.y;
        float low = a_ohlc.z;
        float close = a_ohlc.w;

        // ── X: Index → CSS pixel → device pixel (snapped) → NDC ──
        float dataIndex = float(gl_InstanceID);
        float deltaFromRight = u_rightOffset - dataIndex;
        float xCss = u_totalBarSpace - (deltaFromRight - 0.5) * u_barSpace;
        float xDev = floor(xCss * u_dpr + 0.5);

        // Body rect in device pixels (always computed for border/body)
        float bodyTop_price = max(open, close);
        float bodyBottom_price = min(open, close);
        float ndcBT = bodyTop_price * u_scaleY + u_transY;
        float ndcBB = bodyBottom_price * u_scaleY + u_transY;
        float bodyDevTop = floor((1.0 - ndcBT) * 0.5 * u_viewportSize.y + 0.5);
        float bodyDevBottom = floor((1.0 - ndcBB) * 0.5 * u_viewportSize.y + 0.5);
        if (bodyDevBottom <= bodyDevTop) bodyDevBottom = bodyDevTop + 1.0;
        float bodyHalfW = floor(u_bodyWidth * 0.5);
        float bodyDevLeft = xDev - bodyHalfW;
        float bodyDevRight = xDev + bodyHalfW;

        float vertX, vertY;

        if (u_mode == 1) {
            // ── WICK: high/low, narrow width ──
            v_color = isBull ? u_bullColor : u_bearColor;
            float ndcH = high * u_scaleY + u_transY;
            float ndcL = low * u_scaleY + u_transY;
            float devTop = floor((1.0 - ndcH) * 0.5 * u_viewportSize.y + 0.5);
            float devBottom = floor((1.0 - ndcL) * 0.5 * u_viewportSize.y + 0.5);
            if (devBottom <= devTop) devBottom = devTop + 1.0;
            float wickHalfW = floor(u_wickWidth * 0.5);
            vertX = xDev + a_pos.x * wickHalfW * 2.0;
            vertY = mix(devTop, devBottom, a_pos.y + 0.5);
            f_borderWidth = 0.0;
            f_bodyDevRect = vec4(0.0);
        } else if (u_mode == 2) {
            // ── BORDER: body-sized rect, fragment shader hollows the inside ──
            v_color = isBull ? u_bullBorderColor : u_bearBorderColor;
            vertX = mix(bodyDevLeft, bodyDevRight, a_pos.x + 0.5);
            vertY = mix(bodyDevTop, bodyDevBottom, a_pos.y + 0.5);
            f_borderWidth = u_borderWidth;
            f_bodyDevRect = vec4(bodyDevLeft, bodyDevTop, bodyDevRight, bodyDevBottom);
        } else {
            // ── BODY: inset by border width ──
            v_color = isBull ? u_bullColor : u_bearColor;
            float inset = u_borderWidth;
            vertX = mix(bodyDevLeft + inset, bodyDevRight - inset, a_pos.x + 0.5);
            vertY = mix(bodyDevTop + inset, bodyDevBottom - inset, a_pos.y + 0.5);
            f_borderWidth = 0.0;
            f_bodyDevRect = vec4(0.0);
        }

        float ndc_x = vertX / u_viewportSize.x * 2.0 - 1.0;
        float ndc_y = 1.0 - vertY / u_viewportSize.y * 2.0;
        gl_Position = vec4(ndc_x, ndc_y, 0.0, 1.0);
    }
`;

export const CANDLE_FS = `#version 300 es
    precision highp float;
    in vec4 v_color;
    out vec4 outColor;
    void main() {
        outColor = v_color;
    }
`;

// ─── Grid Shaders ───

export const GRID_VS = `#version 300 es
    layout(location = 0) in vec2 a_pos;    // unit quad [-1,1]
    layout(location = 1) in float a_coord; // pixel coordinate of this grid line

    uniform int u_direction;    // 0 = horizontal (a_coord is Y pixel), 1 = vertical (a_coord is X pixel)
    uniform float u_canvasW;    // canvas width in CSS pixels
    uniform float u_canvasH;    // canvas height in CSS pixels
    uniform float u_lineWidth;  // line thickness in CSS pixels (typically 1.0)

    void main() {
        // Convert pixel coordinate to NDC
        float coordNdc;
        vec2 pos;

        if (u_direction == 0) {
            // Horizontal line: a_coord is Y pixel (0=top, H=bottom in DOM coords)
            // WebGL Y is flipped: NDC_y = 1.0 - 2.0 * pixelY / height
            coordNdc = 1.0 - 2.0 * a_coord / u_canvasH;
            float halfThickness = u_lineWidth / u_canvasH;
            pos.x = a_pos.x;  // spans full width [-1, 1]
            pos.y = coordNdc + a_pos.y * halfThickness;
        } else {
            // Vertical line: a_coord is X pixel (0=left, W=right)
            coordNdc = 2.0 * a_coord / u_canvasW - 1.0;
            float halfThickness = u_lineWidth / u_canvasW;
            pos.x = coordNdc + a_pos.x * halfThickness;
            pos.y = a_pos.y;  // spans full height [-1, 1]
        }

        gl_Position = vec4(pos, 0.0, 1.0);
    }
`;

export const GRID_FS = `#version 300 es
    precision highp float;
    uniform vec4 u_gridColor;
    out vec4 outColor;
    void main() {
        outColor = u_gridColor;
    }
`;

// ─── Heatmap Shaders ───

export const HEATMAP_VS = `#version 300 es
    layout(location = 0) in vec2 a_pos;
    layout(location = 1) in vec2 a_uv;
    uniform mat4 u_matrix;
    out vec2 v_uv;
    void main() {
        v_uv = a_uv;
        gl_Position = u_matrix * vec4(a_pos.x, a_pos.y, 0.0, 1.0);
    }
`;

export const HEATMAP_FS = `#version 300 es
    precision highp float;
    uniform sampler2D u_heatmap;
    uniform float u_time;
    in vec2 v_uv;
    out vec4 outColor;

    float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
    }

    // Viridis-inspired 6-stage ramp: deep purple → indigo → teal → green → yellow → hot white
    // Matches the Coinglass/Bookmap reference aesthetic
    vec3 getColorRamp(float t) {
        vec3 c1 = vec3(0.267, 0.004, 0.329);  // deep purple
        vec3 c2 = vec3(0.282, 0.140, 0.458);  // indigo
        vec3 c3 = vec3(0.127, 0.566, 0.551);  // teal
        vec3 c4 = vec3(0.267, 0.678, 0.341);  // green
        vec3 c5 = vec3(0.993, 0.906, 0.144);  // yellow
        vec3 c6 = vec3(1.0, 1.0, 1.0);        // hot white

        if (t < 0.15) return mix(c1, c2, t / 0.15);
        if (t < 0.30) return mix(c2, c3, (t - 0.15) / 0.15);
        if (t < 0.50) return mix(c3, c4, (t - 0.30) / 0.20);
        if (t < 0.75) return mix(c4, c5, (t - 0.50) / 0.25);
        return mix(c5, c6, (t - 0.75) / 0.25);
    }

    void main() {
        // Subtle noise displacement for organic feel
        float n = hash(v_uv * 200.0 + u_time * 0.005) * 0.003;
        vec2 noisyUv = v_uv + n;

        float intensity = texture(u_heatmap, noisyUv).r;
        if (intensity < 0.02) discard;

        // Gamma-adjusted intensity for more visible mid-tones
        float t = pow(clamp(intensity, 0.0, 1.0), 0.55);
        vec3 color = getColorRamp(t);

        // Stronger alpha for vibrant rendering, especially hot zones
        float alpha = smoothstep(0.0, 0.15, intensity) * 0.85;
        outColor = vec4(color * (1.0 + t * 0.3), alpha);
    }
`;

// ─── LOB Depth Overlay Heatmap Shaders ───

export const LOB_HEATMAP_VS = `#version 300 es
    layout(location = 0) in vec2 a_pos;
    layout(location = 1) in vec2 a_uv;
    uniform mat4 u_matrix;
    out vec2 v_uv;
    void main() {
        v_uv = a_uv;
        gl_Position = u_matrix * vec4(a_pos.x, a_pos.y, 0.0, 1.0);
    }
`;

export const LOB_HEATMAP_FS = `#version 300 es
    precision highp float;
    uniform sampler2D u_lob_density;
    uniform float u_mid_price;
    uniform float u_range;
    in vec2 v_uv;
    out vec4 outColor;
    
    void main() {
        // v_uv.y is time (horizontal across chart), v_uv.x maps to price from bottom to top
        // u_lob_density holds normalized bid/ask volumes at price buckets
        float density = texture(u_lob_density, v_uv).r;
        if (density < 0.01) discard;
        
        // Heatmap color mapping (Bids are green, Asks are red)
        // Price > mid = ask (red), Price < mid = bid (green)
        float currentPrice = u_mid_price + (v_uv.x - 0.5) * u_range;
        
        vec3 color = currentPrice > u_mid_price ? vec3(0.9, 0.2, 0.2) : vec3(0.2, 0.8, 0.3);
        float alpha = clamp(density * density, 0.05, 0.4);
        
        outColor = vec4(color, alpha);
    }
`;

// ─── Cumulative Depth Curve Shaders (Orderbook Profile Overlay) ───

export const DEPTH_OVERLAY_VS = `#version 300 es
    layout(location = 0) in vec2 a_pos;
    layout(location = 1) in vec2 a_uv;
    uniform mat4 u_matrix;
    out vec2 v_uv;
    void main() {
        v_uv = a_uv;
        gl_Position = u_matrix * vec4(a_pos.x, a_pos.y, 0.0, 1.0);
    }
`;

export const DEPTH_OVERLAY_FS = `#version 300 es
    precision highp float;
    uniform sampler2D u_lob_density;
    uniform float u_mid_price;
    uniform float u_range;
    in vec2 v_uv;
    out vec4 outColor;
    
    void main() {
        // v_uv mapping: x is price (0 to 1 scaling across u_range relative to mid)
        // y is cumulative depth normalized
        
        // For simplicity in a basic shader, we sample the density across the price axis
        // and build a cumulative sum approximation, or we expect the texture to already 
        // hold cumulative values (which WASM calculates/stores).
        // Let's assume texture holds normalized CUMULATIVE depth where red channel is value.
        
        float cumDepth = texture(u_lob_density, vec2(v_uv.x, 0.5)).r; // Sample 1D profile
        
        if (v_uv.y > cumDepth) discard; // Area fill under the curve
        
        float currentPrice = v_uv.x * u_range; 
        
        vec3 color = currentPrice > u_mid_price ? vec3(0.9, 0.2, 0.2) : vec3(0.2, 0.8, 0.3);
        float alpha = 0.15; // Semi-transparent area fill
        
        // Add a solid line at the boundary (top of the fill)
        if (v_uv.y > cumDepth - 0.02) {
            alpha = 0.8; 
        }
        
        outColor = vec4(color, alpha);
    }
`;

// ─── Liquidation Shaders ───

export const LIQ_VS = `#version 300 es
    layout(location = 0) in vec2 a_pos;
    layout(location = 1) in vec4 a_data;
    uniform mat4 u_matrix;
    out float v_side;
    void main() {
        v_side = a_data.w;
        float sizeScale = sqrt(a_data.z) * 0.1;
        vec2 pos = a_pos * sizeScale + a_data.xy;
        gl_Position = u_matrix * vec4(pos, 0.0, 1.0);
    }
`;

export const LIQ_FS = `#version 300 es
    precision highp float;
    in float v_side;
    out vec4 outColor;
    void main() {
        vec3 color = v_side > 0.5 ? vec3(0.1, 1.0, 0.4) : vec3(1.0, 0.1, 0.2);
        outColor = vec4(color, 0.6);
    }
`;

// ─── Footprint Shaders ───

export const FOOTPRINT_VS = `#version 300 es
    layout(location = 0) in vec2 a_pos;
    layout(location = 1) in vec2 a_uv;
    uniform mat4 u_matrix;
    out vec2 v_uv;
    void main() {
        v_uv = a_uv;
        gl_Position = u_matrix * vec4(a_pos.x, a_pos.y, 0.0, 1.0);
    }
`;

export const FOOTPRINT_FS = `#version 300 es
    precision highp float;
    uniform sampler2D u_buy_v;
    uniform sampler2D u_sell_v;
    in vec2 v_uv;
    out vec4 outColor;
    void main() {
        float buyV = texture(u_buy_v, v_uv).r;
        float sellV = texture(u_sell_v, v_uv).r;
        float total = buyV + sellV;
        if (total < 0.1) discard;
        float delta = (buyV - sellV) / (total + 1e-9);
        vec3 color = delta > 0.0 ? vec3(0.2, 0.8, 0.4) : vec3(0.9, 0.3, 0.3);
        outColor = vec4(color, clamp(total * 0.01, 0.1, 0.6));
    }
`;

// ─── Histogram (VPSV) Shaders ───

export const HISTOGRAM_VS = `#version 300 es
    layout(location = 0) in vec2 a_pos;
    uniform float u_side;
    out vec2 v_uv;
    void main() {
        v_uv = (a_pos + 1.0) * 0.5;
        float x = u_side > 0.0 ? 0.8 + a_pos.x * 0.2 : -1.0 + a_pos.x * 0.2;
        gl_Position = vec4(x, a_pos.y, 0.0, 1.0);
    }
`;

export const HISTOGRAM_FS = `#version 300 es
    precision highp float;
    uniform sampler2D u_profile;
    uniform vec4 u_color;
    in vec2 v_uv;
    out vec4 outColor;
    void main() {
        float val = texture(u_profile, vec2(v_uv.y, 0.5)).r;
        float norm_x = 1.0 - v_uv.x;
        if (norm_x > val * 0.05) discard;
        outColor = vec4(u_color.rgb, u_color.a);
    }
`;

// ─── Indicator Line Strip Shaders ───

export const INDICATOR_VS = `#version 300 es
    layout(location = 0) in vec2 a_pos; // x = NDC x, y = price value
    uniform mat4 u_matrix;
    uniform float u_barWidth;
    uniform float u_dpr;
    uniform vec2 u_viewportSize;
    void main() {
        // Price → NDC Y
        float ndc_y = a_pos.y * u_matrix[1][1] + u_matrix[3][1];
        // Snap Y to device pixel + 0.5 offset for crisp 1px lines
        float devY = floor((1.0 - ndc_y) * 0.5 * u_viewportSize.y + 0.5) + 0.5;
        float snapped_ndc_y = 1.0 - devY / u_viewportSize.y * 2.0;
        gl_Position = vec4(a_pos.x, snapped_ndc_y, 0.0, 1.0);
    }
`;

export const INDICATOR_FS = `#version 300 es
    precision highp float;
    uniform vec4 u_color;
    out vec4 outColor;
    void main() {
        outColor = u_color;
    }
`;

// ─── Bar Figure (Histogram Column) Shaders ───

export const BAR_FIGURE_VS = `#version 300 es
    layout(location = 0) in vec2 a_pos;  // unit quad [-0.5, 0.5]
    layout(location = 1) in vec3 a_barData; // x = left NDC, y = right NDC, z = price value
    uniform float u_scaleY;
    uniform float u_transY;
    uniform float u_baseline;    // baseline price (0 for most histograms)
    uniform float u_dpr;
    uniform vec2 u_viewportSize;
    void main() {
        float ndc_x = mix(a_barData.x, a_barData.y, a_pos.x + 0.5);
        // Price Y → NDC → device pixel snap
        float valNdc = a_barData.z * u_scaleY + u_transY;
        float baseNdc = u_baseline * u_scaleY + u_transY;
        float devTop = floor((1.0 - max(valNdc, baseNdc)) * 0.5 * u_viewportSize.y + 0.5);
        float devBottom = floor((1.0 - min(valNdc, baseNdc)) * 0.5 * u_viewportSize.y + 0.5);
        if (devBottom <= devTop) devBottom = devTop + 1.0;
        float devY = mix(devTop, devBottom, a_pos.y + 0.5);
        float ndc_y = 1.0 - devY / u_viewportSize.y * 2.0;
        gl_Position = vec4(ndc_x, ndc_y, 0.0, 1.0);
    }
`;

export const BAR_FIGURE_FS = `#version 300 es
    precision highp float;
    uniform vec4 u_color;
    out vec4 outColor;
    void main() {
        outColor = u_color;
    }
`;

// ─── Circle Figure (Dot Marker) Shaders ───

export const CIRCLE_FIGURE_VS = `#version 300 es
    layout(location = 0) in vec2 a_pos;  // unit quad [-0.5, 0.5]
    layout(location = 1) in vec2 a_data; // x = NDC x center, y = price value
    uniform float u_scaleY;
    uniform float u_transY;
    uniform float u_radius;       // radius in device pixels
    uniform vec2 u_viewportSize;
    out vec2 v_uv;
    void main() {
        v_uv = a_pos * 2.0; // [-1, 1] for circle test
        float ndc_x = a_data.x;
        float ndc_y = a_data.y * u_scaleY + u_transY;
        // Snap center to device pixel
        float devX = floor((ndc_x + 1.0) * 0.5 * u_viewportSize.x + 0.5);
        float devY = floor((1.0 - ndc_y) * 0.5 * u_viewportSize.y + 0.5);
        // Offset by quad vertex * radius
        devX += a_pos.x * u_radius * 2.0;
        devY += a_pos.y * u_radius * 2.0;
        float out_x = devX / u_viewportSize.x * 2.0 - 1.0;
        float out_y = 1.0 - devY / u_viewportSize.y * 2.0;
        gl_Position = vec4(out_x, out_y, 0.0, 1.0);
    }
`;

export const CIRCLE_FIGURE_FS = `#version 300 es
    precision highp float;
    uniform vec4 u_color;
    in vec2 v_uv;
    out vec4 outColor;
    void main() {
        float dist = length(v_uv);
        if (dist > 1.0) discard;
        // Smooth edge for anti-aliased circle
        float alpha = 1.0 - smoothstep(0.85, 1.0, dist);
        outColor = vec4(u_color.rgb, u_color.a * alpha);
    }
`;

// ─── SHM (Stochastic Heat Map) Shaders ───
// Renders 28 rows of colored cells, each representing an EMA-smoothed stochastic oscillator.
// Color ramp: deep blue (oversold) → cyan → green → yellow → orange → deep red (overbought)

export const SHM_VS = `#version 300 es
    layout(location = 0) in vec2 a_pos;
    layout(location = 1) in vec2 a_uv;
    uniform mat4 u_matrix;
    out vec2 v_uv;
    void main() {
        v_uv = a_uv;
        gl_Position = u_matrix * vec4(a_pos, 0.0, 1.0);
    }
`;

export const SHM_FS = `#version 300 es
    precision highp float;
    uniform sampler2D u_shm;
    out vec4 outColor;
    in vec2 v_uv;

    vec3 shmColorRamp(float t) {
        // 12-stop diverging ramp: cold blue → hot red
        vec3 c01 = vec3(0.012, 0.094, 0.396);  // deep blue (0%)
        vec3 c02 = vec3(0.008, 0.145, 0.612);  // blue (5%)
        vec3 c03 = vec3(0.067, 0.463, 0.949);  // bright blue (10%)
        vec3 c04 = vec3(0.067, 0.686, 0.949);  // cyan (20%)
        vec3 c05 = vec3(0.067, 0.780, 0.612);  // teal (30%)
        vec3 c06 = vec3(0.227, 0.949, 0.067);  // green (40%)
        vec3 c07 = vec3(0.933, 0.949, 0.067);  // yellow (50%)
        vec3 c08 = vec3(0.949, 0.596, 0.067);  // orange (60%)
        vec3 c09 = vec3(0.949, 0.376, 0.067);  // dark orange (70%)
        vec3 c10 = vec3(0.949, 0.173, 0.067);  // red-orange (80%)
        vec3 c11 = vec3(0.812, 0.000, 0.000);  // red (90%)
        vec3 c12 = vec3(0.600, 0.000, 0.000);  // deep red (95%+)

        if (t < 0.05) return mix(c01, c02, t / 0.05);
        if (t < 0.10) return mix(c02, c03, (t - 0.05) / 0.05);
        if (t < 0.20) return mix(c03, c04, (t - 0.10) / 0.10);
        if (t < 0.30) return mix(c04, c05, (t - 0.20) / 0.10);
        if (t < 0.40) return mix(c05, c06, (t - 0.30) / 0.10);
        if (t < 0.50) return mix(c06, c07, (t - 0.40) / 0.10);
        if (t < 0.60) return mix(c07, c08, (t - 0.50) / 0.10);
        if (t < 0.70) return mix(c08, c09, (t - 0.60) / 0.10);
        if (t < 0.80) return mix(c09, c10, (t - 0.70) / 0.10);
        if (t < 0.90) return mix(c10, c11, (t - 0.80) / 0.10);
        return mix(c11, c12, (t - 0.90) / 0.10);
    }

    void main() {
        float val = texture(u_shm, v_uv).r;
        vec3 color = shmColorRamp(clamp(val, 0.0, 1.0));
        outColor = vec4(color, 1.0);
    }
`;

// ─── Band/Channel Shaders (Bollinger, Keltner, Donchian) ───
// Triangle strip between two value series (upper + lower).
// Data: interleaved [x_ndc, upper_price, lower_price] per bar.
// Vertices: even = upper, odd = lower → GL_TRIANGLE_STRIP fills the band.

export const BAND_VS = `#version 300 es
    layout(location = 0) in vec3 a_data; // x = NDC x, y = upper price, z = lower price
    uniform float u_scaleY;
    uniform float u_transY;
    uniform float u_dpr;
    uniform vec2 u_viewportSize;
    void main() {
        float ndc_x = a_data.x;
        // Even vertex = upper, odd vertex = lower
        bool isUpper = (gl_VertexID % 2) == 0;
        float price = isUpper ? a_data.y : a_data.z;
        float ndc_y = price * u_scaleY + u_transY;
        // Snap Y to device pixel
        float devY = floor((1.0 - ndc_y) * 0.5 * u_viewportSize.y + 0.5);
        float snapped_y = 1.0 - devY / u_viewportSize.y * 2.0;
        gl_Position = vec4(ndc_x, snapped_y, 0.0, 1.0);
    }
`;

export const BAND_FS = `#version 300 es
    precision highp float;
    uniform vec4 u_fillColor;
    out vec4 outColor;
    void main() {
        outColor = u_fillColor;
    }
`;

// ─── Area Fill Shaders (line to baseline) ───
// Triangle strip from line values to a baseline Y.
// Data: [x_ndc, price_value] per bar. Vertices: even = value, odd = baseline.

export const AREA_VS = `#version 300 es
    layout(location = 0) in vec2 a_data; // x = NDC x, y = price value
    uniform float u_scaleY;
    uniform float u_transY;
    uniform float u_baseline;
    uniform float u_dpr;
    uniform vec2 u_viewportSize;
    void main() {
        float ndc_x = a_data.x;
        bool isValue = (gl_VertexID % 2) == 0;
        float price = isValue ? a_data.y : u_baseline;
        float ndc_y = price * u_scaleY + u_transY;
        float devY = floor((1.0 - ndc_y) * 0.5 * u_viewportSize.y + 0.5);
        float snapped_y = 1.0 - devY / u_viewportSize.y * 2.0;
        gl_Position = vec4(ndc_x, snapped_y, 0.0, 1.0);
    }
`;

export const AREA_FS = `#version 300 es
    precision highp float;
    uniform vec4 u_fillColor;
    out vec4 outColor;
    void main() {
        outColor = u_fillColor;
    }
`;

// ─── Horizontal Line Shader (support/resistance, zero line) ───

export const HLINE_VS = `#version 300 es
    layout(location = 0) in vec2 a_pos; // x: [-1, 1], y: [-0.5, 0.5]
    uniform float u_priceY;
    uniform float u_scaleY;
    uniform float u_transY;
    uniform float u_dpr;
    uniform vec2 u_viewportSize;
    uniform float u_lineWidth;
    void main() {
        float ndc_y = u_priceY * u_scaleY + u_transY;
        float devY = floor((1.0 - ndc_y) * 0.5 * u_viewportSize.y + 0.5);
        float halfThickDev = floor(u_lineWidth * u_dpr * 0.5);
        float vertDevY = devY + a_pos.y * halfThickDev;
        float out_y = 1.0 - vertDevY / u_viewportSize.y * 2.0;
        gl_Position = vec4(a_pos.x, out_y, 0.0, 1.0);
    }
`;

export const HLINE_FS = `#version 300 es
    precision highp float;
    uniform vec4 u_color;
    out vec4 outColor;
    void main() {
        outColor = u_color;
    }
`;

// ─── Baseline Area Shaders (dual-color fill above/below reference) ───
// Triangle strip from line values to a baseline Y, but color changes
// depending on whether the value is above or below the baseline.
// Data: [x_ndc, price_value] per bar. Vertices: even = value, odd = baseline.

export const BASELINE_AREA_VS = `#version 300 es
    layout(location = 0) in vec2 a_data; // x = NDC x, y = price value
    uniform float u_scaleY;
    uniform float u_transY;
    uniform float u_baseline;
    uniform vec2 u_viewportSize;
    flat out float f_value;
    flat out float f_baseline;
    void main() {
        float ndc_x = a_data.x;
        bool isValue = (gl_VertexID % 2) == 0;
        float price = isValue ? a_data.y : u_baseline;
        float ndc_y = price * u_scaleY + u_transY;
        float devY = floor((1.0 - ndc_y) * 0.5 * u_viewportSize.y + 0.5);
        float snapped_y = 1.0 - devY / u_viewportSize.y * 2.0;
        gl_Position = vec4(ndc_x, snapped_y, 0.0, 1.0);
        f_value = a_data.y;
        f_baseline = u_baseline;
    }
`;

export const BASELINE_AREA_FS = `#version 300 es
    precision highp float;
    uniform vec4 u_topFillColor;
    uniform vec4 u_bottomFillColor;
    flat in float f_value;
    flat in float f_baseline;
    out vec4 outColor;
    void main() {
        if (f_value >= f_baseline) {
            outColor = u_topFillColor;
        } else {
            outColor = u_bottomFillColor;
        }
    }
`;

// ─── Baseline Line Shaders (dual-color stroke over baseline area) ───

export const BASELINE_LINE_VS = `#version 300 es
    layout(location = 0) in vec2 a_data; // x = NDC x, y = price value
    uniform float u_scaleY;
    uniform float u_transY;
    uniform float u_baseline;
    uniform vec2 u_viewportSize;
    flat out float f_value;
    flat out float f_baseline;
    void main() {
        float ndc_x = a_data.x;
        float price = a_data.y; // line values directly
        float ndc_y = price * u_scaleY + u_transY;
        float devY = floor((1.0 - ndc_y) * 0.5 * u_viewportSize.y + 0.5);
        float snapped_y = 1.0 - devY / u_viewportSize.y * 2.0;
        gl_Position = vec4(ndc_x, snapped_y, 0.0, 1.0);
        f_value = a_data.y;
        f_baseline = u_baseline;
    }
`;

export const BASELINE_LINE_FS = `#version 300 es
    precision highp float;
    uniform vec4 u_topLineColor;
    uniform vec4 u_bottomLineColor;
    flat in float f_value;
    flat in float f_baseline;
    out vec4 outColor;
    void main() {
        if (f_value >= f_baseline) {
            outColor = u_topLineColor;
        } else {
            outColor = u_bottomLineColor;
        }
    }
`;

// ─── OHLC Bar Shaders (Classic Bar Chart) ───
// Vertical stem from High to Low, left tick at Open, right tick at Close.
// Drawn as instanced quads. 
// u_mode: 0 = stem (H to L), 1 = open tick (left), 2 = close tick (right)

export const OHLC_BAR_VS = `#version 300 es
    layout(location = 0) in vec2 a_pos; // unit quad [-0.5, 0.5]
    layout(location = 1) in vec4 a_ohlc; // open, high, low, close
    layout(location = 2) in uint a_flags;

    uniform float u_scaleY;
    uniform float u_transY;
    uniform float u_totalBarSpace;
    uniform float u_barSpace;
    uniform float u_rightOffset;
    
    uniform float u_bodyWidth; // thickest part in dev px
    uniform float u_dpr;
    uniform vec2 u_viewportSize;
    uniform int u_mode; // 0=stem, 1=open tick, 2=close tick

    uniform vec4 u_bullColor;
    uniform vec4 u_bearColor;
    
    out vec4 v_color;
    
    void main() {
        bool isBull = (a_flags & 1u) != 0u;
        v_color = isBull ? u_bullColor : u_bearColor;
        
        float open = a_ohlc.x;
        float high = a_ohlc.y;
        float low = a_ohlc.z;
        float close = a_ohlc.w;
        
        float dataIndex = float(gl_InstanceID);
        float deltaFromRight = u_rightOffset - dataIndex;
        float xCss = u_totalBarSpace - (deltaFromRight - 0.5) * u_barSpace;
        float xDevCenter = floor(xCss * u_dpr + 0.5);
        
        float tickLen = floor(u_bodyWidth * 0.5);
        // stem is always 1px (or minimal thick)
        float stemWidth = max(1.0, floor(u_dpr));
        float halfStem = floor(stemWidth * 0.5);
        
        float vertDevX, vertDevY;
        
        if (u_mode == 0) { // Stem
            float ndcH = high * u_scaleY + u_transY;
            float ndcL = low * u_scaleY + u_transY;
            float devTop = floor((1.0 - ndcH) * 0.5 * u_viewportSize.y + 0.5);
            float devBottom = floor((1.0 - ndcL) * 0.5 * u_viewportSize.y + 0.5);
            if (devBottom <= devTop) devBottom = devTop + 1.0;
            
            vertDevX = xDevCenter + a_pos.x * stemWidth;
            vertDevY = mix(devTop, devBottom, a_pos.y + 0.5);
        } else if (u_mode == 1) { // Open Tick (Left)
            float ndcO = open * u_scaleY + u_transY;
            float devY = floor((1.0 - ndcO) * 0.5 * u_viewportSize.y + 0.5);
            
            float left = xDevCenter - tickLen - halfStem;
            float right = xDevCenter;
            
            vertDevX = mix(left, right, a_pos.x + 0.5);
            vertDevY = devY + a_pos.y * stemWidth;
        } else { // Close Tick (Right)
            float ndcC = close * u_scaleY + u_transY;
            float devY = floor((1.0 - ndcC) * 0.5 * u_viewportSize.y + 0.5);
            
            float left = xDevCenter;
            float right = xDevCenter + tickLen + halfStem;
            
            vertDevX = mix(left, right, a_pos.x + 0.5);
            vertDevY = devY + a_pos.y * stemWidth;
        }
        
        float ndc_x = (vertDevX / u_viewportSize.x) * 2.0 - 1.0;
        float ndc_y = 1.0 - (vertDevY / u_viewportSize.y) * 2.0;
        gl_Position = vec4(ndc_x, ndc_y, 0.0, 1.0);
    }
`;

export const OHLC_BAR_FS = `#version 300 es
    precision highp float;
    in vec4 v_color;
    out vec4 outColor;
    void main() {
        outColor = v_color;
    }
`;

// ─── Vertical Line Shader (session boundaries, event markers) ───
// Full-height line at a given X coordinate, pixel-snapped.

export const VLINE_VS = `#version 300 es
    layout(location = 0) in vec2 a_pos; // x: [-0.5, 0.5], y: [-1, 1]
    uniform float u_xNdc;        // X position in NDC
    uniform float u_dpr;
    uniform vec2 u_viewportSize;
    uniform float u_lineWidth;   // line width in CSS pixels
    void main() {
        // Snap X center to device pixel
        float devX = floor((u_xNdc + 1.0) * 0.5 * u_viewportSize.x + 0.5);
        float halfThickDev = floor(u_lineWidth * u_dpr * 0.5);
        float vertDevX = devX + a_pos.x * halfThickDev;
        float out_x = vertDevX / u_viewportSize.x * 2.0 - 1.0;
        gl_Position = vec4(out_x, a_pos.y, 0.0, 1.0);
    }
`;

export const VLINE_FS = `#version 300 es
    precision highp float;
    uniform vec4 u_color;
    out vec4 outColor;
    void main() {
        outColor = u_color;
    }
`;

// ─── Background Shade Shader (session highlighting, time range markers) ───
// Full-height rectangle between two X NDC coordinates.

export const BGSHADE_VS = `#version 300 es
    layout(location = 0) in vec2 a_pos; // unit quad [0, 1] x [-1, 1]
    uniform float u_x0Ndc;       // left edge NDC
    uniform float u_x1Ndc;       // right edge NDC
    uniform float u_dpr;
    uniform vec2 u_viewportSize;
    void main() {
        // Interpolate X between x0 and x1, snap to device pixel
        float xNdc = mix(u_x0Ndc, u_x1Ndc, a_pos.x);
        float devX = floor((xNdc + 1.0) * 0.5 * u_viewportSize.x + 0.5);
        float out_x = devX / u_viewportSize.x * 2.0 - 1.0;
        gl_Position = vec4(out_x, a_pos.y, 0.0, 1.0);
    }
`;

export const BGSHADE_FS = `#version 300 es
    precision highp float;
    uniform vec4 u_color;
    out vec4 outColor;
    void main() {
        outColor = u_color;
    }
`;
