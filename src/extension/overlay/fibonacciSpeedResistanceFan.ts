import { type OverlayTemplate } from '../../component/Overlay'
import { getLinearYFromCoordinates } from '../figure/line'

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

const fibonacciSpeedResistanceFan: OverlayTemplate = {
    name: 'fibonacciSpeedResistanceFan',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates, bounding }) => {
        const gridLines: Array<{ coordinates: Array<{ x: number, y: number }> }> = []
        let fanLines: Array<{ coordinates: Array<{ x: number, y: number }> }> = []
        const texts: Array<{ x: number, y: number, text: string }> = []

        if (coordinates.length > 1) {
            const [p0, p1] = coordinates
            const textOffsetX = p1.x > p0.x ? -38 : 4
            const textOffsetY = p1.y > p0.y ? -2 : 20
            const dx = p1.x - p0.x
            const dy = p1.y - p0.y
            const percents = [1, 0.75, 0.618, 0.5, 0.382, 0.25, 0]

            percents.forEach(p => {
                const x = p1.x - dx * p
                const y = p1.y - dy * p
                gridLines.push({ coordinates: [{ x, y: p0.y }, { x, y: p1.y }] })
                gridLines.push({ coordinates: [{ x: p0.x, y }, { x: p1.x, y }] })

                fanLines = fanLines.concat(
                    extendLine([p0, { x, y: p1.y }], bounding) as any
                )
                fanLines = fanLines.concat(
                    extendLine([p0, { x: p1.x, y }], bounding) as any
                )

                texts.unshift({ x: p0.x + textOffsetX, y: y + 10, text: `${p.toFixed(3)}` })
                texts.unshift({ x: x - 18, y: p0.y + textOffsetY, text: `${p.toFixed(3)}` })
            })
        }

        return [
            { type: 'line', attrs: gridLines },
            { type: 'line', attrs: fanLines },
            { type: 'text', ignoreEvent: true, attrs: texts }
        ]
    }
}

export default fibonacciSpeedResistanceFan
