import { DepthBuffer } from './depth-buffer';
import { decode } from 'fast-png';

export type DecodedDepthBuffer = Pick<DepthBuffer, 'width' | 'height' | 'data'>;

export async function decodeDepth(
  pngBytes: ArrayBufferLike
): Promise<DecodedDepthBuffer> {
  const { width, height, data } = decode(pngBytes);
  return {
    width: width,
    height: height,
    data: data as Uint16Array,
  };
}
