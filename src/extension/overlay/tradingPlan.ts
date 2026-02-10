import { type OverlayTemplate } from '../../component/Overlay'

const tradingPlan: OverlayTemplate = {
    name: 'tradingPlan',
    totalStep: 5,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: false,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates }) => {
        const len = coordinates.length
        if (len >= 2) {
            if (len === 2) {
                return [{ type: 'line', attrs: { coordinates } }]
            }
            if (len >= 3) {
                const stopLoss = {
                    type: 'polygon',
                    attrs: {
                        coordinates: [
                            coordinates[0], coordinates[1],
                            { x: coordinates[1].x, y: coordinates[2].y },
                            { x: coordinates[0].x, y: coordinates[2].y }
                        ]
                    },
                    styles: { style: 'fill', color: '#DE46464f' }
                }
                if (len === 3) return [stopLoss]
                const takeProfit = {
                    type: 'polygon',
                    attrs: {
                        coordinates: [
                            coordinates[0], coordinates[1],
                            { x: coordinates[1].x, y: coordinates[3].y },
                            { x: coordinates[0].x, y: coordinates[3].y }
                        ]
                    },
                    styles: { style: 'fill', color: '#03ca9b2f' }
                }
                return [stopLoss, takeProfit]
            }
        }
        return []
    },
    performEventMoveForDrawing: ({ currentStep, points, performPoint }) => {
        switch (currentStep) {
            case 2: points[0].value = performPoint.value; break
            case 3:
                points[1].timestamp = performPoint.timestamp
                points[1].dataIndex = performPoint.dataIndex
                break
            case 4:
                points[1].timestamp = points[2].timestamp = performPoint.timestamp
                points[1].dataIndex = points[2].dataIndex = performPoint.dataIndex
                break
        }
    },
    performEventPressedMove: ({ points, performPointIndex, performPoint }) => {
        switch (performPointIndex) {
            case 0: points[1].value = performPoint.value; break
            case 1:
                points[0].value = performPoint.value
                points[2].timestamp = points[3].timestamp = performPoint.timestamp
                points[2].dataIndex = points[3].dataIndex = performPoint.dataIndex
                break
            case 2:
                points[1].timestamp = points[3].timestamp = performPoint.timestamp
                points[1].dataIndex = points[3].dataIndex = performPoint.dataIndex
                break
            case 3:
                points[1].timestamp = points[2].timestamp = performPoint.timestamp
                points[1].dataIndex = points[2].dataIndex = performPoint.dataIndex
                break
        }
    }
}

export default tradingPlan
