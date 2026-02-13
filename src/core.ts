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

import type Nullable from './common/Nullable'
import { logError, logTag, logWarn } from './common/utils/logger'
import { isString, isValid } from './common/utils/typeChecks'
import type { Options } from './Options'
import ChartImp, { type Chart } from './Chart'

const charts = new Map<string, ChartImp>()
let chartBaseId = 1

/**
 * Chart version
 * @return {string}
 */
export function version(): string {
    return '__VERSION__'
}

/**
 * Init chart instance
 * @param ds
 * @param options
 * @returns {Chart}
 */
export function init(ds: HTMLElement | string, options?: Options): Nullable<Chart> {
    logTag()
    let dom: Nullable<HTMLElement> = null
    if (isString(ds)) {
        dom = document.getElementById(ds)
    } else {
        dom = ds
    }
    if (dom === null) {
        logError('', '', 'The chart cannot be initialized correctly. Please check the parameters. The chart container cannot be null and child elements need to be added!!!')
        return null
    }
    let chart = charts.get(dom.id)
    if (isValid(chart)) {
        logWarn('', '', 'The chart has been initialized on the dom！！！')
        return chart
    }
    const id = `k_line_chart_${chartBaseId++}`
    chart = new ChartImp(dom, options)
    chart.id = id
    dom.setAttribute('k-line-chart-id', id)
    charts.set(id, chart)
    return chart
}

/**
 * Destroy chart instance
 * @param dcs
 */
export function dispose(dcs: HTMLElement | Chart | string): void {
    let id: Nullable<string> = null
    if (dcs instanceof ChartImp) {
        id = dcs.id
    } else {
        let dom: Nullable<HTMLElement> = null
        if (isString(dcs)) {
            dom = document.getElementById(dcs)
        } else {
            dom = dcs as HTMLElement
        }
        id = dom?.getAttribute('k-line-chart-id') ?? null
    }
    if (id !== null) {
        charts.get(id)?.destroy()
        charts.delete(id)
    }
}
