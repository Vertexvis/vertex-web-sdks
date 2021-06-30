// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FunctionalComponent, h } from '@stencil/core';
import { Angle, Point } from '@vertexvis/geometry';
import { cssTransformCenterAt } from '../../lib/dom';

export interface DistanceMeasurementProps {
  startPt?: Point.Point;
  endPt?: Point.Point;
  centerPt?: Point.Point;
  anchorLabelDistance?: number;
  distance?: string;
  onStartAnchorPointerDown?: (event: PointerEvent) => void;
  onEndAnchorPointerDown?: (event: PointerEvent) => void;
}

export const DistanceMeasurement: FunctionalComponent<DistanceMeasurementProps> = ({
  startPt,
  endPt,
  centerPt,
  distance,
  anchorLabelDistance,
  onStartAnchorPointerDown,
  onEndAnchorPointerDown,
}) => {
  const angle =
    startPt != null && endPt != null
      ? Angle.fromPoints(startPt, endPt)
      : undefined;

  const startLabelPt =
    angle != null && startPt != null && anchorLabelDistance != null
      ? Point.add(startPt, Point.polar(-anchorLabelDistance, angle))
      : undefined;

  const endLabelPt =
    angle != null && endPt != null && anchorLabelDistance != null
      ? Point.add(endPt, Point.polar(anchorLabelDistance, angle))
      : undefined;

  return (
    <div>
      {startPt != null && endPt != null && (
        <vertex-viewer-measurement-line
          class="line"
          start={startPt}
          end={endPt}
          endCapLength={12}
        />
      )}

      {startPt != null && (
        <div
          id="start-anchor"
          class="anchor anchor-start"
          style={{ transform: cssTransformCenterAt(startPt) }}
          onPointerDown={onStartAnchorPointerDown}
        >
          <slot name="start-anchor">
            <slot name="start-label">
              <div class="anchor-placeholder"></div>
            </slot>
          </slot>
        </div>
      )}

      {startLabelPt && (
        <div
          class="anchor-label anchor-label-start"
          style={{ transform: cssTransformCenterAt(startLabelPt) }}
        >
          <div class="anchor-label-placeholder">A</div>
        </div>
      )}

      {endPt != null && (
        <div
          id="end-anchor"
          class="anchor anchor-end"
          style={{ transform: cssTransformCenterAt(endPt) }}
          onPointerDown={onEndAnchorPointerDown}
        >
          <slot name="end-anchor">
            <div class="anchor-placeholder"></div>
          </slot>
        </div>
      )}

      {endLabelPt && (
        <div
          class="anchor-label anchor-label-end"
          style={{ transform: cssTransformCenterAt(endLabelPt) }}
        >
          <slot name="end-label">
            <div class="anchor-label-placeholder">B</div>
          </slot>
        </div>
      )}

      {centerPt != null && (
        <div
          id="label"
          class="distance-label"
          style={{ transform: cssTransformCenterAt(centerPt) }}
        >
          {distance}
        </div>
      )}
    </div>
  );
};
