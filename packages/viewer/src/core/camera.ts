import { Vector3 } from './math';
import { Matrix4 } from './math/matrix4';
import { Transform3D } from './transform';

export class Camera extends Transform3D {
  public projectionMatrix = new Matrix4();
  public viewMatrix = new Matrix4();
  public projectionViewMatrix = new Matrix4();

  public update(): void {
    this.updateWorldMatrix();

    this.viewMatrix = this.worldMatrix.invert();
    this.projectionViewMatrix = this.projectionMatrix.multiply(this.viewMatrix);
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
    const top =
      (this.near * Math.tan((Math.PI / 180) * 0.5 * this.fov)) / this.zoom;
    const height = 2 * top;
    const width = this.aspect * height;
    const left = -0.5 * width;

    this.projectionMatrix = Matrix4.makePerspective(
      left,
      left + width,
      top,
      top - height,
      this.near,
      this.far
    );
  }
}
