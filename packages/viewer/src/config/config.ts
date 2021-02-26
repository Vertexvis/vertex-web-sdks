import { Objects, DeepPartial } from '@vertexvis/utils';
import { Environment } from './environment';
import { Animation, Flags, Events, Interactions } from '../types';
import { FrameDeliverySettings } from '@vertexvis/stream-api';
import {
  AdaptiveRenderingSettings,
  QualityOfServiceSettings,
} from '@vertexvis/stream-api';

interface NetworkConfig {
  apiHost: string;
  renderingHost: string;
}

export interface Config {
  network: NetworkConfig;
  flags: Flags.Flags;
  events: Events.EventConfig;
  animation: Animation.AnimationConfig;
  interactions: Interactions.InteractionConfig;
  EXPERIMENTAL_frameDelivery: Omit<
    FrameDeliverySettings,
    'rateLimitingEnabled'
  >;
  EXPERIMENTAL_adaptiveRendering: Omit<AdaptiveRenderingSettings, 'enabled'>;
  EXPERIMENTAL_qualityOfService: QualityOfServiceSettings;
}

type PartialConfig = DeepPartial<Config>;

export type ConfigProvider = () => Config;

const platdevConfig: Config = {
  network: {
    apiHost: 'https://platform.platdev.vertexvis.io',
    renderingHost: 'wss://stream.platdev.vertexvis.io',
  },
  flags: Flags.defaultFlags,
  events: Events.defaultEventConfig,
  animation: Animation.defaultAnimationConfig,
  interactions: Interactions.defaultInteractionConfig,
  EXPERIMENTAL_frameDelivery: {},
  EXPERIMENTAL_adaptiveRendering: {},
  EXPERIMENTAL_qualityOfService: {},
};

const platprodConfig: Config = {
  network: {
    apiHost: 'https://platform.platprod.vertexvis.io',
    renderingHost: 'wss://stream.platprod.vertexvis.io',
  },
  flags: Flags.defaultFlags,
  events: Events.defaultEventConfig,
  animation: Animation.defaultAnimationConfig,
  interactions: Interactions.defaultInteractionConfig,
  EXPERIMENTAL_frameDelivery: {},
  EXPERIMENTAL_adaptiveRendering: {},
  EXPERIMENTAL_qualityOfService: {},
};

function getEnvironmentConfig(environment: Environment): Config {
  switch (environment) {
    case 'platdev':
      return platdevConfig;
    default:
      return platprodConfig;
  }
}

export function parseConfig(
  environment: Environment = 'platprod',
  config?: string | PartialConfig
): Config {
  if (typeof config === 'string') {
    config = JSON.parse(config) as PartialConfig;
  }

  const envConfig = getEnvironmentConfig(environment);

  if (config == null) {
    return envConfig;
  } else {
    return Objects.defaults({ ...config }, envConfig);
  }
}
