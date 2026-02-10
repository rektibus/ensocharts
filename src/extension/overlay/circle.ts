import { type OverlayTemplate } from '../../component/Overlay'

function distance(p1: { x: number, y: number }, p2: { x: number, y: number }): number {
    const dx = Math.abs(p1.x - p2.x)
    const dy = Math.abs(p1.y - p2.y)
    return Math.sqrt(dx * dx + dy * dy)
}

const circle: OverlayTemplate = {
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
            const r = distance(coordinates[0], coordinates[1])
            return {
                type: 'circle',
                attrs: { ...coordinates[0], r },
                styles: { style: 'stroke_fill' }
            }
        }
        return []
    }
}

export default circle
