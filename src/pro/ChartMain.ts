/**
 * EnsoCharts Pro — ChartMain wrapper
 *
 * Wraps the core equicharts `init()` with:
 * - Drawing bar (with all tool groups)
 * - Corner toggle button (chevron to show/hide drawing bar)
 * - Canvas auto-resize when drawing bar shows/hides
 * - Floating-headers hover integration
 * - Overlay tool registration
 * - Dark theme defaults
 */

import { init, dispose, registerOverlay } from '../index'
import type { Chart } from '../Chart'
import { proOverlays } from './overlays'
import { DrawingBar } from './DrawingBar'

export interface ChartMainPeriod {
    multiplier: number
    timespan: string
    text: string
}

export interface ChartMainSymbol {
    ticker: string
    name?: string
    exchange?: string
    market?: string
    pricePrecision?: number
    volumePrecision?: number
    priceCurrency?: string
    [key: string]: unknown
}

export interface Datafeed {
    getHistoryTViewData: (symbol: ChartMainSymbol, period: ChartMainPeriod, from: number, to: number) => Promise<any[]>
    subscribe: (symbol: ChartMainSymbol, period: ChartMainPeriod, callback: (data: any) => void) => void
    unsubscribe: (symbol: ChartMainSymbol, period: ChartMainPeriod) => void
}

export interface ChartMainOptions {
    container: HTMLElement | string
    theme?: 'dark' | 'light'
    locale?: string
    drawingBarVisible?: boolean
    symbol?: ChartMainSymbol
    period?: ChartMainPeriod
    periods?: ChartMainPeriod[]
    datafeed?: Datafeed
    mainIndicators?: string[]
    subIndicators?: string[]
    yScrolling?: boolean
    styles?: Record<string, any>
    timezone?: string
}

// Register all pro overlays once
let _overlaysRegistered = false
function ensureOverlaysRegistered(): void {
    if (_overlaysRegistered) return
    proOverlays.forEach(o => { registerOverlay(o as any) })
    _overlaysRegistered = true
}

export class ChartMain {
    private _container: HTMLElement
    private _chart: Chart | null = null
    private _drawingBar: DrawingBar | null = null
    private _drawingBarVisible: boolean
    private _cornerBtn: HTMLDivElement | null = null
    private _chartWrapper: HTMLDivElement
    private _drawingBarEl: HTMLDivElement | null = null

    constructor(options: ChartMainOptions) {
        ensureOverlaysRegistered()

        // Resolve container
        if (typeof options.container === 'string') {
            const el = document.getElementById(options.container)
            if (!el) throw new Error('BUG: ChartMain container not found')
            this._container = el
        } else {
            this._container = options.container
        }

        this._container.classList.add('equicharts')
        this._container.setAttribute('data-theme', options.theme ?? 'dark')
        this._drawingBarVisible = options.drawingBarVisible ?? false

        // Layout: [drawing-bar] [chart-canvas]
        // Use flex row — drawing bar on left, chart fills remaining space
        this._container.style.display = 'flex'
        this._container.style.flexDirection = 'row'
        this._container.style.width = '100%'
        this._container.style.height = '100%'
        this._container.style.position = 'relative'

        // Chart wrapper (takes remaining space)
        this._chartWrapper = document.createElement('div')
        this._chartWrapper.className = 'equicharts-chart-wrapper'
        this._chartWrapper.style.flex = '1'
        this._chartWrapper.style.minWidth = '0'
        this._chartWrapper.style.height = '100%'

        // Init core chart
        const chart = init(this._chartWrapper)
        if (!chart) throw new Error('BUG: equicharts init() returned null')
        this._chart = chart

        // Drawing bar
        this._drawingBar = new DrawingBar({
            chart,
            onDrawingItemClick: (name) => { chart.createOverlay(name) },
            onModeChange: (mode) => { chart.overrideOverlay({ mode: mode as any }) },
            onLockChange: (locked) => { chart.overrideOverlay({ lock: locked }) },
            onVisibleChange: (visible) => { chart.overrideOverlay({ visible }) },
            onRemoveClick: () => { chart.removeOverlay() }
        })
        this._drawingBarEl = this._drawingBar.element

        // Insert drawing bar before chart
        if (this._drawingBarVisible) {
            this._container.appendChild(this._drawingBarEl)
        }
        this._container.appendChild(this._chartWrapper)

        // Corner toggle button
        this._cornerBtn = document.createElement('div')
        this._cornerBtn.className = 'equicharts-corner-btn'
        this._cornerBtn.title = 'Toggle Drawing Tools'
        this._cornerBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="transform:rotate(-90deg)"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>'
        this._cornerBtn.addEventListener('click', (ev) => {
            ev.stopPropagation()
            this.toggleDrawingBar()
        })
        this._container.appendChild(this._cornerBtn)

        // Update corner button rotation based on visibility
        this._updateCornerBtn()

        // Floating-headers hover integration
        let hideTimer: ReturnType<typeof setTimeout> | null = null
        let userDismissed = false

        this._cornerBtn.addEventListener('click', () => {
            if (this._drawingBarVisible) {
                userDismissed = true
            } else {
                userDismissed = false
            }
        })

        this._container.addEventListener('mouseenter', () => {
            if (!document.body.hasAttribute('data-floating-headers')) return
            if (hideTimer) { clearTimeout(hideTimer); hideTimer = null }
            if (userDismissed) return
            if (!this._drawingBarVisible) {
                this._showDrawingBar()
            }
        })

        this._container.addEventListener('mouseleave', () => {
            if (!document.body.hasAttribute('data-floating-headers')) return
            if (userDismissed) return
            hideTimer = setTimeout(() => {
                if (this._drawingBarVisible) {
                    this._hideDrawingBar()
                }
            }, 200)
        })

        // Apply default dark theme styles
        if (options.theme !== 'light') {
            chart.setStyles({
                grid: {
                    show: true,
                    horizontal: { color: 'rgba(255, 255, 255, 0.04)' },
                    vertical: { color: 'rgba(255, 255, 255, 0.04)' }
                },
                candle: {
                    type: 'candle_solid',
                    bar: { upColor: '#03ca9b', downColor: '#DE4645' },
                    priceMark: {
                        high: { show: true },
                        low: { show: true },
                        last: { show: true, line: { show: true } }
                    },
                    tooltip: { showRule: 'follow_cross', showType: 'rect' }
                },
                indicator: { tooltip: { showRule: 'follow_cross' } },
                xAxis: { tickText: { color: 'rgba(255, 255, 255, 0.5)' } },
                yAxis: { tickText: { color: 'rgba(255, 255, 255, 0.5)' } },
                crosshair: {
                    horizontal: {
                        line: { color: 'rgba(255, 255, 255, 0.3)' },
                        text: { backgroundColor: '#333' }
                    },
                    vertical: {
                        line: { color: 'rgba(255, 255, 255, 0.3)' },
                        text: { backgroundColor: '#333' }
                    }
                },
                separator: { color: 'rgba(255, 255, 255, 0.08)' }
            })
        }

        // Apply custom styles
        if (options.styles) {
            chart.setStyles(options.styles)
        }

        // Default indicators
        const mainInds = options.mainIndicators ?? ['MA']
        mainInds.forEach(name => { chart.createIndicator(name, false, { id: 'candle_pane' }) })
        const subInds = options.subIndicators ?? ['VOL']
        subInds.forEach(name => { chart.createIndicator(name) })

        // Set symbol
        if (options.symbol) {
            chart.setSymbol(options.symbol as any)
        }

        // Set period
        if (options.period) {
            chart.setPeriod({ type: options.period.timespan as any, span: options.period.multiplier } as any)
        }

        // Update --drawing-bar-w CSS variable
        this._updateDrawingBarWidth()
    }

    // ── Public API ──

    getChart(): Chart | null { return this._chart }

    setTheme(theme: 'dark' | 'light'): void {
        this._container.setAttribute('data-theme', theme)
        this._chart?.setStyles(theme)
    }

    getTheme(): string { return this._container.getAttribute('data-theme') ?? 'dark' }

    setStyles(styles: any): void { this._chart?.setStyles(styles) }
    getStyles(): any { return this._chart?.getStyles() }

    setLocale(locale: string): void { this._chart?.setLocale(locale) }
    getLocale(): string { return (this._chart as any)?.getLocale() ?? 'en-US' }

    setSymbol(symbol: ChartMainSymbol): void { this._chart?.setSymbol(symbol as any) }
    getSymbol(): any { return (this._chart as any)?.getSymbol() }

    setPeriod(period: ChartMainPeriod): void { this._chart?.setPeriod({ type: period.timespan as any, span: period.multiplier } as any) }
    getPeriod(): any { return (this._chart as any)?.getPeriod() }

    setYScrolling(enabled: boolean): void { (this._chart as any)?.setYScrolling?.(enabled) }
    getYScrolling(): boolean { return (this._chart as any)?.getYScrolling?.() ?? true }

    resize(): void { this._chart?.resize() }

    setDataLoader(loader: any): void { this._chart?.setDataLoader(loader) }

    createOverlay(name: string, paneId?: string): any {
        return this._chart?.createOverlay(paneId ? { name, paneId } : name)
    }

    overrideOverlay(opts: any): void { this._chart?.overrideOverlay(opts) }
    removeOverlay(opts?: any): void { this._chart?.removeOverlay(opts) }

    createIndicator(name: string, isStack?: boolean, paneOptions?: any): any {
        return this._chart?.createIndicator(name, isStack ?? false, paneOptions)
    }

    removeIndicator(paneId: string, name?: string): void {
        this._chart?.removeIndicator(name ? { paneId, name } as any : { paneId } as any)
    }

    getConvertPictureUrl(withWatermark: boolean, type: 'png' | 'jpeg' | 'bmp', bgColor: string): string {
        return this._chart?.getConvertPictureUrl(withWatermark, type, bgColor) ?? ''
    }

    toggleDrawingBar(): void {
        if (this._drawingBarVisible) {
            this._hideDrawingBar()
        } else {
            this._showDrawingBar()
        }
    }

    getDrawingBarVisible(): boolean { return this._drawingBarVisible }

    toggleIndicators(): void {
        // Future: toggle sub-indicator panes
    }

    destroy(): void {
        this._drawingBar?.destroy()
        if (this._chartWrapper) {
            dispose(this._chartWrapper)
        }
        this._cornerBtn?.remove()
        this._chart = null
    }

    // ── Private ──

    private _showDrawingBar(): void {
        if (this._drawingBarVisible || !this._drawingBarEl) return
        this._drawingBarVisible = true
        this._container.insertBefore(this._drawingBarEl, this._chartWrapper)
        this._updateCornerBtn()
        this._updateDrawingBarWidth()
        requestAnimationFrame(() => { this._chart?.resize() })
    }

    private _hideDrawingBar(): void {
        if (!this._drawingBarVisible || !this._drawingBarEl) return
        this._drawingBarVisible = false
        this._drawingBarEl.remove()
        this._updateCornerBtn()
        this._updateDrawingBarWidth()
        requestAnimationFrame(() => { this._chart?.resize() })
    }

    private _updateCornerBtn(): void {
        if (!this._cornerBtn) return
        const svg = this._cornerBtn.querySelector('svg')
        if (svg) {
            svg.style.transform = this._drawingBarVisible ? 'rotate(-90deg)' : 'rotate(90deg)'
        }
    }

    private _updateDrawingBarWidth(): void {
        if (this._drawingBarVisible && this._drawingBarEl) {
            const w = this._drawingBarEl.offsetWidth
            this._container.style.setProperty('--drawing-bar-w', `${w}px`)
        } else {
            this._container.style.setProperty('--drawing-bar-w', '0px')
        }
    }
}

export { DrawingBar } from './DrawingBar'
export { proOverlays, overlayGroups } from './overlays'
