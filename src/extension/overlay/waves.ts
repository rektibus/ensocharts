import { type OverlayTemplate } from '../../component/Overlay'

function createWaveOverlay(name: string, totalStep: number): OverlayTemplate {
    return {
        name,
        totalStep,
        needDefaultPointFigure: true,
        needDefaultXAxisFigure: true,
        needDefaultYAxisFigure: true,
        createPointFigures: ({ coordinates }) => {
            const texts = coordinates.map((c, i) => ({
                ...c,
                text: `(${i})`,
                baseline: 'bottom'
            }))
            return [
                { type: 'line', attrs: { coordinates } },
                { type: 'text', ignoreEvent: true, attrs: texts }
            ]
        }
    }
}

export const threeWaves = createWaveOverlay('threeWaves', 5)
export const fiveWaves = createWaveOverlay('fiveWaves', 7)
export const eightWaves = createWaveOverlay('eightWaves', 10)
export const anyWaves = createWaveOverlay('anyWaves', Number.MAX_SAFE_INTEGER)
