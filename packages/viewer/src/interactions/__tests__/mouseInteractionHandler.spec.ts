jest.mock('../interactionApi');
jest.mock('../mouseInteractions');

import { MouseInteractionHandler } from '../mouseInteractionHandler';
import { InteractionApi } from '../interactionApi';
import {
  PanInteraction,
  ZoomInteraction,
  RotateInteraction,
  TwistInteraction,
} from '../mouseInteractions';
import { parseConfig } from '../../config/config';

const InteractionApiMock = InteractionApi as jest.Mock<InteractionApi>;
const PanInteractionMock = PanInteraction as jest.Mock<PanInteraction>;
const ZoomInteractionMock = ZoomInteraction as jest.Mock<ZoomInteraction>;
const RotateInteractionMock = RotateInteraction as jest.Mock<RotateInteraction>;
const TwistInteractionMock = TwistInteraction as jest.Mock<TwistInteraction>;
describe(MouseInteractionHandler, () => {
  const rotateInteraction = new RotateInteractionMock();
  const zoomInteraction = new ZoomInteractionMock();
  const panInteraction = new PanInteractionMock();
  const twistInteraction = new TwistInteractionMock();
  const api = new InteractionApiMock();

  const div = document.createElement('div');
  const mouseDown = new MouseEvent('mousedown', {
    screenX: 100,
    screenY: 50,
    buttons: 1,
    bubbles: true,
  });
  const mouseMovePrimaryButton1 = new MouseEvent('mousemove', {
    screenX: 110,
    screenY: 60,
    buttons: 1,
    bubbles: true,
  });
  const mouseMovePrimaryButton2 = new MouseEvent('mousemove', {
    screenX: 115,
    screenY: 65,
    buttons: 1,
    bubbles: true,
  });
  const mouseMoveSecondaryButton1 = new MouseEvent('mousemove', {
    screenX: 110,
    screenY: 60,
    buttons: 2,
    bubbles: true,
  });
  const mouseMoveSecondaryButton2 = new MouseEvent('mousemove', {
    screenX: 115,
    screenY: 65,
    buttons: 2,
    bubbles: true,
  });
  const mouseUp = new MouseEvent('mouseup', {
    screenX: 100,
    screenY: 50,
    buttons: 1,
    bubbles: true,
  });
  const wheelEvent = new Event('wheel', ({
    deltaY: 100,
    deltaMode: 0,
  } as unknown) as EventInit);

  const config = parseConfig('platdev');
  const handler = new MouseInteractionHandler(
    () => ({
      ...config,
      interactions: {
        ...config.interactions,
        interactionDelay: 10,
      },
    }),
    rotateInteraction,
    zoomInteraction,
    panInteraction,
    twistInteraction
  );

  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();

    api.pixelThreshold = jest.fn(() => 2);
    handler.setPrimaryInteractionType('rotate');
    handler.initialize(div, api);
  });

  afterEach(() => {
    handler.dispose();
  });

  it('begins a drag of primary interaction if the primary mouse has moved more than 2 pixels', async () => {
    await simulatePrimaryInteractions(50);

    expect(rotateInteraction.beginDrag).toHaveBeenCalledTimes(1);
    expect(rotateInteraction.drag).toHaveBeenCalledTimes(1);
    expect(rotateInteraction.endDrag).toHaveBeenCalledTimes(1);
  });

  it('begins a drag of pan interaction if the secondary mouse has moved more than 2 pixels', async () => {
    await simulateSecondaryInteractions(50);

    expect(panInteraction.beginDrag).toHaveBeenCalledTimes(1);
    expect(panInteraction.drag).toHaveBeenCalledTimes(1);
    expect(panInteraction.endDrag).toHaveBeenCalledTimes(1);
  });

  it('removes window listeners on mouse up', async () => {
    await simulatePrimaryInteractions(50);
    window.dispatchEvent(mouseMovePrimaryButton2);

    expect(rotateInteraction.drag).toHaveBeenCalledTimes(1);
  });

  it('zooms on wheel events', async () => {
    div.dispatchEvent(wheelEvent);

    await delay(50);

    expect(zoomInteraction.zoom).toHaveBeenCalled();
  });

  describe(MouseInteractionHandler.prototype.dispose, () => {
    it('removes mouse down event listeners', async () => {
      handler.dispose();
      await simulatePrimaryInteractions(50);

      expect(rotateInteraction.beginDrag).not.toHaveBeenCalled();
    });

    it('removes wheel listeners', async () => {
      handler.dispose();
      div.dispatchEvent(wheelEvent);

      await delay(50);

      expect(zoomInteraction.zoom).not.toHaveBeenCalled();
    });
  });

  describe(MouseInteractionHandler.prototype.setPrimaryInteractionType, () => {
    it('sets rotate interaction', async () => {
      handler.setPrimaryInteractionType('rotate');
      await simulatePrimaryInteractions(50);
      expect(rotateInteraction.beginDrag).toHaveBeenCalled();
    });

    it('sets zoom interaction', async () => {
      handler.setPrimaryInteractionType('zoom');
      await simulatePrimaryInteractions(50);
      expect(zoomInteraction.beginDrag).toHaveBeenCalled();
    });

    it('sets pan interaction', async () => {
      handler.setPrimaryInteractionType('pan');
      await simulatePrimaryInteractions(50);
      expect(panInteraction.beginDrag).toHaveBeenCalled();
    });

    it('emits event when interaction type changes', () => {
      const listener = jest.fn();
      const subscription = handler.onPrimaryInteractionTypeChange(listener);
      handler.setPrimaryInteractionType('zoom');
      subscription.dispose();
      expect(listener).toHaveBeenCalled();
    });
  });

  async function simulatePrimaryInteractions(
    interactionDelay?: number
  ): Promise<void> {
    div.dispatchEvent(mouseDown);
    window.dispatchEvent(mouseMovePrimaryButton1);
    window.dispatchEvent(mouseMovePrimaryButton2);
    await delay(interactionDelay || 0);
    window.dispatchEvent(mouseUp);
  }

  async function simulateSecondaryInteractions(
    interactionDelay?: number
  ): Promise<void> {
    div.dispatchEvent(mouseDown);
    window.dispatchEvent(mouseMoveSecondaryButton1);
    window.dispatchEvent(mouseMoveSecondaryButton2);
    await delay(interactionDelay || 0);
    window.dispatchEvent(mouseUp);
  }

  function delay(milliseconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }
});
