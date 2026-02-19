import { type OverlayTemplate } from '../../component/Overlay'
import { calcTextWidth } from '../../common/utils/canvas'

const measure: OverlayTemplate = {
    name: 'measure',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    styles: {
        backgroundColor: 'rgba(22, 119, 255, 0.25)',
        tipBackgroundColor: '#1677FF',
        lineColor: '#1677FF'
    },
    createPointFigures: ({ coordinates, overlay, bounding }) => {
        if (coordinates.length > 1) {
            const [p0, p1] = coordinates
            const val1 = overlay.points[1]?.value
            const val0 = overlay.points[0]?.value
            let pctChange = 0
            let priceDiff = 0
            if (val0 !== undefined && val1 !== undefined) {
                pctChange = (val1 - val0) / val0 * 100
                priceDiff = val1 - val0
            }

            const isRight = p0.x < p1.x
            const isDown = p0.y < p1.y
            const center = { x: Math.round((p0.x + p1.x) / 2), y: Math.round((p0.y + p1.y) / 2) }
            const bgColor = overlay.styles?.backgroundColor ?? 'rgba(22, 119, 255, 0.25)'
            const tipColor = overlay.styles?.tipBackgroundColor ?? '#1677FF'
            const lineColor = overlay.styles?.lineColor ?? '#1677FF'

            const label = `${priceDiff.toFixed(2)} (${pctChange.toFixed(2)}%)`
            const figures: any[] = [
                // Background rect
                {
                    type: 'polygon',
                    attrs: {
                        coordinates: [p0, { x: p1.x, y: p0.y }, p1, { x: p0.x, y: p1.y }]
                    },
                    styles: { color: bgColor }
                },
                // Horizontal midline
                { type: 'line', attrs: { coordinates: [{ x: p0.x, y: center.y }, { x: p1.x, y: center.y }] }, styles: { color: lineColor } },
                // Vertical midline
                { type: 'line', attrs: { coordinates: [{ x: center.x, y: p0.y }, { x: center.x, y: p1.y }] }, styles: { color: lineColor } }
            ]

            // Horizontal arrow
            if (isRight) {
                figures.push({ type: 'line', attrs: { coordinates: [{ x: p1.x - 6, y: center.y - 4 }, { x: p1.x, y: center.y }, { x: p1.x - 6, y: center.y + 4 }] } })
            } else {
                figures.push({ type: 'line', attrs: { coordinates: [{ x: p1.x + 6, y: center.y - 4 }, { x: p1.x, y: center.y }, { x: p1.x + 6, y: center.y + 4 }] } })
            }

            // Vertical arrow
            if (isDown) {
                figures.push({ type: 'line', attrs: { coordinates: [{ x: center.x - 4, y: p1.y - 6 }, { x: center.x, y: p1.y }, { x: center.x + 4, y: p1.y - 6 }] }, styles: { color: lineColor } })
            } else {
                figures.push({ type: 'line', attrs: { coordinates: [{ x: center.x - 4, y: p1.y + 6 }, { x: center.x, y: p1.y }, { x: center.x + 4, y: p1.y + 6 }] }, styles: { color: lineColor } })
            }

            // Tooltip
            const tipHeight = 1 * 12 + 8 * 2
            let tipWidth = calcTextWidth(label) + 12 * 2
            let tipY: number
            if (isDown) {
                tipY = p1.y + 8 + tipHeight > bounding.height ? bounding.height - tipHeight : p1.y + 8
            } else {
                tipY = p1.y - 8 - tipHeight < 0 ? 0 : p1.y - 8 - tipHeight
            }

            figures.push({
                type: 'rect',
                attrs: { x: center.x - tipWidth / 2, y: tipY, width: tipWidth, height: tipHeight },
                styles: { borderRadius: 4, color: tipColor }
            })
            figures.push({
                type: 'text',
                attrs: { x: center.x, y: tipY + 8, text: label, align: 'center' },
                styles: { paddingLeft: 0, paddingTop: 0, paddingRight: 0, paddingBottom: 0, backgroundColor: 'none', family: 'Space Grotesk, sans-serif' }
            })

            return figures
        }
        return []
    }
}

export default measure
