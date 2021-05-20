import { RenderContext } from './renderer';

export interface Renderable {
  willRender(context: RenderContext): void;

  didRender(context: RenderContext): void;
}
