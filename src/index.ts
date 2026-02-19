/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { CandleType, YAxisType } from './common/Styles'
import type {
  LineType, PolygonType, TooltipShowRule, TooltipShowType, FeatureType, TooltipFeaturePosition,
  CandleTooltipRectPosition, Styles
} from './common/Styles'
import type { KLineData } from './common/Data'
import type { SymbolInfo } from './common/SymbolInfo'
import type { Period } from './common/Period'

type TViewData = KLineData
export { type TViewData }

import {
  clone, merge, isString, isNumber, isValid, isObject, isArray, isFunction, isBoolean
} from './common/utils/typeChecks'
import {
  formatValue,
  formatPrecision,
  formatBigNumber,
  formatThousands,
  formatFoldDecimal,
  formatTimestampByTemplate
} from './common/utils/format'
import { calcTextWidth } from './common/utils/canvas'
import type { ActionType } from './common/Action'
import type { IndicatorSeries, Indicator } from './component/Indicator'
import type { OverlayMode } from './component/Overlay'

import type { FormatDateType, Options, ZoomAnchor } from './Options'
import type { PaneOptions } from './pane/types'
import type { Chart, DomPosition } from './Chart'
import type DeepPartial from './common/DeepPartial'
import type { OverlayTemplate, OverlayCreateFiguresCallbackParams, OverlayFigure, OverlayCreate } from './component/Overlay'
import type { LineAttrs } from './extension/figure/line'
import type { PolygonAttrs } from './extension/figure/polygon'
import type { CircleAttrs } from './extension/figure/circle'
import type { TextAttrs } from './extension/figure/text'
import type Coordinate from './common/Coordinate'
import type Bounding from './common/Bounding'
import type Nullable from './common/Nullable'

import { checkCoordinateOnArc } from './extension/figure/arc'
import { checkCoordinateOnCircle } from './extension/figure/circle'
import {
  checkCoordinateOnLine,
  getLinearYFromSlopeIntercept,
  getLinearSlopeIntercept,
  getLinearYFromCoordinates
} from './extension/figure/line'
import { checkCoordinateOnPolygon } from './extension/figure/polygon'
import { checkCoordinateOnRect } from './extension/figure/rect'
import { checkCoordinateOnText } from './extension/figure/text'

import { registerFigure, getSupportedFigures, getFigureClass } from './extension/figure/index'
import { registerIndicator, getSupportedIndicators } from './extension/indicator/index'
import { registerLocale, getSupportedLocales } from './extension/i18n/index'
import { registerOverlay, getOverlayClass, getSupportedOverlays } from './extension/overlay/index'
import { registerStyles } from './extension/styles/index'
import { registerXAxis } from './extension/x-axis'
import { registerYAxis } from './extension/y-axis'

import { version, init, dispose } from './core'

import proOverlays from './pro/extension/index'

// Register Pro overlays automatically
proOverlays.forEach((o: any) => {
  registerOverlay(o)
})

const utils = {
  clone,
  merge,
  isString,
  isNumber,
  isValid,
  isObject,
  isArray,
  isFunction,
  isBoolean,
  formatValue,
  formatPrecision,
  formatBigNumber,
  formatDate: formatTimestampByTemplate,
  formatThousands,
  formatFoldDecimal,
  calcTextWidth,
  getLinearSlopeIntercept,
  getLinearYFromSlopeIntercept,
  getLinearYFromCoordinates,
  checkCoordinateOnArc,
  checkCoordinateOnCircle,
  checkCoordinateOnLine,
  checkCoordinateOnPolygon,
  checkCoordinateOnRect,
  checkCoordinateOnText
}

// Pro module re-exports
export { default as ChartMain } from './pro/ChartMain'
export type { ChartMainOptions, ChartMainPeriod, ChartMainSymbol, Datafeed } from './pro/types'
export { proOverlays }

export {
  version, init, dispose,
  registerFigure, getSupportedFigures, getFigureClass,
  registerIndicator, getSupportedIndicators,
  registerOverlay, getSupportedOverlays, getOverlayClass,
  registerLocale, getSupportedLocales,
  registerStyles,
  registerXAxis, registerYAxis,
  utils,
  type LineType, type PolygonType, type TooltipShowRule, type TooltipShowType, type FeatureType, type TooltipFeaturePosition, type CandleTooltipRectPosition,
  type CandleType as CandleTypeType,
  type FormatDateType, type ZoomAnchor,
  type DomPosition, type ActionType, type IndicatorSeries, type OverlayMode,
  type Chart, type Options, type DeepPartial, type PaneOptions, type Indicator,
  type Styles, type SymbolInfo, type Period, type KLineData,
  type OverlayTemplate, type LineAttrs, type PolygonAttrs, type Coordinate, type Bounding,
  type OverlayCreateFiguresCallbackParams, type OverlayFigure, type OverlayCreate,
  type CircleAttrs, type TextAttrs, type Nullable,
  CandleType, YAxisType
}
