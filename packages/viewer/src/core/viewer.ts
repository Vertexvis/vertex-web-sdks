import { Camera } from './camera';
import { Renderer, RenderParams } from './renderer';
import { ClientScene } from './scene';
import '../components';
import { Frame } from '../types';
import { Vector3 } from './math';
import { HtmlImage } from '../rendering/imageLoaders';
import { ImageAttributes } from '../types/frame';
import { decodeDepth } from '../workers/depth-buffer.worker';
import { DepthBuffer } from '../workers/depth-buffer';

export class SyncedViewerElementRenderer implements Renderer {
  public onBeforeRender?: (frame: Frame.Frame) => Promise<void>;

  private lastDepthBuffer?: DepthBuffer;

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

  public render(params: RenderParams): void {
    requestAnimationFrame(() => {
      this.renderer.render({
        ...params,
        depthBuffer: params.depthBuffer || this.lastDepthBuffer,
      });
    });
  }

  private async handleFrameDrawn(event: Event): Promise<void> {
    const { detail: frame } = event as CustomEvent<Frame.Frame>;
    const { position, up, lookAt } = frame.sceneAttributes.camera;
    const width = this.viewer.clientWidth;
    const height = this.viewer.clientHeight;

    if (frame.depthBuffer != null) {
      decodeDepth(frame.depthBuffer).then((decoded) => {
        this.lastDepthBuffer = { ...decoded, imageAttr: frame.imageAttributes };

        this.render({
          scene: this.scene,
          camera: this.camera,
          viewport: { width, height },
        });
      });
      // loadImageBytes(frame.depthBuffer).then((image) => {
      //   const canvas = this.createDepthCanvas(image, frame.imageAttributes);
      //   this.render({
      //     scene: this.scene,
      //     camera: this.camera,
      //     viewport: { width, height },
      //     depthCanvas: canvas,
      //   });
      // });
    }

    this.camera.position = new Vector3(position.x, position.y, position.z);
    this.camera.up = new Vector3(up.x, up.y, up.z);
    this.camera.lookAt(new Vector3(lookAt.x, lookAt.y, lookAt.z));

    this.setSize(width, height);

    await this.onBeforeRender?.(frame);

    this.render({
      scene: this.scene,
      camera: this.camera,
      viewport: { width, height },
      depthBuffer: undefined,
    });
  }

  private createDepthCanvas(
    image: HtmlImage,
    attr: ImageAttributes
  ): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = attr.frameDimensions.width;
    canvas.height = attr.frameDimensions.height;

    const context = canvas.getContext('2d');
    if (context != null) {
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        image.image,
        attr.imageRect.x,
        attr.imageRect.y,
        image.image.width * attr.scaleFactor,
        image.image.height * attr.scaleFactor
      );
    }

    return canvas;
  }
}
