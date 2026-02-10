import { type OverlayTemplate } from '../../component/Overlay'

const flatTopBottom: OverlayTemplate = {
    name: 'faltTopBottom',
    totalStep: 4,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: false,
    styles: {
        polygon: { color: '#FCB9002b' },
        line: { size: 2, color: '#FCB900' }
    },
    createPointFigures: ({ coordinates }) => {
        let lines: Array<{ coordinates: Array<{ x: number, y: number }> }> = []
        const polygons: Array<{ coordinates: Array<{ x: number, y: number }> }> = []
        const topLines: Array<{ coordinates: Array<{ x: number, y: number }> }> = []

        if (coordinates.length > 2) {
            lines = [{ coordinates: [{ x: coordinates[0].x, y: coordinates[2].y }, { x: coordinates[1].x, y: coordinates[2].y }] }]
            polygons.push({
                coordinates: [
                    coordinates[0], coordinates[1],
                    { x: coordinates[1].x, y: coordinates[2].y },
                    { x: coordinates[0].x, y: coordinates[2].y }
                ]
            })
            topLines.push({ coordinates: [coordinates[0], coordinates[1]] })
        } else {
            lines = [{ coordinates }]
        }

        return [
            { type: 'line', attrs: lines, size: 2 },
            { type: 'polygon', ignoreEvent: true, attrs: polygons },
            { type: 'line', attrs: topLines, size: 2 }
        ]
    },
    performEventMoveForDrawing: ({ currentStep, points, performPoint }) => {
        if (currentStep === 3) {
            points[1].timestamp = performPoint.timestamp
            points[1].dataIndex = performPoint.dataIndex
        }
    },
    performEventPressedMove: ({ points, performPointIndex, performPoint }) => {
        switch (performPointIndex) {
            case 1:
                points[2].timestamp = performPoint.timestamp
                points[2].dataIndex = performPoint.dataIndex
                break
            case 2:
                points[1].timestamp = performPoint.timestamp
                points[1].dataIndex = performPoint.dataIndex
                break
            case 3:
                points[1].timestamp = performPoint.timestamp
                break
        }
    }
}

export default flatTopBottom
