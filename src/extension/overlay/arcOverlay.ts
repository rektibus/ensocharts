import { type OverlayTemplate } from '../../component/Overlay'

const arcOverlay: OverlayTemplate = {
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
            const cx = (coordinates[0].x + coordinates[1].x) / 2
            const cy = (coordinates[0].y + coordinates[1].y) / 2
            const r = Math.sqrt(
                Math.pow(coordinates[1].x - coordinates[0].x, 2) +
                Math.pow(coordinates[1].y - coordinates[0].y, 2)
            ) / 2
            return [{
                type: 'arc',
                attrs: { x: cx, y: cy, r, startAngle: 0, endAngle: Math.PI },
                styles: { style: 'solid' }
            }]
        }
        return []
    }
}

export default arcOverlay
