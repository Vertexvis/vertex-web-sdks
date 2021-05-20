import { Dimensions, Point } from '@vertexvis/geometry';
import { Camera, PerspectiveCamera } from './camera';
import { Plane } from './math';
import { Matrix4 } from './math/matrix4';
import { epsilon } from './math/utils';
import { Vector3 } from './math/vector3';
import type { Renderable } from './renderable';
import { RenderContext, Renderer, RenderParams } from './renderer';
import { Transform3D } from './transform';

export class CSS3DObject extends Transform3D implements Renderable {
  public billboard = false;

  public constructor(
    public element: HTMLElement = document.createElement('div')
  ) {
    super();

    element.style.position = 'absolute';
    element.style.pointerEvents = 'auto';
  }

  public willRender({ camera, depthCanvas, viewport }: RenderContext): void {
    if (depthCanvas != null) {
      const occluded = this.isOccluded(depthCanvas, camera, viewport);
      this.element.dataset.occluded = occluded.toString();
    } else {
      this.element.dataset.occluded = this.element.dataset.occluded;
    }
  }

  public didRender(context: RenderContext): void {
    //
  }

  private getScreenPosition(
    vector: Vector3,
    viewport: Dimensions.Dimensions
  ): Point.Point {
    const center = Dimensions.center(viewport);
    const res = {
      x: vector.x * center.x + center.x,
      y: -vector.y * center.y + center.y,
    };
    return res;
  }

  private isOccluded(
    depthCanvas: HTMLCanvasElement,
    camera: Camera,
    viewport: Dimensions.Dimensions
  ): boolean {
    if (camera instanceof PerspectiveCamera) {
      const context = depthCanvas?.getContext('2d');
      const pt = Vector3.fromMatrixPosition(this.worldMatrix);
      const ndc = camera.project(pt);
      const pixel = this.getScreenPosition(ndc, viewport);

      const colorData = context?.getImageData(
        Math.round(pixel.x),
        Math.round(pixel.y),
        1,
        1
      );

      if (colorData != null) {
        const zLength = camera.far - camera.near;
        const depth = (colorData.data[0] / zLength) * zLength;
        const plane = new Plane(
          camera.worldDirection.negate(),
          camera.position.distanceTo(new Vector3())
        );
        const distance = plane.distanceToPoint(pt) - camera.near;

        const occluded = distance > depth;
        console.log('occluded', depth, distance);
        return occluded;
      }
    }

    return false;
  }
}

export class CSS3DRenderer implements Renderer {
  public width = 0;
  public height = 0;

  private cameraFov = 0;
  private cssTransform = '';

  private cameraElement: HTMLElement;

  public constructor(private element: HTMLElement) {
    this.cameraElement = document.createElement('div');
    this.cameraElement.style.transformStyle = 'preserve-3d';
    this.cameraElement.style.pointerEvents = 'none';

    this.element.style.overflow = 'hidden';
    this.element.appendChild(this.cameraElement);
  }

  public setSize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  public render(params: RenderParams): void {
    const { scene, camera } = params;
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.cameraElement.style.width = `${this.width}px`;
    this.cameraElement.style.height = `${this.height}px`;

    if (scene.autoUpdate) {
      scene.updateWorldMatrix();
    }

    const fov = camera.projectionMatrix.m22 * (this.height / 2);
    if (this.cameraFov !== fov) {
      this.element.style.perspective = `${fov}px`;
    }

    if (camera.parent == null) {
      camera.update();
    }

    const transform = [
      `translateZ(${fov}px)`,
      this.cssCameraMatrix(camera.viewMatrix),
      `translate(${this.width / 2}px, ${this.height / 2}px)`,
    ].join(' ');

    if (this.cssTransform !== transform) {
      this.cameraElement.style.transform = transform;
      this.cssTransform = transform;
    }

    this.renderObject(scene, params);
  }

  private renderObject(object: Transform3D, params: RenderParams): void {
    const { camera } = params;
    if (object instanceof CSS3DObject) {
      const context = {
        renderer: this,
        ...params,
      };
      object.willRender(context);

      let transform = '';

      if (object.billboard) {
        let m = camera.viewMatrix.transpose();
        m = m.position(object.worldMatrix);
        m = m.scale(object.scale);
        m = m.position(new Vector3());
        transform = this.cssObjectMatrix(m);
      } else {
        transform = this.cssObjectMatrix(object.worldMatrix);
      }

      object.element.style.transform = transform;

      if (this.cameraElement !== object.element.parentElement) {
        this.cameraElement.appendChild(object.element);
      }

      object.didRender(context);
    }

    for (let i = 0; i < object.children.length; i++) {
      this.renderObject(object.children[i], params);
    }
  }

  private cssCameraMatrix(matrix: Matrix4): string {
    const elements = [
      epsilon(matrix.m11),
      epsilon(-matrix.m21),
      epsilon(matrix.m31),
      epsilon(matrix.m41),

      epsilon(matrix.m12),
      epsilon(-matrix.m22),
      epsilon(matrix.m32),
      epsilon(matrix.m42),

      epsilon(matrix.m13),
      epsilon(-matrix.m23),
      epsilon(matrix.m33),
      epsilon(matrix.m43),

      epsilon(matrix.m14),
      epsilon(-matrix.m24),
      epsilon(matrix.m34),
      epsilon(matrix.m44),
    ];

    return `matrix3d(${elements.join(', ')})`;
  }

  private cssObjectMatrix(matrix: Matrix4): string {
    const elements = [
      epsilon(matrix.m11),
      epsilon(matrix.m21),
      epsilon(matrix.m31),
      epsilon(matrix.m41),

      epsilon(-matrix.m12),
      epsilon(-matrix.m22),
      epsilon(-matrix.m32),
      epsilon(-matrix.m42),

      epsilon(matrix.m13),
      epsilon(matrix.m23),
      epsilon(matrix.m33),
      epsilon(matrix.m43),

      epsilon(matrix.m14),
      epsilon(matrix.m24),
      epsilon(matrix.m34),
      epsilon(matrix.m44),
    ];

    return [`translate(-50%, -50%)`, `matrix3d(${elements.join(', ')})`].join(
      ' '
    );
  }
}
