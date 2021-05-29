/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  RowArg,
  RowDataProvider,
  ScrollToOptions,
  SelectItemOptions,
} from './components/scene-tree/scene-tree';
import { Config } from './config/config';
import { Environment } from './config/environment';
import { SceneTreeController } from './components/scene-tree/lib/controller';
import { SceneTreeErrorDetails } from './components/scene-tree/lib/errors';
import { Row } from './components/scene-tree/lib/row';
import { Node } from '@vertexvis/scene-tree-protos/scenetree/protos/domain_pb';
import { ViewerStreamAttributes } from './stream/streamAttributes';
import { ColorMaterial } from './scenes/colorMaterial';
import { TapEventDetails } from './interactions/tapEventDetails';
import { Frame } from './types';
import { ConnectionStatus } from './components/viewer/viewer';
import { Dimensions, Quaternion, Vector3 } from '@vertexvis/geometry';
import { Disposable } from '@vertexvis/utils';
import { CommandFactory } from './commands/command';
import { InteractionHandler } from './interactions/interactionHandler';
import { KeyInteraction } from './interactions/keyInteraction';
import { BaseInteractionHandler } from './interactions/baseInteractionHandler';
import { Scene } from './scenes/scene';
import { ViewerStreamApi } from './stream/viewerStreamApi';
import { ViewerToolbarPlacement } from './components/viewer-toolbar/viewer-toolbar';
import { ViewerToolbarGroupDirection } from './components/viewer-toolbar-group/viewer-toolbar-group';
import { ViewerDomRendererDrawMode } from './components/viewer-dom-renderer/viewer-dom-renderer';
import {
  ViewerIconName,
  ViewerIconSize,
} from './components/viewer-icon/viewer-icon';
import {
  ViewerToolbarDirection,
  ViewerToolbarPlacement as ViewerToolbarPlacement1,
} from './components/viewer-toolbar/viewer-toolbar';
import { ViewerToolbarGroupDirection as ViewerToolbarGroupDirection1 } from './components/viewer-toolbar-group/viewer-toolbar-group';
export namespace Components {
  interface VertexSceneTree {
    /**
     * Performs an API call to collapse all nodes in the tree.
     */
    collapseAll: () => Promise<void>;
    /**
     * Performs an API call that will collapse the node associated to the specified row or row index.
     * @param row A row, row index, or node to collapse.
     */
    collapseItem: (row: RowArg) => Promise<void>;
    /**
     * An object to configure the scene tree.
     */
    config?: Config;
    /**
     * Sets the default environment for the viewer. This setting is used for auto-configuring network hosts.  Use the `config` property for manually setting hosts.
     */
    configEnv: Environment;
    controller?: SceneTreeController;
    /**
     * Performs an API call that will deselect the item associated to the given row or row index.
     * @param row The row, row index, or node to deselect.
     */
    deselectItem: (row: RowArg) => Promise<void>;
    /**
     * Performs an API call to expand all nodes in the tree.
     */
    expandAll: () => Promise<void>;
    /**
     * Performs an API call that will expand the node associated to the specified row or row index.
     * @param row A row, row index, or node to expand.
     */
    expandItem: (row: RowArg) => Promise<void>;
    /**
     * Returns the row data from the given vertical client position.
     * @param clientY The vertical client position.
     * @returns A row or `undefined` if the row hasn't been loaded.
     */
    getRowAtClientY: (clientY: number) => Promise<Row>;
    /**
     * Returns a row at the given index. If the row data has not been loaded, returns `undefined`.
     * @param index The index of the row.
     * @returns A row, or `undefined` if the row hasn't been loaded.
     */
    getRowAtIndex: (index: number) => Promise<Row>;
    /**
     * Returns the row data from the given mouse or pointer event. The event must originate from this component otherwise `undefined` is returned.
     * @param event A mouse or pointer event that originated from this component.
     * @returns A row, or `undefined` if the row hasn't been loaded.
     */
    getRowForEvent: (event: MouseEvent | PointerEvent) => Promise<Row>;
    /**
     * Performs an API call that will hide the item associated to the given row or row index.
     * @param row The row, row index, or node to hide.
     */
    hideItem: (row: RowArg) => Promise<void>;
    /**
     * Schedules a render of the rows in the scene tree. Useful if any custom data in your scene tree has changed, and you want to update the row's contents.  **Note:** This is an asynchronous operation. The update may happen on the next frame.
     */
    invalidateRows: () => Promise<void>;
    /**
     * The number of offscreen rows above and below the viewport to render. Having a higher number reduces the chance of the browser not displaying a row while scrolling.
     */
    overScanCount: number;
    /**
     * A callback that is invoked immediately before a row is about to rendered. This callback can return additional data that can be bound to in a template.
     * @example ```html <script>   const tree = document.querySelector('vertex-scene-tree');   tree.rowData = (row) => {     return { func: () => console.log('row', row.name) };   } </script>  <vertex-scene-tree>   <template slot="right">     <button onclick="row.data.func">Hi</button>   </template> </vertex-scene-tree> ```
     */
    rowData?: RowDataProvider;
    /**
     * Scrolls the tree to the given row index.
     * @param index An index of the row to scroll to.
     * @param options A set of options to configure the scrolling behavior.
     */
    scrollToIndex: (index: number, options?: ScrollToOptions) => Promise<void>;
    /**
     * Scrolls the tree to an item with the given ID. If the node for the item is not expanded, the tree will expand each of its parent nodes.
     * @param itemId An ID of an item to scroll to.
     * @param options A set of options to configure the scrolling behavior.
     * @returns A promise that resolves when the operation is finished.
     */
    scrollToItem: (itemId: string, options?: ScrollToOptions) => Promise<void>;
    /**
     * Performs an API call that will select the item associated to the given row or row index.  This method supports a `recurseParent` option that allows for recursively selecting the next unselected parent node. This behavior is considered stateful. Each call to `selectItem` will track the ancestry of the passed in `rowArg`. If calling `selectItem` with a row not belonging to the ancestry of a previous selection, then this method will perform a standard selection.
     * @param row The row, row index or node to select.
     * @param options A set of options to configure selection behavior.
     */
    selectItem: (
      row: RowArg,
      { recurseParent, ...options }?: SelectItemOptions
    ) => Promise<void>;
    /**
     * Disables the default selection behavior of the tree. Can be used to implement custom selection behavior via the trees selection methods.
     * @see SceneTree.selectItem *
     * @see SceneTree.deselectItem
     */
    selectionDisabled: boolean;
    /**
     * Performs an API call that will show the item associated to the given row or row index.
     * @param row The row, row index, or node to show.
     */
    showItem: (row: RowArg) => Promise<void>;
    /**
     * Performs an API call that will either expand or collapse the node associated to the given row or row index.
     * @param row The row, row index, or node to collapse or expand.
     */
    toggleExpandItem: (row: RowArg) => Promise<void>;
    /**
     * Performs an API call that will either hide or show the item associated to the given row or row index.
     * @param row The row, row index, or node to toggle visibility.
     */
    toggleItemVisibility: (row: RowArg) => Promise<void>;
    /**
     * An instance of a `<vertex-viewer>` element. Either this property or `viewerSelector` must be set.
     */
    viewer?: HTMLVertexViewerElement | null;
    /**
     * A CSS selector that points to a `<vertex-viewer>` element. Either this property or `viewer` must be set.
     */
    viewerSelector?: string;
  }
  interface VertexSceneTreeRow {
    /**
     * A flag that disables the default interactions of this component. If disabled, you can use the event handlers to be notified when certain operations are performed by the user.
     */
    interactionsDisabled: boolean;
    /**
     * The node data that is associated to the row. Contains information related to if the node is expanded, visible, etc.
     */
    node?: Node.AsObject;
    /**
     * A flag that disables selection of the node's parent if the user selects the row multiple times. When enabled, selection of the same row multiple times will recursively select the next unselected parent until the root node is selected.
     */
    recurseParentSelectionDisabled: boolean;
    /**
     * A reference to the scene tree to perform operations for interactions. Such as expansion, visibility and selection.
     */
    tree?: HTMLVertexSceneTreeElement;
  }
  interface VertexViewer {
    /**
     * Enables or disables the default mouse and touch interactions provided by the viewer. Enabled by default.
     */
    cameraControls: boolean;
    /**
     * The Client ID associated with your Vertex Application.
     */
    clientId?: string;
    /**
     * An object or JSON encoded string that defines configuration settings for the viewer.
     */
    config?: Config | string;
    /**
     * Sets the default environment for the viewer. This setting is used for auto-configuring network hosts.  Use the `config` property for manually setting hosts.
     * @see Viewer.config
     */
    configEnv: Environment;
    /**
     * @private For internal use only.
     */
    dispatchFrameDrawn: (frame: Frame.Frame) => Promise<void>;
    getBaseInteractionHandler: () => Promise<
      BaseInteractionHandler | undefined
    >;
    getFrame: () => Promise<Frame.Frame | undefined>;
    getInteractionHandlers: () => Promise<InteractionHandler[]>;
    getJwt: () => Promise<string | undefined>;
    /**
     * @private Used for internal testing.
     */
    getStream: () => Promise<ViewerStreamApi>;
    /**
     * Returns `true` indicating that the scene is ready to be interacted with.
     */
    isSceneReady: () => Promise<boolean>;
    /**
     * Enables or disables the default keyboard shortcut interactions provided by the viewer. Enabled by default, requires `cameraControls` being enabled.
     */
    keyboardControls: boolean;
    /**
     * Loads the given scene into the viewer and return a `Promise` that resolves when the scene has been loaded. The specified scene is provided as a URN in the following format:   * `urn:vertexvis:scene:<sceneid>`
     * @param urn The URN of the resource to load.
     */
    load: (urn: string) => Promise<void>;
    /**
     * Internal API.
     * @private
     */
    registerCommand: <R, T>(
      id: string,
      factory: CommandFactory<R>,
      thisArg?: T | undefined
    ) => Promise<Disposable>;
    /**
     * Registers and initializes an interaction handler with the viewer. Returns a `Disposable` that should be used to deregister the interaction handler.  `InteractionHandler`s are used to build custom mouse and touch interactions for the viewer. Use `<vertex-viewer camera-controls="false" />` to disable the default camera controls provided by the viewer.
     * @example
     * ```
     * class CustomInteractionHandler extends InteractionHandler {
     *   private element: HTMLElement;
     *   private api: InteractionApi;
     *   public dispose(): void {
     *     this.element.removeEventListener('click', this.handleElementClick);
     *   }
     *   public initialize(element: HTMLElement, api: InteractionApi): void {
     *     this.api = api;
     *     this.element = element;
     *     this.element.addEventListener('click', this.handleElementClick);
     *   }
     *   private handleElementClick = (event: MouseEvent) => {
     *     api.tap({ x: event.clientX, y: event.clientY });
     *   };
     * }
     * const viewer = document.querySelector('vertex-viewer');
     * viewer.registerInteractionHandler(new CustomInteractionHandler());
     * ```
     * @param interactionHandler The interaction handler to register.
     * @returns A promise containing the disposable to use to deregister the handler.
     */
    registerInteractionHandler: (
      interactionHandler: InteractionHandler
    ) => Promise<Disposable>;
    /**
     * Registers a key interaction to be invoked when a specific set of keys are pressed during a `tap` event.  `KeyInteraction`s are used to build custom keyboard shortcuts for the viewer using the current state of they keyboard to determine whether the `fn` should be invoked. Use `<vertex-viewer keyboard-controls="false" />` to disable the default keyboard shortcuts provided by the viewer.
     * @example
     * ```
     * class CustomKeyboardInteraction extends KeyInteraction<TapEventDetails> {
     *   constructor(private viewer: HTMLVertexViewerElement) {}
     *   public predicate(keyState: KeyState): boolean {
     *     return keyState['Alt'];
     *   }
     *   public async fn(event: TapEventDetails) {
     *     const scene = await this.viewer.scene();
     *     const result = await scene.raycaster().hitItems(event.position);
     *     if (result.hits.length > 0) {
     *       await scene
     *         .camera()
     *         .fitTo((q) => q.withItemId(result.hits[0].itemId))
     *         .render();
     *     }
     *   }
     * }
     * ```
     * @param keyInteraction - The `KeyInteraction` to register.
     */
    registerTapKeyInteraction: (
      keyInteraction: KeyInteraction<TapEventDetails>
    ) => Promise<void>;
    /**
     * Enables or disables the default rotation interaction being changed to rotate around the mouse down location.
     */
    rotateAroundTapPoint: boolean;
    /**
     * Returns an object that is used to perform operations on the `Scene` that's currently being viewed. These operations include updating items, positioning the camera and performing hit tests.
     */
    scene: () => Promise<Scene>;
    /**
     * The default hex color or material to use when selecting items.
     */
    selectionMaterial: string | ColorMaterial;
    /**
     * Property used for internals or testing.
     * @private
     */
    sessionId?: string;
    /**
     * A URN of the scene resource to load when the component is mounted in the DOM tree. The specified resource is a URN in the following format:   * `urn:vertexvis:scene:<sceneid>`
     */
    src?: string;
    /**
     * An object or JSON encoded string that defines configuration settings for the viewer.
     */
    streamAttributes?: ViewerStreamAttributes | string;
    /**
     * Disconnects the websocket and removes any internal state associated with the scene.
     */
    unload: () => Promise<void>;
  }
  interface VertexViewerButton {}
  interface VertexViewerDefaultToolbar {
    /**
     * The duration of animations, in milliseconds. Defaults to `1000`.
     */
    animationMs: number;
    /**
     * Indicates whether animations will be used when performing camera operations. Defaults to `true`.
     */
    animationsDisabled: boolean;
    /**
     * Specifies the direction that UI elements are placed.
     */
    direction: ViewerToolbarGroupDirection;
    /**
     * Specifies where the toolbar is positioned.
     */
    placement: ViewerToolbarPlacement;
    /**
     * An instance of the viewer that operations will be performed on. If contained within a `<vertex-viewer>` element, this property will automatically be wired.
     */
    viewer?: HTMLVertexViewerElement;
  }
  interface VertexViewerDomElement {
    /**
     * Disables the billboarding behavior of the element. When billboarding is enabled, the element will always be oriented towards the screen.
     */
    billboardOff: boolean;
    /**
     * The 3D position where this element is located.
     */
    position: Vector3.Vector3;
    /**
     * The rotation of this this element, represented as a Quaternion.
     */
    quaternion: Quaternion.Quaternion;
    /**
     * The scale of this element.
     */
    scale: Vector3.Vector3;
    /**
     * The direction which this object considers up.
     */
    up: Vector3.Vector3;
  }
  interface VertexViewerDomRenderer {
    /**
     * Specifies the drawing mode for the renderer.  When in `3d` mode, elements positioned using CSS 3D transforms and are able to scale and rotate with the camera. In `2d` mode, a simpler 2D transform is used, and elements will not scale or rotate with the camera.
     */
    drawMode: ViewerDomRendererDrawMode;
    /**
     * The viewer synced to this renderer. This property will automatically be assigned if the renderer is a child of `<vertex-viewer>`.
     */
    viewer?: HTMLVertexViewerElement;
  }
  interface VertexViewerIcon {
    /**
     * The name of the icon to render.
     */
    name?: ViewerIconName;
    /**
     * The size of the icon. Can be `'sm' | 'md' | 'lg' | undefined`. Predefined sizes are set to:   * `sm`: 16px  * `md`: 24px  * `lg`: 32px  A custom size can be supplied by setting this field to `undefined` and setting `font-size` through CSS. Defaults to `md`.
     */
    size?: ViewerIconSize;
  }
  interface VertexViewerToolbar {
    direction: ViewerToolbarDirection;
    /**
     * Specifies where the toolbar is positioned.
     */
    placement: ViewerToolbarPlacement;
  }
  interface VertexViewerToolbarGroup {
    direction: ViewerToolbarGroupDirection;
  }
  interface VertexViewerViewCube {
    /**
     * The duration of the animation, in milliseconds, when a user performs a standard view interaction. Set to 0 to disable animations.
     */
    animationDuration: number;
    /**
     * Disables standard view interactions.
     */
    standardViewsDisabled: boolean;
    /**
     * An instance of the viewer to bind to.
     */
    viewer?: HTMLVertexViewerElement;
    /**
     * The label for the side of the cube on the negative x-axis.
     */
    xNegativeLabel: string;
    /**
     * The label for the side of the cube on the positive x-axis.
     */
    xPositiveLabel: string;
    /**
     * The label for the side of the cube on the negative y-axis.
     */
    yNegativeLabel: string;
    /**
     * The label for the side of the cube on the positive y-axis.
     */
    yPositiveLabel: string;
    /**
     * The label for the side of the cube on the negative z-axis.
     */
    zNegativeLabel: string;
    /**
     * The label for the side of the cube on the positive z-axis.
     */
    zPositiveLabel: string;
  }
}
declare global {
  interface HTMLVertexSceneTreeElement
    extends Components.VertexSceneTree,
      HTMLStencilElement {}
  var HTMLVertexSceneTreeElement: {
    prototype: HTMLVertexSceneTreeElement;
    new (): HTMLVertexSceneTreeElement;
  };
  interface HTMLVertexSceneTreeRowElement
    extends Components.VertexSceneTreeRow,
      HTMLStencilElement {}
  var HTMLVertexSceneTreeRowElement: {
    prototype: HTMLVertexSceneTreeRowElement;
    new (): HTMLVertexSceneTreeRowElement;
  };
  interface HTMLVertexViewerElement
    extends Components.VertexViewer,
      HTMLStencilElement {}
  var HTMLVertexViewerElement: {
    prototype: HTMLVertexViewerElement;
    new (): HTMLVertexViewerElement;
  };
  interface HTMLVertexViewerButtonElement
    extends Components.VertexViewerButton,
      HTMLStencilElement {}
  var HTMLVertexViewerButtonElement: {
    prototype: HTMLVertexViewerButtonElement;
    new (): HTMLVertexViewerButtonElement;
  };
  interface HTMLVertexViewerDefaultToolbarElement
    extends Components.VertexViewerDefaultToolbar,
      HTMLStencilElement {}
  var HTMLVertexViewerDefaultToolbarElement: {
    prototype: HTMLVertexViewerDefaultToolbarElement;
    new (): HTMLVertexViewerDefaultToolbarElement;
  };
  interface HTMLVertexViewerDomElementElement
    extends Components.VertexViewerDomElement,
      HTMLStencilElement {}
  var HTMLVertexViewerDomElementElement: {
    prototype: HTMLVertexViewerDomElementElement;
    new (): HTMLVertexViewerDomElementElement;
  };
  interface HTMLVertexViewerDomRendererElement
    extends Components.VertexViewerDomRenderer,
      HTMLStencilElement {}
  var HTMLVertexViewerDomRendererElement: {
    prototype: HTMLVertexViewerDomRendererElement;
    new (): HTMLVertexViewerDomRendererElement;
  };
  interface HTMLVertexViewerIconElement
    extends Components.VertexViewerIcon,
      HTMLStencilElement {}
  var HTMLVertexViewerIconElement: {
    prototype: HTMLVertexViewerIconElement;
    new (): HTMLVertexViewerIconElement;
  };
  interface HTMLVertexViewerToolbarElement
    extends Components.VertexViewerToolbar,
      HTMLStencilElement {}
  var HTMLVertexViewerToolbarElement: {
    prototype: HTMLVertexViewerToolbarElement;
    new (): HTMLVertexViewerToolbarElement;
  };
  interface HTMLVertexViewerToolbarGroupElement
    extends Components.VertexViewerToolbarGroup,
      HTMLStencilElement {}
  var HTMLVertexViewerToolbarGroupElement: {
    prototype: HTMLVertexViewerToolbarGroupElement;
    new (): HTMLVertexViewerToolbarGroupElement;
  };
  interface HTMLVertexViewerViewCubeElement
    extends Components.VertexViewerViewCube,
      HTMLStencilElement {}
  var HTMLVertexViewerViewCubeElement: {
    prototype: HTMLVertexViewerViewCubeElement;
    new (): HTMLVertexViewerViewCubeElement;
  };
  interface HTMLElementTagNameMap {
    'vertex-scene-tree': HTMLVertexSceneTreeElement;
    'vertex-scene-tree-row': HTMLVertexSceneTreeRowElement;
    'vertex-viewer': HTMLVertexViewerElement;
    'vertex-viewer-button': HTMLVertexViewerButtonElement;
    'vertex-viewer-default-toolbar': HTMLVertexViewerDefaultToolbarElement;
    'vertex-viewer-dom-element': HTMLVertexViewerDomElementElement;
    'vertex-viewer-dom-renderer': HTMLVertexViewerDomRendererElement;
    'vertex-viewer-icon': HTMLVertexViewerIconElement;
    'vertex-viewer-toolbar': HTMLVertexViewerToolbarElement;
    'vertex-viewer-toolbar-group': HTMLVertexViewerToolbarGroupElement;
    'vertex-viewer-view-cube': HTMLVertexViewerViewCubeElement;
  }
}
declare namespace LocalJSX {
  interface VertexSceneTree {
    /**
     * An object to configure the scene tree.
     */
    config?: Config;
    /**
     * Sets the default environment for the viewer. This setting is used for auto-configuring network hosts.  Use the `config` property for manually setting hosts.
     */
    configEnv?: Environment;
    controller?: SceneTreeController;
    onConnectionError?: (event: CustomEvent<SceneTreeErrorDetails>) => void;
    /**
     * The number of offscreen rows above and below the viewport to render. Having a higher number reduces the chance of the browser not displaying a row while scrolling.
     */
    overScanCount?: number;
    /**
     * A callback that is invoked immediately before a row is about to rendered. This callback can return additional data that can be bound to in a template.
     * @example ```html <script>   const tree = document.querySelector('vertex-scene-tree');   tree.rowData = (row) => {     return { func: () => console.log('row', row.name) };   } </script>  <vertex-scene-tree>   <template slot="right">     <button onclick="row.data.func">Hi</button>   </template> </vertex-scene-tree> ```
     */
    rowData?: RowDataProvider;
    /**
     * Disables the default selection behavior of the tree. Can be used to implement custom selection behavior via the trees selection methods.
     * @see SceneTree.selectItem *
     * @see SceneTree.deselectItem
     */
    selectionDisabled?: boolean;
    /**
     * An instance of a `<vertex-viewer>` element. Either this property or `viewerSelector` must be set.
     */
    viewer?: HTMLVertexViewerElement | null;
    /**
     * A CSS selector that points to a `<vertex-viewer>` element. Either this property or `viewer` must be set.
     */
    viewerSelector?: string;
  }
  interface VertexSceneTreeRow {
    /**
     * A flag that disables the default interactions of this component. If disabled, you can use the event handlers to be notified when certain operations are performed by the user.
     */
    interactionsDisabled?: boolean;
    /**
     * The node data that is associated to the row. Contains information related to if the node is expanded, visible, etc.
     */
    node?: Node.AsObject;
    /**
     * An event that is emitted when a user requests to expand the node. This is emitted even if interactions are disabled.
     */
    onExpandToggled?: (event: CustomEvent<void>) => void;
    /**
     * An event that is emitted when a user requests to change the node's selection state. This event is emitted even if interactions are disabled.
     */
    onSelectionToggled?: (event: CustomEvent<void>) => void;
    /**
     * An event that is emitted when a user requests to change the node's visibility. This event is emitted even if interactions are disabled.
     */
    onVisibilityToggled?: (event: CustomEvent<void>) => void;
    /**
     * A flag that disables selection of the node's parent if the user selects the row multiple times. When enabled, selection of the same row multiple times will recursively select the next unselected parent until the root node is selected.
     */
    recurseParentSelectionDisabled?: boolean;
    /**
     * A reference to the scene tree to perform operations for interactions. Such as expansion, visibility and selection.
     */
    tree?: HTMLVertexSceneTreeElement;
  }
  interface VertexViewer {
    /**
     * Enables or disables the default mouse and touch interactions provided by the viewer. Enabled by default.
     */
    cameraControls?: boolean;
    /**
     * The Client ID associated with your Vertex Application.
     */
    clientId?: string;
    /**
     * An object or JSON encoded string that defines configuration settings for the viewer.
     */
    config?: Config | string;
    /**
     * Sets the default environment for the viewer. This setting is used for auto-configuring network hosts.  Use the `config` property for manually setting hosts.
     * @see Viewer.config
     */
    configEnv?: Environment;
    /**
     * Enables or disables the default keyboard shortcut interactions provided by the viewer. Enabled by default, requires `cameraControls` being enabled.
     */
    keyboardControls?: boolean;
    /**
     * Emits an event when the connection status changes for the viewer
     */
    onConnectionChange?: (event: CustomEvent<ConnectionStatus>) => void;
    onDimensionschange?: (event: CustomEvent<Dimensions.Dimensions>) => void;
    /**
     * Emits an event whenever the user double taps or clicks a location in the viewer. The event includes the location of the first tap or click.
     */
    onDoubletap?: (event: CustomEvent<TapEventDetails>) => void;
    /**
     * Emits an event when a frame has been drawn to the viewer's canvas. The event will include details about the drawn frame, such as the `Scene` information related to the scene.
     */
    onFrameDrawn?: (event: CustomEvent<Frame.Frame>) => void;
    /**
     * Emits an event when a frame has been received by the viewer. The event will include details about the drawn frame, such as the `Scene` information related to the scene.
     */
    onFrameReceived?: (event: CustomEvent<Frame.Frame>) => void;
    /**
     * Emits an event whenever the user taps or clicks a location in the viewer and the configured amount of time passes without receiving a mouseup or touchend. The event includes the location of the tap or click.
     */
    onLongpress?: (event: CustomEvent<TapEventDetails>) => void;
    /**
     * Emits an event when the scene is ready to be interacted with.
     */
    onSceneReady?: (event: CustomEvent<void>) => void;
    /**
     * Used for internals or testing.
     * @private
     */
    onSessionidchange?: (event: CustomEvent<string>) => void;
    /**
     * Emits an event whenever the user taps or clicks a location in the viewer. The event includes the location of the tap or click.
     */
    onTap?: (event: CustomEvent<TapEventDetails>) => void;
    /**
     * Emits an event when a provided oauth2 token is about to expire, or is about to expire, causing issues with establishing a websocket connection, or performing API calls.
     */
    onTokenExpired?: (event: CustomEvent<void>) => void;
    /**
     * Enables or disables the default rotation interaction being changed to rotate around the mouse down location.
     */
    rotateAroundTapPoint?: boolean;
    /**
     * The default hex color or material to use when selecting items.
     */
    selectionMaterial?: string | ColorMaterial;
    /**
     * Property used for internals or testing.
     * @private
     */
    sessionId?: string;
    /**
     * A URN of the scene resource to load when the component is mounted in the DOM tree. The specified resource is a URN in the following format:   * `urn:vertexvis:scene:<sceneid>`
     */
    src?: string;
    /**
     * An object or JSON encoded string that defines configuration settings for the viewer.
     */
    streamAttributes?: ViewerStreamAttributes | string;
  }
  interface VertexViewerButton {}
  interface VertexViewerDefaultToolbar {
    /**
     * The duration of animations, in milliseconds. Defaults to `1000`.
     */
    animationMs?: number;
    /**
     * Indicates whether animations will be used when performing camera operations. Defaults to `true`.
     */
    animationsDisabled?: boolean;
    /**
     * Specifies the direction that UI elements are placed.
     */
    direction?: ViewerToolbarGroupDirection;
    /**
     * Specifies where the toolbar is positioned.
     */
    placement?: ViewerToolbarPlacement;
    /**
     * An instance of the viewer that operations will be performed on. If contained within a `<vertex-viewer>` element, this property will automatically be wired.
     */
    viewer?: HTMLVertexViewerElement;
  }
  interface VertexViewerDomElement {
    /**
     * Disables the billboarding behavior of the element. When billboarding is enabled, the element will always be oriented towards the screen.
     */
    billboardOff?: boolean;
    /**
     * An event that is emitted when a property of this component changes.
     */
    onPropertyChange?: (event: CustomEvent<void>) => void;
    /**
     * The 3D position where this element is located.
     */
    position?: Vector3.Vector3;
    /**
     * The rotation of this this element, represented as a Quaternion.
     */
    quaternion?: Quaternion.Quaternion;
    /**
     * The scale of this element.
     */
    scale?: Vector3.Vector3;
    /**
     * The direction which this object considers up.
     */
    up?: Vector3.Vector3;
  }
  interface VertexViewerDomRenderer {
    /**
     * Specifies the drawing mode for the renderer.  When in `3d` mode, elements positioned using CSS 3D transforms and are able to scale and rotate with the camera. In `2d` mode, a simpler 2D transform is used, and elements will not scale or rotate with the camera.
     */
    drawMode?: ViewerDomRendererDrawMode;
    /**
     * The viewer synced to this renderer. This property will automatically be assigned if the renderer is a child of `<vertex-viewer>`.
     */
    viewer?: HTMLVertexViewerElement;
  }
  interface VertexViewerIcon {
    /**
     * The name of the icon to render.
     */
    name?: ViewerIconName;
    /**
     * The size of the icon. Can be `'sm' | 'md' | 'lg' | undefined`. Predefined sizes are set to:   * `sm`: 16px  * `md`: 24px  * `lg`: 32px  A custom size can be supplied by setting this field to `undefined` and setting `font-size` through CSS. Defaults to `md`.
     */
    size?: ViewerIconSize;
  }
  interface VertexViewerToolbar {
    direction?: ViewerToolbarDirection;
    /**
     * Specifies where the toolbar is positioned.
     */
    placement?: ViewerToolbarPlacement;
  }
  interface VertexViewerToolbarGroup {
    direction?: ViewerToolbarGroupDirection;
  }
  interface VertexViewerViewCube {
    /**
     * The duration of the animation, in milliseconds, when a user performs a standard view interaction. Set to 0 to disable animations.
     */
    animationDuration?: number;
    /**
     * Disables standard view interactions.
     */
    standardViewsDisabled?: boolean;
    /**
     * An instance of the viewer to bind to.
     */
    viewer?: HTMLVertexViewerElement;
    /**
     * The label for the side of the cube on the negative x-axis.
     */
    xNegativeLabel?: string;
    /**
     * The label for the side of the cube on the positive x-axis.
     */
    xPositiveLabel?: string;
    /**
     * The label for the side of the cube on the negative y-axis.
     */
    yNegativeLabel?: string;
    /**
     * The label for the side of the cube on the positive y-axis.
     */
    yPositiveLabel?: string;
    /**
     * The label for the side of the cube on the negative z-axis.
     */
    zNegativeLabel?: string;
    /**
     * The label for the side of the cube on the positive z-axis.
     */
    zPositiveLabel?: string;
  }
  interface IntrinsicElements {
    'vertex-scene-tree': VertexSceneTree;
    'vertex-scene-tree-row': VertexSceneTreeRow;
    'vertex-viewer': VertexViewer;
    'vertex-viewer-button': VertexViewerButton;
    'vertex-viewer-default-toolbar': VertexViewerDefaultToolbar;
    'vertex-viewer-dom-element': VertexViewerDomElement;
    'vertex-viewer-dom-renderer': VertexViewerDomRenderer;
    'vertex-viewer-icon': VertexViewerIcon;
    'vertex-viewer-toolbar': VertexViewerToolbar;
    'vertex-viewer-toolbar-group': VertexViewerToolbarGroup;
    'vertex-viewer-view-cube': VertexViewerViewCube;
  }
}
export { LocalJSX as JSX };
declare module '@stencil/core' {
  export namespace JSX {
    interface IntrinsicElements {
      'vertex-scene-tree': LocalJSX.VertexSceneTree &
        JSXBase.HTMLAttributes<HTMLVertexSceneTreeElement>;
      'vertex-scene-tree-row': LocalJSX.VertexSceneTreeRow &
        JSXBase.HTMLAttributes<HTMLVertexSceneTreeRowElement>;
      'vertex-viewer': LocalJSX.VertexViewer &
        JSXBase.HTMLAttributes<HTMLVertexViewerElement>;
      'vertex-viewer-button': LocalJSX.VertexViewerButton &
        JSXBase.HTMLAttributes<HTMLVertexViewerButtonElement>;
      'vertex-viewer-default-toolbar': LocalJSX.VertexViewerDefaultToolbar &
        JSXBase.HTMLAttributes<HTMLVertexViewerDefaultToolbarElement>;
      'vertex-viewer-dom-element': LocalJSX.VertexViewerDomElement &
        JSXBase.HTMLAttributes<HTMLVertexViewerDomElementElement>;
      'vertex-viewer-dom-renderer': LocalJSX.VertexViewerDomRenderer &
        JSXBase.HTMLAttributes<HTMLVertexViewerDomRendererElement>;
      'vertex-viewer-icon': LocalJSX.VertexViewerIcon &
        JSXBase.HTMLAttributes<HTMLVertexViewerIconElement>;
      'vertex-viewer-toolbar': LocalJSX.VertexViewerToolbar &
        JSXBase.HTMLAttributes<HTMLVertexViewerToolbarElement>;
      'vertex-viewer-toolbar-group': LocalJSX.VertexViewerToolbarGroup &
        JSXBase.HTMLAttributes<HTMLVertexViewerToolbarGroupElement>;
      'vertex-viewer-view-cube': LocalJSX.VertexViewerViewCube &
        JSXBase.HTMLAttributes<HTMLVertexViewerViewCubeElement>;
    }
  }
}
