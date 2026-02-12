/**
 * EnsoCharts Pro — Custom overlay definitions (drawing tools)
 * Ported from the old equicharts-pro bundle to TypeScript.
 */

import type Coordinate from '../common/Coordinate'
import type Bounding from '../common/Bounding'
import type { OverlayFigure, OverlayCreateFiguresCallbackParams } from '../component/Overlay'
import { utils } from '../index'

// ── Helpers ──

/** Rotate point `p` around `center` by `angle` radians */
function rotatePoint(p: Coordinate, center: Coordinate, angle: number): Coordinate {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    return {
        x: (p.x - center.x) * cos - (p.y - center.y) * sin + center.x,
        y: (p.x - center.x) * sin + (p.y - center.y) * cos + center.y
    }
}

/** Euclidean distance between two coordinates */
function getDistance(a: Coordinate, b: Coordinate): number {
    const dx = Math.abs(a.x - b.x)
    const dy = Math.abs(a.y - b.y)
    return Math.sqrt(dx * dx + dy * dy)
}

/** Extend a line from coordinates[0] through coordinates[1] to the bounding edge */
function extendLine(coords: Coordinate[], bounding: Bounding): any {
    if (coords.length > 1) {
        let end: Coordinate
        if (coords[0].x === coords[1].x && coords[0].y !== coords[1].y) {
            end = coords[0].y < coords[1].y
                ? { x: coords[0].x, y: bounding.height }
                : { x: coords[0].x, y: 0 }
        } else if (coords[0].x > coords[1].x) {
            end = {
                x: 0,
                y: utils.getLinearYFromCoordinates(coords[0], coords[1], { x: 0, y: coords[0].y })
            }
        } else {
            end = {
                x: bounding.width,
                y: utils.getLinearYFromCoordinates(coords[0], coords[1], { x: bounding.width, y: coords[0].y })
            }
        }
        return { coordinates: [coords[0], end] }
    }
    return []
}

/** Format number with thousands separator */
function formatThousands(value: string, separator: string): string {
    if (separator.length === 0) return value
    if (value.includes('.')) {
        const parts = value.split('.')
        return `${parts[0].replace(/(\d)(?=(\d{3})+$)/g, (m) => `${m}${separator}`)}.${parts[1]}`
    }
    return value.replace(/(\d)(?=(\d{3})+$)/g, (m) => `${m}${separator}`)
}

// ── Overlay Definitions ──

const arrow = {
    name: 'arrow',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates }: OverlayCreateFiguresCallbackParams<unknown>): OverlayFigure | OverlayFigure[] => {
        if (coordinates.length > 1) {
            const dir = coordinates[1].x > coordinates[0].x ? 0 : 1
            const si = utils.getLinearSlopeIntercept(coordinates[0], coordinates[1])
            let angle: number
            if (si) {
                angle = Math.atan(si[0]) + Math.PI * dir
            } else {
                angle = coordinates[1].y > coordinates[0].y ? Math.PI / 2 : Math.PI / 2 * 3
            }
            const a1 = rotatePoint({ x: coordinates[1].x - 8, y: coordinates[1].y + 4 }, coordinates[1], angle)
            const a2 = rotatePoint({ x: coordinates[1].x - 8, y: coordinates[1].y - 4 }, coordinates[1], angle)
            return [
                { type: 'line', attrs: { coordinates } },
                { type: 'line', ignoreEvent: true, attrs: { coordinates: [a1, coordinates[1], a2] } }
            ]
        }
        return []
    }
}

const circle = {
    name: 'circle',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: { circle: { color: 'rgba(22, 119, 255, 0.15)' } },
    createPointFigures: ({ coordinates }: OverlayCreateFiguresCallbackParams<unknown>): OverlayFigure | OverlayFigure[] => {
        if (coordinates.length > 1) {
            const r = getDistance(coordinates[0], coordinates[1])
            return { type: 'circle', attrs: { ...coordinates[0], r }, styles: { style: 'stroke_fill' } }
        }
        return []
    }
}

const rect = {
    name: 'rect',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: { polygon: { color: 'rgba(22, 119, 255, 0.15)' } },
    createPointFigures: ({ coordinates }: OverlayCreateFiguresCallbackParams<unknown>): OverlayFigure | OverlayFigure[] => {
        if (coordinates.length > 1) {
            return [{
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
        }
        return []
    }
}

const parallelogram = {
    name: 'parallelogram',
    totalStep: 4,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: { polygon: { color: 'rgba(22, 119, 255, 0.15)' } },
    createPointFigures: ({ coordinates }: OverlayCreateFiguresCallbackParams<unknown>): OverlayFigure | OverlayFigure[] => {
        if (coordinates.length === 2) {
            return [{ type: 'line', ignoreEvent: true, attrs: { coordinates } }]
        }
        if (coordinates.length === 3) {
            const d = {
                x: coordinates[0].x + coordinates[2].x - coordinates[1].x,
                y: coordinates[0].y + coordinates[2].y - coordinates[1].y
            }
            return [{
                type: 'polygon',
                attrs: { coordinates: [coordinates[0], coordinates[1], coordinates[2], d] },
                styles: { style: 'stroke_fill' }
            }]
        }
        return []
    },
    performEventPressedMove: ({ points, performPointIndex, performPoint }: any): void => {
        if (performPointIndex < 2) {
            points[0].price = performPoint.price
            points[1].price = performPoint.price
        }
    },
    performEventMoveForDrawing: ({ currentStep, points, performPoint }: any): void => {
        if (currentStep === 2) {
            points[0].price = performPoint.price
        }
    }
}

const triangle = {
    name: 'triangle',
    totalStep: 4,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: { polygon: { color: 'rgba(22, 119, 255, 0.15)' } },
    createPointFigures: ({ coordinates }: OverlayCreateFiguresCallbackParams<unknown>): OverlayFigure | OverlayFigure[] => {
        return [{ type: 'polygon', attrs: { coordinates }, styles: { style: 'stroke_fill' } }]
    }
}

const fibonacciCircle = {
    name: 'fibonacciCircle',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates }: OverlayCreateFiguresCallbackParams<unknown>): OverlayFigure | OverlayFigure[] => {
        if (coordinates.length > 1) {
            const dx = Math.abs(coordinates[0].x - coordinates[1].x)
            const dy = Math.abs(coordinates[0].y - coordinates[1].y)
            const radius = Math.sqrt(dx * dx + dy * dy)
            const levels = [0.236, 0.382, 0.5, 0.618, 0.786, 1]
            const circles: any[] = []
            const labels: any[] = []
            levels.forEach(l => {
                const r = radius * l
                circles.push({ ...coordinates[0], r })
                labels.push({ x: coordinates[0].x, y: coordinates[0].y + r + 6, text: `${(l * 100).toFixed(1)}%` })
            })
            return [
                { type: 'circle', attrs: circles, styles: { style: 'stroke' } },
                { type: 'text', ignoreEvent: true, attrs: labels }
            ]
        }
        return []
    }
}

const fibonacciSegment = {
    name: 'fibonacciSegment',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates, overlay }: any): OverlayFigure | OverlayFigure[] => {
        const lines: any[] = []
        const labels: any[] = []
        if (coordinates.length > 1) {
            const leftX = coordinates[1].x > coordinates[0].x ? coordinates[0].x : coordinates[1].x
            const levels = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0]
            const coordDiff = coordinates[0].y - coordinates[1].y
            const points = overlay.points
            const valueDiff = points[0].value - points[1].value
            levels.forEach(l => {
                const y = coordinates[1].y + coordDiff * l
                const price = ((points[1].value + valueDiff * l) as number).toFixed(2)
                lines.push({ coordinates: [{ x: coordinates[0].x, y }, { x: coordinates[1].x, y }] })
                labels.push({ x: leftX, y, text: `${price} (${(l * 100).toFixed(1)}%)`, baseline: 'bottom' })
            })
        }
        return [
            { type: 'line', attrs: lines },
            { type: 'text', ignoreEvent: true, attrs: labels }
        ]
    }
}

const fibonacciSpiral = {
    name: 'fibonacciSpiral',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates, bounding }: OverlayCreateFiguresCallbackParams<unknown>): OverlayFigure | OverlayFigure[] => {
        if (coordinates.length > 1) {
            const baseR = getDistance(coordinates[0], coordinates[1]) / Math.sqrt(24)
            const dir = coordinates[1].x > coordinates[0].x ? 0 : 1
            const si = utils.getLinearSlopeIntercept(coordinates[0], coordinates[1])
            let angle: number
            if (si) { angle = Math.atan(si[0]) + Math.PI * dir }
            else { angle = coordinates[1].y > coordinates[0].y ? Math.PI / 2 : Math.PI / 2 * 3 }

            const c1 = rotatePoint({ x: coordinates[0].x - baseR, y: coordinates[0].y }, coordinates[0], angle)
            const c2 = rotatePoint({ x: coordinates[0].x - baseR, y: coordinates[0].y - baseR }, coordinates[0], angle)
            const arcs: any[] = [
                { ...c1, r: baseR, startAngle: angle, endAngle: angle + Math.PI / 2 },
                { ...c2, r: baseR * 2, startAngle: angle + Math.PI / 2, endAngle: angle + Math.PI }
            ]
            let cx = coordinates[0].x - baseR
            let cy = coordinates[0].y - baseR
            for (let i = 2; i < 9; i++) {
                const r = arcs[i - 2].r + arcs[i - 1].r
                let sa = 0
                switch (i % 4) {
                    case 0: sa = angle; cx -= arcs[i - 2].r; break
                    case 1: sa = angle + Math.PI / 2; cy -= arcs[i - 2].r; break
                    case 2: sa = angle + Math.PI; cx += arcs[i - 2].r; break
                    case 3: sa = angle + Math.PI / 2 * 3; cy += arcs[i - 2].r; break
                }
                const center = rotatePoint({ x: cx, y: cy }, coordinates[0], angle)
                arcs.push({ ...center, r, startAngle: sa, endAngle: sa + Math.PI / 2 })
            }
            return [
                { type: 'arc', attrs: arcs },
                { type: 'line', attrs: extendLine(coordinates, bounding) }
            ]
        }
        return []
    }
}

const fibonacciSpeedResistanceFan = {
    name: 'fibonacciSpeedResistanceFan',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates, bounding }: OverlayCreateFiguresCallbackParams<unknown>): OverlayFigure | OverlayFigure[] => {
        const gridLines: any[] = []
        let fanLines: any[] = []
        const labels: any[] = []
        if (coordinates.length > 1) {
            const labelOffset = coordinates[1].x > coordinates[0].x ? -38 : 4
            const labelOffsetY = coordinates[1].y > coordinates[0].y ? -2 : 20
            const dx = coordinates[1].x - coordinates[0].x
            const dy = coordinates[1].y - coordinates[0].y
            const levels = [1, 0.75, 0.618, 0.5, 0.382, 0.25, 0]
            levels.forEach(l => {
                const x = coordinates[1].x - dx * l
                const y = coordinates[1].y - dy * l
                gridLines.push({ coordinates: [{ x, y: coordinates[0].y }, { x, y: coordinates[1].y }] })
                gridLines.push({ coordinates: [{ x: coordinates[0].x, y }, { x: coordinates[1].x, y }] })
                fanLines = fanLines.concat(extendLine([coordinates[0], { x, y: coordinates[1].y }], bounding))
                fanLines = fanLines.concat(extendLine([coordinates[0], { x: coordinates[1].x, y }], bounding))
                labels.unshift({ x: coordinates[0].x + labelOffset, y: y + 10, text: `${l.toFixed(3)}` })
                labels.unshift({ x: x - 18, y: coordinates[0].y + labelOffsetY, text: `${l.toFixed(3)}` })
            })
        }
        return [
            { type: 'line', attrs: gridLines },
            { type: 'line', attrs: fanLines },
            { type: 'text', ignoreEvent: true, attrs: labels }
        ]
    }
}

const fibonacciExtension = {
    name: 'fibonacciExtension',
    totalStep: 4,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates, overlay }: any): OverlayFigure | OverlayFigure[] => {
        const lines: any[] = []
        const labels: any[] = []
        if (coordinates.length > 2) {
            const points = overlay.points
            const valueDiff = points[1].value - points[0].value
            const coordDiff = coordinates[1].y - coordinates[0].y
            const levels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1]
            const leftX = coordinates[2].x > coordinates[1].x ? coordinates[1].x : coordinates[2].x
            levels.forEach(l => {
                const y = coordinates[2].y + coordDiff * l
                const price = ((points[2].value + valueDiff * l) as number).toFixed(2)
                lines.push({ coordinates: [{ x: coordinates[1].x, y }, { x: coordinates[2].x, y }] })
                labels.push({ x: leftX, y, text: `${price} (${(l * 100).toFixed(1)}%)`, baseline: 'bottom' })
            })
        }
        return [
            { type: 'line', attrs: { coordinates }, styles: { style: 'dashed' } },
            { type: 'line', attrs: lines },
            { type: 'text', ignoreEvent: true, attrs: labels }
        ]
    }
}

const gannBox = {
    name: 'gannBox',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: { polygon: { color: 'rgba(22, 119, 255, 0.15)' } },
    createPointFigures: ({ coordinates }: OverlayCreateFiguresCallbackParams<unknown>): OverlayFigure | OverlayFigure[] => {
        if (coordinates.length > 1) {
            const e = coordinates
            const qy = (e[1].y - e[0].y) / 4
            const dx = e[1].x - e[0].x
            const dashes = [
                { coordinates: [e[0], { x: e[1].x, y: e[1].y - qy }] },
                { coordinates: [e[0], { x: e[1].x, y: e[1].y - qy * 2 }] },
                { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[1].x, y: e[0].y + qy }] },
                { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[1].x, y: e[0].y + qy * 2 }] },
                { coordinates: [{ ...e[0] }, { x: e[0].x + dx * 0.236, y: e[1].y }] },
                { coordinates: [{ ...e[0] }, { x: e[0].x + dx * 0.5, y: e[1].y }] },
                { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[0].x + dx * 0.236, y: e[0].y }] },
                { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[0].x + dx * 0.5, y: e[0].y }] }
            ]
            const cross = [
                { coordinates: [e[0], e[1]] },
                { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[1].x, y: e[0].y }] }
            ]
            return [
                {
                    type: 'line',
                    attrs: [
                        { coordinates: [e[0], { x: e[1].x, y: e[0].y }] },
                        { coordinates: [{ x: e[1].x, y: e[0].y }, e[1]] },
                        { coordinates: [e[1], { x: e[0].x, y: e[1].y }] },
                        { coordinates: [{ x: e[0].x, y: e[1].y }, e[0]] }
                    ]
                },
                {
                    type: 'polygon', ignoreEvent: true,
                    attrs: { coordinates: [e[0], { x: e[1].x, y: e[0].y }, e[1], { x: e[0].x, y: e[1].y }] },
                    styles: { style: 'fill' }
                },
                { type: 'line', attrs: dashes, styles: { style: 'dashed' } },
                { type: 'line', attrs: cross }
            ]
        }
        return []
    }
}

function makeWaveOverlay(name: string, totalStep: number): any {
    return {
        name,
        totalStep,
        needDefaultPointFigure: true,
        needDefaultXAxisFigure: true,
        needDefaultYAxisFigure: true,
        createPointFigures: ({ coordinates }: OverlayCreateFiguresCallbackParams<unknown>): OverlayFigure | OverlayFigure[] => {
            const labels = coordinates.map((c, i) => ({ ...c, text: `(${i})`, baseline: 'bottom' }))
            return [
                { type: 'line', attrs: { coordinates } },
                { type: 'text', ignoreEvent: true, attrs: labels }
            ]
        }
    }
}

const threeWaves = makeWaveOverlay('threeWaves', 5)
const fiveWaves = makeWaveOverlay('fiveWaves', 7)
const eightWaves = makeWaveOverlay('eightWaves', 10)
const anyWaves = makeWaveOverlay('anyWaves', Number.MAX_SAFE_INTEGER)

const abcd = {
    name: 'abcd',
    totalStep: 5,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates }: OverlayCreateFiguresCallbackParams<unknown>): OverlayFigure | OverlayFigure[] => {
        const labels = ['A', 'B', 'C', 'D']
        const textAttrs = coordinates.map((c, i) => ({ ...c, baseline: 'bottom', text: `(${labels[i]})` }))
        let diag1: Coordinate[] = []
        let diag2: Coordinate[] = []
        if (coordinates.length > 2) {
            diag1 = [coordinates[0], coordinates[2]]
            if (coordinates.length > 3) diag2 = [coordinates[1], coordinates[3]]
        }
        return [
            { type: 'line', attrs: { coordinates } },
            { type: 'line', attrs: [{ coordinates: diag1 }, { coordinates: diag2 }], styles: { style: 'dashed' } },
            { type: 'text', ignoreEvent: true, attrs: textAttrs }
        ]
    }
}

const xabcd = {
    name: 'xabcd',
    totalStep: 6,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: { polygon: { color: 'rgba(22, 119, 255, 0.15)' } },
    createPointFigures: ({ coordinates }: OverlayCreateFiguresCallbackParams<unknown>): OverlayFigure | OverlayFigure[] => {
        const labels = ['X', 'A', 'B', 'C', 'D']
        const textAttrs = coordinates.map((c, i) => ({ ...c, baseline: 'bottom', text: `(${labels[i]})` }))
        const dashes: any[] = []
        const polys: any[] = []
        if (coordinates.length > 2) {
            dashes.push({ coordinates: [coordinates[0], coordinates[2]] })
            polys.push({ coordinates: [coordinates[0], coordinates[1], coordinates[2]] })
            if (coordinates.length > 3) {
                dashes.push({ coordinates: [coordinates[1], coordinates[3]] })
                if (coordinates.length > 4) {
                    dashes.push({ coordinates: [coordinates[2], coordinates[4]] })
                    polys.push({ coordinates: [coordinates[2], coordinates[3], coordinates[4]] })
                }
            }
        }
        return [
            { type: 'line', attrs: { coordinates } },
            { type: 'line', attrs: dashes, styles: { style: 'dashed' } },
            { type: 'polygon', ignoreEvent: true, attrs: polys },
            { type: 'text', ignoreEvent: true, attrs: textAttrs }
        ]
    }
}

const headAndShoulders = {
    name: 'headAndShoulders',
    totalStep: 8,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: { polygon: { color: 'rgba(22, 119, 255, 0.15)' } },
    createPointFigures: ({ coordinates }: OverlayCreateFiguresCallbackParams<unknown>): OverlayFigure | OverlayFigure[] => {
        const labels = ['1', 'Left Shoulder', '2', 'Head', '3', 'Right Shoulder', '4']
        const textAttrs = coordinates.map((c, i) => ({ ...c, baseline: 'bottom', text: labels[i] }))
        const dashes: any[] = []
        const polys: any[] = []
        if (coordinates.length > 2) {
            dashes.push({ coordinates: [coordinates[0], coordinates[2]] })
            polys.push({ coordinates: [coordinates[0], coordinates[1], coordinates[2]] })
            if (coordinates.length > 4) {
                dashes.push({ coordinates: [coordinates[2], coordinates[4]] })
                polys.push({ coordinates: [coordinates[2], coordinates[3], coordinates[4]] })
                if (coordinates.length > 6) {
                    dashes.push({ coordinates: [coordinates[4], coordinates[6]] })
                    polys.push({ coordinates: [coordinates[4], coordinates[5], coordinates[6]] })
                }
            }
        }
        return [
            { type: 'line', attrs: { coordinates } },
            { type: 'line', attrs: dashes, styles: { style: 'dashed' } },
            { type: 'polygon', ignoreEvent: true, attrs: polys },
            { type: 'text', ignoreEvent: true, attrs: textAttrs }
        ]
    }
}

const crossLine = {
    name: 'crossLine',
    totalStep: 2,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates, bounding }: OverlayCreateFiguresCallbackParams<unknown>): OverlayFigure | OverlayFigure[] => {
        return [
            { type: 'line', attrs: { coordinates: [{ x: 0, y: coordinates[0].y }, { x: bounding.width, y: coordinates[0].y }] } },
            { type: 'line', attrs: { coordinates: [{ x: coordinates[0].x, y: 0 }, { x: coordinates[0].x, y: bounding.height }] } }
        ]
    }
}

const measure = {
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
    createPointFigures: ({ coordinates, overlay, bounding }: any): OverlayFigure | OverlayFigure[] => {
        if (coordinates.length > 1) {
            const v1 = overlay.points[1]?.value
            const v0 = overlay.points[0]?.value
            let pct = 0
            let diff = 0
            if (v0 !== undefined && v1 !== undefined) {
                pct = (v1 - v0) / v0 * 100
                diff = v1 - v0
            }
            const isRight = coordinates[0].x < coordinates[1].x
            const isDown = coordinates[0].y < coordinates[1].y
            const mid = { x: Math.round((coordinates[0].x + coordinates[1].x) / 2), y: Math.round((coordinates[0].y + coordinates[1].y) / 2) }
            const bgColor = overlay.styles?.backgroundColor
            const tipColor = overlay.styles?.tipBackgroundColor
            const lineColor = overlay.styles?.lineColor
            const text = `${diff.toFixed(2)} (${pct.toFixed(2)}%)`
            const figs: any[] = [
                {
                    type: 'polygon',
                    attrs: {
                        coordinates: [
                            coordinates[0],
                            { x: coordinates[1].x, y: coordinates[0].y },
                            coordinates[1],
                            { x: coordinates[0].x, y: coordinates[1].y }
                        ]
                    },
                    styles: { color: bgColor }
                },
                { type: 'line', attrs: { coordinates: [{ x: coordinates[0].x, y: mid.y }, { x: coordinates[1].x, y: mid.y }] }, styles: { color: lineColor } },
                { type: 'line', attrs: { coordinates: [{ x: mid.x, y: coordinates[0].y }, { x: mid.x, y: coordinates[1].y }] }, styles: { color: lineColor } }
            ]
            // Arrow heads
            if (isRight) {
                figs.push({ type: 'line', attrs: { coordinates: [{ x: coordinates[1].x - 6, y: mid.y - 4 }, { x: coordinates[1].x, y: mid.y }, { x: coordinates[1].x - 6, y: mid.y + 4 }] } })
            } else {
                figs.push({ type: 'line', attrs: { coordinates: [{ x: coordinates[1].x + 6, y: mid.y - 4 }, { x: coordinates[1].x, y: mid.y }, { x: coordinates[1].x + 6, y: mid.y + 4 }] } })
            }
            if (isDown) {
                figs.push({ type: 'line', attrs: { coordinates: [{ x: mid.x - 4, y: coordinates[1].y - 6 }, { x: mid.x, y: coordinates[1].y }, { x: mid.x + 4, y: coordinates[1].y - 6 }] }, styles: { color: lineColor } })
            } else {
                figs.push({ type: 'line', attrs: { coordinates: [{ x: mid.x - 4, y: coordinates[1].y + 6 }, { x: mid.x, y: coordinates[1].y }, { x: mid.x + 4, y: coordinates[1].y + 6 }] }, styles: { color: lineColor } })
            }
            // Label
            const textWidth = Math.max(utils.calcTextWidth(text), 80) + 24
            const textHeight = 28
            let textY: number
            if (isDown) {
                textY = coordinates[1].y + 8 + textHeight > bounding.height ? bounding.height - textHeight : coordinates[1].y + 8
            } else {
                textY = coordinates[1].y - 8 - textHeight < 0 ? 0 : coordinates[1].y - 8 - textHeight
            }
            figs.push({
                type: 'rect',
                attrs: { x: mid.x - textWidth / 2, y: textY, width: textWidth, height: textHeight },
                styles: { borderRadius: 4, color: tipColor }
            })
            figs.push({
                type: 'text',
                attrs: { x: mid.x, y: textY + 8, text, align: 'center' },
                styles: { paddingLeft: 0, paddingTop: 0, paddingRight: 0, paddingBottom: 0, backgroundColor: 'none', family: 'Space Grotesk, sans-serif' }
            })
            return figs
        }
        return []
    }
}

const fibonacciDiagonal = {
    name: 'fibonacciDiagonal',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates, overlay }: any): OverlayFigure | OverlayFigure[] => {
        const points = overlay.points
        if (coordinates.length > 0) {
            const lines: any[] = []
            const labels: any[] = []
            const leftX = coordinates[0].x
            const rightX = coordinates[coordinates.length - 1].x
            if (coordinates.length > 1 && points[0].value !== undefined && points[1].value !== undefined) {
                const levels = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0]
                const coordDiff = coordinates[0].y - coordinates[1].y
                const valueDiff = points[0].value - points[1].value
                levels.forEach(l => {
                    const y = coordinates[1].y + coordDiff * l
                    const price = ((points[1].value + valueDiff * l) as number).toFixed(2)
                    lines.push({ coordinates: [{ x: leftX, y }, { x: rightX, y }] })
                    labels.push({ x: leftX, y, text: `${price} (${(l * 100).toFixed(1)}%)`, baseline: 'bottom' })
                })
                // Diagonal line
                lines.push({
                    coordinates: [
                        { x: lines[0].coordinates[0].x, y: lines[0].coordinates[0].y },
                        { x: lines[levels.length - 1].coordinates[1].x, y: lines[levels.length - 1].coordinates[1].y }
                    ]
                })
            }
            return [
                { type: 'line', attrs: lines },
                { type: 'text', ignoreEvent: true, attrs: labels }
            ]
        }
        return []
    }
}

const tradingPlan = {
    name: 'tradingPlan',
    totalStep: 5,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: false,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates }: OverlayCreateFiguresCallbackParams<unknown>): OverlayFigure | OverlayFigure[] => {
        const len = coordinates.length
        if (len >= 2) {
            if (len === 2) return [{ type: 'line', attrs: { coordinates } }]
            if (len >= 3) {
                const risk = {
                    type: 'polygon',
                    attrs: {
                        coordinates: [
                            coordinates[0], coordinates[1],
                            { x: coordinates[1].x, y: coordinates[2].y },
                            { x: coordinates[0].x, y: coordinates[2].y }
                        ]
                    },
                    styles: { style: 'fill', color: '#DE46464f' }
                }
                if (len === 3) return [risk]
                const reward = {
                    type: 'polygon',
                    attrs: {
                        coordinates: [
                            coordinates[0], coordinates[1],
                            { x: coordinates[1].x, y: coordinates[3].y },
                            { x: coordinates[0].x, y: coordinates[3].y }
                        ]
                    },
                    styles: { style: 'fill', color: '#03ca9b2f' }
                }
                return [risk, reward]
            }
        }
        return []
    },
    performEventMoveForDrawing: ({ currentStep, points, performPoint }: any): void => {
        switch (currentStep) {
            case 2: points[0].value = performPoint.value; break
            case 3: points[1].timestamp = performPoint.timestamp; points[1].dataIndex = performPoint.dataIndex; break
            case 4:
                points[1].timestamp = points[2].timestamp = performPoint.timestamp
                points[1].dataIndex = points[2].dataIndex = performPoint.dataIndex
                break
        }
    },
    performEventPressedMove: ({ points, performPointIndex, performPoint }: any): void => {
        switch (performPointIndex) {
            case 0: points[1].value = performPoint.value; break
            case 1:
                points[0].value = performPoint.value
                points[2].timestamp = points[3].timestamp = performPoint.timestamp
                points[2].dataIndex = points[3].dataIndex = performPoint.dataIndex
                break
            case 2:
                points[1].timestamp = points[3].timestamp = performPoint.timestamp
                points[1].dataIndex = points[3].dataIndex = performPoint.dataIndex
                break
            case 3:
                points[1].timestamp = points[2].timestamp = performPoint.timestamp
                points[1].dataIndex = points[2].dataIndex = performPoint.dataIndex
                break
        }
    }
}

const arcOverlay = {
    name: 'arc',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: { arc: { color: 'rgba(22, 119, 255)' } },
    createPointFigures: ({ coordinates }: OverlayCreateFiguresCallbackParams<unknown>): OverlayFigure | OverlayFigure[] => {
        if (coordinates.length > 1) {
            const cx = (coordinates[0].x + coordinates[1].x) / 2
            const cy = (coordinates[0].y + coordinates[1].y) / 2
            const r = Math.sqrt(
                Math.pow(coordinates[1].x - coordinates[0].x, 2) +
                Math.pow(coordinates[1].y - coordinates[0].y, 2)
            ) / 2
            return [{ type: 'arc', attrs: { x: cx, y: cy, r, startAngle: 0, endAngle: Math.PI }, styles: { style: 'solid' } }]
        }
        return []
    }
}

/** All custom overlay definitions to register */
export const proOverlays = [
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
    headAndShoulders,
    measure,
    crossLine,
    fibonacciDiagonal,
    tradingPlan,
    arcOverlay
]

/** Overlay names grouped by drawing bar category */
export const overlayGroups = {
    lines: ['arrow'],
    shapes: ['circle', 'rect', 'triangle', 'parallelogram', 'arc'],
    fibonacci: ['fibonacciSegment', 'fibonacciCircle', 'fibonacciSpiral', 'fibonacciSpeedResistanceFan', 'fibonacciExtension', 'fibonacciDiagonal'],
    gann: ['gannBox'],
    waves: ['threeWaves', 'fiveWaves', 'eightWaves', 'anyWaves'],
    patterns: ['abcd', 'xabcd', 'headAndShoulders'],
    measure: ['measure', 'crossLine', 'tradingPlan']
}
