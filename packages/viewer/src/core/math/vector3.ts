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
}
