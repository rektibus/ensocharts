
import {
    DeepPartial,
    Styles,
    SymbolInfo,
    Period,
    KLineData,
    Chart,
    Nullable,
} from '../index';

export type { SymbolInfo, Period, KLineData };

export interface DatafeedSubscribeCallback {
    (data: KLineData): void;
}

export interface Datafeed {
    subscribe(
        symbol: SymbolInfo,
        period: Period,
        callback: DatafeedSubscribeCallback,
    ): void;
    unsubscribe(symbol: SymbolInfo, period: Period): void;
    getHistoryTViewData(
        symbol: SymbolInfo,
        period: Period,
        from: number,
        to: number,
    ): Promise<KLineData[]>;
    searchSymbols(search?: string): Promise<SymbolInfo[]>;
}

export interface ChartProOptions {
    container: string | HTMLElement;
    styles?: DeepPartial<Styles>;
    watermark?: Node | string;
    theme?: string;
    locale?: string;
    drawingBarVisible?: boolean;
    symbol: SymbolInfo;
    period: Period;
    periods?: Period[];
    timezone?: string;
    mainIndicators?: string[];
    subIndicators?: string[];
    datafeed: Datafeed;
    yScrolling?: boolean;
}

export interface ChartPro {
    setTheme(theme: string): void;
    getTheme(): string;
    setStyles(styles: DeepPartial<Styles>): void;
    getStyles(): Styles;
    setLocale(locale: string): void;
    getLocale(): string;
    setTimezone(timezone: string): void;
    getTimezone(): string;
    setSymbol(symbol: SymbolInfo): void;
    getSymbol(): SymbolInfo;
    setPeriod(period: Period): void;
    getPeriod(): Period;
    setYScrolling(yScrolling: boolean): void;
    getYScrolling(): boolean;
    getChart(): Nullable<Chart>;
    resize(): void;
    getConvertPictureUrl(includeOverlay: boolean, type?: string, backgroundColor?: string): string;
    setDrawingBarVisible(visible: boolean): void;
    setIndicatorModalVisible(visible: boolean): void;
}

export type ChartMainOptions = ChartProOptions;
export type ChartMainPeriod = Period;
export type ChartMainSymbol = SymbolInfo;
