import { Dimensions } from '@vertexvis/geometry';
import { Camera } from './camera';
import { ClientScene } from './scene';

export interface RenderParams {
  scene: ClientScene;
  camera: Camera;
  viewport: Dimensions.Dimensions;
  depthCanvas?: HTMLCanvasElement;
}

export interface RenderContext extends RenderParams {
  renderer: Renderer;
}

export interface Renderer {
  setSize(width: number, height: number): void;

  render(params: RenderParams): void;
}
