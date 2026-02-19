import { type OverlayTemplate } from '../../component/Overlay'

const fibonacciExtension: OverlayTemplate = {
    name: 'fibonacciExtension',
    totalStep: 4,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates, overlay }) => {
        const lines: Array<{ coordinates: Array<{ x: number, y: number }> }> = []
        const texts: Array<{ x: number, y: number, text: string, baseline: string }> = []
        if (coordinates.length > 2) {
            const points = overlay.points
            const valueDif = (points[1].value ?? 0) - (points[0].value ?? 0)
            const yDif = coordinates[1].y - coordinates[0].y
            const percents = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1]
            const leftX = coordinates[2].x > coordinates[1].x ? coordinates[1].x : coordinates[2].x
            percents.forEach(p => {
                const y = coordinates[2].y + yDif * p
                const value = ((points[2].value ?? 0) + valueDif * p).toFixed(2)
                lines.push({
                    coordinates: [{ x: coordinates[1].x, y }, { x: coordinates[2].x, y }]
                })
                texts.push({
                    x: leftX, y,
                    text: `${value} (${(p * 100).toFixed(1)}%)`,
                    baseline: 'bottom'
                })
            })
        }
        return [
            { type: 'line', attrs: { coordinates }, styles: { style: 'dashed' } },
            { type: 'line', attrs: lines },
            { type: 'text', ignoreEvent: true, attrs: texts }
        ]
    }
}

export default fibonacciExtension
