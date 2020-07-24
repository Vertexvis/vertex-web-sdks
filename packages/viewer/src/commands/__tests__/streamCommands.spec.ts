import { startStream, createSceneAlteration } from '../streamCommands';
import { Dimensions } from '@vertexvis/geometry';
import { createFrameStreamingClientMock } from '../../testing';
import { defaultConfig, Config } from '../../config/config';
import { Token } from '../../credentials/token';
import { UUID } from '@vertexvis/utils';
import { QueryExpression } from '../../scenes/queries';
import { OperationDefinition } from '../../scenes/operations';
import { fromHex } from '../../scenes/colorMaterial';

describe('streamCommands', () => {
  const stream = createFrameStreamingClientMock();
  const tokenProvider = (): Token => 'token';
  const config = defaultConfig as Config;
  const dimensions = Dimensions.create(100, 100);

  describe('startStream', () => {
    it('starts a stream with the provided dimensions', async () => {
      await startStream(dimensions)({
        stream,
        tokenProvider: tokenProvider,
        config,
      });

      expect(stream.startStream).toHaveBeenCalledWith({ ...dimensions });
    });
  });

  describe('createSceneAlteration', () => {
    it('sends a create alteration request with the given params', async () => {
      const sceneViewId: UUID.UUID = UUID.create();
      const sceneItemId: UUID.UUID = UUID.create();
      const suppliedId = 'some-suppliedId';
      const builtQuery: QueryExpression = {
        type: 'and',
        expressions: [
          {
            type: 'supplied-id',
            value: suppliedId,
          },
          {
            type: 'item-id',
            value: sceneItemId.toString(),
          },
        ],
      };
      const operations: OperationDefinition[] = [
        {
          operation: {
            type: 'show',
          },
        },
        {
          operation: {
            type: 'change-material',
            color: fromHex('#FF00AA'),
          },
        },
      ];
      await createSceneAlteration(
        sceneViewId,
        builtQuery,
        operations
      )({
        stream,
        tokenProvider: tokenProvider,
        config,
      });

      expect(stream.createSceneAlteration).toHaveBeenCalledWith(
        expect.objectContaining({
          operations: [
            {
              and: {
                queries: [
                  { sceneItemQuery: { suppliedId: 'some-suppliedId' } },
                  {
                    sceneItemQuery: {
                      id: { hex: sceneItemId.toString() },
                    },
                  },
                ],
              },
              operationTypes: [
                { changeVisibility: { visible: true } },
                {
                  changeMaterial: {
                    material: {
                      d: 100,
                      ka: { a: 255, b: 170, g: 0, r: 255 },
                      kd: { a: 255, b: 170, g: 0, r: 255 },
                      ke: { a: 255, b: 170, g: 0, r: 255 },
                      ks: { a: 255, b: 170, g: 0, r: 255 },
                      ns: 10,
                    },
                  },
                },
              ],
            },
          ],
          sceneViewId: { hex: sceneViewId.toString() },
        })
      );
    });
  });
});
