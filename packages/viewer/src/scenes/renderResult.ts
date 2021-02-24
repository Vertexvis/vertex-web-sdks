import { Frame } from '../types';
import { StreamApi } from '@vertexvis/stream-api';
import { Result } from '../stream/result';
import { StreamApiEventDispatcher } from '../stream/dispatcher';

export interface RenderResultIds {
  animationId?: string;
  correlationId?: string;
}

export class RenderResult extends Result {
  public onAnimationCompleted: StreamApiEventDispatcher<string | undefined>;
  public onFrameReceived: StreamApiEventDispatcher<Frame.Frame | undefined>;

  public constructor(
    stream: StreamApi,
    { animationId, correlationId }: RenderResultIds,
    timeout?: number
  ) {
    super(undefined, stream);

    this.onAnimationCompleted = new StreamApiEventDispatcher(
      stream,
      msg => msg.event?.animationCompleted?.animationId?.hex === animationId,
      msg => msg.event?.animationCompleted?.animationId?.hex || undefined,
      timeout
    );
    this.onFrameReceived = new StreamApiEventDispatcher(
      stream,
      msg =>
        !!msg.request?.drawFrame?.frameCorrelationIds?.some(
          id => id === correlationId
        ),
      msg =>
        msg.request?.drawFrame != null
          ? Frame.fromProto(msg.request?.drawFrame)
          : undefined,
      timeout
    );
  }
}