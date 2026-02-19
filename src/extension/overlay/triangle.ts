import { type OverlayTemplate } from '../../component/Overlay'

const triangle: OverlayTemplate = {
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
}

export default triangle
