import { FrameRenderer } from './renderer';
import { Frame } from '../types';
import { vertexvis } from '@vertexvis/frame-streaming-protos';
import { Rectangle, Dimensions } from '@vertexvis/geometry';
import { StreamApi, toProtoDuration } from '@vertexvis/stream-api';
import { TimingMeter } from '../metrics';
import { HtmlImage, loadImageBytes } from './imageLoaders';

const REPORTING_INTERVAL_MS = 1000;

export interface DrawFrame {
  canvas: CanvasRenderingContext2D;
  dimensions: Dimensions.Dimensions;
  frame: Frame.Frame;
}

export type CanvasRenderer = FrameRenderer<DrawFrame, Frame.Frame>;

function drawImage(image: HtmlImage, data: DrawFrame): void {
  const { imageAttributes } = data.frame;
  const imageRect = vertexvis.protobuf.stream.Rectangle.fromObject(
    imageAttributes.frameDimensions
  );
  const fitTo = Rectangle.fromDimensions(data.dimensions);
  const fit = Rectangle.containFit(fitTo, imageRect);

  const scaleX = fit.width / imageRect.width;
  const scaleY = fit.height / imageRect.height;

  const startXPos = imageAttributes.imageRect.x * scaleX;
  const startYPos = imageAttributes.imageRect.y * scaleY;

  data.canvas.clearRect(0, 0, data.dimensions.width, data.dimensions.height);
  data.canvas.drawImage(
    image.image,
    startXPos,
    startYPos,
    image.image.width * imageAttributes.scaleFactor * scaleX,
    image.image.height * imageAttributes.scaleFactor * scaleY
  );
}

function reportTimings(api: StreamApi, meter: TimingMeter): void {
  const timings = meter
    .takeMeasurements()
    .map(t => ({ receiveToPaintDuration: toProtoDuration(t.duration) }));

  if (timings.length > 0) {
    api.recordPerformance({ timings: timings }, false);
  }
}

export function measureCanvasRenderer(
  api: StreamApi,
  meter: TimingMeter,
  renderer: CanvasRenderer,
  intervalMs: number = REPORTING_INTERVAL_MS
): CanvasRenderer {
  let timer: number | undefined;
  let renderCount = 0;

  function start(): void {
    renderCount++;
    if (timer == null) {
      timer = window.setInterval(() => {
        reportTimings(api, meter);
        if (renderCount === 0) {
          clearTimer();
        }
      }, intervalMs);
    }
  }

  function end(): void {
    renderCount--;
  }

  function clearTimer(): void {
    if (timer != null) {
      window.clearInterval(timer);
      timer = undefined;
    }
  }

  return data => {
    start();
    return meter.measure(renderer(data)).finally(() => end());
  };
}

export function createCanvasRenderer(): CanvasRenderer {
  let lastFrameNumber: number | undefined;

  return async data => {
    const frameNumber = data.frame.sequenceNumber;
    const image = await loadImageBytes(data.frame.image);

    if (lastFrameNumber == null || frameNumber > lastFrameNumber) {
      lastFrameNumber = frameNumber;
      drawImage(image, data);
    }

    image.dispose();
    return data.frame;
  };
}