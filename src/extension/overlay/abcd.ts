import { type OverlayTemplate } from '../../component/Overlay'

const abcd: OverlayTemplate = {
    name: 'abcd',
    totalStep: 5,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates }) => {
        const labels = ['A', 'B', 'C', 'D']
        const texts = coordinates.map((c, i) => ({
            ...c,
            baseline: 'bottom',
            text: `(${labels[i]})`
        }))

        let acLine: Array<{ x: number, y: number }> = []
        let bdLine: Array<{ x: number, y: number }> = []
        if (coordinates.length > 2) {
            acLine = [coordinates[0], coordinates[2]]
            if (coordinates.length > 3) {
                bdLine = [coordinates[1], coordinates[3]]
            }
        }

        return [
            { type: 'line', attrs: { coordinates } },
            {
                type: 'line',
                attrs: [{ coordinates: acLine }, { coordinates: bdLine }],
                styles: { style: 'dashed' }
            },
            { type: 'text', ignoreEvent: true, attrs: texts }
        ]
    }
}

export default abcd
