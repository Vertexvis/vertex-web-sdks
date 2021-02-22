/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { Config } from "./config/config";
import { Environment } from "./config/environment";
import { StreamAttributes } from "@vertexvis/stream-api";
import { TapEventDetails } from "./interactions/tapEventDetails";
import { Frame } from "./types";
import { ConnectionStatus } from "./components/viewer/viewer";
import { Dimensions } from "@vertexvis/geometry";
import { Disposable } from "@vertexvis/utils";
import { CommandFactory } from "./commands/command";
import { InteractionHandler } from "./interactions/interactionHandler";
import { KeyInteraction } from "./interactions/keyInteraction";
import { Scene } from "./scenes/scene";
export namespace Components {
    interface SvgIcon {
    }
    interface VertexViewer {
        /**
          * Enables or disables the default mouse and touch interactions provided by the viewer. Enabled by default.
         */
        "cameraControls": boolean;
        /**
          * The Client ID associated with your Vertex Application.
         */
        "clientId"?: string;
        /**
          * An object or JSON encoded string that defines configuration settings for the viewer.
         */
        "config"?: Config | string;
        /**
          * Sets the default environment for the viewer. This setting is used for auto-configuring network hosts.  Use the `config` property for manually setting hosts.
          * @see Viewer.config
         */
        "configEnv": Environment;
        "getFrame": () => Promise<Frame.Frame | undefined>;
        "getInteractionHandlers": () => Promise<InteractionHandler[]>;
        "getJwt": () => Promise<string | undefined>;
        /**
          * Enables or disables the default keyboard shortcut interactions provided by the viewer. Enabled by default, requires `cameraControls` being enabled.
         */
        "keyboardControls": boolean;
        /**
          * Loads the given scene into the viewer and return a `Promise` that resolves when the scene has been loaded. The specified scene is provided as a URN in the following format:   * `urn:vertexvis:scene:<sceneid>`
          * @param urn The URN of the resource to load.
         */
        "load": (urn: string) => Promise<void>;
        /**
          * Internal API.
          * @private
         */
        "registerCommand": <R, T>(id: string, factory: CommandFactory<R>, thisArg?: T | undefined) => Promise<Disposable>;
        /**
          * Registers and initializes an interaction handler with the viewer. Returns a `Disposable` that should be used to deregister the interaction handler.  `InteractionHandler`s are used to build custom mouse and touch interactions for the viewer. Use `<vertex-viewer camera-controls="false" />` to disable the default camera controls provided by the viewer.
          * @example class CustomInteractionHandler extends InteractionHandler {   private element: HTMLElement;   private api: InteractionApi;    public dispose(): void {     this.element.removeEventListener('click', this.handleElementClick);   }    public initialize(element: HTMLElement, api: InteractionApi): void {     this.api = api;     this.element = element;     this.element.addEventListener('click', this.handleElementClick);   }    private handleElementClick = (event: MouseEvent) => {     api.tap({ x: event.clientX, y: event.clientY });   } }  const viewer = document.querySelector("vertex-viewer"); viewer.registerInteractionHandler(new CustomInteractionHandler);
          * @param interactionHandler The interaction handler to register.
          * @returns - A promise containing the disposable to use to deregister the handler.
         */
        "registerInteractionHandler": (interactionHandler: InteractionHandler) => Promise<Disposable>;
        /**
          * Registers a key interaction to be invoked when a specific set of keys are pressed during a `tap` event.  `KeyInteraction`s are used to build custom keyboard shortcuts for the viewer using the current state of they keyboard to determine whether the `fn` should be invoked. Use `<vertex-viewer keyboard-controls="false" />` to disable the default keyboard shortcuts provided by the viewer.
          * @example class CustomKeyboardInteraction extends KeyInteraction<TapEventDetails> {   constructor(private viewer: HTMLVertexViewerElement) {}    public predicate(keyState: KeyState): boolean {     return keyState['Alt'];   }    public async fn(event: TapEventDetails) {     const scene = await this.viewer.scene();     const result = await scene.raycaster().hitItems(event.position);      if (result.hits.length > 0) {       await scene         .camera()         .fitTo(q => q.withItemId(result.hits[0].itemId))         .render();     }   } }
          * @param keyInteraction - The `KeyInteraction` to register.
         */
        "registerTapKeyInteraction": (keyInteraction: KeyInteraction<TapEventDetails>) => Promise<void>;
        /**
          * Returns an object that is used to perform operations on the `Scene` that's currently being viewed. These operations include updating items, positioning the camera and performing hit tests.
         */
        "scene": () => Promise<Scene>;
        /**
          * Property used for internals or testing.
          * @private
         */
        "sessionId"?: string;
        /**
          * A URN of the scene resource to load when the component is mounted in the DOM tree. The specified resource is a URN in the following format:   * `urn:vertexvis:scene:<sceneid>`
         */
        "src"?: string;
        /**
          * An object or JSON encoded string that defines configuration settings for the viewer.
         */
        "streamAttributes"?: StreamAttributes | string;
        /**
          * Disconnects the websocket and removes any internal state associated with the scene.
         */
        "unload": () => Promise<void>;
    }
    interface VertexViewerButton {
    }
    interface VertexViewerDefaultToolbar {
        "viewer"?: HTMLVertexViewerElement;
    }
    interface VertexViewerToolbar {
    }
    interface VertexViewerToolbarGroup {
    }
}
declare global {
    interface HTMLSvgIconElement extends Components.SvgIcon, HTMLStencilElement {
    }
    var HTMLSvgIconElement: {
        prototype: HTMLSvgIconElement;
        new (): HTMLSvgIconElement;
    };
    interface HTMLVertexViewerElement extends Components.VertexViewer, HTMLStencilElement {
    }
    var HTMLVertexViewerElement: {
        prototype: HTMLVertexViewerElement;
        new (): HTMLVertexViewerElement;
    };
    interface HTMLVertexViewerButtonElement extends Components.VertexViewerButton, HTMLStencilElement {
    }
    var HTMLVertexViewerButtonElement: {
        prototype: HTMLVertexViewerButtonElement;
        new (): HTMLVertexViewerButtonElement;
    };
    interface HTMLVertexViewerDefaultToolbarElement extends Components.VertexViewerDefaultToolbar, HTMLStencilElement {
    }
    var HTMLVertexViewerDefaultToolbarElement: {
        prototype: HTMLVertexViewerDefaultToolbarElement;
        new (): HTMLVertexViewerDefaultToolbarElement;
    };
    interface HTMLVertexViewerToolbarElement extends Components.VertexViewerToolbar, HTMLStencilElement {
    }
    var HTMLVertexViewerToolbarElement: {
        prototype: HTMLVertexViewerToolbarElement;
        new (): HTMLVertexViewerToolbarElement;
    };
    interface HTMLVertexViewerToolbarGroupElement extends Components.VertexViewerToolbarGroup, HTMLStencilElement {
    }
    var HTMLVertexViewerToolbarGroupElement: {
        prototype: HTMLVertexViewerToolbarGroupElement;
        new (): HTMLVertexViewerToolbarGroupElement;
    };
    interface HTMLElementTagNameMap {
        "svg-icon": HTMLSvgIconElement;
        "vertex-viewer": HTMLVertexViewerElement;
        "vertex-viewer-button": HTMLVertexViewerButtonElement;
        "vertex-viewer-default-toolbar": HTMLVertexViewerDefaultToolbarElement;
        "vertex-viewer-toolbar": HTMLVertexViewerToolbarElement;
        "vertex-viewer-toolbar-group": HTMLVertexViewerToolbarGroupElement;
    }
}
declare namespace LocalJSX {
    interface SvgIcon {
    }
    interface VertexViewer {
        /**
          * Enables or disables the default mouse and touch interactions provided by the viewer. Enabled by default.
         */
        "cameraControls"?: boolean;
        /**
          * The Client ID associated with your Vertex Application.
         */
        "clientId"?: string;
        /**
          * An object or JSON encoded string that defines configuration settings for the viewer.
         */
        "config"?: Config | string;
        /**
          * Sets the default environment for the viewer. This setting is used for auto-configuring network hosts.  Use the `config` property for manually setting hosts.
          * @see Viewer.config
         */
        "configEnv"?: Environment;
        /**
          * Enables or disables the default keyboard shortcut interactions provided by the viewer. Enabled by default, requires `cameraControls` being enabled.
         */
        "keyboardControls"?: boolean;
        /**
          * Emits an event when the connection status changes for the viewer
         */
        "onConnectionChange"?: (event: CustomEvent<ConnectionStatus>) => void;
        "onDimensionschange"?: (event: CustomEvent<Dimensions.Dimensions>) => void;
        /**
          * Emits an event whenever the user double taps or clicks a location in the viewer. The event includes the location of the first tap or click.
         */
        "onDoubletap"?: (event: CustomEvent<TapEventDetails>) => void;
        /**
          * Emits an event when a frame has been drawn to the viewer's canvas. The event will include details about the drawn frame, such as the `Scene` information related to the scene.
         */
        "onFrameDrawn"?: (event: CustomEvent<Frame.Frame>) => void;
        /**
          * Emits an event when a frame has been received by the viewer. The event will include details about the drawn frame, such as the `Scene` information related to the scene.
         */
        "onFrameReceived"?: (event: CustomEvent<Frame.Frame>) => void;
        /**
          * Emits an event whenever the user taps or clicks a location in the viewer and the configured amount of time passes without receiving a mouseup or touchend. The event includes the location of the tap or click.
         */
        "onLongpress"?: (event: CustomEvent<TapEventDetails>) => void;
        /**
          * Emits an event when the scene is ready to be interacted with.
         */
        "onSceneReady"?: (event: CustomEvent<void>) => void;
        /**
          * Used for internals or testing.
          * @private
         */
        "onSessionidchange"?: (event: CustomEvent<string>) => void;
        /**
          * Emits an event whenever the user taps or clicks a location in the viewer. The event includes the location of the tap or click.
         */
        "onTap"?: (event: CustomEvent<TapEventDetails>) => void;
        /**
          * Emits an event when a provided oauth2 token is about to expire, or is about to expire, causing issues with establishing a websocket connection, or performing API calls.
         */
        "onTokenExpired"?: (event: CustomEvent<void>) => void;
        /**
          * Property used for internals or testing.
          * @private
         */
        "sessionId"?: string;
        /**
          * A URN of the scene resource to load when the component is mounted in the DOM tree. The specified resource is a URN in the following format:   * `urn:vertexvis:scene:<sceneid>`
         */
        "src"?: string;
        /**
          * An object or JSON encoded string that defines configuration settings for the viewer.
         */
        "streamAttributes"?: StreamAttributes | string;
    }
    interface VertexViewerButton {
    }
    interface VertexViewerDefaultToolbar {
        "viewer"?: HTMLVertexViewerElement;
    }
    interface VertexViewerToolbar {
    }
    interface VertexViewerToolbarGroup {
    }
    interface IntrinsicElements {
        "svg-icon": SvgIcon;
        "vertex-viewer": VertexViewer;
        "vertex-viewer-button": VertexViewerButton;
        "vertex-viewer-default-toolbar": VertexViewerDefaultToolbar;
        "vertex-viewer-toolbar": VertexViewerToolbar;
        "vertex-viewer-toolbar-group": VertexViewerToolbarGroup;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "svg-icon": LocalJSX.SvgIcon & JSXBase.HTMLAttributes<HTMLSvgIconElement>;
            "vertex-viewer": LocalJSX.VertexViewer & JSXBase.HTMLAttributes<HTMLVertexViewerElement>;
            "vertex-viewer-button": LocalJSX.VertexViewerButton & JSXBase.HTMLAttributes<HTMLVertexViewerButtonElement>;
            "vertex-viewer-default-toolbar": LocalJSX.VertexViewerDefaultToolbar & JSXBase.HTMLAttributes<HTMLVertexViewerDefaultToolbarElement>;
            "vertex-viewer-toolbar": LocalJSX.VertexViewerToolbar & JSXBase.HTMLAttributes<HTMLVertexViewerToolbarElement>;
            "vertex-viewer-toolbar-group": LocalJSX.VertexViewerToolbarGroup & JSXBase.HTMLAttributes<HTMLVertexViewerToolbarGroupElement>;
        }
    }
}
