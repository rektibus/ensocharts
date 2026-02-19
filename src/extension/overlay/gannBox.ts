import { type OverlayTemplate } from '../../component/Overlay'

const gannBox: OverlayTemplate = {
    name: 'gannBox',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: {
        polygon: { color: 'rgba(22, 119, 255, 0.15)' }
    },
    createPointFigures: ({ coordinates }) => {
        if (coordinates.length > 1) {
            const [p0, p1] = coordinates
            const yQuarter = (p1.y - p0.y) / 4
            const xDif = p1.x - p0.x

            // Dashed internal lines
            const dashed = [
                { coordinates: [p0, { x: p1.x, y: p1.y - yQuarter }] },
                { coordinates: [p0, { x: p1.x, y: p1.y - yQuarter * 2 }] },
                { coordinates: [{ x: p0.x, y: p1.y }, { x: p1.x, y: p0.y + yQuarter }] },
                { coordinates: [{ x: p0.x, y: p1.y }, { x: p1.x, y: p0.y + yQuarter * 2 }] },
                { coordinates: [{ ...p0 }, { x: p0.x + xDif * 0.236, y: p1.y }] },
                { coordinates: [{ ...p0 }, { x: p0.x + xDif * 0.5, y: p1.y }] },
                { coordinates: [{ x: p0.x, y: p1.y }, { x: p0.x + xDif * 0.236, y: p0.y }] },
                { coordinates: [{ x: p0.x, y: p1.y }, { x: p0.x + xDif * 0.5, y: p0.y }] }
            ]

            // Diagonals
            const diagonals = [
                { coordinates: [p0, p1] },
                { coordinates: [{ x: p0.x, y: p1.y }, { x: p1.x, y: p0.y }] }
            ]

            return [
                {
                    type: 'line',
                    attrs: [
                        { coordinates: [p0, { x: p1.x, y: p0.y }] },
                        { coordinates: [{ x: p1.x, y: p0.y }, p1] },
                        { coordinates: [p1, { x: p0.x, y: p1.y }] },
                        { coordinates: [{ x: p0.x, y: p1.y }, p0] }
                    ]
                },
                {
                    type: 'polygon',
                    ignoreEvent: true,
                    attrs: {
                        coordinates: [p0, { x: p1.x, y: p0.y }, p1, { x: p0.x, y: p1.y }]
                    },
                    styles: { style: 'fill' }
                },
                { type: 'line', attrs: dashed, styles: { style: 'dashed' } },
                { type: 'line', attrs: diagonals }
            ]
        }
        return []
    }
}

export default gannBox
