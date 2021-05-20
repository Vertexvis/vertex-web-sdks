import { Angle } from '@vertexvis/geometry';
import { Vector3 } from './math';
import { Matrix4 } from './math/matrix4';
import { Transform3D } from './transform';

export class Camera extends Transform3D {
  public projectionMatrix = new Matrix4();
  public viewMatrix = new Matrix4();
  public projectionViewMatrix = new Matrix4();
  public worldDirection = new Vector3(0, 0, 0);

  public project(vector: Vector3): Vector3 {
    return vector.transformMatrix4(this.projectionViewMatrix);
  }

  public update(): void {
    this.updateWorldMatrix();
    this.viewMatrix = this.worldMatrix.invert();
    this.worldDirection = new Vector3(
      this.worldMatrix.m13,
      this.worldMatrix.m23,
      this.worldMatrix.m33
    ).normalize();
  }
}

export class PerspectiveCamera extends Camera {
  public zoom = 1;

  public constructor(
    public fov = 45,
    public aspect = 1,
    public near = 0.1,
    public far = 1000
  ) {
    super();
  }

  public lookAt(target: Vector3): void {
    super.lookAt(target, true);
  }

  public update(): void {
    super.update();
    this.updateProjectionMatrix();
  }

  private updateProjectionMatrix(): void {
    const ymax = this.near * Math.tan(Angle.toRadians(this.fov / 2.0));
    const xmax = ymax * this.aspect;

    const left = -xmax;
    const right = xmax;
    const top = ymax;
    const bottom = -ymax;

    this.projectionMatrix = Matrix4.makePerspective(
      left,
      right,
      top,
      bottom,
      this.near,
      this.far
    );
    this.projectionViewMatrix = this.projectionMatrix.multiply(this.viewMatrix);
  }
}
