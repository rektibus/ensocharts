import { type OverlayTemplate } from '../../component/Overlay'

const xabcd: OverlayTemplate = {
    name: 'xabcd',
    totalStep: 6,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: {
        polygon: { color: 'rgba(22, 119, 255, 0.15)' }
    },
    createPointFigures: ({ coordinates }) => {
        const dashed: Array<{ coordinates: Array<{ x: number, y: number }> }> = []
        const polygons: Array<{ coordinates: Array<{ x: number, y: number }> }> = []
        const labels = ['X', 'A', 'B', 'C', 'D']
        const texts = coordinates.map((c, i) => ({
            ...c,
            baseline: 'bottom',
            text: `(${labels[i]})`
        }))

        if (coordinates.length > 2) {
            dashed.push({ coordinates: [coordinates[0], coordinates[2]] })
            polygons.push({ coordinates: [coordinates[0], coordinates[1], coordinates[2]] })
            if (coordinates.length > 3) {
                dashed.push({ coordinates: [coordinates[1], coordinates[3]] })
                if (coordinates.length > 4) {
                    dashed.push({ coordinates: [coordinates[2], coordinates[4]] })
                    polygons.push({ coordinates: [coordinates[2], coordinates[3], coordinates[4]] })
                }
            }
        }

        return [
            { type: 'line', attrs: { coordinates } },
            { type: 'line', attrs: dashed, styles: { style: 'dashed' } },
            { type: 'polygon', ignoreEvent: true, attrs: polygons },
            { type: 'text', ignoreEvent: true, attrs: texts }
        ]
    }
}

export default xabcd
