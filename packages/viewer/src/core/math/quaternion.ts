import type { Matrix4 } from './matrix4';
import { Vector3 } from './vector3';

export class Quaternion {
  public constructor(
    public readonly x: number = 0,
    public readonly y: number = 0,
    public readonly z: number = 0,
    public readonly w: number = 1
  ) {}

  public static fromMatrixRotation(matrix: Matrix4): Quaternion {
    const scale = Vector3.fromMatrixScale(matrix);

    const is1 = 1 / scale.x;
    const is2 = 1 / scale.y;
    const is3 = 1 / scale.z;

    const sm11 = matrix.m11 * is1;
    const sm12 = matrix.m21 * is2;
    const sm13 = matrix.m31 * is3;
    const sm21 = matrix.m12 * is1;
    const sm22 = matrix.m22 * is2;
    const sm23 = matrix.m32 * is3;
    const sm31 = matrix.m13 * is1;
    const sm32 = matrix.m23 * is2;
    const sm33 = matrix.m33 * is3;

    const trace = sm11 + sm22 + sm33;
    let S = 0;

    if (trace > 0) {
      S = Math.sqrt(trace + 1.0) * 2;
      return new Quaternion(
        (sm23 - sm32) / S,
        (sm31 - sm13) / S,
        (sm12 - sm21) / S,
        0.25 * S
      );
    } else if (sm11 > sm22 && sm11 > sm33) {
      S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
      return new Quaternion(0.25 * S, (sm12 + sm21) / S, (sm31 + sm13) / S, S);
    } else if (sm22 > sm33) {
      S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
      return new Quaternion(
        (sm12 + sm21) / S,
        0.25 * S,
        (sm23 + sm32) / S,
        (sm31 - sm13) / S
      );
    } else {
      S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
      return new Quaternion(
        (sm31 + sm13) / S,
        (sm23 + sm32) / S,
        0.25 * S,
        (sm12 - sm21) / S
      );
    }
  }
}
