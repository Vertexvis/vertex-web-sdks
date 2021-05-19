import { Camera } from './camera';
import { Renderer } from './renderer';
import { ClientScene } from './scene';
import '../components';
import { Frame } from '../types';
import { Vector3 } from './math';

export class SyncedViewerElementRenderer implements Renderer {
  public constructor(
    private viewer: HTMLVertexViewerElement,
    private renderer: Renderer,
    private scene: ClientScene,
    private camera: Camera
  ) {
    viewer.addEventListener('frameDrawn', (event) =>
      this.handleFrameDrawn(event)
    );
  }

  public setSize(width: number, height: number): void {
    this.renderer.setSize(width, height);
  }

  public render(scene: ClientScene, camera: Camera): void {
    this.renderer.render(scene, camera);
  }

  private handleFrameDrawn(event: Event): void {
    const { detail: frame } = event as CustomEvent<Frame.Frame>;
    const { position, up, lookAt } = frame.sceneAttributes.camera;

    this.camera.position = new Vector3(position.x, position.y, position.z);
    this.camera.up = new Vector3(up.x, up.y, up.z);
    this.camera.lookAt(new Vector3(lookAt.x, lookAt.y, lookAt.z));

    this.setSize(this.viewer.clientWidth, this.viewer.clientHeight);
    this.render(this.scene, this.camera);
  }
}
