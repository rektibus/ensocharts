/**
     * @license
     * KLineChart v10.0.0-beta1
     * Copyright (c) 2019 lihu.
     * Licensed under Apache License 2.0 https://www.apache.org/licenses/LICENSE-2.0
     */
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- ignore
function merge(target, source) {
    if ((!isObject(target) && !isObject(source))) {
        return;
    }
    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- ignore
            const targetProp = target[key];
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- ignore
            const sourceProp = source[key];
            if (isObject(sourceProp) &&
                isObject(targetProp)) {
                merge(targetProp, sourceProp);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- ignore
                target[key] = clone(sourceProp);
            }
        }
    }
}
function clone(target) {
    if (!isObject(target)) {
        return target;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- ignore
    let copy = null;
    if (isArray(target)) {
        copy = [];
    }
    else {
        copy = {};
    }
    for (const key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
            const v = target[key];
            if (isObject(v)) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- ignore
                copy[key] = clone(v);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- ignore
                copy[key] = v;
            }
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- ignore
    return copy;
}
function isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
}
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters -- ignore
function isFunction(value) {
    return typeof value === 'function';
}
function isObject(value) {
    return (typeof value === 'object') && isValid(value);
}
function isNumber(value) {
    return typeof value === 'number' && Number.isFinite(value);
}
function isValid(value) {
    return value !== null && value !== undefined;
}
function isBoolean(value) {
    return typeof value === 'boolean';
}
function isString(value) {
    return typeof value === 'string';
}

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
function isTransparent(color) {
    return color === 'transparent' ||
        color === 'none' ||
        /^[rR][gG][Bb][Aa]\(([\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\s]*,){3}[\s]*0[\s]*\)$/.test(color) ||
        /^[hH][Ss][Ll][Aa]\(([\s]*(360｜3[0-5][0-9]|[012]?[0-9][0-9]?)[\s]*,)([\s]*((100|[0-9][0-9]?)%|0)[\s]*,){2}([\s]*0[\s]*)\)$/.test(color);
}
function hexToRgb(hex, alpha) {
    const h = hex.replace(/^#/, '');
    const i = parseInt(h, 16);
    const r = (i >> 16) & 255;
    const g = (i >> 8) & 255;
    const b = i & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha ?? 1})`;
}

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
const CandleType = {
    CandleSolid: 'candle_solid',
    CandleStroke: 'candle_stroke',
    CandleUpStroke: 'candle_up_stroke',
    CandleDownStroke: 'candle_down_stroke',
    Ohlc: 'ohlc',
    Area: 'area',
    Line: 'line',
    LineMark: 'line_mark',
    StepLine: 'step_line',
    HeikinAshi: 'heikin_ashi',
    CandleHighLow: 'candle_high_low',
    CandleHighLowArea: 'candle_high_low_area'
};
const YAxisType = {
    Normal: 'normal',
    Log: 'log',
    Percentage: 'percentage'
};
const Color = {
    RED: '#F92855',
    GREEN: '#2DC08E',
    WHITE: '#FFFFFF',
    GREY: '#76808F',
    BLUE: '#1677FF'
};
function getDefaultGridStyle() {
    return {
        show: true,
        horizontal: {
            show: true,
            size: 1,
            color: '#EDEDED',
            style: 'dashed',
            dashedValue: [2, 2]
        },
        vertical: {
            show: true,
            size: 1,
            color: '#EDEDED',
            style: 'dashed',
            dashedValue: [2, 2]
        }
    };
}
/**
 * Get default candle style
 * @type {{area: {backgroundColor: [{offset: number, color: string}, {offset: number, color: string}], lineColor: string, lineSize: number, value: string}, bar: {noChangeColor: string, upColor: string, downColor: string}, tooltip: {rect: {offsetTop: number, fillColor: string, borderColor: string, paddingBottom: number, borderRadius: number, paddingRight: number, borderSize: number, offsetLeft: number, paddingTop: number, paddingLeft: number, offsetRight: number}, showRule: string, values: null, showType: string, text: {marginRight: number, size: number, color: string, weight: string, marginBottom: number, family: string, marginTop: number, marginLeft: number}, labels: string[]}, type: string, priceMark: {high: {textMargin: number, textSize: number, color: string, textFamily: string, show: boolean, textWeight: string}, last: {noChangeColor: string, upColor: string, line: {dashValue: number[], size: number, show: boolean, style: string}, show: boolean, text: {paddingBottom: number, size: number, color: string, paddingRight: number, show: boolean, weight: string, paddingTop: number, family: string, paddingLeft: number}, downColor: string}, low: {textMargin: number, textSize: number, color: string, textFamily: string, show: boolean, textWeight: string}, show: boolean}}}
 */
function getDefaultCandleStyle() {
    const highLow = {
        show: true,
        color: Color.GREY,
        textOffset: 5,
        textSize: 10,
        textFamily: 'Helvetica Neue',
        textWeight: 'normal'
    };
    return {
        type: 'candle_solid',
        bar: {
            compareRule: 'current_open',
            upColor: Color.GREEN,
            downColor: Color.RED,
            noChangeColor: Color.GREY,
            upBorderColor: Color.GREEN,
            downBorderColor: Color.RED,
            noChangeBorderColor: Color.GREY,
            upWickColor: Color.GREEN,
            downWickColor: Color.RED,
            noChangeWickColor: Color.GREY
        },
        area: {
            lineSize: 2,
            lineColor: Color.BLUE,
            smooth: false,
            value: 'close',
            backgroundColor: [{
                    offset: 0,
                    color: hexToRgb(Color.BLUE, 0.01)
                }, {
                    offset: 1,
                    color: hexToRgb(Color.BLUE, 0.2)
                }],
            point: {
                show: true,
                color: Color.BLUE,
                radius: 4,
                rippleColor: hexToRgb(Color.BLUE, 0.3),
                rippleRadius: 8,
                animation: true,
                animationDuration: 1000
            }
        },
        priceMark: {
            show: true,
            high: { ...highLow },
            low: { ...highLow },
            last: {
                show: true,
                compareRule: 'current_open',
                upColor: Color.GREEN,
                downColor: Color.RED,
                noChangeColor: Color.GREY,
                line: {
                    show: true,
                    style: 'dashed',
                    dashedValue: [4, 4],
                    size: 1
                },
                text: {
                    show: true,
                    style: 'fill',
                    size: 12,
                    paddingLeft: 4,
                    paddingTop: 4,
                    paddingRight: 4,
                    paddingBottom: 4,
                    borderColor: 'transparent',
                    borderStyle: 'solid',
                    borderSize: 0,
                    borderDashedValue: [2, 2],
                    color: Color.WHITE,
                    family: 'Helvetica Neue',
                    weight: 'normal',
                    borderRadius: 2
                },
                extendTexts: []
            }
        },
        tooltip: {
            offsetLeft: 4,
            offsetTop: 6,
            offsetRight: 4,
            offsetBottom: 6,
            showRule: 'always',
            showType: 'standard',
            rect: {
                position: 'fixed',
                paddingLeft: 4,
                paddingRight: 4,
                paddingTop: 4,
                paddingBottom: 4,
                offsetLeft: 4,
                offsetTop: 4,
                offsetRight: 4,
                offsetBottom: 4,
                borderRadius: 4,
                borderSize: 1,
                borderColor: '#F2F3F5',
                color: '#FEFEFE'
            },
            title: {
                show: true,
                size: 14,
                family: 'Helvetica Neue',
                weight: 'normal',
                color: Color.GREY,
                marginLeft: 8,
                marginTop: 4,
                marginRight: 8,
                marginBottom: 4,
                template: '{ticker} · {period}'
            },
            legend: {
                size: 12,
                family: 'Helvetica Neue',
                weight: 'normal',
                color: Color.GREY,
                marginLeft: 8,
                marginTop: 4,
                marginRight: 8,
                marginBottom: 4,
                defaultValue: 'n/a',
                template: [
                    { title: 'time', value: '{time}' },
                    { title: 'open', value: '{open}' },
                    { title: 'high', value: '{high}' },
                    { title: 'low', value: '{low}' },
                    { title: 'close', value: '{close}' },
                    { title: 'volume', value: '{volume}' }
                ]
            },
            features: []
        }
    };
}
/**
 * Get default indicator style
 */
function getDefaultIndicatorStyle() {
    const alphaGreen = hexToRgb(Color.GREEN, 0.7);
    const alphaRed = hexToRgb(Color.RED, 0.7);
    return {
        ohlc: {
            compareRule: 'current_open',
            upColor: alphaGreen,
            downColor: alphaRed,
            noChangeColor: Color.GREY
        },
        bars: [{
                style: 'fill',
                borderStyle: 'solid',
                borderSize: 1,
                borderDashedValue: [2, 2],
                upColor: alphaGreen,
                downColor: alphaRed,
                noChangeColor: Color.GREY
            }],
        lines: ['#FF9600', '#935EBD', Color.BLUE, '#E11D74', '#01C5C4'].map(color => ({
            style: 'solid',
            smooth: false,
            size: 1,
            dashedValue: [2, 2],
            color
        })),
        circles: [{
                style: 'fill',
                borderStyle: 'solid',
                borderSize: 1,
                borderDashedValue: [2, 2],
                upColor: alphaGreen,
                downColor: alphaRed,
                noChangeColor: Color.GREY
            }],
        lastValueMark: {
            show: false,
            text: {
                show: false,
                style: 'fill',
                color: Color.WHITE,
                size: 12,
                family: 'Helvetica Neue',
                weight: 'normal',
                borderStyle: 'solid',
                borderColor: 'transparent',
                borderSize: 0,
                borderDashedValue: [2, 2],
                paddingLeft: 4,
                paddingTop: 4,
                paddingRight: 4,
                paddingBottom: 4,
                borderRadius: 2
            }
        },
        tooltip: {
            offsetLeft: 4,
            offsetTop: 6,
            offsetRight: 4,
            offsetBottom: 6,
            showRule: 'always',
            showType: 'standard',
            title: {
                show: true,
                showName: true,
                showParams: true,
                size: 12,
                family: 'Helvetica Neue',
                weight: 'normal',
                color: Color.GREY,
                marginLeft: 8,
                marginTop: 4,
                marginRight: 8,
                marginBottom: 4
            },
            legend: {
                size: 12,
                family: 'Helvetica Neue',
                weight: 'normal',
                color: Color.GREY,
                marginLeft: 8,
                marginTop: 4,
                marginRight: 8,
                marginBottom: 4,
                defaultValue: 'n/a'
            },
            features: []
        }
    };
}
function getDefaultAxisStyle() {
    return {
        show: true,
        size: 'auto',
        axisLine: {
            show: true,
            color: '#DDDDDD',
            size: 1
        },
        tickText: {
            show: true,
            color: Color.GREY,
            size: 12,
            family: 'Helvetica Neue',
            weight: 'normal',
            marginStart: 4,
            marginEnd: 6
        },
        tickLine: {
            show: true,
            size: 1,
            length: 3,
            color: '#DDDDDD'
        }
    };
}
function getDefaultCrosshairStyle() {
    return {
        show: true,
        horizontal: {
            show: true,
            line: {
                show: true,
                style: 'dashed',
                dashedValue: [4, 2],
                size: 1,
                color: Color.GREY
            },
            text: {
                show: true,
                style: 'fill',
                color: Color.WHITE,
                size: 12,
                family: 'Helvetica Neue',
                weight: 'normal',
                borderStyle: 'solid',
                borderDashedValue: [2, 2],
                borderSize: 1,
                borderColor: Color.GREY,
                borderRadius: 2,
                paddingLeft: 4,
                paddingRight: 4,
                paddingTop: 4,
                paddingBottom: 4,
                backgroundColor: Color.GREY
            },
            features: []
        },
        vertical: {
            show: true,
            line: {
                show: true,
                style: 'dashed',
                dashedValue: [4, 2],
                size: 1,
                color: Color.GREY
            },
            text: {
                show: true,
                style: 'fill',
                color: Color.WHITE,
                size: 12,
                family: 'Helvetica Neue',
                weight: 'normal',
                borderStyle: 'solid',
                borderDashedValue: [2, 2],
                borderSize: 1,
                borderColor: Color.GREY,
                borderRadius: 2,
                paddingLeft: 4,
                paddingRight: 4,
                paddingTop: 4,
                paddingBottom: 4,
                backgroundColor: Color.GREY
            }
        }
    };
}
function getDefaultOverlayStyle() {
    const pointBorderColor = hexToRgb(Color.BLUE, 0.35);
    const alphaBg = hexToRgb(Color.BLUE, 0.25);
    function text() {
        return {
            style: 'fill',
            color: Color.WHITE,
            size: 12,
            family: 'Helvetica Neue',
            weight: 'normal',
            borderStyle: 'solid',
            borderDashedValue: [2, 2],
            borderSize: 1,
            borderRadius: 2,
            borderColor: Color.BLUE,
            paddingLeft: 4,
            paddingRight: 4,
            paddingTop: 4,
            paddingBottom: 4,
            backgroundColor: Color.BLUE
        };
    }
    return {
        point: {
            color: Color.BLUE,
            borderColor: pointBorderColor,
            borderSize: 1,
            radius: 5,
            activeColor: Color.BLUE,
            activeBorderColor: pointBorderColor,
            activeBorderSize: 3,
            activeRadius: 5
        },
        line: {
            style: 'solid',
            smooth: false,
            color: Color.BLUE,
            size: 1,
            dashedValue: [2, 2]
        },
        rect: {
            style: 'fill',
            color: alphaBg,
            borderColor: Color.BLUE,
            borderSize: 1,
            borderRadius: 0,
            borderStyle: 'solid',
            borderDashedValue: [2, 2]
        },
        polygon: {
            style: 'fill',
            color: Color.BLUE,
            borderColor: Color.BLUE,
            borderSize: 1,
            borderStyle: 'solid',
            borderDashedValue: [2, 2]
        },
        circle: {
            style: 'fill',
            color: alphaBg,
            borderColor: Color.BLUE,
            borderSize: 1,
            borderStyle: 'solid',
            borderDashedValue: [2, 2]
        },
        arc: {
            style: 'solid',
            color: Color.BLUE,
            size: 1,
            dashedValue: [2, 2]
        },
        text: text()
    };
}
function getDefaultSeparatorStyle() {
    return {
        size: 1,
        color: '#DDDDDD',
        fill: true,
        activeBackgroundColor: hexToRgb(Color.BLUE, 0.08)
    };
}
function getDefaultStyles() {
    return {
        grid: getDefaultGridStyle(),
        candle: getDefaultCandleStyle(),
        indicator: getDefaultIndicatorStyle(),
        xAxis: getDefaultAxisStyle(),
        yAxis: getDefaultAxisStyle(),
        separator: getDefaultSeparatorStyle(),
        crosshair: getDefaultCrosshairStyle(),
        overlay: getDefaultOverlayStyle()
    };
}

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
const reEscapeChar = /\\(\\)?/g;
const rePropName = RegExp('[^.[\\]]+' + '|' +
    '\\[(?:' +
    '([^"\'][^[]*)' + '|' +
    '(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2' +
    ')\\]' + '|' +
    '(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))', 'g');
function formatValue(data, key, defaultValue) {
    if (isValid(data)) {
        const path = [];
        key.replace(rePropName, (subString, ...args) => {
            let k = subString;
            if (isValid(args[1])) {
                k = args[2].replace(reEscapeChar, '$1');
            }
            else if (isValid(args[0])) {
                k = args[0].trim();
            }
            path.push(k);
            return '';
        });
        let value = data;
        let index = 0;
        const length = path.length;
        while (isValid(value) && index < length) {
            value = value?.[path[index++]];
        }
        return isValid(value) ? value : (defaultValue ?? '--');
    }
    return defaultValue ?? '--';
}
function formatTimestampToDateTime(dateTimeFormat, timestamp) {
    const date = {};
    dateTimeFormat.formatToParts(new Date(timestamp)).forEach(({ type, value }) => {
        switch (type) {
            case 'year': {
                date.YYYY = value;
                break;
            }
            case 'month': {
                date.MM = value;
                break;
            }
            case 'day': {
                date.DD = value;
                break;
            }
            case 'hour': {
                date.HH = value === '24' ? '00' : value;
                break;
            }
            case 'minute': {
                date.mm = value;
                break;
            }
            case 'second': {
                date.ss = value;
                break;
            }
        }
    });
    return date;
}
function formatTimestampByTemplate(dateTimeFormat, timestamp, template) {
    const date = formatTimestampToDateTime(dateTimeFormat, timestamp);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- ignore
    return template.replace(/YYYY|MM|DD|HH|mm|ss/g, key => date[key]);
}
function formatPrecision(value, precision) {
    const v = +value;
    if (isNumber(v)) {
        return v.toFixed(precision ?? 2);
    }
    return `${value}`;
}
function formatBigNumber(value) {
    const v = +value;
    if (isNumber(v)) {
        if (v > 1000000000) {
            return `${+((v / 1000000000).toFixed(3))}B`;
        }
        if (v > 1000000) {
            return `${+((v / 1000000).toFixed(3))}M`;
        }
        if (v > 1000) {
            return `${+((v / 1000).toFixed(3))}K`;
        }
    }
    return `${value}`;
}
function formatThousands$1(value, sign) {
    const vl = `${value}`;
    if (sign.length === 0) {
        return vl;
    }
    if (vl.includes('.')) {
        const arr = vl.split('.');
        return `${arr[0].replace(/(\d)(?=(\d{3})+$)/g, $1 => `${$1}${sign}`)}.${arr[1]}`;
    }
    return vl.replace(/(\d)(?=(\d{3})+$)/g, $1 => `${$1}${sign}`);
}
function formatFoldDecimal(value, threshold) {
    const vl = `${value}`;
    const reg = new RegExp('\\.0{' + threshold + ',}[1-9][0-9]*$');
    if (reg.test(vl)) {
        const result = vl.split('.');
        const lastIndex = result.length - 1;
        const v = result[lastIndex];
        const match = /0*/.exec(v);
        if (isValid(match)) {
            const count = match[0].length;
            result[lastIndex] = v.replace(/0*/, `0{${count}}`);
            return result.join('.');
        }
    }
    return vl;
}
function formatTemplateString(template, params) {
    return template.replace(/\{(\w+)\}/g, (_, key) => {
        const value = params[key];
        if (isValid(value)) {
            return value;
        }
        return `{${key}}`;
    });
}

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
let measureCtx = null;
/**
 * Get pixel ratio
 * @param canvas
 * @returns {number}
 */
function getPixelRatio(canvas) {
    return canvas.ownerDocument.defaultView?.devicePixelRatio ?? 1;
}
function createFont(size, weight, family) {
    return `${weight ?? 'normal'} ${size ?? 12}px ${family ?? 'Helvetica Neue'}`;
}
/**
 * Measure the width of text
 * @param text
 * @returns {number}
 */
function calcTextWidth(text, size, weight, family) {
    if (!isValid(measureCtx)) {
        const canvas = document.createElement('canvas');
        const pixelRatio = getPixelRatio(canvas);
        measureCtx = canvas.getContext('2d');
        measureCtx.scale(pixelRatio, pixelRatio);
    }
    measureCtx.font = createFont(size, weight, family);
    return Math.round(measureCtx.measureText(text).width);
}

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
function getDistance$1(coordinate1, coordinate2) {
    const xDif = coordinate1.x - coordinate2.x;
    const yDif = coordinate1.y - coordinate2.y;
    return Math.sqrt(xDif * xDif + yDif * yDif);
}

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
class Eventful {
    _children = [];
    _callbacks = new Map();
    registerEvent(name, callback) {
        this._callbacks.set(name, callback);
        return this;
    }
    onEvent(name, event) {
        const callback = this._callbacks.get(name);
        if (isValid(callback) && this.checkEventOn(event)) {
            return callback(event);
        }
        return false;
    }
    dispatchEventToChildren(name, event) {
        const start = this._children.length - 1;
        if (start > -1) {
            for (let i = start; i > -1; i--) {
                if (this._children[i].dispatchEvent(name, event)) {
                    return true;
                }
            }
        }
        return false;
    }
    dispatchEvent(name, event) {
        if (this.dispatchEventToChildren(name, event)) {
            return true;
        }
        return this.onEvent(name, event);
    }
    addChild(eventful) {
        this._children.push(eventful);
        return this;
    }
    clear() {
        this._children = [];
    }
}

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
const DEVIATION = 2;
class FigureImp extends Eventful {
    attrs;
    styles;
    constructor(figure) {
        super();
        this.attrs = figure.attrs;
        this.styles = figure.styles;
    }
    checkEventOn(event) {
        return this.checkEventOnImp(event, this.attrs, this.styles);
    }
    setAttrs(attrs) {
        this.attrs = attrs;
        return this;
    }
    setStyles(styles) {
        this.styles = styles;
        return this;
    }
    draw(ctx) {
        this.drawImp(ctx, this.attrs, this.styles);
    }
    static extend(figure) {
        class Custom extends FigureImp {
            checkEventOnImp(coordinate, attrs, styles) {
                return figure.checkEventOn(coordinate, attrs, styles);
            }
            drawImp(ctx, attrs, styles) {
                figure.draw(ctx, attrs, styles);
            }
        }
        return Custom;
    }
}

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
function checkCoordinateOnArc(coordinate, attrs) {
    let arcs = [];
    arcs = arcs.concat(attrs);
    for (const arc of arcs) {
        if (Math.abs(getDistance$1(coordinate, arc) - arc.r) < DEVIATION) {
            const { r, startAngle, endAngle } = arc;
            const startCoordinateX = r * Math.cos(startAngle) + arc.x;
            const startCoordinateY = r * Math.sin(startAngle) + arc.y;
            const endCoordinateX = r * Math.cos(endAngle) + arc.x;
            const endCoordinateY = r * Math.sin(endAngle) + arc.y;
            if (coordinate.x <= Math.max(startCoordinateX, endCoordinateX) + DEVIATION &&
                coordinate.x >= Math.min(startCoordinateX, endCoordinateX) - DEVIATION &&
                coordinate.y <= Math.max(startCoordinateY, endCoordinateY) + DEVIATION &&
                coordinate.y >= Math.min(startCoordinateY, endCoordinateY) - DEVIATION) {
                return true;
            }
        }
    }
    return false;
}
function drawArc(ctx, attrs, styles) {
    let arcs = [];
    arcs = arcs.concat(attrs);
    const { style = 'solid', size = 1, color = 'currentColor', dashedValue = [2, 2] } = styles;
    ctx.lineWidth = size;
    ctx.strokeStyle = color;
    if (style === 'dashed') {
        ctx.setLineDash(dashedValue);
    }
    else {
        ctx.setLineDash([]);
    }
    arcs.forEach(({ x, y, r, startAngle, endAngle }) => {
        ctx.beginPath();
        ctx.arc(x, y, r, startAngle, endAngle);
        ctx.stroke();
        ctx.closePath();
    });
}
const arc$1 = {
    name: 'arc',
    checkEventOn: checkCoordinateOnArc,
    draw: (ctx, attrs, styles) => {
        drawArc(ctx, attrs, styles);
    }
};

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
function checkCoordinateOnCircle(coordinate, attrs) {
    let circles = [];
    circles = circles.concat(attrs);
    for (const circle of circles) {
        const { x, y, r } = circle;
        const difX = coordinate.x - x;
        const difY = coordinate.y - y;
        if (!(difX * difX + difY * difY > r * r)) {
            return true;
        }
    }
    return false;
}
function drawCircle(ctx, attrs, styles) {
    let circles = [];
    circles = circles.concat(attrs);
    const { style = 'fill', color = 'currentColor', borderSize = 1, borderColor = 'currentColor', borderStyle = 'solid', borderDashedValue = [2, 2] } = styles;
    const solid = (style === 'fill' || styles.style === 'stroke_fill') && (!isString(color) || !isTransparent(color));
    if (solid) {
        ctx.fillStyle = color;
        circles.forEach(({ x, y, r }) => {
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        });
    }
    if ((style === 'stroke' || styles.style === 'stroke_fill') && borderSize > 0 && !isTransparent(borderColor)) {
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = borderSize;
        if (borderStyle === 'dashed') {
            ctx.setLineDash(borderDashedValue);
        }
        else {
            ctx.setLineDash([]);
        }
        circles.forEach(({ x, y, r }) => {
            if (!solid || r > borderSize) {
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.closePath();
                ctx.stroke();
            }
        });
    }
}
const circle$2 = {
    name: 'circle',
    checkEventOn: checkCoordinateOnCircle,
    draw: (ctx, attrs, styles) => {
        drawCircle(ctx, attrs, styles);
    }
};

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
function checkCoordinateOnLine(coordinate, attrs) {
    let lines = [];
    lines = lines.concat(attrs);
    for (const line of lines) {
        const { coordinates } = line;
        if (coordinates.length > 1) {
            for (let i = 1; i < coordinates.length; i++) {
                const prevCoordinate = coordinates[i - 1];
                const currentCoordinate = coordinates[i];
                if (prevCoordinate.x === currentCoordinate.x) {
                    if (Math.abs(prevCoordinate.y - coordinate.y) + Math.abs(currentCoordinate.y - coordinate.y) - Math.abs(prevCoordinate.y - currentCoordinate.y) < DEVIATION + DEVIATION &&
                        Math.abs(coordinate.x - prevCoordinate.x) < DEVIATION) {
                        return true;
                    }
                }
                else {
                    const kb = getLinearSlopeIntercept(prevCoordinate, currentCoordinate);
                    const y = getLinearYFromSlopeIntercept(kb, coordinate);
                    const yDif = Math.abs(y - coordinate.y);
                    if (Math.abs(prevCoordinate.x - coordinate.x) + Math.abs(currentCoordinate.x - coordinate.x) - Math.abs(prevCoordinate.x - currentCoordinate.x) < DEVIATION + DEVIATION &&
                        yDif * yDif / (kb[0] * kb[0] + 1) < DEVIATION * DEVIATION) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}
function getLinearYFromSlopeIntercept(kb, coordinate) {
    if (kb !== null) {
        return coordinate.x * kb[0] + kb[1];
    }
    return coordinate.y;
}
/**
 * 获取点在两点决定的一次函数上的y值
 * @param coordinate1
 * @param coordinate2
 * @param targetCoordinate
 */
function getLinearYFromCoordinates(coordinate1, coordinate2, targetCoordinate) {
    const kb = getLinearSlopeIntercept(coordinate1, coordinate2);
    return getLinearYFromSlopeIntercept(kb, targetCoordinate);
}
function getLinearSlopeIntercept(coordinate1, coordinate2) {
    const difX = coordinate1.x - coordinate2.x;
    if (difX !== 0) {
        const k = (coordinate1.y - coordinate2.y) / difX;
        const b = coordinate1.y - k * coordinate1.x;
        return [k, b];
    }
    return null;
}
function lineTo(ctx, coordinates, smooth) {
    const length = coordinates.length;
    const smoothParam = isNumber(smooth) ? (smooth > 0 && smooth < 1 ? smooth : 0) : (smooth ? 0.5 : 0);
    if ((smoothParam > 0) && length > 2) {
        let cpx0 = coordinates[0].x;
        let cpy0 = coordinates[0].y;
        for (let i = 1; i < length - 1; i++) {
            const prevCoordinate = coordinates[i - 1];
            const coordinate = coordinates[i];
            const nextCoordinate = coordinates[i + 1];
            const dx01 = coordinate.x - prevCoordinate.x;
            const dy01 = coordinate.y - prevCoordinate.y;
            const dx12 = nextCoordinate.x - coordinate.x;
            const dy12 = nextCoordinate.y - coordinate.y;
            let dx02 = nextCoordinate.x - prevCoordinate.x;
            let dy02 = nextCoordinate.y - prevCoordinate.y;
            const prevSegmentLength = Math.sqrt(dx01 * dx01 + dy01 * dy01);
            const nextSegmentLength = Math.sqrt(dx12 * dx12 + dy12 * dy12);
            const segmentLengthRatio = nextSegmentLength / (nextSegmentLength + prevSegmentLength);
            let nextCpx = coordinate.x + dx02 * smoothParam * segmentLengthRatio;
            let nextCpy = coordinate.y + dy02 * smoothParam * segmentLengthRatio;
            nextCpx = Math.min(nextCpx, Math.max(nextCoordinate.x, coordinate.x));
            nextCpy = Math.min(nextCpy, Math.max(nextCoordinate.y, coordinate.y));
            nextCpx = Math.max(nextCpx, Math.min(nextCoordinate.x, coordinate.x));
            nextCpy = Math.max(nextCpy, Math.min(nextCoordinate.y, coordinate.y));
            dx02 = nextCpx - coordinate.x;
            dy02 = nextCpy - coordinate.y;
            let cpx1 = coordinate.x - dx02 * prevSegmentLength / nextSegmentLength;
            let cpy1 = coordinate.y - dy02 * prevSegmentLength / nextSegmentLength;
            cpx1 = Math.min(cpx1, Math.max(prevCoordinate.x, coordinate.x));
            cpy1 = Math.min(cpy1, Math.max(prevCoordinate.y, coordinate.y));
            cpx1 = Math.max(cpx1, Math.min(prevCoordinate.x, coordinate.x));
            cpy1 = Math.max(cpy1, Math.min(prevCoordinate.y, coordinate.y));
            dx02 = coordinate.x - cpx1;
            dy02 = coordinate.y - cpy1;
            nextCpx = coordinate.x + dx02 * nextSegmentLength / prevSegmentLength;
            nextCpy = coordinate.y + dy02 * nextSegmentLength / prevSegmentLength;
            ctx.bezierCurveTo(cpx0, cpy0, cpx1, cpy1, coordinate.x, coordinate.y);
            cpx0 = nextCpx;
            cpy0 = nextCpy;
        }
        const lastCoordinate = coordinates[length - 1];
        ctx.bezierCurveTo(cpx0, cpy0, lastCoordinate.x, lastCoordinate.y, lastCoordinate.x, lastCoordinate.y);
    }
    else {
        for (let i = 1; i < length; i++) {
            ctx.lineTo(coordinates[i].x, coordinates[i].y);
        }
    }
}
function drawLine(ctx, attrs, styles) {
    let lines = [];
    lines = lines.concat(attrs);
    const { style = 'solid', smooth = false, size = 1, color = 'currentColor', dashedValue = [2, 2] } = styles;
    ctx.lineWidth = size;
    ctx.strokeStyle = color;
    if (style === 'dashed') {
        ctx.setLineDash(dashedValue);
    }
    else {
        ctx.setLineDash([]);
    }
    const correction = size % 2 === 1 ? 0.5 : 0;
    lines.forEach(({ coordinates }) => {
        if (coordinates.length > 1) {
            if (coordinates.length === 2 &&
                (coordinates[0].x === coordinates[1].x ||
                    coordinates[0].y === coordinates[1].y)) {
                ctx.beginPath();
                if (coordinates[0].x === coordinates[1].x) {
                    ctx.moveTo(coordinates[0].x + correction, coordinates[0].y);
                    ctx.lineTo(coordinates[1].x + correction, coordinates[1].y);
                }
                else {
                    ctx.moveTo(coordinates[0].x, coordinates[0].y + correction);
                    ctx.lineTo(coordinates[1].x, coordinates[1].y + correction);
                }
                ctx.stroke();
                ctx.closePath();
            }
            else {
                ctx.save();
                if (size % 2 === 1) {
                    ctx.translate(0.5, 0.5);
                }
                ctx.beginPath();
                ctx.moveTo(coordinates[0].x, coordinates[0].y);
                lineTo(ctx, coordinates, smooth);
                ctx.stroke();
                ctx.closePath();
                ctx.restore();
            }
        }
    });
}
const line = {
    name: 'line',
    checkEventOn: checkCoordinateOnLine,
    draw: (ctx, attrs, styles) => {
        drawLine(ctx, attrs, styles);
    }
};

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
function checkCoordinateOnPolygon(coordinate, attrs) {
    let polygons = [];
    polygons = polygons.concat(attrs);
    for (const polygon of polygons) {
        let on = false;
        const { coordinates } = polygon;
        for (let i = 0, j = coordinates.length - 1; i < coordinates.length; j = i++) {
            if ((coordinates[i].y > coordinate.y) !== (coordinates[j].y > coordinate.y) &&
                (coordinate.x < (coordinates[j].x - coordinates[i].x) * (coordinate.y - coordinates[i].y) / (coordinates[j].y - coordinates[i].y) + coordinates[i].x)) {
                on = !on;
            }
        }
        if (on) {
            return true;
        }
    }
    return false;
}
function drawPolygon(ctx, attrs, styles) {
    let polygons = [];
    polygons = polygons.concat(attrs);
    const { style = 'fill', color = 'currentColor', borderSize = 1, borderColor = 'currentColor', borderStyle = 'solid', borderDashedValue = [2, 2] } = styles;
    if ((style === 'fill' || styles.style === 'stroke_fill') &&
        (!isString(color) || !isTransparent(color))) {
        ctx.fillStyle = color;
        polygons.forEach(({ coordinates }) => {
            ctx.beginPath();
            ctx.moveTo(coordinates[0].x, coordinates[0].y);
            for (let i = 1; i < coordinates.length; i++) {
                ctx.lineTo(coordinates[i].x, coordinates[i].y);
            }
            ctx.closePath();
            ctx.fill();
        });
    }
    if ((style === 'stroke' || styles.style === 'stroke_fill') && borderSize > 0 && !isTransparent(borderColor)) {
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = borderSize;
        if (borderStyle === 'dashed') {
            ctx.setLineDash(borderDashedValue);
        }
        else {
            ctx.setLineDash([]);
        }
        polygons.forEach(({ coordinates }) => {
            ctx.beginPath();
            ctx.moveTo(coordinates[0].x, coordinates[0].y);
            for (let i = 1; i < coordinates.length; i++) {
                ctx.lineTo(coordinates[i].x, coordinates[i].y);
            }
            ctx.closePath();
            ctx.stroke();
        });
    }
}
const polygon = {
    name: 'polygon',
    checkEventOn: checkCoordinateOnPolygon,
    draw: (ctx, attrs, styles) => {
        drawPolygon(ctx, attrs, styles);
    }
};

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
function checkCoordinateOnRect(coordinate, attrs) {
    let rects = [];
    rects = rects.concat(attrs);
    for (const rect of rects) {
        let x = rect.x;
        let width = rect.width;
        if (width < DEVIATION * 2) {
            x -= DEVIATION;
            width = DEVIATION * 2;
        }
        let y = rect.y;
        let height = rect.height;
        if (height < DEVIATION * 2) {
            y -= DEVIATION;
            height = DEVIATION * 2;
        }
        if (coordinate.x >= x &&
            coordinate.x <= x + width &&
            coordinate.y >= y &&
            coordinate.y <= y + height) {
            return true;
        }
    }
    return false;
}
function drawRect(ctx, attrs, styles) {
    let rects = [];
    rects = rects.concat(attrs);
    const { style = 'fill', color = 'transparent', borderSize = 1, borderColor = 'transparent', borderStyle = 'solid', borderRadius: r = 0, borderDashedValue = [2, 2] } = styles;
    // eslint-disable-next-line @typescript-eslint/unbound-method, @typescript-eslint/no-unnecessary-condition -- ignore
    const draw = ctx.roundRect ?? ctx.rect;
    const solid = (style === 'fill' || styles.style === 'stroke_fill') && (!isString(color) || !isTransparent(color));
    if (solid) {
        ctx.fillStyle = color;
        rects.forEach(({ x, y, width: w, height: h }) => {
            ctx.beginPath();
            draw.call(ctx, x, y, w, h, r);
            ctx.closePath();
            ctx.fill();
        });
    }
    if ((style === 'stroke' || styles.style === 'stroke_fill') && borderSize > 0 && !isTransparent(borderColor)) {
        ctx.strokeStyle = borderColor;
        ctx.fillStyle = borderColor;
        ctx.lineWidth = borderSize;
        if (borderStyle === 'dashed') {
            ctx.setLineDash(borderDashedValue);
        }
        else {
            ctx.setLineDash([]);
        }
        const correction = borderSize % 2 === 1 ? 0.5 : 0;
        const doubleCorrection = Math.round(correction * 2);
        rects.forEach(({ x, y, width: w, height: h }) => {
            if (w > borderSize * 2 && h > borderSize * 2) {
                ctx.beginPath();
                draw.call(ctx, x + correction, y + correction, w - doubleCorrection, h - doubleCorrection, r);
                ctx.closePath();
                ctx.stroke();
            }
            else {
                if (!solid) {
                    ctx.fillRect(x, y, w, h);
                }
            }
        });
    }
}
const rect$2 = {
    name: 'rect',
    checkEventOn: checkCoordinateOnRect,
    draw: (ctx, attrs, styles) => {
        drawRect(ctx, attrs, styles);
    }
};

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
function getTextRect(attrs, styles) {
    const { size = 12, paddingLeft = 0, paddingTop = 0, paddingRight = 0, paddingBottom = 0, weight = 'normal', family } = styles;
    const { x, y, text, align = 'left', baseline = 'top', width: w, height: h } = attrs;
    const width = w ?? (paddingLeft + calcTextWidth(text, size, weight, family) + paddingRight);
    const height = h ?? (paddingTop + size + paddingBottom);
    let startX = 0;
    switch (align) {
        case 'left':
        case 'start': {
            startX = x;
            break;
        }
        case 'right':
        case 'end': {
            startX = x - width;
            break;
        }
        default: {
            startX = x - width / 2;
            break;
        }
    }
    let startY = 0;
    switch (baseline) {
        case 'top':
        case 'hanging': {
            startY = y;
            break;
        }
        case 'bottom':
        case 'ideographic':
        case 'alphabetic': {
            startY = y - height;
            break;
        }
        default: {
            startY = y - height / 2;
            break;
        }
    }
    return { x: startX, y: startY, width, height };
}
function checkCoordinateOnText(coordinate, attrs, styles) {
    let texts = [];
    texts = texts.concat(attrs);
    for (const text of texts) {
        const { x, y, width, height } = getTextRect(text, styles);
        if (coordinate.x >= x &&
            coordinate.x <= x + width &&
            coordinate.y >= y &&
            coordinate.y <= y + height) {
            return true;
        }
    }
    return false;
}
function drawText(ctx, attrs, styles) {
    let texts = [];
    texts = texts.concat(attrs);
    const { color = 'currentColor', size = 12, family, weight, paddingLeft = 0, paddingTop = 0, paddingRight = 0 } = styles;
    const rects = texts.map(text => getTextRect(text, styles));
    drawRect(ctx, rects, { ...styles, color: styles.backgroundColor });
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.font = createFont(size, weight, family);
    ctx.fillStyle = color;
    texts.forEach((text, index) => {
        const rect = rects[index];
        ctx.fillText(text.text, rect.x + paddingLeft, rect.y + paddingTop, rect.width - paddingLeft - paddingRight);
    });
}
const text = {
    name: 'text',
    checkEventOn: checkCoordinateOnText,
    draw: (ctx, attrs, styles) => {
        drawText(ctx, attrs, styles);
    }
};

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
function drawEllipticalArc(ctx, x1, y1, args, offsetX, offsetY, isRelative) {
    const [rx, ry, rotation, largeArcFlag, sweepFlag, x2, y2] = args;
    const targetX = isRelative ? x1 + x2 : x2 + offsetX;
    const targetY = isRelative ? y1 + y2 : y2 + offsetY;
    const segments = ellipticalArcToBeziers(x1, y1, rx, ry, rotation, largeArcFlag, sweepFlag, targetX, targetY);
    segments.forEach(segment => {
        ctx.bezierCurveTo(segment[0], segment[1], segment[2], segment[3], segment[4], segment[5]);
    });
}
function ellipticalArcToBeziers(x1, y1, rx, ry, rotation, largeArcFlag, sweepFlag, x2, y2) {
    const { cx, cy, startAngle, deltaAngle } = computeEllipticalArcParameters(x1, y1, rx, ry, rotation, largeArcFlag, sweepFlag, x2, y2);
    const segments = [];
    const numSegments = Math.ceil(Math.abs(deltaAngle) / (Math.PI / 2));
    for (let i = 0; i < numSegments; i++) {
        const start = startAngle + (i * deltaAngle) / numSegments;
        const end = startAngle + ((i + 1) * deltaAngle) / numSegments;
        const bezier = ellipticalArcToBezier(cx, cy, rx, ry, rotation, start, end);
        segments.push(bezier);
    }
    return segments;
}
function computeEllipticalArcParameters(x1, y1, rx, ry, rotation, largeArcFlag, sweepFlag, x2, y2) {
    const phi = (rotation * Math.PI) / 180;
    const dx = (x1 - x2) / 2;
    const dy = (y1 - y2) / 2;
    const x1p = Math.cos(phi) * dx + Math.sin(phi) * dy;
    const y1p = -Math.sin(phi) * dx + Math.cos(phi) * dy;
    const lambda = (x1p ** 2) / (rx ** 2) + (y1p ** 2) / (ry ** 2);
    if (lambda > 1) {
        rx *= Math.sqrt(lambda);
        ry *= Math.sqrt(lambda);
    }
    const sign = largeArcFlag === sweepFlag ? -1 : 1;
    const numerator = (rx ** 2) * (ry ** 2) - (rx ** 2) * (y1p ** 2) - (ry ** 2) * (x1p ** 2);
    const denominator = (rx ** 2) * (y1p ** 2) + (ry ** 2) * (x1p ** 2);
    const cxp = sign * Math.sqrt(Math.abs(numerator / denominator)) * (rx * y1p / ry);
    const cyp = sign * Math.sqrt(Math.abs(numerator / denominator)) * (-ry * x1p / rx);
    const cx = Math.cos(phi) * cxp - Math.sin(phi) * cyp + (x1 + x2) / 2;
    const cy = Math.sin(phi) * cxp + Math.cos(phi) * cyp + (y1 + y2) / 2;
    const startAngle = Math.atan2((y1p - cyp) / ry, (x1p - cxp) / rx);
    let deltaAngle = Math.atan2((-y1p - cyp) / ry, (-x1p - cxp) / rx) - startAngle;
    if (deltaAngle < 0 && sweepFlag === 1) {
        deltaAngle += 2 * Math.PI;
    }
    else if (deltaAngle > 0 && sweepFlag === 0) {
        deltaAngle -= 2 * Math.PI;
    }
    return { cx, cy, startAngle, deltaAngle };
}
/**
 * Ellipse arc segment to Bezier curve
 * @param cx
 * @param cy
 * @param rx
 * @param ry
 * @param rotation
 * @param startAngle
 * @param endAngle
 * @returns
 */
function ellipticalArcToBezier(cx, cy, rx, ry, rotation, startAngle, endAngle) {
    // 计算控制点
    const alpha = Math.sin(endAngle - startAngle) * (Math.sqrt(4 + 3 * Math.tan((endAngle - startAngle) / 2) ** 2) - 1) / 3;
    const cosPhi = Math.cos(rotation);
    const sinPhi = Math.sin(rotation);
    const x1 = cx + rx * Math.cos(startAngle) * cosPhi - ry * Math.sin(startAngle) * sinPhi;
    const y1 = cy + rx * Math.cos(startAngle) * sinPhi + ry * Math.sin(startAngle) * cosPhi;
    const x2 = cx + rx * Math.cos(endAngle) * cosPhi - ry * Math.sin(endAngle) * sinPhi;
    const y2 = cy + rx * Math.cos(endAngle) * sinPhi + ry * Math.sin(endAngle) * cosPhi;
    const cp1x = x1 + alpha * (-rx * Math.sin(startAngle) * cosPhi - ry * Math.cos(startAngle) * sinPhi);
    const cp1y = y1 + alpha * (-rx * Math.sin(startAngle) * sinPhi + ry * Math.cos(startAngle) * cosPhi);
    const cp2x = x2 - alpha * (-rx * Math.sin(endAngle) * cosPhi - ry * Math.cos(endAngle) * sinPhi);
    const cp2y = y2 - alpha * (-rx * Math.sin(endAngle) * sinPhi + ry * Math.cos(endAngle) * cosPhi);
    return [cp1x, cp1y, cp2x, cp2y, x2, y2];
}
function drawPath(ctx, attrs, styles) {
    let paths = [];
    paths = paths.concat(attrs);
    const { lineWidth = 1, color = 'currentColor' } = styles;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.setLineDash([]);
    paths.forEach(({ x, y, path }) => {
        const commands = path.match(/[MLHVCSQTAZ][^MLHVCSQTAZ]*/gi);
        if (isValid(commands)) {
            const offsetX = x;
            const offsetY = y;
            ctx.beginPath();
            commands.forEach(command => {
                let currentX = 0;
                let currentY = 0;
                let startX = 0;
                let startY = 0;
                const type = command[0];
                const args = command.slice(1).trim().split(/[\s,]+/).map(Number);
                switch (type) {
                    case 'M':
                        currentX = args[0] + offsetX;
                        currentY = args[1] + offsetY;
                        ctx.moveTo(currentX, currentY);
                        startX = currentX;
                        startY = currentY;
                        break;
                    case 'm':
                        currentX += args[0];
                        currentY += args[1];
                        ctx.moveTo(currentX, currentY);
                        startX = currentX;
                        startY = currentY;
                        break;
                    case 'L':
                        currentX = args[0] + offsetX;
                        currentY = args[1] + offsetY;
                        ctx.lineTo(currentX, currentY);
                        break;
                    case 'l':
                        currentX += args[0];
                        currentY += args[1];
                        ctx.lineTo(currentX, currentY);
                        break;
                    case 'H':
                        currentX = args[0] + offsetX;
                        ctx.lineTo(currentX, currentY);
                        break;
                    case 'h':
                        currentX += args[0];
                        ctx.lineTo(currentX, currentY);
                        break;
                    case 'V':
                        currentY = args[0] + offsetY;
                        ctx.lineTo(currentX, currentY);
                        break;
                    case 'v':
                        currentY += args[0];
                        ctx.lineTo(currentX, currentY);
                        break;
                    case 'C':
                        ctx.bezierCurveTo(args[0] + offsetX, args[1] + offsetY, args[2] + offsetX, args[3] + offsetY, args[4] + offsetX, args[5] + offsetY);
                        currentX = args[4] + offsetX;
                        currentY = args[5] + offsetY;
                        break;
                    case 'c':
                        ctx.bezierCurveTo(currentX + args[0], currentY + args[1], currentX + args[2], currentY + args[3], currentX + args[4], currentY + args[5]);
                        currentX += args[4];
                        currentY += args[5];
                        break;
                    case 'S':
                        ctx.bezierCurveTo(currentX, currentY, args[0] + offsetX, args[1] + offsetY, args[2] + offsetX, args[3] + offsetY);
                        currentX = args[2] + offsetX;
                        currentY = args[3] + offsetY;
                        break;
                    case 's':
                        ctx.bezierCurveTo(currentX, currentY, currentX + args[0], currentY + args[1], currentX + args[2], currentY + args[3]);
                        currentX += args[2];
                        currentY += args[3];
                        break;
                    case 'Q':
                        ctx.quadraticCurveTo(args[0] + offsetX, args[1] + offsetY, args[2] + offsetX, args[3] + offsetY);
                        currentX = args[2] + offsetX;
                        currentY = args[3] + offsetY;
                        break;
                    case 'q':
                        ctx.quadraticCurveTo(currentX + args[0], currentY + args[1], currentX + args[2], currentY + args[3]);
                        currentX += args[2];
                        currentY += args[3];
                        break;
                    case 'T':
                        ctx.quadraticCurveTo(currentX, currentY, args[0] + offsetX, args[1] + offsetY);
                        currentX = args[0] + offsetX;
                        currentY = args[1] + offsetY;
                        break;
                    case 't':
                        ctx.quadraticCurveTo(currentX, currentY, currentX + args[0], currentY + args[1]);
                        currentX += args[0];
                        currentY += args[1];
                        break;
                    case 'A':
                        // arc
                        // reference https://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes
                        drawEllipticalArc(ctx, currentX, currentY, args, offsetX, offsetY, false);
                        currentX = args[5] + offsetX;
                        currentY = args[6] + offsetY;
                        break;
                    case 'a':
                        // arc
                        // reference https://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes
                        drawEllipticalArc(ctx, currentX, currentY, args, offsetX, offsetY, true);
                        currentX += args[5];
                        currentY += args[6];
                        break;
                    case 'Z':
                    case 'z':
                        ctx.closePath();
                        currentX = startX;
                        currentY = startY;
                        break;
                }
            });
            if (styles.style === 'fill') {
                ctx.fill();
            }
            else {
                ctx.stroke();
            }
        }
    });
}
const path = {
    name: 'path',
    checkEventOn: checkCoordinateOnRect,
    draw: (ctx, attrs, styles) => {
        drawPath(ctx, attrs, styles);
    }
};

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
const figures = {};
const extensions$2 = [circle$2, line, polygon, rect$2, text, arc$1, path];
extensions$2.forEach((figure) => {
    figures[figure.name] = FigureImp.extend(figure);
});
function getSupportedFigures() {
    return Object.keys(figures);
}
function registerFigure(figure) {
    figures[figure.name] = FigureImp.extend(figure);
}
function getInnerFigureClass(name) {
    return figures[name] ?? null;
}
function getFigureClass(name) {
    return figures[name] ?? null;
}

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
function eachFigures(indicator, dataIndex, defaultStyles, eachFigureCallback) {
    const result = indicator.result;
    const figures = indicator.figures;
    const styles = indicator.styles;
    const circleStyles = formatValue(styles, 'circles', defaultStyles.circles);
    const circleStyleCount = circleStyles.length;
    const barStyles = formatValue(styles, 'bars', defaultStyles.bars);
    const barStyleCount = barStyles.length;
    const lineStyles = formatValue(styles, 'lines', defaultStyles.lines);
    const lineStyleCount = lineStyles.length;
    let circleCount = 0;
    let barCount = 0;
    let lineCount = 0;
    // eslint-disable-next-line @typescript-eslint/init-declarations  -- ignore
    let defaultFigureStyles;
    let figureIndex = 0;
    figures.forEach(figure => {
        switch (figure.type) {
            case 'circle': {
                figureIndex = circleCount;
                const styles = circleStyles[circleCount % circleStyleCount];
                defaultFigureStyles = { ...styles, color: styles.noChangeColor };
                circleCount++;
                break;
            }
            case 'bar': {
                figureIndex = barCount;
                const styles = barStyles[barCount % barStyleCount];
                defaultFigureStyles = { ...styles, color: styles.noChangeColor };
                barCount++;
                break;
            }
            case 'line': {
                figureIndex = lineCount;
                defaultFigureStyles = lineStyles[lineCount % lineStyleCount];
                lineCount++;
                break;
            }
        }
        if (isValid(figure.type)) {
            const ss = figure.styles?.({
                data: {
                    prev: result[dataIndex - 1],
                    current: result[dataIndex],
                    next: result[dataIndex + 1]
                },
                indicator,
                defaultStyles
            });
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- ignore
            eachFigureCallback(figure, { ...defaultFigureStyles, ...ss }, figureIndex);
        }
    });
}
class IndicatorImp {
    id;
    paneId;
    name;
    shortName;
    precision = 4;
    calcParams = [];
    shouldOhlc = false;
    shouldFormatBigNumber = false;
    visible = true;
    zLevel = 0;
    extendData;
    series = 'normal';
    figures = [];
    minValue = null;
    maxValue = null;
    styles = null;
    shouldUpdate = (prev, current) => {
        const calc = JSON.stringify(prev.calcParams) !== JSON.stringify(current.calcParams) ||
            prev.figures !== current.figures ||
            prev.calc !== current.calc;
        const draw = calc ||
            prev.shortName !== current.shortName ||
            prev.series !== current.series ||
            prev.minValue !== current.minValue ||
            prev.maxValue !== current.maxValue ||
            prev.precision !== current.precision ||
            prev.shouldOhlc !== current.shouldOhlc ||
            prev.shouldFormatBigNumber !== current.shouldFormatBigNumber ||
            prev.visible !== current.visible ||
            prev.zLevel !== current.zLevel ||
            prev.extendData !== current.extendData ||
            prev.regenerateFigures !== current.regenerateFigures ||
            prev.createTooltipDataSource !== current.createTooltipDataSource ||
            prev.draw !== current.draw;
        return { calc, draw };
    };
    calc = () => [];
    regenerateFigures = null;
    createTooltipDataSource = null;
    draw = null;
    result = [];
    _prevIndicator;
    _lockSeriesPrecision = false;
    constructor(indicator) {
        this.override(indicator);
        this._lockSeriesPrecision = false;
    }
    override(indicator) {
        const { result, ...currentOthers } = this;
        this._prevIndicator = { ...clone(currentOthers), result };
        const { id, name, shortName, precision, styles, figures, calcParams, ...others } = indicator;
        if (!isString(this.id) && isString(id)) {
            this.id = id;
        }
        if (!isString(this.name)) {
            this.name = name ?? '';
        }
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition  -- ignore
        this.shortName = shortName ?? this.shortName ?? this.name;
        if (isNumber(precision)) {
            this.precision = precision;
            this._lockSeriesPrecision = true;
        }
        if (isValid(styles)) {
            this.styles ??= {};
            merge(this.styles, styles);
        }
        merge(this, others);
        if (isValid(calcParams)) {
            this.calcParams = calcParams;
            if (isFunction(this.regenerateFigures)) {
                this.figures = this.regenerateFigures(this.calcParams);
            }
        }
        this.figures = figures ?? this.figures;
    }
    setSeriesPrecision(precision) {
        if (!this._lockSeriesPrecision) {
            this.precision = precision;
        }
    }
    shouldUpdateImp() {
        const sort = this._prevIndicator.zLevel !== this.zLevel;
        const result = this.shouldUpdate(this._prevIndicator, this);
        if (isBoolean(result)) {
            return { calc: result, draw: result, sort };
        }
        return { ...result, sort };
    }
    async calcImp(dataList) {
        try {
            const result = await this.calc(dataList, this);
            this.result = result;
            return true;
        }
        catch (e) {
            return false;
        }
    }
    static extend(template) {
        class Custom extends IndicatorImp {
            constructor() {
                super(template);
            }
        }
        return Custom;
    }
}

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
/**
 * average price
 */
const averagePrice = {
    name: 'AVP',
    shortName: 'AVP',
    series: 'price',
    precision: 2,
    figures: [
        { key: 'avp', title: 'AVP: ', type: 'line' }
    ],
    calc: (dataList) => {
        let totalTurnover = 0;
        let totalVolume = 0;
        return dataList.map((kLineData) => {
            const avp = {};
            const turnover = kLineData.turnover ?? 0;
            const volume = kLineData.volume ?? 0;
            totalTurnover += turnover;
            totalVolume += volume;
            if (totalVolume !== 0) {
                avp.avp = totalTurnover / totalVolume;
            }
            return avp;
        });
    }
};

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
const awesomeOscillator = {
    name: 'AO',
    shortName: 'AO',
    calcParams: [5, 34],
    figures: [{
            key: 'ao',
            title: 'AO: ',
            type: 'bar',
            baseValue: 0,
            styles: ({ data, indicator, defaultStyles }) => {
                const { prev, current } = data;
                const prevAo = prev?.ao ?? Number.MIN_SAFE_INTEGER;
                const currentAo = current?.ao ?? Number.MIN_SAFE_INTEGER;
                let color = '';
                if (currentAo > prevAo) {
                    color = formatValue(indicator.styles, 'bars[0].upColor', (defaultStyles.bars)[0].upColor);
                }
                else {
                    color = formatValue(indicator.styles, 'bars[0].downColor', (defaultStyles.bars)[0].downColor);
                }
                const style = currentAo > prevAo ? 'stroke' : 'fill';
                return { color, style, borderColor: color };
            }
        }],
    calc: (dataList, indicator) => {
        const params = indicator.calcParams;
        const maxPeriod = Math.max(params[0], params[1]);
        let shortSum = 0;
        let longSum = 0;
        let short = 0;
        let long = 0;
        return dataList.map((kLineData, i) => {
            const ao = {};
            const middle = (kLineData.low + kLineData.high) / 2;
            shortSum += middle;
            longSum += middle;
            if (i >= params[0] - 1) {
                short = shortSum / params[0];
                const agoKLineData = dataList[i - (params[0] - 1)];
                shortSum -= ((agoKLineData.low + agoKLineData.high) / 2);
            }
            if (i >= params[1] - 1) {
                long = longSum / params[1];
                const agoKLineData = dataList[i - (params[1] - 1)];
                longSum -= ((agoKLineData.low + agoKLineData.high) / 2);
            }
            if (i >= maxPeriod - 1) {
                ao.ao = short - long;
            }
            return ao;
        });
    }
};

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
/**
 * BIAS
 * 乖离率=[(当日收盘价-N日平均价)/N日平均价]*100%
 */
const bias = {
    name: 'BIAS',
    shortName: 'BIAS',
    calcParams: [6, 12, 24],
    figures: [
        { key: 'bias1', title: 'BIAS6: ', type: 'line' },
        { key: 'bias2', title: 'BIAS12: ', type: 'line' },
        { key: 'bias3', title: 'BIAS24: ', type: 'line' }
    ],
    regenerateFigures: (params) => params.map((p, i) => ({ key: `bias${i + 1}`, title: `BIAS${p}: `, type: 'line' })),
    calc: (dataList, indicator) => {
        const { calcParams: params, figures } = indicator;
        const closeSums = [];
        return dataList.map((kLineData, i) => {
            const bias = {};
            const close = kLineData.close;
            params.forEach((p, index) => {
                closeSums[index] = (closeSums[index] ?? 0) + close;
                if (i >= p - 1) {
                    const mean = closeSums[index] / params[index];
                    bias[figures[index].key] = (close - mean) / mean * 100;
                    closeSums[index] -= dataList[i - (p - 1)].close;
                }
            });
            return bias;
        });
    }
};

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
/**
 * 计算布林指标中的标准差
 * @param dataList
 * @param ma
 * @return {number}
 */
function getBollMd(dataList, ma) {
    const dataSize = dataList.length;
    let sum = 0;
    dataList.forEach(data => {
        const closeMa = data.close - ma;
        sum += closeMa * closeMa;
    });
    sum = Math.abs(sum);
    return Math.sqrt(sum / dataSize);
}
/**
 * BOLL
 */
const bollingerBands = {
    name: 'BOLL',
    shortName: 'BOLL',
    series: 'price',
    calcParams: [20, 2],
    precision: 2,
    shouldOhlc: true,
    figures: [
        { key: 'up', title: 'UP: ', type: 'line' },
        { key: 'mid', title: 'MID: ', type: 'line' },
        { key: 'dn', title: 'DN: ', type: 'line' }
    ],
    calc: (dataList, indicator) => {
        const params = indicator.calcParams;
        const p = params[0] - 1;
        let closeSum = 0;
        return dataList.map((kLineData, i) => {
            const close = kLineData.close;
            const boll = {};
            closeSum += close;
            if (i >= p) {
                boll.mid = closeSum / params[0];
                const md = getBollMd(dataList.slice(i - p, i + 1), boll.mid);
                boll.up = boll.mid + params[1] * md;
                boll.dn = boll.mid - params[1] * md;
                closeSum -= dataList[i - p].close;
            }
            return boll;
        });
    }
};

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
/**
 * BRAR
 * 默认参数是26。
 * 公式N日BR=N日内（H－CY）之和除以N日内（CY－L）之和*100，
 * 其中，H为当日最高价，L为当日最低价，CY为前一交易日的收盘价，N为设定的时间参数。
 * N日AR=(N日内（H－O）之和除以N日内（O－L）之和)*100，
 * 其中，H为当日最高价，L为当日最低价，O为当日开盘价，N为设定的时间参数
 *
 */
const brar = {
    name: 'BRAR',
    shortName: 'BRAR',
    calcParams: [26],
    figures: [
        { key: 'br', title: 'BR: ', type: 'line' },
        { key: 'ar', title: 'AR: ', type: 'line' }
    ],
    calc: (dataList, indicator) => {
        const params = indicator.calcParams;
        let hcy = 0;
        let cyl = 0;
        let ho = 0;
        let ol = 0;
        return dataList.map((kLineData, i) => {
            const brar = {};
            const high = kLineData.high;
            const low = kLineData.low;
            const open = kLineData.open;
            const prevClose = (dataList[i - 1] ?? kLineData).close;
            ho += (high - open);
            ol += (open - low);
            hcy += (high - prevClose);
            cyl += (prevClose - low);
            if (i >= params[0] - 1) {
                if (ol !== 0) {
                    brar.ar = ho / ol * 100;
                }
                else {
                    brar.ar = 0;
                }
                if (cyl !== 0) {
                    brar.br = hcy / cyl * 100;
                }
                else {
                    brar.br = 0;
                }
                const agoKLineData = dataList[i - (params[0] - 1)];
                const agoHigh = agoKLineData.high;
                const agoLow = agoKLineData.low;
                const agoOpen = agoKLineData.open;
                const agoPreClose = (dataList[i - params[0]] ?? dataList[i - (params[0] - 1)]).close;
                hcy -= (agoHigh - agoPreClose);
                cyl -= (agoPreClose - agoLow);
                ho -= (agoHigh - agoOpen);
                ol -= (agoOpen - agoLow);
            }
            return brar;
        });
    }
};

/**
 * 多空指标
 * 公式: BBI = (MA(CLOSE, M) + MA(CLOSE, N) + MA(CLOSE, O) + MA(CLOSE, P)) / 4
 *
 */
const bullAndBearIndex = {
    name: 'BBI',
    shortName: 'BBI',
    series: 'price',
    precision: 2,
    calcParams: [3, 6, 12, 24],
    shouldOhlc: true,
    figures: [
        { key: 'bbi', title: 'BBI: ', type: 'line' }
    ],
    calc: (dataList, indicator) => {
        const params = indicator.calcParams;
        const maxPeriod = Math.max(...params);
        const closeSums = [];
        const mas = [];
        return dataList.map((kLineData, i) => {
            const bbi = {};
            const close = kLineData.close;
            params.forEach((p, index) => {
                closeSums[index] = (closeSums[index] ?? 0) + close;
                if (i >= p - 1) {
                    mas[index] = closeSums[index] / p;
                    closeSums[index] -= dataList[i - (p - 1)].close;
                }
            });
            if (i >= maxPeriod - 1) {
                let maSum = 0;
                mas.forEach(ma => {
                    maSum += ma;
                });
                bbi.bbi = maSum / 4;
            }
            return bbi;
        });
    }
};

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
/**
 * CCI
 * CCI（N日）=（TP－MA）÷MD÷0.015
 * 其中，TP=（最高价+最低价+收盘价）÷3
 * MA=近N日TP价的累计之和÷N
 * MD=近N日TP - 当前MA绝对值的累计之和÷N
 *
 */
const commodityChannelIndex = {
    name: 'CCI',
    shortName: 'CCI',
    calcParams: [20],
    figures: [
        { key: 'cci', title: 'CCI: ', type: 'line' }
    ],
    calc: (dataList, indicator) => {
        const params = indicator.calcParams;
        const p = params[0] - 1;
        let tpSum = 0;
        const tpList = [];
        return dataList.map((kLineData, i) => {
            const cci = {};
            const tp = (kLineData.high + kLineData.low + kLineData.close) / 3;
            tpSum += tp;
            tpList.push(tp);
            if (i >= p) {
                const maTp = tpSum / params[0];
                const sliceTpList = tpList.slice(i - p, i + 1);
                let sum = 0;
                sliceTpList.forEach(tp => {
                    sum += Math.abs(tp - maTp);
                });
                const md = sum / params[0];
                cci.cci = md !== 0 ? (tp - maTp) / md / 0.015 : 0;
                const agoTp = (dataList[i - p].high + dataList[i - p].low + dataList[i - p].close) / 3;
                tpSum -= agoTp;
            }
            return cci;
        });
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http:*www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * MID:=REF(HIGH+LOW,1)/2;
 * CR:SUM(MAX(0,HIGH-MID),N)/SUM(MAX(0,MID-LOW),N)*100;
 * MA1:REF(MA(CR,M1),M1/2.5+1);
 * MA2:REF(MA(CR,M2),M2/2.5+1);
 * MA3:REF(MA(CR,M3),M3/2.5+1);
 * MA4:REF(MA(CR,M4),M4/2.5+1);
 * MID赋值:(昨日最高价+昨日最低价)/2
 * 输出带状能量线:0和最高价-MID的较大值的N日累和/0和MID-最低价的较大值的N日累和*100
 * 输出MA1:M1(5)/2.5+1日前的CR的M1(5)日简单移动平均
 * 输出MA2:M2(10)/2.5+1日前的CR的M2(10)日简单移动平均
 * 输出MA3:M3(20)/2.5+1日前的CR的M3(20)日简单移动平均
 * 输出MA4:M4/2.5+1日前的CR的M4日简单移动平均
 *
 */
const currentRatio = {
    name: 'CR',
    shortName: 'CR',
    calcParams: [26, 10, 20, 40, 60],
    figures: [
        { key: 'cr', title: 'CR: ', type: 'line' },
        { key: 'ma1', title: 'MA1: ', type: 'line' },
        { key: 'ma2', title: 'MA2: ', type: 'line' },
        { key: 'ma3', title: 'MA3: ', type: 'line' },
        { key: 'ma4', title: 'MA4: ', type: 'line' }
    ],
    calc: (dataList, indicator) => {
        const params = indicator.calcParams;
        const ma1ForwardPeriod = Math.ceil(params[1] / 2.5 + 1);
        const ma2ForwardPeriod = Math.ceil(params[2] / 2.5 + 1);
        const ma3ForwardPeriod = Math.ceil(params[3] / 2.5 + 1);
        const ma4ForwardPeriod = Math.ceil(params[4] / 2.5 + 1);
        let ma1Sum = 0;
        const ma1List = [];
        let ma2Sum = 0;
        const ma2List = [];
        let ma3Sum = 0;
        const ma3List = [];
        let ma4Sum = 0;
        const ma4List = [];
        const result = [];
        dataList.forEach((kLineData, i) => {
            const cr = {};
            const prevData = dataList[i - 1] ?? kLineData;
            const prevMid = (prevData.high + prevData.close + prevData.low + prevData.open) / 4;
            const highSubPreMid = Math.max(0, kLineData.high - prevMid);
            const preMidSubLow = Math.max(0, prevMid - kLineData.low);
            if (i >= params[0] - 1) {
                if (preMidSubLow !== 0) {
                    cr.cr = highSubPreMid / preMidSubLow * 100;
                }
                else {
                    cr.cr = 0;
                }
                ma1Sum += cr.cr;
                ma2Sum += cr.cr;
                ma3Sum += cr.cr;
                ma4Sum += cr.cr;
                if (i >= params[0] + params[1] - 2) {
                    ma1List.push(ma1Sum / params[1]);
                    if (i >= params[0] + params[1] + ma1ForwardPeriod - 3) {
                        cr.ma1 = ma1List[ma1List.length - 1 - ma1ForwardPeriod];
                    }
                    ma1Sum -= (result[i - (params[1] - 1)].cr ?? 0);
                }
                if (i >= params[0] + params[2] - 2) {
                    ma2List.push(ma2Sum / params[2]);
                    if (i >= params[0] + params[2] + ma2ForwardPeriod - 3) {
                        cr.ma2 = ma2List[ma2List.length - 1 - ma2ForwardPeriod];
                    }
                    ma2Sum -= (result[i - (params[2] - 1)].cr ?? 0);
                }
                if (i >= params[0] + params[3] - 2) {
                    ma3List.push(ma3Sum / params[3]);
                    if (i >= params[0] + params[3] + ma3ForwardPeriod - 3) {
                        cr.ma3 = ma3List[ma3List.length - 1 - ma3ForwardPeriod];
                    }
                    ma3Sum -= (result[i - (params[3] - 1)].cr ?? 0);
                }
                if (i >= params[0] + params[4] - 2) {
                    ma4List.push(ma4Sum / params[4]);
                    if (i >= params[0] + params[4] + ma4ForwardPeriod - 3) {
                        cr.ma4 = ma4List[ma4List.length - 1 - ma4ForwardPeriod];
                    }
                    ma4Sum -= (result[i - (params[4] - 1)].cr ?? 0);
                }
            }
            result.push(cr);
        });
        return result;
    }
};

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
/**
 * DMA
 * 公式：DIF:MA(CLOSE,N1)-MA(CLOSE,N2);DIFMA:MA(DIF,M)
 */
const differentOfMovingAverage = {
    name: 'DMA',
    shortName: 'DMA',
    calcParams: [10, 50, 10],
    figures: [
        { key: 'dma', title: 'DMA: ', type: 'line' },
        { key: 'ama', title: 'AMA: ', type: 'line' }
    ],
    calc: (dataList, indicator) => {
        const params = indicator.calcParams;
        const maxPeriod = Math.max(params[0], params[1]);
        let closeSum1 = 0;
        let closeSum2 = 0;
        let dmaSum = 0;
        const result = [];
        dataList.forEach((kLineData, i) => {
            const dma = {};
            const close = kLineData.close;
            closeSum1 += close;
            closeSum2 += close;
            let ma1 = 0;
            let ma2 = 0;
            if (i >= params[0] - 1) {
                ma1 = closeSum1 / params[0];
                closeSum1 -= dataList[i - (params[0] - 1)].close;
            }
            if (i >= params[1] - 1) {
                ma2 = closeSum2 / params[1];
                closeSum2 -= dataList[i - (params[1] - 1)].close;
            }
            if (i >= maxPeriod - 1) {
                const dif = ma1 - ma2;
                dma.dma = dif;
                dmaSum += dif;
                if (i >= maxPeriod + params[2] - 2) {
                    dma.ama = dmaSum / params[2];
                    dmaSum -= (result[i - (params[2] - 1)].dma ?? 0);
                }
            }
            result.push(dma);
        });
        return result;
    }
};

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
/**
 * DMI
 *
 * MTR:=EXPMEMA(MAX(MAX(HIGH-LOW,ABS(HIGH-REF(CLOSE,1))),ABS(REF(CLOSE,1)-LOW)),N)
 * HD :=HIGH-REF(HIGH,1);
 * LD :=REF(LOW,1)-LOW;
 * DMP:=EXPMEMA(IF(HD>0&&HD>LD,HD,0),N);
 * DMM:=EXPMEMA(IF(LD>0&&LD>HD,LD,0),N);
 *
 * PDI: DMP*100/MTR;
 * MDI: DMM*100/MTR;
 * ADX: EXPMEMA(ABS(MDI-PDI)/(MDI+PDI)*100,MM);
 * ADXR:EXPMEMA(ADX,MM);
 * 公式含义：
 * MTR赋值:最高价-最低价和最高价-昨收的绝对值的较大值和昨收-最低价的绝对值的较大值的N日指数平滑移动平均
 * HD赋值:最高价-昨日最高价
 * LD赋值:昨日最低价-最低价
 * DMP赋值:如果HD>0并且HD>LD,返回HD,否则返回0的N日指数平滑移动平均
 * DMM赋值:如果LD>0并且LD>HD,返回LD,否则返回0的N日指数平滑移动平均
 * 输出PDI:DMP*100/MTR
 * 输出MDI:DMM*100/MTR
 * 输出ADX:MDI-PDI的绝对值/(MDI+PDI)*100的MM日指数平滑移动平均
 * 输出ADXR:ADX的MM日指数平滑移动平均
 *
 */
const directionalMovementIndex = {
    name: 'DMI',
    shortName: 'DMI',
    calcParams: [14, 6],
    figures: [
        { key: 'pdi', title: 'PDI: ', type: 'line' },
        { key: 'mdi', title: 'MDI: ', type: 'line' },
        { key: 'adx', title: 'ADX: ', type: 'line' },
        { key: 'adxr', title: 'ADXR: ', type: 'line' }
    ],
    calc: (dataList, indicator) => {
        const params = indicator.calcParams;
        let trSum = 0;
        let hSum = 0;
        let lSum = 0;
        let mtr = 0;
        let dmp = 0;
        let dmm = 0;
        let dxSum = 0;
        let adx = 0;
        const result = [];
        dataList.forEach((kLineData, i) => {
            const dmi = {};
            const prevKLineData = dataList[i - 1] ?? kLineData;
            const preClose = prevKLineData.close;
            const high = kLineData.high;
            const low = kLineData.low;
            const hl = high - low;
            const hcy = Math.abs(high - preClose);
            const lcy = Math.abs(preClose - low);
            const hhy = high - prevKLineData.high;
            const lyl = prevKLineData.low - low;
            const tr = Math.max(Math.max(hl, hcy), lcy);
            const h = (hhy > 0 && hhy > lyl) ? hhy : 0;
            const l = (lyl > 0 && lyl > hhy) ? lyl : 0;
            trSum += tr;
            hSum += h;
            lSum += l;
            if (i >= params[0] - 1) {
                if (i > params[0] - 1) {
                    mtr = mtr - mtr / params[0] + tr;
                    dmp = dmp - dmp / params[0] + h;
                    dmm = dmm - dmm / params[0] + l;
                }
                else {
                    mtr = trSum;
                    dmp = hSum;
                    dmm = lSum;
                }
                let pdi = 0;
                let mdi = 0;
                if (mtr !== 0) {
                    pdi = dmp * 100 / mtr;
                    mdi = dmm * 100 / mtr;
                }
                dmi.pdi = pdi;
                dmi.mdi = mdi;
                let dx = 0;
                if (mdi + pdi !== 0) {
                    dx = Math.abs((mdi - pdi)) / (mdi + pdi) * 100;
                }
                dxSum += dx;
                if (i >= params[0] * 2 - 2) {
                    if (i > params[0] * 2 - 2) {
                        adx = (adx * (params[0] - 1) + dx) / params[0];
                    }
                    else {
                        adx = dxSum / params[0];
                    }
                    dmi.adx = adx;
                    if (i >= params[0] * 2 + params[1] - 3) {
                        dmi.adxr = ((result[i - (params[1] - 1)].adx ?? 0) + adx) / 2;
                    }
                }
            }
            result.push(dmi);
        });
        return result;
    }
};

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
/**
 *
 * EMV 简易波动指标
 * 公式：
 * A=（今日最高+今日最低）/2
 * B=（前日最高+前日最低）/2
 * C=今日最高-今日最低
 * EM=（A-B）*C/今日成交额
 * EMV=N日内EM的累和
 * MAEMV=EMV的M日的简单移动平均
 *
 */
const easeOfMovementValue = {
    name: 'EMV',
    shortName: 'EMV',
    calcParams: [14, 9],
    figures: [
        { key: 'emv', title: 'EMV: ', type: 'line' },
        { key: 'maEmv', title: 'MAEMV: ', type: 'line' }
    ],
    calc: (dataList, indicator) => {
        const params = indicator.calcParams;
        let emvValueSum = 0;
        const emvValueList = [];
        return dataList.map((kLineData, i) => {
            const emv = {};
            if (i > 0) {
                const prevKLineData = dataList[i - 1];
                const high = kLineData.high;
                const low = kLineData.low;
                const volume = kLineData.volume ?? 0;
                const distanceMoved = (high + low) / 2 - (prevKLineData.high + prevKLineData.low) / 2;
                if (volume === 0 || high - low === 0) {
                    emv.emv = 0;
                }
                else {
                    const ratio = volume / 100000000 / (high - low);
                    emv.emv = distanceMoved / ratio;
                }
                emvValueSum += emv.emv;
                emvValueList.push(emv.emv);
                if (i >= params[0]) {
                    emv.maEmv = emvValueSum / params[0];
                    emvValueSum -= emvValueList[i - params[0]];
                }
            }
            return emv;
        });
    }
};

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
/**
 * EMA 指数移动平均
 */
const exponentialMovingAverage = {
    name: 'EMA',
    shortName: 'EMA',
    series: 'price',
    calcParams: [6, 12, 20],
    precision: 2,
    shouldOhlc: true,
    figures: [
        { key: 'ema1', title: 'EMA6: ', type: 'line' },
        { key: 'ema2', title: 'EMA12: ', type: 'line' },
        { key: 'ema3', title: 'EMA20: ', type: 'line' }
    ],
    regenerateFigures: (params) => params.map((p, i) => ({ key: `ema${i + 1}`, title: `EMA${p}: `, type: 'line' })),
    calc: (dataList, indicator) => {
        const { calcParams: params, figures } = indicator;
        let closeSum = 0;
        const emaValues = [];
        return dataList.map((kLineData, i) => {
            const ema = {};
            const close = kLineData.close;
            closeSum += close;
            params.forEach((p, index) => {
                if (i >= p - 1) {
                    if (i > p - 1) {
                        emaValues[index] = (2 * close + (p - 1) * emaValues[index]) / (p + 1);
                    }
                    else {
                        emaValues[index] = closeSum / p;
                    }
                    ema[figures[index].key] = emaValues[index];
                }
            });
            return ema;
        });
    }
};

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
/**
 * mtm
 * 公式 MTM（N日）=C－CN
 */
const momentum = {
    name: 'MTM',
    shortName: 'MTM',
    calcParams: [12, 6],
    figures: [
        { key: 'mtm', title: 'MTM: ', type: 'line' },
        { key: 'maMtm', title: 'MAMTM: ', type: 'line' }
    ],
    calc: (dataList, indicator) => {
        const params = indicator.calcParams;
        let mtmSum = 0;
        const result = [];
        dataList.forEach((kLineData, i) => {
            const mtm = {};
            if (i >= params[0]) {
                const close = kLineData.close;
                const agoClose = dataList[i - params[0]].close;
                mtm.mtm = close - agoClose;
                mtmSum += mtm.mtm;
                if (i >= params[0] + params[1] - 1) {
                    mtm.maMtm = mtmSum / params[1];
                    mtmSum -= (result[i - (params[1] - 1)].mtm ?? 0);
                }
            }
            result.push(mtm);
        });
        return result;
    }
};

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
/**
 * MA 移动平均
 */
const movingAverage = {
    name: 'MA',
    shortName: 'MA',
    series: 'price',
    calcParams: [5, 10, 30, 60],
    precision: 2,
    shouldOhlc: true,
    figures: [
        { key: 'ma1', title: 'MA5: ', type: 'line' },
        { key: 'ma2', title: 'MA10: ', type: 'line' },
        { key: 'ma3', title: 'MA30: ', type: 'line' },
        { key: 'ma4', title: 'MA60: ', type: 'line' }
    ],
    regenerateFigures: (params) => params.map((p, i) => ({ key: `ma${i + 1}`, title: `MA${p}: `, type: 'line' })),
    calc: (dataList, indicator) => {
        const { calcParams: params, figures } = indicator;
        const closeSums = [];
        return dataList.map((kLineData, i) => {
            const ma = {};
            const close = kLineData.close;
            params.forEach((p, index) => {
                closeSums[index] = (closeSums[index] ?? 0) + close;
                if (i >= p - 1) {
                    ma[figures[index].key] = closeSums[index] / p;
                    closeSums[index] -= dataList[i - (p - 1)].close;
                }
            });
            return ma;
        });
    }
};

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
/**
 * MACD：参数快线移动平均、慢线移动平均、移动平均，
 * 默认参数值12、26、9。
 * 公式：⒈首先分别计算出收盘价12日指数平滑移动平均线与26日指数平滑移动平均线，分别记为EMA(12）与EMA(26）。
 * ⒉求这两条指数平滑移动平均线的差，即：DIFF = EMA(SHORT) － EMA(LONG)。
 * ⒊再计算DIFF的M日的平均的指数平滑移动平均线，记为DEA。
 * ⒋最后用DIFF减DEA，得MACD。MACD通常绘制成围绕零轴线波动的柱形图。MACD柱状大于0涨颜色，小于0跌颜色。
 */
const movingAverageConvergenceDivergence = {
    name: 'MACD',
    shortName: 'MACD',
    calcParams: [12, 26, 9],
    figures: [
        { key: 'dif', title: 'DIF: ', type: 'line' },
        { key: 'dea', title: 'DEA: ', type: 'line' },
        {
            key: 'macd',
            title: 'MACD: ',
            type: 'bar',
            baseValue: 0,
            styles: ({ data, indicator, defaultStyles }) => {
                const { prev, current } = data;
                const prevMacd = prev?.macd ?? Number.MIN_SAFE_INTEGER;
                const currentMacd = current?.macd ?? Number.MIN_SAFE_INTEGER;
                let color = '';
                if (currentMacd > 0) {
                    color = formatValue(indicator.styles, 'bars[0].upColor', (defaultStyles.bars)[0].upColor);
                }
                else if (currentMacd < 0) {
                    color = formatValue(indicator.styles, 'bars[0].downColor', (defaultStyles.bars)[0].downColor);
                }
                else {
                    color = formatValue(indicator.styles, 'bars[0].noChangeColor', (defaultStyles.bars)[0].noChangeColor);
                }
                const style = prevMacd < currentMacd ? 'stroke' : 'fill';
                return { style, color, borderColor: color };
            }
        }
    ],
    calc: (dataList, indicator) => {
        const params = indicator.calcParams;
        let closeSum = 0;
        let emaShort = 0;
        let emaLong = 0;
        let dif = 0;
        let difSum = 0;
        let dea = 0;
        const maxPeriod = Math.max(params[0], params[1]);
        return dataList.map((kLineData, i) => {
            const macd = {};
            const close = kLineData.close;
            closeSum += close;
            if (i >= params[0] - 1) {
                if (i > params[0] - 1) {
                    emaShort = (2 * close + (params[0] - 1) * emaShort) / (params[0] + 1);
                }
                else {
                    emaShort = closeSum / params[0];
                }
            }
            if (i >= params[1] - 1) {
                if (i > params[1] - 1) {
                    emaLong = (2 * close + (params[1] - 1) * emaLong) / (params[1] + 1);
                }
                else {
                    emaLong = closeSum / params[1];
                }
            }
            if (i >= maxPeriod - 1) {
                dif = emaShort - emaLong;
                macd.dif = dif;
                difSum += dif;
                if (i >= maxPeriod + params[2] - 2) {
                    if (i > maxPeriod + params[2] - 2) {
                        dea = (dif * 2 + dea * (params[2] - 1)) / (params[2] + 1);
                    }
                    else {
                        dea = difSum / params[2];
                    }
                    macd.macd = (dif - dea) * 2;
                    macd.dea = dea;
                }
            }
            return macd;
        });
    }
};

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
/**
 * OBV
 * OBV = REF(OBV) + sign * V
 */
const onBalanceVolume = {
    name: 'OBV',
    shortName: 'OBV',
    calcParams: [30],
    figures: [
        { key: 'obv', title: 'OBV: ', type: 'line' },
        { key: 'maObv', title: 'MAOBV: ', type: 'line' }
    ],
    calc: (dataList, indicator) => {
        const params = indicator.calcParams;
        let obvSum = 0;
        let oldObv = 0;
        const result = [];
        dataList.forEach((kLineData, i) => {
            const prevKLineData = dataList[i - 1] ?? kLineData;
            if (kLineData.close < prevKLineData.close) {
                oldObv -= (kLineData.volume ?? 0);
            }
            else if (kLineData.close > prevKLineData.close) {
                oldObv += (kLineData.volume ?? 0);
            }
            const obv = { obv: oldObv };
            obvSum += oldObv;
            if (i >= params[0] - 1) {
                obv.maObv = obvSum / params[0];
                obvSum -= (result[i - (params[0] - 1)].obv ?? 0);
            }
            result.push(obv);
        });
        return result;
    }
};

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
/**
 * 价量趋势指标
 * 公式:
 * X = (CLOSE - REF(CLOSE, 1)) / REF(CLOSE, 1) * VOLUME
 * PVT = SUM(X)
 *
 */
const priceAndVolumeTrend = {
    name: 'PVT',
    shortName: 'PVT',
    figures: [
        { key: 'pvt', title: 'PVT: ', type: 'line' }
    ],
    calc: (dataList) => {
        let sum = 0;
        return dataList.map((kLineData, i) => {
            const pvt = {};
            const close = kLineData.close;
            const volume = kLineData.volume ?? 1;
            const prevClose = (dataList[i - 1] ?? kLineData).close;
            let x = 0;
            const total = prevClose * volume;
            if (total !== 0) {
                x = (close - prevClose) / total;
            }
            sum += x;
            pvt.pvt = sum;
            return pvt;
        });
    }
};

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
/**
 * PSY
 * 公式：PSY=N日内的上涨天数/N×100%。
 */
const psychologicalLine = {
    name: 'PSY',
    shortName: 'PSY',
    calcParams: [12, 6],
    figures: [
        { key: 'psy', title: 'PSY: ', type: 'line' },
        { key: 'maPsy', title: 'MAPSY: ', type: 'line' }
    ],
    calc: (dataList, indicator) => {
        const params = indicator.calcParams;
        let upCount = 0;
        let psySum = 0;
        const upList = [];
        const result = [];
        dataList.forEach((kLineData, i) => {
            const psy = {};
            const prevClose = (dataList[i - 1] ?? kLineData).close;
            const upFlag = kLineData.close - prevClose > 0 ? 1 : 0;
            upList.push(upFlag);
            upCount += upFlag;
            if (i >= params[0] - 1) {
                psy.psy = upCount / params[0] * 100;
                psySum += psy.psy;
                if (i >= params[0] + params[1] - 2) {
                    psy.maPsy = psySum / params[1];
                    psySum -= (result[i - (params[1] - 1)].psy ?? 0);
                }
                upCount -= upList[i - (params[0] - 1)];
            }
            result.push(psy);
        });
        return result;
    }
};

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
/**
 * 变动率指标
 * 公式：ROC = (CLOSE - REF(CLOSE, N)) / REF(CLOSE, N)
 */
const rateOfChange = {
    name: 'ROC',
    shortName: 'ROC',
    calcParams: [12, 6],
    figures: [
        { key: 'roc', title: 'ROC: ', type: 'line' },
        { key: 'maRoc', title: 'MAROC: ', type: 'line' }
    ],
    calc: (dataList, indicator) => {
        const params = indicator.calcParams;
        const result = [];
        let rocSum = 0;
        dataList.forEach((kLineData, i) => {
            const roc = {};
            if (i >= params[0] - 1) {
                const close = kLineData.close;
                const agoClose = (dataList[i - params[0]] ?? dataList[i - (params[0] - 1)]).close;
                if (agoClose !== 0) {
                    roc.roc = (close - agoClose) / agoClose * 100;
                }
                else {
                    roc.roc = 0;
                }
                rocSum += roc.roc;
                if (i >= params[0] - 1 + params[1] - 1) {
                    roc.maRoc = rocSum / params[1];
                    rocSum -= (result[i - (params[1] - 1)].roc ?? 0);
                }
            }
            result.push(roc);
        });
        return result;
    }
};

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
/**
 * RSI
 * RSI = SUM(MAX(CLOSE - REF(CLOSE,1),0),N) / SUM(ABS(CLOSE - REF(CLOSE,1)),N) × 100
 */
const relativeStrengthIndex = {
    name: 'RSI',
    shortName: 'RSI',
    calcParams: [6, 12, 24],
    figures: [
        { key: 'rsi1', title: 'RSI1: ', type: 'line' },
        { key: 'rsi2', title: 'RSI2: ', type: 'line' },
        { key: 'rsi3', title: 'RSI3: ', type: 'line' }
    ],
    regenerateFigures: (params) => params.map((_, index) => {
        const num = index + 1;
        return { key: `rsi${num}`, title: `RSI${num}: `, type: 'line' };
    }),
    calc: (dataList, indicator) => {
        const { calcParams: params, figures } = indicator;
        const sumCloseAs = [];
        const sumCloseBs = [];
        return dataList.map((kLineData, i) => {
            const rsi = {};
            const prevClose = (dataList[i - 1] ?? kLineData).close;
            const tmp = kLineData.close - prevClose;
            params.forEach((p, index) => {
                if (tmp > 0) {
                    sumCloseAs[index] = (sumCloseAs[index] ?? 0) + tmp;
                }
                else {
                    sumCloseBs[index] = (sumCloseBs[index] ?? 0) + Math.abs(tmp);
                }
                if (i >= p - 1) {
                    if (sumCloseBs[index] !== 0) {
                        rsi[figures[index].key] = 100 - (100.0 / (1 + sumCloseAs[index] / sumCloseBs[index]));
                    }
                    else {
                        rsi[figures[index].key] = 0;
                    }
                    const agoData = dataList[i - (p - 1)];
                    const agoPreData = dataList[i - p] ?? agoData;
                    const agoTmp = agoData.close - agoPreData.close;
                    if (agoTmp > 0) {
                        sumCloseAs[index] -= agoTmp;
                    }
                    else {
                        sumCloseBs[index] -= Math.abs(agoTmp);
                    }
                }
            });
            return rsi;
        });
    }
};

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
/**
 * sma
 */
const simpleMovingAverage = {
    name: 'SMA',
    shortName: 'SMA',
    series: 'price',
    calcParams: [12, 2],
    precision: 2,
    figures: [
        { key: 'sma', title: 'SMA: ', type: 'line' }
    ],
    shouldOhlc: true,
    calc: (dataList, indicator) => {
        const params = indicator.calcParams;
        let closeSum = 0;
        let smaValue = 0;
        return dataList.map((kLineData, i) => {
            const sma = {};
            const close = kLineData.close;
            closeSum += close;
            if (i >= params[0] - 1) {
                if (i > params[0] - 1) {
                    smaValue = (close * params[1] + smaValue * (params[0] - params[1] + 1)) / (params[0] + 1);
                }
                else {
                    smaValue = closeSum / params[0];
                }
                sma.sma = smaValue;
            }
            return sma;
        });
    }
};

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
/**
 * Binary search for the nearest result
 * @param dataList
 * @param valueKey
 * @param targetValue
 * @return {number}
 */
function binarySearchNearest(dataList, valueKey, targetValue) {
    let left = 0;
    let right = 0;
    for (right = dataList.length - 1; left !== right;) {
        const midIndex = Math.floor((right + left) / 2);
        const mid = right - left;
        const midValue = dataList[midIndex][valueKey];
        if (targetValue === dataList[left][valueKey]) {
            return left;
        }
        if (targetValue === dataList[right][valueKey]) {
            return right;
        }
        if (targetValue === midValue) {
            return midIndex;
        }
        if (targetValue > midValue) {
            left = midIndex;
        }
        else {
            right = midIndex;
        }
        if (mid <= 2) {
            break;
        }
    }
    return left;
}
/**
 * 优化数字
 * @param value
 * @return {number|number}
 */
function nice(value) {
    const exponent = Math.floor(log10(value));
    const exp10 = index10(exponent);
    const f = value / exp10; // 1 <= f < 10
    let nf = 0;
    if (f < 1.5) {
        nf = 1;
    }
    else if (f < 2.5) {
        nf = 2;
    }
    else if (f < 3.5) {
        nf = 3;
    }
    else if (f < 4.5) {
        nf = 4;
    }
    else if (f < 5.5) {
        nf = 5;
    }
    else if (f < 6.5) {
        nf = 6;
    }
    else {
        nf = 8;
    }
    value = nf * exp10;
    return +value.toFixed(Math.abs(exponent));
}
/**
 * Round
 * @param value
 * @param precision
 * @return {number}
 */
function round(value, precision) {
    precision = Math.max(0, precision ?? 0);
    const pow = Math.pow(10, precision);
    return Math.round(value * pow) / pow;
}
/**
 * Get precision
 * @param value
 * @return {number|number}
 */
function getPrecision(value) {
    const str = value.toString();
    const eIndex = str.indexOf('e');
    if (eIndex > 0) {
        const precision = +str.slice(eIndex + 1);
        return precision < 0 ? -precision : 0;
    }
    const dotIndex = str.indexOf('.');
    return dotIndex < 0 ? 0 : str.length - 1 - dotIndex;
}
function getMaxMin(dataList, maxKey, minKey) {
    const maxMin = [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER];
    const dataLength = dataList.length;
    let index = 0;
    while (index < dataLength) {
        const data = dataList[index];
        maxMin[0] = Math.max((data[maxKey] ?? Number.MIN_SAFE_INTEGER), maxMin[0]);
        maxMin[1] = Math.min((data[minKey] ?? Number.MAX_SAFE_INTEGER), maxMin[1]);
        ++index;
    }
    return maxMin;
}
/**
 * log10
 * @param value
 * @return {number}
 */
function log10(value) {
    if (value === 0) {
        return 0;
    }
    return Math.log10(value);
}
/**
 * index 10
 * @param value
 * @return {number}
 */
function index10(value) {
    return Math.pow(10, value);
}

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
/**
 * KDJ
 *
 * 当日K值=2/3×前一日K值+1/3×当日RSV
 * 当日D值=2/3×前一日D值+1/3×当日K值
 * 若无前一日K 值与D值，则可分别用50来代替。
 * J值=3*当日K值-2*当日D值
 */
const stoch = {
    name: 'KDJ',
    shortName: 'KDJ',
    calcParams: [9, 3, 3],
    figures: [
        { key: 'k', title: 'K: ', type: 'line' },
        { key: 'd', title: 'D: ', type: 'line' },
        { key: 'j', title: 'J: ', type: 'line' }
    ],
    calc: (dataList, indicator) => {
        const params = indicator.calcParams;
        const result = [];
        dataList.forEach((kLineData, i) => {
            const kdj = {};
            const close = kLineData.close;
            if (i >= params[0] - 1) {
                const lhn = getMaxMin(dataList.slice(i - (params[0] - 1), i + 1), 'high', 'low');
                const hn = lhn[0];
                const ln = lhn[1];
                const hnSubLn = hn - ln;
                const rsv = (close - ln) / (hnSubLn === 0 ? 1 : hnSubLn) * 100;
                kdj.k = ((params[1] - 1) * (result[i - 1]?.k ?? 50) + rsv) / params[1];
                kdj.d = ((params[2] - 1) * (result[i - 1]?.d ?? 50) + kdj.k) / params[2];
                kdj.j = 3.0 * kdj.k - 2.0 * kdj.d;
            }
            result.push(kdj);
        });
        return result;
    }
};

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
const stopAndReverse = {
    name: 'SAR',
    shortName: 'SAR',
    series: 'price',
    calcParams: [2, 2, 20],
    precision: 2,
    shouldOhlc: true,
    figures: [
        {
            key: 'sar',
            title: 'SAR: ',
            type: 'circle',
            styles: ({ data, indicator, defaultStyles }) => {
                const { current } = data;
                const sar = current?.sar ?? Number.MIN_SAFE_INTEGER;
                const halfHL = ((current?.high ?? 0) + (current?.low ?? 0)) / 2;
                const color = sar < halfHL
                    ? formatValue(indicator.styles, 'circles[0].upColor', (defaultStyles.circles)[0].upColor)
                    : formatValue(indicator.styles, 'circles[0].downColor', (defaultStyles.circles)[0].downColor);
                return { color };
            }
        }
    ],
    calc: (dataList, indicator) => {
        const params = indicator.calcParams;
        const startAf = params[0] / 100;
        const step = params[1] / 100;
        const maxAf = params[2] / 100;
        // 加速因子
        let af = startAf;
        // 极值
        let ep = -100;
        // 判断是上涨还是下跌  false：下跌
        let isIncreasing = false;
        let sar = 0;
        return dataList.map((kLineData, i) => {
            // 上一个周期的sar
            const preSar = sar;
            const high = kLineData.high;
            const low = kLineData.low;
            if (isIncreasing) {
                // 上涨
                if (ep === -100 || ep < high) {
                    // 重新初始化值
                    ep = high;
                    af = Math.min(af + step, maxAf);
                }
                sar = preSar + af * (ep - preSar);
                const lowMin = Math.min(dataList[Math.max(1, i) - 1].low, low);
                if (sar > kLineData.low) {
                    sar = ep;
                    // 重新初始化值
                    af = startAf;
                    ep = -100;
                    isIncreasing = !isIncreasing;
                }
                else if (sar > lowMin) {
                    sar = lowMin;
                }
            }
            else {
                if (ep === -100 || ep > low) {
                    // 重新初始化值
                    ep = low;
                    af = Math.min(af + step, maxAf);
                }
                sar = preSar + af * (ep - preSar);
                const highMax = Math.max(dataList[Math.max(1, i) - 1].high, high);
                if (sar < kLineData.high) {
                    sar = ep;
                    // 重新初始化值
                    af = 0;
                    ep = -100;
                    isIncreasing = !isIncreasing;
                }
                else if (sar < highMax) {
                    sar = highMax;
                }
            }
            return { high, low, sar };
        });
    }
};

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http:*www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * trix
 *
 * TR=收盘价的N日指数移动平均的N日指数移动平均的N日指数移动平均；
 * TRIX=(TR-昨日TR)/昨日TR*100；
 * MATRIX=TRIX的M日简单移动平均；
 * 默认参数N设为12，默认参数M设为9；
 * 默认参数12、9
 * 公式：MTR:=EMA(EMA(EMA(CLOSE,N),N),N)
 * TRIX:(MTR-REF(MTR,1))/REF(MTR,1)*100;
 * TRMA:MA(TRIX,M)
 *
 */
const tripleExponentiallySmoothedAverage = {
    name: 'TRIX',
    shortName: 'TRIX',
    calcParams: [12, 9],
    figures: [
        { key: 'trix', title: 'TRIX: ', type: 'line' },
        { key: 'maTrix', title: 'MATRIX: ', type: 'line' }
    ],
    calc: (dataList, indicator) => {
        const params = indicator.calcParams;
        let closeSum = 0;
        let ema1 = 0;
        let ema2 = 0;
        let oldTr = 0;
        let ema1Sum = 0;
        let ema2Sum = 0;
        let trixSum = 0;
        const result = [];
        dataList.forEach((kLineData, i) => {
            const trix = {};
            const close = kLineData.close;
            closeSum += close;
            if (i >= params[0] - 1) {
                if (i > params[0] - 1) {
                    ema1 = (2 * close + (params[0] - 1) * ema1) / (params[0] + 1);
                }
                else {
                    ema1 = closeSum / params[0];
                }
                ema1Sum += ema1;
                if (i >= params[0] * 2 - 2) {
                    if (i > params[0] * 2 - 2) {
                        ema2 = (2 * ema1 + (params[0] - 1) * ema2) / (params[0] + 1);
                    }
                    else {
                        ema2 = ema1Sum / params[0];
                    }
                    ema2Sum += ema2;
                    if (i >= params[0] * 3 - 3) {
                        let tr = 0;
                        let trixValue = 0;
                        if (i > params[0] * 3 - 3) {
                            tr = (2 * ema2 + (params[0] - 1) * oldTr) / (params[0] + 1);
                            trixValue = (tr - oldTr) / oldTr * 100;
                        }
                        else {
                            tr = ema2Sum / params[0];
                        }
                        oldTr = tr;
                        trix.trix = trixValue;
                        trixSum += trixValue;
                        if (i >= params[0] * 3 + params[1] - 4) {
                            trix.maTrix = trixSum / params[1];
                            trixSum -= (result[i - (params[1] - 1)].trix ?? 0);
                        }
                    }
                }
            }
            result.push(trix);
        });
        return result;
    }
};

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
function getVolumeFigure() {
    return {
        key: 'volume',
        title: 'VOLUME: ',
        type: 'bar',
        baseValue: 0,
        styles: ({ data, indicator, defaultStyles }) => {
            const current = data.current;
            let color = formatValue(indicator.styles, 'bars[0].noChangeColor', (defaultStyles.bars)[0].noChangeColor);
            if (isValid(current)) {
                if (current.close > current.open) {
                    color = formatValue(indicator.styles, 'bars[0].upColor', (defaultStyles.bars)[0].upColor);
                }
                else if (current.close < current.open) {
                    color = formatValue(indicator.styles, 'bars[0].downColor', (defaultStyles.bars)[0].downColor);
                }
            }
            return { color: color };
        }
    };
}
const volume = {
    name: 'VOL',
    shortName: 'VOL',
    series: 'volume',
    calcParams: [5, 10, 20],
    shouldFormatBigNumber: true,
    precision: 0,
    minValue: 0,
    figures: [
        { key: 'ma1', title: 'MA5: ', type: 'line' },
        { key: 'ma2', title: 'MA10: ', type: 'line' },
        { key: 'ma3', title: 'MA20: ', type: 'line' },
        getVolumeFigure()
    ],
    regenerateFigures: (params) => {
        const figures = params.map((p, i) => ({ key: `ma${i + 1}`, title: `MA${p}: `, type: 'line' }));
        figures.push(getVolumeFigure());
        return figures;
    },
    calc: (dataList, indicator) => {
        const { calcParams: params, figures } = indicator;
        const volSums = [];
        return dataList.map((kLineData, i) => {
            const volume = kLineData.volume ?? 0;
            const vol = { volume, open: kLineData.open, close: kLineData.close };
            params.forEach((p, index) => {
                volSums[index] = (volSums[index] ?? 0) + volume;
                if (i >= p - 1) {
                    vol[figures[index].key] = volSums[index] / p;
                    volSums[index] -= (dataList[i - (p - 1)].volume ?? 0);
                }
            });
            return vol;
        });
    }
};

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
/**
 * VR
 * VR=（UVS+1/2PVS）/（DVS+1/2PVS）
 * 24天以来凡是股价上涨那一天的成交量都称为AV，将24天内的AV总和相加后称为UVS
 * 24天以来凡是股价下跌那一天的成交量都称为BV，将24天内的BV总和相加后称为DVS
 * 24天以来凡是股价不涨不跌，则那一天的成交量都称为CV，将24天内的CV总和相加后称为PVS
 *
 */
const volumeRatio = {
    name: 'VR',
    shortName: 'VR',
    calcParams: [26, 6],
    figures: [
        { key: 'vr', title: 'VR: ', type: 'line' },
        { key: 'maVr', title: 'MAVR: ', type: 'line' }
    ],
    calc: (dataList, indicator) => {
        const params = indicator.calcParams;
        let uvs = 0;
        let dvs = 0;
        let pvs = 0;
        let vrSum = 0;
        const result = [];
        dataList.forEach((kLineData, i) => {
            const vr = {};
            const close = kLineData.close;
            const preClose = (dataList[i - 1] ?? kLineData).close;
            const volume = kLineData.volume ?? 0;
            if (close > preClose) {
                uvs += volume;
            }
            else if (close < preClose) {
                dvs += volume;
            }
            else {
                pvs += volume;
            }
            if (i >= params[0] - 1) {
                const halfPvs = pvs / 2;
                if (dvs + halfPvs === 0) {
                    vr.vr = 0;
                }
                else {
                    vr.vr = (uvs + halfPvs) / (dvs + halfPvs) * 100;
                }
                vrSum += vr.vr;
                if (i >= params[0] + params[1] - 2) {
                    vr.maVr = vrSum / params[1];
                    vrSum -= (result[i - (params[1] - 1)].vr ?? 0);
                }
                const agoData = dataList[i - (params[0] - 1)];
                const agoPreData = dataList[i - params[0]] ?? agoData;
                const agoClose = agoData.close;
                const agoVolume = agoData.volume ?? 0;
                if (agoClose > agoPreData.close) {
                    uvs -= agoVolume;
                }
                else if (agoClose < agoPreData.close) {
                    dvs -= agoVolume;
                }
                else {
                    pvs -= agoVolume;
                }
            }
            result.push(vr);
        });
        return result;
    }
};

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
/**
 * WR
 * 公式 WR(N) = 100 * [ C - HIGH(N) ] / [ HIGH(N)-LOW(N) ]
 */
const williamsR = {
    name: 'WR',
    shortName: 'WR',
    calcParams: [6, 10, 14],
    figures: [
        { key: 'wr1', title: 'WR1: ', type: 'line' },
        { key: 'wr2', title: 'WR2: ', type: 'line' },
        { key: 'wr3', title: 'WR3: ', type: 'line' }
    ],
    regenerateFigures: (params) => params.map((_, i) => ({ key: `wr${i + 1}`, title: `WR${i + 1}: `, type: 'line' })),
    calc: (dataList, indicator) => {
        const { calcParams: params, figures } = indicator;
        return dataList.map((kLineData, i) => {
            const wr = {};
            const close = kLineData.close;
            params.forEach((param, index) => {
                const p = param - 1;
                if (i >= p) {
                    const hln = getMaxMin(dataList.slice(i - p, i + 1), 'high', 'low');
                    const hn = hln[0];
                    const ln = hln[1];
                    const hnSubLn = hn - ln;
                    wr[figures[index].key] = hnSubLn === 0 ? 0 : (close - hn) / hnSubLn * 100;
                }
            });
            return wr;
        });
    }
};

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
const indicators = {};
const extensions$1 = [
    averagePrice, awesomeOscillator, bias, bollingerBands, brar,
    bullAndBearIndex, commodityChannelIndex, currentRatio, differentOfMovingAverage,
    directionalMovementIndex, easeOfMovementValue, exponentialMovingAverage, momentum,
    movingAverage, movingAverageConvergenceDivergence, onBalanceVolume, priceAndVolumeTrend,
    psychologicalLine, rateOfChange, relativeStrengthIndex, simpleMovingAverage,
    stoch, stopAndReverse, tripleExponentiallySmoothedAverage, volume, volumeRatio, williamsR
];
extensions$1.forEach((indicator) => {
    indicators[indicator.name] = IndicatorImp.extend(indicator);
});
function registerIndicator(indicator) {
    indicators[indicator.name] = IndicatorImp.extend(indicator);
}
function getIndicatorClass(name) {
    return indicators[name] ?? null;
}
function getSupportedIndicators() {
    return Object.keys(indicators);
}

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
const zhCN = {
    time: '时间：',
    open: '开：',
    high: '高：',
    low: '低：',
    close: '收：',
    volume: '成交量：',
    turnover: '成交额：',
    change: '涨幅：',
    second: '秒',
    minute: '',
    hour: '小时',
    day: '天',
    week: '周',
    month: '月',
    year: '年'
};

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
const enUS = {
    time: 'Time: ',
    open: 'Open: ',
    high: 'High: ',
    low: 'Low: ',
    close: 'Close: ',
    volume: 'Volume: ',
    turnover: 'Turnover: ',
    change: 'Change: ',
    second: 'S',
    minute: '',
    hour: 'H',
    day: 'D',
    week: 'W',
    month: 'M',
    year: 'Y'
};

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
const locales = {
    'zh-CN': zhCN,
    'en-US': enUS
};
function registerLocale(locale, ls) {
    locales[locale] = { ...locales[locale], ...ls };
}
function getSupportedLocales() {
    return Object.keys(locales);
}
function i18n(key, locale) {
    return locales[locale][key] ?? key;
}

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
function checkOverlayFigureEvent(targetEventType, figure) {
    const ignoreEvent = figure?.ignoreEvent ?? false;
    if (isBoolean(ignoreEvent)) {
        return !ignoreEvent;
    }
    return !ignoreEvent.includes(targetEventType);
}
const OVERLAY_DRAW_STEP_START = 1;
const OVERLAY_DRAW_STEP_FINISHED = -1;
const OVERLAY_ID_PREFIX = 'overlay_';
const OVERLAY_FIGURE_KEY_PREFIX = 'overlay_figure_';
class OverlayImp {
    id;
    groupId = '';
    paneId;
    name;
    totalStep = 1;
    currentStep = OVERLAY_DRAW_STEP_START;
    lock = false;
    visible = true;
    zLevel = 0;
    needDefaultPointFigure = false;
    needDefaultXAxisFigure = false;
    needDefaultYAxisFigure = false;
    mode = 'normal';
    modeSensitivity = 8;
    points = [];
    extendData;
    styles = null;
    createPointFigures = null;
    createXAxisFigures = null;
    createYAxisFigures = null;
    performEventPressedMove = null;
    performEventMoveForDrawing = null;
    onDrawStart = null;
    onDrawing = null;
    onDrawEnd = null;
    onClick = null;
    onDoubleClick = null;
    onRightClick = null;
    onPressedMoveStart = null;
    onPressedMoving = null;
    onPressedMoveEnd = null;
    onMouseMove = null;
    onMouseEnter = null;
    onMouseLeave = null;
    onRemoved = null;
    onSelected = null;
    onDeselected = null;
    _prevZLevel = 0;
    _prevOverlay;
    _prevPressedPoint = null;
    _prevPressedPoints = [];
    constructor(overlay) {
        this.override(overlay);
    }
    override(overlay) {
        this._prevOverlay = clone({
            ...this,
            _prevOverlay: null
        });
        const { id, name, currentStep: _, points, styles, ...others } = overlay;
        merge(this, others);
        if (!isString(this.name)) {
            this.name = name ?? '';
        }
        if (!isString(this.id) && isString(id)) {
            this.id = id;
        }
        if (isValid(styles)) {
            this.styles ??= {};
            merge(this.styles, styles);
        }
        if (isArray(points) && points.length > 0) {
            let repeatTotalStep = 0;
            this.points = [...points];
            if (points.length >= this.totalStep - 1) {
                this.currentStep = OVERLAY_DRAW_STEP_FINISHED;
                repeatTotalStep = this.totalStep - 1;
            }
            else {
                this.currentStep = points.length + 1;
                repeatTotalStep = points.length;
            }
            // Prevent wrong drawing due to wrong points
            if (isFunction(this.performEventMoveForDrawing)) {
                for (let i = 0; i < repeatTotalStep; i++) {
                    this.performEventMoveForDrawing({
                        currentStep: i + 2,
                        mode: this.mode,
                        points: this.points,
                        performPointIndex: i,
                        performPoint: this.points[i]
                    });
                }
            }
            if (this.currentStep === OVERLAY_DRAW_STEP_FINISHED) {
                this.performEventPressedMove?.({
                    currentStep: this.currentStep,
                    mode: this.mode,
                    points: this.points,
                    performPointIndex: this.points.length - 1,
                    performPoint: this.points[this.points.length - 1]
                });
            }
        }
    }
    getPrevZLevel() { return this._prevZLevel; }
    setPrevZLevel(zLevel) { this._prevZLevel = zLevel; }
    shouldUpdate() {
        const sort = this._prevOverlay.zLevel !== this.zLevel;
        const draw = sort ||
            JSON.stringify(this._prevOverlay.points) !== JSON.stringify(this.points) ||
            this._prevOverlay.visible !== this.visible ||
            this._prevOverlay.extendData !== this.extendData ||
            this._prevOverlay.styles !== this.styles;
        return { sort, draw };
    }
    nextStep() {
        if (this.currentStep === this.totalStep - 1) {
            this.currentStep = OVERLAY_DRAW_STEP_FINISHED;
        }
        else {
            this.currentStep++;
        }
    }
    forceComplete() {
        this.currentStep = OVERLAY_DRAW_STEP_FINISHED;
    }
    isDrawing() {
        return this.currentStep !== OVERLAY_DRAW_STEP_FINISHED;
    }
    isStart() {
        return this.currentStep === OVERLAY_DRAW_STEP_START;
    }
    eventMoveForDrawing(point) {
        const pointIndex = this.currentStep - 1;
        const newPoint = {};
        if (isNumber(point.timestamp)) {
            newPoint.timestamp = point.timestamp;
        }
        if (isNumber(point.dataIndex)) {
            newPoint.dataIndex = point.dataIndex;
        }
        if (isNumber(point.value)) {
            newPoint.value = point.value;
        }
        this.points[pointIndex] = newPoint;
        this.performEventMoveForDrawing?.({
            currentStep: this.currentStep,
            mode: this.mode,
            points: this.points,
            performPointIndex: pointIndex,
            performPoint: newPoint
        });
    }
    eventPressedPointMove(point, pointIndex) {
        this.points[pointIndex].timestamp = point.timestamp;
        if (isNumber(point.value)) {
            this.points[pointIndex].value = point.value;
        }
        this.performEventPressedMove?.({
            currentStep: this.currentStep,
            points: this.points,
            mode: this.mode,
            performPointIndex: pointIndex,
            performPoint: this.points[pointIndex]
        });
    }
    startPressedMove(point) {
        this._prevPressedPoint = { ...point };
        this._prevPressedPoints = clone(this.points);
    }
    eventPressedOtherMove(point, chartStore) {
        if (this._prevPressedPoint !== null) {
            let difDataIndex = null;
            if (isNumber(point.dataIndex) && isNumber(this._prevPressedPoint.dataIndex)) {
                difDataIndex = point.dataIndex - this._prevPressedPoint.dataIndex;
            }
            let difValue = null;
            if (isNumber(point.value) && isNumber(this._prevPressedPoint.value)) {
                difValue = point.value - this._prevPressedPoint.value;
            }
            this.points = this._prevPressedPoints.map(p => {
                if (isNumber(p.timestamp)) {
                    p.dataIndex = chartStore.timestampToDataIndex(p.timestamp);
                }
                const newPoint = { ...p };
                if (isNumber(difDataIndex) && isNumber(p.dataIndex)) {
                    newPoint.dataIndex = p.dataIndex + difDataIndex;
                    newPoint.timestamp = chartStore.dataIndexToTimestamp(newPoint.dataIndex) ?? undefined;
                }
                if (isNumber(difValue) && isNumber(p.value)) {
                    newPoint.value = p.value + difValue;
                }
                return newPoint;
            });
        }
    }
    static extend(template) {
        class Custom extends OverlayImp {
            constructor() {
                super(template);
            }
        }
        return Custom;
    }
}

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
const SymbolDefaultPrecisionConstants = {
    PRICE: 2,
    VOLUME: 0
};

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
const fibonacciLine = {
    name: 'fibonacciLine',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ chart, coordinates, bounding, overlay, yAxis }) => {
        const points = overlay.points;
        if (coordinates.length > 0) {
            let precision = 0;
            if (yAxis?.isInCandle() ?? true) {
                precision = chart.getSymbol()?.pricePrecision ?? SymbolDefaultPrecisionConstants.PRICE;
            }
            else {
                const indicators = chart.getIndicators({ paneId: overlay.paneId });
                indicators.forEach(indicator => {
                    precision = Math.max(precision, indicator.precision);
                });
            }
            const lines = [];
            const texts = [];
            const startX = 0;
            const endX = bounding.width;
            if (coordinates.length > 1 && isNumber(points[0].value) && isNumber(points[1].value)) {
                const percents = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0];
                const yDif = coordinates[0].y - coordinates[1].y;
                const valueDif = points[0].value - points[1].value;
                percents.forEach(percent => {
                    const y = coordinates[1].y + yDif * percent;
                    const value = chart.getDecimalFold().format(chart.getThousandsSeparator().format(((points[1].value ?? 0) + valueDif * percent).toFixed(precision)));
                    lines.push({ coordinates: [{ x: startX, y }, { x: endX, y }] });
                    texts.push({
                        x: startX,
                        y,
                        text: `${value} (${(percent * 100).toFixed(1)}%)`,
                        baseline: 'bottom'
                    });
                });
            }
            return [
                {
                    type: 'line',
                    attrs: lines
                }, {
                    type: 'text',
                    isCheckEvent: false,
                    attrs: texts
                }
            ];
        }
        return [];
    }
};

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
const horizontalRayLine = {
    name: 'horizontalRayLine',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates, bounding }) => {
        const coordinate = { x: 0, y: coordinates[0].y };
        if (isValid(coordinates[1]) && coordinates[0].x < coordinates[1].x) {
            coordinate.x = bounding.width;
        }
        return [
            {
                type: 'line',
                attrs: { coordinates: [coordinates[0], coordinate] }
            }
        ];
    },
    performEventPressedMove: ({ points, performPoint }) => {
        points[0].value = performPoint.value;
        points[1].value = performPoint.value;
    },
    performEventMoveForDrawing: ({ currentStep, points, performPoint }) => {
        if (currentStep === 2) {
            points[0].value = performPoint.value;
        }
    }
};

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
const horizontalSegment = {
    name: 'horizontalSegment',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates }) => {
        const lines = [];
        if (coordinates.length === 2) {
            lines.push({ coordinates });
        }
        return [
            {
                type: 'line',
                attrs: lines
            }
        ];
    },
    performEventPressedMove: ({ points, performPoint }) => {
        points[0].value = performPoint.value;
        points[1].value = performPoint.value;
    },
    performEventMoveForDrawing: ({ currentStep, points, performPoint }) => {
        if (currentStep === 2) {
            points[0].value = performPoint.value;
        }
    }
};

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
const horizontalStraightLine = {
    name: 'horizontalStraightLine',
    totalStep: 2,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates, bounding }) => [{
            type: 'line',
            attrs: {
                coordinates: [
                    {
                        x: 0,
                        y: coordinates[0].y
                    }, {
                        x: bounding.width,
                        y: coordinates[0].y
                    }
                ]
            }
        }]
};

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
/**
 * 获取平行线
 * @param coordinates
 * @param bounding
 * @param extendParallelLineCount
 * @returns {Array}
 */
function getParallelLines(coordinates, bounding, extendParallelLineCount) {
    const count = extendParallelLineCount ?? 0;
    const lines = [];
    if (coordinates.length > 1) {
        if (coordinates[0].x === coordinates[1].x) {
            const startY = 0;
            const endY = bounding.height;
            lines.push({ coordinates: [{ x: coordinates[0].x, y: startY }, { x: coordinates[0].x, y: endY }] });
            if (coordinates.length > 2) {
                lines.push({ coordinates: [{ x: coordinates[2].x, y: startY }, { x: coordinates[2].x, y: endY }] });
                const distance = coordinates[0].x - coordinates[2].x;
                for (let i = 0; i < count; i++) {
                    const d = distance * (i + 1);
                    lines.push({ coordinates: [{ x: coordinates[0].x + d, y: startY }, { x: coordinates[0].x + d, y: endY }] });
                }
            }
        }
        else {
            const startX = 0;
            const endX = bounding.width;
            const kb = getLinearSlopeIntercept(coordinates[0], coordinates[1]);
            const k = kb[0];
            const b = kb[1];
            lines.push({ coordinates: [{ x: startX, y: startX * k + b }, { x: endX, y: endX * k + b }] });
            if (coordinates.length > 2) {
                const b1 = coordinates[2].y - k * coordinates[2].x;
                lines.push({ coordinates: [{ x: startX, y: startX * k + b1 }, { x: endX, y: endX * k + b1 }] });
                const distance = b - b1;
                for (let i = 0; i < count; i++) {
                    const b2 = b + distance * (i + 1);
                    lines.push({ coordinates: [{ x: startX, y: startX * k + b2 }, { x: endX, y: endX * k + b2 }] });
                }
            }
        }
    }
    return lines;
}
const parallelStraightLine = {
    name: 'parallelStraightLine',
    totalStep: 4,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates, bounding }) => [
        {
            type: 'line',
            attrs: getParallelLines(coordinates, bounding)
        }
    ]
};

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
const priceChannelLine = {
    name: 'priceChannelLine',
    totalStep: 4,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates, bounding }) => [
        {
            type: 'line',
            attrs: getParallelLines(coordinates, bounding, 1)
        }
    ]
};

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
const priceLine = {
    name: 'priceLine',
    totalStep: 2,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ chart, coordinates, bounding, overlay, yAxis }) => {
        let precision = 0;
        if (yAxis?.isInCandle() ?? true) {
            precision = chart.getSymbol()?.pricePrecision ?? SymbolDefaultPrecisionConstants.PRICE;
        }
        else {
            const indicators = chart.getIndicators({ paneId: overlay.paneId });
            indicators.forEach(indicator => {
                precision = Math.max(precision, indicator.precision);
            });
        }
        const { value = 0 } = (overlay.points)[0];
        return [
            {
                type: 'line',
                attrs: { coordinates: [coordinates[0], { x: bounding.width, y: coordinates[0].y }] }
            },
            {
                type: 'text',
                ignoreEvent: true,
                attrs: {
                    x: coordinates[0].x,
                    y: coordinates[0].y,
                    text: chart.getDecimalFold().format(chart.getThousandsSeparator().format(value.toFixed(precision))),
                    baseline: 'bottom'
                }
            }
        ];
    }
};

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
function getRayLine$1(coordinates, bounding) {
    if (coordinates.length > 1) {
        let coordinate = { x: 0, y: 0 };
        if (coordinates[0].x === coordinates[1].x && coordinates[0].y !== coordinates[1].y) {
            if (coordinates[0].y < coordinates[1].y) {
                coordinate = {
                    x: coordinates[0].x,
                    y: bounding.height
                };
            }
            else {
                coordinate = {
                    x: coordinates[0].x,
                    y: 0
                };
            }
        }
        else if (coordinates[0].x > coordinates[1].x) {
            coordinate = {
                x: 0,
                y: getLinearYFromCoordinates(coordinates[0], coordinates[1], { x: 0, y: coordinates[0].y })
            };
        }
        else {
            coordinate = {
                x: bounding.width,
                y: getLinearYFromCoordinates(coordinates[0], coordinates[1], { x: bounding.width, y: coordinates[0].y })
            };
        }
        return { coordinates: [coordinates[0], coordinate] };
    }
    return [];
}
const rayLine = {
    name: 'rayLine',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates, bounding }) => [
        {
            type: 'line',
            attrs: getRayLine$1(coordinates, bounding)
        }
    ]
};

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
const segment = {
    name: 'segment',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates }) => {
        if (coordinates.length === 2) {
            return [
                {
                    type: 'line',
                    attrs: { coordinates }
                }
            ];
        }
        return [];
    }
};

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
const straightLine = {
    name: 'straightLine',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates, bounding }) => {
        if (coordinates.length === 2) {
            if (coordinates[0].x === coordinates[1].x) {
                return [
                    {
                        type: 'line',
                        attrs: {
                            coordinates: [
                                {
                                    x: coordinates[0].x,
                                    y: 0
                                }, {
                                    x: coordinates[0].x,
                                    y: bounding.height
                                }
                            ]
                        }
                    }
                ];
            }
            return [
                {
                    type: 'line',
                    attrs: {
                        coordinates: [
                            {
                                x: 0,
                                y: getLinearYFromCoordinates(coordinates[0], coordinates[1], { x: 0, y: coordinates[0].y })
                            }, {
                                x: bounding.width,
                                y: getLinearYFromCoordinates(coordinates[0], coordinates[1], { x: bounding.width, y: coordinates[0].y })
                            }
                        ]
                    }
                }
            ];
        }
        return [];
    }
};

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
const verticalRayLine = {
    name: 'verticalRayLine',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates, bounding }) => {
        if (coordinates.length === 2) {
            const coordinate = { x: coordinates[0].x, y: 0 };
            if (coordinates[0].y < coordinates[1].y) {
                coordinate.y = bounding.height;
            }
            return [
                {
                    type: 'line',
                    attrs: { coordinates: [coordinates[0], coordinate] }
                }
            ];
        }
        return [];
    },
    performEventPressedMove: ({ points, performPoint }) => {
        points[0].timestamp = performPoint.timestamp;
        points[0].dataIndex = performPoint.dataIndex;
        points[1].timestamp = performPoint.timestamp;
        points[1].dataIndex = performPoint.dataIndex;
    },
    performEventMoveForDrawing: ({ currentStep, points, performPoint }) => {
        if (currentStep === 2) {
            points[0].timestamp = performPoint.timestamp;
            points[0].dataIndex = performPoint.dataIndex;
        }
    }
};

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
const verticalSegment = {
    name: 'verticalSegment',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates }) => {
        if (coordinates.length === 2) {
            return [
                {
                    type: 'line',
                    attrs: { coordinates }
                }
            ];
        }
        return [];
    },
    performEventPressedMove: ({ points, performPoint }) => {
        points[0].timestamp = performPoint.timestamp;
        points[0].dataIndex = performPoint.dataIndex;
        points[1].timestamp = performPoint.timestamp;
        points[1].dataIndex = performPoint.dataIndex;
    },
    performEventMoveForDrawing: ({ currentStep, points, performPoint }) => {
        if (currentStep === 2) {
            points[0].timestamp = performPoint.timestamp;
            points[0].dataIndex = performPoint.dataIndex;
        }
    }
};

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
const verticalStraightLine = {
    name: 'verticalStraightLine',
    totalStep: 2,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates, bounding }) => [
        {
            type: 'line',
            attrs: {
                coordinates: [
                    {
                        x: coordinates[0].x,
                        y: 0
                    }, {
                        x: coordinates[0].x,
                        y: bounding.height
                    }
                ]
            }
        }
    ]
};

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
const simpleAnnotation = {
    name: 'simpleAnnotation',
    totalStep: 2,
    styles: {
        line: { style: 'dashed' }
    },
    createPointFigures: ({ overlay, coordinates }) => {
        let text = '';
        if (isValid(overlay.extendData)) {
            if (!isFunction(overlay.extendData)) {
                text = (overlay.extendData ?? '');
            }
            else {
                text = (overlay.extendData(overlay));
            }
        }
        const startX = coordinates[0].x;
        const startY = coordinates[0].y - 6;
        const lineEndY = startY - 50;
        const arrowEndY = lineEndY - 5;
        return [
            {
                type: 'line',
                attrs: { coordinates: [{ x: startX, y: startY }, { x: startX, y: lineEndY }] },
                ignoreEvent: true
            },
            {
                type: 'polygon',
                attrs: { coordinates: [{ x: startX, y: lineEndY }, { x: startX - 4, y: arrowEndY }, { x: startX + 4, y: arrowEndY }] },
                ignoreEvent: true
            },
            {
                type: 'text',
                attrs: { x: startX, y: arrowEndY, text, align: 'center', baseline: 'bottom' },
                ignoreEvent: true
            }
        ];
    }
};

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
const simpleTag = {
    name: 'simpleTag',
    totalStep: 2,
    styles: {
        line: { style: 'dashed' }
    },
    createPointFigures: ({ bounding, coordinates }) => ({
        type: 'line',
        attrs: {
            coordinates: [
                { x: 0, y: coordinates[0].y },
                { x: bounding.width, y: coordinates[0].y }
            ]
        },
        ignoreEvent: true
    }),
    createYAxisFigures: ({ chart, overlay, coordinates, bounding, yAxis }) => {
        const isFromZero = yAxis?.isFromZero() ?? false;
        let textAlign = 'left';
        let x = 0;
        if (isFromZero) {
            textAlign = 'left';
            x = 0;
        }
        else {
            textAlign = 'right';
            x = bounding.width;
        }
        let text = '';
        if (isValid(overlay.extendData)) {
            if (!isFunction(overlay.extendData)) {
                text = (overlay.extendData ?? '');
            }
            else {
                text = overlay.extendData(overlay);
            }
        }
        if (!isValid(text) && isNumber(overlay.points[0].value)) {
            text = formatPrecision(overlay.points[0].value, chart.getSymbol()?.pricePrecision ?? SymbolDefaultPrecisionConstants.PRICE);
        }
        return { type: 'text', attrs: { x, y: coordinates[0].y, text, align: textAlign, baseline: 'middle' } };
    }
};

function rotatePoint$1(point, center, angle) {
    const x = (point.x - center.x) * Math.cos(angle) - (point.y - center.y) * Math.sin(angle) + center.x;
    const y = (point.x - center.x) * Math.sin(angle) + (point.y - center.y) * Math.cos(angle) + center.y;
    return { x, y };
}
const arrow$1 = {
    name: 'arrow',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates }) => {
        if (coordinates.length > 1) {
            const direction = coordinates[1].x > coordinates[0].x ? 0 : 1;
            const slopeIntercept = getLinearSlopeIntercept(coordinates[0], coordinates[1]);
            let angle;
            if (slopeIntercept) {
                angle = Math.atan(slopeIntercept[0]) + Math.PI * direction;
            }
            else {
                angle = coordinates[1].y > coordinates[0].y ? Math.PI / 2 : Math.PI / 2 * 3;
            }
            const arrowLeft = rotatePoint$1({ x: coordinates[1].x - 8, y: coordinates[1].y + 4 }, coordinates[1], angle);
            const arrowRight = rotatePoint$1({ x: coordinates[1].x - 8, y: coordinates[1].y - 4 }, coordinates[1], angle);
            return [
                {
                    type: 'line',
                    attrs: { coordinates }
                },
                {
                    type: 'line',
                    ignoreEvent: true,
                    attrs: {
                        coordinates: [arrowLeft, coordinates[1], arrowRight]
                    }
                }
            ];
        }
        return [];
    }
};

function distance$2(p1, p2) {
    const dx = Math.abs(p1.x - p2.x);
    const dy = Math.abs(p1.y - p2.y);
    return Math.sqrt(dx * dx + dy * dy);
}
const circle$1 = {
    name: 'circle',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: {
        circle: { color: 'rgba(22, 119, 255, 0.15)' }
    },
    createPointFigures: ({ coordinates }) => {
        if (coordinates.length > 1) {
            const r = distance$2(coordinates[0], coordinates[1]);
            return {
                type: 'circle',
                attrs: { ...coordinates[0], r },
                styles: { style: 'stroke_fill' }
            };
        }
        return [];
    }
};

const rect$1 = {
    name: 'rect',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: {
        polygon: { color: 'rgba(22, 119, 255, 0.15)' }
    },
    createPointFigures: ({ coordinates }) => coordinates.length > 1
        ? [{
                type: 'polygon',
                attrs: {
                    coordinates: [
                        coordinates[0],
                        { x: coordinates[1].x, y: coordinates[0].y },
                        coordinates[1],
                        { x: coordinates[0].x, y: coordinates[1].y }
                    ]
                },
                styles: { style: 'stroke_fill' }
            }]
        : []
};

const triangle$1 = {
    name: 'triangle',
    totalStep: 4,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: {
        polygon: { color: 'rgba(22, 119, 255, 0.15)' }
    },
    createPointFigures: ({ coordinates }) => [{
            type: 'polygon',
            attrs: { coordinates },
            styles: { style: 'stroke_fill' }
        }]
};

const parallelogram$1 = {
    name: 'parallelogram',
    totalStep: 4,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: {
        polygon: { color: 'rgba(22, 119, 255, 0.15)' }
    },
    createPointFigures: ({ coordinates }) => {
        if (coordinates.length === 2) {
            return [{
                    type: 'line',
                    ignoreEvent: true,
                    attrs: { coordinates }
                }];
        }
        if (coordinates.length === 3) {
            const fourth = {
                x: coordinates[0].x + coordinates[2].x - coordinates[1].x,
                y: coordinates[0].y + coordinates[2].y - coordinates[1].y
            };
            return [{
                    type: 'polygon',
                    attrs: {
                        coordinates: [coordinates[0], coordinates[1], coordinates[2], fourth]
                    },
                    styles: { style: 'stroke_fill' }
                }];
        }
        return [];
    },
    performEventPressedMove: ({ points, performPointIndex, performPoint }) => {
        if (performPointIndex < 2) {
            points[0].value = performPoint.value;
            points[1].value = performPoint.value;
        }
    },
    performEventMoveForDrawing: ({ currentStep, points, performPoint }) => {
        if (currentStep === 2) {
            points[0].value = performPoint.value;
        }
    }
};

function distance$1(p1, p2) {
    const dx = Math.abs(p1.x - p2.x);
    const dy = Math.abs(p1.y - p2.y);
    return Math.sqrt(dx * dx + dy * dy);
}
const fibonacciCircle$1 = {
    name: 'fibonacciCircle',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates }) => {
        if (coordinates.length > 1) {
            const radius = distance$1(coordinates[0], coordinates[1]);
            const percents = [0.236, 0.382, 0.5, 0.618, 0.786, 1];
            const circles = [];
            const texts = [];
            percents.forEach(p => {
                const r = radius * p;
                circles.push({ ...coordinates[0], r });
                texts.push({
                    x: coordinates[0].x,
                    y: coordinates[0].y + r + 6,
                    text: `${(p * 100).toFixed(1)}%`
                });
            });
            return [
                { type: 'circle', attrs: circles, styles: { style: 'stroke' } },
                { type: 'text', ignoreEvent: true, attrs: texts }
            ];
        }
        return [];
    }
};

const fibonacciSegment$1 = {
    name: 'fibonacciSegment',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates, overlay }) => {
        const lines = [];
        const texts = [];
        if (coordinates.length > 1) {
            const leftX = coordinates[1].x > coordinates[0].x ? coordinates[0].x : coordinates[1].x;
            const percents = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0];
            const yDif = coordinates[0].y - coordinates[1].y;
            const points = overlay.points;
            const valueDif = (points[0].value ?? 0) - (points[1].value ?? 0);
            percents.forEach(p => {
                const y = coordinates[1].y + yDif * p;
                const value = ((points[1].value ?? 0) + valueDif * p).toFixed(2);
                lines.push({
                    coordinates: [{ x: coordinates[0].x, y }, { x: coordinates[1].x, y }]
                });
                texts.push({
                    x: leftX, y,
                    text: `${value} (${(p * 100).toFixed(1)}%)`,
                    baseline: 'bottom'
                });
            });
        }
        return [
            { type: 'line', attrs: lines },
            { type: 'text', ignoreEvent: true, attrs: texts }
        ];
    }
};

const fibonacciExtension$1 = {
    name: 'fibonacciExtension',
    totalStep: 4,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates, overlay }) => {
        const lines = [];
        const texts = [];
        if (coordinates.length > 2) {
            const points = overlay.points;
            const valueDif = (points[1].value ?? 0) - (points[0].value ?? 0);
            const yDif = coordinates[1].y - coordinates[0].y;
            const percents = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
            const leftX = coordinates[2].x > coordinates[1].x ? coordinates[1].x : coordinates[2].x;
            percents.forEach(p => {
                const y = coordinates[2].y + yDif * p;
                const value = ((points[2].value ?? 0) + valueDif * p).toFixed(2);
                lines.push({
                    coordinates: [{ x: coordinates[1].x, y }, { x: coordinates[2].x, y }]
                });
                texts.push({
                    x: leftX, y,
                    text: `${value} (${(p * 100).toFixed(1)}%)`,
                    baseline: 'bottom'
                });
            });
        }
        return [
            { type: 'line', attrs: { coordinates }, styles: { style: 'dashed' } },
            { type: 'line', attrs: lines },
            { type: 'text', ignoreEvent: true, attrs: texts }
        ];
    }
};

function distance(p1, p2) {
    const dx = Math.abs(p1.x - p2.x);
    const dy = Math.abs(p1.y - p2.y);
    return Math.sqrt(dx * dx + dy * dy);
}
function rotatePoint(point, center, angle) {
    const x = (point.x - center.x) * Math.cos(angle) - (point.y - center.y) * Math.sin(angle) + center.x;
    const y = (point.x - center.x) * Math.sin(angle) + (point.y - center.y) * Math.cos(angle) + center.y;
    return { x, y };
}
function extendLine$1(coords, bounding) {
    if (coords.length > 1) {
        let end;
        if (coords[0].x === coords[1].x && coords[0].y !== coords[1].y) {
            end = coords[0].y < coords[1].y
                ? { x: coords[0].x, y: bounding.height }
                : { x: coords[0].x, y: 0 };
        }
        else if (coords[0].x > coords[1].x) {
            end = { x: 0, y: getLinearYFromCoordinates(coords[0], coords[1], { x: 0, y: coords[0].y }) };
        }
        else {
            end = { x: bounding.width, y: getLinearYFromCoordinates(coords[0], coords[1], { x: bounding.width, y: coords[0].y }) };
        }
        return { coordinates: [coords[0], end] };
    }
    return [];
}
const fibonacciSpiral$1 = {
    name: 'fibonacciSpiral',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates, bounding }) => {
        if (coordinates.length > 1) {
            const baseRadius = distance(coordinates[0], coordinates[1]) / Math.sqrt(24);
            const direction = coordinates[1].x > coordinates[0].x ? 0 : 1;
            const slopeIntercept = getLinearSlopeIntercept(coordinates[0], coordinates[1]);
            let angle;
            if (slopeIntercept) {
                angle = Math.atan(slopeIntercept[0]) + Math.PI * direction;
            }
            else {
                angle = coordinates[1].y > coordinates[0].y ? Math.PI / 2 : Math.PI / 2 * 3;
            }
            const p1 = rotatePoint({ x: coordinates[0].x - baseRadius, y: coordinates[0].y }, coordinates[0], angle);
            const p2 = rotatePoint({ x: coordinates[0].x - baseRadius, y: coordinates[0].y - baseRadius }, coordinates[0], angle);
            const arcs = [
                { ...p1, r: baseRadius, startAngle: angle, endAngle: angle + Math.PI / 2 },
                { ...p2, r: baseRadius * 2, startAngle: angle + Math.PI / 2, endAngle: angle + Math.PI }
            ];
            let cx = coordinates[0].x - baseRadius;
            let cy = coordinates[0].y - baseRadius;
            for (let i = 2; i < 9; i++) {
                const r = arcs[i - 2].r + arcs[i - 1].r;
                let startAngle = 0;
                switch (i % 4) {
                    case 0:
                        startAngle = angle;
                        cx -= arcs[i - 2].r;
                        break;
                    case 1:
                        startAngle = angle + Math.PI / 2;
                        cy -= arcs[i - 2].r;
                        break;
                    case 2:
                        startAngle = angle + Math.PI;
                        cx += arcs[i - 2].r;
                        break;
                    case 3:
                        startAngle = angle + Math.PI / 2 * 3;
                        cy += arcs[i - 2].r;
                        break;
                }
                const center = rotatePoint({ x: cx, y: cy }, coordinates[0], angle);
                arcs.push({ ...center, r, startAngle, endAngle: startAngle + Math.PI / 2 });
            }
            return [
                { type: 'arc', attrs: arcs },
                { type: 'line', attrs: extendLine$1(coordinates, bounding) }
            ];
        }
        return [];
    }
};

function extendLine(coords, bounding) {
    if (coords.length > 1) {
        let end;
        if (coords[0].x === coords[1].x && coords[0].y !== coords[1].y) {
            end = coords[0].y < coords[1].y
                ? { x: coords[0].x, y: bounding.height }
                : { x: coords[0].x, y: 0 };
        }
        else if (coords[0].x > coords[1].x) {
            end = { x: 0, y: getLinearYFromCoordinates(coords[0], coords[1], { x: 0, y: coords[0].y }) };
        }
        else {
            end = { x: bounding.width, y: getLinearYFromCoordinates(coords[0], coords[1], { x: bounding.width, y: coords[0].y }) };
        }
        return { coordinates: [coords[0], end] };
    }
    return [];
}
const fibonacciSpeedResistanceFan$1 = {
    name: 'fibonacciSpeedResistanceFan',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates, bounding }) => {
        const gridLines = [];
        let fanLines = [];
        const texts = [];
        if (coordinates.length > 1) {
            const [p0, p1] = coordinates;
            const textOffsetX = p1.x > p0.x ? -38 : 4;
            const textOffsetY = p1.y > p0.y ? -2 : 20;
            const dx = p1.x - p0.x;
            const dy = p1.y - p0.y;
            const percents = [1, 0.75, 0.618, 0.5, 0.382, 0.25, 0];
            percents.forEach(p => {
                const x = p1.x - dx * p;
                const y = p1.y - dy * p;
                gridLines.push({ coordinates: [{ x, y: p0.y }, { x, y: p1.y }] });
                gridLines.push({ coordinates: [{ x: p0.x, y }, { x: p1.x, y }] });
                fanLines = fanLines.concat(extendLine([p0, { x, y: p1.y }], bounding));
                fanLines = fanLines.concat(extendLine([p0, { x: p1.x, y }], bounding));
                texts.unshift({ x: p0.x + textOffsetX, y: y + 10, text: `${p.toFixed(3)}` });
                texts.unshift({ x: x - 18, y: p0.y + textOffsetY, text: `${p.toFixed(3)}` });
            });
        }
        return [
            { type: 'line', attrs: gridLines },
            { type: 'line', attrs: fanLines },
            { type: 'text', ignoreEvent: true, attrs: texts }
        ];
    }
};

const fibonacciDiagonal$1 = {
    name: 'fibonacciDiagonal',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates, overlay }) => {
        const points = overlay.points;
        if (coordinates.length > 0) {
            const lines = [];
            const texts = [];
            const startX = coordinates[0].x;
            const endX = coordinates[coordinates.length - 1].x;
            if (coordinates.length > 1 && points[0].value !== undefined && points[1].value !== undefined) {
                const percents = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0];
                const yDif = coordinates[0].y - coordinates[1].y;
                const valueDif = points[0].value - points[1].value;
                percents.forEach(p => {
                    const y = coordinates[1].y + yDif * p;
                    const value = ((points[1].value ?? 0) + valueDif * p).toFixed(2);
                    lines.push({ coordinates: [{ x: startX, y }, { x: endX, y }] });
                    texts.push({
                        x: startX, y,
                        text: `${value} (${(p * 100).toFixed(1)}%)`,
                        baseline: 'bottom'
                    });
                });
                // Diagonal line connecting first to last level
                lines.push({
                    coordinates: [
                        { x: lines[0].coordinates[0].x, y: lines[0].coordinates[0].y },
                        { x: lines[percents.length - 1].coordinates[1].x, y: lines[percents.length - 1].coordinates[1].y }
                    ]
                });
            }
            return [
                { type: 'line', attrs: lines },
                { type: 'text', isCheckEvent: false, attrs: texts }
            ];
        }
        return [];
    }
};

const gannBox$1 = {
    name: 'gannBox',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: {
        polygon: { color: 'rgba(22, 119, 255, 0.15)' }
    },
    createPointFigures: ({ coordinates }) => {
        if (coordinates.length > 1) {
            const [p0, p1] = coordinates;
            const yQuarter = (p1.y - p0.y) / 4;
            const xDif = p1.x - p0.x;
            // Dashed internal lines
            const dashed = [
                { coordinates: [p0, { x: p1.x, y: p1.y - yQuarter }] },
                { coordinates: [p0, { x: p1.x, y: p1.y - yQuarter * 2 }] },
                { coordinates: [{ x: p0.x, y: p1.y }, { x: p1.x, y: p0.y + yQuarter }] },
                { coordinates: [{ x: p0.x, y: p1.y }, { x: p1.x, y: p0.y + yQuarter * 2 }] },
                { coordinates: [{ ...p0 }, { x: p0.x + xDif * 0.236, y: p1.y }] },
                { coordinates: [{ ...p0 }, { x: p0.x + xDif * 0.5, y: p1.y }] },
                { coordinates: [{ x: p0.x, y: p1.y }, { x: p0.x + xDif * 0.236, y: p0.y }] },
                { coordinates: [{ x: p0.x, y: p1.y }, { x: p0.x + xDif * 0.5, y: p0.y }] }
            ];
            // Diagonals
            const diagonals = [
                { coordinates: [p0, p1] },
                { coordinates: [{ x: p0.x, y: p1.y }, { x: p1.x, y: p0.y }] }
            ];
            return [
                {
                    type: 'line',
                    attrs: [
                        { coordinates: [p0, { x: p1.x, y: p0.y }] },
                        { coordinates: [{ x: p1.x, y: p0.y }, p1] },
                        { coordinates: [p1, { x: p0.x, y: p1.y }] },
                        { coordinates: [{ x: p0.x, y: p1.y }, p0] }
                    ]
                },
                {
                    type: 'polygon',
                    ignoreEvent: true,
                    attrs: {
                        coordinates: [p0, { x: p1.x, y: p0.y }, p1, { x: p0.x, y: p1.y }]
                    },
                    styles: { style: 'fill' }
                },
                { type: 'line', attrs: dashed, styles: { style: 'dashed' } },
                { type: 'line', attrs: diagonals }
            ];
        }
        return [];
    }
};

function createWaveOverlay(name, totalStep) {
    return {
        name,
        totalStep,
        needDefaultPointFigure: true,
        needDefaultXAxisFigure: true,
        needDefaultYAxisFigure: true,
        createPointFigures: ({ coordinates }) => {
            const texts = coordinates.map((c, i) => ({
                ...c,
                text: `(${i})`,
                baseline: 'bottom'
            }));
            return [
                { type: 'line', attrs: { coordinates } },
                { type: 'text', ignoreEvent: true, attrs: texts }
            ];
        }
    };
}
const threeWaves$1 = createWaveOverlay('threeWaves', 5);
const fiveWaves$1 = createWaveOverlay('fiveWaves', 7);
const eightWaves$1 = createWaveOverlay('eightWaves', 10);
const anyWaves$1 = createWaveOverlay('anyWaves', Number.MAX_SAFE_INTEGER);

const abcd$1 = {
    name: 'abcd',
    totalStep: 5,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates }) => {
        const labels = ['A', 'B', 'C', 'D'];
        const texts = coordinates.map((c, i) => ({
            ...c,
            baseline: 'bottom',
            text: `(${labels[i]})`
        }));
        let acLine = [];
        let bdLine = [];
        if (coordinates.length > 2) {
            acLine = [coordinates[0], coordinates[2]];
            if (coordinates.length > 3) {
                bdLine = [coordinates[1], coordinates[3]];
            }
        }
        return [
            { type: 'line', attrs: { coordinates } },
            {
                type: 'line',
                attrs: [{ coordinates: acLine }, { coordinates: bdLine }],
                styles: { style: 'dashed' }
            },
            { type: 'text', ignoreEvent: true, attrs: texts }
        ];
    }
};

const xabcd$1 = {
    name: 'xabcd',
    totalStep: 6,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: {
        polygon: { color: 'rgba(22, 119, 255, 0.15)' }
    },
    createPointFigures: ({ coordinates }) => {
        const dashed = [];
        const polygons = [];
        const labels = ['X', 'A', 'B', 'C', 'D'];
        const texts = coordinates.map((c, i) => ({
            ...c,
            baseline: 'bottom',
            text: `(${labels[i]})`
        }));
        if (coordinates.length > 2) {
            dashed.push({ coordinates: [coordinates[0], coordinates[2]] });
            polygons.push({ coordinates: [coordinates[0], coordinates[1], coordinates[2]] });
            if (coordinates.length > 3) {
                dashed.push({ coordinates: [coordinates[1], coordinates[3]] });
                if (coordinates.length > 4) {
                    dashed.push({ coordinates: [coordinates[2], coordinates[4]] });
                    polygons.push({ coordinates: [coordinates[2], coordinates[3], coordinates[4]] });
                }
            }
        }
        return [
            { type: 'line', attrs: { coordinates } },
            { type: 'line', attrs: dashed, styles: { style: 'dashed' } },
            { type: 'polygon', ignoreEvent: true, attrs: polygons },
            { type: 'text', ignoreEvent: true, attrs: texts }
        ];
    }
};

const elliotTripleComboWaves$1 = {
    name: 'elliotTripleComboWaves',
    totalStep: 6,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates }) => {
        const labels = ['(0)', '(W)', '(X)', '(Y)', '(Z)'];
        const texts = coordinates.map((c, i) => ({
            ...c, baseline: 'bottom', text: `(${labels[i]})`
        }));
        return [
            { type: 'line', attrs: { coordinates } },
            { type: 'line', attrs: [{ coordinates: [] }, { coordinates: [] }], styles: { style: 'dashed' } },
            { type: 'text', ignoreEvent: true, attrs: texts }
        ];
    }
};

const headAndShoulders$1 = {
    name: 'headAndShoulders',
    totalStep: 8,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: {
        polygon: { color: 'rgba(22, 119, 255, 0.15)' }
    },
    createPointFigures: ({ coordinates }) => {
        const dashed = [];
        const polygons = [];
        const labels = ['1', 'Left Shoulder', '2', 'Head', '3', 'Right Shoulder', '4'];
        const texts = coordinates.map((c, i) => ({
            ...c, baseline: 'bottom', text: `${labels[i]}`
        }));
        if (coordinates.length > 2) {
            dashed.push({ coordinates: [coordinates[0], coordinates[2]] });
            polygons.push({ coordinates: [coordinates[0], coordinates[1], coordinates[2]] });
            if (coordinates.length > 4) {
                dashed.push({ coordinates: [coordinates[2], coordinates[4]] });
                polygons.push({ coordinates: [coordinates[2], coordinates[3], coordinates[4]] });
                if (coordinates.length > 6) {
                    dashed.push({ coordinates: [coordinates[4], coordinates[6]] });
                    polygons.push({ coordinates: [coordinates[4], coordinates[5], coordinates[6]] });
                }
            }
        }
        return [
            { type: 'line', attrs: { coordinates } },
            { type: 'line', attrs: dashed, styles: { style: 'dashed' } },
            { type: 'polygon', ignoreEvent: true, attrs: polygons },
            { type: 'text', ignoreEvent: true, attrs: texts }
        ];
    }
};

const measure$1 = {
    name: 'measure',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: {
        backgroundColor: 'rgba(22, 119, 255, 0.25)',
        tipBackgroundColor: '#1677FF',
        lineColor: '#1677FF'
    },
    createPointFigures: ({ coordinates, overlay, bounding }) => {
        if (coordinates.length > 1) {
            const [p0, p1] = coordinates;
            const val1 = overlay.points[1]?.value;
            const val0 = overlay.points[0]?.value;
            let pctChange = 0;
            let priceDiff = 0;
            if (val0 !== undefined && val1 !== undefined) {
                pctChange = (val1 - val0) / val0 * 100;
                priceDiff = val1 - val0;
            }
            const isRight = p0.x < p1.x;
            const isDown = p0.y < p1.y;
            const center = { x: Math.round((p0.x + p1.x) / 2), y: Math.round((p0.y + p1.y) / 2) };
            const bgColor = overlay.styles?.backgroundColor ?? 'rgba(22, 119, 255, 0.25)';
            const tipColor = overlay.styles?.tipBackgroundColor ?? '#1677FF';
            const lineColor = overlay.styles?.lineColor ?? '#1677FF';
            const label = `${priceDiff.toFixed(2)} (${pctChange.toFixed(2)}%)`;
            const figures = [
                // Background rect
                {
                    type: 'polygon',
                    attrs: {
                        coordinates: [p0, { x: p1.x, y: p0.y }, p1, { x: p0.x, y: p1.y }]
                    },
                    styles: { color: bgColor }
                },
                // Horizontal midline
                { type: 'line', attrs: { coordinates: [{ x: p0.x, y: center.y }, { x: p1.x, y: center.y }] }, styles: { color: lineColor } },
                // Vertical midline
                { type: 'line', attrs: { coordinates: [{ x: center.x, y: p0.y }, { x: center.x, y: p1.y }] }, styles: { color: lineColor } }
            ];
            // Horizontal arrow
            if (isRight) {
                figures.push({ type: 'line', attrs: { coordinates: [{ x: p1.x - 6, y: center.y - 4 }, { x: p1.x, y: center.y }, { x: p1.x - 6, y: center.y + 4 }] } });
            }
            else {
                figures.push({ type: 'line', attrs: { coordinates: [{ x: p1.x + 6, y: center.y - 4 }, { x: p1.x, y: center.y }, { x: p1.x + 6, y: center.y + 4 }] } });
            }
            // Vertical arrow
            if (isDown) {
                figures.push({ type: 'line', attrs: { coordinates: [{ x: center.x - 4, y: p1.y - 6 }, { x: center.x, y: p1.y }, { x: center.x + 4, y: p1.y - 6 }] }, styles: { color: lineColor } });
            }
            else {
                figures.push({ type: 'line', attrs: { coordinates: [{ x: center.x - 4, y: p1.y + 6 }, { x: center.x, y: p1.y }, { x: center.x + 4, y: p1.y + 6 }] }, styles: { color: lineColor } });
            }
            // Tooltip
            const tipHeight = 1 * 12 + 8 * 2;
            let tipWidth = calcTextWidth(label) + 12 * 2;
            let tipY;
            if (isDown) {
                tipY = p1.y + 8 + tipHeight > bounding.height ? bounding.height - tipHeight : p1.y + 8;
            }
            else {
                tipY = p1.y - 8 - tipHeight < 0 ? 0 : p1.y - 8 - tipHeight;
            }
            figures.push({
                type: 'rect',
                attrs: { x: center.x - tipWidth / 2, y: tipY, width: tipWidth, height: tipHeight },
                styles: { borderRadius: 4, color: tipColor }
            });
            figures.push({
                type: 'text',
                attrs: { x: center.x, y: tipY + 8, text: label, align: 'center' },
                styles: { paddingLeft: 0, paddingTop: 0, paddingRight: 0, paddingBottom: 0, backgroundColor: 'none', family: 'Space Grotesk, sans-serif' }
            });
            return figures;
        }
        return [];
    }
};

const crossLine$1 = {
    name: 'crossLine',
    totalStep: 2,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates, bounding }) => [
        {
            type: 'line',
            attrs: { coordinates: [{ x: 0, y: coordinates[0].y }, { x: bounding.width, y: coordinates[0].y }] }
        },
        {
            type: 'line',
            attrs: { coordinates: [{ x: coordinates[0].x, y: 0 }, { x: coordinates[0].x, y: bounding.height }] }
        }
    ]
};

const flatTopBottom = {
    name: 'faltTopBottom',
    totalStep: 4,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: false,
    styles: {
        polygon: { color: '#FCB9002b' },
        line: { size: 2, color: '#FCB900' }
    },
    createPointFigures: ({ coordinates }) => {
        let lines = [];
        const polygons = [];
        const topLines = [];
        if (coordinates.length > 2) {
            lines = [{ coordinates: [{ x: coordinates[0].x, y: coordinates[2].y }, { x: coordinates[1].x, y: coordinates[2].y }] }];
            polygons.push({
                coordinates: [
                    coordinates[0], coordinates[1],
                    { x: coordinates[1].x, y: coordinates[2].y },
                    { x: coordinates[0].x, y: coordinates[2].y }
                ]
            });
            topLines.push({ coordinates: [coordinates[0], coordinates[1]] });
        }
        else {
            lines = [{ coordinates }];
        }
        return [
            { type: 'line', attrs: lines, size: 2 },
            { type: 'polygon', ignoreEvent: true, attrs: polygons },
            { type: 'line', attrs: topLines, size: 2 }
        ];
    },
    performEventMoveForDrawing: ({ currentStep, points, performPoint }) => {
        if (currentStep === 3) {
            points[1].timestamp = performPoint.timestamp;
            points[1].dataIndex = performPoint.dataIndex;
        }
    },
    performEventPressedMove: ({ points, performPointIndex, performPoint }) => {
        switch (performPointIndex) {
            case 1:
                points[2].timestamp = performPoint.timestamp;
                points[2].dataIndex = performPoint.dataIndex;
                break;
            case 2:
                points[1].timestamp = performPoint.timestamp;
                points[1].dataIndex = performPoint.dataIndex;
                break;
            case 3:
                points[1].timestamp = performPoint.timestamp;
                break;
        }
    }
};

const disJointChannel$1 = {
    name: 'disJointChannel',
    totalStep: 4,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: {
        polygon: { color: '#FCB9002b' },
        line: { size: 2, color: '#FCB900' }
    },
    createPointFigures: ({ coordinates }) => {
        let mainLines = [];
        const secondLines = [];
        let height = 0;
        if (coordinates.length >= 2) {
            height = Math.abs(coordinates[1].y - coordinates[0].y);
        }
        if (coordinates.length > 2) {
            mainLines = [{
                    coordinates: [
                        { x: coordinates[0].x, y: coordinates[0].y },
                        { x: coordinates[1].x, y: coordinates[1].y }
                    ]
                }];
            secondLines.push({
                coordinates: [
                    { x: coordinates[1].x, y: coordinates[2].y },
                    { x: coordinates[0].x, y: coordinates[2].y + height }
                ]
            });
        }
        else {
            mainLines = [{ coordinates }];
        }
        return [
            { type: 'line', ignoreEvent: false, attrs: mainLines },
            { type: 'line', ignoreEvent: false, attrs: secondLines }
        ];
    },
    performEventMoveForDrawing: ({ currentStep, points, performPoint }) => {
        if (currentStep === 3) {
            points[1].timestamp = performPoint.timestamp;
            points[1].dataIndex = performPoint.dataIndex;
        }
    },
    performEventPressedMove: ({ points, performPointIndex, performPoint }) => {
        switch (performPointIndex) {
            case 1:
                points[2].timestamp = performPoint.timestamp;
                points[2].dataIndex = performPoint.dataIndex;
                break;
            case 2:
                points[1].timestamp = performPoint.timestamp;
                points[1].dataIndex = performPoint.dataIndex;
                break;
        }
    }
};

const arcOverlay = {
    name: 'arc',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: {
        arc: { color: 'rgba(22, 119, 255)' }
    },
    createPointFigures: ({ coordinates }) => {
        if (coordinates.length > 1) {
            const cx = (coordinates[0].x + coordinates[1].x) / 2;
            const cy = (coordinates[0].y + coordinates[1].y) / 2;
            const r = Math.sqrt(Math.pow(coordinates[1].x - coordinates[0].x, 2) +
                Math.pow(coordinates[1].y - coordinates[0].y, 2)) / 2;
            return [{
                    type: 'arc',
                    attrs: { x: cx, y: cy, r, startAngle: 0, endAngle: Math.PI },
                    styles: { style: 'solid' }
                }];
        }
        return [];
    }
};

const tradingPlan$1 = {
    name: 'tradingPlan',
    totalStep: 5,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: false,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates }) => {
        const len = coordinates.length;
        if (len >= 2) {
            if (len === 2) {
                return [{ type: 'line', attrs: { coordinates } }];
            }
            if (len >= 3) {
                const stopLoss = {
                    type: 'polygon',
                    attrs: {
                        coordinates: [
                            coordinates[0], coordinates[1],
                            { x: coordinates[1].x, y: coordinates[2].y },
                            { x: coordinates[0].x, y: coordinates[2].y }
                        ]
                    },
                    styles: { style: 'fill', color: '#DE46464f' }
                };
                if (len === 3)
                    return [stopLoss];
                const takeProfit = {
                    type: 'polygon',
                    attrs: {
                        coordinates: [
                            coordinates[0], coordinates[1],
                            { x: coordinates[1].x, y: coordinates[3].y },
                            { x: coordinates[0].x, y: coordinates[3].y }
                        ]
                    },
                    styles: { style: 'fill', color: '#03ca9b2f' }
                };
                return [stopLoss, takeProfit];
            }
        }
        return [];
    },
    performEventMoveForDrawing: ({ currentStep, points, performPoint }) => {
        switch (currentStep) {
            case 2:
                points[0].value = performPoint.value;
                break;
            case 3:
                points[1].timestamp = performPoint.timestamp;
                points[1].dataIndex = performPoint.dataIndex;
                break;
            case 4:
                points[1].timestamp = points[2].timestamp = performPoint.timestamp;
                points[1].dataIndex = points[2].dataIndex = performPoint.dataIndex;
                break;
        }
    },
    performEventPressedMove: ({ points, performPointIndex, performPoint }) => {
        switch (performPointIndex) {
            case 0:
                points[1].value = performPoint.value;
                break;
            case 1:
                points[0].value = performPoint.value;
                points[2].timestamp = points[3].timestamp = performPoint.timestamp;
                points[2].dataIndex = points[3].dataIndex = performPoint.dataIndex;
                break;
            case 2:
                points[1].timestamp = points[3].timestamp = performPoint.timestamp;
                points[1].dataIndex = points[3].dataIndex = performPoint.dataIndex;
                break;
            case 3:
                points[1].timestamp = points[2].timestamp = performPoint.timestamp;
                points[1].dataIndex = points[2].dataIndex = performPoint.dataIndex;
                break;
        }
    }
};

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
const overlays$1 = {};
const extensions = [
    // Base overlays
    fibonacciLine, horizontalRayLine, horizontalSegment, horizontalStraightLine,
    parallelStraightLine, priceChannelLine, priceLine, rayLine, segment,
    straightLine, verticalRayLine, verticalSegment, verticalStraightLine,
    simpleAnnotation, simpleTag,
    // Pro overlays
    arrow$1, circle$1, rect$1, triangle$1, parallelogram$1,
    fibonacciCircle$1, fibonacciSegment$1, fibonacciExtension$1,
    fibonacciSpiral$1, fibonacciSpeedResistanceFan$1, fibonacciDiagonal$1,
    gannBox$1, threeWaves$1, fiveWaves$1, eightWaves$1, anyWaves$1,
    abcd$1, xabcd$1, elliotTripleComboWaves$1, headAndShoulders$1,
    measure$1, crossLine$1, flatTopBottom, disJointChannel$1,
    arcOverlay, tradingPlan$1
];
extensions.forEach((template) => {
    overlays$1[template.name] = OverlayImp.extend(template);
});
function registerOverlay(template) {
    overlays$1[template.name] = OverlayImp.extend(template);
}
function getOverlayInnerClass(name) {
    return overlays$1[name] ?? null;
}
function getOverlayClass(name) {
    return overlays$1[name] ?? null;
}
function getSupportedOverlays() {
    return Object.keys(overlays$1);
}

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
const light = {
    grid: {
        horizontal: {
            color: '#EDEDED'
        },
        vertical: {
            color: '#EDEDED'
        }
    },
    candle: {
        priceMark: {
            high: {
                color: '#76808F'
            },
            low: {
                color: '#76808F'
            }
        },
        tooltip: {
            rect: {
                color: '#FEFEFE',
                borderColor: '#F2F3F5'
            },
            title: {
                color: '#76808F'
            },
            legend: {
                color: '#76808F'
            }
        }
    },
    indicator: {
        tooltip: {
            title: {
                color: '#76808F'
            },
            legend: {
                color: '#76808F'
            }
        }
    },
    xAxis: {
        axisLine: {
            color: '#DDDDDD'
        },
        tickText: {
            color: '#76808F'
        },
        tickLine: {
            color: '#DDDDDD'
        }
    },
    yAxis: {
        axisLine: {
            color: '#DDDDDD'
        },
        tickText: {
            color: '#76808F'
        },
        tickLine: {
            color: '#DDDDDD'
        }
    },
    separator: {
        color: '#DDDDDD'
    },
    crosshair: {
        horizontal: {
            line: {
                color: '#76808F'
            },
            text: {
                borderColor: '#686D76',
                backgroundColor: '#686D76'
            }
        },
        vertical: {
            line: {
                color: '#76808F'
            },
            text: {
                borderColor: '#686D76',
                backgroundColor: '#686D76'
            }
        }
    }
};

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
const dark = {
    grid: {
        horizontal: {
            color: '#292929'
        },
        vertical: {
            color: '#292929'
        }
    },
    candle: {
        priceMark: {
            high: {
                color: '#929AA5'
            },
            low: {
                color: '#929AA5'
            }
        },
        tooltip: {
            rect: {
                color: 'rgba(10, 10, 10, .6)',
                borderColor: 'rgba(10, 10, 10, .6)'
            },
            title: {
                color: '#929AA5'
            },
            legend: {
                color: '#929AA5'
            }
        }
    },
    indicator: {
        tooltip: {
            title: {
                color: '#929AA5'
            },
            legend: {
                color: '#929AA5'
            }
        }
    },
    xAxis: {
        axisLine: {
            color: '#333333'
        },
        tickText: {
            color: '#929AA5'
        },
        tickLine: {
            color: '#333333'
        }
    },
    yAxis: {
        axisLine: {
            color: '#333333'
        },
        tickText: {
            color: '#929AA5'
        },
        tickLine: {
            color: '#333333'
        }
    },
    separator: {
        color: '#333333'
    },
    crosshair: {
        horizontal: {
            line: {
                color: '#929AA5'
            },
            text: {
                borderColor: '#373a40',
                backgroundColor: '#373a40'
            }
        },
        vertical: {
            line: {
                color: '#929AA5'
            },
            text: {
                borderColor: '#373a40',
                backgroundColor: '#373a40'
            }
        }
    }
};

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
const styles = {
    light,
    dark
};
function registerStyles(name, ss) {
    styles[name] = ss;
}
function getStyles(name) {
    return styles[name] ?? null;
}

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
function getDefaultAxisRange() {
    return {
        from: 0,
        to: 0,
        range: 0,
        realFrom: 0,
        realTo: 0,
        realRange: 0,
        displayFrom: 0,
        displayTo: 0,
        displayRange: 0
    };
}
class AxisImp {
    name;
    scrollZoomEnabled = true;
    createTicks;
    _parent;
    _range = getDefaultAxisRange();
    _prevRange = getDefaultAxisRange();
    _ticks = [];
    _autoCalcTickFlag = true;
    constructor(parent) {
        this._parent = parent;
    }
    getParent() { return this._parent; }
    buildTicks(force) {
        if (this._autoCalcTickFlag) {
            this._range = this.createRangeImp();
        }
        if (this._prevRange.from !== this._range.from || this._prevRange.to !== this._range.to || force) {
            this._prevRange = this._range;
            this._ticks = this.createTicksImp();
            return true;
        }
        return false;
    }
    getTicks() {
        return this._ticks;
    }
    setRange(range) {
        this._autoCalcTickFlag = false;
        this._range = range;
    }
    getRange() { return this._range; }
    setAutoCalcTickFlag(flag) {
        this._autoCalcTickFlag = flag;
    }
    getAutoCalcTickFlag() { return this._autoCalcTickFlag; }
}

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
const PeriodTypeXAxisFormat = {
    second: 'HH:mm:ss',
    minute: 'HH:mm',
    hour: 'MM-DD HH:mm',
    day: 'YYYY-MM-DD',
    week: 'YYYY-MM-DD',
    month: 'YYYY-MM',
    year: 'YYYY'
};
const PeriodTypeCrosshairTooltipFormat = {
    second: 'HH:mm:ss',
    minute: 'YYYY-MM-DD HH:mm',
    hour: 'YYYY-MM-DD HH:mm',
    day: 'YYYY-MM-DD',
    week: 'YYYY-MM-DD',
    month: 'YYYY-MM',
    year: 'YYYY'
};

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
class XAxisImp extends AxisImp {
    constructor(parent, xAxis) {
        super(parent);
        this.override(xAxis);
    }
    override(xAxis) {
        const { name, scrollZoomEnabled, createTicks } = xAxis;
        if (!isString(this.name)) {
            this.name = name;
        }
        this.scrollZoomEnabled = scrollZoomEnabled ?? this.scrollZoomEnabled;
        this.createTicks = createTicks ?? this.createTicks;
    }
    createRangeImp() {
        const chartStore = this.getParent().getChart().getChartStore();
        const visibleDataRange = chartStore.getVisibleRange();
        const { realFrom, realTo } = visibleDataRange;
        const af = realFrom;
        const at = realTo;
        const diff = realTo - realFrom + 1;
        const range = {
            from: af,
            to: at,
            range: diff,
            realFrom: af,
            realTo: at,
            realRange: diff,
            displayFrom: af,
            displayTo: at,
            displayRange: diff
        };
        return range;
    }
    createTicksImp() {
        const { realFrom, realTo, from } = this.getRange();
        const chartStore = this.getParent().getChart().getChartStore();
        const formatDate = chartStore.getInnerFormatter().formatDate;
        const period = chartStore.getPeriod();
        const ticks = [];
        const barSpace = chartStore.getBarSpace().bar;
        const textStyles = chartStore.getStyles().xAxis.tickText;
        const tickTextWidth = Math.max(calcTextWidth('YYYY-MM-DD HH:mm:ss', textStyles.size, textStyles.weight, textStyles.family), this.getBounding().width / 8);
        let tickBetweenBarCount = Math.ceil(tickTextWidth / barSpace);
        if (tickBetweenBarCount % 2 !== 0) {
            tickBetweenBarCount += 1;
        }
        const startDataIndex = Math.max(0, Math.floor(realFrom / tickBetweenBarCount) * tickBetweenBarCount);
        for (let i = startDataIndex; i < realTo; i += tickBetweenBarCount) {
            if (i >= from) {
                const timestamp = chartStore.dataIndexToTimestamp(i);
                if (isNumber(timestamp)) {
                    ticks.push({
                        coord: this.convertToPixel(i),
                        value: timestamp,
                        text: formatDate(timestamp, PeriodTypeXAxisFormat[period?.type ?? 'day'], 'xAxis')
                    });
                }
            }
        }
        if (isFunction(this.createTicks)) {
            return this.createTicks({
                range: this.getRange(),
                bounding: this.getBounding(),
                defaultTicks: ticks
            });
        }
        return ticks;
    }
    getAutoSize() {
        const styles = this.getParent().getChart().getStyles();
        const xAxisStyles = styles.xAxis;
        const height = xAxisStyles.size;
        if (height !== 'auto') {
            return height;
        }
        const crosshairStyles = styles.crosshair;
        let xAxisHeight = 0;
        if (xAxisStyles.show) {
            if (xAxisStyles.axisLine.show) {
                xAxisHeight += xAxisStyles.axisLine.size;
            }
            if (xAxisStyles.tickLine.show) {
                xAxisHeight += xAxisStyles.tickLine.length;
            }
            if (xAxisStyles.tickText.show) {
                xAxisHeight += (xAxisStyles.tickText.marginStart + xAxisStyles.tickText.marginEnd + xAxisStyles.tickText.size);
            }
        }
        let crosshairVerticalTextHeight = 0;
        if (crosshairStyles.show &&
            crosshairStyles.vertical.show &&
            crosshairStyles.vertical.text.show) {
            crosshairVerticalTextHeight += (crosshairStyles.vertical.text.paddingTop +
                crosshairStyles.vertical.text.paddingBottom +
                crosshairStyles.vertical.text.borderSize * 2 +
                crosshairStyles.vertical.text.size);
        }
        return Math.max(xAxisHeight, crosshairVerticalTextHeight);
    }
    getBounding() {
        return this.getParent().getMainWidget().getBounding();
    }
    convertTimestampFromPixel(pixel) {
        const chartStore = this.getParent().getChart().getChartStore();
        const dataIndex = chartStore.coordinateToDataIndex(pixel);
        return chartStore.dataIndexToTimestamp(dataIndex);
    }
    convertTimestampToPixel(timestamp) {
        const chartStore = this.getParent().getChart().getChartStore();
        const dataIndex = chartStore.timestampToDataIndex(timestamp);
        return chartStore.dataIndexToCoordinate(dataIndex);
    }
    convertFromPixel(pixel) {
        return this.getParent().getChart().getChartStore().coordinateToDataIndex(pixel);
    }
    convertToPixel(value) {
        return this.getParent().getChart().getChartStore().dataIndexToCoordinate(value);
    }
    static extend(template) {
        class Custom extends XAxisImp {
            constructor(parent) {
                super(parent, template);
            }
        }
        return Custom;
    }
}

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
const normal$1 = {
    name: 'normal'
};

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
const xAxises = {
    normal: XAxisImp.extend(normal$1)
};
function registerXAxis(axis) {
    xAxises[axis.name] = XAxisImp.extend(axis);
}
function getXAxisClass(name) {
    return xAxises[name] ?? xAxises.normal;
}

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
const PANE_MIN_HEIGHT = 30;
const PANE_DEFAULT_HEIGHT = 100;
const PaneIdConstants = {
    CANDLE: 'candle_pane',
    INDICATOR: 'indicator_pane_',
    X_AXIS: 'x_axis_pane'
};

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
const TICK_COUNT = 8;
class YAxisImp extends AxisImp {
    reverse = false;
    inside = false;
    position = 'right';
    gap = {
        top: 0.2,
        bottom: 0.1
    };
    createRange = params => params.defaultRange;
    minSpan = precision => index10(-precision);
    valueToRealValue = value => value;
    realValueToDisplayValue = value => value;
    displayValueToRealValue = value => value;
    realValueToValue = value => value;
    displayValueToText = (value, precision) => formatPrecision(value, precision);
    constructor(parent, yAxis) {
        super(parent);
        this.override(yAxis);
    }
    override(yAxis) {
        const { name, gap, ...others } = yAxis;
        if (!isString(this.name)) {
            this.name = name;
        }
        merge(this.gap, gap);
        merge(this, others);
    }
    createRangeImp() {
        const parent = this.getParent();
        const chart = parent.getChart();
        const chartStore = chart.getChartStore();
        const paneId = parent.getId();
        let min = Number.MAX_SAFE_INTEGER;
        let max = Number.MIN_SAFE_INTEGER;
        let shouldOhlc = false;
        let specifyMin = Number.MAX_SAFE_INTEGER;
        let specifyMax = Number.MIN_SAFE_INTEGER;
        let indicatorPrecision = Number.MAX_SAFE_INTEGER;
        const indicators = chartStore.getIndicatorsByPaneId(paneId);
        indicators.forEach(indicator => {
            shouldOhlc ||= indicator.shouldOhlc;
            indicatorPrecision = Math.min(indicatorPrecision, indicator.precision);
            if (isNumber(indicator.minValue)) {
                specifyMin = Math.min(specifyMin, indicator.minValue);
            }
            if (isNumber(indicator.maxValue)) {
                specifyMax = Math.max(specifyMax, indicator.maxValue);
            }
        });
        let precision = 4;
        const inCandle = this.isInCandle();
        if (inCandle) {
            const pricePrecision = chartStore.getSymbol()?.pricePrecision ?? SymbolDefaultPrecisionConstants.PRICE;
            if (indicatorPrecision !== Number.MAX_SAFE_INTEGER) {
                precision = Math.min(indicatorPrecision, pricePrecision);
            }
            else {
                precision = pricePrecision;
            }
        }
        else {
            if (indicatorPrecision !== Number.MAX_SAFE_INTEGER) {
                precision = indicatorPrecision;
            }
        }
        const visibleRangeDataList = chartStore.getVisibleRangeDataList();
        const candleStyles = chart.getStyles().candle;
        const isArea = candleStyles.type === 'area';
        const areaValueKey = candleStyles.area.value;
        const shouldCompareHighLow = (inCandle && !isArea) || (!inCandle && shouldOhlc);
        visibleRangeDataList.forEach((visibleData) => {
            const dataIndex = visibleData.dataIndex;
            const data = visibleData.data.current;
            if (isValid(data)) {
                if (shouldCompareHighLow) {
                    min = Math.min(min, data.low);
                    max = Math.max(max, data.high);
                }
                if (inCandle && isArea) {
                    const value = data[areaValueKey];
                    if (isNumber(value)) {
                        min = Math.min(min, value);
                        max = Math.max(max, value);
                    }
                }
            }
            indicators.forEach(({ result, figures }) => {
                const data = result[dataIndex] ?? {};
                figures.forEach(figure => {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- ignore
                    const value = data[figure.key];
                    if (isNumber(value)) {
                        min = Math.min(min, value);
                        max = Math.max(max, value);
                    }
                });
            });
        });
        if (min !== Number.MAX_SAFE_INTEGER && max !== Number.MIN_SAFE_INTEGER) {
            min = Math.min(specifyMin, min);
            max = Math.max(specifyMax, max);
        }
        else {
            min = 0;
            max = 10;
        }
        const defaultDiff = max - min;
        const defaultRange = {
            from: min,
            to: max,
            range: defaultDiff,
            realFrom: min,
            realTo: max,
            realRange: defaultDiff,
            displayFrom: min,
            displayTo: max,
            displayRange: defaultDiff
        };
        const range = this.createRange({
            chart,
            paneId,
            defaultRange
        });
        let realFrom = range.realFrom;
        let realTo = range.realTo;
        let realRange = range.realRange;
        const minSpan = this.minSpan(precision);
        if (realFrom === realTo || realRange < minSpan) {
            const minCheck = specifyMin === realFrom;
            const maxCheck = specifyMax === realTo;
            const halfTickCount = TICK_COUNT / 2;
            realFrom = minCheck ? realFrom : (maxCheck ? realFrom - TICK_COUNT * minSpan : realFrom - halfTickCount * minSpan);
            realTo = maxCheck ? realTo : (minCheck ? realTo + TICK_COUNT * minSpan : realTo + halfTickCount * minSpan);
        }
        const height = this.getBounding().height;
        const { top, bottom } = this.gap;
        let topRate = top;
        if (topRate >= 1) {
            topRate = topRate / height;
        }
        let bottomRate = bottom;
        if (bottomRate >= 1) {
            bottomRate = bottomRate / height;
        }
        realRange = realTo - realFrom;
        realFrom = realFrom - realRange * bottomRate;
        realTo = realTo + realRange * topRate;
        const from = this.realValueToValue(realFrom, { range });
        const to = this.realValueToValue(realTo, { range });
        const displayFrom = this.realValueToDisplayValue(realFrom, { range });
        const displayTo = this.realValueToDisplayValue(realTo, { range });
        return {
            from,
            to,
            range: to - from,
            realFrom,
            realTo,
            realRange: realTo - realFrom,
            displayFrom,
            displayTo,
            displayRange: displayTo - displayFrom
        };
    }
    /**
     * 是否是蜡烛图轴
     * @return {boolean}
     */
    isInCandle() {
        return this.getParent().getId() === PaneIdConstants.CANDLE;
    }
    /**
     * 是否从y轴0开始
     * @return {boolean}
     */
    isFromZero() {
        return ((this.position === 'left' && this.inside) ||
            (this.position === 'right' && !this.inside));
    }
    createTicksImp() {
        const range = this.getRange();
        const { displayFrom, displayTo, displayRange } = range;
        const ticks = [];
        if (displayRange >= 0) {
            const interval = nice(displayRange / TICK_COUNT);
            const precision = getPrecision(interval);
            const first = round(Math.ceil(displayFrom / interval) * interval, precision);
            const last = round(Math.floor(displayTo / interval) * interval, precision);
            let n = 0;
            let f = first;
            if (interval !== 0) {
                while (f <= last) {
                    const v = f.toFixed(precision);
                    ticks[n] = { text: v, coord: 0, value: v };
                    ++n;
                    f += interval;
                }
            }
        }
        const pane = this.getParent();
        const height = pane.getYAxisWidget()?.getBounding().height ?? 0;
        const chartStore = pane.getChart().getChartStore();
        const optimalTicks = [];
        const indicators = chartStore.getIndicatorsByPaneId(pane.getId());
        const styles = chartStore.getStyles();
        let precision = 0;
        let shouldFormatBigNumber = false;
        if (this.isInCandle()) {
            precision = chartStore.getSymbol()?.pricePrecision ?? SymbolDefaultPrecisionConstants.PRICE;
        }
        else {
            indicators.forEach(indicator => {
                precision = Math.max(precision, indicator.precision);
                shouldFormatBigNumber ||= indicator.shouldFormatBigNumber;
            });
        }
        const formatter = chartStore.getInnerFormatter();
        const thousandsSeparator = chartStore.getThousandsSeparator();
        const decimalFold = chartStore.getDecimalFold();
        const textHeight = styles.xAxis.tickText.size;
        let validY = NaN;
        ticks.forEach(({ value }) => {
            let v = this.displayValueToText(+value, precision);
            const y = this.convertToPixel(this.realValueToValue(this.displayValueToRealValue(+value, { range }), { range }));
            if (shouldFormatBigNumber) {
                v = formatter.formatBigNumber(value);
            }
            v = decimalFold.format(thousandsSeparator.format(v));
            const validYNumber = isNumber(validY);
            if (y > textHeight &&
                y < height - textHeight &&
                ((validYNumber && (Math.abs(validY - y) > textHeight * 2)) || !validYNumber)) {
                optimalTicks.push({ text: v, coord: y, value });
                validY = y;
            }
        });
        if (isFunction(this.createTicks)) {
            return this.createTicks({
                range: this.getRange(),
                bounding: this.getBounding(),
                defaultTicks: optimalTicks
            });
        }
        return optimalTicks;
    }
    getAutoSize() {
        const pane = this.getParent();
        const chart = pane.getChart();
        const chartStore = chart.getChartStore();
        const styles = chartStore.getStyles();
        const yAxisStyles = styles.yAxis;
        const width = yAxisStyles.size;
        if (width !== 'auto') {
            return width;
        }
        let yAxisWidth = 0;
        if (yAxisStyles.show) {
            if (yAxisStyles.axisLine.show) {
                yAxisWidth += yAxisStyles.axisLine.size;
            }
            if (yAxisStyles.tickLine.show) {
                yAxisWidth += yAxisStyles.tickLine.length;
            }
            if (yAxisStyles.tickText.show) {
                let textWidth = 0;
                this.getTicks().forEach(tick => {
                    textWidth = Math.max(textWidth, calcTextWidth(tick.text, yAxisStyles.tickText.size, yAxisStyles.tickText.weight, yAxisStyles.tickText.family));
                });
                yAxisWidth += (yAxisStyles.tickText.marginStart + yAxisStyles.tickText.marginEnd + textWidth);
            }
        }
        const priceMarkStyles = styles.candle.priceMark;
        const lastPriceMarkTextVisible = priceMarkStyles.show && priceMarkStyles.last.show && priceMarkStyles.last.text.show;
        let lastPriceTextWidth = 0;
        const crosshairStyles = styles.crosshair;
        const crosshairHorizontalTextVisible = crosshairStyles.show && crosshairStyles.horizontal.show && crosshairStyles.horizontal.text.show;
        let crosshairHorizontalTextWidth = 0;
        if (lastPriceMarkTextVisible || crosshairHorizontalTextVisible) {
            const pricePrecision = chartStore.getSymbol()?.pricePrecision ?? SymbolDefaultPrecisionConstants.PRICE;
            const max = this.getRange().displayTo;
            if (lastPriceMarkTextVisible) {
                const dataList = chartStore.getDataList();
                const data = dataList[dataList.length - 1];
                if (isValid(data)) {
                    const { paddingLeft, paddingRight, size, family, weight } = priceMarkStyles.last.text;
                    lastPriceTextWidth = paddingLeft + calcTextWidth(formatPrecision(data.close, pricePrecision), size, weight, family) + paddingRight;
                    const formatExtendText = chartStore.getInnerFormatter().formatExtendText;
                    priceMarkStyles.last.extendTexts.forEach((item, index) => {
                        const text = formatExtendText({ type: 'last_price', data, index });
                        if (text.length > 0 && item.show) {
                            lastPriceTextWidth = Math.max(lastPriceTextWidth, item.paddingLeft + calcTextWidth(text, item.size, item.weight, item.family) + item.paddingRight);
                        }
                    });
                }
            }
            if (crosshairHorizontalTextVisible) {
                const indicators = chartStore.getIndicatorsByPaneId(pane.getId());
                let indicatorPrecision = 0;
                let shouldFormatBigNumber = false;
                indicators.forEach(indicator => {
                    indicatorPrecision = Math.max(indicator.precision, indicatorPrecision);
                    shouldFormatBigNumber ||= indicator.shouldFormatBigNumber;
                });
                let precision = 2;
                if (this.isInCandle()) {
                    const lastValueMarkStyles = styles.indicator.lastValueMark;
                    if (lastValueMarkStyles.show && lastValueMarkStyles.text.show) {
                        precision = Math.max(indicatorPrecision, pricePrecision);
                    }
                    else {
                        precision = pricePrecision;
                    }
                }
                else {
                    precision = indicatorPrecision;
                }
                let valueText = formatPrecision(max, precision);
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ignore
                if (shouldFormatBigNumber) {
                    valueText = chartStore.getInnerFormatter().formatBigNumber(valueText);
                }
                valueText = chartStore.getDecimalFold().format(valueText);
                crosshairHorizontalTextWidth += (crosshairStyles.horizontal.text.paddingLeft +
                    crosshairStyles.horizontal.text.paddingRight +
                    crosshairStyles.horizontal.text.borderSize * 2 +
                    calcTextWidth(valueText, crosshairStyles.horizontal.text.size, crosshairStyles.horizontal.text.weight, crosshairStyles.horizontal.text.family));
            }
        }
        return Math.max(yAxisWidth, lastPriceTextWidth, crosshairHorizontalTextWidth);
    }
    getBounding() {
        return this.getParent().getYAxisWidget().getBounding();
    }
    convertFromPixel(pixel) {
        const height = this.getBounding().height;
        const range = this.getRange();
        const { realFrom, realRange } = range;
        const rate = this.reverse ? pixel / height : 1 - pixel / height;
        const realValue = rate * realRange + realFrom;
        return this.realValueToValue(realValue, { range });
    }
    convertToPixel(value) {
        const range = this.getRange();
        const realValue = this.valueToRealValue(value, { range });
        const height = this.getParent().getYAxisWidget()?.getBounding().height ?? 0;
        const { realFrom, realRange } = range;
        const rate = (realValue - realFrom) / realRange;
        return this.reverse ? Math.round(rate * height) : Math.round((1 - rate) * height);
    }
    convertToNicePixel(value) {
        const height = this.getParent().getYAxisWidget()?.getBounding().height ?? 0;
        const pixel = this.convertToPixel(value);
        return Math.round(Math.max(height * 0.05, Math.min(pixel, height * 0.98)));
    }
    static extend(template) {
        class Custom extends YAxisImp {
            constructor(parent) {
                super(parent, template);
            }
        }
        return Custom;
    }
}

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
const normal = {
    name: 'normal'
};

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
const percentage = {
    name: 'percentage',
    minSpan: () => Math.pow(10, -2),
    displayValueToText: value => `${formatPrecision(value, 2)}%`,
    valueToRealValue: (value, { range }) => (value - range.from) / range.range * range.realRange + range.realFrom,
    realValueToValue: (value, { range }) => (value - range.realFrom) / range.realRange * range.range + range.from,
    createRange: ({ chart, defaultRange }) => {
        const kLineDataList = chart.getDataList();
        const visibleRange = chart.getVisibleRange();
        const kLineData = kLineDataList[visibleRange.from];
        if (isValid(kLineData)) {
            const { from, to, range } = defaultRange;
            const realFrom = (defaultRange.from - kLineData.close) / kLineData.close * 100;
            const realTo = (defaultRange.to - kLineData.close) / kLineData.close * 100;
            const realRange = realTo - realFrom;
            return {
                from,
                to,
                range,
                realFrom,
                realTo,
                realRange,
                displayFrom: realFrom,
                displayTo: realTo,
                displayRange: realRange
            };
        }
        return defaultRange;
    }
};

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
const logarithm = {
    name: 'logarithm',
    minSpan: (precision) => 0.05 * index10(-precision),
    valueToRealValue: (value) => value < 0 ? -log10(Math.abs(value)) : log10(value),
    realValueToDisplayValue: (value) => value < 0 ? -index10(Math.abs(value)) : index10(value),
    displayValueToRealValue: (value) => value < 0 ? -log10(Math.abs(value)) : log10(value),
    realValueToValue: (value) => value < 0 ? -index10(Math.abs(value)) : index10(value),
    createRange: ({ defaultRange }) => {
        const { from, to, range } = defaultRange;
        const realFrom = from < 0 ? -log10(Math.abs(from)) : log10(from);
        const realTo = to < 0 ? -log10(Math.abs(to)) : log10(to);
        return {
            from,
            to,
            range,
            realFrom,
            realTo,
            realRange: realTo - realFrom,
            displayFrom: from,
            displayTo: to,
            displayRange: range
        };
    }
};

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
const yAxises = {
    normal: YAxisImp.extend(normal),
    percentage: YAxisImp.extend(percentage),
    logarithm: YAxisImp.extend(logarithm)
};
function registerYAxis(axis) {
    yAxises[axis.name] = YAxisImp.extend(axis);
}
function getYAxisClass(name) {
    return yAxises[name] ?? yAxises.normal;
}

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
// @ts-ignore
const DEV = process.env.NODE_ENV === 'development';
function log(templateText, tagStyle, messageStyle, api, invalidParam, append) {
    if (DEV) {
        const apiStr = api !== '' ? `Call api \`${api}\`${invalidParam !== '' || append !== '' ? ', ' : '.'}` : '';
        const invalidParamStr = invalidParam !== '' ? `invalid parameter \`${invalidParam}\`${append !== '' ? ', ' : '.'}` : '';
        const appendStr = append !== '' ? append : '';
        console.log(templateText, tagStyle, messageStyle, apiStr, invalidParamStr, appendStr);
    }
}
function logWarn(api, invalidParam, append) {
    log('%c😑 klinecharts warning%c %s%s%s', 'padding:3px 4px;border-radius:2px;color:#ffffff;background-color:#FF9600', 'color:#FF9600', api, invalidParam, append ?? '');
}
function logError(api, invalidParam, append) {
    log('%c😟 klinecharts error%c %s%s%s', 'padding:3px 4px;border-radius:2px;color:#ffffff;background-color:#F92855;', 'color:#F92855;', api, invalidParam, append);
}
function logTag() {
    log('%c❤️ Welcome to klinecharts. Version is 10.0.0-beta1', 'border-radius:4px;border:dashed 1px #1677FF;line-height:70px;padding:0 20px;margin:16px 0;font-size:14px;color:#1677FF;', '', '', '', '');
}

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
function createDefaultBounding(bounding) {
    const defaultBounding = {
        width: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };
    if (isValid(bounding)) {
        merge(defaultBounding, bounding);
    }
    return defaultBounding;
}

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
const DEFAULT_REQUEST_ID = -1;
function requestAnimationFrame(fn) {
    if (isFunction(window.requestAnimationFrame)) {
        return window.requestAnimationFrame(fn);
    }
    return window.setTimeout(fn, 20);
}
function cancelAnimationFrame(id) {
    if (isFunction(window.cancelAnimationFrame)) {
        window.cancelAnimationFrame(id);
    }
    else {
        window.clearTimeout(id);
    }
}

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
class Animation {
    _options = { duration: 500, iterationCount: 1 };
    _doFrameCallback;
    _currentIterationCount = 0;
    _running = false;
    _time = 0;
    constructor(options) {
        merge(this._options, options);
    }
    _loop() {
        this._running = true;
        const step = () => {
            if (this._running) {
                const diffTime = new Date().getTime() - this._time;
                if (diffTime < this._options.duration) {
                    this._doFrameCallback?.(diffTime);
                    requestAnimationFrame(step);
                }
                else {
                    this.stop();
                    this._currentIterationCount++;
                    if (this._currentIterationCount < this._options.iterationCount) {
                        this.start();
                    }
                }
            }
        };
        requestAnimationFrame(step);
    }
    doFrame(callback) {
        this._doFrameCallback = callback;
        return this;
    }
    setDuration(duration) {
        this._options.duration = duration;
        return this;
    }
    setIterationCount(iterationCount) {
        this._options.iterationCount = iterationCount;
        return this;
    }
    start() {
        if (!this._running) {
            this._time = new Date().getTime();
            this._loop();
        }
    }
    stop() {
        if (this._running) {
            this._doFrameCallback?.(this._options.duration);
        }
        this._running = false;
    }
}

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
let baseId = 1;
let prevIdTimestamp = new Date().getTime();
function createId(prefix) {
    const timestamp = new Date().getTime();
    if (timestamp === prevIdTimestamp) {
        ++baseId;
    }
    else {
        baseId = 1;
    }
    prevIdTimestamp = timestamp;
    return `${prefix ?? ''}${timestamp}_${baseId}`;
}

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
/**
 * Create dom
 * @param tagName
 * @param styles
 * @return {*}
 */
function createDom(tagName, styles) {
    const dom = document.createElement(tagName);
    const s = styles ?? {};
    // eslint-disable-next-line guard-for-in -- ignore
    for (const key in s) {
        (dom.style)[key] = s[key] ?? '';
    }
    return dom;
}

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
function getDefaultVisibleRange() {
    return { from: 0, to: 0, realFrom: 0, realTo: 0 };
}

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
class TaskScheduler {
    _holdingTasks = null;
    _running = false;
    _callback;
    constructor(callback) {
        this._callback = callback;
    }
    add(tasks) {
        if (!this._running) {
            void this._runTask(tasks);
        }
        else {
            if (isValid(this._holdingTasks)) {
                this._holdingTasks = {
                    ...this._holdingTasks,
                    ...tasks
                };
            }
            else {
                this._holdingTasks = tasks;
            }
        }
    }
    async _runTask(tasks) {
        this._running = true;
        try {
            await Promise.all(Object.values(tasks));
        }
        finally {
            this._running = false;
            this._callback?.();
            if (isValid(this._holdingTasks)) {
                const next = this._holdingTasks;
                void this._runTask(next);
                this._holdingTasks = null;
            }
        }
    }
    clear() {
        this._holdingTasks = null;
    }
}

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
class Action {
    _callbacks = [];
    subscribe(callback) {
        const index = this._callbacks.indexOf(callback);
        if (index < 0) {
            this._callbacks.push(callback);
        }
    }
    unsubscribe(callback) {
        if (isFunction(callback)) {
            const index = this._callbacks.indexOf(callback);
            if (index > -1) {
                this._callbacks.splice(index, 1);
            }
        }
        else {
            this._callbacks = [];
        }
    }
    execute(data) {
        this._callbacks.forEach(callback => {
            callback(data);
        });
    }
    isEmpty() {
        return this._callbacks.length === 0;
    }
}

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
const BarSpaceLimitConstants = {
    MIN: 1,
    MAX: 50
};
const DEFAULT_BAR_SPACE = 10;
const DEFAULT_OFFSET_RIGHT_DISTANCE = 80;
const BAR_GAP_RATIO = 0.2;
const SCALE_MULTIPLIER = 10;
class StoreImp {
    /**
     * Internal chart
     */
    _chart;
    /**
     * Styles
     */
    _styles = getDefaultStyles();
    /**
     * Custom api
     */
    _formatter = {
        formatDate: ({ dateTimeFormat, timestamp, template }) => formatTimestampByTemplate(dateTimeFormat, timestamp, template),
        formatBigNumber,
        formatExtendText: (_) => ''
    };
    /**
     * Inner formatter
     * @description Internal use only
     */
    _innerFormatter = {
        formatDate: (timestamp, template, type) => this._formatter.formatDate({ dateTimeFormat: this._dateTimeFormat, timestamp, template, type }),
        formatBigNumber: (value) => this._formatter.formatBigNumber(value),
        formatExtendText: (params) => this._formatter.formatExtendText(params)
    };
    /**
     * Locale
     */
    _locale = 'en-US';
    /**
     * Thousands separator
     */
    _thousandsSeparator = {
        sign: ',',
        format: (value) => formatThousands$1(value, this._thousandsSeparator.sign)
    };
    /**
     * Decimal fold
     */
    _decimalFold = {
        threshold: 3,
        format: (value) => formatFoldDecimal(value, this._decimalFold.threshold)
    };
    /**
     * Symbol
     */
    _symbol = null;
    /**
     * Period
     */
    _period = null;
    /**
     * Data source
     */
    _dataList = [];
    /**
     * Load more data callback
     */
    _dataLoader = null;
    /**
     * Is loading data flag
     */
    _loading = false;
    /**
    * Whether there are forward and backward more flag
     */
    _dataLoadMore = { forward: false, backward: false };
    /**
       * Time format
       */
    _dateTimeFormat;
    /**
     * Scale enabled flag
     */
    _zoomEnabled = true;
    /**
     * Zoom anchor point flag
     */
    _zoomAnchor = {
        main: 'cursor',
        xAxis: 'cursor'
    };
    /**
     * Scroll enabled flag
     */
    _scrollEnabled = true;
    _yScrolling = true;
    /**
     * Total space of drawing area
     */
    _totalBarSpace = 0;
    /**
     * Space occupied by a single piece of data
     */
    _barSpace = DEFAULT_BAR_SPACE;
    /**
     * The space of the draw bar
     */
    _gapBarSpace;
    /**
     * Distance from the last data to the right of the drawing area
     */
    _offsetRightDistance = DEFAULT_OFFSET_RIGHT_DISTANCE;
    /**
     * The number of bar calculated from the distance of the last data to the right of the drawing area
     */
    _lastBarRightSideDiffBarCount;
    /**
     * The number of bar to the right of the drawing area from the last data when scrolling starts
     */
    _startLastBarRightSideDiffBarCount = 0;
    /**
     * Scroll limit role
     */
    _scrollLimitRole = 'bar_count';
    /**
     * Scroll to the leftmost and rightmost visible bar
     */
    _minVisibleBarCount = { left: 2, right: 2 };
    /**
     * Scroll to the leftmost and rightmost distance
     */
    _maxOffsetDistance = { left: 50, right: 50 };
    /**
     * Start and end points of visible area data index
     */
    _visibleRange = getDefaultVisibleRange();
    /**
     * Visible data array
     */
    _visibleRangeDataList = [];
    /**
     * Visible highest lowest price data
     */
    _visibleRangeHighLowPrice = [
        { x: 0, price: Number.MIN_SAFE_INTEGER },
        { x: 0, price: Number.MAX_SAFE_INTEGER }
    ];
    /**
     * Crosshair info
     */
    _crosshair = {};
    /**
     * Actions
     */
    _actions = new Map();
    /**
     * Indicator
     */
    _indicators = new Map();
    /**
     * Task scheduler
     */
    _taskScheduler;
    /**
     * Overlay
     */
    _overlays = new Map();
    /**
     * Overlay information in painting
     */
    _progressOverlayInfo = null;
    _lastPriceMarkExtendTextUpdateTimers = [];
    /**
     * Overlay information by the mouse pressed
     */
    _pressedOverlayInfo = {
        paneId: '',
        overlay: null,
        figureType: 'none',
        figureIndex: -1,
        figure: null
    };
    /**
     * Overlay information by hover
     */
    _hoverOverlayInfo = {
        paneId: '',
        overlay: null,
        figureType: 'none',
        figureIndex: -1,
        figure: null
    };
    /**
     * Overlay information by the mouse click
     */
    _clickOverlayInfo = {
        paneId: '',
        overlay: null,
        figureType: 'none',
        figureIndex: -1,
        figure: null
    };
    constructor(chart, options) {
        this._chart = chart;
        this._calcOptimalBarSpace();
        this._lastBarRightSideDiffBarCount = this._offsetRightDistance / this._barSpace;
        const { styles, locale, timezone, formatter, thousandsSeparator, decimalFold, zoomAnchor } = options ?? {};
        if (isValid(styles)) {
            this.setStyles(styles);
        }
        if (isString(locale)) {
            this.setLocale(locale);
        }
        this.setTimezone(timezone ?? '');
        if (isValid(formatter)) {
            this.setFormatter(formatter);
        }
        if (isValid(thousandsSeparator)) {
            this.setThousandsSeparator(thousandsSeparator);
        }
        if (isValid(decimalFold)) {
            this.setDecimalFold(decimalFold);
        }
        if (isValid(zoomAnchor)) {
            this.setZoomAnchor(zoomAnchor);
        }
        this._taskScheduler = new TaskScheduler(() => {
            this._chart.layout({
                measureWidth: true,
                update: true,
                buildYAxisTick: true
            });
        });
    }
    setStyles(value) {
        let styles = null;
        if (isString(value)) {
            styles = getStyles(value);
        }
        else {
            styles = value;
        }
        merge(this._styles, styles);
        // `candle.tooltip.custom` should override
        if (isArray(styles?.candle?.tooltip?.legend?.template)) {
            this._styles.candle.tooltip.legend.template = styles.candle.tooltip.legend.template;
        }
        if (isValid(styles?.candle?.priceMark?.last?.extendTexts)) {
            this._clearLastPriceMarkExtendTextUpdateTimer();
            const intervals = [];
            this._styles.candle.priceMark.last.extendTexts.forEach(item => {
                const updateInterval = item.updateInterval;
                if (item.show && updateInterval > 0 && !intervals.includes(updateInterval)) {
                    intervals.push(updateInterval);
                    const timer = setInterval(() => {
                        this._chart.updatePane(0 /* UpdateLevel.Main */, PaneIdConstants.CANDLE);
                    }, updateInterval);
                    this._lastPriceMarkExtendTextUpdateTimers.push(timer);
                }
            });
        }
    }
    getStyles() { return this._styles; }
    setFormatter(formatter) {
        merge(this._formatter, formatter);
    }
    getFormatter() { return this._formatter; }
    getInnerFormatter() {
        return this._innerFormatter;
    }
    setLocale(locale) { this._locale = locale; }
    getLocale() { return this._locale; }
    setTimezone(timezone) {
        if (!isValid(this._dateTimeFormat) ||
            (this.getTimezone() !== timezone)) {
            const options = {
                hour12: false,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            if (timezone.length > 0) {
                options.timeZone = timezone;
            }
            let dateTimeFormat = null;
            try {
                dateTimeFormat = new Intl.DateTimeFormat('en', options);
            }
            catch (e) {
                logWarn('', '', 'Timezone is error!!!');
            }
            if (dateTimeFormat !== null) {
                this._dateTimeFormat = dateTimeFormat;
            }
        }
    }
    getTimezone() { return this._dateTimeFormat.resolvedOptions().timeZone; }
    getDateTimeFormat() {
        return this._dateTimeFormat;
    }
    setThousandsSeparator(thousandsSeparator) {
        merge(this._thousandsSeparator, thousandsSeparator);
    }
    getThousandsSeparator() { return this._thousandsSeparator; }
    setDecimalFold(decimalFold) { merge(this._decimalFold, decimalFold); }
    getDecimalFold() { return this._decimalFold; }
    setSymbol(symbol) {
        this.resetData(() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- ignore
            // @ts-expect-error
            this._symbol = {
                pricePrecision: SymbolDefaultPrecisionConstants.PRICE,
                volumePrecision: SymbolDefaultPrecisionConstants.VOLUME,
                ...this._symbol,
                ...symbol
            };
            this._synchronizeIndicatorSeriesPrecision();
        });
    }
    getSymbol() {
        return this._symbol;
    }
    setPeriod(period) {
        this.resetData(() => {
            this._period = period;
        });
    }
    getPeriod() {
        return this._period;
    }
    getDataList() {
        return this._dataList;
    }
    getVisibleRangeDataList() {
        return this._visibleRangeDataList;
    }
    getVisibleRangeHighLowPrice() {
        return this._visibleRangeHighLowPrice;
    }
    _addData(data, type, more) {
        let success = false;
        let adjustFlag = false;
        let dataLengthChange = 0;
        if (isArray(data)) {
            const realMore = { backward: false, forward: false };
            if (isBoolean(more)) {
                realMore.backward = more;
                realMore.forward = more;
            }
            else {
                realMore.backward = more?.backward ?? false;
                realMore.forward = more?.forward ?? false;
            }
            dataLengthChange = data.length;
            switch (type) {
                case 'init': {
                    this._clearData();
                    this._dataList = data;
                    this._dataLoadMore.backward = realMore.backward;
                    this._dataLoadMore.forward = realMore.forward;
                    this.setOffsetRightDistance(this._offsetRightDistance);
                    adjustFlag = true;
                    break;
                }
                case 'backward': {
                    this._dataList = this._dataList.concat(data);
                    this._dataLoadMore.backward = realMore.backward;
                    this._lastBarRightSideDiffBarCount -= dataLengthChange;
                    adjustFlag = dataLengthChange > 0;
                    break;
                }
                case 'forward': {
                    this._dataList = data.concat(this._dataList);
                    this._dataLoadMore.forward = realMore.forward;
                    adjustFlag = dataLengthChange > 0;
                    break;
                }
            }
            success = true;
        }
        else {
            const dataCount = this._dataList.length;
            // Determine where individual data should be added
            const timestamp = data.timestamp;
            const lastDataTimestamp = formatValue(this._dataList[dataCount - 1], 'timestamp', 0);
            if (timestamp > lastDataTimestamp) {
                this._dataList.push(data);
                let lastBarRightSideDiffBarCount = this.getLastBarRightSideDiffBarCount();
                if (lastBarRightSideDiffBarCount < 0) {
                    this.setLastBarRightSideDiffBarCount(--lastBarRightSideDiffBarCount);
                }
                dataLengthChange = 1;
                success = true;
                adjustFlag = true;
            }
            else if (timestamp === lastDataTimestamp) {
                this._dataList[dataCount - 1] = data;
                success = true;
                adjustFlag = true;
            }
        }
        if (success && adjustFlag) {
            this._adjustVisibleRange();
            this.setCrosshair(this._crosshair, { notInvalidate: true });
            const filterIndicators = this.getIndicatorsByFilter({});
            if (filterIndicators.length > 0) {
                this._calcIndicator(filterIndicators);
            }
            else {
                this._chart.layout({
                    measureWidth: true,
                    update: true,
                    buildYAxisTick: true,
                    cacheYAxisWidth: type !== 'init'
                });
            }
        }
    }
    setDataLoader(dataLoader) {
        this.resetData(() => {
            this._dataLoader = dataLoader;
        });
    }
    _calcOptimalBarSpace() {
        const specialBarSpace = 4;
        const ratio = 1 - BAR_GAP_RATIO * Math.atan(Math.max(specialBarSpace, this._barSpace) - specialBarSpace) / (Math.PI * 0.5);
        let gapBarSpace = Math.min(Math.floor(this._barSpace * ratio), Math.floor(this._barSpace));
        if (gapBarSpace % 2 === 0 && gapBarSpace + 2 >= this._barSpace) {
            --gapBarSpace;
        }
        this._gapBarSpace = Math.max(1, gapBarSpace);
    }
    _adjustVisibleRange() {
        const totalBarCount = this._dataList.length;
        const visibleBarCount = this._totalBarSpace / this._barSpace;
        let leftMinVisibleBarCount = 0;
        let rightMinVisibleBarCount = 0;
        if (this._scrollLimitRole === 'distance') {
            leftMinVisibleBarCount = (this._totalBarSpace - this._maxOffsetDistance.right) / this._barSpace;
            rightMinVisibleBarCount = (this._totalBarSpace - this._maxOffsetDistance.left) / this._barSpace;
        }
        else {
            leftMinVisibleBarCount = this._minVisibleBarCount.left;
            rightMinVisibleBarCount = this._minVisibleBarCount.right;
        }
        leftMinVisibleBarCount = Math.max(0, leftMinVisibleBarCount);
        rightMinVisibleBarCount = Math.max(0, rightMinVisibleBarCount);
        const maxRightOffsetBarCount = visibleBarCount - Math.min(leftMinVisibleBarCount, totalBarCount);
        if (this._lastBarRightSideDiffBarCount > maxRightOffsetBarCount) {
            this._lastBarRightSideDiffBarCount = maxRightOffsetBarCount;
        }
        const minRightOffsetBarCount = -totalBarCount + Math.min(rightMinVisibleBarCount, totalBarCount);
        if (this._lastBarRightSideDiffBarCount < minRightOffsetBarCount) {
            this._lastBarRightSideDiffBarCount = minRightOffsetBarCount;
        }
        let to = Math.round(this._lastBarRightSideDiffBarCount + totalBarCount + 0.5);
        const realTo = to;
        if (to > totalBarCount) {
            to = totalBarCount;
        }
        let from = Math.round(to - visibleBarCount) - 1;
        if (from < 0) {
            from = 0;
        }
        const realFrom = this._lastBarRightSideDiffBarCount > 0 ? Math.round(totalBarCount + this._lastBarRightSideDiffBarCount - visibleBarCount) - 1 : from;
        this._visibleRange = { from, to, realFrom, realTo };
        this.executeAction('onVisibleRangeChange', this._visibleRange);
        this._visibleRangeDataList = [];
        this._visibleRangeHighLowPrice = [
            { x: 0, price: Number.MIN_SAFE_INTEGER },
            { x: 0, price: Number.MAX_SAFE_INTEGER }
        ];
        for (let i = realFrom; i < realTo; i++) {
            const kLineData = this._dataList[i];
            const x = this.dataIndexToCoordinate(i);
            this._visibleRangeDataList.push({
                dataIndex: i,
                x,
                data: {
                    prev: this._dataList[i - 1] ?? kLineData,
                    current: kLineData,
                    next: this._dataList[i + 1] ?? kLineData
                }
            });
            if (isValid(kLineData)) {
                if (this._visibleRangeHighLowPrice[0].price < kLineData.high) {
                    this._visibleRangeHighLowPrice[0].price = kLineData.high;
                    this._visibleRangeHighLowPrice[0].x = x;
                }
                if (this._visibleRangeHighLowPrice[1].price > kLineData.low) {
                    this._visibleRangeHighLowPrice[1].price = kLineData.low;
                    this._visibleRangeHighLowPrice[1].x = x;
                }
            }
        }
        // More processing and loading, more loading if there are callback methods and no data is being loaded
        if (from === 0) {
            if (this._dataLoadMore.forward) {
                this._processDataLoad('forward');
            }
        }
        else if (to === totalBarCount) {
            if (this._dataLoadMore.backward) {
                this._processDataLoad('backward');
            }
        }
    }
    _processDataLoad(type) {
        if (!this._loading && isValid(this._dataLoader) && isValid(this._symbol) && isValid(this._period)) {
            this._loading = true;
            const params = {
                type,
                symbol: this._symbol,
                period: this._period,
                timestamp: null,
                callback: (data, more) => {
                    this._loading = false;
                    this._addData(data, type, more);
                    if (type === 'init') {
                        this._dataLoader?.subscribeBar?.({
                            symbol: this._symbol,
                            period: this._period,
                            callback: (data) => {
                                this._addData(data, 'update');
                            }
                        });
                    }
                }
            };
            switch (type) {
                case 'backward': {
                    params.timestamp = this._dataList[this._dataList.length - 1]?.timestamp ?? null;
                    break;
                }
                case 'forward': {
                    params.timestamp = this._dataList[0]?.timestamp ?? null;
                    break;
                }
            }
            void this._dataLoader.getBars(params);
        }
    }
    _processDataUnsubscribe() {
        if (isValid(this._dataLoader) && isValid(this._symbol) && isValid(this._period)) {
            this._dataLoader.unsubscribeBar?.({
                symbol: this._symbol,
                period: this._period
            });
        }
    }
    resetData(fn) {
        this._processDataUnsubscribe();
        fn?.();
        this._loading = false;
        this._processDataLoad('init');
    }
    getBarSpace() {
        return {
            bar: this._barSpace,
            halfBar: this._barSpace / 2,
            gapBar: this._gapBarSpace,
            halfGapBar: Math.floor(this._gapBarSpace / 2)
        };
    }
    setBarSpace(barSpace, adjustBeforeFunc) {
        if (barSpace < BarSpaceLimitConstants.MIN || barSpace > BarSpaceLimitConstants.MAX || this._barSpace === barSpace) {
            return;
        }
        this._barSpace = barSpace;
        this._calcOptimalBarSpace();
        adjustBeforeFunc?.();
        this._adjustVisibleRange();
        this.setCrosshair(this._crosshair, { notInvalidate: true });
        this._chart.layout({
            measureWidth: true,
            update: true,
            buildYAxisTick: true,
            cacheYAxisWidth: true
        });
    }
    setYScrolling(yScrolling) {
        this._yScrolling = yScrolling;
    }
    getYScrolling() {
        return this._yScrolling;
    }
    setTotalBarSpace(totalSpace) {
        if (this._totalBarSpace !== totalSpace) {
            this._totalBarSpace = totalSpace;
            this._adjustVisibleRange();
            this.setCrosshair(this._crosshair, { notInvalidate: true });
        }
    }
    setOffsetRightDistance(distance, isUpdate) {
        this._offsetRightDistance = this._scrollLimitRole === 'distance' ? Math.min(this._maxOffsetDistance.right, distance) : distance;
        this._lastBarRightSideDiffBarCount = this._offsetRightDistance / this._barSpace;
        if (isUpdate ?? false) {
            this._adjustVisibleRange();
            this.setCrosshair(this._crosshair, { notInvalidate: true });
            this._chart.layout({
                measureWidth: true,
                update: true,
                buildYAxisTick: true,
                cacheYAxisWidth: true
            });
        }
        return this;
    }
    getInitialOffsetRightDistance() {
        return this._offsetRightDistance;
    }
    getOffsetRightDistance() {
        return Math.max(0, this._lastBarRightSideDiffBarCount * this._barSpace);
    }
    getLastBarRightSideDiffBarCount() {
        return this._lastBarRightSideDiffBarCount;
    }
    setLastBarRightSideDiffBarCount(barCount) {
        this._lastBarRightSideDiffBarCount = barCount;
    }
    setMaxOffsetLeftDistance(distance) {
        this._scrollLimitRole = 'distance';
        this._maxOffsetDistance.left = distance;
    }
    setMaxOffsetRightDistance(distance) {
        this._scrollLimitRole = 'distance';
        this._maxOffsetDistance.right = distance;
    }
    setLeftMinVisibleBarCount(barCount) {
        this._scrollLimitRole = 'bar_count';
        this._minVisibleBarCount.left = barCount;
    }
    setRightMinVisibleBarCount(barCount) {
        this._scrollLimitRole = 'bar_count';
        this._minVisibleBarCount.right = barCount;
    }
    getVisibleRange() {
        return this._visibleRange;
    }
    startScroll() {
        this._startLastBarRightSideDiffBarCount = this._lastBarRightSideDiffBarCount;
    }
    scroll(distance) {
        if (!this._scrollEnabled) {
            return;
        }
        const distanceBarCount = distance / this._barSpace;
        const prevLastBarRightSideDistance = this._lastBarRightSideDiffBarCount * this._barSpace;
        this._lastBarRightSideDiffBarCount = this._startLastBarRightSideDiffBarCount - distanceBarCount;
        this._adjustVisibleRange();
        this.setCrosshair(this._crosshair, { notInvalidate: true });
        this._chart.layout({
            measureWidth: true,
            update: true,
            buildYAxisTick: true,
            cacheYAxisWidth: true
        });
        const realDistance = Math.round(prevLastBarRightSideDistance - this._lastBarRightSideDiffBarCount * this._barSpace);
        if (realDistance !== 0) {
            this.executeAction('onScroll', { distance: realDistance });
        }
    }
    getDataByDataIndex(dataIndex) {
        return this._dataList[dataIndex] ?? null;
    }
    coordinateToFloatIndex(x) {
        const dataCount = this._dataList.length;
        const deltaFromRight = (this._totalBarSpace - x) / this._barSpace;
        const index = dataCount + this._lastBarRightSideDiffBarCount - deltaFromRight;
        return Math.round(index * 1000000) / 1000000;
    }
    dataIndexToTimestamp(dataIndex) {
        const length = this._dataList.length;
        if (length === 0) {
            return null;
        }
        const data = this.getDataByDataIndex(dataIndex);
        if (isValid(data)) {
            return data.timestamp;
        }
        if (isValid(this._period)) {
            const lastIndex = length - 1;
            let referenceTimestamp = null;
            let diff = 0;
            if (dataIndex > lastIndex) {
                referenceTimestamp = this._dataList[lastIndex].timestamp;
                diff = dataIndex - lastIndex;
            }
            else if (dataIndex < 0) {
                referenceTimestamp = this._dataList[0].timestamp;
                diff = dataIndex;
            }
            if (isNumber(referenceTimestamp)) {
                const { type, span } = this._period;
                switch (type) {
                    case 'second': {
                        return referenceTimestamp + span * 1000 * diff;
                    }
                    case 'minute': {
                        return referenceTimestamp + span * 60 * 1000 * diff;
                    }
                    case 'hour': {
                        return referenceTimestamp + span * 60 * 60 * 1000 * diff;
                    }
                    case 'day': {
                        return referenceTimestamp + span * 24 * 60 * 60 * 1000 * diff;
                    }
                    case 'week': {
                        return referenceTimestamp + span * 7 * 24 * 60 * 60 * 1000 * diff;
                    }
                    case 'month': {
                        const date = new Date(referenceTimestamp);
                        const referenceDay = date.getDate();
                        date.setDate(1);
                        date.setMonth(date.getMonth() + span * diff);
                        const lastDayOfTargetMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
                        date.setDate(Math.min(referenceDay, lastDayOfTargetMonth));
                        return date.getTime();
                    }
                    case 'year': {
                        const date = new Date(referenceTimestamp);
                        date.setFullYear(date.getFullYear() + span * diff);
                        return date.getTime();
                    }
                }
            }
        }
        return null;
    }
    timestampToDataIndex(timestamp) {
        const length = this._dataList.length;
        if (length === 0) {
            return 0;
        }
        if (isValid(this._period)) {
            let referenceTimestamp = null;
            let baseDataIndex = 0;
            const lastIndex = length - 1;
            const lastTimestamp = this._dataList[lastIndex].timestamp;
            if (timestamp > lastTimestamp) {
                referenceTimestamp = lastTimestamp;
                baseDataIndex = lastIndex;
            }
            const firstTimestamp = this._dataList[0].timestamp;
            if (timestamp < firstTimestamp) {
                referenceTimestamp = firstTimestamp;
                baseDataIndex = 0;
            }
            if (isNumber(referenceTimestamp)) {
                const { type, span } = this._period;
                switch (type) {
                    case 'second': {
                        return baseDataIndex + Math.floor((timestamp - referenceTimestamp) / (span * 1000));
                    }
                    case 'minute': {
                        return baseDataIndex + Math.floor((timestamp - referenceTimestamp) / (span * 60 * 1000));
                    }
                    case 'hour': {
                        return baseDataIndex + Math.floor((timestamp - referenceTimestamp) / (span * 60 * 60 * 1000));
                    }
                    case 'day': {
                        return baseDataIndex + Math.floor((timestamp - referenceTimestamp) / (span * 24 * 60 * 60 * 1000));
                    }
                    case 'week': {
                        return baseDataIndex + Math.floor((timestamp - referenceTimestamp) / (span * 7 * 24 * 60 * 60 * 1000));
                    }
                    case 'month': {
                        const referenceDate = new Date(referenceTimestamp);
                        const currentDate = new Date(timestamp);
                        const referenceYear = referenceDate.getFullYear();
                        const currentYear = currentDate.getFullYear();
                        const referenceMonth = referenceDate.getMonth();
                        const currentMonth = currentDate.getMonth();
                        return baseDataIndex + Math.floor(((currentYear - referenceYear) * 12 + (currentMonth - referenceMonth)) / span);
                    }
                    case 'year': {
                        const referenceYear = new Date(referenceTimestamp).getFullYear();
                        const currentYear = new Date(timestamp).getFullYear();
                        return baseDataIndex + Math.floor((currentYear - referenceYear) / span);
                    }
                }
            }
        }
        return binarySearchNearest(this._dataList, 'timestamp', timestamp);
    }
    dataIndexToCoordinate(dataIndex) {
        const dataCount = this._dataList.length;
        const deltaFromRight = dataCount + this._lastBarRightSideDiffBarCount - dataIndex;
        return Math.floor(this._totalBarSpace - (deltaFromRight - 0.5) * this._barSpace + 0.5);
    }
    coordinateToDataIndex(x) {
        return Math.ceil(this.coordinateToFloatIndex(x)) - 1;
    }
    zoom(scale, coordinate, position) {
        if (!this._zoomEnabled) {
            return;
        }
        const zoomCoordinate = coordinate ?? { x: this._crosshair.x ?? this._totalBarSpace / 2 };
        if (position === 'xAxis') {
            if (this._zoomAnchor.xAxis === 'last_bar') {
                zoomCoordinate.x = this.dataIndexToCoordinate(this._dataList.length - 1);
            }
        }
        else {
            if (this._zoomAnchor.main === 'last_bar') {
                zoomCoordinate.x = this.dataIndexToCoordinate(this._dataList.length - 1);
            }
        }
        const x = zoomCoordinate.x;
        const floatIndex = this.coordinateToFloatIndex(x);
        const prevBarSpace = this._barSpace;
        const barSpace = this._barSpace + scale * (this._barSpace / SCALE_MULTIPLIER);
        this.setBarSpace(barSpace, () => {
            this._lastBarRightSideDiffBarCount += (floatIndex - this.coordinateToFloatIndex(x));
        });
        const realScale = this._barSpace / prevBarSpace;
        if (realScale !== 1) {
            this.executeAction('onZoom', { scale: realScale });
        }
    }
    setZoomEnabled(enabled) {
        this._zoomEnabled = enabled;
    }
    isZoomEnabled() {
        return this._zoomEnabled;
    }
    setZoomAnchor(anchor) {
        if (isString(anchor)) {
            this._zoomAnchor.main = anchor;
            this._zoomAnchor.xAxis = anchor;
        }
        else {
            if (isString(anchor.main)) {
                this._zoomAnchor.main = anchor.main;
            }
            if (isString(anchor.xAxis)) {
                this._zoomAnchor.xAxis = anchor.xAxis;
            }
        }
    }
    getZoomAnchor() {
        return { ...this._zoomAnchor };
    }
    setScrollEnabled(enabled) {
        this._scrollEnabled = enabled;
    }
    isScrollEnabled() {
        return this._scrollEnabled;
    }
    setCrosshair(crosshair, options) {
        const { notInvalidate, notExecuteAction, forceInvalidate } = options ?? {};
        const cr = crosshair ?? {};
        let realDataIndex = 0;
        let dataIndex = 0;
        if (isNumber(cr.x)) {
            realDataIndex = this.coordinateToDataIndex(cr.x);
            if (realDataIndex < 0) {
                dataIndex = 0;
            }
            else if (realDataIndex > this._dataList.length - 1) {
                dataIndex = this._dataList.length - 1;
            }
            else {
                dataIndex = realDataIndex;
            }
        }
        else {
            realDataIndex = this._dataList.length - 1;
            dataIndex = realDataIndex;
        }
        const kLineData = this._dataList[dataIndex];
        const realX = this.dataIndexToCoordinate(realDataIndex);
        const prevCrosshair = { x: this._crosshair.x, y: this._crosshair.y, paneId: this._crosshair.paneId };
        this._crosshair = { ...cr, realX, kLineData, realDataIndex, dataIndex, timestamp: this.dataIndexToTimestamp(realDataIndex) ?? undefined };
        if (prevCrosshair.x !== cr.x ||
            prevCrosshair.y !== cr.y ||
            prevCrosshair.paneId !== cr.paneId ||
            (forceInvalidate ?? false)) {
            if (isValid(kLineData) && !(notExecuteAction ?? false) && this.hasAction('onCrosshairChange') && isString(this._crosshair.paneId)) {
                this.executeAction('onCrosshairChange', crosshair);
            }
            if (!(notInvalidate ?? false)) {
                this._chart.updatePane(1 /* UpdateLevel.Overlay */);
            }
        }
    }
    getCrosshair() {
        return this._crosshair;
    }
    executeAction(type, data) {
        this._actions.get(type)?.execute(data);
    }
    subscribeAction(type, callback) {
        if (!this._actions.has(type)) {
            this._actions.set(type, new Action());
        }
        this._actions.get(type)?.subscribe(callback);
    }
    unsubscribeAction(type, callback) {
        const action = this._actions.get(type);
        if (isValid(action)) {
            action.unsubscribe(callback);
            if (action.isEmpty()) {
                this._actions.delete(type);
            }
        }
    }
    hasAction(type) {
        const action = this._actions.get(type);
        return isValid(action) && !action.isEmpty();
    }
    _sortIndicators(paneId) {
        if (isString(paneId)) {
            this._indicators.get(paneId)?.sort((i1, i2) => i1.zLevel - i2.zLevel);
        }
        else {
            this._indicators.forEach(paneIndicators => {
                paneIndicators.sort((i1, i2) => i1.zLevel - i2.zLevel);
            });
        }
    }
    _calcIndicator(data) {
        let indicators = [];
        indicators = indicators.concat(data);
        if (indicators.length > 0) {
            const tasks = {};
            indicators.forEach(indicator => {
                tasks[indicator.id] = indicator.calcImp(this._dataList);
            });
            this._taskScheduler.add(tasks);
        }
    }
    addIndicator(create, paneId, isStack) {
        const { name } = create;
        const filterIndicators = this.getIndicatorsByFilter(create);
        if (filterIndicators.length > 0) {
            return false;
        }
        let paneIndicators = this.getIndicatorsByPaneId(paneId);
        const IndicatorClazz = getIndicatorClass(name);
        const indicator = new IndicatorClazz();
        this._synchronizeIndicatorSeriesPrecision(indicator);
        indicator.paneId = paneId;
        indicator.override(create);
        if (!isStack) {
            this.removeIndicator({ paneId });
            paneIndicators = [];
        }
        paneIndicators.push(indicator);
        this._indicators.set(paneId, paneIndicators);
        this._sortIndicators(paneId);
        this._calcIndicator(indicator);
        return true;
    }
    getIndicatorsByPaneId(paneId) {
        return this._indicators.get(paneId) ?? [];
    }
    getIndicatorsByFilter(filter) {
        const { paneId, name, id } = filter;
        const match = indicator => {
            if (isValid(id)) {
                return indicator.id === id;
            }
            return !isValid(name) || indicator.name === name;
        };
        let indicators = [];
        if (isValid(paneId)) {
            indicators = indicators.concat(this.getIndicatorsByPaneId(paneId).filter(match));
        }
        else {
            this._indicators.forEach(paneIndicators => {
                indicators = indicators.concat(paneIndicators.filter(match));
            });
        }
        return indicators;
    }
    removeIndicator(filter) {
        let removed = false;
        const filterIndicators = this.getIndicatorsByFilter(filter);
        filterIndicators.forEach(indicator => {
            const paneIndicators = this.getIndicatorsByPaneId(indicator.paneId);
            const index = paneIndicators.findIndex(ins => ins.id === indicator.id);
            if (index > -1) {
                paneIndicators.splice(index, 1);
                removed = true;
            }
            if (paneIndicators.length === 0) {
                this._indicators.delete(indicator.paneId);
            }
        });
        return removed;
    }
    hasIndicators(paneId) {
        return this._indicators.has(paneId);
    }
    _synchronizeIndicatorSeriesPrecision(indicator) {
        if (isValid(this._symbol)) {
            const { pricePrecision = SymbolDefaultPrecisionConstants.PRICE, volumePrecision = SymbolDefaultPrecisionConstants.VOLUME } = this._symbol;
            const synchronize = indicator => {
                switch (indicator.series) {
                    case 'price': {
                        indicator.setSeriesPrecision(pricePrecision);
                        break;
                    }
                    case 'volume': {
                        indicator.setSeriesPrecision(volumePrecision);
                        break;
                    }
                }
            };
            if (isValid(indicator)) {
                synchronize(indicator);
            }
            else {
                this._indicators.forEach(paneIndicators => {
                    paneIndicators.forEach(indicator => {
                        synchronize(indicator);
                    });
                });
            }
        }
    }
    overrideIndicator(override) {
        let updateFlag = false;
        let sortFlag = false;
        const filterIndicators = this.getIndicatorsByFilter(override);
        filterIndicators.forEach(indicator => {
            indicator.override(override);
            const { calc, draw, sort } = indicator.shouldUpdateImp();
            if (sort) {
                sortFlag = true;
            }
            if (calc) {
                this._calcIndicator(indicator);
            }
            else {
                if (draw) {
                    updateFlag = true;
                }
            }
        });
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ignore
        if (sortFlag) {
            this._sortIndicators();
        }
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ignore
        if (updateFlag) {
            this._chart.layout({ update: true });
            return true;
        }
        return false;
    }
    getOverlaysByFilter(filter) {
        const { id, groupId, paneId, name } = filter;
        const match = overlay => {
            if (isValid(id)) {
                return overlay.id === id;
            }
            else {
                if (isValid(groupId)) {
                    return overlay.groupId === groupId && (!isValid(name) || overlay.name === name);
                }
            }
            return !isValid(name) || overlay.name === name;
        };
        let overlays = [];
        if (isValid(paneId)) {
            overlays = overlays.concat(this.getOverlaysByPaneId(paneId).filter(match));
        }
        else {
            this._overlays.forEach(paneOverlays => {
                overlays = overlays.concat(paneOverlays.filter(match));
            });
        }
        const progressOverlay = this._progressOverlayInfo?.overlay;
        if (isValid(progressOverlay) && match(progressOverlay)) {
            overlays.push(progressOverlay);
        }
        return overlays;
    }
    getOverlaysByPaneId(paneId) {
        if (!isString(paneId)) {
            let overlays = [];
            this._overlays.forEach(paneOverlays => {
                overlays = overlays.concat(paneOverlays);
            });
            return overlays;
        }
        return this._overlays.get(paneId) ?? [];
    }
    _sortOverlays(paneId) {
        if (isString(paneId)) {
            this._overlays.get(paneId)?.sort((o1, o2) => o1.zLevel - o2.zLevel);
        }
        else {
            this._overlays.forEach(paneOverlays => {
                paneOverlays.sort((o1, o2) => o1.zLevel - o2.zLevel);
            });
        }
    }
    addOverlays(os, appointPaneFlags) {
        const updatePaneIds = [];
        const ids = os.map((create, index) => {
            if (isValid(create.id)) {
                let findOverlay = null;
                for (const item of this._overlays) {
                    const overlays = item[1];
                    const overlay = overlays.find(o => o.id === create.id);
                    if (isValid(overlay)) {
                        findOverlay = overlay;
                        break;
                    }
                }
                if (isValid(findOverlay)) {
                    return create.id;
                }
            }
            const OverlayClazz = getOverlayInnerClass(create.name);
            if (isValid(OverlayClazz)) {
                const id = create.id ?? createId(OVERLAY_ID_PREFIX);
                const overlay = new OverlayClazz();
                const paneId = create.paneId ?? PaneIdConstants.CANDLE;
                create.id = id;
                create.groupId ??= id;
                const zLevel = this.getOverlaysByPaneId(paneId).length;
                create.zLevel ??= zLevel;
                overlay.override(create);
                if (!updatePaneIds.includes(paneId)) {
                    updatePaneIds.push(paneId);
                }
                if (overlay.isDrawing()) {
                    this._progressOverlayInfo = { paneId, overlay, appointPaneFlag: appointPaneFlags[index] };
                }
                else {
                    if (!this._overlays.has(paneId)) {
                        this._overlays.set(paneId, []);
                    }
                    this._overlays.get(paneId)?.push(overlay);
                }
                if (overlay.isStart()) {
                    overlay.onDrawStart?.(({ overlay, chart: this._chart }));
                }
                return id;
            }
            return null;
        });
        if (updatePaneIds.length > 0) {
            this._sortOverlays();
            updatePaneIds.forEach(paneId => {
                this._chart.updatePane(1 /* UpdateLevel.Overlay */, paneId);
            });
            this._chart.updatePane(1 /* UpdateLevel.Overlay */, PaneIdConstants.X_AXIS);
        }
        return ids;
    }
    getProgressOverlayInfo() {
        return this._progressOverlayInfo;
    }
    progressOverlayComplete() {
        if (this._progressOverlayInfo !== null) {
            const { overlay, paneId } = this._progressOverlayInfo;
            if (!overlay.isDrawing()) {
                if (!this._overlays.has(paneId)) {
                    this._overlays.set(paneId, []);
                }
                this._overlays.get(paneId)?.push(overlay);
                this._sortOverlays(paneId);
                this._progressOverlayInfo = null;
            }
        }
    }
    updateProgressOverlayInfo(paneId, appointPaneFlag) {
        if (this._progressOverlayInfo !== null) {
            if (isBoolean(appointPaneFlag) && appointPaneFlag) {
                this._progressOverlayInfo.appointPaneFlag = appointPaneFlag;
            }
            this._progressOverlayInfo.paneId = paneId;
            this._progressOverlayInfo.overlay.override({ paneId });
        }
    }
    overrideOverlay(override) {
        let sortFlag = false;
        const updatePaneIds = [];
        const filterOverlays = this.getOverlaysByFilter(override);
        filterOverlays.forEach(overlay => {
            overlay.override(override);
            const { sort, draw } = overlay.shouldUpdate();
            if (sort) {
                sortFlag = true;
            }
            if (sort || draw) {
                if (!updatePaneIds.includes(overlay.paneId)) {
                    updatePaneIds.push(overlay.paneId);
                }
            }
        });
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ignore
        if (sortFlag) {
            this._sortOverlays();
        }
        if (updatePaneIds.length > 0) {
            updatePaneIds.forEach(paneId => {
                this._chart.updatePane(1 /* UpdateLevel.Overlay */, paneId);
            });
            this._chart.updatePane(1 /* UpdateLevel.Overlay */, PaneIdConstants.X_AXIS);
            return true;
        }
        return false;
    }
    removeOverlay(filter) {
        const updatePaneIds = [];
        const filterOverlays = this.getOverlaysByFilter(filter);
        filterOverlays.forEach(overlay => {
            const paneId = overlay.paneId;
            const paneOverlays = this.getOverlaysByPaneId(overlay.paneId);
            overlay.onRemoved?.({ overlay, chart: this._chart });
            if (!updatePaneIds.includes(paneId)) {
                updatePaneIds.push(paneId);
            }
            if (overlay.isDrawing()) {
                this._progressOverlayInfo = null;
            }
            else {
                const index = paneOverlays.findIndex(o => o.id === overlay.id);
                if (index > -1) {
                    paneOverlays.splice(index, 1);
                }
            }
            if (paneOverlays.length === 0) {
                this._overlays.delete(paneId);
            }
        });
        if (updatePaneIds.length > 0) {
            updatePaneIds.forEach(paneId => {
                this._chart.updatePane(1 /* UpdateLevel.Overlay */, paneId);
            });
            this._chart.updatePane(1 /* UpdateLevel.Overlay */, PaneIdConstants.X_AXIS);
            return true;
        }
        return false;
    }
    setPressedOverlayInfo(info) {
        this._pressedOverlayInfo = info;
    }
    getPressedOverlayInfo() {
        return this._pressedOverlayInfo;
    }
    setHoverOverlayInfo(info, processOnMouseEnterEvent, processOnMouseLeaveEvent) {
        const { overlay, figureType, figureIndex, figure } = this._hoverOverlayInfo;
        const infoOverlay = info.overlay;
        if (overlay?.id !== infoOverlay?.id ||
            figureType !== info.figureType ||
            figureIndex !== info.figureIndex) {
            this._hoverOverlayInfo = info;
            if (overlay?.id !== infoOverlay?.id) {
                let ignoreUpdateFlag = false;
                let sortFlag = false;
                if (overlay !== null) {
                    overlay.override({ zLevel: overlay.getPrevZLevel() });
                    sortFlag = true;
                    if (processOnMouseLeaveEvent(overlay, figure)) {
                        ignoreUpdateFlag = true;
                    }
                }
                if (infoOverlay !== null) {
                    infoOverlay.setPrevZLevel(infoOverlay.zLevel);
                    infoOverlay.override({ zLevel: Number.MAX_SAFE_INTEGER });
                    sortFlag = true;
                    if (processOnMouseEnterEvent(infoOverlay, info.figure)) {
                        ignoreUpdateFlag = true;
                    }
                }
                if (sortFlag) {
                    this._sortOverlays();
                }
                if (!ignoreUpdateFlag) {
                    this._chart.updatePane(1 /* UpdateLevel.Overlay */);
                }
            }
        }
    }
    getHoverOverlayInfo() {
        return this._hoverOverlayInfo;
    }
    setClickOverlayInfo(info, processOnSelectedEvent, processOnDeselectedEvent) {
        const { paneId, overlay, figureType, figure, figureIndex } = this._clickOverlayInfo;
        const infoOverlay = info.overlay;
        if (overlay?.id !== infoOverlay?.id || figureType !== info.figureType || figureIndex !== info.figureIndex) {
            this._clickOverlayInfo = info;
            if (overlay?.id !== infoOverlay?.id) {
                if (isValid(overlay)) {
                    processOnDeselectedEvent(overlay, figure);
                }
                if (isValid(infoOverlay)) {
                    processOnSelectedEvent(infoOverlay, info.figure);
                }
                this._chart.updatePane(1 /* UpdateLevel.Overlay */, info.paneId);
                if (paneId !== info.paneId) {
                    this._chart.updatePane(1 /* UpdateLevel.Overlay */, paneId);
                }
                this._chart.updatePane(1 /* UpdateLevel.Overlay */, PaneIdConstants.X_AXIS);
            }
        }
    }
    getClickOverlayInfo() {
        return this._clickOverlayInfo;
    }
    isOverlayEmpty() {
        return this._overlays.size === 0 && this._progressOverlayInfo === null;
    }
    isOverlayDrawing() {
        return this._progressOverlayInfo?.overlay.isDrawing() ?? false;
    }
    _clearLastPriceMarkExtendTextUpdateTimer() {
        this._lastPriceMarkExtendTextUpdateTimers.forEach(timer => {
            clearInterval(timer);
        });
        this._lastPriceMarkExtendTextUpdateTimers = [];
    }
    _clearData() {
        this._dataLoadMore.backward = false;
        this._dataLoadMore.forward = false;
        this._loading = false;
        this._dataList = [];
        this._visibleRangeDataList = [];
        this._visibleRangeHighLowPrice = [
            { x: 0, price: Number.MIN_SAFE_INTEGER },
            { x: 0, price: Number.MAX_SAFE_INTEGER }
        ];
        this._visibleRange = getDefaultVisibleRange();
        this._crosshair = {};
    }
    getChart() {
        return this._chart;
    }
    destroy() {
        this._clearData();
        this._clearLastPriceMarkExtendTextUpdateTimer();
        this._taskScheduler.clear();
        this._overlays.clear();
        this._indicators.clear();
        this._actions.clear();
    }
    applyNewData(data, more) {
        this._addData(data, 'init', more);
    }
    applyMoreData(data, more) {
        this._addData(data, 'backward', more);
    }
    updateData(data) {
        this._addData(data, 'forward');
    }
}

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
const WidgetNameConstants = {
    MAIN: 'main',
    X_AXIS: 'xAxis',
    Y_AXIS: 'yAxis',
    SEPARATOR: 'separator'
};
const REAL_SEPARATOR_HEIGHT = 7;

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
async function isSupportedDevicePixelContentBox() {
    return await new Promise((resolve) => {
        const ro = new ResizeObserver((entries) => {
            resolve(entries.every(entry => 'devicePixelContentBoxSize' in entry));
            ro.disconnect();
        });
        ro.observe(document.body, { box: 'device-pixel-content-box' });
    }).catch(() => false);
}
class Canvas {
    _element;
    _resizeObserver;
    _mediaQueryList;
    _ctx;
    _listener;
    _supportedDevicePixelContentBox = false;
    _width = 0;
    _height = 0;
    _pixelWidth = 0;
    _pixelHeight = 0;
    _nextPixelWidth = 0;
    _nextPixelHeight = 0;
    _requestAnimationId = DEFAULT_REQUEST_ID;
    _mediaQueryListener = () => {
        const pixelRatio = getPixelRatio(this._element);
        this._nextPixelWidth = Math.round(this._element.clientWidth * pixelRatio);
        this._nextPixelHeight = Math.round(this._element.clientHeight * pixelRatio);
        this._resetPixelRatio();
    };
    constructor(style, listener) {
        this._listener = listener;
        this._element = createDom('canvas', style);
        this._ctx = this._element.getContext('2d');
        isSupportedDevicePixelContentBox().then(result => {
            this._supportedDevicePixelContentBox = result;
            if (result) {
                this._resizeObserver = new ResizeObserver((entries) => {
                    const entry = entries.find((entry) => entry.target === this._element);
                    const size = entry?.devicePixelContentBoxSize[0];
                    if (isValid(size)) {
                        this._nextPixelWidth = size.inlineSize;
                        this._nextPixelHeight = size.blockSize;
                        if (this._pixelWidth !== this._nextPixelWidth || this._pixelHeight !== this._nextPixelHeight) {
                            this._resetPixelRatio();
                        }
                    }
                });
                this._resizeObserver.observe(this._element, { box: 'device-pixel-content-box' });
            }
            else {
                this._mediaQueryList = window.matchMedia(`(resolution: ${getPixelRatio(this._element)}dppx)`);
                // eslint-disable-next-line @typescript-eslint/no-deprecated -- ignore
                this._mediaQueryList.addListener(this._mediaQueryListener);
            }
        }).catch((_) => false);
    }
    _resetPixelRatio() {
        this._executeListener(() => {
            const width = this._element.clientWidth;
            const height = this._element.clientHeight;
            this._width = width;
            this._height = height;
            this._pixelWidth = this._nextPixelWidth;
            this._pixelHeight = this._nextPixelHeight;
            this._element.width = this._nextPixelWidth;
            this._element.height = this._nextPixelHeight;
            const horizontalPixelRatio = this._nextPixelWidth / width;
            const verticalPixelRatio = this._nextPixelHeight / height;
            this._ctx.scale(horizontalPixelRatio, verticalPixelRatio);
        });
    }
    _executeListener(fn) {
        if (this._requestAnimationId === DEFAULT_REQUEST_ID) {
            this._requestAnimationId = requestAnimationFrame(() => {
                this._ctx.clearRect(0, 0, this._width, this._height);
                fn?.();
                this._listener();
                this._requestAnimationId = DEFAULT_REQUEST_ID;
            });
        }
    }
    update(w, h) {
        if (this._width !== w || this._height !== h) {
            this._element.style.width = `${w}px`;
            this._element.style.height = `${h}px`;
            if (!this._supportedDevicePixelContentBox) {
                const pixelRatio = getPixelRatio(this._element);
                this._nextPixelWidth = Math.round(w * pixelRatio);
                this._nextPixelHeight = Math.round(h * pixelRatio);
                this._resetPixelRatio();
            }
        }
        else {
            this._executeListener();
        }
    }
    getElement() {
        return this._element;
    }
    getContext() {
        return this._ctx;
    }
    destroy() {
        if (isValid(this._resizeObserver)) {
            this._resizeObserver.unobserve(this._element);
        }
        if (isValid(this._mediaQueryList)) {
            // eslint-disable-next-line @typescript-eslint/no-deprecated -- ignore
            this._mediaQueryList.removeListener(this._mediaQueryListener);
        }
    }
}

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
class Widget extends Eventful {
    /**
     * root container
     */
    _rootContainer;
    /**
     * Parent pane
     */
    _pane;
    /**
     * wrapper container
     */
    _container;
    _bounding = createDefaultBounding();
    _cursor = 'crosshair';
    _forceCursor = null;
    constructor(rootContainer, pane) {
        super();
        this._pane = pane;
        this._rootContainer = rootContainer;
        this._container = this.createContainer();
        rootContainer.appendChild(this._container);
    }
    setBounding(bounding) {
        merge(this._bounding, bounding);
        return this;
    }
    getContainer() { return this._container; }
    getBounding() {
        return this._bounding;
    }
    getPane() {
        return this._pane;
    }
    checkEventOn(_) {
        return true;
    }
    setCursor(cursor) {
        if (!isString(this._forceCursor)) {
            if (cursor !== this._cursor) {
                this._cursor = cursor;
                this._container.style.cursor = this._cursor;
            }
        }
    }
    setForceCursor(cursor) {
        if (cursor !== this._forceCursor) {
            this._forceCursor = cursor;
            this._container.style.cursor = this._forceCursor ?? this._cursor;
        }
    }
    getForceCursor() {
        return this._forceCursor;
    }
    update(level) {
        this.updateImp(this._container, this._bounding, level ?? 3 /* UpdateLevel.Drawer */);
    }
    destroy() {
        this._rootContainer.removeChild(this._container);
    }
}

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
class DrawWidget extends Widget {
    _mainCanvas;
    _overlayCanvas;
    constructor(rootContainer, pane) {
        super(rootContainer, pane);
        this._mainCanvas = new Canvas({
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: '2',
            boxSizing: 'border-box'
        }, () => {
            this.updateMain(this._mainCanvas.getContext());
        });
        this._overlayCanvas = new Canvas({
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: '2',
            boxSizing: 'border-box'
        }, () => {
            this.updateOverlay(this._overlayCanvas.getContext());
        });
        const container = this.getContainer();
        container.appendChild(this._mainCanvas.getElement());
        container.appendChild(this._overlayCanvas.getElement());
    }
    createContainer() {
        return createDom('div', {
            margin: '0',
            padding: '0',
            position: 'absolute',
            top: '0',
            overflow: 'hidden',
            boxSizing: 'border-box',
            zIndex: '1'
        });
    }
    updateImp(container, bounding, level) {
        const { width, height, left } = bounding;
        container.style.left = `${left}px`;
        let l = level;
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (width !== w || height !== h) {
            container.style.width = `${width}px`;
            container.style.height = `${height}px`;
            l = 3 /* UpdateLevel.Drawer */;
        }
        switch (l) {
            case 0 /* UpdateLevel.Main */: {
                this._mainCanvas.update(width, height);
                break;
            }
            case 1 /* UpdateLevel.Overlay */: {
                this._overlayCanvas.update(width, height);
                break;
            }
            case 3 /* UpdateLevel.Drawer */:
            case 4 /* UpdateLevel.All */: {
                this._mainCanvas.update(width, height);
                this._overlayCanvas.update(width, height);
                break;
            }
        }
    }
    destroy() {
        this._mainCanvas.destroy();
        this._overlayCanvas.destroy();
    }
    getImage(includeOverlay) {
        const { width, height } = this.getBounding();
        const canvas = createDom('canvas', {
            width: `${width}px`,
            height: `${height}px`,
            boxSizing: 'border-box'
        });
        const ctx = canvas.getContext('2d');
        const pixelRatio = getPixelRatio(canvas);
        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;
        ctx.scale(pixelRatio, pixelRatio);
        ctx.drawImage(this._mainCanvas.getElement(), 0, 0, width, height);
        if (includeOverlay) {
            ctx.drawImage(this._overlayCanvas.getElement(), 0, 0, width, height);
        }
        return canvas;
    }
}

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
class View extends Eventful {
    /**
     * Parent widget
     */
    _widget;
    constructor(widget) {
        super();
        this._widget = widget;
    }
    getWidget() { return this._widget; }
    createFigure(create, eventHandler) {
        const FigureClazz = getInnerFigureClass(create.name);
        if (FigureClazz !== null) {
            const figure = new FigureClazz(create);
            if (isValid(eventHandler)) {
                for (const key in eventHandler) {
                    // eslint-disable-next-line no-prototype-builtins -- ignore
                    if (eventHandler.hasOwnProperty(key)) {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- ignore
                        figure.registerEvent(key, eventHandler[key]);
                    }
                }
                this.addChild(figure);
            }
            return figure;
        }
        return null;
    }
    draw(ctx, ...extend) {
        this.clear();
        this.drawImp(ctx, extend);
    }
    checkEventOn(_) {
        return true;
    }
}

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
class GridView extends View {
    drawImp(ctx) {
        const widget = this.getWidget();
        const pane = this.getWidget().getPane();
        const chart = pane.getChart();
        const bounding = widget.getBounding();
        const styles = chart.getStyles().grid;
        const show = styles.show;
        if (show) {
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';
            const horizontalStyles = styles.horizontal;
            const horizontalShow = horizontalStyles.show;
            if (horizontalShow) {
                const yAxis = pane.getAxisComponent();
                const attrs = yAxis.getTicks().map(tick => ({
                    coordinates: [
                        { x: 0, y: tick.coord },
                        { x: bounding.width, y: tick.coord }
                    ]
                }));
                this.createFigure({
                    name: 'line',
                    attrs,
                    styles: horizontalStyles
                })?.draw(ctx);
            }
            const verticalStyles = styles.vertical;
            const verticalShow = verticalStyles.show;
            if (verticalShow) {
                const xAxis = chart.getXAxisPane().getAxisComponent();
                const attrs = xAxis.getTicks().map(tick => ({
                    coordinates: [
                        { x: tick.coord, y: 0 },
                        { x: tick.coord, y: bounding.height }
                    ]
                }));
                this.createFigure({
                    name: 'line',
                    attrs,
                    styles: verticalStyles
                })?.draw(ctx);
            }
            ctx.restore();
        }
    }
}

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
class ChildrenView extends View {
    eachChildren(childCallback) {
        const pane = this.getWidget().getPane();
        const chartStore = pane.getChart().getChartStore();
        const visibleRangeDataList = chartStore.getVisibleRangeDataList();
        const barSpace = chartStore.getBarSpace();
        const dataLength = visibleRangeDataList.length;
        let index = 0;
        while (index < dataLength) {
            childCallback(visibleRangeDataList[index], barSpace, index);
            ++index;
        }
    }
}

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
class CandleBarView extends ChildrenView {
    _boundCandleBarClickEvent = (data) => () => {
        this.getWidget().getPane().getChart().getChartStore().executeAction('onCandleBarClick', data);
        return false;
    };
    drawImp(ctx) {
        const pane = this.getWidget().getPane();
        const isMain = pane.getId() === PaneIdConstants.CANDLE;
        const chartStore = pane.getChart().getChartStore();
        const candleBarOptions = this.getCandleBarOptions();
        if (candleBarOptions !== null) {
            const { type, styles } = candleBarOptions;
            let ohlcSize = 0;
            let halfOhlcSize = 0;
            if (candleBarOptions.type === 'ohlc') {
                const { gapBar } = chartStore.getBarSpace();
                ohlcSize = Math.min(Math.max(Math.round(gapBar * 0.2), 1), 8);
                if (ohlcSize > 2 && ohlcSize % 2 === 1) {
                    ohlcSize--;
                }
                halfOhlcSize = Math.floor(ohlcSize / 2);
            }
            const yAxis = pane.getAxisComponent();
            this.eachChildren((visibleData, barSpace) => {
                const { x, data: { current, prev } } = visibleData;
                if (isValid(current)) {
                    const { open, high, low, close } = current;
                    const comparePrice = styles.compareRule === 'current_open' ? open : (prev?.close ?? close);
                    const colors = [];
                    if (close > comparePrice) {
                        colors[0] = styles.upColor;
                        colors[1] = styles.upBorderColor;
                        colors[2] = styles.upWickColor;
                    }
                    else if (close < comparePrice) {
                        colors[0] = styles.downColor;
                        colors[1] = styles.downBorderColor;
                        colors[2] = styles.downWickColor;
                    }
                    else {
                        colors[0] = styles.noChangeColor;
                        colors[1] = styles.noChangeBorderColor;
                        colors[2] = styles.noChangeWickColor;
                    }
                    const openY = yAxis.convertToPixel(open);
                    const closeY = yAxis.convertToPixel(close);
                    const priceY = [
                        openY, closeY,
                        yAxis.convertToPixel(high),
                        yAxis.convertToPixel(low)
                    ];
                    priceY.sort((a, b) => a - b);
                    const correction = barSpace.gapBar % 2 === 0 ? 1 : 0;
                    let rects = [];
                    switch (type) {
                        case 'candle_solid': {
                            rects = this._createSolidBar(x, priceY, barSpace, colors, correction);
                            break;
                        }
                        case 'candle_stroke': {
                            rects = this._createStrokeBar(x, priceY, barSpace, colors, correction);
                            break;
                        }
                        case 'candle_up_stroke': {
                            if (close > open) {
                                rects = this._createStrokeBar(x, priceY, barSpace, colors, correction);
                            }
                            else {
                                rects = this._createSolidBar(x, priceY, barSpace, colors, correction);
                            }
                            break;
                        }
                        case 'candle_down_stroke': {
                            if (open > close) {
                                rects = this._createStrokeBar(x, priceY, barSpace, colors, correction);
                            }
                            else {
                                rects = this._createSolidBar(x, priceY, barSpace, colors, correction);
                            }
                            break;
                        }
                        case 'ohlc': {
                            rects = [
                                {
                                    name: 'rect',
                                    attrs: [
                                        {
                                            x: x - halfOhlcSize,
                                            y: priceY[0],
                                            width: ohlcSize,
                                            height: priceY[3] - priceY[0]
                                        },
                                        {
                                            x: x - barSpace.halfGapBar,
                                            y: openY + ohlcSize > priceY[3] ? priceY[3] - ohlcSize : openY,
                                            width: barSpace.halfGapBar - halfOhlcSize,
                                            height: ohlcSize
                                        },
                                        {
                                            x: x + halfOhlcSize,
                                            y: closeY + ohlcSize > priceY[3] ? priceY[3] - ohlcSize : closeY,
                                            width: barSpace.halfGapBar - halfOhlcSize,
                                            height: ohlcSize
                                        }
                                    ],
                                    styles: { color: colors[0] }
                                }
                            ];
                            break;
                        }
                    }
                    rects.forEach(rect => {
                        let handler = null;
                        if (isMain) {
                            handler = {
                                mouseClickEvent: this._boundCandleBarClickEvent(visibleData)
                            };
                        }
                        this.createFigure(rect, handler ?? undefined)?.draw(ctx);
                    });
                }
            });
        }
    }
    getCandleBarOptions() {
        const candleStyles = this.getWidget().getPane().getChart().getStyles().candle;
        return {
            type: candleStyles.type,
            styles: candleStyles.bar
        };
    }
    _createSolidBar(x, priceY, barSpace, colors, correction) {
        return [
            {
                name: 'rect',
                attrs: {
                    x,
                    y: priceY[0],
                    width: 1,
                    height: priceY[3] - priceY[0]
                },
                styles: { color: colors[2] }
            },
            {
                name: 'rect',
                attrs: {
                    x: x - barSpace.halfGapBar,
                    y: priceY[1],
                    width: barSpace.gapBar + correction,
                    height: Math.max(1, priceY[2] - priceY[1])
                },
                styles: {
                    style: 'stroke_fill',
                    color: colors[0],
                    borderColor: colors[1]
                }
            }
        ];
    }
    _createStrokeBar(x, priceY, barSpace, colors, correction) {
        return [
            {
                name: 'rect',
                attrs: [
                    {
                        x,
                        y: priceY[0],
                        width: 1,
                        height: priceY[1] - priceY[0]
                    },
                    {
                        x,
                        y: priceY[2],
                        width: 1,
                        height: priceY[3] - priceY[2]
                    }
                ],
                styles: { color: colors[2] }
            },
            {
                name: 'rect',
                attrs: {
                    x: x - barSpace.halfGapBar,
                    y: priceY[1],
                    width: barSpace.gapBar + correction,
                    height: Math.max(1, priceY[2] - priceY[1])
                },
                styles: {
                    style: 'stroke',
                    borderColor: colors[1]
                }
            }
        ];
    }
}

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
class IndicatorView extends CandleBarView {
    getCandleBarOptions() {
        const pane = this.getWidget().getPane();
        const yAxis = pane.getAxisComponent();
        if (!yAxis.isInCandle()) {
            const chartStore = pane.getChart().getChartStore();
            const indicators = chartStore.getIndicatorsByPaneId(pane.getId());
            for (const indicator of indicators) {
                if (indicator.shouldOhlc && indicator.visible) {
                    const indicatorStyles = indicator.styles;
                    const defaultStyles = chartStore.getStyles().indicator;
                    const compareRule = formatValue(indicatorStyles, 'ohlc.compareRule', defaultStyles.ohlc.compareRule);
                    const upColor = formatValue(indicatorStyles, 'ohlc.upColor', defaultStyles.ohlc.upColor);
                    const downColor = formatValue(indicatorStyles, 'ohlc.downColor', defaultStyles.ohlc.downColor);
                    const noChangeColor = formatValue(indicatorStyles, 'ohlc.noChangeColor', defaultStyles.ohlc.noChangeColor);
                    return {
                        type: 'ohlc',
                        styles: {
                            compareRule,
                            upColor,
                            downColor,
                            noChangeColor,
                            upBorderColor: upColor,
                            downBorderColor: downColor,
                            noChangeBorderColor: noChangeColor,
                            upWickColor: upColor,
                            downWickColor: downColor,
                            noChangeWickColor: noChangeColor
                        }
                    };
                }
            }
        }
        return null;
    }
    drawImp(ctx) {
        super.drawImp(ctx);
        const widget = this.getWidget();
        const pane = widget.getPane();
        const chart = pane.getChart();
        const bounding = widget.getBounding();
        const xAxis = chart.getXAxisPane().getAxisComponent();
        const yAxis = pane.getAxisComponent();
        const chartStore = chart.getChartStore();
        const indicators = chartStore.getIndicatorsByPaneId(pane.getId());
        const defaultStyles = chartStore.getStyles().indicator;
        ctx.save();
        indicators.forEach(indicator => {
            if (indicator.visible) {
                if (indicator.zLevel < 0) {
                    ctx.globalCompositeOperation = 'destination-over';
                }
                else {
                    ctx.globalCompositeOperation = 'source-over';
                }
                let isCover = false;
                if (indicator.draw !== null) {
                    ctx.save();
                    isCover = indicator.draw({
                        ctx,
                        chart,
                        indicator,
                        bounding,
                        xAxis,
                        yAxis
                    });
                    ctx.restore();
                }
                if (!isCover) {
                    const result = indicator.result;
                    const lines = [];
                    this.eachChildren((data, barSpace) => {
                        const { halfGapBar } = barSpace;
                        const { dataIndex, x } = data;
                        const prevX = xAxis.convertToPixel(dataIndex - 1);
                        const nextX = xAxis.convertToPixel(dataIndex + 1);
                        const prevData = result[dataIndex - 1] ?? null;
                        const currentData = result[dataIndex] ?? null;
                        const nextData = result[dataIndex + 1] ?? null;
                        const prevCoordinate = { x: prevX };
                        const currentCoordinate = { x };
                        const nextCoordinate = { x: nextX };
                        indicator.figures.forEach(({ key }) => {
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- ignore
                            const prevValue = prevData?.[key];
                            if (isNumber(prevValue)) {
                                prevCoordinate[key] = yAxis.convertToPixel(prevValue);
                            }
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- ignore
                            const currentValue = currentData?.[key];
                            if (isNumber(currentValue)) {
                                currentCoordinate[key] = yAxis.convertToPixel(currentValue);
                            }
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- ignore
                            const nextValue = nextData?.[key];
                            if (isNumber(nextValue)) {
                                nextCoordinate[key] = yAxis.convertToPixel(nextValue);
                            }
                        });
                        eachFigures(indicator, dataIndex, defaultStyles, (figure, figureStyles, figureIndex) => {
                            if (isValid(currentData?.[figure.key])) {
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- ignore
                                const valueY = currentCoordinate[figure.key];
                                let attrs = figure.attrs?.({
                                    data: { prev: prevData, current: currentData, next: nextData },
                                    coordinate: { prev: prevCoordinate, current: currentCoordinate, next: nextCoordinate },
                                    bounding,
                                    barSpace,
                                    xAxis,
                                    yAxis
                                });
                                if (!isValid(attrs)) {
                                    switch (figure.type) {
                                        case 'circle': {
                                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- ignore
                                            attrs = { x, y: valueY, r: Math.max(1, halfGapBar) };
                                            break;
                                        }
                                        case 'rect':
                                        case 'bar': {
                                            const baseValue = figure.baseValue ?? yAxis.getRange().from;
                                            const baseValueY = yAxis.convertToPixel(baseValue);
                                            let height = Math.abs(baseValueY - valueY);
                                            if (baseValue !== currentData?.[figure.key]) {
                                                height = Math.max(1, height);
                                            }
                                            let y = 0;
                                            if (valueY > baseValueY) {
                                                y = baseValueY;
                                            }
                                            else {
                                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- ignore
                                                y = valueY;
                                            }
                                            attrs = {
                                                x: x - halfGapBar,
                                                y,
                                                width: Math.max(1, halfGapBar * 2),
                                                height
                                            };
                                            break;
                                        }
                                        case 'line': {
                                            if (!isValid(lines[figureIndex])) {
                                                lines[figureIndex] = [];
                                            }
                                            if (isNumber(currentCoordinate[figure.key]) && isNumber(nextCoordinate[figure.key])) {
                                                lines[figureIndex].push({
                                                    coordinates: [
                                                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- ignore
                                                        { x: currentCoordinate.x, y: currentCoordinate[figure.key] },
                                                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- ignore
                                                        { x: nextCoordinate.x, y: nextCoordinate[figure.key] }
                                                    ],
                                                    styles: figureStyles
                                                });
                                            }
                                            break;
                                        }
                                    }
                                }
                                const type = figure.type;
                                if (isValid(attrs) && type !== 'line') {
                                    this.createFigure({
                                        name: type === 'bar' ? 'rect' : type,
                                        attrs,
                                        styles: figureStyles
                                    })?.draw(ctx);
                                }
                            }
                        });
                    });
                    // merge line and render
                    lines.forEach(items => {
                        if (items.length > 1) {
                            const mergeLines = [
                                {
                                    coordinates: [items[0].coordinates[0], items[0].coordinates[1]],
                                    styles: items[0].styles
                                }
                            ];
                            for (let i = 1; i < items.length; i++) {
                                const lastMergeLine = mergeLines[mergeLines.length - 1];
                                const current = items[i];
                                const lastMergeLineLastCoordinate = lastMergeLine.coordinates[lastMergeLine.coordinates.length - 1];
                                if (lastMergeLineLastCoordinate.x === current.coordinates[0].x &&
                                    lastMergeLineLastCoordinate.y === current.coordinates[0].y &&
                                    lastMergeLine.styles.style === current.styles.style &&
                                    lastMergeLine.styles.color === current.styles.color &&
                                    lastMergeLine.styles.size === current.styles.size &&
                                    lastMergeLine.styles.smooth === current.styles.smooth &&
                                    lastMergeLine.styles.dashedValue?.[0] === current.styles.dashedValue?.[0] &&
                                    lastMergeLine.styles.dashedValue?.[1] === current.styles.dashedValue?.[1]) {
                                    lastMergeLine.coordinates.push(current.coordinates[1]);
                                }
                                else {
                                    mergeLines.push({
                                        coordinates: [current.coordinates[0], current.coordinates[1]],
                                        styles: current.styles
                                    });
                                }
                            }
                            mergeLines.forEach(({ coordinates, styles }) => {
                                this.createFigure({
                                    name: 'line',
                                    attrs: { coordinates },
                                    styles
                                })?.draw(ctx);
                            });
                        }
                    });
                }
            }
        });
        ctx.restore();
    }
}

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
class CrosshairLineView extends View {
    drawImp(ctx) {
        const widget = this.getWidget();
        const pane = widget.getPane();
        const bounding = widget.getBounding();
        const chartStore = widget.getPane().getChart().getChartStore();
        const crosshair = chartStore.getCrosshair();
        const styles = chartStore.getStyles().crosshair;
        if (isString(crosshair.paneId) && styles.show) {
            if (crosshair.paneId === pane.getId()) {
                const y = crosshair.y;
                this._drawLine(ctx, [
                    { x: 0, y },
                    { x: bounding.width, y }
                ], styles.horizontal);
            }
            const x = crosshair.realX;
            this._drawLine(ctx, [
                { x, y: 0 },
                { x, y: bounding.height }
            ], styles.vertical);
        }
    }
    _drawLine(ctx, coordinates, styles) {
        if (styles.show) {
            const lineStyles = styles.line;
            if (lineStyles.show) {
                this.createFigure({
                    name: 'line',
                    attrs: { coordinates },
                    styles: lineStyles
                })?.draw(ctx);
            }
        }
    }
}

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
class IndicatorTooltipView extends View {
    _activeFeatureInfo = null;
    _featureClickEvent = (type, featureInfo) => () => {
        const pane = this.getWidget().getPane();
        pane.getChart().getChartStore().executeAction(type, featureInfo);
        return true;
    };
    _featureMouseMoveEvent = (featureInfo) => () => {
        this._activeFeatureInfo = featureInfo;
        return true;
    };
    constructor(widget) {
        super(widget);
        this.registerEvent('mouseMoveEvent', _ => {
            this._activeFeatureInfo = null;
            return false;
        });
    }
    drawImp(ctx) {
        const widget = this.getWidget();
        const pane = widget.getPane();
        const chartStore = pane.getChart().getChartStore();
        const crosshair = chartStore.getCrosshair();
        if (isValid(crosshair.kLineData)) {
            const bounding = widget.getBounding();
            const { offsetLeft, offsetTop, offsetRight } = chartStore.getStyles().indicator.tooltip;
            this.drawIndicatorTooltip(ctx, offsetLeft, offsetTop, bounding.width - offsetRight);
        }
    }
    drawIndicatorTooltip(ctx, left, top, maxWidth) {
        const pane = this.getWidget().getPane();
        const chartStore = pane.getChart().getChartStore();
        const styles = chartStore.getStyles().indicator;
        const tooltipStyles = styles.tooltip;
        if (this.isDrawTooltip(chartStore.getCrosshair(), tooltipStyles)) {
            const indicators = chartStore.getIndicatorsByPaneId(pane.getId());
            const tooltipTitleStyles = tooltipStyles.title;
            const tooltipLegendStyles = tooltipStyles.legend;
            indicators.forEach(indicator => {
                let prevRowHeight = 0;
                const coordinate = { x: left, y: top };
                const { name, calcParamsText, legends, features: featuresStyles } = this.getIndicatorTooltipData(indicator);
                const nameValid = name.length > 0;
                const legendValid = legends.length > 0;
                if (nameValid || legendValid) {
                    const features = this.classifyTooltipFeatures(featuresStyles);
                    prevRowHeight = this.drawStandardTooltipFeatures(ctx, features[0], coordinate, indicator, left, prevRowHeight, maxWidth);
                    if (nameValid) {
                        let text = name;
                        if (calcParamsText.length > 0) {
                            text = `${text}${calcParamsText}`;
                        }
                        const color = tooltipTitleStyles.color;
                        prevRowHeight = this.drawStandardTooltipLegends(ctx, [
                            {
                                title: { text: '', color },
                                value: { text, color }
                            }
                        ], coordinate, left, prevRowHeight, maxWidth, tooltipTitleStyles);
                    }
                    prevRowHeight = this.drawStandardTooltipFeatures(ctx, features[1], coordinate, indicator, left, prevRowHeight, maxWidth);
                    if (legendValid) {
                        prevRowHeight = this.drawStandardTooltipLegends(ctx, legends, coordinate, left, prevRowHeight, maxWidth, tooltipLegendStyles);
                    }
                    // draw right features
                    prevRowHeight = this.drawStandardTooltipFeatures(ctx, features[2], coordinate, indicator, left, prevRowHeight, maxWidth);
                    top = coordinate.y + prevRowHeight;
                }
            });
        }
        return top;
    }
    drawStandardTooltipFeatures(ctx, features, coordinate, indicator, left, prevRowHeight, maxWidth) {
        if (features.length > 0) {
            let width = 0;
            let height = 0;
            features.forEach(feature => {
                const { marginLeft = 0, marginTop = 0, marginRight = 0, marginBottom = 0, paddingLeft = 0, paddingTop = 0, paddingRight = 0, paddingBottom = 0, size = 0, type, content } = feature;
                let contentWidth = 0;
                if (type === 'icon_font') {
                    const iconFont = content;
                    ctx.font = createFont(size, 'normal', iconFont.family);
                    contentWidth = ctx.measureText(iconFont.code).width;
                }
                else {
                    contentWidth = size;
                }
                width += (marginLeft + paddingLeft + contentWidth + paddingRight + marginRight);
                height = Math.max(height, marginTop + paddingTop + size + paddingBottom + marginBottom);
            });
            if (coordinate.x + width > maxWidth) {
                coordinate.x = left;
                coordinate.y += prevRowHeight;
                prevRowHeight = height;
            }
            else {
                prevRowHeight = Math.max(prevRowHeight, height);
            }
            const pane = this.getWidget().getPane();
            const paneId = pane.getId();
            features.forEach(feature => {
                const { marginLeft = 0, marginTop = 0, marginRight = 0, paddingLeft = 0, paddingTop = 0, paddingRight = 0, paddingBottom = 0, backgroundColor, activeBackgroundColor, borderRadius, size = 0, color, activeColor, type, content } = feature;
                let finalColor = color;
                let finalBackgroundColor = backgroundColor;
                if (this._activeFeatureInfo?.paneId === paneId &&
                    this._activeFeatureInfo.indicator?.id === indicator?.id &&
                    this._activeFeatureInfo.feature.id === feature.id) {
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ignore
                    finalColor = activeColor ?? color;
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ignore
                    finalBackgroundColor = activeBackgroundColor ?? backgroundColor;
                }
                let actionType = 'onCandleTooltipFeatureClick';
                const featureInfo = {
                    paneId, feature
                };
                if (isValid(indicator)) {
                    actionType = 'onIndicatorTooltipFeatureClick';
                    featureInfo.indicator = indicator;
                }
                const eventHandler = {
                    mouseDownEvent: this._featureClickEvent(actionType, featureInfo),
                    mouseMoveEvent: this._featureMouseMoveEvent(featureInfo)
                };
                let contentWidth = 0;
                if (type === 'icon_font') {
                    const iconFont = content;
                    this.createFigure({
                        name: 'text',
                        attrs: { text: iconFont.code, x: coordinate.x + marginLeft, y: coordinate.y + marginTop },
                        styles: {
                            paddingLeft,
                            paddingTop,
                            paddingRight,
                            paddingBottom,
                            borderRadius,
                            size,
                            family: iconFont.family,
                            color: finalColor,
                            backgroundColor: finalBackgroundColor
                        }
                    }, eventHandler)?.draw(ctx);
                    contentWidth = ctx.measureText(iconFont.code).width;
                }
                else {
                    this.createFigure({
                        name: 'rect',
                        attrs: { x: coordinate.x + marginLeft, y: coordinate.y + marginTop, width: size, height: size },
                        styles: {
                            paddingLeft,
                            paddingTop,
                            paddingRight,
                            paddingBottom,
                            color: finalBackgroundColor
                        }
                    }, eventHandler)?.draw(ctx);
                    const path = content;
                    this.createFigure({
                        name: 'path',
                        attrs: { path: path.path, x: coordinate.x + marginLeft + paddingLeft, y: coordinate.y + marginTop + paddingTop, width: size, height: size },
                        styles: {
                            style: path.style,
                            lineWidth: path.lineWidth,
                            color: finalColor
                        }
                    })?.draw(ctx);
                    contentWidth = size;
                }
                coordinate.x += (marginLeft + paddingLeft + contentWidth + paddingRight + marginRight);
            });
        }
        return prevRowHeight;
    }
    drawStandardTooltipLegends(ctx, legends, coordinate, left, prevRowHeight, maxWidth, styles) {
        if (legends.length > 0) {
            const { marginLeft, marginTop, marginRight, marginBottom, size, family, weight } = styles;
            ctx.font = createFont(size, weight, family);
            legends.forEach(data => {
                const title = data.title;
                const value = data.value;
                const titleTextWidth = ctx.measureText(title.text).width;
                const valueTextWidth = ctx.measureText(value.text).width;
                const totalTextWidth = titleTextWidth + valueTextWidth;
                const h = marginTop + size + marginBottom;
                if (coordinate.x + marginLeft + totalTextWidth + marginRight > maxWidth) {
                    coordinate.x = left;
                    coordinate.y += prevRowHeight;
                    prevRowHeight = h;
                }
                else {
                    prevRowHeight = Math.max(prevRowHeight, h);
                }
                if (title.text.length > 0) {
                    this.createFigure({
                        name: 'text',
                        attrs: { x: coordinate.x + marginLeft, y: coordinate.y + marginTop, text: title.text },
                        styles: { color: title.color, size, family, weight }
                    })?.draw(ctx);
                }
                this.createFigure({
                    name: 'text',
                    attrs: { x: coordinate.x + marginLeft + titleTextWidth, y: coordinate.y + marginTop, text: value.text },
                    styles: { color: value.color, size, family, weight }
                })?.draw(ctx);
                coordinate.x += (marginLeft + totalTextWidth + marginRight);
            });
        }
        return prevRowHeight;
    }
    isDrawTooltip(crosshair, styles) {
        const showRule = styles.showRule;
        return showRule === 'always' ||
            (showRule === 'follow_cross' && isString(crosshair.paneId));
    }
    getIndicatorTooltipData(indicator) {
        const chartStore = this.getWidget().getPane().getChart().getChartStore();
        const styles = chartStore.getStyles().indicator;
        const tooltipStyles = styles.tooltip;
        const tooltipTitleStyles = tooltipStyles.title;
        let name = '';
        let calcParamsText = '';
        if (tooltipTitleStyles.show) {
            if (tooltipTitleStyles.showName) {
                name = indicator.shortName;
            }
            if (tooltipTitleStyles.showParams) {
                const calcParams = indicator.calcParams;
                if (calcParams.length > 0) {
                    calcParamsText = `(${calcParams.join(',')})`;
                }
            }
        }
        const tooltipData = { name, calcParamsText, legends: [], features: tooltipStyles.features };
        const dataIndex = chartStore.getCrosshair().dataIndex;
        const result = indicator.result;
        const formatter = chartStore.getInnerFormatter();
        const decimalFold = chartStore.getDecimalFold();
        const thousandsSeparator = chartStore.getThousandsSeparator();
        const legends = [];
        if (indicator.visible) {
            const data = result[dataIndex] ?? {};
            const defaultValue = tooltipStyles.legend.defaultValue;
            eachFigures(indicator, dataIndex, styles, (figure, figureStyles) => {
                if (isString(figure.title)) {
                    const color = figureStyles.color;
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment  -- ignore
                    let value = data[figure.key];
                    if (isNumber(value)) {
                        value = formatPrecision(value, indicator.precision);
                        if (indicator.shouldFormatBigNumber) {
                            value = formatter.formatBigNumber(value);
                        }
                        value = decimalFold.format(thousandsSeparator.format(value));
                    }
                    legends.push({ title: { text: figure.title, color }, value: { text: (value ?? defaultValue), color } });
                }
            });
            tooltipData.legends = legends;
        }
        if (isFunction(indicator.createTooltipDataSource)) {
            const widget = this.getWidget();
            const pane = widget.getPane();
            const chart = pane.getChart();
            const { name: customName, calcParamsText: customCalcParamsText, legends: customLegends, features: customFeatures } = indicator.createTooltipDataSource({
                chart,
                indicator,
                crosshair: chartStore.getCrosshair(),
                bounding: widget.getBounding(),
                xAxis: pane.getChart().getXAxisPane().getAxisComponent(),
                yAxis: pane.getAxisComponent()
            });
            if (tooltipTitleStyles.show) {
                if (isString(customName) && tooltipTitleStyles.showName) {
                    tooltipData.name = customName;
                }
                if (isString(customCalcParamsText) && tooltipTitleStyles.showParams) {
                    tooltipData.calcParamsText = customCalcParamsText;
                }
            }
            if (isValid(customFeatures)) {
                tooltipData.features = customFeatures;
            }
            if (isValid(customLegends) && indicator.visible) {
                const optimizedLegends = [];
                const color = styles.tooltip.legend.color;
                customLegends.forEach(data => {
                    let title = { text: '', color };
                    if (isObject(data.title)) {
                        title = data.title;
                    }
                    else {
                        title.text = data.title;
                    }
                    let value = { text: '', color };
                    if (isObject(data.value)) {
                        value = data.value;
                    }
                    else {
                        value.text = data.value;
                    }
                    if (isNumber(Number(value.text))) {
                        value.text = decimalFold.format(thousandsSeparator.format(value.text));
                    }
                    optimizedLegends.push({ title, value });
                });
                tooltipData.legends = optimizedLegends;
            }
        }
        return tooltipData;
    }
    classifyTooltipFeatures(features) {
        const leftFeatures = [];
        const middleFeatures = [];
        const rightFeatures = [];
        features.forEach(feature => {
            switch (feature.position) {
                case 'left': {
                    leftFeatures.push(feature);
                    break;
                }
                case 'middle': {
                    middleFeatures.push(feature);
                    break;
                }
                case 'right': {
                    rightFeatures.push(feature);
                    break;
                }
            }
        });
        return [leftFeatures, middleFeatures, rightFeatures];
    }
}

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
class OverlayView extends View {
    constructor(widget) {
        super(widget);
        this._initEvent();
    }
    _initEvent() {
        const widget = this.getWidget();
        const pane = widget.getPane();
        const paneId = pane.getId();
        const chart = pane.getChart();
        const chartStore = chart.getChartStore();
        this.registerEvent('mouseMoveEvent', event => {
            const progressOverlayInfo = chartStore.getProgressOverlayInfo();
            if (progressOverlayInfo !== null) {
                const overlay = progressOverlayInfo.overlay;
                let progressOverlayPaneId = progressOverlayInfo.paneId;
                if (overlay.isStart()) {
                    chartStore.updateProgressOverlayInfo(paneId);
                    progressOverlayPaneId = paneId;
                }
                const index = overlay.points.length - 1;
                if (overlay.isDrawing() && progressOverlayPaneId === paneId) {
                    overlay.eventMoveForDrawing(this._coordinateToPoint(overlay, event));
                    overlay.onDrawing?.({ chart, overlay, ...event });
                }
                return this._figureMouseMoveEvent(overlay, 'point', index, { key: `${OVERLAY_FIGURE_KEY_PREFIX}point_${index}`, type: 'circle', attrs: {} })(event);
            }
            chartStore.setHoverOverlayInfo({
                paneId,
                overlay: null,
                figureType: 'none',
                figureIndex: -1,
                figure: null
            }, (o, f) => this._processOverlayMouseEnterEvent(o, f, event), (o, f) => this._processOverlayMouseLeaveEvent(o, f, event));
            widget.setForceCursor(null);
            return false;
        }).registerEvent('mouseClickEvent', event => {
            const progressOverlayInfo = chartStore.getProgressOverlayInfo();
            if (progressOverlayInfo !== null) {
                const overlay = progressOverlayInfo.overlay;
                let progressOverlayPaneId = progressOverlayInfo.paneId;
                if (overlay.isStart()) {
                    chartStore.updateProgressOverlayInfo(paneId, true);
                    progressOverlayPaneId = paneId;
                }
                const index = overlay.points.length - 1;
                if (overlay.isDrawing() && progressOverlayPaneId === paneId) {
                    overlay.eventMoveForDrawing(this._coordinateToPoint(overlay, event));
                    overlay.onDrawing?.({ chart, overlay, ...event });
                    overlay.nextStep();
                    if (!overlay.isDrawing()) {
                        chartStore.progressOverlayComplete();
                        overlay.onDrawEnd?.({ chart, overlay, ...event });
                    }
                }
                return this._figureMouseClickEvent(overlay, 'point', index, {
                    key: `${OVERLAY_FIGURE_KEY_PREFIX}point_${index}`,
                    type: 'circle',
                    attrs: {}
                })(event);
            }
            chartStore.setClickOverlayInfo({
                paneId,
                overlay: null,
                figureType: 'none',
                figureIndex: -1,
                figure: null
            }, (o, f) => this._processOverlaySelectedEvent(o, f, event), (o, f) => this._processOverlayDeselectedEvent(o, f, event));
            return false;
        }).registerEvent('mouseDoubleClickEvent', event => {
            const progressOverlayInfo = chartStore.getProgressOverlayInfo();
            if (progressOverlayInfo !== null) {
                const overlay = progressOverlayInfo.overlay;
                const progressOverlayPaneId = progressOverlayInfo.paneId;
                if (overlay.isDrawing() && progressOverlayPaneId === paneId) {
                    overlay.forceComplete();
                    if (!overlay.isDrawing()) {
                        chartStore.progressOverlayComplete();
                        overlay.onDrawEnd?.({ chart, overlay, ...event });
                    }
                }
                const index = overlay.points.length - 1;
                return this._figureMouseClickEvent(overlay, 'point', index, {
                    key: `${OVERLAY_FIGURE_KEY_PREFIX}point_${index}`,
                    type: 'circle',
                    attrs: {}
                })(event);
            }
            return false;
        }).registerEvent('mouseRightClickEvent', event => {
            const progressOverlayInfo = chartStore.getProgressOverlayInfo();
            if (progressOverlayInfo !== null) {
                const overlay = progressOverlayInfo.overlay;
                if (overlay.isDrawing()) {
                    const index = overlay.points.length - 1;
                    return this._figureMouseRightClickEvent(overlay, 'point', index, {
                        key: `${OVERLAY_FIGURE_KEY_PREFIX}point_${index}`,
                        type: 'circle',
                        attrs: {}
                    })(event);
                }
            }
            return false;
        }).registerEvent('mouseUpEvent', event => {
            const { overlay, figure } = chartStore.getPressedOverlayInfo();
            if (overlay !== null) {
                if (checkOverlayFigureEvent('onPressedMoveEnd', figure)) {
                    overlay.onPressedMoveEnd?.({ chart, overlay, figure: figure ?? undefined, ...event });
                }
            }
            chartStore.setPressedOverlayInfo({
                paneId,
                overlay: null,
                figureType: 'none',
                figureIndex: -1,
                figure: null
            });
            return false;
        }).registerEvent('pressedMouseMoveEvent', event => {
            const { overlay, figureType, figureIndex, figure } = chartStore.getPressedOverlayInfo();
            if (overlay !== null) {
                if (checkOverlayFigureEvent('onPressedMoving', figure)) {
                    if (!overlay.lock) {
                        const point = this._coordinateToPoint(overlay, event);
                        if (figureType === 'point') {
                            overlay.eventPressedPointMove(point, figureIndex);
                        }
                        else {
                            overlay.eventPressedOtherMove(point, this.getWidget().getPane().getChart().getChartStore());
                        }
                        let prevented = false;
                        overlay.onPressedMoving?.({ chart, overlay, figure: figure ?? undefined, ...event, preventDefault: () => { prevented = true; } });
                        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ignore
                        if (prevented) {
                            this.getWidget().setForceCursor(null);
                        }
                        else {
                            this.getWidget().setForceCursor('pointer');
                        }
                    }
                    return true;
                }
            }
            this.getWidget().setForceCursor(null);
            return false;
        });
    }
    _createFigureEvents(overlay, figureType, figureIndex, figure) {
        if (overlay.isDrawing()) {
            return null;
        }
        return {
            mouseMoveEvent: this._figureMouseMoveEvent(overlay, figureType, figureIndex, figure),
            mouseDownEvent: this._figureMouseDownEvent(overlay, figureType, figureIndex, figure),
            mouseClickEvent: this._figureMouseClickEvent(overlay, figureType, figureIndex, figure),
            mouseRightClickEvent: this._figureMouseRightClickEvent(overlay, figureType, figureIndex, figure),
            mouseDoubleClickEvent: this._figureMouseDoubleClickEvent(overlay, figureType, figureIndex, figure)
        };
    }
    _processOverlayMouseEnterEvent(overlay, figure, event) {
        if (isFunction(overlay.onMouseEnter) && checkOverlayFigureEvent('onMouseEnter', figure)) {
            overlay.onMouseEnter({ chart: this.getWidget().getPane().getChart(), overlay, figure: figure ?? undefined, ...event });
            return true;
        }
        return false;
    }
    _processOverlayMouseLeaveEvent(overlay, figure, event) {
        if (isFunction(overlay.onMouseLeave) && checkOverlayFigureEvent('onMouseLeave', figure)) {
            overlay.onMouseLeave({ chart: this.getWidget().getPane().getChart(), overlay, figure: figure ?? undefined, ...event });
            return true;
        }
        return false;
    }
    _processOverlaySelectedEvent(overlay, figure, event) {
        if (checkOverlayFigureEvent('onSelected', figure)) {
            overlay.onSelected?.({ chart: this.getWidget().getPane().getChart(), overlay, figure: figure ?? undefined, ...event });
            return true;
        }
        return false;
    }
    _processOverlayDeselectedEvent(overlay, figure, event) {
        if (checkOverlayFigureEvent('onDeselected', figure)) {
            overlay.onDeselected?.({ chart: this.getWidget().getPane().getChart(), overlay, figure: figure ?? undefined, ...event });
            return true;
        }
        return false;
    }
    _figureMouseMoveEvent(overlay, figureType, figureIndex, figure) {
        return (event) => {
            const pane = this.getWidget().getPane();
            const check = !overlay.isDrawing() && checkOverlayFigureEvent('onMouseMove', figure);
            if (check) {
                let prevented = false;
                overlay.onMouseMove?.({ chart: pane.getChart(), overlay, figure, ...event, preventDefault: () => { prevented = true; } });
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ignore
                if (prevented) {
                    this.getWidget().setForceCursor(null);
                }
                else {
                    this.getWidget().setForceCursor('pointer');
                }
            }
            pane.getChart().getChartStore().setHoverOverlayInfo({ paneId: pane.getId(), overlay, figureType, figure, figureIndex }, (o, f) => this._processOverlayMouseEnterEvent(o, f, event), (o, f) => this._processOverlayMouseLeaveEvent(o, f, event));
            return check;
        };
    }
    _figureMouseDownEvent(overlay, figureType, figureIndex, figure) {
        return (event) => {
            const pane = this.getWidget().getPane();
            const paneId = pane.getId();
            overlay.startPressedMove(this._coordinateToPoint(overlay, event));
            if (checkOverlayFigureEvent('onPressedMoveStart', figure)) {
                overlay.onPressedMoveStart?.({ chart: pane.getChart(), overlay, figure, ...event });
                pane.getChart().getChartStore().setPressedOverlayInfo({ paneId, overlay, figureType, figureIndex, figure });
                return !overlay.isDrawing();
            }
            return false;
        };
    }
    _figureMouseClickEvent(overlay, figureType, figureIndex, figure) {
        return (event) => {
            const pane = this.getWidget().getPane();
            const paneId = pane.getId();
            const check = !overlay.isDrawing() && checkOverlayFigureEvent('onClick', figure);
            if (check) {
                overlay.onClick?.({ chart: this.getWidget().getPane().getChart(), overlay, figure, ...event });
            }
            pane.getChart().getChartStore().setClickOverlayInfo({ paneId, overlay, figureType, figureIndex, figure }, (o, f) => this._processOverlaySelectedEvent(o, f, event), (o, f) => this._processOverlayDeselectedEvent(o, f, event));
            return check;
        };
    }
    _figureMouseDoubleClickEvent(overlay, _figureType, _figureIndex, figure) {
        return (event) => {
            if (checkOverlayFigureEvent('onDoubleClick', figure)) {
                overlay.onDoubleClick?.({ ...event, chart: this.getWidget().getPane().getChart(), figure, overlay });
                return !overlay.isDrawing();
            }
            return false;
        };
    }
    _figureMouseRightClickEvent(overlay, _figureType, _figureIndex, figure) {
        return (event) => {
            if (checkOverlayFigureEvent('onRightClick', figure)) {
                let prevented = false;
                overlay.onRightClick?.({ chart: this.getWidget().getPane().getChart(), overlay, figure, ...event, preventDefault: () => { prevented = true; } });
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ignore
                if (!prevented) {
                    this.getWidget().getPane().getChart().getChartStore().removeOverlay(overlay);
                }
                return !overlay.isDrawing();
            }
            return false;
        };
    }
    _coordinateToPoint(o, coordinate) {
        const point = {};
        const pane = this.getWidget().getPane();
        const chart = pane.getChart();
        const paneId = pane.getId();
        const chartStore = chart.getChartStore();
        if (this.coordinateToPointTimestampDataIndexFlag()) {
            const xAxis = chart.getXAxisPane().getAxisComponent();
            const dataIndex = xAxis.convertFromPixel(coordinate.x);
            const timestamp = chartStore.dataIndexToTimestamp(dataIndex) ?? undefined;
            point.timestamp = timestamp;
            point.dataIndex = dataIndex;
        }
        if (this.coordinateToPointValueFlag()) {
            const yAxis = pane.getAxisComponent();
            let value = yAxis.convertFromPixel(coordinate.y);
            if (o.mode !== 'normal' && paneId === PaneIdConstants.CANDLE && isNumber(point.dataIndex)) {
                const kLineData = chartStore.getDataByDataIndex(point.dataIndex);
                if (kLineData !== null) {
                    const modeSensitivity = o.modeSensitivity;
                    if (value > kLineData.high) {
                        if (o.mode === 'weak_magnet') {
                            const highY = yAxis.convertToPixel(kLineData.high);
                            const buffValue = yAxis.convertFromPixel(highY - modeSensitivity);
                            if (value < buffValue) {
                                value = kLineData.high;
                            }
                        }
                        else {
                            value = kLineData.high;
                        }
                    }
                    else if (value < kLineData.low) {
                        if (o.mode === 'weak_magnet') {
                            const lowY = yAxis.convertToPixel(kLineData.low);
                            const buffValue = yAxis.convertFromPixel(lowY - modeSensitivity);
                            if (value > buffValue) {
                                value = kLineData.low;
                            }
                        }
                        else {
                            value = kLineData.low;
                        }
                    }
                    else {
                        const max = Math.max(kLineData.open, kLineData.close);
                        const min = Math.min(kLineData.open, kLineData.close);
                        if (value > max) {
                            if (value - max < kLineData.high - value) {
                                value = max;
                            }
                            else {
                                value = kLineData.high;
                            }
                        }
                        else if (value < min) {
                            if (value - kLineData.low < min - value) {
                                value = kLineData.low;
                            }
                            else {
                                value = min;
                            }
                        }
                        else if (max - value < value - min) {
                            value = max;
                        }
                        else {
                            value = min;
                        }
                    }
                }
            }
            point.value = value;
        }
        return point;
    }
    coordinateToPointValueFlag() {
        return true;
    }
    coordinateToPointTimestampDataIndexFlag() {
        return true;
    }
    dispatchEvent(name, event) {
        if (this.getWidget().getPane().getChart().getChartStore().isOverlayDrawing()) {
            return this.onEvent(name, event);
        }
        return super.dispatchEvent(name, event);
    }
    drawImp(ctx) {
        const overlays = this.getCompleteOverlays();
        overlays.forEach(overlay => {
            if (overlay.visible) {
                this._drawOverlay(ctx, overlay);
            }
        });
        const progressOverlay = this.getProgressOverlay();
        if (isValid(progressOverlay) && progressOverlay.visible) {
            this._drawOverlay(ctx, progressOverlay);
        }
    }
    _drawOverlay(ctx, overlay) {
        const { points } = overlay;
        const pane = this.getWidget().getPane();
        const chart = pane.getChart();
        const chartStore = chart.getChartStore();
        const yAxis = pane.getAxisComponent();
        const xAxis = chart.getXAxisPane().getAxisComponent();
        const coordinates = points.map(point => {
            let dataIndex = null;
            if (isNumber(point.timestamp)) {
                dataIndex = chartStore.timestampToDataIndex(point.timestamp);
            }
            const coordinate = { x: 0, y: 0 };
            if (isNumber(dataIndex)) {
                coordinate.x = xAxis.convertToPixel(dataIndex);
            }
            if (isNumber(point.value)) {
                coordinate.y = yAxis?.convertToPixel(point.value) ?? 0;
            }
            return coordinate;
        });
        if (coordinates.length > 0) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- ignore
            // @ts-expect-error
            const figures = [].concat(this.getFigures(overlay, coordinates));
            this.drawFigures(ctx, overlay, figures);
        }
        this.drawDefaultFigures(ctx, overlay, coordinates);
    }
    drawFigures(ctx, overlay, figures) {
        const defaultStyles = this.getWidget().getPane().getChart().getStyles().overlay;
        figures.forEach((figure, figureIndex) => {
            const { type, styles, attrs } = figure;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- ignore
            // @ts-expect-error
            const attrsArray = [].concat(attrs);
            attrsArray.forEach((ats) => {
                const events = this._createFigureEvents(overlay, 'other', figureIndex, figure);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- ignore
                // @ts-expect-error
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- ignore
                const ss = { ...defaultStyles[type], ...overlay.styles?.[type], ...styles };
                this.createFigure({
                    name: type, attrs: ats, styles: ss
                }, events ?? undefined)?.draw(ctx);
            });
        });
    }
    getCompleteOverlays() {
        const pane = this.getWidget().getPane();
        return pane.getChart().getChartStore().getOverlaysByPaneId(pane.getId());
    }
    getProgressOverlay() {
        const pane = this.getWidget().getPane();
        const info = pane.getChart().getChartStore().getProgressOverlayInfo();
        if (isValid(info) && info.paneId === pane.getId()) {
            return info.overlay;
        }
        return null;
    }
    getFigures(o, coordinates) {
        const widget = this.getWidget();
        const pane = widget.getPane();
        const chart = pane.getChart();
        const yAxis = pane.getAxisComponent();
        const xAxis = chart.getXAxisPane().getAxisComponent();
        const bounding = widget.getBounding();
        return o.createPointFigures?.({ chart, overlay: o, coordinates, bounding, xAxis, yAxis }) ?? [];
    }
    drawDefaultFigures(ctx, overlay, coordinates) {
        if (overlay.needDefaultPointFigure) {
            const chartStore = this.getWidget().getPane().getChart().getChartStore();
            const hoverOverlayInfo = chartStore.getHoverOverlayInfo();
            const clickOverlayInfo = chartStore.getClickOverlayInfo();
            if ((hoverOverlayInfo.overlay?.id === overlay.id && hoverOverlayInfo.figureType !== 'none') ||
                (clickOverlayInfo.overlay?.id === overlay.id && clickOverlayInfo.figureType !== 'none')) {
                const defaultStyles = chartStore.getStyles().overlay;
                const styles = overlay.styles;
                const pointStyles = { ...defaultStyles.point, ...styles?.point };
                coordinates.forEach(({ x, y }, index) => {
                    let radius = pointStyles.radius;
                    let color = pointStyles.color;
                    let borderColor = pointStyles.borderColor;
                    let borderSize = pointStyles.borderSize;
                    if (hoverOverlayInfo.overlay?.id === overlay.id &&
                        hoverOverlayInfo.figureType === 'point' &&
                        hoverOverlayInfo.figure?.key === `${OVERLAY_FIGURE_KEY_PREFIX}point_${index}`) {
                        radius = pointStyles.activeRadius;
                        color = pointStyles.activeColor;
                        borderColor = pointStyles.activeBorderColor;
                        borderSize = pointStyles.activeBorderSize;
                    }
                    this.createFigure({
                        name: 'circle',
                        attrs: { x, y, r: radius + borderSize },
                        styles: { color: borderColor }
                    }, this._createFigureEvents(overlay, 'point', index, {
                        key: `${OVERLAY_FIGURE_KEY_PREFIX}point_${index}`,
                        type: 'circle',
                        attrs: { x, y, r: radius + borderSize },
                        styles: { color: borderColor }
                    }) ?? undefined)?.draw(ctx);
                    this.createFigure({
                        name: 'circle',
                        attrs: { x, y, r: radius },
                        styles: { color }
                    })?.draw(ctx);
                });
            }
        }
    }
}

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
class IndicatorWidget extends DrawWidget {
    _gridView = new GridView(this);
    _indicatorView = new IndicatorView(this);
    _crosshairLineView = new CrosshairLineView(this);
    _tooltipView = this.createTooltipView();
    _overlayView = new OverlayView(this);
    constructor(rootContainer, pane) {
        super(rootContainer, pane);
        this.addChild(this._tooltipView);
        this.addChild(this._overlayView);
    }
    getName() {
        return WidgetNameConstants.MAIN;
    }
    updateMain(ctx) {
        if (this.getPane().getOptions().state !== 'minimize') {
            this.updateMainContent(ctx);
            this._indicatorView.draw(ctx);
            this._gridView.draw(ctx);
        }
    }
    createTooltipView() {
        return new IndicatorTooltipView(this);
    }
    updateMainContent(_ctx) {
        // to do it
    }
    updateOverlayContent(_ctx) {
        // to do it
    }
    updateOverlay(ctx) {
        if (this.getPane().getOptions().state !== 'minimize') {
            this._overlayView.draw(ctx);
            this._crosshairLineView.draw(ctx);
            this.updateOverlayContent(ctx);
        }
        this._tooltipView.draw(ctx);
    }
}

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
class CandleAreaView extends ChildrenView {
    _ripplePoint = this.createFigure({
        name: 'circle',
        attrs: {
            x: 0,
            y: 0,
            r: 0
        },
        styles: {
            style: 'fill'
        }
    });
    _animationFrameTime = 0;
    _animation = new Animation({ iterationCount: Infinity }).doFrame((time) => {
        this._animationFrameTime = time;
        const pane = this.getWidget().getPane();
        pane.getChart().updatePane(0 /* UpdateLevel.Main */, pane.getId());
    });
    drawImp(ctx) {
        const widget = this.getWidget();
        const pane = widget.getPane();
        const chart = pane.getChart();
        const dataList = chart.getDataList();
        const lastDataIndex = dataList.length - 1;
        const bounding = widget.getBounding();
        const yAxis = pane.getAxisComponent();
        const styles = chart.getStyles().candle.area;
        const coordinates = [];
        let minY = Number.MAX_SAFE_INTEGER;
        let areaStartX = Number.MIN_SAFE_INTEGER;
        let ripplePointCoordinate = null;
        this.eachChildren((data) => {
            const x = data.x;
            const { current: kLineData } = data.data;
            const value = kLineData?.[styles.value];
            if (isNumber(value)) {
                const y = yAxis.convertToPixel(value);
                if (areaStartX === Number.MIN_SAFE_INTEGER) {
                    areaStartX = x;
                }
                coordinates.push({ x, y });
                minY = Math.min(minY, y);
                if (data.dataIndex === lastDataIndex) {
                    ripplePointCoordinate = { x, y };
                }
            }
        });
        if (coordinates.length > 0) {
            this.createFigure({
                name: 'line',
                attrs: { coordinates },
                styles: {
                    color: styles.lineColor,
                    size: styles.lineSize,
                    smooth: styles.smooth
                }
            })?.draw(ctx);
            // render area
            const backgroundColor = styles.backgroundColor;
            let color = '';
            if (isArray(backgroundColor)) {
                const gradient = ctx.createLinearGradient(0, bounding.height, 0, minY);
                try {
                    backgroundColor.forEach(({ offset, color }) => {
                        gradient.addColorStop(offset, color);
                    });
                }
                catch (e) {
                }
                color = gradient;
            }
            else {
                color = backgroundColor;
            }
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(areaStartX, bounding.height);
            ctx.lineTo(coordinates[0].x, coordinates[0].y);
            lineTo(ctx, coordinates, styles.smooth);
            ctx.lineTo(coordinates[coordinates.length - 1].x, bounding.height);
            ctx.closePath();
            ctx.fill();
        }
        const pointStyles = styles.point;
        if (pointStyles.show && isValid(ripplePointCoordinate)) {
            this.createFigure({
                name: 'circle',
                attrs: {
                    x: ripplePointCoordinate.x,
                    y: ripplePointCoordinate.y,
                    r: pointStyles.radius
                },
                styles: {
                    style: 'fill',
                    color: pointStyles.color
                }
            })?.draw(ctx);
            let rippleRadius = pointStyles.rippleRadius;
            if (pointStyles.animation) {
                rippleRadius = pointStyles.radius + this._animationFrameTime / pointStyles.animationDuration * (pointStyles.rippleRadius - pointStyles.radius);
                this._animation.setDuration(pointStyles.animationDuration).start();
            }
            this._ripplePoint
                ?.setAttrs({
                x: ripplePointCoordinate.x,
                y: ripplePointCoordinate.y,
                r: rippleRadius
            })
                .setStyles({ style: 'fill', color: pointStyles.rippleColor }).draw(ctx);
        }
        else {
            this.stopAnimation();
        }
    }
    stopAnimation() {
        this._animation.stop();
    }
}

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
class CandleHighLowPriceView extends View {
    drawImp(ctx) {
        const widget = this.getWidget();
        const pane = widget.getPane();
        const chartStore = pane.getChart().getChartStore();
        const priceMarkStyles = chartStore.getStyles().candle.priceMark;
        const highPriceMarkStyles = priceMarkStyles.high;
        const lowPriceMarkStyles = priceMarkStyles.low;
        if (priceMarkStyles.show && (highPriceMarkStyles.show || lowPriceMarkStyles.show)) {
            const highestLowestPrice = chartStore.getVisibleRangeHighLowPrice();
            const precision = chartStore.getSymbol()?.pricePrecision ?? SymbolDefaultPrecisionConstants.PRICE;
            const yAxis = pane.getAxisComponent();
            const { price: high, x: highX } = highestLowestPrice[0];
            const { price: low, x: lowX } = highestLowestPrice[1];
            const highY = yAxis.convertToPixel(high);
            const lowY = yAxis.convertToPixel(low);
            const decimalFold = chartStore.getDecimalFold();
            const thousandsSeparator = chartStore.getThousandsSeparator();
            if (highPriceMarkStyles.show && high !== Number.MIN_SAFE_INTEGER) {
                this._drawMark(ctx, decimalFold.format(thousandsSeparator.format(formatPrecision(high, precision))), { x: highX, y: highY }, highY < lowY ? [-2, -5] : [2, 5], highPriceMarkStyles);
            }
            if (lowPriceMarkStyles.show && low !== Number.MAX_SAFE_INTEGER) {
                this._drawMark(ctx, decimalFold.format(thousandsSeparator.format(formatPrecision(low, precision))), { x: lowX, y: lowY }, highY < lowY ? [2, 5] : [-2, -5], lowPriceMarkStyles);
            }
        }
    }
    _drawMark(ctx, text, coordinate, offsets, styles) {
        const startX = coordinate.x;
        const startY = coordinate.y + offsets[0];
        this.createFigure({
            name: 'line',
            attrs: {
                coordinates: [
                    { x: startX - 2, y: startY + offsets[0] },
                    { x: startX, y: startY },
                    { x: startX + 2, y: startY + offsets[0] }
                ]
            },
            styles: { color: styles.color }
        })?.draw(ctx);
        let lineEndX = 0;
        let textStartX = 0;
        let textAlign = 'left';
        const { width } = this.getWidget().getBounding();
        if (startX > width / 2) {
            lineEndX = startX - 5;
            textStartX = lineEndX - styles.textOffset;
            textAlign = 'right';
        }
        else {
            lineEndX = startX + 5;
            textAlign = 'left';
            textStartX = lineEndX + styles.textOffset;
        }
        const y = startY + offsets[1];
        this.createFigure({
            name: 'line',
            attrs: {
                coordinates: [
                    { x: startX, y: startY },
                    { x: startX, y },
                    { x: lineEndX, y }
                ]
            },
            styles: { color: styles.color }
        })?.draw(ctx);
        this.createFigure({
            name: 'text',
            attrs: {
                x: textStartX,
                y,
                text,
                align: textAlign,
                baseline: 'middle'
            },
            styles: {
                color: styles.color,
                size: styles.textSize,
                family: styles.textFamily,
                weight: styles.textWeight
            }
        })?.draw(ctx);
    }
}

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
class CandleLastPriceView extends View {
    drawImp(ctx) {
        const widget = this.getWidget();
        const pane = widget.getPane();
        const bounding = widget.getBounding();
        const chartStore = pane.getChart().getChartStore();
        const priceMarkStyles = chartStore.getStyles().candle.priceMark;
        const lastPriceMarkStyles = priceMarkStyles.last;
        const lastPriceMarkLineStyles = lastPriceMarkStyles.line;
        if (priceMarkStyles.show && lastPriceMarkStyles.show && lastPriceMarkLineStyles.show) {
            const yAxis = pane.getAxisComponent();
            const dataList = chartStore.getDataList();
            const data = dataList[dataList.length - 1];
            if (isValid(data)) {
                const { close, open } = data;
                const comparePrice = lastPriceMarkStyles.compareRule === 'current_open' ? open : (dataList[dataList.length - 2]?.close ?? close);
                const priceY = yAxis.convertToNicePixel(close);
                let color = '';
                if (close > comparePrice) {
                    color = lastPriceMarkStyles.upColor;
                }
                else if (close < comparePrice) {
                    color = lastPriceMarkStyles.downColor;
                }
                else {
                    color = lastPriceMarkStyles.noChangeColor;
                }
                this.createFigure({
                    name: 'line',
                    attrs: {
                        coordinates: [
                            { x: 0, y: priceY },
                            { x: bounding.width, y: priceY }
                        ]
                    },
                    styles: {
                        style: lastPriceMarkLineStyles.style,
                        color,
                        size: lastPriceMarkLineStyles.size,
                        dashedValue: lastPriceMarkLineStyles.dashedValue
                    }
                })?.draw(ctx);
            }
        }
    }
}

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
class CandleTooltipView extends IndicatorTooltipView {
    drawImp(ctx) {
        const widget = this.getWidget();
        const chartStore = widget.getPane().getChart().getChartStore();
        const crosshair = chartStore.getCrosshair();
        if (isValid(crosshair.kLineData)) {
            const bounding = widget.getBounding();
            const styles = chartStore.getStyles();
            const candleStyles = styles.candle;
            const indicatorStyles = styles.indicator;
            if (candleStyles.tooltip.showType === 'rect' &&
                indicatorStyles.tooltip.showType === 'rect') {
                const isDrawCandleTooltip = this.isDrawTooltip(crosshair, candleStyles.tooltip);
                const isDrawIndicatorTooltip = this.isDrawTooltip(crosshair, indicatorStyles.tooltip);
                this._drawRectTooltip(ctx, isDrawCandleTooltip, isDrawIndicatorTooltip, candleStyles.tooltip.offsetTop);
            }
            else if (candleStyles.tooltip.showType === 'standard' &&
                indicatorStyles.tooltip.showType === 'standard') {
                const { offsetLeft, offsetTop, offsetRight } = candleStyles.tooltip;
                const maxWidth = bounding.width - offsetRight;
                const top = this._drawCandleStandardTooltip(ctx, offsetLeft, offsetTop, maxWidth);
                this.drawIndicatorTooltip(ctx, offsetLeft, top, maxWidth);
            }
            else if (candleStyles.tooltip.showType === 'rect' &&
                indicatorStyles.tooltip.showType === 'standard') {
                const { offsetLeft, offsetTop, offsetRight } = candleStyles.tooltip;
                const maxWidth = bounding.width - offsetRight;
                const top = this.drawIndicatorTooltip(ctx, offsetLeft, offsetTop, maxWidth);
                const isDrawCandleTooltip = this.isDrawTooltip(crosshair, candleStyles.tooltip);
                this._drawRectTooltip(ctx, isDrawCandleTooltip, false, top);
            }
            else {
                const { offsetLeft, offsetTop, offsetRight } = candleStyles.tooltip;
                const maxWidth = bounding.width - offsetRight;
                const top = this._drawCandleStandardTooltip(ctx, offsetLeft, offsetTop, maxWidth);
                const isDrawIndicatorTooltip = this.isDrawTooltip(crosshair, indicatorStyles.tooltip);
                this._drawRectTooltip(ctx, false, isDrawIndicatorTooltip, top);
            }
        }
    }
    _drawCandleStandardTooltip(ctx, left, top, maxWidth) {
        const chartStore = this.getWidget().getPane().getChart().getChartStore();
        const styles = chartStore.getStyles().candle;
        const tooltipStyles = styles.tooltip;
        const tooltipLegendStyles = tooltipStyles.legend;
        let prevRowHeight = 0;
        const coordinate = { x: left, y: top };
        const crosshair = chartStore.getCrosshair();
        if (this.isDrawTooltip(crosshair, tooltipStyles)) {
            const tooltipTitleStyles = tooltipStyles.title;
            if (tooltipTitleStyles.show) {
                const { type = '', span = '' } = chartStore.getPeriod() ?? {};
                const text = formatTemplateString(tooltipTitleStyles.template, { ...chartStore.getSymbol(), period: `${span}${i18n(type, chartStore.getLocale())}` });
                const color = tooltipTitleStyles.color;
                const height = this.drawStandardTooltipLegends(ctx, [
                    {
                        title: { text: '', color },
                        value: { text, color }
                    }
                ], { x: left, y: top }, left, 0, maxWidth, tooltipTitleStyles);
                coordinate.y = coordinate.y + height;
            }
            const legends = this._getCandleTooltipLegends();
            const features = this.classifyTooltipFeatures(tooltipStyles.features);
            prevRowHeight = this.drawStandardTooltipFeatures(ctx, features[0], coordinate, null, left, prevRowHeight, maxWidth);
            prevRowHeight = this.drawStandardTooltipFeatures(ctx, features[1], coordinate, null, left, prevRowHeight, maxWidth);
            if (legends.length > 0) {
                prevRowHeight = this.drawStandardTooltipLegends(ctx, legends, coordinate, left, prevRowHeight, maxWidth, tooltipLegendStyles);
            }
            prevRowHeight = this.drawStandardTooltipFeatures(ctx, features[2], coordinate, null, left, prevRowHeight, maxWidth);
        }
        return coordinate.y + prevRowHeight;
    }
    _drawRectTooltip(ctx, isDrawCandleTooltip, isDrawIndicatorTooltip, top) {
        const widget = this.getWidget();
        const pane = widget.getPane();
        const chartStore = pane.getChart().getChartStore();
        const styles = chartStore.getStyles();
        const candleStyles = styles.candle;
        const indicatorStyles = styles.indicator;
        const candleTooltipStyles = candleStyles.tooltip;
        const indicatorTooltipStyles = indicatorStyles.tooltip;
        if (isDrawCandleTooltip || isDrawIndicatorTooltip) {
            const candleLegends = this._getCandleTooltipLegends();
            const { offsetLeft, offsetTop, offsetRight, offsetBottom } = candleTooltipStyles;
            const { marginLeft: baseLegendMarginLeft, marginRight: baseLegendMarginRight, marginTop: baseLegendMarginTop, marginBottom: baseLegendMarginBottom, size: baseLegendSize, weight: baseLegendWeight, family: baseLegendFamily } = candleTooltipStyles.legend;
            const { position: rectPosition, paddingLeft: rectPaddingLeft, paddingRight: rectPaddingRight, paddingTop: rectPaddingTop, paddingBottom: rectPaddingBottom, offsetLeft: rectOffsetLeft, offsetRight: rectOffsetRight, offsetTop: rectOffsetTop, offsetBottom: rectOffsetBottom, borderSize: rectBorderSize, borderRadius: rectBorderRadius, borderColor: rectBorderColor, color: rectBackgroundColor } = candleTooltipStyles.rect;
            let maxTextWidth = 0;
            let rectWidth = 0;
            let rectHeight = 0;
            if (isDrawCandleTooltip) {
                ctx.font = createFont(baseLegendSize, baseLegendWeight, baseLegendFamily);
                candleLegends.forEach(data => {
                    const title = data.title;
                    const value = data.value;
                    const text = `${title.text}${value.text}`;
                    const labelWidth = ctx.measureText(text).width + baseLegendMarginLeft + baseLegendMarginRight;
                    maxTextWidth = Math.max(maxTextWidth, labelWidth);
                });
                rectHeight += ((baseLegendMarginBottom + baseLegendMarginTop + baseLegendSize) * candleLegends.length);
            }
            const { marginLeft: indicatorLegendMarginLeft, marginRight: indicatorLegendMarginRight, marginTop: indicatorLegendMarginTop, marginBottom: indicatorLegendMarginBottom, size: indicatorLegendSize, weight: indicatorLegendWeight, family: indicatorLegendFamily } = indicatorTooltipStyles.legend;
            const indicatorLegendsArray = [];
            if (isDrawIndicatorTooltip) {
                const indicators = chartStore.getIndicatorsByPaneId(pane.getId());
                ctx.font = createFont(indicatorLegendSize, indicatorLegendWeight, indicatorLegendFamily);
                indicators.forEach(indicator => {
                    const tooltipDataLegends = this.getIndicatorTooltipData(indicator).legends;
                    indicatorLegendsArray.push(tooltipDataLegends);
                    tooltipDataLegends.forEach(data => {
                        const title = data.title;
                        const value = data.value;
                        const text = `${title.text}${value.text}`;
                        const textWidth = ctx.measureText(text).width + indicatorLegendMarginLeft + indicatorLegendMarginRight;
                        maxTextWidth = Math.max(maxTextWidth, textWidth);
                        rectHeight += (indicatorLegendMarginTop + indicatorLegendMarginBottom + indicatorLegendSize);
                    });
                });
            }
            rectWidth += maxTextWidth;
            if (rectWidth !== 0 && rectHeight !== 0) {
                const crosshair = chartStore.getCrosshair();
                const bounding = widget.getBounding();
                const yAxisBounding = pane.getYAxisWidget().getBounding();
                rectWidth += (rectBorderSize * 2 + rectPaddingLeft + rectPaddingRight);
                rectHeight += (rectBorderSize * 2 + rectPaddingTop + rectPaddingBottom);
                const centerX = bounding.width / 2;
                const isPointer = rectPosition === 'pointer' && crosshair.paneId === PaneIdConstants.CANDLE;
                const isLeft = (crosshair.realX ?? 0) > centerX;
                let rectX = 0;
                if (isPointer) {
                    const realX = crosshair.realX;
                    if (isLeft) {
                        rectX = realX - rectOffsetRight - rectWidth;
                    }
                    else {
                        rectX = realX + rectOffsetLeft;
                    }
                }
                else {
                    const yAxis = this.getWidget().getPane().getAxisComponent();
                    if (isLeft) {
                        rectX = rectOffsetLeft + offsetLeft;
                        if (yAxis.inside && yAxis.position === 'left') {
                            rectX += yAxisBounding.width;
                        }
                    }
                    else {
                        rectX = bounding.width - rectOffsetRight - rectWidth - offsetRight;
                        if (yAxis.inside && yAxis.position === 'right') {
                            rectX -= yAxisBounding.width;
                        }
                    }
                }
                let rectY = top + rectOffsetTop;
                if (isPointer) {
                    const y = crosshair.y;
                    rectY = y - rectHeight / 2;
                    if (rectY + rectHeight > bounding.height - rectOffsetBottom - offsetBottom) {
                        rectY = bounding.height - rectOffsetBottom - rectHeight - offsetBottom;
                    }
                    if (rectY < top + rectOffsetTop) {
                        rectY = top + rectOffsetTop + offsetTop;
                    }
                }
                this.createFigure({
                    name: 'rect',
                    attrs: {
                        x: rectX,
                        y: rectY,
                        width: rectWidth,
                        height: rectHeight
                    },
                    styles: {
                        style: 'stroke_fill',
                        color: rectBackgroundColor,
                        borderColor: rectBorderColor,
                        borderSize: rectBorderSize,
                        borderRadius: rectBorderRadius
                    }
                })?.draw(ctx);
                const candleTextX = rectX + rectBorderSize + rectPaddingLeft + baseLegendMarginLeft;
                let textY = rectY + rectBorderSize + rectPaddingTop;
                if (isDrawCandleTooltip) {
                    // render candle texts
                    candleLegends.forEach(data => {
                        textY += baseLegendMarginTop;
                        const title = data.title;
                        this.createFigure({
                            name: 'text',
                            attrs: {
                                x: candleTextX,
                                y: textY,
                                text: title.text
                            },
                            styles: {
                                color: title.color,
                                size: baseLegendSize,
                                family: baseLegendFamily,
                                weight: baseLegendWeight
                            }
                        })?.draw(ctx);
                        const value = data.value;
                        this.createFigure({
                            name: 'text',
                            attrs: {
                                x: rectX + rectWidth - rectBorderSize - baseLegendMarginRight - rectPaddingRight,
                                y: textY,
                                text: value.text,
                                align: 'right'
                            },
                            styles: {
                                color: value.color,
                                size: baseLegendSize,
                                family: baseLegendFamily,
                                weight: baseLegendWeight
                            }
                        })?.draw(ctx);
                        textY += (baseLegendSize + baseLegendMarginBottom);
                    });
                }
                if (isDrawIndicatorTooltip) {
                    // render indicator legends
                    const indicatorTextX = rectX + rectBorderSize + rectPaddingLeft + indicatorLegendMarginLeft;
                    indicatorLegendsArray.forEach(legends => {
                        legends.forEach(data => {
                            textY += indicatorLegendMarginTop;
                            const title = data.title;
                            const value = data.value;
                            this.createFigure({
                                name: 'text',
                                attrs: {
                                    x: indicatorTextX,
                                    y: textY,
                                    text: title.text
                                },
                                styles: {
                                    color: title.color,
                                    size: indicatorLegendSize,
                                    family: indicatorLegendFamily,
                                    weight: indicatorLegendWeight
                                }
                            })?.draw(ctx);
                            this.createFigure({
                                name: 'text',
                                attrs: {
                                    x: rectX + rectWidth - rectBorderSize - indicatorLegendMarginRight - rectPaddingRight,
                                    y: textY,
                                    text: value.text,
                                    align: 'right'
                                },
                                styles: {
                                    color: value.color,
                                    size: indicatorLegendSize,
                                    family: indicatorLegendFamily,
                                    weight: indicatorLegendWeight
                                }
                            })?.draw(ctx);
                            textY += (indicatorLegendSize + indicatorLegendMarginBottom);
                        });
                    });
                }
            }
        }
    }
    _getCandleTooltipLegends() {
        const chartStore = this.getWidget().getPane().getChart().getChartStore();
        const styles = chartStore.getStyles().candle;
        const dataList = chartStore.getDataList();
        const formatter = chartStore.getInnerFormatter();
        const decimalFold = chartStore.getDecimalFold();
        const thousandsSeparator = chartStore.getThousandsSeparator();
        const locale = chartStore.getLocale();
        const { pricePrecision = SymbolDefaultPrecisionConstants.PRICE, volumePrecision = SymbolDefaultPrecisionConstants.VOLUME } = chartStore.getSymbol() ?? {};
        const period = chartStore.getPeriod();
        const dataIndex = chartStore.getCrosshair().dataIndex ?? 0;
        const tooltipStyles = styles.tooltip;
        const { color: textColor, defaultValue, template } = tooltipStyles.legend;
        const prev = dataList[dataIndex - 1] ?? null;
        const current = dataList[dataIndex];
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ignore
        const prevClose = prev?.close ?? current.close;
        const changeValue = current.close - prevClose;
        const mapping = {
            ...current,
            time: formatter.formatDate(current.timestamp, PeriodTypeCrosshairTooltipFormat[period?.type ?? 'day'], 'tooltip'),
            open: decimalFold.format(thousandsSeparator.format(formatPrecision(current.open, pricePrecision))),
            high: decimalFold.format(thousandsSeparator.format(formatPrecision(current.high, pricePrecision))),
            low: decimalFold.format(thousandsSeparator.format(formatPrecision(current.low, pricePrecision))),
            close: decimalFold.format(thousandsSeparator.format(formatPrecision(current.close, pricePrecision))),
            volume: decimalFold.format(thousandsSeparator.format(formatter.formatBigNumber(formatPrecision(current.volume ?? defaultValue, volumePrecision)))),
            turnover: decimalFold.format(thousandsSeparator.format(formatPrecision(current.turnover ?? defaultValue, pricePrecision))),
            change: prevClose === 0 ? defaultValue : `${thousandsSeparator.format(formatPrecision(changeValue / prevClose * 100))}%`
        };
        const legends = (isFunction(template)
            ? template({ prev, current, next: dataList[dataIndex + 1] ?? null }, styles)
            : template);
        return legends.map(({ title, value }) => {
            let t = { text: '', color: textColor };
            if (isObject(title)) {
                t = { ...title };
            }
            else {
                t.text = title;
            }
            t.text = i18n(t.text, locale);
            let v = { text: defaultValue, color: textColor };
            if (isObject(value)) {
                v = { ...value };
            }
            else {
                v.text = value;
            }
            if (isValid(/{change}/.exec(v.text))) {
                v.color = changeValue === 0 ? styles.priceMark.last.noChangeColor : (changeValue > 0 ? styles.priceMark.last.upColor : styles.priceMark.last.downColor);
            }
            v.text = formatTemplateString(v.text, mapping);
            return { title: t, value: v };
        });
    }
}

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
class CrosshairFeatureView extends View {
    _activeFeatureInfo = null;
    _featureClickEvent = (featureInfo) => () => {
        const pane = this.getWidget().getPane();
        pane.getChart().getChartStore().executeAction('onCrosshairFeatureClick', featureInfo);
        return true;
    };
    _featureMouseMoveEvent = (featureInfo) => () => {
        this._activeFeatureInfo = featureInfo;
        this.getWidget().setForceCursor('pointer');
        return true;
    };
    constructor(widget) {
        super(widget);
        this.registerEvent('mouseMoveEvent', _ => {
            this._activeFeatureInfo = null;
            this.getWidget().setForceCursor(null);
            return false;
        });
    }
    drawImp(ctx) {
        const widget = this.getWidget();
        const pane = widget.getPane();
        const chartStore = widget.getPane().getChart().getChartStore();
        const crosshair = chartStore.getCrosshair();
        const weight = this.getWidget();
        const yAxis = weight.getPane().getAxisComponent();
        if (isString(crosshair.paneId) && crosshair.paneId === pane.getId() && yAxis.isInCandle()) {
            const styles = chartStore.getStyles().crosshair;
            const features = styles.horizontal.features;
            if (styles.show && styles.horizontal.show && features.length > 0) {
                const isRight = yAxis.position === 'right';
                const bounding = weight.getBounding();
                let yAxisTextWidth = 0;
                const horizontalTextStyles = styles.horizontal.text;
                if (yAxis.inside && horizontalTextStyles.show) {
                    const value = yAxis.convertFromPixel(crosshair.y);
                    const range = yAxis.getRange();
                    let text = yAxis.displayValueToText(yAxis.realValueToDisplayValue(yAxis.valueToRealValue(value, { range }), { range }), chartStore.getSymbol()?.pricePrecision ?? SymbolDefaultPrecisionConstants.PRICE);
                    text = chartStore.getDecimalFold().format(chartStore.getThousandsSeparator().format(text));
                    yAxisTextWidth = horizontalTextStyles.paddingLeft +
                        calcTextWidth(text, horizontalTextStyles.size, horizontalTextStyles.weight, horizontalTextStyles.family) +
                        horizontalTextStyles.paddingRight;
                }
                let x = yAxisTextWidth;
                if (isRight) {
                    x = bounding.width - yAxisTextWidth;
                }
                const y = crosshair.y;
                features.forEach(feature => {
                    const { marginLeft = 0, marginTop = 0, marginRight = 0, paddingLeft = 0, paddingTop = 0, paddingRight = 0, paddingBottom = 0, color, activeColor, backgroundColor, activeBackgroundColor, borderRadius, size = 0, type, content } = feature;
                    let width = size;
                    if (type === 'icon_font') {
                        const iconFont = content;
                        width = paddingLeft + calcTextWidth(iconFont.code, size, 'normal', iconFont.family) + paddingRight;
                    }
                    if (isRight) {
                        x -= (width + marginRight);
                    }
                    else {
                        x += marginLeft;
                    }
                    let finalColor = color;
                    let finalBackgroundColor = backgroundColor;
                    if (this._activeFeatureInfo?.feature.id === feature.id) {
                        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ignore
                        finalColor = activeColor ?? color;
                        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ignore
                        finalBackgroundColor = activeBackgroundColor ?? backgroundColor;
                    }
                    const eventHandler = {
                        mouseDownEvent: this._featureClickEvent({ crosshair, feature }),
                        mouseMoveEvent: this._featureMouseMoveEvent({ crosshair, feature })
                    };
                    if (type === 'icon_font') {
                        const iconFont = content;
                        this.createFigure({
                            name: 'text',
                            attrs: {
                                text: iconFont.code,
                                x,
                                y: y + marginTop,
                                baseline: 'middle'
                            },
                            styles: {
                                paddingLeft,
                                paddingTop,
                                paddingRight,
                                paddingBottom,
                                borderRadius,
                                size,
                                family: iconFont.family,
                                color: finalColor,
                                backgroundColor: finalBackgroundColor
                            }
                        }, eventHandler)?.draw(ctx);
                    }
                    else {
                        this.createFigure({
                            name: 'rect',
                            attrs: { x, y: y + marginTop - size / 2, width: size, height: size },
                            styles: {
                                paddingLeft,
                                paddingTop,
                                paddingRight,
                                paddingBottom,
                                color: finalBackgroundColor
                            }
                        }, eventHandler)?.draw(ctx);
                        const path = content;
                        this.createFigure({
                            name: 'path',
                            attrs: { path: path.path, x, y: y + marginTop + paddingTop - size / 2, width: size, height: size },
                            styles: {
                                style: path.style,
                                lineWidth: path.lineWidth,
                                color: finalColor
                            }
                        })?.draw(ctx);
                    }
                    if (isRight) {
                        x -= marginLeft;
                    }
                    else {
                        x += (width + marginRight);
                    }
                });
            }
        }
    }
}

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
class CandleWidget extends IndicatorWidget {
    _candleBarView = new CandleBarView(this);
    _candleAreaView = new CandleAreaView(this);
    _candleHighLowPriceView = new CandleHighLowPriceView(this);
    _candleLastPriceLineView = new CandleLastPriceView(this);
    _crosshairFeatureView = new CrosshairFeatureView(this);
    constructor(rootContainer, pane) {
        super(rootContainer, pane);
        this.addChild(this._candleBarView);
        this.addChild(this._crosshairFeatureView);
    }
    updateMainContent(ctx) {
        const candleStyles = this.getPane().getChart().getStyles().candle;
        if (candleStyles.type !== 'area') {
            this._candleBarView.draw(ctx);
            this._candleHighLowPriceView.draw(ctx);
            this._candleAreaView.stopAnimation();
        }
        else {
            this._candleAreaView.draw(ctx);
        }
        this._candleLastPriceLineView.draw(ctx);
    }
    updateOverlayContent(ctx) {
        this._crosshairFeatureView.draw(ctx);
    }
    createTooltipView() {
        return new CandleTooltipView(this);
    }
}

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
class AxisView extends View {
    drawImp(ctx, extend) {
        const widget = this.getWidget();
        const pane = widget.getPane();
        const bounding = widget.getBounding();
        const axis = pane.getAxisComponent();
        const styles = this.getAxisStyles(pane.getChart().getStyles());
        if (styles.show) {
            if (styles.axisLine.show) {
                this.createFigure({
                    name: 'line',
                    attrs: this.createAxisLine(bounding, styles),
                    styles: styles.axisLine
                })?.draw(ctx);
            }
            if (!extend[0]) {
                const ticks = axis.getTicks();
                if (styles.tickLine.show) {
                    const lines = this.createTickLines(ticks, bounding, styles);
                    lines.forEach(line => {
                        this.createFigure({
                            name: 'line',
                            attrs: line,
                            styles: styles.tickLine
                        })?.draw(ctx);
                    });
                }
                if (styles.tickText.show) {
                    const texts = this.createTickTexts(ticks, bounding, styles);
                    this.createFigure({
                        name: 'text',
                        attrs: texts,
                        styles: styles.tickText
                    })?.draw(ctx);
                }
            }
        }
    }
}

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
class YAxisView extends AxisView {
    getAxisStyles(styles) {
        return styles.yAxis;
    }
    createAxisLine(bounding, styles) {
        const yAxis = this.getWidget().getPane().getAxisComponent();
        const size = styles.axisLine.size;
        let x = 0;
        if (yAxis.isFromZero()) {
            x = 0;
        }
        else {
            x = bounding.width - size;
        }
        return {
            coordinates: [
                { x, y: 0 },
                { x, y: bounding.height }
            ]
        };
    }
    createTickLines(ticks, bounding, styles) {
        const yAxis = this.getWidget().getPane().getAxisComponent();
        const axisLineStyles = styles.axisLine;
        const tickLineStyles = styles.tickLine;
        let startX = 0;
        let endX = 0;
        if (yAxis.isFromZero()) {
            startX = 0;
            if (axisLineStyles.show) {
                startX += axisLineStyles.size;
            }
            endX = startX + tickLineStyles.length;
        }
        else {
            startX = bounding.width;
            if (axisLineStyles.show) {
                startX -= axisLineStyles.size;
            }
            endX = startX - tickLineStyles.length;
        }
        return ticks.map(tick => ({
            coordinates: [
                { x: startX, y: tick.coord },
                { x: endX, y: tick.coord }
            ]
        }));
    }
    createTickTexts(ticks, bounding, styles) {
        const yAxis = this.getWidget().getPane().getAxisComponent();
        const axisLineStyles = styles.axisLine;
        const tickLineStyles = styles.tickLine;
        const tickTextStyles = styles.tickText;
        let x = 0;
        if (yAxis.isFromZero()) {
            x = tickTextStyles.marginStart;
            if (axisLineStyles.show) {
                x += axisLineStyles.size;
            }
            if (tickLineStyles.show) {
                x += tickLineStyles.length;
            }
        }
        else {
            x = bounding.width - tickTextStyles.marginEnd;
            if (axisLineStyles.show) {
                x -= axisLineStyles.size;
            }
            if (tickLineStyles.show) {
                x -= tickLineStyles.length;
            }
        }
        const textAlign = this.getWidget().getPane().getAxisComponent().isFromZero() ? 'left' : 'right';
        return ticks.map(tick => ({
            x,
            y: tick.coord,
            text: tick.text,
            align: textAlign,
            baseline: 'middle'
        }));
    }
}

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
class CandleLastPriceLabelView extends View {
    drawImp(ctx) {
        const widget = this.getWidget();
        const pane = widget.getPane();
        const bounding = widget.getBounding();
        const chartStore = pane.getChart().getChartStore();
        const priceMarkStyles = chartStore.getStyles().candle.priceMark;
        const lastPriceMarkStyles = priceMarkStyles.last;
        const lastPriceMarkTextStyles = lastPriceMarkStyles.text;
        if (priceMarkStyles.show && lastPriceMarkStyles.show && lastPriceMarkTextStyles.show) {
            const precision = chartStore.getSymbol()?.pricePrecision ?? SymbolDefaultPrecisionConstants.PRICE;
            const yAxis = pane.getAxisComponent();
            const dataList = chartStore.getDataList();
            const data = dataList[dataList.length - 1];
            if (isValid(data)) {
                const { close, open } = data;
                const comparePrice = lastPriceMarkStyles.compareRule === 'current_open' ? open : (dataList[dataList.length - 2]?.close ?? close);
                const priceY = yAxis.convertToNicePixel(close);
                let backgroundColor = '';
                if (close > comparePrice) {
                    backgroundColor = lastPriceMarkStyles.upColor;
                }
                else if (close < comparePrice) {
                    backgroundColor = lastPriceMarkStyles.downColor;
                }
                else {
                    backgroundColor = lastPriceMarkStyles.noChangeColor;
                }
                let x = 0;
                let textAlgin = 'left';
                if (yAxis.isFromZero()) {
                    x = 0;
                    textAlgin = 'left';
                }
                else {
                    x = bounding.width;
                    textAlgin = 'right';
                }
                const textFigures = [];
                const yAxisRange = yAxis.getRange();
                let priceText = yAxis.displayValueToText(yAxis.realValueToDisplayValue(yAxis.valueToRealValue(close, { range: yAxisRange }), { range: yAxisRange }), precision);
                priceText = chartStore.getDecimalFold().format(chartStore.getThousandsSeparator().format(priceText));
                const { paddingLeft, paddingRight, paddingTop, paddingBottom, size, family, weight } = lastPriceMarkTextStyles;
                let textWidth = paddingLeft + calcTextWidth(priceText, size, weight, family) + paddingRight;
                const priceTextHeight = paddingTop + size + paddingBottom;
                textFigures.push({
                    name: 'text',
                    attrs: {
                        x,
                        y: priceY,
                        width: textWidth,
                        height: priceTextHeight,
                        text: priceText,
                        align: textAlgin,
                        baseline: 'middle'
                    },
                    styles: {
                        ...lastPriceMarkTextStyles,
                        backgroundColor
                    }
                });
                const formatExtendText = chartStore.getInnerFormatter().formatExtendText;
                const priceTextHalfHeight = size / 2;
                let aboveY = priceY - priceTextHalfHeight - paddingTop;
                let belowY = priceY + priceTextHalfHeight + paddingBottom;
                lastPriceMarkStyles.extendTexts.forEach((item, index) => {
                    const text = formatExtendText({ type: 'last_price', data, index });
                    if (text.length > 0 && item.show) {
                        const textHalfHeight = item.size / 2;
                        let textY = 0;
                        if (item.position === 'above_price') {
                            aboveY -= (item.paddingBottom + textHalfHeight);
                            textY = aboveY;
                            aboveY -= (textHalfHeight + item.paddingTop);
                        }
                        else {
                            belowY += (item.paddingTop + textHalfHeight);
                            textY = belowY;
                            belowY += (textHalfHeight + item.paddingBottom);
                        }
                        textWidth = Math.max(textWidth, item.paddingLeft + calcTextWidth(text, item.size, item.weight, item.family) + item.paddingRight);
                        textFigures.push({
                            name: 'text',
                            attrs: {
                                x,
                                y: textY,
                                width: textWidth,
                                height: item.paddingTop + item.size + item.paddingBottom,
                                text,
                                align: textAlgin,
                                baseline: 'middle'
                            },
                            styles: { ...item, backgroundColor }
                        });
                    }
                });
                textFigures.forEach(figure => {
                    figure.attrs.width = textWidth;
                    this.createFigure(figure)?.draw(ctx);
                });
            }
        }
    }
}

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
class IndicatorLastValueView extends View {
    drawImp(ctx) {
        const widget = this.getWidget();
        const pane = widget.getPane();
        const bounding = widget.getBounding();
        const chartStore = pane.getChart().getChartStore();
        const defaultStyles = chartStore.getStyles().indicator;
        const lastValueMarkStyles = defaultStyles.lastValueMark;
        const lastValueMarkTextStyles = lastValueMarkStyles.text;
        if (lastValueMarkStyles.show) {
            const yAxis = pane.getAxisComponent();
            const yAxisRange = yAxis.getRange();
            const dataList = chartStore.getDataList();
            const dataIndex = dataList.length - 1;
            const indicators = chartStore.getIndicatorsByPaneId(pane.getId());
            const formatter = chartStore.getInnerFormatter();
            const decimalFold = chartStore.getDecimalFold();
            const thousandsSeparator = chartStore.getThousandsSeparator();
            indicators.forEach(indicator => {
                const result = indicator.result;
                const data = result[dataIndex] ?? {};
                if (isValid(data) && indicator.visible) {
                    const precision = indicator.precision;
                    eachFigures(indicator, dataIndex, defaultStyles, (figure, figureStyles) => {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- ignore
                        const value = data[figure.key];
                        if (isNumber(value)) {
                            const y = yAxis.convertToNicePixel(value);
                            let text = yAxis.displayValueToText(yAxis.realValueToDisplayValue(yAxis.valueToRealValue(value, { range: yAxisRange }), { range: yAxisRange }), precision);
                            if (indicator.shouldFormatBigNumber) {
                                text = formatter.formatBigNumber(text);
                            }
                            text = decimalFold.format(thousandsSeparator.format(text));
                            let x = 0;
                            let textAlign = 'left';
                            if (yAxis.isFromZero()) {
                                x = 0;
                                textAlign = 'left';
                            }
                            else {
                                x = bounding.width;
                                textAlign = 'right';
                            }
                            this.createFigure({
                                name: 'text',
                                attrs: {
                                    x,
                                    y,
                                    text,
                                    align: textAlign,
                                    baseline: 'middle'
                                },
                                styles: {
                                    ...lastValueMarkTextStyles,
                                    backgroundColor: figureStyles.color
                                }
                            })?.draw(ctx);
                        }
                    });
                }
            });
        }
    }
}

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
class OverlayYAxisView extends OverlayView {
    coordinateToPointTimestampDataIndexFlag() {
        return false;
    }
    drawDefaultFigures(ctx, overlay, coordinates) {
        this.drawFigures(ctx, overlay, this.getDefaultFigures(overlay, coordinates));
    }
    getDefaultFigures(overlay, coordinates) {
        const widget = this.getWidget();
        const pane = widget.getPane();
        const chartStore = pane.getChart().getChartStore();
        const clickOverlayInfo = chartStore.getClickOverlayInfo();
        const figures = [];
        if (overlay.needDefaultYAxisFigure &&
            overlay.id === clickOverlayInfo.overlay?.id &&
            clickOverlayInfo.paneId === pane.getId()) {
            const yAxis = pane.getAxisComponent();
            const bounding = widget.getBounding();
            let topY = Number.MAX_SAFE_INTEGER;
            let bottomY = Number.MIN_SAFE_INTEGER;
            const isFromZero = yAxis.isFromZero();
            let textAlign = 'left';
            let x = 0;
            if (isFromZero) {
                textAlign = 'left';
                x = 0;
            }
            else {
                textAlign = 'right';
                x = bounding.width;
            }
            const decimalFold = chartStore.getDecimalFold();
            const thousandsSeparator = chartStore.getThousandsSeparator();
            coordinates.forEach((coordinate, index) => {
                const point = overlay.points[index];
                if (isNumber(point.value)) {
                    topY = Math.min(topY, coordinate.y);
                    bottomY = Math.max(bottomY, coordinate.y);
                    const text = decimalFold.format(thousandsSeparator.format(formatPrecision(point.value, chartStore.getSymbol()?.pricePrecision ?? SymbolDefaultPrecisionConstants.PRICE)));
                    figures.push({ type: 'text', attrs: { x, y: coordinate.y, text, align: textAlign, baseline: 'middle' }, ignoreEvent: true });
                }
            });
            if (coordinates.length > 1) {
                figures.unshift({ type: 'rect', attrs: { x: 0, y: topY, width: bounding.width, height: bottomY - topY }, ignoreEvent: true });
            }
        }
        return figures;
    }
    getFigures(overlay, coordinates) {
        const widget = this.getWidget();
        const pane = widget.getPane();
        const chart = pane.getChart();
        const yAxis = pane.getAxisComponent();
        const xAxis = chart.getXAxisPane().getAxisComponent();
        const bounding = widget.getBounding();
        return overlay.createYAxisFigures?.({ chart, overlay, coordinates, bounding, xAxis, yAxis }) ?? [];
    }
}

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
class CrosshairHorizontalLabelView extends View {
    drawImp(ctx) {
        const widget = this.getWidget();
        const pane = widget.getPane();
        const chartStore = widget.getPane().getChart().getChartStore();
        const crosshair = chartStore.getCrosshair();
        if (isString(crosshair.paneId) && this.compare(crosshair, pane.getId())) {
            const styles = chartStore.getStyles().crosshair;
            if (styles.show) {
                const directionStyles = this.getDirectionStyles(styles);
                const textStyles = directionStyles.text;
                if (directionStyles.show && textStyles.show) {
                    const bounding = widget.getBounding();
                    const axis = pane.getAxisComponent();
                    const text = this.getText(crosshair, chartStore, axis);
                    ctx.font = createFont(textStyles.size, textStyles.weight, textStyles.family);
                    this.createFigure({
                        name: 'text',
                        attrs: this.getTextAttrs(text, ctx.measureText(text).width, crosshair, bounding, axis, textStyles),
                        styles: textStyles
                    })?.draw(ctx);
                }
            }
        }
    }
    compare(crosshair, paneId) {
        return crosshair.paneId === paneId;
    }
    getDirectionStyles(styles) {
        return styles.horizontal;
    }
    getText(crosshair, chartStore, axis) {
        const yAxis = axis;
        const value = axis.convertFromPixel(crosshair.y);
        let precision = 0;
        let shouldFormatBigNumber = false;
        if (yAxis.isInCandle()) {
            precision = chartStore.getSymbol()?.pricePrecision ?? SymbolDefaultPrecisionConstants.PRICE;
        }
        else {
            const indicators = chartStore.getIndicatorsByPaneId(crosshair.paneId);
            indicators.forEach(indicator => {
                precision = Math.max(indicator.precision, precision);
                shouldFormatBigNumber ||= indicator.shouldFormatBigNumber;
            });
        }
        const yAxisRange = yAxis.getRange();
        let text = yAxis.displayValueToText(yAxis.realValueToDisplayValue(yAxis.valueToRealValue(value, { range: yAxisRange }), { range: yAxisRange }), precision);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ignore
        if (shouldFormatBigNumber) {
            text = chartStore.getInnerFormatter().formatBigNumber(text);
        }
        return chartStore.getDecimalFold().format(chartStore.getThousandsSeparator().format(text));
    }
    getTextAttrs(text, _textWidth, crosshair, bounding, axis, _styles) {
        const yAxis = axis;
        let x = 0;
        let textAlign = 'left';
        if (yAxis.isFromZero()) {
            x = 0;
            textAlign = 'left';
        }
        else {
            x = bounding.width;
            textAlign = 'right';
        }
        return { x, y: crosshair.y, text, align: textAlign, baseline: 'middle' };
    }
}

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
class YAxisWidget extends DrawWidget {
    _yAxisView = new YAxisView(this);
    _candleLastPriceLabelView = new CandleLastPriceLabelView(this);
    _indicatorLastValueView = new IndicatorLastValueView(this);
    _overlayYAxisView = new OverlayYAxisView(this);
    _crosshairHorizontalLabelView = new CrosshairHorizontalLabelView(this);
    constructor(rootContainer, pane) {
        super(rootContainer, pane);
        this.setCursor('ns-resize');
        this.addChild(this._overlayYAxisView);
    }
    getName() {
        return WidgetNameConstants.Y_AXIS;
    }
    updateMain(ctx) {
        const minimize = this.getPane().getOptions().state === 'minimize';
        this._yAxisView.draw(ctx, minimize);
        if (!minimize) {
            if (this.getPane().getAxisComponent().isInCandle()) {
                this._candleLastPriceLabelView.draw(ctx);
            }
            this._indicatorLastValueView.draw(ctx);
        }
    }
    updateOverlay(ctx) {
        if (this.getPane().getOptions().state !== 'minimize') {
            this._overlayYAxisView.draw(ctx);
            this._crosshairHorizontalLabelView.draw(ctx);
        }
    }
}

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
class Pane {
    _container;
    _id;
    _chart;
    _bounding = createDefaultBounding();
    _originalBounding = createDefaultBounding();
    _visible = true;
    constructor(chart, id) {
        this._chart = chart;
        this._id = id;
        this._container = createDom('div', {
            width: '100%',
            margin: '0',
            padding: '0',
            position: 'relative',
            overflow: 'hidden',
            boxSizing: 'border-box'
        });
    }
    getContainer() {
        return this._container;
    }
    setVisible(visible) {
        if (this._visible !== visible) {
            this._container.style.display = visible ? 'block' : 'none';
            this._visible = visible;
        }
    }
    getVisible() {
        return this._visible;
    }
    getId() {
        return this._id;
    }
    getChart() {
        return this._chart;
    }
    getBounding() {
        return this._bounding;
    }
    setOriginalBounding(bounding) {
        merge(this._originalBounding, bounding);
    }
    getOriginalBounding() {
        return this._originalBounding;
    }
    update(level) {
        if (this._bounding.height !== this._container.clientHeight) {
            this._container.style.height = `${this._bounding.height}px`;
        }
        this.updateImp(level ?? 3 /* UpdateLevel.Drawer */, this._container, this._bounding);
    }
}

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
class DrawPane extends Pane {
    _mainWidget;
    _yAxisWidget = null;
    _axis;
    _options = {
        id: '',
        minHeight: PANE_MIN_HEIGHT,
        dragEnabled: true,
        order: 0,
        height: PANE_DEFAULT_HEIGHT,
        state: 'normal',
        axis: { name: 'normal', scrollZoomEnabled: true }
    };
    constructor(chart, id, options) {
        super(chart, id);
        const container = this.getContainer();
        this._mainWidget = this.createMainWidget(container);
        this._yAxisWidget = this.createYAxisWidget(container);
        this.setOptions(options);
    }
    setOptions(options) {
        const paneId = this.getId();
        if (paneId === PaneIdConstants.CANDLE || paneId === PaneIdConstants.X_AXIS) {
            const axisName = options.axis?.name;
            if (!isValid(this._axis) ||
                (isValid(axisName) && this._options.axis.name !== axisName)) {
                this._axis = this.createAxisComponent(axisName ?? 'normal');
            }
        }
        else {
            if (!isValid(this._axis)) {
                this._axis = this.createAxisComponent('normal');
            }
        }
        if (this._axis instanceof YAxisImp) {
            this._axis.setAutoCalcTickFlag(true);
        }
        merge(this._options, options);
        this._axis.override({
            ...this._options.axis,
            name: options.axis?.name ?? 'normal'
        });
        let container = null;
        let cursor = 'default';
        if (this.getId() === PaneIdConstants.X_AXIS) {
            container = this.getMainWidget().getContainer();
            cursor = 'ew-resize';
        }
        else {
            container = this.getYAxisWidget().getContainer();
            cursor = 'ns-resize';
        }
        if (options.axis?.scrollZoomEnabled ?? true) {
            container.style.cursor = cursor;
        }
        else {
            container.style.cursor = 'default';
        }
        return this;
    }
    getOptions() { return this._options; }
    getAxisComponent() {
        return this._axis;
    }
    setBounding(rootBounding, mainBounding, leftYAxisBounding, rightYAxisBounding) {
        merge(this.getBounding(), rootBounding);
        const contentBounding = {};
        if (isValid(rootBounding.height)) {
            contentBounding.height = rootBounding.height;
        }
        if (isValid(rootBounding.top)) {
            contentBounding.top = rootBounding.top;
        }
        this._mainWidget.setBounding(contentBounding);
        const mainBoundingValid = isValid(mainBounding);
        if (mainBoundingValid) {
            this._mainWidget.setBounding(mainBounding);
        }
        if (isValid(this._yAxisWidget)) {
            this._yAxisWidget.setBounding(contentBounding);
            const yAxis = this._axis;
            if (yAxis.position === 'left') {
                if (isValid(leftYAxisBounding)) {
                    this._yAxisWidget.setBounding({ ...leftYAxisBounding, left: 0 });
                }
            }
            else {
                if (isValid(rightYAxisBounding)) {
                    this._yAxisWidget.setBounding(rightYAxisBounding);
                    if (mainBoundingValid) {
                        this._yAxisWidget.setBounding({
                            left: (mainBounding.left ?? 0) +
                                (mainBounding.width ?? 0) +
                                (mainBounding.right ?? 0) -
                                (rightYAxisBounding.width ?? 0)
                        });
                    }
                }
            }
        }
        return this;
    }
    getMainWidget() { return this._mainWidget; }
    getYAxisWidget() { return this._yAxisWidget; }
    updateImp(level) {
        this._mainWidget.update(level);
        this._yAxisWidget?.update(level);
    }
    destroy() {
        this._mainWidget.destroy();
        this._yAxisWidget?.destroy();
    }
    getImage(includeOverlay) {
        const { width, height } = this.getBounding();
        const canvas = createDom('canvas', {
            width: `${width}px`,
            height: `${height}px`,
            boxSizing: 'border-box'
        });
        const ctx = canvas.getContext('2d');
        const pixelRatio = getPixelRatio(canvas);
        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;
        ctx.scale(pixelRatio, pixelRatio);
        const mainBounding = this._mainWidget.getBounding();
        ctx.drawImage(this._mainWidget.getImage(includeOverlay), mainBounding.left, 0, mainBounding.width, mainBounding.height);
        if (this._yAxisWidget !== null) {
            const yAxisBounding = this._yAxisWidget.getBounding();
            ctx.drawImage(this._yAxisWidget.getImage(includeOverlay), yAxisBounding.left, 0, yAxisBounding.width, yAxisBounding.height);
        }
        return canvas;
    }
    createYAxisWidget(_container) { return null; }
}

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
class IndicatorPane extends DrawPane {
    createAxisComponent(name) {
        const YAxisClass = getYAxisClass(name ?? 'default');
        return new YAxisClass(this);
    }
    createMainWidget(container) {
        return new IndicatorWidget(container, this);
    }
    createYAxisWidget(container) {
        return new YAxisWidget(container, this);
    }
}

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
class CandlePane extends IndicatorPane {
    createMainWidget(container) {
        return new CandleWidget(container, this);
    }
}

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
class XAxisView extends AxisView {
    getAxisStyles(styles) {
        return styles.xAxis;
    }
    createAxisLine(bounding) {
        return {
            coordinates: [
                { x: 0, y: 0 },
                { x: bounding.width, y: 0 }
            ]
        };
    }
    createTickLines(ticks, _bounding, styles) {
        const tickLineStyles = styles.tickLine;
        const axisLineSize = styles.axisLine.size;
        return ticks.map(tick => ({
            coordinates: [
                { x: tick.coord, y: 0 },
                { x: tick.coord, y: axisLineSize + tickLineStyles.length }
            ]
        }));
    }
    createTickTexts(ticks, _bounding, styles) {
        const tickTickStyles = styles.tickText;
        const axisLineSize = styles.axisLine.size;
        const tickLineLength = styles.tickLine.length;
        return ticks.map(tick => ({
            x: tick.coord,
            y: axisLineSize + tickLineLength + tickTickStyles.marginStart,
            text: tick.text,
            align: 'center',
            baseline: 'top'
        }));
    }
}

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
class OverlayXAxisView extends OverlayYAxisView {
    coordinateToPointTimestampDataIndexFlag() {
        return true;
    }
    coordinateToPointValueFlag() {
        return false;
    }
    getCompleteOverlays() {
        return this.getWidget().getPane().getChart().getChartStore().getOverlaysByPaneId();
    }
    getProgressOverlay() {
        return this.getWidget().getPane().getChart().getChartStore().getProgressOverlayInfo()?.overlay ?? null;
    }
    getDefaultFigures(overlay, coordinates) {
        const figures = [];
        const widget = this.getWidget();
        const pane = widget.getPane();
        const chartStore = pane.getChart().getChartStore();
        const clickOverlayInfo = chartStore.getClickOverlayInfo();
        if (overlay.needDefaultXAxisFigure && overlay.id === clickOverlayInfo.overlay?.id) {
            let leftX = Number.MAX_SAFE_INTEGER;
            let rightX = Number.MIN_SAFE_INTEGER;
            coordinates.forEach((coordinate, index) => {
                leftX = Math.min(leftX, coordinate.x);
                rightX = Math.max(rightX, coordinate.x);
                const point = overlay.points[index];
                if (isNumber(point.timestamp)) {
                    const text = chartStore.getInnerFormatter().formatDate(point.timestamp, 'YYYY-MM-DD HH:mm', 'crosshair');
                    figures.push({ type: 'text', attrs: { x: coordinate.x, y: 0, text, align: 'center' }, ignoreEvent: true });
                }
            });
            if (coordinates.length > 1) {
                figures.unshift({ type: 'rect', attrs: { x: leftX, y: 0, width: rightX - leftX, height: widget.getBounding().height }, ignoreEvent: true });
            }
        }
        return figures;
    }
    getFigures(o, coordinates) {
        const widget = this.getWidget();
        const pane = widget.getPane();
        const chart = pane.getChart();
        const yAxis = pane.getAxisComponent();
        const xAxis = chart.getXAxisPane().getAxisComponent();
        const bounding = widget.getBounding();
        return o.createXAxisFigures?.({ chart, overlay: o, coordinates, bounding, xAxis, yAxis }) ?? [];
    }
}

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
class CrosshairVerticalLabelView extends CrosshairHorizontalLabelView {
    compare(crosshair) {
        return isValid(crosshair.timestamp);
    }
    getDirectionStyles(styles) {
        return styles.vertical;
    }
    getText(crosshair, chartStore) {
        const timestamp = crosshair.timestamp;
        return chartStore.getInnerFormatter().formatDate(timestamp, PeriodTypeCrosshairTooltipFormat[chartStore.getPeriod()?.type ?? 'day'], 'crosshair');
    }
    getTextAttrs(text, textWidth, crosshair, bounding, _axis, styles) {
        const x = crosshair.realX;
        let optimalX = 0;
        let align = 'center';
        if (x - textWidth / 2 - styles.paddingLeft < 0) {
            optimalX = 0;
            align = 'left';
        }
        else if (x + textWidth / 2 + styles.paddingRight > bounding.width) {
            optimalX = bounding.width;
            align = 'right';
        }
        else {
            optimalX = x;
        }
        return { x: optimalX, y: 0, text, align, baseline: 'top' };
    }
}

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
class XAxisWidget extends DrawWidget {
    _xAxisView = new XAxisView(this);
    _overlayXAxisView = new OverlayXAxisView(this);
    _crosshairVerticalLabelView = new CrosshairVerticalLabelView(this);
    constructor(rootContainer, pane) {
        super(rootContainer, pane);
        this.setCursor('ew-resize');
        this.addChild(this._overlayXAxisView);
    }
    getName() {
        return WidgetNameConstants.X_AXIS;
    }
    updateMain(ctx) {
        this._xAxisView.draw(ctx);
    }
    updateOverlay(ctx) {
        this._overlayXAxisView.draw(ctx);
        this._crosshairVerticalLabelView.draw(ctx);
    }
}

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
class XAxisPane extends DrawPane {
    createAxisComponent(name) {
        const XAxisClass = getXAxisClass(name);
        return new XAxisClass(this);
    }
    createMainWidget(container) {
        return new XAxisWidget(container, this);
    }
}

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
function throttle(func, wait) {
    let previous = 0;
    return function () {
        const now = Date.now();
        if (now - previous > (wait)) {
            func.apply(this, arguments);
            previous = now;
        }
    };
}
// export function memoize<R1 = any, R2 = any> (func: (...args: any[]) => R1, resolver?: (...args: any[]) => R2): (...args: any[]) => R1 {
//   if (!isFunction(func) || (isValid(resolver) && !isFunction(resolver))) {
//     throw new TypeError('Expected a function')
//   }
//   const memoized = function (...args: any[]): any {
//     const key = isFunction(resolver) ? resolver.apply(this, args) : args[0]
//     const cache = memoized.cache
//     if (cache.has(key)) {
//       return cache.get(key)
//     }
//     const result = func.apply(this, args)
//     // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
//     memoized.cache = cache.set(key, result) || cache
//     return result
//   }
//   // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
//   memoized.cache = new (memoize.Cache || Map)()
//   return memoized
// }
// memoize.Cache = Map

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
class SeparatorWidget extends Widget {
    _dragFlag = false;
    _dragStartY = 0;
    _topPaneHeight = 0;
    _bottomPaneHeight = 0;
    _topPane = null;
    _bottomPane = null;
    constructor(rootContainer, pane) {
        super(rootContainer, pane);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- ignore
        this.registerEvent('touchStartEvent', this._mouseDownEvent.bind(this))
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- ignore
            .registerEvent('touchMoveEvent', this._pressedMouseMoveEvent.bind(this))
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- ignore
            .registerEvent('touchEndEvent', this._mouseUpEvent.bind(this))
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- ignore
            .registerEvent('mouseDownEvent', this._mouseDownEvent.bind(this))
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- ignore
            .registerEvent('mouseUpEvent', this._mouseUpEvent.bind(this))
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- ignore
            .registerEvent('pressedMouseMoveEvent', this._pressedMouseMoveEvent.bind(this))
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- ignore
            .registerEvent('mouseEnterEvent', this._mouseEnterEvent.bind(this))
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- ignore
            .registerEvent('mouseLeaveEvent', this._mouseLeaveEvent.bind(this));
    }
    getName() {
        return WidgetNameConstants.SEPARATOR;
    }
    _mouseDownEvent(event) {
        this._dragFlag = true;
        this._dragStartY = event.pageY;
        const pane = this.getPane();
        const chart = pane.getChart();
        this._topPane = pane.getTopPane();
        this._bottomPane = pane.getBottomPane();
        const drawPanes = chart.getDrawPanes();
        if (this._topPane.getOptions().state === 'minimize') {
            const index = drawPanes.findIndex(pane => pane.getId() === this._topPane?.getId());
            for (let i = index - 1; i > -1; i--) {
                const pane = drawPanes[i];
                if (pane.getOptions().state !== 'minimize') {
                    this._topPane = pane;
                    break;
                }
            }
        }
        if (this._bottomPane.getOptions().state === 'minimize') {
            const index = drawPanes.findIndex(pane => pane.getId() === this._bottomPane?.getId());
            for (let i = index + 1; i < drawPanes.length; i++) {
                const pane = drawPanes[i];
                if (pane.getOptions().state !== 'minimize') {
                    this._bottomPane = pane;
                    break;
                }
            }
        }
        this._topPaneHeight = this._topPane.getBounding().height;
        this._bottomPaneHeight = this._bottomPane.getBounding().height;
        return true;
    }
    _mouseUpEvent() {
        this._dragFlag = false;
        this._topPane = null;
        this._bottomPane = null;
        this._topPaneHeight = 0;
        this._bottomPaneHeight = 0;
        return this._mouseLeaveEvent();
    }
    // eslint-disable-next-line @typescript-eslint/unbound-method -- ignore
    _pressedMouseMoveEvent = throttle(this._pressedTouchMouseMoveEvent, 20);
    _pressedTouchMouseMoveEvent(event) {
        const dragDistance = event.pageY - this._dragStartY;
        const isUpDrag = dragDistance < 0;
        if (isValid(this._topPane) && isValid(this._bottomPane)) {
            const bottomPaneOptions = this._bottomPane.getOptions();
            if (this._topPane.getOptions().state !== 'minimize' &&
                bottomPaneOptions.state !== 'minimize' &&
                bottomPaneOptions.dragEnabled) {
                let reducedPane = null;
                let increasedPane = null;
                let startDragReducedPaneHeight = 0;
                let startDragIncreasedPaneHeight = 0;
                if (isUpDrag) {
                    reducedPane = this._topPane;
                    increasedPane = this._bottomPane;
                    startDragReducedPaneHeight = this._topPaneHeight;
                    startDragIncreasedPaneHeight = this._bottomPaneHeight;
                }
                else {
                    reducedPane = this._bottomPane;
                    increasedPane = this._topPane;
                    startDragReducedPaneHeight = this._bottomPaneHeight;
                    startDragIncreasedPaneHeight = this._topPaneHeight;
                }
                const reducedPaneMinHeight = reducedPane.getOptions().minHeight;
                if (startDragReducedPaneHeight > reducedPaneMinHeight) {
                    const reducedPaneHeight = Math.max(startDragReducedPaneHeight - Math.abs(dragDistance), reducedPaneMinHeight);
                    const diffHeight = startDragReducedPaneHeight - reducedPaneHeight;
                    reducedPane.setBounding({ height: reducedPaneHeight });
                    increasedPane.setBounding({ height: startDragIncreasedPaneHeight + diffHeight });
                    const currentPane = this.getPane();
                    const chart = currentPane.getChart();
                    chart.getChartStore().executeAction('onPaneDrag', { paneId: currentPane.getId() });
                    chart.layout({
                        measureHeight: true,
                        measureWidth: true,
                        update: true,
                        buildYAxisTick: true,
                        forceBuildYAxisTick: true
                    });
                }
            }
        }
        return true;
    }
    _mouseEnterEvent() {
        const pane = this.getPane();
        const bottomPane = pane.getBottomPane();
        if (bottomPane.getOptions().dragEnabled) {
            const chart = pane.getChart();
            const styles = chart.getStyles().separator;
            this.getContainer().style.background = styles.activeBackgroundColor;
            return true;
        }
        return false;
    }
    _mouseLeaveEvent() {
        if (!this._dragFlag) {
            this.getContainer().style.background = 'transparent';
            return true;
        }
        return false;
    }
    createContainer() {
        return createDom('div', {
            width: '100%',
            height: `${REAL_SEPARATOR_HEIGHT}px`,
            margin: '0',
            padding: '0',
            position: 'absolute',
            top: '-3px',
            zIndex: '20',
            boxSizing: 'border-box',
            cursor: 'ns-resize'
        });
    }
    updateImp(container, _bounding, level) {
        if (level === 4 /* UpdateLevel.All */ || level === 2 /* UpdateLevel.Separator */) {
            const styles = this.getPane().getChart().getStyles().separator;
            container.style.top = `${-Math.floor((REAL_SEPARATOR_HEIGHT - styles.size) / 2)}px`;
            container.style.height = `${REAL_SEPARATOR_HEIGHT}px`;
        }
    }
}

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
class SeparatorPane extends Pane {
    _topPane;
    _bottomPane;
    _separatorWidget;
    constructor(chart, id, topPane, bottomPane) {
        super(chart, id);
        this.getContainer().style.overflow = '';
        this._topPane = topPane;
        this._bottomPane = bottomPane;
        this._separatorWidget = new SeparatorWidget(this.getContainer(), this);
    }
    setBounding(rootBounding) {
        merge(this.getBounding(), rootBounding);
        return this;
    }
    getTopPane() {
        return this._topPane;
    }
    setTopPane(pane) {
        this._topPane = pane;
        return this;
    }
    getBottomPane() {
        return this._bottomPane;
    }
    setBottomPane(pane) {
        this._bottomPane = pane;
        return this;
    }
    getWidget() { return this._separatorWidget; }
    getImage(_includeOverlay) {
        const { width, height } = this.getBounding();
        const styles = this.getChart().getStyles().separator;
        const canvas = createDom('canvas', {
            width: `${width}px`,
            height: `${height}px`,
            boxSizing: 'border-box'
        });
        const ctx = canvas.getContext('2d');
        const pixelRatio = getPixelRatio(canvas);
        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;
        ctx.scale(pixelRatio, pixelRatio);
        ctx.fillStyle = styles.color;
        ctx.fillRect(0, 0, width, height);
        return canvas;
    }
    updateImp(level, container, bounding) {
        if (level === 4 /* UpdateLevel.All */ || level === 2 /* UpdateLevel.Separator */) {
            const styles = this.getChart().getStyles().separator;
            container.style.backgroundColor = styles.color;
            container.style.height = `${bounding.height}px`;
            container.style.marginLeft = `${bounding.left}px`;
            container.style.width = `${bounding.width}px`;
            this._separatorWidget.update(level);
        }
    }
}

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
function isFF() {
    if (typeof window === 'undefined') {
        return false;
    }
    return window.navigator.userAgent.toLowerCase().includes('firefox');
}
function isIOS() {
    if (typeof window === 'undefined') {
        return false;
    }
    return /iPhone|iPad|iPod|iOS/.test(window.navigator.userAgent);
}

/* eslint-disable eslint-comments/require-description -- ignore */
// we can use `const name = 500;` but with `const enum` this values will be inlined into code
// so we do not need to have it as variables
const Delay = {
    ResetClick: 500,
    LongTap: 500,
    PreventFiresTouchEvents: 500
};
const ManhattanDistance = {
    CancelClick: 5,
    CancelTap: 5,
    DoubleClick: 5,
    DoubleTap: 30
};
const MouseEventButton = {
    Left: 0,
    Middle: 1,
    Right: 2
};
const TOUCH_MIN_RADIUS = 10;
// TODO: get rid of a lot of boolean flags, probably we should replace it with some enum
class EventHandlerImp {
    _target;
    _handler;
    _options;
    _clickCount = 0;
    _clickTimeoutId = null;
    _clickCoordinate = { x: Number.NEGATIVE_INFINITY, y: Number.POSITIVE_INFINITY };
    _tapCount = 0;
    _tapTimeoutId = null;
    _tapCoordinate = { x: Number.NEGATIVE_INFINITY, y: Number.POSITIVE_INFINITY };
    _longTapTimeoutId = null;
    _longTapActive = false;
    _mouseMoveStartCoordinate = null;
    _touchMoveStartCoordinate = null;
    _touchMoveExceededManhattanDistance = false;
    _cancelClick = false;
    _cancelTap = false;
    _unsubscribeOutsideMouseEvents = null;
    _unsubscribeOutsideTouchEvents = null;
    _unsubscribeMobileSafariEvents = null;
    _unsubscribeMousemove = null;
    _unsubscribeMouseWheel = null;
    _unsubscribeContextMenu = null;
    _unsubscribeRootMouseEvents = null;
    _unsubscribeRootTouchEvents = null;
    _startPinchMiddleCoordinate = null;
    _startPinchDistance = 0;
    _pinchPrevented = false;
    _preventTouchDragProcess = false;
    _mousePressed = false;
    _lastTouchEventTimeStamp = 0;
    // for touchstart/touchmove/touchend events we handle only first touch
    // i.e. we don't support several active touches at the same time (except pinch event)
    _activeTouchId = null;
    // accept all mouse leave events if it's not an iOS device
    // see _mouseEnterHandler, _mouseMoveHandler, _mouseLeaveHandler
    _acceptMouseLeave = !isIOS();
    constructor(target, handler, options) {
        this._target = target;
        this._handler = handler;
        this._options = options;
        this._init();
    }
    destroy() {
        if (this._unsubscribeOutsideMouseEvents !== null) {
            this._unsubscribeOutsideMouseEvents();
            this._unsubscribeOutsideMouseEvents = null;
        }
        if (this._unsubscribeOutsideTouchEvents !== null) {
            this._unsubscribeOutsideTouchEvents();
            this._unsubscribeOutsideTouchEvents = null;
        }
        if (this._unsubscribeMousemove !== null) {
            this._unsubscribeMousemove();
            this._unsubscribeMousemove = null;
        }
        if (this._unsubscribeMouseWheel !== null) {
            this._unsubscribeMouseWheel();
            this._unsubscribeMouseWheel = null;
        }
        if (this._unsubscribeContextMenu !== null) {
            this._unsubscribeContextMenu();
            this._unsubscribeContextMenu = null;
        }
        if (this._unsubscribeRootMouseEvents !== null) {
            this._unsubscribeRootMouseEvents();
            this._unsubscribeRootMouseEvents = null;
        }
        if (this._unsubscribeRootTouchEvents !== null) {
            this._unsubscribeRootTouchEvents();
            this._unsubscribeRootTouchEvents = null;
        }
        if (this._unsubscribeMobileSafariEvents !== null) {
            this._unsubscribeMobileSafariEvents();
            this._unsubscribeMobileSafariEvents = null;
        }
        this._clearLongTapTimeout();
        this._resetClickTimeout();
    }
    _mouseEnterHandler(enterEvent) {
        this._unsubscribeMousemove?.();
        this._unsubscribeMouseWheel?.();
        this._unsubscribeContextMenu?.();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const boundMouseMoveHandler = this._mouseMoveHandler.bind(this);
        this._unsubscribeMousemove = () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            this._target.removeEventListener('mousemove', boundMouseMoveHandler);
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        this._target.addEventListener('mousemove', boundMouseMoveHandler);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const boundMouseWheel = this._mouseWheelHandler.bind(this);
        this._unsubscribeMouseWheel = () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            this._target.removeEventListener('wheel', boundMouseWheel);
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        this._target.addEventListener('wheel', boundMouseWheel, { passive: false });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const boundContextMenu = this._contextMenuHandler.bind(this);
        this._unsubscribeContextMenu = () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            this._target.removeEventListener('contextmenu', boundContextMenu);
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        this._target.addEventListener('contextmenu', boundContextMenu, { passive: false });
        if (this._firesTouchEvents(enterEvent)) {
            return;
        }
        this._processEvent(this._makeCompatEvent(enterEvent), this._handler.mouseEnterEvent);
        this._acceptMouseLeave = true;
    }
    _resetClickTimeout() {
        if (this._clickTimeoutId !== null) {
            clearTimeout(this._clickTimeoutId);
        }
        this._clickCount = 0;
        this._clickTimeoutId = null;
        this._clickCoordinate = { x: Number.NEGATIVE_INFINITY, y: Number.POSITIVE_INFINITY };
    }
    _resetTapTimeout() {
        if (this._tapTimeoutId !== null) {
            clearTimeout(this._tapTimeoutId);
        }
        this._tapCount = 0;
        this._tapTimeoutId = null;
        this._tapCoordinate = { x: Number.NEGATIVE_INFINITY, y: Number.POSITIVE_INFINITY };
    }
    _mouseMoveHandler(moveEvent) {
        if (this._mousePressed || this._touchMoveStartCoordinate !== null) {
            return;
        }
        if (this._firesTouchEvents(moveEvent)) {
            return;
        }
        this._processEvent(this._makeCompatEvent(moveEvent), this._handler.mouseMoveEvent);
        this._acceptMouseLeave = true;
    }
    _mouseWheelHandler(wheelEvent) {
        this._preventDefault(wheelEvent);
        const evt = this._makeCompatEvent(wheelEvent);
        // Handle horizontal pan (deltaX)
        if (Math.abs(wheelEvent.deltaX) > 0 && isValid(this._handler.mouseWheelHortEvent)) {
            this._handler.mouseWheelHortEvent(evt, -wheelEvent.deltaX);
        }
        // Handle vertical zoom (deltaY) — both axes fire from same event
        if (isValid(this._handler.mouseWheelVertEvent)) {
            let deltaY = -(wheelEvent.deltaY / 100);
            if (deltaY !== 0) {
                switch (wheelEvent.deltaMode) {
                    case wheelEvent.DOM_DELTA_PAGE: {
                        deltaY *= 120;
                        break;
                    }
                    case wheelEvent.DOM_DELTA_LINE: {
                        deltaY *= 32;
                        break;
                    }
                }
                if (deltaY !== 0) {
                    const scale = Math.sign(deltaY) * Math.min(1, Math.abs(deltaY));
                    this._handler.mouseWheelVertEvent(evt, scale);
                }
            }
        }
    }
    _contextMenuHandler(mouseEvent) {
        this._preventDefault(mouseEvent);
    }
    _touchMoveHandler(moveEvent) {
        const touch = this._touchWithId(moveEvent.changedTouches, this._activeTouchId);
        if (touch === null) {
            return;
        }
        this._lastTouchEventTimeStamp = this._eventTimeStamp(moveEvent);
        if (this._startPinchMiddleCoordinate !== null) {
            return;
        }
        if (this._preventTouchDragProcess) {
            return;
        }
        // prevent pinch if move event comes faster than the second touch
        this._pinchPrevented = true;
        const moveInfo = this._mouseTouchMoveWithDownInfo(this._getCoordinate(touch), this._touchMoveStartCoordinate);
        const { xOffset, yOffset, manhattanDistance } = moveInfo;
        if (!this._touchMoveExceededManhattanDistance && manhattanDistance < ManhattanDistance.CancelTap) {
            return;
        }
        if (!this._touchMoveExceededManhattanDistance) {
            // first time when current position exceeded manhattan distance
            // vertical drag is more important than horizontal drag
            // because we scroll the page vertically often than horizontally
            const correctedXOffset = xOffset * 0.5;
            // a drag can be only if touch page scroll isn't allowed
            const isVertDrag = yOffset >= correctedXOffset && !this._options.treatVertDragAsPageScroll();
            const isHorzDrag = correctedXOffset > yOffset && !this._options.treatHorzDragAsPageScroll();
            // if drag event happened then we should revert preventDefault state to original one
            // and try to process the drag event
            // else we shouldn't prevent default of the event and ignore processing the drag event
            if (!isVertDrag && !isHorzDrag) {
                this._preventTouchDragProcess = true;
            }
            this._touchMoveExceededManhattanDistance = true;
            // if manhattan distance is more that 5 - we should cancel tap event
            this._cancelTap = true;
            this._clearLongTapTimeout();
            this._resetTapTimeout();
        }
        if (!this._preventTouchDragProcess) {
            this._processEvent(this._makeCompatEvent(moveEvent, touch), this._handler.touchMoveEvent);
            // we should prevent default in case of touch only
            // to prevent scroll of the page
            // preventDefault(moveEvent)
        }
    }
    _mouseMoveWithDownHandler(moveEvent) {
        if (moveEvent.button !== MouseEventButton.Left) {
            return;
        }
        const moveInfo = this._mouseTouchMoveWithDownInfo(this._getCoordinate(moveEvent), this._mouseMoveStartCoordinate);
        const { manhattanDistance } = moveInfo;
        if (manhattanDistance >= ManhattanDistance.CancelClick) {
            // if manhattan distance is more that 5 - we should cancel click event
            this._cancelClick = true;
            this._resetClickTimeout();
        }
        if (this._cancelClick) {
            // if this._cancelClick is true, that means that minimum manhattan distance is already exceeded
            this._processEvent(this._makeCompatEvent(moveEvent), this._handler.pressedMouseMoveEvent);
        }
    }
    _mouseTouchMoveWithDownInfo(currentCoordinate, startCoordinate) {
        const xOffset = Math.abs(startCoordinate.x - currentCoordinate.x);
        const yOffset = Math.abs(startCoordinate.y - currentCoordinate.y);
        const manhattanDistance = xOffset + yOffset;
        return { xOffset, yOffset, manhattanDistance };
    }
    /**
     * In Firefox mouse events dont't fire if the mouse position is outside of the browser's border.
     * To prevent the mouse from hanging while pressed we're subscribing on the mouseleave event of the document element.
     * We're subscribing on mouseleave, but this event is actually fired on mouseup outside of the browser's border.
     */
    _onFirefoxOutsideMouseUp = (mouseUpEvent) => {
        this._mouseUpHandler(mouseUpEvent);
    };
    /**
     * Safari doesn't fire touchstart/mousedown events on double tap since iOS 13.
     * There are two possible solutions:
     * 1) Call preventDefault in touchEnd handler. But it also prevents click event from firing.
     * 2) Add listener on dblclick event that fires with the preceding mousedown/mouseup.
     * https://developer.apple.com/forums/thread/125073
     */
    _onMobileSafariDoubleClick = (dblClickEvent) => {
        if (this._firesTouchEvents(dblClickEvent)) {
            ++this._tapCount;
            if (this._tapTimeoutId !== null && this._tapCount > 1) {
                const { manhattanDistance } = this._mouseTouchMoveWithDownInfo(this._getCoordinate(dblClickEvent), this._tapCoordinate);
                if (manhattanDistance < ManhattanDistance.DoubleTap && !this._cancelTap) {
                    this._processEvent(this._makeCompatEvent(dblClickEvent), this._handler.doubleTapEvent);
                }
                this._resetTapTimeout();
            }
        }
        else {
            ++this._clickCount;
            if (this._clickTimeoutId !== null && this._clickCount > 1) {
                const { manhattanDistance } = this._mouseTouchMoveWithDownInfo(this._getCoordinate(dblClickEvent), this._clickCoordinate);
                if (manhattanDistance < ManhattanDistance.DoubleClick && !this._cancelClick) {
                    this._processEvent(this._makeCompatEvent(dblClickEvent), this._handler.mouseDoubleClickEvent);
                }
                this._resetClickTimeout();
            }
        }
    };
    _touchEndHandler(touchEndEvent) {
        let touch = this._touchWithId(touchEndEvent.changedTouches, this._activeTouchId);
        if (touch === null && touchEndEvent.touches.length === 0) {
            // something went wrong, somehow we missed the required touchend event
            // probably the browser has not sent this event
            touch = touchEndEvent.changedTouches[0];
        }
        if (touch === null) {
            return;
        }
        this._activeTouchId = null;
        this._lastTouchEventTimeStamp = this._eventTimeStamp(touchEndEvent);
        this._clearLongTapTimeout();
        this._touchMoveStartCoordinate = null;
        if (this._unsubscribeRootTouchEvents !== null) {
            this._unsubscribeRootTouchEvents();
            this._unsubscribeRootTouchEvents = null;
        }
        const compatEvent = this._makeCompatEvent(touchEndEvent, touch);
        this._processEvent(compatEvent, this._handler.touchEndEvent);
        ++this._tapCount;
        if (this._tapTimeoutId !== null && this._tapCount > 1) {
            // check that both clicks are near enough
            const { manhattanDistance } = this._mouseTouchMoveWithDownInfo(this._getCoordinate(touch), this._tapCoordinate);
            if (manhattanDistance < ManhattanDistance.DoubleTap && !this._cancelTap) {
                this._processEvent(compatEvent, this._handler.doubleTapEvent);
            }
            this._resetTapTimeout();
        }
        else {
            if (!this._cancelTap) {
                this._processEvent(compatEvent, this._handler.tapEvent);
                // do not fire mouse events if tap handler was executed
                // prevent click event on new dom element (who appeared after tap)
                if (isValid(this._handler.tapEvent)) {
                    this._preventDefault(touchEndEvent);
                }
            }
        }
        // prevent, for example, safari's dblclick-to-zoom or fast-click after long-tap
        // we handle mouseDoubleClickEvent here ourselves
        if (this._tapCount === 0) {
            this._preventDefault(touchEndEvent);
        }
        if (touchEndEvent.touches.length === 0) {
            if (this._longTapActive) {
                this._longTapActive = false;
                // prevent native click event
                this._preventDefault(touchEndEvent);
            }
        }
    }
    _mouseUpHandler(mouseUpEvent) {
        if (mouseUpEvent.button !== MouseEventButton.Left) {
            return;
        }
        const compatEvent = this._makeCompatEvent(mouseUpEvent);
        this._mouseMoveStartCoordinate = null;
        this._mousePressed = false;
        if (this._unsubscribeRootMouseEvents !== null) {
            this._unsubscribeRootMouseEvents();
            this._unsubscribeRootMouseEvents = null;
        }
        if (isFF()) {
            const rootElement = this._target.ownerDocument.documentElement;
            rootElement.removeEventListener('mouseleave', this._onFirefoxOutsideMouseUp);
        }
        if (this._firesTouchEvents(mouseUpEvent)) {
            return;
        }
        this._processEvent(compatEvent, this._handler.mouseUpEvent);
        ++this._clickCount;
        if (this._clickTimeoutId !== null && this._clickCount > 1) {
            // check that both clicks are near enough
            const { manhattanDistance } = this._mouseTouchMoveWithDownInfo(this._getCoordinate(mouseUpEvent), this._clickCoordinate);
            if (manhattanDistance < ManhattanDistance.DoubleClick && !this._cancelClick) {
                this._processEvent(compatEvent, this._handler.mouseDoubleClickEvent);
            }
            this._resetClickTimeout();
        }
        else {
            if (!this._cancelClick) {
                this._processEvent(compatEvent, this._handler.mouseClickEvent);
            }
        }
    }
    _clearLongTapTimeout() {
        if (this._longTapTimeoutId === null) {
            return;
        }
        clearTimeout(this._longTapTimeoutId);
        this._longTapTimeoutId = null;
    }
    _touchStartHandler(downEvent) {
        if (this._activeTouchId !== null) {
            return;
        }
        const touch = downEvent.changedTouches[0];
        this._activeTouchId = touch.identifier;
        this._lastTouchEventTimeStamp = this._eventTimeStamp(downEvent);
        const rootElement = this._target.ownerDocument.documentElement;
        this._cancelTap = false;
        this._touchMoveExceededManhattanDistance = false;
        this._preventTouchDragProcess = false;
        this._touchMoveStartCoordinate = this._getCoordinate(touch);
        if (this._unsubscribeRootTouchEvents !== null) {
            this._unsubscribeRootTouchEvents();
            this._unsubscribeRootTouchEvents = null;
        }
        {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const boundTouchMoveWithDownHandler = this._touchMoveHandler.bind(this);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const boundTouchEndHandler = this._touchEndHandler.bind(this);
            this._unsubscribeRootTouchEvents = () => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                rootElement.removeEventListener('touchmove', boundTouchMoveWithDownHandler);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                rootElement.removeEventListener('touchend', boundTouchEndHandler);
            };
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            rootElement.addEventListener('touchmove', boundTouchMoveWithDownHandler, { passive: false });
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            rootElement.addEventListener('touchend', boundTouchEndHandler, { passive: false });
            this._clearLongTapTimeout();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            this._longTapTimeoutId = setTimeout(this._longTapHandler.bind(this, downEvent), Delay.LongTap);
        }
        this._processEvent(this._makeCompatEvent(downEvent, touch), this._handler.touchStartEvent);
        if (this._tapTimeoutId === null) {
            this._tapCount = 0;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            this._tapTimeoutId = setTimeout(this._resetTapTimeout.bind(this), Delay.ResetClick);
            this._tapCoordinate = this._getCoordinate(touch);
        }
    }
    _mouseDownHandler(downEvent) {
        if (downEvent.button === MouseEventButton.Right) {
            this._preventDefault(downEvent);
            this._processEvent(this._makeCompatEvent(downEvent), this._handler.mouseRightClickEvent);
            return;
        }
        if (downEvent.button !== MouseEventButton.Left) {
            return;
        }
        const rootElement = this._target.ownerDocument.documentElement;
        if (isFF()) {
            rootElement.addEventListener('mouseleave', this._onFirefoxOutsideMouseUp);
        }
        this._cancelClick = false;
        this._mouseMoveStartCoordinate = this._getCoordinate(downEvent);
        if (this._unsubscribeRootMouseEvents !== null) {
            this._unsubscribeRootMouseEvents();
            this._unsubscribeRootMouseEvents = null;
        }
        {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const boundMouseMoveWithDownHandler = this._mouseMoveWithDownHandler.bind(this);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const boundMouseUpHandler = this._mouseUpHandler.bind(this);
            this._unsubscribeRootMouseEvents = () => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                rootElement.removeEventListener('mousemove', boundMouseMoveWithDownHandler);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                rootElement.removeEventListener('mouseup', boundMouseUpHandler);
            };
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            rootElement.addEventListener('mousemove', boundMouseMoveWithDownHandler);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            rootElement.addEventListener('mouseup', boundMouseUpHandler);
        }
        this._mousePressed = true;
        if (this._firesTouchEvents(downEvent)) {
            return;
        }
        this._processEvent(this._makeCompatEvent(downEvent), this._handler.mouseDownEvent);
        if (this._clickTimeoutId === null) {
            this._clickCount = 0;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            this._clickTimeoutId = setTimeout(this._resetClickTimeout.bind(this), Delay.ResetClick);
            this._clickCoordinate = this._getCoordinate(downEvent);
        }
    }
    _init() {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        this._target.addEventListener('mouseenter', this._mouseEnterHandler.bind(this));
        // Do not show context menu when something went wrong
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        this._target.addEventListener('touchcancel', this._clearLongTapTimeout.bind(this));
        {
            const doc = this._target.ownerDocument;
            const outsideHandler = (event) => {
                if (this._handler.mouseDownOutsideEvent == null) {
                    return;
                }
                if (event.composed && this._target.contains(event.composedPath()[0])) {
                    return;
                }
                if ((event.target !== null) && this._target.contains(event.target)) {
                    return;
                }
                this._handler.mouseDownOutsideEvent({ x: 0, y: 0, pageX: 0, pageY: 0 });
            };
            this._unsubscribeOutsideTouchEvents = () => {
                doc.removeEventListener('touchstart', outsideHandler);
            };
            this._unsubscribeOutsideMouseEvents = () => {
                doc.removeEventListener('mousedown', outsideHandler);
            };
            doc.addEventListener('mousedown', outsideHandler);
            doc.addEventListener('touchstart', outsideHandler, { passive: true });
        }
        if (isIOS()) {
            this._unsubscribeMobileSafariEvents = () => {
                this._target.removeEventListener('dblclick', this._onMobileSafariDoubleClick);
            };
            this._target.addEventListener('dblclick', this._onMobileSafariDoubleClick);
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        this._target.addEventListener('mouseleave', this._mouseLeaveHandler.bind(this));
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        this._target.addEventListener('touchstart', this._touchStartHandler.bind(this), { passive: true });
        this._target.addEventListener('mousedown', (e) => {
            if (e.button === MouseEventButton.Middle) {
                // prevent incorrect scrolling event
                e.preventDefault();
                return false;
            }
            return undefined;
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        this._target.addEventListener('mousedown', this._mouseDownHandler.bind(this));
        this._initPinch();
        // Hey mobile Safari, what's up?
        // If mobile Safari doesn't have any touchmove handler with passive=false
        // it treats a touchstart and the following touchmove events as cancelable=false,
        // so we can't prevent them (as soon we subscribe on touchmove inside touchstart's handler).
        // And we'll get scroll of the page along with chart's one instead of only chart's scroll.
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this._target.addEventListener('touchmove', () => { }, { passive: false });
    }
    _initPinch() {
        if (!isValid(this._handler.pinchStartEvent) &&
            !isValid(this._handler.pinchEvent) &&
            !isValid(this._handler.pinchEndEvent)) {
            return;
        }
        this._target.addEventListener('touchstart', (event) => { this._checkPinchState(event.touches); }, { passive: true });
        this._target.addEventListener('touchmove', (event) => {
            if (event.touches.length !== 2 || this._startPinchMiddleCoordinate === null) {
                return;
            }
            if (isValid(this._handler.pinchEvent)) {
                const currentDistance = this._getTouchDistance(event.touches[0], event.touches[1]);
                const scale = currentDistance / this._startPinchDistance;
                this._handler.pinchEvent({ ...this._startPinchMiddleCoordinate, pageX: 0, pageY: 0 }, scale);
                this._preventDefault(event);
            }
        }, { passive: false });
        this._target.addEventListener('touchend', (event) => {
            this._checkPinchState(event.touches);
        });
    }
    _checkPinchState(touches) {
        if (touches.length === 1) {
            this._pinchPrevented = false;
        }
        if (touches.length !== 2 || this._pinchPrevented || this._longTapActive) {
            this._stopPinch();
        }
        else {
            this._startPinch(touches);
        }
    }
    _startPinch(touches) {
        const box = this._target.getBoundingClientRect();
        this._startPinchMiddleCoordinate = {
            x: ((touches[0].clientX - box.left) + (touches[1].clientX - box.left)) / 2,
            y: ((touches[0].clientY - box.top) + (touches[1].clientY - box.top)) / 2
        };
        this._startPinchDistance = this._getTouchDistance(touches[0], touches[1]);
        if (isValid(this._handler.pinchStartEvent)) {
            this._handler.pinchStartEvent({ x: 0, y: 0, pageX: 0, pageY: 0 });
        }
        this._clearLongTapTimeout();
    }
    _stopPinch() {
        if (this._startPinchMiddleCoordinate === null) {
            return;
        }
        this._startPinchMiddleCoordinate = null;
        if (isValid(this._handler.pinchEndEvent)) {
            this._handler.pinchEndEvent({ x: 0, y: 0, pageX: 0, pageY: 0 });
        }
    }
    _mouseLeaveHandler(event) {
        this._unsubscribeMousemove?.();
        this._unsubscribeMouseWheel?.();
        this._unsubscribeContextMenu?.();
        if (this._firesTouchEvents(event)) {
            return;
        }
        if (!this._acceptMouseLeave) {
            // mobile Safari sometimes emits mouse leave event for no reason, there is no way to handle it in other way
            // just ignore this event if there was no mouse move or mouse enter events
            return;
        }
        this._processEvent(this._makeCompatEvent(event), this._handler.mouseLeaveEvent);
        // accept all mouse leave events if it's not an iOS device
        this._acceptMouseLeave = !isIOS();
    }
    _longTapHandler(event) {
        const touch = this._touchWithId(event.touches, this._activeTouchId);
        if (touch === null) {
            return;
        }
        this._processEvent(this._makeCompatEvent(event, touch), this._handler.longTapEvent);
        this._cancelTap = true;
        // long tap is active until touchend event with 0 touches occurred
        this._longTapActive = true;
    }
    _firesTouchEvents(e) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (isValid(e.sourceCapabilities?.firesTouchEvents)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
            return e.sourceCapabilities.firesTouchEvents;
        }
        return this._eventTimeStamp(e) < this._lastTouchEventTimeStamp + Delay.PreventFiresTouchEvents;
    }
    _processEvent(event, callback) {
        callback?.call(this._handler, event);
    }
    _makeCompatEvent(event, touch) {
        // TouchEvent has no clientX/Y coordinates:
        // We have to use the last Touch instead
        const eventLike = touch ?? event;
        const box = this._target.getBoundingClientRect();
        return {
            x: eventLike.clientX - box.left,
            y: eventLike.clientY - box.top,
            pageX: eventLike.pageX,
            pageY: eventLike.pageY,
            isTouch: !event.type.startsWith('mouse') && event.type !== 'contextmenu' && event.type !== 'click' && event.type !== 'wheel',
            preventDefault: () => {
                if (event.type !== 'touchstart') {
                    // touchstart is passive and cannot be prevented
                    this._preventDefault(event);
                }
            }
        };
    }
    _getTouchDistance(p1, p2) {
        const xDiff = p1.clientX - p2.clientX;
        const yDiff = p1.clientY - p2.clientY;
        return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    }
    _preventDefault(event) {
        if (event.cancelable) {
            event.preventDefault();
        }
    }
    _getCoordinate(eventLike) {
        return {
            x: eventLike.pageX,
            y: eventLike.pageY
        };
    }
    _eventTimeStamp(e) {
        // for some reason e.timestamp is always 0 on iPad with magic mouse, so we use performance.now() as a fallback
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        return e.timeStamp ?? performance.now();
    }
    _touchWithId(touches, id) {
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < touches.length; ++i) {
            if (touches[i].identifier === id) {
                return touches[i];
            }
        }
        return null;
    }
}

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
class Event {
    _container;
    _chart;
    _event;
    // 惯性滚动开始时间
    _flingStartTime = new Date().getTime();
    // 惯性滚动定时器
    _flingScrollRequestId = null;
    // 开始滚动时坐标点
    _startScrollCoordinate = null;
    // 开始触摸时坐标
    _touchCoordinate = null;
    // 是否是取消了十字光标
    _touchCancelCrosshair = false;
    // 是否缩放过
    _touchZoomed = false;
    // 用来记录捏合缩放的尺寸
    _pinchScale = 1;
    _mouseDownWidget = null;
    _prevYAxisRange = null;
    _xAxisStartScaleCoordinate = null;
    _xAxisStartScaleDistance = 0;
    _xAxisScale = 1;
    _yAxisStartScaleDistance = 0;
    _mouseMoveTriggerWidgetInfo = { pane: null, widget: null };
    _boundKeyBoardDownEvent = (event) => {
        if (event.shiftKey) {
            switch (event.code) {
                case 'Equal': {
                    this._chart.getChartStore().zoom(0.5, null, 'main');
                    break;
                }
                case 'Minus': {
                    this._chart.getChartStore().zoom(-0.5, null, 'main');
                    break;
                }
                case 'ArrowLeft': {
                    const store = this._chart.getChartStore();
                    store.startScroll();
                    store.scroll(-3 * store.getBarSpace().bar);
                    break;
                }
                case 'ArrowRight': {
                    const store = this._chart.getChartStore();
                    store.startScroll();
                    store.scroll(3 * store.getBarSpace().bar);
                    break;
                }
            }
        }
    };
    constructor(container, chart) {
        this._container = container;
        this._chart = chart;
        this._event = new EventHandlerImp(container, this, {
            treatVertDragAsPageScroll: () => false,
            treatHorzDragAsPageScroll: () => false
        });
        container.addEventListener('keydown', this._boundKeyBoardDownEvent);
    }
    pinchStartEvent() {
        this._touchZoomed = true;
        this._pinchScale = 1;
        return true;
    }
    pinchEvent(e, scale) {
        const { pane, widget } = this._findWidgetByEvent(e);
        if (pane?.getId() !== PaneIdConstants.X_AXIS && widget?.getName() === WidgetNameConstants.MAIN) {
            const event = this._makeWidgetEvent(e, widget);
            const zoomScale = (scale - this._pinchScale) * 5;
            this._pinchScale = scale;
            this._chart.getChartStore().zoom(zoomScale, { x: event.x, y: event.y }, 'main');
            return true;
        }
        return false;
    }
    mouseWheelHortEvent(_, distance) {
        const store = this._chart.getChartStore();
        store.startScroll();
        store.scroll(distance);
        return true;
    }
    mouseWheelVertEvent(e, scale) {
        const { widget } = this._findWidgetByEvent(e);
        const event = this._makeWidgetEvent(e, widget);
        const name = widget?.getName();
        if (name === WidgetNameConstants.MAIN) {
            this._chart.getChartStore().zoom(scale, { x: event.x, y: event.y }, 'main');
            return true;
        }
        return false;
    }
    mouseDownEvent(e) {
        const { pane, widget } = this._findWidgetByEvent(e);
        this._mouseDownWidget = widget;
        if (widget !== null) {
            const event = this._makeWidgetEvent(e, widget);
            const name = widget.getName();
            switch (name) {
                case WidgetNameConstants.SEPARATOR: {
                    return widget.dispatchEvent('mouseDownEvent', event);
                }
                case WidgetNameConstants.MAIN: {
                    const yAxis = pane.getAxisComponent();
                    if (!yAxis.getAutoCalcTickFlag()) {
                        const range = yAxis.getRange();
                        this._prevYAxisRange = { ...range };
                    }
                    this._startScrollCoordinate = { x: event.x, y: event.y };
                    this._chart.getChartStore().startScroll();
                    return widget.dispatchEvent('mouseDownEvent', event);
                }
                case WidgetNameConstants.X_AXIS: {
                    return this._processXAxisScrollStartEvent(widget, event);
                }
                case WidgetNameConstants.Y_AXIS: {
                    return this._processYAxisScaleStartEvent(widget, event);
                }
            }
        }
        return false;
    }
    mouseMoveEvent(e) {
        const { pane, widget } = this._findWidgetByEvent(e);
        const event = this._makeWidgetEvent(e, widget);
        if (this._mouseMoveTriggerWidgetInfo.pane?.getId() !== pane?.getId() ||
            this._mouseMoveTriggerWidgetInfo.widget?.getName() !== widget?.getName()) {
            widget?.dispatchEvent('mouseEnterEvent', event);
            this._mouseMoveTriggerWidgetInfo.widget?.dispatchEvent('mouseLeaveEvent', event);
            this._mouseMoveTriggerWidgetInfo = { pane, widget };
        }
        if (widget !== null) {
            const name = widget.getName();
            switch (name) {
                case WidgetNameConstants.MAIN: {
                    const consumed = widget.dispatchEvent('mouseMoveEvent', event);
                    let crosshair = { x: event.x, y: event.y, paneId: pane?.getId() };
                    if (consumed) {
                        if (widget.getForceCursor() !== 'pointer') {
                            crosshair = undefined;
                        }
                        widget.setCursor('pointer');
                    }
                    else {
                        widget.setCursor('crosshair');
                    }
                    this._chart.getChartStore().setCrosshair(crosshair);
                    return consumed;
                }
                case WidgetNameConstants.SEPARATOR:
                case WidgetNameConstants.X_AXIS:
                case WidgetNameConstants.Y_AXIS: {
                    const consumed = widget.dispatchEvent('mouseMoveEvent', event);
                    this._chart.getChartStore().setCrosshair();
                    return consumed;
                }
            }
        }
        return false;
    }
    pressedMouseMoveEvent(e) {
        if (this._mouseDownWidget !== null && this._mouseDownWidget.getName() === WidgetNameConstants.SEPARATOR) {
            return this._mouseDownWidget.dispatchEvent('pressedMouseMoveEvent', e);
        }
        const { pane, widget } = this._findWidgetByEvent(e);
        if (widget !== null &&
            this._mouseDownWidget?.getPane().getId() === pane?.getId() &&
            this._mouseDownWidget?.getName() === widget.getName()) {
            const event = this._makeWidgetEvent(e, widget);
            const name = widget.getName();
            switch (name) {
                case WidgetNameConstants.MAIN: {
                    // eslint-disable-next-line @typescript-eslint/init-declarations -- ignore
                    let crosshair;
                    const consumed = widget.dispatchEvent('pressedMouseMoveEvent', event);
                    if (!consumed) {
                        this._processMainScrollingEvent(widget, event);
                    }
                    if (!consumed || widget.getForceCursor() === 'pointer') {
                        crosshair = { x: event.x, y: event.y, paneId: pane?.getId() };
                    }
                    this._chart.getChartStore().setCrosshair(crosshair, { forceInvalidate: true });
                    return consumed;
                }
                case WidgetNameConstants.X_AXIS: {
                    return this._processXAxisScrollingEvent(widget, event);
                }
                case WidgetNameConstants.Y_AXIS: {
                    return this._processYAxisScalingEvent(widget, event);
                }
            }
        }
        return false;
    }
    mouseUpEvent(e) {
        const { widget } = this._findWidgetByEvent(e);
        let consumed = false;
        if (widget !== null) {
            const event = this._makeWidgetEvent(e, widget);
            const name = widget.getName();
            switch (name) {
                case WidgetNameConstants.MAIN:
                case WidgetNameConstants.SEPARATOR:
                case WidgetNameConstants.X_AXIS:
                case WidgetNameConstants.Y_AXIS: {
                    consumed = widget.dispatchEvent('mouseUpEvent', event);
                    break;
                }
            }
            if (consumed) {
                this._chart.updatePane(1 /* UpdateLevel.Overlay */);
            }
        }
        this._mouseDownWidget = null;
        this._startScrollCoordinate = null;
        this._prevYAxisRange = null;
        this._xAxisStartScaleCoordinate = null;
        this._xAxisStartScaleDistance = 0;
        this._xAxisScale = 1;
        this._yAxisStartScaleDistance = 0;
        return consumed;
    }
    mouseClickEvent(e) {
        const { widget } = this._findWidgetByEvent(e);
        if (widget !== null) {
            const event = this._makeWidgetEvent(e, widget);
            return widget.dispatchEvent('mouseClickEvent', event);
        }
        return false;
    }
    mouseRightClickEvent(e) {
        const { widget } = this._findWidgetByEvent(e);
        let consumed = false;
        if (widget !== null) {
            const event = this._makeWidgetEvent(e, widget);
            const name = widget.getName();
            switch (name) {
                case WidgetNameConstants.MAIN:
                case WidgetNameConstants.X_AXIS:
                case WidgetNameConstants.Y_AXIS: {
                    consumed = widget.dispatchEvent('mouseRightClickEvent', event);
                    break;
                }
            }
            if (consumed) {
                this._chart.updatePane(1 /* UpdateLevel.Overlay */);
            }
        }
        return false;
    }
    mouseDoubleClickEvent(e) {
        const { pane, widget } = this._findWidgetByEvent(e);
        if (widget !== null) {
            const name = widget.getName();
            switch (name) {
                case WidgetNameConstants.MAIN: {
                    const event = this._makeWidgetEvent(e, widget);
                    return widget.dispatchEvent('mouseDoubleClickEvent', event);
                }
                case WidgetNameConstants.Y_AXIS: {
                    const yAxis = pane.getAxisComponent();
                    if (!yAxis.getAutoCalcTickFlag()) {
                        yAxis.setAutoCalcTickFlag(true);
                        this._chart.layout({
                            measureWidth: true,
                            update: true,
                            buildYAxisTick: true
                        });
                        return true;
                    }
                    break;
                }
            }
        }
        return false;
    }
    mouseLeaveEvent() {
        this._chart.getChartStore().setCrosshair();
        return true;
    }
    touchStartEvent(e) {
        const { pane, widget } = this._findWidgetByEvent(e);
        if (widget !== null) {
            const event = this._makeWidgetEvent(e, widget);
            event.preventDefault?.();
            const name = widget.getName();
            switch (name) {
                case WidgetNameConstants.MAIN: {
                    const chartStore = this._chart.getChartStore();
                    if (widget.dispatchEvent('mouseDownEvent', event)) {
                        this._touchCancelCrosshair = true;
                        this._touchCoordinate = null;
                        chartStore.setCrosshair(undefined, { notInvalidate: true });
                        this._chart.updatePane(1 /* UpdateLevel.Overlay */);
                        return true;
                    }
                    if (this._flingScrollRequestId !== null) {
                        cancelAnimationFrame(this._flingScrollRequestId);
                        this._flingScrollRequestId = null;
                    }
                    this._flingStartTime = new Date().getTime();
                    const yAxis = pane.getAxisComponent();
                    if (!yAxis.getAutoCalcTickFlag()) {
                        const range = yAxis.getRange();
                        this._prevYAxisRange = { ...range };
                    }
                    this._startScrollCoordinate = { x: event.x, y: event.y };
                    chartStore.startScroll();
                    this._touchZoomed = false;
                    if (this._touchCoordinate !== null) {
                        const xDif = event.x - this._touchCoordinate.x;
                        const yDif = event.y - this._touchCoordinate.y;
                        const radius = Math.sqrt(xDif * xDif + yDif * yDif);
                        if (radius < TOUCH_MIN_RADIUS) {
                            this._touchCoordinate = { x: event.x, y: event.y };
                            chartStore.setCrosshair({ x: event.x, y: event.y, paneId: pane?.getId() });
                        }
                        else {
                            this._touchCoordinate = null;
                            this._touchCancelCrosshair = true;
                            chartStore.setCrosshair();
                        }
                    }
                    return true;
                }
                case WidgetNameConstants.X_AXIS: {
                    return this._processXAxisScrollStartEvent(widget, event);
                }
                case WidgetNameConstants.Y_AXIS: {
                    return this._processYAxisScaleStartEvent(widget, event);
                }
            }
        }
        return false;
    }
    touchMoveEvent(e) {
        const { pane, widget } = this._findWidgetByEvent(e);
        if (widget !== null) {
            const event = this._makeWidgetEvent(e, widget);
            const name = widget.getName();
            const chartStore = this._chart.getChartStore();
            switch (name) {
                case WidgetNameConstants.MAIN: {
                    if (widget.dispatchEvent('pressedMouseMoveEvent', event)) {
                        event.preventDefault?.();
                        chartStore.setCrosshair(undefined, { notInvalidate: true });
                        this._chart.updatePane(1 /* UpdateLevel.Overlay */);
                        return true;
                    }
                    if (this._touchCoordinate !== null) {
                        event.preventDefault?.();
                        chartStore.setCrosshair({ x: event.x, y: event.y, paneId: pane?.getId() });
                    }
                    else {
                        this._processMainScrollingEvent(widget, event);
                    }
                    return true;
                }
                case WidgetNameConstants.X_AXIS: {
                    event.preventDefault?.();
                    return this._processXAxisScrollingEvent(widget, event);
                }
                case WidgetNameConstants.Y_AXIS: {
                    return this._processYAxisScalingEvent(widget, event);
                }
            }
        }
        return false;
    }
    touchEndEvent(e) {
        const { widget } = this._findWidgetByEvent(e);
        if (widget !== null) {
            const event = this._makeWidgetEvent(e, widget);
            const name = widget.getName();
            switch (name) {
                case WidgetNameConstants.MAIN: {
                    widget.dispatchEvent('mouseUpEvent', event);
                    if (this._startScrollCoordinate !== null) {
                        const time = new Date().getTime() - this._flingStartTime;
                        const distance = event.x - this._startScrollCoordinate.x;
                        let v = distance / (time > 0 ? time : 1) * 20;
                        if (time < 200 && Math.abs(v) > 0) {
                            const store = this._chart.getChartStore();
                            const flingScroll = () => {
                                this._flingScrollRequestId = requestAnimationFrame(() => {
                                    store.startScroll();
                                    store.scroll(v);
                                    v = v * (1 - 0.025);
                                    if (Math.abs(v) < 1) {
                                        if (this._flingScrollRequestId !== null) {
                                            cancelAnimationFrame(this._flingScrollRequestId);
                                            this._flingScrollRequestId = null;
                                        }
                                    }
                                    else {
                                        flingScroll();
                                    }
                                });
                            };
                            flingScroll();
                        }
                    }
                    return true;
                }
                case WidgetNameConstants.X_AXIS:
                case WidgetNameConstants.Y_AXIS: {
                    const consumed = widget.dispatchEvent('mouseUpEvent', event);
                    if (consumed) {
                        this._chart.updatePane(1 /* UpdateLevel.Overlay */);
                    }
                }
            }
            this._startScrollCoordinate = null;
            this._prevYAxisRange = null;
            this._xAxisStartScaleCoordinate = null;
            this._xAxisStartScaleDistance = 0;
            this._xAxisScale = 1;
            this._yAxisStartScaleDistance = 0;
        }
        return false;
    }
    tapEvent(e) {
        const { pane, widget } = this._findWidgetByEvent(e);
        let consumed = false;
        if (widget !== null) {
            const event = this._makeWidgetEvent(e, widget);
            const result = widget.dispatchEvent('mouseClickEvent', event);
            if (widget.getName() === WidgetNameConstants.MAIN) {
                const event = this._makeWidgetEvent(e, widget);
                const chartStore = this._chart.getChartStore();
                if (result) {
                    this._touchCancelCrosshair = true;
                    this._touchCoordinate = null;
                    chartStore.setCrosshair(undefined, { notInvalidate: true });
                    consumed = true;
                }
                else {
                    if (!this._touchCancelCrosshair && !this._touchZoomed) {
                        this._touchCoordinate = { x: event.x, y: event.y };
                        chartStore.setCrosshair({ x: event.x, y: event.y, paneId: pane?.getId() }, { notInvalidate: true });
                        consumed = true;
                    }
                    this._touchCancelCrosshair = false;
                }
            }
            if (consumed || result) {
                this._chart.updatePane(1 /* UpdateLevel.Overlay */);
            }
        }
        return consumed;
    }
    doubleTapEvent(e) {
        return this.mouseDoubleClickEvent(e);
    }
    longTapEvent(e) {
        const { pane, widget } = this._findWidgetByEvent(e);
        if (widget !== null && widget.getName() === WidgetNameConstants.MAIN) {
            const event = this._makeWidgetEvent(e, widget);
            this._touchCoordinate = { x: event.x, y: event.y };
            this._chart.getChartStore().setCrosshair({ x: event.x, y: event.y, paneId: pane?.getId() });
            return true;
        }
        return false;
    }
    _processMainScrollingEvent(widget, event) {
        if (this._startScrollCoordinate !== null) {
            const yAxis = widget.getPane().getAxisComponent();
            if (this._prevYAxisRange !== null && !yAxis.getAutoCalcTickFlag() && yAxis.scrollZoomEnabled) {
                event.preventDefault?.();
                const { from, to, range } = this._prevYAxisRange;
                let distance = 0;
                if (yAxis.reverse) {
                    distance = this._startScrollCoordinate.y - event.y;
                }
                else {
                    distance = event.y - this._startScrollCoordinate.y;
                }
                const bounding = widget.getBounding();
                const scale = distance / bounding.height;
                const difRange = range * scale;
                const newFrom = from + difRange;
                const newTo = to + difRange;
                const newRealFrom = yAxis.valueToRealValue(newFrom, { range: this._prevYAxisRange });
                const newRealTo = yAxis.valueToRealValue(newTo, { range: this._prevYAxisRange });
                const newDisplayFrom = yAxis.realValueToDisplayValue(newRealFrom, { range: this._prevYAxisRange });
                const newDisplayTo = yAxis.realValueToDisplayValue(newRealTo, { range: this._prevYAxisRange });
                yAxis.setRange({
                    from: newFrom,
                    to: newTo,
                    range: newTo - newFrom,
                    realFrom: newRealFrom,
                    realTo: newRealTo,
                    realRange: newRealTo - newRealFrom,
                    displayFrom: newDisplayFrom,
                    displayTo: newDisplayTo,
                    displayRange: newDisplayTo - newDisplayFrom
                });
            }
            const distance = event.x - this._startScrollCoordinate.x;
            this._chart.getChartStore().scroll(distance);
        }
    }
    _processXAxisScrollStartEvent(widget, event) {
        const consumed = widget.dispatchEvent('mouseDownEvent', event);
        if (consumed) {
            this._chart.updatePane(1 /* UpdateLevel.Overlay */);
        }
        this._xAxisStartScaleCoordinate = { x: event.x, y: event.y };
        this._xAxisStartScaleDistance = event.pageX;
        return consumed;
    }
    _processXAxisScrollingEvent(widget, event) {
        const consumed = widget.dispatchEvent('pressedMouseMoveEvent', event);
        if (!consumed) {
            const xAxis = widget.getPane().getAxisComponent();
            if (xAxis.scrollZoomEnabled && this._xAxisStartScaleDistance !== 0) {
                const scale = this._xAxisStartScaleDistance / event.pageX;
                if (Number.isFinite(scale)) {
                    const zoomScale = (scale - this._xAxisScale) * 10;
                    this._xAxisScale = scale;
                    this._chart.getChartStore().zoom(zoomScale, this._xAxisStartScaleCoordinate, 'xAxis');
                }
            }
        }
        else {
            this._chart.updatePane(1 /* UpdateLevel.Overlay */);
        }
        return consumed;
    }
    _processYAxisScaleStartEvent(widget, event) {
        const consumed = widget.dispatchEvent('mouseDownEvent', event);
        if (consumed) {
            this._chart.updatePane(1 /* UpdateLevel.Overlay */);
        }
        const range = widget.getPane().getAxisComponent().getRange();
        this._prevYAxisRange = { ...range };
        this._yAxisStartScaleDistance = event.pageY;
        return consumed;
    }
    _processYAxisScalingEvent(widget, event) {
        const consumed = widget.dispatchEvent('pressedMouseMoveEvent', event);
        if (!consumed) {
            const yAxis = widget.getPane().getAxisComponent();
            if (this._prevYAxisRange !== null && yAxis.scrollZoomEnabled && this._yAxisStartScaleDistance !== 0) {
                event.preventDefault?.();
                const { from, to, range } = this._prevYAxisRange;
                const scale = event.pageY / this._yAxisStartScaleDistance;
                const newRange = range * scale;
                const difRange = (newRange - range) / 2;
                const newFrom = from - difRange;
                const newTo = to + difRange;
                const newRealFrom = yAxis.valueToRealValue(newFrom, { range: this._prevYAxisRange });
                const newRealTo = yAxis.valueToRealValue(newTo, { range: this._prevYAxisRange });
                const newDisplayFrom = yAxis.realValueToDisplayValue(newRealFrom, { range: this._prevYAxisRange });
                const newDisplayTo = yAxis.realValueToDisplayValue(newRealTo, { range: this._prevYAxisRange });
                yAxis.setRange({
                    from: newFrom,
                    to: newTo,
                    range: newRange,
                    realFrom: newRealFrom,
                    realTo: newRealTo,
                    realRange: newRealTo - newRealFrom,
                    displayFrom: newDisplayFrom,
                    displayTo: newDisplayTo,
                    displayRange: newDisplayTo - newDisplayFrom
                });
                this._chart.layout({
                    measureWidth: true,
                    update: true,
                    buildYAxisTick: true
                });
            }
        }
        else {
            this._chart.updatePane(1 /* UpdateLevel.Overlay */);
        }
        return consumed;
    }
    _findWidgetByEvent(event) {
        const { x, y } = event;
        const separatorPanes = this._chart.getSeparatorPanes();
        const separatorSize = this._chart.getStyles().separator.size;
        for (const items of separatorPanes) {
            const pane = items[1];
            const bounding = pane.getBounding();
            const top = bounding.top - Math.round((REAL_SEPARATOR_HEIGHT - separatorSize) / 2);
            if (x >= bounding.left && x <= bounding.left + bounding.width &&
                y >= top && y <= top + REAL_SEPARATOR_HEIGHT) {
                return { pane, widget: pane.getWidget() };
            }
        }
        const drawPanes = this._chart.getDrawPanes();
        let pane = null;
        for (const p of drawPanes) {
            const bounding = p.getBounding();
            if (x >= bounding.left && x <= bounding.left + bounding.width &&
                y >= bounding.top && y <= bounding.top + bounding.height) {
                pane = p;
                break;
            }
        }
        let widget = null;
        if (pane !== null) {
            if (!isValid(widget)) {
                const mainWidget = pane.getMainWidget();
                const mainBounding = mainWidget.getBounding();
                if (x >= mainBounding.left && x <= mainBounding.left + mainBounding.width &&
                    y >= mainBounding.top && y <= mainBounding.top + mainBounding.height) {
                    widget = mainWidget;
                }
            }
            if (!isValid(widget)) {
                const yAxisWidget = pane.getYAxisWidget();
                if (yAxisWidget !== null) {
                    const yAxisBounding = yAxisWidget.getBounding();
                    if (x >= yAxisBounding.left && x <= yAxisBounding.left + yAxisBounding.width &&
                        y >= yAxisBounding.top && y <= yAxisBounding.top + yAxisBounding.height) {
                        widget = yAxisWidget;
                    }
                }
            }
        }
        return { pane, widget };
    }
    _makeWidgetEvent(event, widget) {
        const bounding = widget?.getBounding() ?? null;
        return {
            ...event,
            x: event.x - (bounding?.left ?? 0),
            y: event.y - (bounding?.top ?? 0)
        };
    }
    destroy() {
        this._container.removeEventListener('keydown', this._boundKeyBoardDownEvent);
        this._event.destroy();
    }
}

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
class ChartImp {
    id;
    _container;
    _chartContainer;
    _chartBounding = createDefaultBounding();
    _chartEvent;
    _chartStore;
    _drawPanes = [];
    _candlePane;
    _xAxisPane;
    _separatorPanes = new Map();
    _layoutOptions = {
        sort: true,
        measureHeight: true,
        measureWidth: true,
        update: true,
        buildYAxisTick: false,
        cacheYAxisWidth: false,
        forceBuildYAxisTick: false
    };
    _layoutPending = false;
    _cacheYAxisWidth = { left: 0, right: 0 };
    constructor(container, options) {
        this._initContainer(container);
        this._chartEvent = new Event(this._chartContainer, this);
        this._chartStore = new StoreImp(this, options);
        this._initPanes(options);
        this._layout();
    }
    _initContainer(container) {
        this._container = container;
        this._chartContainer = createDom('div', {
            position: 'relative',
            width: '100%',
            height: '100%',
            outline: 'none',
            borderStyle: 'none',
            cursor: 'crosshair',
            boxSizing: 'border-box',
            userSelect: 'none',
            webkitUserSelect: 'none',
            overflow: 'hidden',
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- ignore
            // @ts-expect-error
            msUserSelect: 'none',
            MozUserSelect: 'none',
            webkitTapHighlightColor: 'transparent'
        });
        this._chartContainer.tabIndex = 1;
        container.appendChild(this._chartContainer);
        this._cacheChartBounding();
    }
    _cacheChartBounding() {
        this._chartBounding.width = Math.floor(this._chartContainer.clientWidth);
        this._chartBounding.height = Math.floor(this._chartContainer.clientHeight);
    }
    _initPanes(options) {
        const layout = options?.layout ?? [{ type: 'candle' }];
        const createCandlePane = child => {
            if (!isValid(this._candlePane)) {
                const paneOptions = child.options ?? {};
                merge(paneOptions, { id: PaneIdConstants.CANDLE });
                this._candlePane = this._createPane(CandlePane, PaneIdConstants.CANDLE, paneOptions);
                const content = child.content ?? [];
                content.forEach(v => {
                    this.createIndicator(v, true, paneOptions);
                });
            }
        };
        const createXAxisPane = (ops) => {
            if (!isValid(this._xAxisPane)) {
                const pane = this._createPane(XAxisPane, PaneIdConstants.X_AXIS, ops ?? {});
                this._xAxisPane = pane;
            }
        };
        layout.forEach(child => {
            switch (child.type) {
                case 'candle': {
                    createCandlePane(child);
                    break;
                }
                case 'indicator': {
                    const content = child.content ?? [];
                    if (content.length > 0) {
                        let paneId = child.options?.id ?? null;
                        if (isValid(paneId)) {
                            paneId = createId(PaneIdConstants.INDICATOR);
                        }
                        const paneOptions = { ...child.options, id: paneId };
                        content.forEach(v => {
                            this.createIndicator(v, true, paneOptions);
                        });
                    }
                    break;
                }
                case 'xAxis': {
                    createXAxisPane(child.options);
                    break;
                }
            }
        });
        createCandlePane({ });
        createXAxisPane({ order: Number.MAX_SAFE_INTEGER });
    }
    _createPane(DrawPaneClass, id, options) {
        const pane = new DrawPaneClass(this, id, options ?? {});
        this._drawPanes.push(pane);
        return pane;
    }
    _recalculatePaneHeight(currentPane, currentHeight, changeHeight) {
        if (changeHeight === 0) {
            return false;
        }
        const normalStatePanes = this._drawPanes.filter(pane => {
            const paneId = pane.getId();
            return (pane.getOptions().state === 'normal' &&
                paneId !== currentPane.getId() &&
                paneId !== PaneIdConstants.X_AXIS);
        });
        const count = normalStatePanes.length;
        if (count === 0) {
            return false;
        }
        if (currentPane.getId() !== PaneIdConstants.CANDLE &&
            isValid(this._candlePane) &&
            this._candlePane.getOptions().state === 'normal') {
            const height = this._candlePane.getBounding().height;
            if (height > 0) {
                const minHeight = this._candlePane.getOptions().minHeight;
                let newHeight = height + changeHeight;
                if (newHeight < minHeight) {
                    newHeight = minHeight;
                    currentHeight -= (height + changeHeight - newHeight);
                }
                this._candlePane.setBounding({ height: newHeight });
            }
        }
        else {
            let remainingHeight = changeHeight;
            const normalStatePaneChangeHeight = Math.floor(changeHeight / count);
            normalStatePanes.forEach((pane, index) => {
                const height = pane.getBounding().height;
                let newHeight = 0;
                if (index === count - 1) {
                    newHeight = height + remainingHeight;
                }
                else {
                    newHeight = height + normalStatePaneChangeHeight;
                }
                if (newHeight < pane.getOptions().minHeight) {
                    newHeight = pane.getOptions().minHeight;
                }
                pane.setBounding({ height: newHeight });
                remainingHeight -= (newHeight - height);
            });
            if (Math.abs(remainingHeight) > 0) {
                currentHeight -= remainingHeight;
            }
        }
        currentPane.setBounding({ height: currentHeight });
        return true;
    }
    getDrawPaneById(paneId) {
        if (paneId === PaneIdConstants.CANDLE) {
            return this._candlePane;
        }
        if (paneId === PaneIdConstants.X_AXIS) {
            return this._xAxisPane;
        }
        const pane = this._drawPanes.find(p => p.getId() === paneId);
        return pane ?? null;
    }
    getContainer() { return this._container; }
    getChartStore() { return this._chartStore; }
    getXAxisPane() { return this._xAxisPane; }
    getDrawPanes() { return this._drawPanes; }
    getSeparatorPanes() { return this._separatorPanes; }
    layout(options) {
        if (options.sort ?? false) {
            this._layoutOptions.sort = options.sort;
        }
        if (options.measureHeight ?? false) {
            this._layoutOptions.measureHeight = options.measureHeight;
        }
        if (options.measureWidth ?? false) {
            this._layoutOptions.measureWidth = options.measureWidth;
        }
        if (options.update ?? false) {
            this._layoutOptions.update = options.update;
        }
        if (options.buildYAxisTick ?? false) {
            this._layoutOptions.buildYAxisTick = options.buildYAxisTick;
        }
        if (options.cacheYAxisWidth ?? false) {
            this._layoutOptions.cacheYAxisWidth = options.cacheYAxisWidth;
        }
        if (options.buildYAxisTick ?? false) {
            this._layoutOptions.forceBuildYAxisTick = options.forceBuildYAxisTick;
        }
        if (!this._layoutPending) {
            this._layoutPending = true;
            Promise.resolve().then(_ => {
                this._layout();
                this._layoutPending = false;
            }).catch((_) => {
                // todo
            });
        }
    }
    _layout() {
        const { sort, measureHeight, measureWidth, update, buildYAxisTick, cacheYAxisWidth, forceBuildYAxisTick } = this._layoutOptions;
        if (sort) {
            while (isValid(this._chartContainer.firstChild)) {
                this._chartContainer.removeChild(this._chartContainer.firstChild);
            }
            this._separatorPanes.clear();
            this._drawPanes.sort((a, b) => a.getOptions().order - b.getOptions().order);
            let prevPane = null;
            this._drawPanes.forEach(pane => {
                if (pane.getId() !== PaneIdConstants.X_AXIS) {
                    if (isValid(prevPane)) {
                        const separatorPane = new SeparatorPane(this, '', prevPane, pane);
                        this._chartContainer.appendChild(separatorPane.getContainer());
                        this._separatorPanes.set(pane, separatorPane);
                    }
                    prevPane = pane;
                }
                this._chartContainer.appendChild(pane.getContainer());
            });
        }
        if (measureHeight) {
            const totalHeight = this._chartBounding.height;
            const separatorSize = this.getStyles().separator.size;
            const xAxisHeight = this._xAxisPane.getAxisComponent().getAutoSize();
            let remainingHeight = totalHeight - xAxisHeight;
            if (remainingHeight < 0) {
                remainingHeight = 0;
            }
            this._drawPanes.forEach(pane => {
                const paneId = pane.getId();
                if (isValid(this._separatorPanes.get(pane))) {
                    remainingHeight -= separatorSize;
                }
                if (paneId !== PaneIdConstants.X_AXIS && paneId !== PaneIdConstants.CANDLE && pane.getVisible()) {
                    let paneHeight = pane.getBounding().height;
                    if (paneHeight > remainingHeight) {
                        paneHeight = remainingHeight;
                        remainingHeight = 0;
                    }
                    else {
                        remainingHeight -= paneHeight;
                    }
                    pane.setBounding({ height: paneHeight });
                }
            });
            this._candlePane.setBounding({ height: Math.max(remainingHeight, 0) });
            this._xAxisPane.setBounding({ height: xAxisHeight });
            let top = 0;
            this._drawPanes.forEach(pane => {
                const separatorPane = this._separatorPanes.get(pane);
                if (isValid(separatorPane)) {
                    separatorPane.setBounding({ height: separatorSize, top });
                    top += separatorSize;
                }
                pane.setBounding({ top });
                top += pane.getBounding().height;
            });
        }
        let forceMeasureWidth = measureWidth;
        if (buildYAxisTick || forceBuildYAxisTick) {
            this._drawPanes.forEach(pane => {
                const success = pane.getAxisComponent().buildTicks(forceBuildYAxisTick);
                forceMeasureWidth ||= success;
            });
        }
        if (forceMeasureWidth) {
            const totalWidth = this._chartBounding.width;
            const styles = this.getStyles();
            let leftYAxisWidth = 0;
            let leftYAxisOutside = true;
            let rightYAxisWidth = 0;
            let rightYAxisOutside = true;
            this._drawPanes.forEach(pane => {
                if (pane.getId() !== PaneIdConstants.X_AXIS) {
                    const yAxis = pane.getAxisComponent();
                    const inside = yAxis.inside;
                    const yAxisWidth = yAxis.getAutoSize();
                    if (yAxis.position === 'left') {
                        leftYAxisWidth = Math.max(leftYAxisWidth, yAxisWidth);
                        if (inside) {
                            leftYAxisOutside = false;
                        }
                    }
                    else {
                        rightYAxisWidth = Math.max(rightYAxisWidth, yAxisWidth);
                        if (inside) {
                            rightYAxisOutside = false;
                        }
                    }
                }
            });
            if (cacheYAxisWidth) {
                leftYAxisWidth = Math.max(this._cacheYAxisWidth.left, leftYAxisWidth);
                rightYAxisWidth = Math.max(this._cacheYAxisWidth.right, rightYAxisWidth);
            }
            this._cacheYAxisWidth.left = leftYAxisWidth;
            this._cacheYAxisWidth.right = rightYAxisWidth;
            let mainWidth = totalWidth;
            let mainLeft = 0;
            let mainRight = 0;
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ignore
            if (leftYAxisOutside) {
                mainWidth -= leftYAxisWidth;
                mainLeft = leftYAxisWidth;
            }
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ignore
            if (rightYAxisOutside) {
                mainWidth -= rightYAxisWidth;
                mainRight = rightYAxisWidth;
            }
            this._chartStore.setTotalBarSpace(mainWidth);
            const paneBounding = { width: totalWidth };
            const mainBounding = { width: mainWidth, left: mainLeft, right: mainRight };
            const leftYAxisBounding = { width: leftYAxisWidth };
            const rightYAxisBounding = { width: rightYAxisWidth };
            const separatorFill = styles.separator.fill;
            let separatorBounding = {};
            if (!separatorFill) {
                separatorBounding = mainBounding;
            }
            else {
                separatorBounding = paneBounding;
            }
            this._drawPanes.forEach((pane) => {
                this._separatorPanes.get(pane)?.setBounding(separatorBounding);
                pane.setBounding(paneBounding, mainBounding, leftYAxisBounding, rightYAxisBounding);
            });
        }
        if (update) {
            this._xAxisPane.getAxisComponent().buildTicks(true);
            this.updatePane(4 /* UpdateLevel.All */);
        }
        this._layoutOptions = {
            sort: false,
            measureHeight: false,
            measureWidth: false,
            update: false,
            buildYAxisTick: false,
            cacheYAxisWidth: false,
            forceBuildYAxisTick: false
        };
    }
    updatePane(level, paneId) {
        if (isValid(paneId)) {
            const pane = this.getDrawPaneById(paneId);
            pane?.update(level);
        }
        else {
            this._drawPanes.forEach(pane => {
                pane.update(level);
                this._separatorPanes.get(pane)?.update(level);
            });
        }
    }
    getDom(paneId, position) {
        if (isValid(paneId)) {
            const pane = this.getDrawPaneById(paneId);
            if (isValid(pane)) {
                const pos = position ?? 'root';
                switch (pos) {
                    case 'root': {
                        return pane.getContainer();
                    }
                    case 'main': {
                        return pane.getMainWidget().getContainer();
                    }
                    case 'yAxis': {
                        return pane.getYAxisWidget()?.getContainer() ?? null;
                    }
                }
            }
        }
        else {
            return this._chartContainer;
        }
        return null;
    }
    getSize(paneId, position) {
        if (isValid(paneId)) {
            const pane = this.getDrawPaneById(paneId);
            if (isValid(pane)) {
                const pos = position ?? 'root';
                switch (pos) {
                    case 'root': {
                        return pane.getBounding();
                    }
                    case 'main': {
                        return pane.getMainWidget().getBounding();
                    }
                    case 'yAxis': {
                        return pane.getYAxisWidget()?.getBounding() ?? null;
                    }
                }
            }
        }
        else {
            return this._chartBounding;
        }
        return null;
    }
    _resetYAxisAutoCalcTickFlag() {
        this._drawPanes.forEach(pane => {
            pane.getAxisComponent().setAutoCalcTickFlag(true);
        });
    }
    setSymbol(symbol) {
        if (symbol !== this.getSymbol()) {
            this._resetYAxisAutoCalcTickFlag();
            this._chartStore.setSymbol(symbol);
        }
    }
    getSymbol() {
        return this._chartStore.getSymbol();
    }
    setPeriod(period) {
        if (period !== this.getPeriod()) {
            this._resetYAxisAutoCalcTickFlag();
            this._chartStore.setPeriod(period);
        }
    }
    getPeriod() {
        return this._chartStore.getPeriod();
    }
    setStyles(value) {
        this._setOptions(() => {
            this._chartStore.setStyles(value);
        });
    }
    getStyles() { return this._chartStore.getStyles(); }
    setFormatter(formatter) {
        this._setOptions(() => {
            this._chartStore.setFormatter(formatter);
        });
    }
    getFormatter() { return this._chartStore.getFormatter(); }
    setLocale(locale) {
        this._setOptions(() => {
            this._chartStore.setLocale(locale);
        });
    }
    getLocale() { return this._chartStore.getLocale(); }
    setTimezone(timezone) {
        this._setOptions(() => {
            this._chartStore.setTimezone(timezone);
        });
    }
    getTimezone() { return this._chartStore.getTimezone(); }
    setThousandsSeparator(thousandsSeparator) {
        this._setOptions(() => {
            this._chartStore.setThousandsSeparator(thousandsSeparator);
        });
    }
    getThousandsSeparator() { return this._chartStore.getThousandsSeparator(); }
    setDecimalFold(decimalFold) {
        this._setOptions(() => {
            this._chartStore.setDecimalFold(decimalFold);
        });
    }
    getDecimalFold() { return this._chartStore.getDecimalFold(); }
    _setOptions(fuc) {
        fuc();
        this.layout({
            measureHeight: true,
            measureWidth: true,
            update: true,
            buildYAxisTick: true,
            forceBuildYAxisTick: true
        });
    }
    setOffsetRightDistance(distance) {
        this._chartStore.setOffsetRightDistance(distance, true);
    }
    getOffsetRightDistance() {
        return this._chartStore.getOffsetRightDistance();
    }
    setMaxOffsetLeftDistance(distance) {
        if (distance < 0) {
            logWarn('setMaxOffsetLeftDistance', 'distance', 'distance must greater than zero!!!');
            return;
        }
        this._chartStore.setMaxOffsetLeftDistance(distance);
    }
    setMaxOffsetRightDistance(distance) {
        if (distance < 0) {
            logWarn('setMaxOffsetRightDistance', 'distance', 'distance must greater than zero!!!');
            return;
        }
        this._chartStore.setMaxOffsetRightDistance(distance);
    }
    setLeftMinVisibleBarCount(barCount) {
        if (barCount < 0) {
            logWarn('setLeftMinVisibleBarCount', 'barCount', 'barCount must greater than zero!!!');
            return;
        }
        this._chartStore.setLeftMinVisibleBarCount(Math.ceil(barCount));
    }
    setRightMinVisibleBarCount(barCount) {
        if (barCount < 0) {
            logWarn('setRightMinVisibleBarCount', 'barCount', 'barCount must greater than zero!!!');
            return;
        }
        this._chartStore.setRightMinVisibleBarCount(Math.ceil(barCount));
    }
    setBarSpace(space) {
        this._chartStore.setBarSpace(space);
    }
    getBarSpace() {
        return this._chartStore.getBarSpace();
    }
    getVisibleRange() {
        return this._chartStore.getVisibleRange();
    }
    resetData() {
        this._chartStore.resetData();
    }
    getDataList() {
        return this._chartStore.getDataList();
    }
    setDataLoader(dataLoader) {
        this._resetYAxisAutoCalcTickFlag();
        this._chartStore.setDataLoader(dataLoader);
    }
    createIndicator(value, isStack, paneOptions) {
        const indicator = isString(value) ? { name: value } : value;
        if (getIndicatorClass(indicator.name) === null) {
            logWarn('createIndicator', 'value', 'indicator not supported, you may need to use registerIndicator to add one!!!');
            return null;
        }
        const paneOpts = paneOptions ?? {};
        if (!isString(paneOpts.id)) {
            paneOpts.id = createId(PaneIdConstants.INDICATOR);
        }
        if (!isString(indicator.id)) {
            indicator.id = createId(indicator.name);
        }
        const result = this._chartStore.addIndicator(indicator, paneOpts.id, isStack ?? false);
        if (result) {
            let shouldSort = false;
            if (!isValid(this.getDrawPaneById(paneOpts.id))) {
                this._createPane(IndicatorPane, paneOpts.id, paneOpts);
                paneOpts.height ??= PANE_DEFAULT_HEIGHT;
                shouldSort = true;
            }
            this.setPaneOptions(paneOpts);
            this.layout({
                sort: shouldSort,
                measureHeight: true,
                measureWidth: true,
                update: true,
                buildYAxisTick: true,
                forceBuildYAxisTick: true
            });
            return indicator.id;
        }
        return null;
    }
    overrideIndicator(override) {
        return this._chartStore.overrideIndicator(override);
    }
    getIndicators(filter) {
        return this._chartStore.getIndicatorsByFilter(filter ?? {});
    }
    removeIndicator(filter) {
        const removed = this._chartStore.removeIndicator(filter ?? {});
        if (removed) {
            let shouldMeasureHeight = false;
            const paneIds = [];
            this._drawPanes.forEach(pane => {
                const paneId = pane.getId();
                if (paneId !== PaneIdConstants.CANDLE && paneId !== PaneIdConstants.X_AXIS) {
                    paneIds.push(paneId);
                }
            });
            paneIds.forEach(paneId => {
                if (!this._chartStore.hasIndicators(paneId)) {
                    const index = this._drawPanes.findIndex(pane => pane.getId() === paneId);
                    const pane = this._drawPanes[index];
                    if (isValid(pane)) {
                        shouldMeasureHeight = true;
                        this._recalculatePaneHeight(pane, 0, pane.getBounding().height);
                        this._drawPanes.splice(index, 1);
                        pane.destroy();
                    }
                }
            });
            if (this._drawPanes.length === 2) {
                this._candlePane.setVisible(true);
                this._candlePane.setBounding({ height: this._chartBounding.height - this._xAxisPane.getBounding().height });
            }
            this.layout({
                sort: shouldMeasureHeight,
                measureHeight: shouldMeasureHeight,
                measureWidth: true,
                update: true,
                buildYAxisTick: true,
                forceBuildYAxisTick: true
            });
        }
        return removed;
    }
    createOverlay(value) {
        const overlays = [];
        const appointPaneFlags = [];
        const build = overlay => {
            if (!isValid(overlay.paneId) || this.getDrawPaneById(overlay.paneId) === null) {
                overlay.paneId = PaneIdConstants.CANDLE;
                appointPaneFlags.push(false);
            }
            else {
                appointPaneFlags.push(true);
            }
            overlays.push(overlay);
        };
        if (isString(value)) {
            build({ name: value });
        }
        else if (isArray(value)) {
            value.forEach(v => {
                let overlay = null;
                if (isString(v)) {
                    overlay = { name: v };
                }
                else {
                    overlay = v;
                }
                build(overlay);
            });
        }
        else {
            build(value);
        }
        const ids = this._chartStore.addOverlays(overlays, appointPaneFlags);
        if (isArray(value)) {
            return ids;
        }
        return ids[0];
    }
    getOverlays(filter) {
        return this._chartStore.getOverlaysByFilter(filter ?? {});
    }
    overrideOverlay(override) {
        return this._chartStore.overrideOverlay(override);
    }
    removeOverlay(filter) {
        return this._chartStore.removeOverlay(filter ?? {});
    }
    setPaneOptions(options) {
        let shouldMeasureHeight = false;
        let shouldLayout = false;
        const validId = isValid(options.id);
        for (const currentPane of this._drawPanes) {
            const currentPaneId = currentPane.getId();
            if ((validId && options.id === currentPaneId) || !validId) {
                if (currentPaneId !== PaneIdConstants.X_AXIS) {
                    if (isNumber(options.height) && options.height > 0) {
                        const minHeight = Math.max(options.minHeight ?? currentPane.getOptions().minHeight, 0);
                        const height = Math.max(minHeight, options.height);
                        shouldLayout = true;
                        shouldMeasureHeight = true;
                        currentPane.setOriginalBounding({ height });
                        this._recalculatePaneHeight(currentPane, height, -height);
                    }
                    if (isValid(options.state) &&
                        currentPane.getOptions().state !== options.state) {
                        shouldMeasureHeight = true;
                        shouldLayout = true;
                        const state = options.state;
                        switch (state) {
                            case 'maximize': {
                                const maximizePane = this._drawPanes.find(pane => {
                                    const paneId = pane.getId();
                                    return pane.getOptions().state === 'maximize' && paneId !== PaneIdConstants.X_AXIS;
                                });
                                if (!isValid(maximizePane)) {
                                    if (currentPane.getOptions().state === 'normal') {
                                        currentPane.setOriginalBounding({ height: currentPane.getBounding().height });
                                    }
                                    currentPane.setOptions({ state });
                                    const totalHeight = this._chartBounding.height;
                                    currentPane.setBounding({ height: totalHeight - this._xAxisPane.getBounding().height });
                                    this._drawPanes.forEach(pane => {
                                        if (pane.getId() !== PaneIdConstants.X_AXIS && pane.getId() !== currentPaneId) {
                                            pane.setBounding({ height: pane.getOriginalBounding().height });
                                            pane.setVisible(false);
                                            this._separatorPanes.get(pane)?.setVisible(false);
                                        }
                                    });
                                }
                                break;
                            }
                            case 'minimize': {
                                const height = currentPane.getBounding().height;
                                const currentState = currentPane.getOptions().state;
                                let changeHeight = height - PANE_MIN_HEIGHT;
                                if (currentState === 'maximize') {
                                    changeHeight = currentPane.getOriginalBounding().height - PANE_MIN_HEIGHT;
                                }
                                if (this._recalculatePaneHeight(currentPane, PANE_MIN_HEIGHT, changeHeight)) {
                                    if (currentState === 'normal') {
                                        currentPane.setOriginalBounding({ height });
                                    }
                                    currentPane.setOptions({ state });
                                }
                                this._drawPanes.forEach(pane => {
                                    if (pane.getId() !== PaneIdConstants.X_AXIS) {
                                        pane.setVisible(true);
                                        this._separatorPanes.get(pane)?.setVisible(true);
                                    }
                                });
                                break;
                            }
                            default: {
                                const height = currentPane.getOriginalBounding().height;
                                if (this._recalculatePaneHeight(currentPane, height, currentPane.getBounding().height - height)) {
                                    currentPane.setOptions({ state });
                                }
                                this._drawPanes.forEach(pane => {
                                    if (pane.getId() !== PaneIdConstants.X_AXIS) {
                                        pane.setVisible(true);
                                        this._separatorPanes.get(pane)?.setVisible(true);
                                    }
                                });
                                break;
                            }
                        }
                    }
                }
                if (isValid(options.axis)) {
                    shouldLayout = true;
                }
                const ops = { ...options };
                delete ops.state;
                currentPane.setOptions(ops);
                if (currentPaneId === options.id) {
                    break;
                }
            }
        }
        if (shouldLayout) {
            this.layout({
                measureHeight: shouldMeasureHeight,
                measureWidth: true,
                update: true,
                buildYAxisTick: true,
                forceBuildYAxisTick: true
            });
        }
    }
    getPaneOptions(id) {
        if (isValid(id)) {
            const pane = this.getDrawPaneById(id);
            return pane?.getOptions() ?? null;
        }
        return this._drawPanes.map(pane => pane.getOptions());
    }
    setZoomEnabled(enabled) {
        this._chartStore.setZoomEnabled(enabled);
    }
    isZoomEnabled() {
        return this._chartStore.isZoomEnabled();
    }
    setZoomAnchor(anchor) {
        this._chartStore.setZoomAnchor(anchor);
    }
    getZoomAnchor() {
        return this._chartStore.getZoomAnchor();
    }
    setScrollEnabled(enabled) {
        this._chartStore.setScrollEnabled(enabled);
    }
    isScrollEnabled() {
        return this._chartStore.isScrollEnabled();
    }
    scrollByDistance(distance, animationDuration) {
        const duration = isNumber(animationDuration) && animationDuration > 0 ? animationDuration : 0;
        this._chartStore.startScroll();
        if (duration > 0) {
            const animation = new Animation({ duration });
            animation.doFrame(frameTime => {
                const progressDistance = distance * (frameTime / duration);
                this._chartStore.scroll(progressDistance);
            });
            animation.start();
        }
        else {
            this._chartStore.scroll(distance);
        }
    }
    scrollToRealTime(animationDuration) {
        const { bar: barSpace } = this._chartStore.getBarSpace();
        const difBarCount = this._chartStore.getLastBarRightSideDiffBarCount() - this._chartStore.getInitialOffsetRightDistance() / barSpace;
        const distance = difBarCount * barSpace;
        this.scrollByDistance(distance, animationDuration);
    }
    scrollToDataIndex(dataIndex, animationDuration) {
        const distance = (this._chartStore.getLastBarRightSideDiffBarCount() + (this.getDataList().length - 1 - dataIndex)) * this._chartStore.getBarSpace().bar;
        this.scrollByDistance(distance, animationDuration);
    }
    scrollToTimestamp(timestamp, animationDuration) {
        const dataIndex = binarySearchNearest(this.getDataList(), 'timestamp', timestamp);
        this.scrollToDataIndex(dataIndex, animationDuration);
    }
    zoomAtCoordinate(scale, coordinate, animationDuration) {
        const duration = isNumber(animationDuration) && animationDuration > 0 ? animationDuration : 0;
        const { bar: barSpace } = this._chartStore.getBarSpace();
        const scaleBarSpace = barSpace * scale;
        const difSpace = scaleBarSpace - barSpace;
        if (duration > 0) {
            let prevProgressBarSpace = 0;
            const animation = new Animation({ duration });
            animation.doFrame(frameTime => {
                const progressBarSpace = difSpace * (frameTime / duration);
                const scale = (progressBarSpace - prevProgressBarSpace) / this._chartStore.getBarSpace().bar * SCALE_MULTIPLIER;
                this._chartStore.zoom(scale, coordinate ?? null, 'main');
                prevProgressBarSpace = progressBarSpace;
            });
            animation.start();
        }
        else {
            this._chartStore.zoom(difSpace / barSpace * SCALE_MULTIPLIER, coordinate ?? null, 'main');
        }
    }
    zoomAtDataIndex(scale, dataIndex, animationDuration) {
        const x = this._chartStore.dataIndexToCoordinate(dataIndex);
        this.zoomAtCoordinate(scale, { x, y: 0 }, animationDuration);
    }
    zoomAtTimestamp(scale, timestamp, animationDuration) {
        const dataIndex = binarySearchNearest(this.getDataList(), 'timestamp', timestamp);
        this.zoomAtDataIndex(scale, dataIndex, animationDuration);
    }
    convertToPixel(points, filter) {
        const { paneId = PaneIdConstants.CANDLE, absolute = false } = filter ?? {};
        let coordinates = [];
        if (paneId !== PaneIdConstants.X_AXIS) {
            const pane = this.getDrawPaneById(paneId);
            if (pane !== null) {
                const bounding = pane.getBounding();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- ignore
                // @ts-expect-error
                const ps = [].concat(points);
                const xAxis = this._xAxisPane.getAxisComponent();
                const yAxis = pane.getAxisComponent();
                coordinates = ps.map(point => {
                    const coordinate = {};
                    let dataIndex = point.dataIndex;
                    if (isNumber(point.timestamp)) {
                        dataIndex = this._chartStore.timestampToDataIndex(point.timestamp);
                    }
                    if (isNumber(dataIndex)) {
                        coordinate.x = xAxis.convertToPixel(dataIndex);
                    }
                    if (isNumber(point.value)) {
                        const y = yAxis.convertToPixel(point.value);
                        coordinate.y = absolute ? bounding.top + y : y;
                    }
                    return coordinate;
                });
            }
        }
        return isArray(points) ? coordinates : (coordinates[0] ?? {});
    }
    convertFromPixel(coordinates, filter) {
        const { paneId = PaneIdConstants.CANDLE, absolute = false } = filter ?? {};
        let points = [];
        if (paneId !== PaneIdConstants.X_AXIS) {
            const pane = this.getDrawPaneById(paneId);
            if (pane !== null) {
                const bounding = pane.getBounding();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- ignore
                // @ts-expect-error
                const cs = [].concat(coordinates);
                const xAxis = this._xAxisPane.getAxisComponent();
                const yAxis = pane.getAxisComponent();
                points = cs.map(coordinate => {
                    const point = {};
                    if (isNumber(coordinate.x)) {
                        const dataIndex = xAxis.convertFromPixel(coordinate.x);
                        point.dataIndex = dataIndex;
                        point.timestamp = this._chartStore.dataIndexToTimestamp(dataIndex) ?? undefined;
                    }
                    if (isNumber(coordinate.y)) {
                        const y = absolute ? coordinate.y - bounding.top : coordinate.y;
                        point.value = yAxis.convertFromPixel(y);
                    }
                    return point;
                });
            }
        }
        return isArray(coordinates) ? points : (points[0] ?? {});
    }
    executeAction(type, data) {
        switch (type) {
            case 'onCrosshairChange': {
                let crosshair = null;
                if (isValid(data)) {
                    crosshair = { ...data };
                    crosshair.paneId ??= PaneIdConstants.CANDLE;
                }
                this._chartStore.setCrosshair(crosshair, { notExecuteAction: true });
                break;
            }
        }
    }
    subscribeAction(type, callback) {
        this._chartStore.subscribeAction(type, callback);
    }
    unsubscribeAction(type, callback) {
        this._chartStore.unsubscribeAction(type, callback);
    }
    getConvertPictureUrl(includeOverlay, type, backgroundColor) {
        const { width, height } = this._chartBounding;
        const canvas = createDom('canvas', {
            width: `${width}px`,
            height: `${height}px`,
            boxSizing: 'border-box'
        });
        const ctx = canvas.getContext('2d');
        const pixelRatio = getPixelRatio(canvas);
        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;
        ctx.scale(pixelRatio, pixelRatio);
        ctx.fillStyle = backgroundColor ?? '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        const overlayFlag = includeOverlay ?? false;
        this._drawPanes.forEach(pane => {
            const separatorPane = this._separatorPanes.get(pane);
            if (isValid(separatorPane)) {
                const separatorBounding = separatorPane.getBounding();
                ctx.drawImage(separatorPane.getImage(overlayFlag), separatorBounding.left, separatorBounding.top, separatorBounding.width, separatorBounding.height);
            }
            const bounding = pane.getBounding();
            ctx.drawImage(pane.getImage(overlayFlag), 0, bounding.top, width, bounding.height);
        });
        return canvas.toDataURL(`image/${type ?? 'jpeg'}`);
    }
    resize() {
        this._cacheChartBounding();
        this.layout({
            measureHeight: true,
            measureWidth: true,
            update: true,
            buildYAxisTick: true,
            forceBuildYAxisTick: true
        });
    }
    destroy() {
        this._chartEvent.destroy();
        this._drawPanes.forEach(pane => {
            pane.destroy();
        });
        this._drawPanes = [];
        this._separatorPanes.clear();
        this._chartStore.destroy();
        this._container.removeChild(this._chartContainer);
    }
    applyNewData(data, more) {
        this._chartStore.applyNewData(data, more);
    }
    applyMoreData(data, more) {
        this._chartStore.applyMoreData(data, more);
    }
    updateData(data) {
        this._chartStore.updateData(data);
    }
    setYScrolling(yScrolling) {
        this._chartStore.setYScrolling(yScrolling);
    }
    getYScrolling() {
        return this._chartStore.getYScrolling();
    }
    loadMore(cb) {
        this._chartStore.setDataLoader({
            getBars: (params) => {
                const timestamp = params.timestamp;
                cb(timestamp);
            }
        });
    }
    setPriceVolumePrecision(pricePrecision, volumePrecision) {
        this._chartStore.setSymbol({ pricePrecision, volumePrecision });
    }
}

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
const charts = new Map();
let chartBaseId = 1;
/**
 * Chart version
 * @return {string}
 */
function version() {
    return '10.0.0-beta1';
}
/**
 * Init chart instance
 * @param ds
 * @param options
 * @returns {Chart}
 */
function init(ds, options) {
    logTag();
    let dom = null;
    if (isString(ds)) {
        dom = document.getElementById(ds);
    }
    else {
        dom = ds;
    }
    if (dom === null) {
        logError('', '', 'The chart cannot be initialized correctly. Please check the parameters. The chart container cannot be null and child elements need to be added!!!');
        return null;
    }
    let chart = charts.get(dom.id);
    if (isValid(chart)) {
        logWarn('', '', 'The chart has been initialized on the dom！！！');
        return chart;
    }
    const id = `k_line_chart_${chartBaseId++}`;
    chart = new ChartImp(dom, options);
    chart.id = id;
    dom.setAttribute('k-line-chart-id', id);
    charts.set(id, chart);
    return chart;
}
/**
 * Destroy chart instance
 * @param dcs
 */
function dispose(dcs) {
    let id = null;
    if (dcs instanceof ChartImp) {
        id = dcs.id;
    }
    else {
        let dom = null;
        if (isString(dcs)) {
            dom = document.getElementById(dcs);
        }
        else {
            dom = dcs;
        }
        id = dom?.getAttribute('k-line-chart-id') ?? null;
    }
    if (id !== null) {
        charts.get(id)?.destroy();
        charts.delete(id);
    }
}

class ChartMain {
}

function getRotateCoordinate(coordinate, targetCoordinate, angle) {
    const x = (coordinate.x - targetCoordinate.x) * Math.cos(angle) -
        (coordinate.y - targetCoordinate.y) * Math.sin(angle) +
        targetCoordinate.x;
    const y = (coordinate.x - targetCoordinate.x) * Math.sin(angle) +
        (coordinate.y - targetCoordinate.y) * Math.cos(angle) +
        targetCoordinate.y;
    return { x, y };
}
function getRayLine(coordinates, bounding) {
    if (coordinates.length > 1) {
        let coordinate;
        if (coordinates[0].x === coordinates[1].x &&
            coordinates[0].y !== coordinates[1].y) {
            if (coordinates[0].y < coordinates[1].y) {
                coordinate = {
                    x: coordinates[0].x,
                    y: bounding.height,
                };
            }
            else {
                coordinate = {
                    x: coordinates[0].x,
                    y: 0,
                };
            }
        }
        else if (coordinates[0].x > coordinates[1].x) {
            coordinate = {
                x: 0,
                y: utils.getLinearYFromCoordinates(coordinates[0], coordinates[1], {
                    x: 0,
                    y: coordinates[0].y,
                }),
            };
        }
        else {
            coordinate = {
                x: bounding.width,
                y: utils.getLinearYFromCoordinates(coordinates[0], coordinates[1], {
                    x: bounding.width,
                    y: coordinates[0].y,
                }),
            };
        }
        return { coordinates: [coordinates[0], coordinate] };
    }
    return [];
}
function getDistance(coordinate1, coordinate2) {
    const xDis = Math.abs(coordinate1.x - coordinate2.x);
    const yDis = Math.abs(coordinate1.y - coordinate2.y);
    return Math.sqrt(xDis * xDis + yDis * yDis);
}
function formatThousands(value, sign) {
    const vl = `${value}`;
    if (sign.length === 0) {
        return vl;
    }
    if (vl.includes('.')) {
        const arr = vl.split('.');
        return `${arr[0].replace(/(\d)(?=(\d{3})+$)/g, ($1) => `${$1}${sign}`)}.${arr[1]}`;
    }
    return vl.replace(/(\d)(?=(\d{3})+$)/g, ($1) => `${$1}${sign}`);
}

const arrow = {
    name: 'arrow',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates }) => {
        if (coordinates.length > 1) {
            const flag = coordinates[1].x > coordinates[0].x ? 0 : 1;
            const kb = utils.getLinearSlopeIntercept(coordinates[0], coordinates[1]);
            let offsetAngle;
            if (kb) {
                offsetAngle = Math.atan(kb[0]) + Math.PI * flag;
            }
            else {
                if (coordinates[1].y > coordinates[0].y) {
                    offsetAngle = Math.PI / 2;
                }
                else {
                    offsetAngle = (Math.PI / 2) * 3;
                }
            }
            const rotateCoordinate1 = getRotateCoordinate({ x: coordinates[1].x - 8, y: coordinates[1].y + 4 }, coordinates[1], offsetAngle);
            const rotateCoordinate2 = getRotateCoordinate({ x: coordinates[1].x - 8, y: coordinates[1].y - 4 }, coordinates[1], offsetAngle);
            return [
                {
                    type: 'line',
                    attrs: { coordinates },
                },
                {
                    type: 'line',
                    ignoreEvent: true,
                    attrs: {
                        coordinates: [rotateCoordinate1, coordinates[1], rotateCoordinate2],
                    },
                },
            ];
        }
        return [];
    },
};

const circle = {
    name: 'circle',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: {
        circle: {
            color: 'rgba(22, 119, 255, 0.15)',
        },
    },
    createPointFigures: ({ coordinates }) => {
        if (coordinates.length > 1) {
            const radius = getDistance(coordinates[0], coordinates[1]);
            return {
                type: 'circle',
                attrs: {
                    ...coordinates[0],
                    r: radius,
                },
                styles: { style: 'stroke_fill' },
            };
        }
        return [];
    },
};

const rect = {
    name: 'rect',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: {
        polygon: {
            color: 'rgba(22, 119, 255, 0.15)',
        },
    },
    createPointFigures: ({ coordinates }) => {
        if (coordinates.length > 1) {
            return [
                {
                    type: 'polygon',
                    attrs: {
                        coordinates: [
                            coordinates[0],
                            { x: coordinates[1].x, y: coordinates[0].y },
                            coordinates[1],
                            { x: coordinates[0].x, y: coordinates[1].y },
                        ],
                    },
                    styles: { style: 'stroke_fill' },
                },
            ];
        }
        return [];
    },
};

const parallelogram = {
    name: 'parallelogram',
    totalStep: 4,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: {
        polygon: {
            color: 'rgba(22, 119, 255, 0.15)',
        },
    },
    createPointFigures: ({ coordinates }) => {
        if (coordinates.length === 2) {
            return [
                {
                    type: 'line',
                    ignoreEvent: true,
                    attrs: { coordinates },
                },
            ];
        }
        if (coordinates.length === 3) {
            const coordinate = {
                x: coordinates[0].x + coordinates[2].x - coordinates[1].x,
                y: coordinates[0].y + coordinates[2].y - coordinates[1].y,
            };
            return [
                {
                    type: 'polygon',
                    attrs: {
                        coordinates: [
                            coordinates[0],
                            coordinates[1],
                            coordinates[2],
                            coordinate,
                        ],
                    },
                    styles: { style: 'stroke_fill' },
                },
            ];
        }
        return [];
    },
    performEventPressedMove: ({ points, performPointIndex, performPoint }) => {
        if (performPointIndex < 2) {
            // @ts-expect-error
            points[0].price = performPoint.price;
            // @ts-expect-error
            points[1].price = performPoint.price;
        }
    },
    performEventMoveForDrawing: ({ currentStep, points, performPoint }) => {
        if (currentStep === 2) {
            // @ts-expect-error
            points[0].price = performPoint.price;
        }
    },
};

const triangle = {
    name: 'triangle',
    totalStep: 4,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: {
        polygon: {
            color: 'rgba(22, 119, 255, 0.15)',
        },
    },
    createPointFigures: ({ coordinates }) => {
        return [
            {
                type: 'polygon',
                attrs: { coordinates },
                styles: { style: 'stroke_fill' },
            },
        ];
    },
};

const fibonacciCircle = {
    name: 'fibonacciCircle',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates }) => {
        if (coordinates.length > 1) {
            const xDis = Math.abs(coordinates[0].x - coordinates[1].x);
            const yDis = Math.abs(coordinates[0].y - coordinates[1].y);
            const radius = Math.sqrt(xDis * xDis + yDis * yDis);
            const percents = [0.236, 0.382, 0.5, 0.618, 0.786, 1];
            const circles = [];
            const texts = [];
            percents.forEach((percent) => {
                const r = radius * percent;
                circles.push({ ...coordinates[0], r });
                texts.push({
                    x: coordinates[0].x,
                    y: coordinates[0].y + r + 6,
                    text: `${(percent * 100).toFixed(1)}%`,
                });
            });
            return [
                {
                    type: 'circle',
                    attrs: circles,
                    styles: { style: 'stroke' },
                },
                {
                    type: 'text',
                    ignoreEvent: true,
                    attrs: texts,
                },
            ];
        }
        return [];
    },
};

const fibonacciSegment = {
    name: 'fibonacciSegment',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    // @ts-ignore
    createPointFigures: ({ coordinates, overlay, precision }) => {
        const lines = [];
        const texts = [];
        if (coordinates.length > 1) {
            const textX = coordinates[1].x > coordinates[0].x
                ? coordinates[0].x
                : coordinates[1].x;
            const percents = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0];
            const yDif = coordinates[0].y - coordinates[1].y;
            const points = overlay.points;
            // @ts-expect-error
            const valueDif = points[0].value - points[1].value;
            percents.forEach((percent) => {
                const y = coordinates[1].y + yDif * percent;
                // @ts-expect-error
                const price = (points[1].value + valueDif * percent).toFixed(precision.price);
                lines.push({
                    coordinates: [
                        { x: coordinates[0].x, y },
                        { x: coordinates[1].x, y },
                    ],
                });
                texts.push({
                    x: textX,
                    y,
                    text: `${price} (${(percent * 100).toFixed(1)}%)`,
                    baseline: 'bottom',
                });
            });
        }
        return [
            {
                type: 'line',
                attrs: lines,
            },
            {
                type: 'text',
                ignoreEvent: true,
                attrs: texts,
            },
        ];
    },
};

const fibonacciSpiral = {
    name: 'fibonacciSpiral',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates, bounding }) => {
        if (coordinates.length > 1) {
            const startRadius = getDistance(coordinates[0], coordinates[1]) / Math.sqrt(24);
            const flag = coordinates[1].x > coordinates[0].x ? 0 : 1;
            const kb = utils.getLinearSlopeIntercept(coordinates[0], coordinates[1]);
            let offsetAngle;
            if (kb) {
                offsetAngle = Math.atan(kb[0]) + Math.PI * flag;
            }
            else {
                if (coordinates[1].y > coordinates[0].y) {
                    offsetAngle = Math.PI / 2;
                }
                else {
                    offsetAngle = (Math.PI / 2) * 3;
                }
            }
            const rotateCoordinate1 = getRotateCoordinate({ x: coordinates[0].x - startRadius, y: coordinates[0].y }, coordinates[0], offsetAngle);
            const rotateCoordinate2 = getRotateCoordinate({
                x: coordinates[0].x - startRadius,
                y: coordinates[0].y - startRadius,
            }, coordinates[0], offsetAngle);
            const arcs = [
                {
                    ...rotateCoordinate1,
                    r: startRadius,
                    startAngle: offsetAngle,
                    endAngle: offsetAngle + Math.PI / 2,
                },
                {
                    ...rotateCoordinate2,
                    r: startRadius * 2,
                    startAngle: offsetAngle + Math.PI / 2,
                    endAngle: offsetAngle + Math.PI,
                },
            ];
            let x = coordinates[0].x - startRadius;
            let y = coordinates[0].y - startRadius;
            for (let i = 2; i < 9; i++) {
                const r = arcs[i - 2].r + arcs[i - 1].r;
                let startAngle = 0;
                switch (i % 4) {
                    case 0: {
                        startAngle = offsetAngle;
                        x -= arcs[i - 2].r;
                        break;
                    }
                    case 1: {
                        startAngle = offsetAngle + Math.PI / 2;
                        y -= arcs[i - 2].r;
                        break;
                    }
                    case 2: {
                        startAngle = offsetAngle + Math.PI;
                        x += arcs[i - 2].r;
                        break;
                    }
                    case 3: {
                        startAngle = offsetAngle + (Math.PI / 2) * 3;
                        y += arcs[i - 2].r;
                        break;
                    }
                }
                const endAngle = startAngle + Math.PI / 2;
                const rotateCoordinate = getRotateCoordinate({ x, y }, coordinates[0], offsetAngle);
                arcs.push({
                    ...rotateCoordinate,
                    r,
                    startAngle,
                    endAngle,
                });
            }
            return [
                {
                    type: 'arc',
                    attrs: arcs,
                },
                {
                    type: 'line',
                    attrs: getRayLine(coordinates, bounding),
                },
            ];
        }
        return [];
    },
};

const fibonacciSpeedResistanceFan = {
    name: 'fibonacciSpeedResistanceFan',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates, bounding }) => {
        const lines1 = [];
        let lines2 = [];
        const texts = [];
        if (coordinates.length > 1) {
            const xOffset = coordinates[1].x > coordinates[0].x ? -38 : 4;
            const yOffset = coordinates[1].y > coordinates[0].y ? -2 : 20;
            const xDistance = coordinates[1].x - coordinates[0].x;
            const yDistance = coordinates[1].y - coordinates[0].y;
            const percents = [1, 0.75, 0.618, 0.5, 0.382, 0.25, 0];
            percents.forEach((percent) => {
                const x = coordinates[1].x - xDistance * percent;
                const y = coordinates[1].y - yDistance * percent;
                lines1.push({
                    coordinates: [
                        { x, y: coordinates[0].y },
                        { x, y: coordinates[1].y },
                    ],
                });
                lines1.push({
                    coordinates: [
                        { x: coordinates[0].x, y },
                        { x: coordinates[1].x, y },
                    ],
                });
                lines2 = lines2.concat(getRayLine([coordinates[0], { x, y: coordinates[1].y }], bounding));
                lines2 = lines2.concat(getRayLine([coordinates[0], { x: coordinates[1].x, y }], bounding));
                texts.unshift({
                    x: coordinates[0].x + xOffset,
                    y: y + 10,
                    text: `${percent.toFixed(3)}`,
                });
                texts.unshift({
                    x: x - 18,
                    y: coordinates[0].y + yOffset,
                    text: `${percent.toFixed(3)}`,
                });
            });
        }
        return [
            {
                type: 'line',
                attrs: lines1,
            },
            {
                type: 'line',
                attrs: lines2,
            },
            {
                type: 'text',
                ignoreEvent: true,
                attrs: texts,
            },
        ];
    },
};

const fibonacciExtension = {
    name: 'fibonacciExtension',
    totalStep: 4,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    // @ts-ignore
    createPointFigures: ({ coordinates, overlay, precision }) => {
        const fbLines = [];
        const texts = [];
        if (coordinates.length > 2) {
            const points = overlay.points;
            // @ts-expect-error
            const valueDif = points[1].value - points[0].value;
            const yDif = coordinates[1].y - coordinates[0].y;
            const percents = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
            const textX = coordinates[2].x > coordinates[1].x
                ? coordinates[1].x
                : coordinates[2].x;
            percents.forEach((percent) => {
                const y = coordinates[2].y + yDif * percent;
                // @ts-expect-error
                const price = (points[2].value + valueDif * percent).toFixed(precision.price);
                fbLines.push({
                    coordinates: [
                        { x: coordinates[1].x, y },
                        { x: coordinates[2].x, y },
                    ],
                });
                texts.push({
                    x: textX,
                    y,
                    text: `${price} (${(percent * 100).toFixed(1)}%)`,
                    baseline: 'bottom',
                });
            });
        }
        return [
            {
                type: 'line',
                attrs: { coordinates },
                styles: { style: 'dashed' },
            },
            {
                type: 'line',
                attrs: fbLines,
            },
            {
                type: 'text',
                ignoreEvent: true,
                attrs: texts,
            },
        ];
    },
};

const gannBox = {
    name: 'gannBox',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: {
        polygon: {
            color: 'rgba(22, 119, 255, 0.15)',
        },
    },
    createPointFigures: ({ coordinates }) => {
        if (coordinates.length > 1) {
            const quarterYDis = (coordinates[1].y - coordinates[0].y) / 4;
            const xDis = coordinates[1].x - coordinates[0].x;
            const dashedLines = [
                {
                    coordinates: [
                        coordinates[0],
                        { x: coordinates[1].x, y: coordinates[1].y - quarterYDis },
                    ],
                },
                {
                    coordinates: [
                        coordinates[0],
                        { x: coordinates[1].x, y: coordinates[1].y - quarterYDis * 2 },
                    ],
                },
                {
                    coordinates: [
                        { x: coordinates[0].x, y: coordinates[1].y },
                        { x: coordinates[1].x, y: coordinates[0].y + quarterYDis },
                    ],
                },
                {
                    coordinates: [
                        { x: coordinates[0].x, y: coordinates[1].y },
                        { x: coordinates[1].x, y: coordinates[0].y + quarterYDis * 2 },
                    ],
                },
                {
                    coordinates: [
                        { ...coordinates[0] },
                        { x: coordinates[0].x + xDis * 0.236, y: coordinates[1].y },
                    ],
                },
                {
                    coordinates: [
                        { ...coordinates[0] },
                        { x: coordinates[0].x + xDis * 0.5, y: coordinates[1].y },
                    ],
                },
                {
                    coordinates: [
                        { x: coordinates[0].x, y: coordinates[1].y },
                        { x: coordinates[0].x + xDis * 0.236, y: coordinates[0].y },
                    ],
                },
                {
                    coordinates: [
                        { x: coordinates[0].x, y: coordinates[1].y },
                        { x: coordinates[0].x + xDis * 0.5, y: coordinates[0].y },
                    ],
                },
            ];
            const solidLines = [
                { coordinates: [coordinates[0], coordinates[1]] },
                {
                    coordinates: [
                        { x: coordinates[0].x, y: coordinates[1].y },
                        { x: coordinates[1].x, y: coordinates[0].y },
                    ],
                },
            ];
            return [
                {
                    type: 'line',
                    attrs: [
                        {
                            coordinates: [
                                coordinates[0],
                                { x: coordinates[1].x, y: coordinates[0].y },
                            ],
                        },
                        {
                            coordinates: [
                                { x: coordinates[1].x, y: coordinates[0].y },
                                coordinates[1],
                            ],
                        },
                        {
                            coordinates: [
                                coordinates[1],
                                { x: coordinates[0].x, y: coordinates[1].y },
                            ],
                        },
                        {
                            coordinates: [
                                { x: coordinates[0].x, y: coordinates[1].y },
                                coordinates[0],
                            ],
                        },
                    ],
                },
                {
                    type: 'polygon',
                    ignoreEvent: true,
                    attrs: {
                        coordinates: [
                            coordinates[0],
                            { x: coordinates[1].x, y: coordinates[0].y },
                            coordinates[1],
                            { x: coordinates[0].x, y: coordinates[1].y },
                        ],
                    },
                    styles: { style: 'fill' },
                },
                {
                    type: 'line',
                    attrs: dashedLines,
                    styles: { style: 'dashed' },
                },
                {
                    type: 'line',
                    attrs: solidLines,
                },
            ];
        }
        return [];
    },
};

const threeWaves = {
    name: 'threeWaves',
    totalStep: 5,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates }) => {
        const texts = coordinates.map((coordinate, i) => ({
            ...coordinate,
            text: `(${i})`,
            baseline: 'bottom',
        }));
        return [
            {
                type: 'line',
                attrs: { coordinates },
            },
            {
                type: 'text',
                ignoreEvent: true,
                attrs: texts,
            },
        ];
    },
};

const fiveWaves = {
    name: 'fiveWaves',
    totalStep: 7,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates }) => {
        const texts = coordinates.map((coordinate, i) => ({
            ...coordinate,
            text: `(${i})`,
            baseline: 'bottom',
        }));
        return [
            {
                type: 'line',
                attrs: { coordinates },
            },
            {
                type: 'text',
                ignoreEvent: true,
                attrs: texts,
            },
        ];
    },
};

const eightWaves = {
    name: 'eightWaves',
    totalStep: 10,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates }) => {
        const texts = coordinates.map((coordinate, i) => ({
            ...coordinate,
            text: `(${i})`,
            baseline: 'bottom',
        }));
        return [
            {
                type: 'line',
                attrs: { coordinates },
            },
            {
                type: 'text',
                ignoreEvent: true,
                attrs: texts,
            },
        ];
    },
};

const anyWaves = {
    name: 'anyWaves',
    totalStep: Number.MAX_SAFE_INTEGER,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates }) => {
        const texts = coordinates.map((coordinate, i) => ({
            ...coordinate,
            text: `(${i})`,
            baseline: 'bottom',
        }));
        return [
            {
                type: 'line',
                attrs: { coordinates },
            },
            {
                type: 'text',
                ignoreEvent: true,
                attrs: texts,
            },
        ];
    },
};

const abcd = {
    name: 'abcd',
    totalStep: 5,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates }) => {
        let acLineCoordinates = [];
        let bdLineCoordinates = [];
        const tags = ['A', 'B', 'C', 'D'];
        const texts = coordinates.map((coordinate, i) => ({
            ...coordinate,
            baseline: 'bottom',
            text: `(${tags[i]})`,
        }));
        if (coordinates.length > 2) {
            acLineCoordinates = [coordinates[0], coordinates[2]];
            if (coordinates.length > 3) {
                bdLineCoordinates = [coordinates[1], coordinates[3]];
            }
        }
        return [
            {
                type: 'line',
                attrs: { coordinates },
            },
            {
                type: 'line',
                attrs: [
                    { coordinates: acLineCoordinates },
                    { coordinates: bdLineCoordinates },
                ],
                styles: { style: 'dashed' },
            },
            {
                type: 'text',
                ignoreEvent: true,
                attrs: texts,
            },
        ];
    },
};

const xabcd = {
    name: 'xabcd',
    totalStep: 6,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: {
        polygon: {
            color: 'rgba(22, 119, 255, 0.15)',
        },
    },
    createPointFigures: ({ coordinates, overlay: _overlay }) => {
        const dashedLines = [];
        const polygons = [];
        const tags = ['X', 'A', 'B', 'C', 'D'];
        const texts = coordinates.map((coordinate, i) => ({
            ...coordinate,
            baseline: 'bottom',
            text: `(${tags[i]})`,
        }));
        if (coordinates.length > 2) {
            dashedLines.push({ coordinates: [coordinates[0], coordinates[2]] });
            polygons.push({
                coordinates: [coordinates[0], coordinates[1], coordinates[2]],
            });
            if (coordinates.length > 3) {
                dashedLines.push({ coordinates: [coordinates[1], coordinates[3]] });
                if (coordinates.length > 4) {
                    dashedLines.push({ coordinates: [coordinates[2], coordinates[4]] });
                    polygons.push({
                        coordinates: [coordinates[2], coordinates[3], coordinates[4]],
                    });
                }
            }
        }
        return [
            {
                type: 'line',
                attrs: { coordinates },
            },
            {
                type: 'line',
                attrs: dashedLines,
                styles: { style: 'dashed' },
            },
            {
                type: 'polygon',
                ignoreEvent: true,
                attrs: polygons,
            },
            {
                type: 'text',
                ignoreEvent: true,
                attrs: texts,
            },
        ];
    },
};

const elliotTripleComboWaves = {
    name: 'elliotTripleComboWaves',
    totalStep: 6,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates }) => {
        let acLineCoordinates = [];
        let bdLineCoordinates = [];
        const tags = ['(0)', '(W)', '(X)', '(Y)', '(Z)'];
        const texts = coordinates.map((coordinate, i) => ({
            ...coordinate,
            baseline: 'bottom',
            text: `(${tags[i]})`,
        }));
        return [
            {
                type: 'line',
                attrs: { coordinates },
            },
            {
                type: 'line',
                attrs: [
                    { coordinates: acLineCoordinates },
                    { coordinates: bdLineCoordinates },
                ],
                styles: { style: 'dashed' },
            },
            {
                type: 'text',
                ignoreEvent: true,
                attrs: texts,
            },
        ];
    },
};

const headAndShoulders = {
    name: 'headAndShoulders',
    totalStep: 8,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: {
        polygon: {
            color: 'rgba(22, 119, 255, 0.15)',
        },
    },
    createPointFigures: ({ coordinates }) => {
        const dashedLines = [];
        const polygons = [];
        const tags = [
            '1',
            'Left Shoulder',
            '2',
            'Head',
            '3',
            'Right Shoulder',
            '4',
        ];
        const texts = coordinates.map((coordinate, i) => ({
            ...coordinate,
            baseline: 'bottom',
            text: `${tags[i]}`,
        }));
        if (coordinates.length > 2) {
            dashedLines.push({ coordinates: [coordinates[0], coordinates[2]] });
            polygons.push({
                coordinates: [coordinates[0], coordinates[1], coordinates[2]],
            });
            if (coordinates.length > 4) {
                dashedLines.push({ coordinates: [coordinates[2], coordinates[4]] });
                polygons.push({
                    coordinates: [coordinates[2], coordinates[3], coordinates[4]],
                });
                if (coordinates.length > 6) {
                    dashedLines.push({ coordinates: [coordinates[4], coordinates[6]] });
                    polygons.push({
                        coordinates: [coordinates[4], coordinates[5], coordinates[6]],
                    });
                }
            }
        }
        return [
            {
                type: 'line',
                attrs: { coordinates },
            },
            {
                type: 'line',
                attrs: dashedLines,
                styles: { style: 'dashed' },
            },
            {
                type: 'polygon',
                ignoreEvent: true,
                attrs: polygons,
            },
            {
                type: 'text',
                ignoreEvent: true,
                attrs: texts,
            },
        ];
    },
};

const measure = {
    name: 'measure',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: {
        backgroundColor: 'rgba(22, 119, 255, 0.25)',
        tipBackgroundColor: '#1677FF',
        lineColor: '#1677FF',
    },
    createPointFigures: ({ coordinates, overlay, bounding }) => {
        if (coordinates.length > 1) {
            const newPrice = overlay.points[1]?.value;
            const oldPrice = overlay.points[0]?.value;
            let percentage = 0;
            let differencePrice = 0;
            if (oldPrice !== undefined && newPrice !== undefined) {
                percentage = ((newPrice - oldPrice) / oldPrice) * 100;
                differencePrice = newPrice - oldPrice;
            }
            const leftToRight = coordinates[0]?.x < coordinates[1]?.x;
            const topToBottom = coordinates[0]?.y < coordinates[1]?.y;
            const centerCoordinate = {
                x: Math.round((coordinates[0].x + coordinates[1].x) / 2),
                y: Math.round((coordinates[0].y + coordinates[1].y) / 2),
            };
            const backgroundColor = overlay.styles?.backgroundColor;
            const tipBackgroundColor = overlay.styles?.tipBackgroundColor;
            const lineColor = overlay.styles?.lineColor;
            const texts = [
                `${differencePrice.toFixed(2)} (${percentage.toFixed(2)}%)`,
            ];
            const figures = [
                {
                    type: 'polygon',
                    attrs: {
                        coordinates: [
                            coordinates[0],
                            { x: coordinates[1].x, y: coordinates[0].y },
                            coordinates[1],
                            { x: coordinates[0].x, y: coordinates[1].y },
                        ],
                    },
                    styles: {
                        color: backgroundColor,
                    },
                },
                {
                    type: 'line',
                    attrs: {
                        coordinates: [
                            { x: coordinates[0].x, y: centerCoordinate.y },
                            { x: coordinates[1].x, y: centerCoordinate.y },
                        ],
                    },
                    styles: {
                        color: lineColor,
                    },
                },
                {
                    type: 'line',
                    attrs: {
                        coordinates: [
                            { x: centerCoordinate.x, y: coordinates[0].y },
                            { x: centerCoordinate.x, y: coordinates[1].y },
                        ],
                    },
                    styles: {
                        color: lineColor,
                    },
                },
            ];
            if (leftToRight) {
                figures.push({
                    type: 'line',
                    attrs: {
                        coordinates: [
                            { x: coordinates[1].x - 6, y: centerCoordinate.y - 4 },
                            { x: coordinates[1].x, y: centerCoordinate.y },
                            { x: coordinates[1].x - 6, y: centerCoordinate.y + 4 },
                        ],
                    },
                });
            }
            else {
                figures.push({
                    type: 'line',
                    attrs: {
                        coordinates: [
                            { x: coordinates[1].x + 6, y: centerCoordinate.y - 4 },
                            { x: coordinates[1].x, y: centerCoordinate.y },
                            { x: coordinates[1].x + 6, y: centerCoordinate.y + 4 },
                        ],
                    },
                });
            }
            if (topToBottom) {
                figures.push({
                    type: 'line',
                    attrs: {
                        coordinates: [
                            { x: centerCoordinate.x - 4, y: coordinates[1].y - 6 },
                            { x: centerCoordinate.x, y: coordinates[1].y },
                            { x: centerCoordinate.x + 4, y: coordinates[1].y - 6 },
                        ],
                    },
                    styles: {
                        color: lineColor,
                    },
                });
            }
            else {
                figures.push({
                    type: 'line',
                    attrs: {
                        coordinates: [
                            { x: centerCoordinate.x - 4, y: coordinates[1].y + 6 },
                            { x: centerCoordinate.x, y: coordinates[1].y },
                            { x: centerCoordinate.x + 4, y: coordinates[1].y + 6 },
                        ],
                    },
                    styles: {
                        color: lineColor,
                    },
                });
            }
            const length = texts.length;
            if (length > 0) {
                const tipGap = 8;
                const textGap = 4;
                const horizontalPadding = 12;
                const verticalPadding = 8;
                let y;
                let width = 0;
                const height = length * 12 + (length - 1) * textGap + verticalPadding * 2;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                texts.forEach((text) => {
                    width = Math.max(utils.calcTextWidth(text), width);
                });
                width += horizontalPadding * 2;
                if (topToBottom) {
                    if (coordinates[1].y + tipGap + height > bounding.height) {
                        y = bounding.height - height;
                    }
                    else {
                        y = coordinates[1].y + tipGap;
                    }
                }
                else {
                    if (coordinates[1].y - tipGap - height < 0) {
                        y = 0;
                    }
                    else {
                        y = coordinates[1].y - tipGap - height;
                    }
                }
                figures.push({
                    type: 'rect',
                    attrs: {
                        x: centerCoordinate.x - width / 2,
                        y,
                        width,
                        height,
                    },
                    styles: {
                        borderRadius: 4,
                        color: tipBackgroundColor,
                    },
                });
                let textY = y + verticalPadding;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                texts.forEach((text) => {
                    figures.push({
                        type: 'text',
                        attrs: {
                            x: centerCoordinate.x,
                            y: textY,
                            text,
                            align: 'center',
                        },
                        styles: {
                            paddingLeft: 0,
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
                            backgroundColor: 'none',
                            family: 'Space Grotesk, sans-serif',
                        },
                    });
                    textY += 12 + textGap;
                });
            }
            return figures;
        }
        return [];
    },
};

const crossLine = {
    name: 'crossLine',
    totalStep: 2,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates, bounding }) => {
        return [
            {
                type: 'line',
                attrs: {
                    coordinates: [
                        {
                            x: 0,
                            y: coordinates[0].y,
                        },
                        {
                            x: bounding.width,
                            y: coordinates[0].y,
                        },
                    ],
                },
            },
            {
                type: 'line',
                attrs: {
                    coordinates: [
                        {
                            x: coordinates[0].x,
                            y: 0,
                        },
                        {
                            x: coordinates[0].x,
                            y: bounding.height,
                        },
                    ],
                },
            },
        ];
    },
};

const faltTopBottom = {
    name: 'faltTopBottom',
    totalStep: 4,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: false,
    styles: {
        polygon: {
            color: '#FCB9002b',
        },
        line: {
            size: 2,
            color: '#FCB900',
        },
    },
    createPointFigures: ({ coordinates, overlay: _overlay }) => {
        let mainLine = [];
        const dashedLines = [];
        const polygons = [];
        if (coordinates.length > 2) {
            mainLine = [
                {
                    coordinates: [
                        { x: coordinates[0].x, y: coordinates[2].y },
                        { x: coordinates[1].x, y: coordinates[2].y },
                    ],
                },
            ];
            polygons.push({
                coordinates: [
                    coordinates[0],
                    coordinates[1],
                    { x: coordinates[1].x, y: coordinates[2].y },
                    { x: coordinates[0].x, y: coordinates[2].y },
                ],
            });
            dashedLines.push({ coordinates: [coordinates[0], coordinates[1]] });
        }
        else {
            mainLine = [{ coordinates: coordinates }];
        }
        return [
            {
                type: 'line',
                attrs: mainLine,
                size: 2,
            },
            {
                type: 'polygon',
                ignoreEvent: true,
                attrs: polygons,
            },
            {
                type: 'line',
                attrs: dashedLines,
                size: 2,
            },
        ];
    },
    performEventMoveForDrawing: ({ currentStep, points, performPoint }) => {
        switch (currentStep) {
            case 3:
                points[1].timestamp = performPoint.timestamp;
                points[1].dataIndex = performPoint.dataIndex;
                break;
        }
    },
    performEventPressedMove: ({ points, performPointIndex, performPoint }) => {
        switch (performPointIndex) {
            case 1:
                points[2].timestamp = performPoint.timestamp;
                points[2].dataIndex = performPoint.dataIndex;
                break;
            case 2:
                points[1].timestamp = performPoint.timestamp;
                points[1].dataIndex = performPoint.dataIndex;
                break;
            case 3:
                points[1].timestamp = performPoint.timestamp;
                break;
        }
    },
};

const disJointChannel = {
    name: 'disJointChannel',
    totalStep: 4,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: {
        polygon: {
            color: '#FCB9002b',
        },
        line: {
            size: 2,
            color: '#FCB900',
        },
    },
    createPointFigures: ({ coordinates, bounding: _bounding }) => {
        let mainLine = [];
        const dashedLines = [];
        // const polygons: PolygonAttrs[] = [];
        let height = 0;
        if (coordinates.length >= 2) {
            height = Math.abs(coordinates[1].y - coordinates[0].y);
        }
        if (coordinates.length > 2) {
            mainLine = [
                {
                    coordinates: [
                        { x: coordinates[0].x, y: coordinates[0].y },
                        { x: coordinates[1].x, y: coordinates[1].y },
                    ],
                },
            ];
            dashedLines.push({
                coordinates: [
                    { x: coordinates[1].x, y: coordinates[2].y },
                    { x: coordinates[0].x, y: coordinates[2].y + height },
                ],
            });
        }
        else {
            mainLine = [{ coordinates: coordinates }];
        }
        return [
            {
                type: 'line',
                ignoreEvent: false,
                attrs: mainLine,
            },
            {
                type: 'line',
                ignoreEvent: false,
                attrs: dashedLines,
            },
        ];
    },
    performEventMoveForDrawing: ({ currentStep, points, performPoint }) => {
        switch (currentStep) {
            case 3:
                points[1].timestamp = performPoint.timestamp;
                points[1].dataIndex = performPoint.dataIndex;
                break;
        }
    },
    performEventPressedMove: ({ points, performPointIndex, performPoint }) => {
        switch (performPointIndex) {
            case 1:
                points[2].timestamp = performPoint.timestamp;
                points[2].dataIndex = performPoint.dataIndex;
                break;
            case 2:
                points[1].timestamp = performPoint.timestamp;
                points[1].dataIndex = performPoint.dataIndex;
                break;
        }
    },
};

const arc = {
    name: 'arc',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: {
        arc: {
            color: 'rgba(22, 119, 255)',
        },
    },
    createPointFigures: ({ coordinates }) => {
        if (coordinates.length > 1) {
            const midX = (coordinates[0].x + coordinates[1].x) / 2;
            const midY = (coordinates[0].y + coordinates[1].y) / 2;
            const radius = Math.sqrt(Math.pow(coordinates[1].x - coordinates[0].x, 2) +
                Math.pow(coordinates[1].y - coordinates[0].y, 2)) / 2;
            const startAngle = 0;
            const endAngle = Math.PI;
            return [
                {
                    type: 'arc',
                    attrs: {
                        x: midX,
                        y: midY,
                        r: radius,
                        startAngle: startAngle,
                        endAngle: endAngle,
                    },
                    styles: { style: 'solid' },
                },
            ];
        }
        return [];
    },
};

const tradingPlan = {
    name: 'tradingPlan',
    totalStep: 5,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: false,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates }) => {
        const n = coordinates.length;
        if (n >= 2) {
            const line = { type: 'line', attrs: { coordinates } };
            if (n == 2) {
                return [line];
            }
            if (n >= 3) {
                const bottomRect = {
                    type: 'polygon',
                    attrs: {
                        coordinates: [
                            coordinates[0], //
                            coordinates[1],
                            { x: coordinates[1].x, y: coordinates[2].y },
                            { x: coordinates[0].x, y: coordinates[2].y },
                        ],
                    },
                    styles: { style: 'fill', color: '#DE46464f' },
                };
                if (n == 3) {
                    return [bottomRect];
                }
                const topRect = {
                    type: 'polygon',
                    attrs: {
                        coordinates: [
                            coordinates[0], //
                            coordinates[1],
                            { x: coordinates[1].x, y: coordinates[3].y },
                            { x: coordinates[0].x, y: coordinates[3].y },
                        ],
                    },
                    styles: { style: 'fill', color: '#03ca9b2f' },
                };
                return [bottomRect, topRect];
            }
        }
        return [];
    },
    performEventMoveForDrawing: ({ currentStep, points, performPoint }) => {
        switch (currentStep) {
            case 2:
                points[0].value = performPoint.value;
                break;
            case 3:
                points[1].timestamp = performPoint.timestamp;
                points[1].dataIndex = performPoint.dataIndex;
                break;
            case 4:
                points[1].timestamp = points[2].timestamp = performPoint.timestamp;
                points[1].dataIndex = points[2].dataIndex = performPoint.dataIndex;
                break;
        }
    },
    performEventPressedMove: ({ points, performPointIndex, performPoint }) => {
        switch (performPointIndex) {
            case 0:
                points[1].value = performPoint.value;
                break;
            case 1:
                points[0].value = performPoint.value;
                points[2].timestamp = points[3].timestamp = performPoint.timestamp;
                points[2].dataIndex = points[3].dataIndex = performPoint.dataIndex;
                break;
            case 2:
                points[1].timestamp = points[3].timestamp = performPoint.timestamp;
                points[1].dataIndex = points[3].dataIndex = performPoint.dataIndex;
                break;
            case 3:
                points[1].timestamp = points[2].timestamp = performPoint.timestamp;
                points[1].dataIndex = points[2].dataIndex = performPoint.dataIndex;
                break;
        }
    },
};

const fibonacciDiagonal = {
    name: 'fibonacciDiagonal',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates, bounding: _bounding, overlay, precision, thousandsSeparator, }) => {
        const points = overlay.points;
        if (coordinates.length > 0) {
            const lines = [];
            const texts = [];
            // const startX = 0
            // const endX = bounding.width
            const startX = coordinates[0].x;
            const endX = coordinates[coordinates.length - 1].x;
            if (coordinates.length > 1 &&
                points[0].value !== undefined &&
                points[1].value !== undefined) {
                const percents = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0];
                const yDif = coordinates[0].y - coordinates[1].y;
                const valueDif = points[0].value - points[1].value;
                percents.forEach((percent) => {
                    const y = coordinates[1].y + yDif * percent;
                    const value = formatThousands(((points[1].value ?? 0) + valueDif * percent).toFixed(precision.price), thousandsSeparator);
                    lines.push({
                        coordinates: [
                            { x: startX, y },
                            { x: endX, y },
                        ],
                    });
                    texts.push({
                        x: startX,
                        y,
                        text: `${value} (${(percent * 100).toFixed(1)}%)`,
                        baseline: 'bottom',
                    });
                });
                lines.push({
                    coordinates: [
                        { x: lines[0].coordinates[0].x, y: lines[0].coordinates[0].y },
                        {
                            x: lines[percents.length - 1].coordinates[1].x,
                            y: lines[percents.length - 1].coordinates[1].y,
                        },
                    ],
                });
            }
            return [
                {
                    type: 'line',
                    attrs: lines,
                },
                {
                    type: 'text',
                    isCheckEvent: false,
                    attrs: texts,
                },
            ];
        }
        return [];
    },
    onRightClick: (event) => {
        alert(`object ${event.overlay.name} was clicked`);
        return true;
    },
};

const overlays = [
    arrow,
    circle,
    rect,
    triangle,
    parallelogram,
    fibonacciCircle,
    fibonacciSegment,
    fibonacciSpiral,
    fibonacciSpeedResistanceFan,
    fibonacciExtension,
    gannBox,
    threeWaves,
    fiveWaves,
    eightWaves,
    anyWaves,
    abcd,
    xabcd,
    elliotTripleComboWaves,
    headAndShoulders,
    measure,
    crossLine,
    faltTopBottom,
    disJointChannel,
    arc,
    tradingPlan,
    fibonacciDiagonal,
];

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
// Register Pro overlays automatically
overlays.forEach((o) => {
    registerOverlay(o);
});
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
    formatThousands: formatThousands$1,
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
};

export { CandleType, ChartMain, YAxisType, dispose, getFigureClass, getOverlayClass, getSupportedFigures, getSupportedIndicators, getSupportedLocales, getSupportedOverlays, init, overlays as proOverlays, registerFigure, registerIndicator, registerLocale, registerOverlay, registerStyles, registerXAxis, registerYAxis, utils, version };
