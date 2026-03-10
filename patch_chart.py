import sys

with open('src/Chart.ts', 'r', newline='') as f:
    lines = f.readlines()

def replace_lines(start, end, content):
    global lines
    # content is a string
    new_lines = [line + ('\r\n' if lines[0].endswith('\r\n') else '\n') for line in content.split('\n')]
    # EndLine is inclusive
    lines = lines[:start-1] + new_lines + lines[end:]

replace_lines(42, 44, """import ChartStore, { SCALE_MULTIPLIER, type Store } from './Store'

import { ZenithRenderer } from './webgl/ZenithRenderer'

import CandlePane from './pane/CandlePane'""")

replace_lines(100, 105, """  updateData: (data: KLineData) => void
  setYScrolling: (yScrolling: boolean) => void
  getYScrolling: () => boolean
  loadMore: (cb: (timestamp: Nullable<number>) => void) => void
  setPriceVolumePrecision: (pricePrecision: number, volumePrecision: number) => void
  setWasmState: (wasmState: any) => void
  getWebGLRenderer: () => Nullable<ZenithRenderer>
}""")

replace_lines(117, 118, """  private _xAxisPane: XAxisPane
  private readonly _separatorPanes = new Map<DrawPane, SeparatorPane>()

  private _webglCanvas: HTMLCanvasElement
  private _zenithRenderer: Nullable<ZenithRenderer> = null
  private _wasmState: any = null
  private _webglAnimationFrame: number = 0""")

replace_lines(158, 164, """      MozUserSelect: 'none',
      webkitTapHighlightColor: 'transparent'
    })
    this._chartContainer.tabIndex = 1

    this._webglCanvas = createDom('canvas', {
      position: 'absolute',
      top: '0',
      left: '0',
      zIndex: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none'
    }) as HTMLCanvasElement
    this._chartContainer.appendChild(this._webglCanvas)
    
    const gl = this._webglCanvas.getContext('webgl2', { antialias: false, alpha: true, premultipliedAlpha: false })
    if (gl) {
      this._zenithRenderer = new ZenithRenderer(gl as WebGL2RenderingContext)
    }

    container.appendChild(this._chartContainer)
    this._cacheChartBounding()
  }""")

replace_lines(497, 501, """      buildYAxisTick: false,
      cacheYAxisWidth: false,
      forceBuildYAxisTick: false
    }
    this._resizeWebGL()
  }

  private _resizeWebGL(): void {
    if (!this._webglCanvas || !this._zenithRenderer) return
    const pixelRatio = getPixelRatio(this._webglCanvas)
    const w = this._chartBounding.width
    const h = this._chartBounding.height
    if (this._webglCanvas.width !== w * pixelRatio || this._webglCanvas.height !== h * pixelRatio) {
        this._webglCanvas.width = w * pixelRatio
        this._webglCanvas.height = h * pixelRatio
        this._zenithRenderer.setViewportSize(w * pixelRatio, h * pixelRatio)
    }
  }""")

replace_lines(507, 513, """    } else {
      this._drawPanes.forEach(pane => {
        pane.update(level)
        this._separatorPanes.get(pane)?.update(level)
      })
    }

    if (this._zenithRenderer && this._wasmState) {
       if (this._webglAnimationFrame === 0) {
          this._webglAnimationFrame = requestAnimationFrame(() => {
              this._renderWebGL()
              this._webglAnimationFrame = 0
          })
       }
    }
  }

  private _renderWebGL(): void {
    if (!this._zenithRenderer || !this._wasmState) return
    const symbolObj = this.getSymbol()
    const symbol = symbolObj?.ticker ?? ''

    const gl = this._zenithRenderer.getContext().gl
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    const pixelRatio = getPixelRatio(this._webglCanvas)
    const barSpaceOptions = this.getBarSpace()
    const totalBarSpace = this._chartStore.getTotalBarSpace()
    const rightOffset = this._chartStore.getOffsetRightDistance()
    
    const matrix = new Float32Array(16)
    matrix[0] = totalBarSpace * pixelRatio
    matrix[1] = barSpaceOptions.bar * pixelRatio
    matrix[2] = rightOffset * pixelRatio
    matrix[3] = pixelRatio

    this._drawPanes.forEach(pane => {
      const paneId = pane.getId()
      if (paneId === PaneIdConstants.X_AXIS) return

      const bounding = pane.getBounding()
      const mainBounding = pane.getMainWidget().getBounding()
      
      const yBottom = this._chartBounding.height - (bounding.top + bounding.height)
      const vw = mainBounding.width * pixelRatio
      const vh = bounding.height * pixelRatio
      
      if (vw <= 0 || vh <= 0) return

      gl.enable(gl.SCISSOR_TEST)
      gl.viewport(mainBounding.left * pixelRatio, yBottom * pixelRatio, vw, vh)
      gl.scissor(mainBounding.left * pixelRatio, yBottom * pixelRatio, vw, vh)

      const yAxis = pane.getAxisComponent() as YAxis
      const min = yAxis.getMin()
      const max = yAxis.getMax()
      const range = max - min
      if (range > 0) {
         matrix[5] = 2.0 / range
         matrix[13] = -(max + min) / range
      } else {
         matrix[5] = 0
         matrix[13] = 0
      }

      if (paneId === PaneIdConstants.CANDLE && symbol) {
          this._zenithRenderer!.render(symbol, this._wasmState, matrix, this as any)
      }
    })
    
    gl.disable(gl.SCISSOR_TEST)
  }""")

replace_lines(754, 758, """  getIndicators(filter?: IndicatorFilter): Indicator[] {
    return this._chartStore.getIndicatorsByFilter(filter ?? {})
  }

  setWasmState(wasmState: any) {
      this._wasmState = wasmState
      this.updatePane(UpdateLevel.All)
  }

  getWebGLRenderer(): Nullable<ZenithRenderer> {
      return this._zenithRenderer
  }

  removeIndicator(filter?: IndicatorFilter): boolean {""")

with open('src/Chart.ts', 'w', newline='') as f:
    f.writelines(lines)
