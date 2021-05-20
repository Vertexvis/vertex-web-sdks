import type { Quaternion } from './quaternion';
import { Vector3 } from './vector3';

/* eslint-disable prettier/prettier */
type Matrix4Array = [
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
  number, number, number, number
];
/* eslint-enable prettier/prettier */

function makeIdentityArray(): Matrix4Array {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
}

export class Matrix4 {
  public get m11(): number {
    return this.elements[0];
  }

  public get m21(): number {
    return this.elements[1];
  }

  public get m31(): number {
    return this.elements[2];
  }

  public get m41(): number {
    return this.elements[3];
  }

  public get m12(): number {
    return this.elements[4];
  }

  public get m22(): number {
    return this.elements[5];
  }

  public get m32(): number {
    return this.elements[6];
  }

  public get m42(): number {
    return this.elements[7];
  }

  public get m13(): number {
    return this.elements[8];
  }

  public get m23(): number {
    return this.elements[9];
  }

  public get m33(): number {
    return this.elements[10];
  }

  public get m43(): number {
    return this.elements[11];
  }

  public get m14(): number {
    return this.elements[12];
  }

  public get m24(): number {
    return this.elements[13];
  }

  public get m34(): number {
    return this.elements[14];
  }

  public get m44(): number {
    return this.elements[15];
  }

  public constructor(public elements = makeIdentityArray()) {}

  public static makeTranslation(translation: Vector3): Matrix4 {
    const { x, y, z } = translation;
    /* eslint-disable prettier/prettier */
    return new Matrix4([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      x, y, z, 1,
    ]);
    /* eslint-enable prettier/prettier */
  }

  /**
   * 1-2y²-2z²    2xy-2zw    2xz+2yw    0
   * 2xy+2zw      1-2x²-2z²  2yz-2xw    0
   * 2xz-2yw      2yz+2xw    1-2x²-2y²  0
   * 0            0          0          1
   *
   * @param quaternion
   * @returns
   */
  public static makeRotation(quaternion: Quaternion): Matrix4 {
    const { x, y, z, w } = quaternion;

    const x2 = x + x,
      y2 = y + y,
      z2 = z + z;
    const xx = x * x2,
      xy = x * y2,
      xz = x * z2;
    const yy = y * y2,
      yz = y * z2,
      zz = z * z2;
    const wx = w * x2,
      wy = w * y2,
      wz = w * z2;

    /* eslint-disable prettier/prettier */
    return new Matrix4([
      1 - ( yy + zz ), xy - wz, xz + wy, 0,
      xy + wz, 1 - ( xx + zz ), yz - wx, 0,
      xz - wy, yz + wx, 1 - ( xx + yy ), 0,
      0, 0, 0, 1
    ])
    /* eslint-enable prettier/prettier */
  }

  public static makeScale(scale: Vector3): Matrix4 {
    const { x, y, z } = scale;
    /* eslint-disable prettier/prettier */
    return new Matrix4([
      x, 0, 0, 0,
      0, y, 0, 0,
      0, 0, z, 0,
      0, 0, 0, 1,
    ]);
    /* eslint-enable prettier/prettier */
  }

  public static makeTRS(
    translation: Vector3,
    rotation: Quaternion,
    scale: Vector3
  ): Matrix4 {
    const t = Matrix4.makeTranslation(translation);
    const r = Matrix4.makeRotation(rotation);
    const s = Matrix4.makeScale(scale);
    return t.multiply(r).multiply(s);
  }

  public static makePerspective(
    left: number,
    right: number,
    top: number,
    bottom: number,
    near: number,
    far: number
  ): Matrix4 {
    const x = (2 * near) / (right - left);
    const y = (2 * near) / (top - bottom);

    const a = (right + left) / (right - left);
    const b = (top + bottom) / (top - bottom);
    const c = -(far + near) / (far - near);
    const d = (-2 * far * near) / (far - near);

    /* eslint-disable prettier/prettier */
    return new Matrix4([
      x, 0, 0, 0,
      0, y, 0, 0,
      a, b, c, -1,
      0, 0, d, 0
    ])
    /* eslint-enable prettier/prettier */
  }

  public multiply(other: Matrix4): Matrix4 {
    const ae = this.elements;
    const be = other.elements;
    const te = makeIdentityArray();

    const a11 = ae[0],
      a12 = ae[4],
      a13 = ae[8],
      a14 = ae[12];
    const a21 = ae[1],
      a22 = ae[5],
      a23 = ae[9],
      a24 = ae[13];
    const a31 = ae[2],
      a32 = ae[6],
      a33 = ae[10],
      a34 = ae[14];
    const a41 = ae[3],
      a42 = ae[7],
      a43 = ae[11],
      a44 = ae[15];

    const b11 = be[0],
      b12 = be[4],
      b13 = be[8],
      b14 = be[12];
    const b21 = be[1],
      b22 = be[5],
      b23 = be[9],
      b24 = be[13];
    const b31 = be[2],
      b32 = be[6],
      b33 = be[10],
      b34 = be[14];
    const b41 = be[3],
      b42 = be[7],
      b43 = be[11],
      b44 = be[15];

    te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

    te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

    te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

    te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

    return new Matrix4(te);
  }

  public invert(): Matrix4 {
    const a00 = this.elements[0],
      a01 = this.elements[1],
      a02 = this.elements[2],
      a03 = this.elements[3];
    const a10 = this.elements[4],
      a11 = this.elements[5],
      a12 = this.elements[6],
      a13 = this.elements[7];
    const a20 = this.elements[8],
      a21 = this.elements[9],
      a22 = this.elements[10],
      a23 = this.elements[11];
    const a30 = this.elements[12],
      a31 = this.elements[13],
      a32 = this.elements[14],
      a33 = this.elements[15];

    const b00 = a00 * a11 - a01 * a10;
    const b01 = a00 * a12 - a02 * a10;
    const b02 = a00 * a13 - a03 * a10;
    const b03 = a01 * a12 - a02 * a11;
    const b04 = a01 * a13 - a03 * a11;
    const b05 = a02 * a13 - a03 * a12;
    const b06 = a20 * a31 - a21 * a30;
    const b07 = a20 * a32 - a22 * a30;
    const b08 = a20 * a33 - a23 * a30;
    const b09 = a21 * a32 - a22 * a31;
    const b10 = a21 * a33 - a23 * a31;
    const b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    let det =
      b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
      return new Matrix4([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
    det = 1.0 / det;

    return new Matrix4([
      (a11 * b11 - a12 * b10 + a13 * b09) * det,
      (a02 * b10 - a01 * b11 - a03 * b09) * det,
      (a31 * b05 - a32 * b04 + a33 * b03) * det,
      (a22 * b04 - a21 * b05 - a23 * b03) * det,

      (a12 * b08 - a10 * b11 - a13 * b07) * det,
      (a00 * b11 - a02 * b08 + a03 * b07) * det,
      (a32 * b02 - a30 * b05 - a33 * b01) * det,
      (a20 * b05 - a22 * b02 + a23 * b01) * det,

      (a10 * b10 - a11 * b08 + a13 * b06) * det,
      (a01 * b08 - a00 * b10 - a03 * b06) * det,
      (a30 * b04 - a31 * b02 + a33 * b00) * det,
      (a21 * b02 - a20 * b04 - a23 * b00) * det,

      (a11 * b07 - a10 * b09 - a12 * b06) * det,
      (a00 * b09 - a01 * b07 + a02 * b06) * det,
      (a31 * b01 - a30 * b03 - a32 * b00) * det,
      (a20 * b03 - a21 * b01 + a22 * b00) * det,
    ]);
  }

  public position(vectorOrMatrix: Vector3 | Matrix4): Matrix4 {
    if (vectorOrMatrix instanceof Matrix4) {
      return this.position(
        new Vector3(vectorOrMatrix.m41, vectorOrMatrix.m42, vectorOrMatrix.m43)
      );
    } else {
      const { x, y, z } = vectorOrMatrix;
      /* eslint-disable prettier/prettier */
      return new Matrix4([
        this.m11, this.m12, this.m13, this.m14,
        this.m21, this.m22, this.m23, this.m24,
        this.m31, this.m32, this.m33, this.m34,
        x, y, z, this.m44,
      ])
      /* eslint-enable prettier/prettier */
    }
  }

  public lookAt(position: Vector3, target: Vector3, up: Vector3): Matrix4 {
    let z = position.subtract(target);
    if (z.lengthSquared() === 0) {
      z = new Vector3(z.x, z.y, 1);
    }

    z = z.normalize();

    const x = up.cross(z);
    if (x.lengthSquared() === 0) {
      if (Math.abs(up.z) === 1) {
        z = new Vector3(z.x + 0.0001, z.y, z.z);
      } else {
        z = new Vector3(z.x, z.y, z.z + 0.0001);
      }
      z = z.normalize();
    }

    const y = z.cross(x);

    /* eslint-disable prettier/prettier */
    return new Matrix4([
      x.x, y.x, z.x, this.m14,
      x.y, y.y, z.y, this.m24,
      x.z, y.z, z.z, this.m34,
      this.m41, this.m42, this.m43, this.m44
    ])
    /* eslint-enable prettier/prettier */
  }

  public scale(scale: Vector3): Matrix4 {
    const { x, y, z } = scale;
    /* eslint-disable prettier/prettier */
    return new Matrix4([
      this.m11 * x, this.m12 * y, this.m13 * z, this.m14,
      this.m21 * x, this.m22 * y, this.m23 * z, this.m24,
      this.m31 * x, this.m32 * y, this.m33 * z, this.m34,
      this.m41 * x, this.m42 * y, this.m43 * z, this.m44,
    ])
    /* eslint-enable prettier/prettier */
  }

  public transpose(): Matrix4 {
    /* eslint-disable prettier/prettier */
    return new Matrix4([
      this.m11, this.m21, this.m31, this.m41,
      this.m12, this.m22, this.m32, this.m42,
      this.m13, this.m23, this.m33, this.m43,
      this.m14, this.m24, this.m34, this.m44,
    ])
    /* eslint-enable prettier/prettier */
  }
}
