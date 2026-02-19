import { type OverlayTemplate } from '../../component/Overlay'
import { getLinearSlopeIntercept } from '../figure/line'

function rotatePoint(point: { x: number, y: number }, center: { x: number, y: number }, angle: number): { x: number, y: number } {
    const x = (point.x - center.x) * Math.cos(angle) - (point.y - center.y) * Math.sin(angle) + center.x
    const y = (point.x - center.x) * Math.sin(angle) + (point.y - center.y) * Math.cos(angle) + center.y
    return { x, y }
}

const arrow: OverlayTemplate = {
    name: 'arrow',
    totalStep: 3,
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    createPointFigures: ({ coordinates }) => {
        if (coordinates.length > 1) {
            const direction = coordinates[1].x > coordinates[0].x ? 0 : 1
            const slopeIntercept = getLinearSlopeIntercept(coordinates[0], coordinates[1])
            let angle: number
            if (slopeIntercept) {
                angle = Math.atan(slopeIntercept[0]) + Math.PI * direction
            } else {
                angle = coordinates[1].y > coordinates[0].y ? Math.PI / 2 : Math.PI / 2 * 3
            }
            const arrowLeft = rotatePoint(
                { x: coordinates[1].x - 8, y: coordinates[1].y + 4 },
                coordinates[1],
                angle
            )
            const arrowRight = rotatePoint(
                { x: coordinates[1].x - 8, y: coordinates[1].y - 4 },
                coordinates[1],
                angle
            )
            return [
                {
                    type: 'line',
                    attrs: { coordinates }
                },
                {
                    type: 'line',
                    ignoreEvent: true,
                    attrs: {
                        coordinates: [arrowLeft, coordinates[1], arrowRight]
                    }
                }
            ]
        }
        return []
    }
}

export default arrow
