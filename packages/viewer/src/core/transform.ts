import { Matrix4 } from './math/matrix4';
import { Quaternion } from './math/quaternion';
import { Vector3 } from './math/vector3';

export class Transform3D {
  public parent: Transform3D | undefined;
  public children: Transform3D[] = [];

  public matrix = new Matrix4();
  public worldMatrix = new Matrix4();

  public position = new Vector3();
  public scale = new Vector3(1, 1, 1);
  public rotation = new Quaternion();
  public up = new Vector3(0, 1, 0);

  private invalidatedWorldMatrix = false;
  private matrixAutoUpdate = true;

  public lookAt(target: Vector3, invert = false): void {
    if (invert) {
      this.matrix = this.matrix.lookAt(this.position, target, this.up);
    } else {
      this.matrix = this.matrix.lookAt(target, this.position, this.up);
    }

    this.rotation = Quaternion.fromMatrixRotation(this.matrix);
  }

  public setParent(value: Transform3D | undefined): void {
    this.parent?.remove(this);
    this.parent = value;
    this.parent?.add(this);
  }

  public updateMatrix(): void {
    this.matrix = Matrix4.makeTRS(this.position, this.rotation, this.scale);
    this.invalidatedWorldMatrix = true;
  }

  public updateWorldMatrix(force = false): void {
    if (this.matrixAutoUpdate) {
      this.updateMatrix();
    }

    if (this.invalidatedWorldMatrix || force) {
      if (this.parent == null) {
        this.worldMatrix = this.matrix;
      } else {
        this.worldMatrix = this.parent.worldMatrix.multiply(this.matrix);
      }
      this.invalidatedWorldMatrix = false;
      force = true;
    }

    for (let i = 0; i < this.children.length; i++) {
      this.children[i].updateWorldMatrix(force);
    }
  }

  protected add(child: Transform3D): void {
    this.children.push(child);
  }

  protected remove(child: Transform3D): void {
    const index = this.children.indexOf(child);
    if (index >= 0) {
      this.parent?.children.splice(index, 1);
    }
  }
}
