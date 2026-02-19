import { type OverlayTemplate } from '../../component/Overlay'

const fibonacciSegment: OverlayTemplate = {
    name: 'fibonacciSegment',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates, overlay }) => {
        const lines: Array<{ coordinates: Array<{ x: number, y: number }> }> = []
        const texts: Array<{ x: number, y: number, text: string, baseline: string }> = []
        if (coordinates.length > 1) {
            const leftX = coordinates[1].x > coordinates[0].x ? coordinates[0].x : coordinates[1].x
            const percents = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0]
            const yDif = coordinates[0].y - coordinates[1].y
            const points = overlay.points
            const valueDif = (points[0].value ?? 0) - (points[1].value ?? 0)
            percents.forEach(p => {
                const y = coordinates[1].y + yDif * p
                const value = ((points[1].value ?? 0) + valueDif * p).toFixed(2)
                lines.push({
                    coordinates: [{ x: coordinates[0].x, y }, { x: coordinates[1].x, y }]
                })
                texts.push({
                    x: leftX, y,
                    text: `${value} (${(p * 100).toFixed(1)}%)`,
                    baseline: 'bottom'
                })
            })
        }
        return [
            { type: 'line', attrs: lines },
            { type: 'text', ignoreEvent: true, attrs: texts }
        ]
    }
}

export default fibonacciSegment
