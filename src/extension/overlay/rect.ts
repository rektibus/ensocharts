import { type OverlayTemplate } from '../../component/Overlay'

const rect: OverlayTemplate = {
    name: 'rect',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: {
        polygon: { color: 'rgba(22, 119, 255, 0.15)' }
    },
    createPointFigures: ({ coordinates }) =>
        coordinates.length > 1
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
}

export default rect
