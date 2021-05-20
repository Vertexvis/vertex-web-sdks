import type { Matrix4 } from './matrix4';

export class Vector3 {
  public constructor(
    public readonly x: number = 0,
    public readonly y: number = 0,
    public readonly z: number = 0
  ) {}

  public static fromMatrixScale(matrix: Matrix4): Vector3 {
    return new Vector3(
      Math.hypot(matrix.m11, matrix.m21, matrix.m31),
      Math.hypot(matrix.m12, matrix.m22, matrix.m32),
      Math.hypot(matrix.m13, matrix.m23, matrix.m33)
    );
  }

  public static fromMatrixPosition(matrix: Matrix4): Vector3 {
    return new Vector3(matrix.m14, matrix.m24, matrix.m34);
  }

  public add(other: Vector3): Vector3 {
    return new Vector3(this.x + other.x, this.y + other.y, this.z + other.z);
  }

  public subtract(other: Vector3): Vector3 {
    return new Vector3(this.x - other.x, this.y - other.y, this.z - other.z);
  }

  public cross(other: Vector3): Vector3 {
    return new Vector3(
      this.y * other.z - this.z * other.y,
      this.z * other.x - this.x * other.z,
      this.x * other.y - this.y * other.x
    );
  }

  public dot(other: Vector3): number {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  }

  public distanceTo(other: Vector3): number {
    return Math.sqrt(this.distanceToSquared(other));
  }

  public distanceToSquared(other: Vector3): number {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    const dz = this.z - other.z;
    return dx * dx + dy * dy + dz * dz;
  }

  public negate(): Vector3 {
    return new Vector3(-this.x, -this.y, -this.z);
  }

  public normalize(): Vector3 {
    const mag = this.magnitude();
    return new Vector3(this.x / mag, this.y / mag, this.z / mag);
  }

  public magnitude(): number {
    return Math.sqrt(this.lengthSquared());
  }

  public lengthSquared(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  public transformMatrix4(m: Matrix4): Vector3 {
    const { x, y, z } = this;
    const e = m.elements;
    const w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
    return new Vector3(
      (e[0] * x + e[4] * y + e[8] * z + e[12]) * w,
      (e[1] * x + e[5] * y + e[9] * z + e[13]) * w,
      (e[2] * x + e[6] * y + e[10] * z + e[14]) * w
    );
  }
}
