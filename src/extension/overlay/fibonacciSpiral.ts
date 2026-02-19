import { type OverlayTemplate } from '../../component/Overlay'
import { getLinearSlopeIntercept, getLinearYFromCoordinates } from '../figure/line'

function distance(p1: { x: number, y: number }, p2: { x: number, y: number }): number {
    const dx = Math.abs(p1.x - p2.x)
    const dy = Math.abs(p1.y - p2.y)
    return Math.sqrt(dx * dx + dy * dy)
}

function rotatePoint(point: { x: number, y: number }, center: { x: number, y: number }, angle: number): { x: number, y: number } {
    const x = (point.x - center.x) * Math.cos(angle) - (point.y - center.y) * Math.sin(angle) + center.x
    const y = (point.x - center.x) * Math.sin(angle) + (point.y - center.y) * Math.cos(angle) + center.y
    return { x, y }
}

function extendLine(coords: Array<{ x: number, y: number }>, bounding: { width: number, height: number }): { coordinates: Array<{ x: number, y: number }> } | [] {
    if (coords.length > 1) {
        let end: { x: number, y: number }
        if (coords[0].x === coords[1].x && coords[0].y !== coords[1].y) {
            end = coords[0].y < coords[1].y
                ? { x: coords[0].x, y: bounding.height }
                : { x: coords[0].x, y: 0 }
        } else if (coords[0].x > coords[1].x) {
            end = { x: 0, y: getLinearYFromCoordinates(coords[0], coords[1], { x: 0, y: coords[0].y }) }
        } else {
            end = { x: bounding.width, y: getLinearYFromCoordinates(coords[0], coords[1], { x: bounding.width, y: coords[0].y }) }
        }
        return { coordinates: [coords[0], end] }
    }
    return []
}

const fibonacciSpiral: OverlayTemplate = {
    name: 'fibonacciSpiral',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates, bounding }) => {
        if (coordinates.length > 1) {
            const baseRadius = distance(coordinates[0], coordinates[1]) / Math.sqrt(24)
            const direction = coordinates[1].x > coordinates[0].x ? 0 : 1
            const slopeIntercept = getLinearSlopeIntercept(coordinates[0], coordinates[1])
            let angle: number
            if (slopeIntercept) {
                angle = Math.atan(slopeIntercept[0]) + Math.PI * direction
            } else {
                angle = coordinates[1].y > coordinates[0].y ? Math.PI / 2 : Math.PI / 2 * 3
            }

            const p1 = rotatePoint({ x: coordinates[0].x - baseRadius, y: coordinates[0].y }, coordinates[0], angle)
            const p2 = rotatePoint({ x: coordinates[0].x - baseRadius, y: coordinates[0].y - baseRadius }, coordinates[0], angle)

            const arcs: Array<{ x: number, y: number, r: number, startAngle: number, endAngle: number }> = [
                { ...p1, r: baseRadius, startAngle: angle, endAngle: angle + Math.PI / 2 },
                { ...p2, r: baseRadius * 2, startAngle: angle + Math.PI / 2, endAngle: angle + Math.PI }
            ]

            let cx = coordinates[0].x - baseRadius
            let cy = coordinates[0].y - baseRadius

            for (let i = 2; i < 9; i++) {
                const r = arcs[i - 2].r + arcs[i - 1].r
                let startAngle = 0
                switch (i % 4) {
                    case 0: startAngle = angle; cx -= arcs[i - 2].r; break
                    case 1: startAngle = angle + Math.PI / 2; cy -= arcs[i - 2].r; break
                    case 2: startAngle = angle + Math.PI; cx += arcs[i - 2].r; break
                    case 3: startAngle = angle + Math.PI / 2 * 3; cy += arcs[i - 2].r; break
                }
                const center = rotatePoint({ x: cx, y: cy }, coordinates[0], angle)
                arcs.push({ ...center, r, startAngle, endAngle: startAngle + Math.PI / 2 })
            }

            return [
                { type: 'arc', attrs: arcs },
                { type: 'line', attrs: extendLine(coordinates, bounding) }
            ]
        }
        return []
    }
}

export default fibonacciSpiral
