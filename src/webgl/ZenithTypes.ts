/**
 * ZenithTypes.ts — Shared type definitions for the Zenith Engine
 *
 * This file contains strictly type and interface declarations. Because
 * TypeScript erases these at compile time, importing them across WebWorker
 * boundaries does not cause bundler issues (no runtime code is shared).
 */

export interface ZenithTrade {
    exchange: string;
    pair: string;
    price: number;
    size: number;
    isBuyerMaker: boolean;
}

export interface ZenithDepth {
    symbol: string;
    timestamp: number;
    maxVol: number;
    bids: Array<{ price: number; size: number }>;
    asks: Array<{ price: number; size: number }>;
}

export interface ZenithLiquidation {
    symbol: string;
    timestamp: number;
    price: number;
    size: number;
    isBuy: boolean;
}
