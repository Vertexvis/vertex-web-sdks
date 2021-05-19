import { Camera } from './camera';
import { Matrix4 } from './math/matrix4';
import { epsilon } from './math/utils';
import { Vector3 } from './math/vector3';
import type { Renderable } from './renderable';
import { Renderer } from './renderer';
import { ClientScene } from './scene';
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

  public willRender(
    renderer: Renderer,
    scene: ClientScene,
    camera: Camera
  ): void {
    //
  }

  public didRender(
    renderer: Renderer,
    scene: ClientScene,
    camera: Camera
  ): void {
    //
  }
}

export class CSS3DRenderer implements Renderer {
  private width = 0;
  private height = 0;

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

  public render(scene: ClientScene, camera: Camera): void {
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

    this.renderObject(scene, scene, camera);
  }

  private renderObject(
    object: Transform3D,
    scene: ClientScene,
    camera: Camera
  ): void {
    if (object instanceof CSS3DObject) {
      object.willRender(this, scene, camera);

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

      object.didRender(this, scene, camera);
    }

    for (let i = 0; i < object.children.length; i++) {
      this.renderObject(object.children[i], scene, camera);
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
