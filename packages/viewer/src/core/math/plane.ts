import { Vector3 } from './vector3';

export class Plane {
  public constructor(
    public readonly normal: Vector3 = new Vector3(1, 0, 0),
    public readonly constant = 0
  ) {}

  public distanceToPoint(pt: Vector3): number {
    return this.normal.dot(pt) + this.constant;
  }
}
