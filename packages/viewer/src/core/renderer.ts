import { Camera } from './camera';
import { ClientScene } from './scene';

export interface Renderer {
  setSize(width: number, height: number): void;

  render(scene: ClientScene, camera: Camera): void;
}
