import {
  Component,
  Host,
  h,
  Element,
  Prop,
  Watch,
  EventEmitter,
  Event,
  Method,
  Listen,
} from '@stencil/core';
import { stampTemplateWithId } from '../../lib/templates';
import { DistanceMeasurement, Measurement, UnitType } from '../../lib/types';
import { isVertexViewerDistanceMeasurement } from '../viewer-distance-measurement/utils';
import { ViewerMeasurementToolType } from '../viewer-measurement-tool/viewer-measurement-tool';

@Component({
  tag: 'vertex-viewer-measurements',
  styleUrl: 'viewer-measurements.css',
  shadow: true,
})
export class ViewerMeasurements {
  /**
   * An HTML template that describes the HTML to use for new distance
   * measurements. It's expected that the template contains a
   * `<vertex-viewer-distance-measurement>`.
   */
  @Prop()
  public distanceTemplateId?: string;

  /**
   * The type of measurement to perform.
   */
  @Prop()
  public tool: ViewerMeasurementToolType = 'distance';

  /**
   * The unit type to display measurements in.
   */
  @Prop()
  public units: UnitType = 'millimeters';

  /**
   * The number of fractional digits to display measurements in.
   */
  @Prop()
  public fractionalDigits = 2;

  /**
   * If `true`, disables adding or editing of measurements through user
   * interaction.
   */
  @Prop()
  public disabled = false;

  /**
   * The viewer to connect to measurements. If nested within a <vertex-viewer>,
   * this property will be populated automatically.
   */
  @Prop()
  public viewer?: HTMLVertexViewerElement;

  /**
   * The ID of the measurement that is selected.
   */
  @Prop({ mutable: true })
  public selectedMeasurementId?: string;

  /**
   * Dispatched when a new measurement is added, either through user interaction
   * or programmatically.
   */
  @Event()
  public measurementAdded!: EventEmitter<HTMLVertexViewerDistanceMeasurementElement>;

  /**
   * Dispatched when a new measurement is removed, either through user
   * interaction or programmatically.
   */
  @Event()
  public measurementRemoved!: EventEmitter<HTMLVertexViewerDistanceMeasurementElement>;

  @Element()
  private hostEl!: HTMLElement;

  /**
   * Adds a new measurement as a child to this component. A new measurement
   * component will be created from the template specified by
   * `distance-template-id` or if undefined a default element will be created.
   *
   * @param measurement The measurement to add.
   * @returns The measurement element that was created.
   * @see {@link ViewerMeasurements.distanceTemplateId}
   */
  @Method()
  public async addMeasurement(
    measurement: Measurement
  ): Promise<HTMLVertexViewerDistanceMeasurementElement> {
    if (measurement instanceof DistanceMeasurement) {
      const { start, end, invalid, id } = measurement;

      const el = this.createDistanceMeasurementElement();
      el.id = id;
      el.start = start;
      el.end = end;
      el.invalid = invalid;
      el.addEventListener('pointerdown', this.handleMeasurementPointerDown);

      this.updatePropsOnMeasurement(el);
      this.hostEl.appendChild(el);
      this.measurementAdded.emit(el);
      return el;
    } else {
      throw new Error(`Cannot add measurement. Unknown type '${measurement}'.`);
    }
  }

  /**
   * Removes a measurement with the given ID, and returns the HTML element
   * associated to the measurement. Returns `undefined` if no measurement is
   * found.
   *
   * @param id The ID of the measurement to remove.
   * @returns The measurement element, or undefined.
   */
  @Method()
  public async removeMeasurement(
    id: string
  ): Promise<HTMLVertexViewerDistanceMeasurementElement | undefined> {
    const measurements = await this.getMeasurementElements();
    const measurement = measurements.find((m) => m.id === id);

    if (measurement != null) {
      measurement.remove();
      measurement.removeEventListener(
        'pointerdown',
        this.handleMeasurementPointerDown
      );
      this.measurementRemoved.emit(measurement);
    }

    return measurement;
  }

  /**
   * Returns the measurement element associated to the given ID.
   *
   * @param id The ID of the measurement element to return.
   * @returns A measurement element, or `undefined`.
   * @see {@link ViewerMeasurements.getMeasurementElements}
   */
  @Method()
  public async getMeasurementElement(
    id: string
  ): Promise<HTMLVertexViewerDistanceMeasurementElement | undefined> {
    const measurements = await this.getMeasurementElements();
    return measurements.find((el) => el.id === id);
  }

  /**
   * Returns a list of measurement elements that are children of this component.
   *
   * @returns A list of all measurements.
   * @see {@link ViewerMeasurements.getMeasurementElement}
   */
  @Method()
  public async getMeasurementElements(): Promise<
    HTMLVertexViewerDistanceMeasurementElement[]
  > {
    return Array.from(this.hostEl.children).filter(
      isVertexViewerDistanceMeasurement
    );
  }

  /**
   * @ignore
   */
  @Watch('selectedMeasurementId')
  protected async handleSelectedMeasurementIdChanged(): Promise<void> {
    const measurements = await this.getMeasurementElements();
    measurements.forEach((m) => {
      m.mode = m.id === this.selectedMeasurementId ? 'edit' : '';
    });
  }

  /**
   * @ignore
   */
  @Watch('tool')
  protected handleToolChanged(): void {
    this.updatePropsOnMeasurementTool();
  }

  /**
   * @ignore
   */
  @Watch('viewer')
  protected async handleViewerChanged(
    newViewer: HTMLVertexViewerElement | undefined
  ): Promise<void> {
    this.updatePropsOnMeasurementTool();
    this.updatePropsOnMeasurements();
  }

  /**
   * @ignore
   */
  @Watch('disabled')
  protected handleDisabledChanged(): void {
    this.updatePropsOnMeasurementTool();
  }

  /**
   * @ignore
   */
  @Watch('distanceTemplateId')
  protected handleDistanceTemplateIdChanged(): void {
    this.updatePropsOnMeasurementTool();
  }

  /**
   * @ignore
   */
  @Watch('units')
  protected handleUnitsChanged(): void {
    this.updatePropsOnMeasurementTool();
    this.updatePropsOnMeasurements();
  }

  /**
   * @ignore
   */
  @Watch('fractionalDigits')
  protected handleFractionalDigitsChanged(): void {
    this.updatePropsOnMeasurementTool();
    this.updatePropsOnMeasurements();
  }

  /**
   * @ignore
   */
  @Listen('measureEnd')
  protected async handleMeasureEnd(
    event: CustomEvent<Measurement>
  ): Promise<void> {
    const e = event as CustomEvent<Measurement>;
    await this.addMeasurement(e.detail);
    this.selectedMeasurementId = e.detail.id;
  }

  /**
   * @ignore
   */
  protected componentDidLoad(): void {
    this.updatePropsOnMeasurementTool();
  }

  /**
   * @ignore
   */
  protected render(): h.JSX.IntrinsicElements {
    return (
      <Host>
        <slot />
      </Host>
    );
  }

  private handleMeasurementPointerDown = (event: Event): void => {
    if (!this.disabled) {
      const el = event.currentTarget as Element;
      this.selectedMeasurementId = el.id;
    }
  };

  private createDistanceMeasurementElement(): HTMLVertexViewerDistanceMeasurementElement {
    if (this.distanceTemplateId != null) {
      const element = stampTemplateWithId(
        window.document.body,
        this.distanceTemplateId,
        isVertexViewerDistanceMeasurement,
        () =>
          console.warn(
            `Distance template with ID ${this.distanceTemplateId} not found. Using default distance element.`
          ),
        () =>
          console.warn(
            `Distance template does not contain a vertex-viewer-distance-measurement. Using default distance element.`
          )
      );

      if (element != null) {
        return element;
      }
    }

    return document.createElement('vertex-viewer-distance-measurement');
  }

  private async updatePropsOnMeasurements(): Promise<void> {
    const measurements = await this.getMeasurementElements();
    measurements.forEach((m) => this.updatePropsOnMeasurement(m));
  }

  private updatePropsOnMeasurement(
    element: HTMLVertexViewerDistanceMeasurementElement
  ): void {
    element.fractionalDigits = this.fractionalDigits;
    element.units = this.units;
    element.viewer = this.viewer;
    element.classList.add('viewer-measurements__measurement');
  }

  private updatePropsOnMeasurementTool(): void {
    const tool = this.getMeasurementTool();
    if (tool != null) {
      tool.disabled = this.disabled;
      tool.distanceTemplateId = this.distanceTemplateId;
      tool.tool = this.tool;
      tool.fractionalDigits = this.fractionalDigits;
      tool.units = this.units;
      tool.viewer = this.viewer;
    }
  }

  private getMeasurementTool():
    | HTMLVertexViewerMeasurementToolElement
    | undefined {
    return this.hostEl.querySelector('vertex-viewer-measurement-tool') as
      | HTMLVertexViewerMeasurementToolElement
      | undefined;
  }
}
