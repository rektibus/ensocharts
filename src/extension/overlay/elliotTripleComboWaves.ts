import { type OverlayTemplate } from '../../component/Overlay'

const elliotTripleComboWaves: OverlayTemplate = {
    name: 'elliotTripleComboWaves',
    totalStep: 6,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates }) => {
        const labels = ['(0)', '(W)', '(X)', '(Y)', '(Z)']
        const texts = coordinates.map((c, i) => ({
            ...c, baseline: 'bottom', text: `(${labels[i]})`
        }))
        return [
            { type: 'line', attrs: { coordinates } },
            { type: 'line', attrs: [{ coordinates: [] }, { coordinates: [] }], styles: { style: 'dashed' } },
            { type: 'text', ignoreEvent: true, attrs: texts }
        ]
    }
}

export default elliotTripleComboWaves
