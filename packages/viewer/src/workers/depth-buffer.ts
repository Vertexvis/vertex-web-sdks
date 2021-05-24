import { Point } from '@vertexvis/geometry';
import { ImageAttributes } from '../types/frame';

const MAX_DEPTH_VALUE = 65535;

export interface DepthBuffer {
  width: number;
  height: number;
  data: Uint16Array;
  imageAttr: ImageAttributes;
}

export function getDepthInFrame(
  buffer: DepthBuffer,
  point: Point.Point
): number {
  const { imageRect, scaleFactor } = buffer.imageAttr;
  const offset = Point.subtract(point, imageRect);
  const scaled = Point.scale(offset, 1 / scaleFactor, 1 / scaleFactor);
  return getDepth(buffer, scaled);
}

function getDepth(buffer: DepthBuffer, point: Point.Point): number {
  if (
    point.x >= 1 &&
    point.y >= 1 &&
    point.x <= buffer.width &&
    point.y <= buffer.height
  ) {
    const index =
      Math.floor(point.x) - 1 + (Math.floor(point.y) - 1) * buffer.width;
    const depth = buffer.data[index];
    return (depth || MAX_DEPTH_VALUE) / MAX_DEPTH_VALUE;
  } else {
    return 1;
  }
}
