import { getDepthInFrame } from '../depth-buffer';

describe(getDepthInFrame, () => {
  const bytes = new Uint16Array([
    0,
    5000,
    10000,
    15000,
    20000,
    25000,
    30000,
    35000,
    40000,
  ]);

  it('returns correct position if unscaled', () => {
    const buffer = {
      width: 3,
      height: 3,
      data: bytes,
      imageAttr: {
        frameDimensions: { width: 3, height: 3 },
        imageRect: { x: 0, y: 0, width: 3, height: 3 },
        scaleFactor: 1,
      },
    };

    const depth = getDepthInFrame(buffer, { x: 3, y: 3 });
    expect(depth).toBeCloseTo(0.61);
  });

  it('returns correct position if sub-image', () => {
    const buffer = {
      width: 3,
      height: 3,
      data: bytes,
      imageAttr: {
        frameDimensions: { width: 5, height: 5 },
        imageRect: { x: 1, y: 1, width: 3, height: 3 },
        scaleFactor: 1,
      },
    };

    const depth = getDepthInFrame(buffer, { x: 4, y: 4 });
    expect(depth).toBeCloseTo(0.61);
  });

  it('returns correct position if sub-image and scaled', () => {
    const buffer = {
      width: 3,
      height: 3,
      data: bytes,
      imageAttr: {
        frameDimensions: { width: 10, height: 10 },
        imageRect: { x: 2, y: 2, width: 6, height: 6 },
        scaleFactor: 2,
      },
    };

    const depth = getDepthInFrame(buffer, { x: 8, y: 8 });
    expect(depth).toBeCloseTo(0.61);
  });
});
