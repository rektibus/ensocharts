/** AUTO-GENERATED from configs/schema.json — do not edit manually **/

export const ZenithSchema = {
    // Protocol Header Constants
    MAGIC: 0x5A4E5448,
    MAGIC_LE: 0x48544E5A,
    HEADER_SIZE_BYTES: 8,

    // Message Types
    MessageType: {
        BAR: 1,
        DEPTH: 2,
        INDICATOR: 3,
        LIQUIDATION: 4,
        PATTERNS: 5
    },

    // Static Payload Sizes
    LIQUIDATION_PAYLOAD_BYTES: 40,
    LIQUIDATION_FIELD_COUNT: 4,

    // WASM Engine Constants
    MAX_BINS: 512,

    PAYLOAD_SIZE_BYTES: 424,
    FIELD_COUNT: 53,
    OFFSETS: {
        timestamp: 0,
        open: 1,
        high: 2,
        low: 3,
        close: 4,
        vbuy: 5,
        vsell: 6,
        cbuy: 7,
        csell: 8,
        lbuy: 9,
        lsell: 10,
        dbuy: 11,
        dsell: 12,
        oi: 13,
        funding_rate: 14,
        ls_ratio: 15,
        score: 16,
        enso_osc: 17,
        price_position: 18,
        cvd_spot: 19,
        cvd_perp: 20,
        cvd_total: 21,
        cvd_divergence: 22,
        cld: 23,
        cdd: 24,
        cld_normalized: 25,
        cdd_normalized: 26,
        tps_normalized: 27,
        ema_values: 28,
        powerlaw_trend: 43,
        powerlaw_deviation: 44,
        powerlaw_zscore: 45,
        powerlaw_band_upper: 46,
        powerlaw_band_lower: 47,
        pattern_score: 48,
        active_pattern: 49,
        equity: 50,
        position_side: 51,
        entry_price: 52,
    }
} as const;
