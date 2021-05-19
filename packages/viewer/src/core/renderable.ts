import { Camera } from './camera';
import { Renderer } from './renderer';
import { ClientScene } from './scene';

export interface Renderable {
  willRender(renderer: Renderer, scene: ClientScene, camera: Camera): void;

  didRender(renderer: Renderer, scene: ClientScene, camera: Camera): void;
}
