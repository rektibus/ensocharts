import { type OverlayTemplate } from '../../component/Overlay'

function distance(p1: { x: number, y: number }, p2: { x: number, y: number }): number {
    const dx = Math.abs(p1.x - p2.x)
    const dy = Math.abs(p1.y - p2.y)
    return Math.sqrt(dx * dx + dy * dy)
}

const fibonacciCircle: OverlayTemplate = {
    name: 'fibonacciCircle',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates }) => {
        if (coordinates.length > 1) {
            const radius = distance(coordinates[0], coordinates[1])
            const percents = [0.236, 0.382, 0.5, 0.618, 0.786, 1]
            const circles: Array<{ x: number, y: number, r: number }> = []
            const texts: Array<{ x: number, y: number, text: string }> = []
            percents.forEach(p => {
                const r = radius * p
                circles.push({ ...coordinates[0], r })
                texts.push({
                    x: coordinates[0].x,
                    y: coordinates[0].y + r + 6,
                    text: `${(p * 100).toFixed(1)}%`
                })
            })
            return [
                { type: 'circle', attrs: circles, styles: { style: 'stroke' } },
                { type: 'text', ignoreEvent: true, attrs: texts }
            ]
        }
        return []
    }
}

export default fibonacciCircle
