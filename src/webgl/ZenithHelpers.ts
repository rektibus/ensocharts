/**
 * ZenithHelpers.ts — Ported TradingView dimension helpers for pixel-perfect rendering.
 *
 * These functions handle the tricky problem of rendering columns (histogram bars)
 * at pixel-perfect widths that don't alias or overlap. The core insight is:
 *
 *   1. Compute desired column width from bar spacing × DPR
 *   2. Per-column: snap center to device pixel, expand left/right by half-width
 *   3. Multi-pass correction: ensure consistent gaps between adjacent columns
 *   4. Narrow-column pass: trim wider columns to match the narrowest
 *
 * Source: TradingView's lightweight-charts plugin-examples/helpers/dimensions/
 */

// ─── Position Helpers ───

export interface BitmapPositionLength {
    position: number;
    length: number;
}

/**
 * Snap a center coordinate to a device-pixel-aligned line/bar.
 * Returns { position, length } in device pixels.
 */
export function positionsLine(
    positionMedia: number,
    pixelRatio: number,
    desiredWidthMedia: number = 1,
    widthIsBitmap?: boolean
): BitmapPositionLength {
    const scaledPosition = Math.round(pixelRatio * positionMedia);
    const lineBitmapWidth = widthIsBitmap
        ? desiredWidthMedia
        : Math.round(desiredWidthMedia * pixelRatio);
    const offset = Math.floor(lineBitmapWidth * 0.5);
    const position = scaledPosition - offset;
    return { position, length: lineBitmapWidth };
}

/**
 * Snap two coordinates to device-pixel-aligned box edges.
 * Returns { position, length } in device pixels.
 */
export function positionsBox(
    position1Media: number,
    position2Media: number,
    pixelRatio: number
): BitmapPositionLength {
    const scaledPosition1 = Math.round(pixelRatio * position1Media);
    const scaledPosition2 = Math.round(pixelRatio * position2Media);
    return {
        position: Math.min(scaledPosition1, scaledPosition2),
        length: Math.abs(scaledPosition2 - scaledPosition1) + 1,
    };
}

// ─── Column Position Helpers ───

const ALIGN_TO_MINIMAL_WIDTH_LIMIT = 4;
const SHOW_SPACING_MINIMAL_BAR_WIDTH = 1;

export interface ColumnPosition {
    left: number;
    right: number;
    shiftLeft: boolean;
}

function columnSpacing(barSpacingMedia: number, horizontalPixelRatio: number): number {
    return Math.ceil(barSpacingMedia * horizontalPixelRatio) <= SHOW_SPACING_MINIMAL_BAR_WIDTH
        ? 0
        : Math.max(1, Math.floor(horizontalPixelRatio));
}

function desiredColumnWidth(
    barSpacingMedia: number,
    horizontalPixelRatio: number,
    spacing?: number
): number {
    return (
        Math.round(barSpacingMedia * horizontalPixelRatio) -
        (spacing ?? columnSpacing(barSpacingMedia, horizontalPixelRatio))
    );
}

interface ColumnCommon {
    spacing: number;
    shiftLeft: boolean;
    columnHalfWidthBitmap: number;
    horizontalPixelRatio: number;
}

function columnCommon(barSpacingMedia: number, horizontalPixelRatio: number): ColumnCommon {
    const spacing = columnSpacing(barSpacingMedia, horizontalPixelRatio);
    const columnWidthBitmap = desiredColumnWidth(barSpacingMedia, horizontalPixelRatio, spacing);
    const shiftLeft = columnWidthBitmap % 2 === 0;
    const columnHalfWidthBitmap = (columnWidthBitmap - (shiftLeft ? 0 : 1)) / 2;
    return { spacing, shiftLeft, columnHalfWidthBitmap, horizontalPixelRatio };
}

function calculateColumnPosition(
    xMedia: number,
    columnData: ColumnCommon,
    previousPosition: ColumnPosition | undefined
): ColumnPosition {
    const xBitmapUnRounded = xMedia * columnData.horizontalPixelRatio;
    const xBitmap = Math.round(xBitmapUnRounded);
    const xPositions: ColumnPosition = {
        left: xBitmap - columnData.columnHalfWidthBitmap,
        right: xBitmap + columnData.columnHalfWidthBitmap - (columnData.shiftLeft ? 1 : 0),
        shiftLeft: xBitmap > xBitmapUnRounded,
    };
    const expectedAlignmentShift = columnData.spacing + 1;
    if (previousPosition) {
        if (xPositions.left - previousPosition.right !== expectedAlignmentShift) {
            if (previousPosition.shiftLeft) {
                previousPosition.right = xPositions.left - expectedAlignmentShift;
            } else {
                xPositions.left = previousPosition.right + expectedAlignmentShift;
            }
        }
    }
    return xPositions;
}

/**
 * Multi-pass column position calculation that ensures all columns have
 * consistent widths and gaps. This is the key to pixel-perfect histograms.
 *
 * @param xMediaPositions - center X of each bar in CSS pixels
 * @param barSpacingMedia - distance between bar centers in CSS pixels
 * @param horizontalPixelRatio - device pixel ratio
 * @returns Device-pixel-aligned column positions (left, right, shiftLeft)
 */
export function calculateColumnPositions(
    xMediaPositions: number[],
    barSpacingMedia: number,
    horizontalPixelRatio: number
): ColumnPosition[] {
    const common = columnCommon(barSpacingMedia, horizontalPixelRatio);
    const positions = new Array<ColumnPosition>(xMediaPositions.length);
    let previous: ColumnPosition | undefined = undefined;
    for (let i = 0; i < xMediaPositions.length; i++) {
        positions[i] = calculateColumnPosition(xMediaPositions[i], common, previous);
        previous = positions[i];
    }
    const initialMinWidth = Math.ceil(barSpacingMedia * horizontalPixelRatio);
    const minColumnWidth = positions.reduce((smallest: number, position: ColumnPosition) => {
        if (position.right < position.left) {
            position.right = position.left;
        }
        const width = position.right - position.left + 1;
        return Math.min(smallest, width);
    }, initialMinWidth);
    if (common.spacing > 0 && minColumnWidth < ALIGN_TO_MINIMAL_WIDTH_LIMIT) {
        return positions.map((position: ColumnPosition) => {
            const width = position.right - position.left + 1;
            if (width <= minColumnWidth) return position;
            if (position.shiftLeft) {
                position.right -= 1;
            } else {
                position.left += 1;
            }
            return position;
        });
    }
    return positions;
}
