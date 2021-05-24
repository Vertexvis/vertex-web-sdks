import { Dimensions } from '@vertexvis/geometry';
import { DepthBuffer } from '../workers/depth-buffer';
import { Camera } from './camera';
import { ClientScene } from './scene';

export interface RenderParams {
  scene: ClientScene;
  camera: Camera;
  viewport: Dimensions.Dimensions;
  depthBuffer?: DepthBuffer;
}

export interface RenderContext extends RenderParams {
  renderer: Renderer;
}

export interface Renderer {
  setSize(width: number, height: number): void;

  render(params: RenderParams): void;
}
