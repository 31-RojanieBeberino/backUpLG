/**
 * When developing take care to:
 *  - Retain user interaction to begin audio.
 *  - Understand video sizing and mobile screen orientation.
 */
import {
  PlatformNext,
  UndefinedModelDefinition,
  DefaultStreamerOptions,
  StreamerStatus,
} from '@pureweb/platform-sdk';
import {
  useStreamer,
  useLaunchRequest,
  System,
} from '@pureweb/platform-sdk-react';
import * as qs from 'query-string';
import React, { useEffect, useState } from 'react';

import useAsyncEffect from 'use-async-effect';
import clientConfig from '../../client.json';
import Landing from '../pages/Landing';
import './App.css';
import { LaunchView } from './Launch';

import logger from '../../Log';

import EmbeddedView from './EmbeddedView';

const client = clientConfig;

class ClientOptions {
  constructor() {
    // Overridable streamer options
    this.ForceRelay = false;
  }
  isValid() {
    if (!this.ProjectId) {
      return false;
    }
    if (!this.ModelId) {
      return false;
    }
    return true;
  }
}

// Initialize audio.
// load() must be called from a user interaction, especially to retain iOS audio
// this can be 'mouseup', 'touchend' or 'keypress'
// Pass the audioStream created from useStreamer as the srcObject to play game audio.
const audio = new Audio();
audio.autoplay = true;
audio.volume = 0.5;
// Parse query parameters
const query = qs.parse(window.location.search);
const clientOptions = new ClientOptions();
clientOptions.LaunchType = query['launchType'] ?? client.launchType;
clientOptions.Endpoint = query['endpoint'] ?? client.endpoint;
clientOptions.ProjectId = query['projectId'] ?? client.projectId;
clientOptions.ModelId = query['modelId'] ?? client.modelId;
clientOptions.Version = query['version'] ?? client.version;
clientOptions.EnvironmentId = query['environmentId'] ?? client.environmentId;
// use client json config if usePointerLock query string parameter is undefined, else use query string parameter. Default to false if non are present
clientOptions.UsePointerLock =
  (query['usePointerLock'] === undefined
    ? client.usePointerLock
    : query['usePointerLock'] === 'false') ?? false;
// release the pointer lock on mouse up if true
clientOptions.PointerLockRelease =
  (query['pointerLockRelease'] === undefined
    ? client.pointerLockRelease
    : query['pointerLockRelease'] === 'false') ?? false;
clientOptions.ForceRelay = query['forceRelay'] !== undefined ?? false;
clientOptions.UseNativeTouchEvents =
  (query['useNativeTouchEvents'] === undefined
    ? client.useNativeTouchEvents
    : query['useNativeTouchEvents'] === 'true') ?? false;
// Initialize platform reference
const platform = new PlatformNext();
platform.initialize({
  endpoint: clientOptions.Endpoint || 'https://api.pureweb.io',
});
const App = ({ responseHandler, openPopupHandler }) => {
  const [modelDefinitionUnavailable, setModelDefinitionUnavailable] =
    useState(false);
  const [modelDefinition, setModelDefinition] = useState(
    new UndefinedModelDefinition()
  );
  const [availableModels, setAvailableModels] = useState();
  const [launchRequestError, setLaunchRequestError] = useState();
  //   const [gameResponse, setGameResponse] = useState('');

  const streamerOptions = DefaultStreamerOptions;
  useAsyncEffect(async () => {
    if (clientOptions.ProjectId) {
      logger.info('Initializing available models: ' + clientOptions.ProjectId);
      try {
        await platform.useAnonymousCredentials(
          clientOptions.ProjectId,
          clientOptions.EnvironmentId
        );
        await platform.connect();
        logger.info('Agent Connected: ' + platform.agent.id);
        streamerOptions.iceServers =
          platform.agent.serviceCredentials.iceServers;
        streamerOptions.forceRelay = clientOptions.ForceRelay;
        const models = await platform.getModels();
        setAvailableModels(models);
        logger.debug('Available models', models);
      } catch (err) {
        logger.error(err);
      }
    }
  }, [clientOptions]);

  useEffect(() => {
    if (availableModels?.length) {
      const selectedModels = availableModels.filter(function (model) {
        if (clientOptions.ModelId === model.id) {
          // If there is a version specified and we encounter it
          if (
            clientOptions.Version &&
            clientOptions.Version === model.version
          ) {
            return true;
          }
          // If there is no version specified and we find the primary version
          if (!clientOptions.Version && model.active) {
            return true;
          }
        }
        return false;
      });
      if (selectedModels?.length) {
        setModelDefinition(selectedModels[0]);
      } else {
        setModelDefinitionUnavailable(true);
      }
    }
  }, [availableModels]);

  const launchRequestOptions = { regionOverride: query['regionOverride'] };
  const [status, launchRequest, queueLaunchRequest] = useLaunchRequest(
    platform,
    modelDefinition,
    launchRequestOptions
  );
  const [streamerStatus, emitter, videoStream, audioStream, messageSubject] =
    useStreamer(platform, launchRequest, streamerOptions);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (streamerStatus === StreamerStatus.Failed) {
      platform.disconnect();
    }
  }, [streamerStatus]);
  if (audioStream) {
    audio.srcObject = audioStream;
  }
  const launch = async () => {
    setLoading(true);
    audio.load();
    if (clientOptions.LaunchType !== 'local') {
      try {
        await queueLaunchRequest();
      } catch (err) {
        setLaunchRequestError(err);
      }
    }
  };
  // Log status messages
  useEffect(() => {
    logger.info('Status', status, streamerStatus);
  }, [status, streamerStatus]);
  // Subscribe to game messages
  useEffect(() => {
    const subscription = messageSubject.subscribe(
      value => {
        responseHandler(value);
        openPopupHandler(value);

        logger.info('Message: ' + value);
      },
      err => {
        logger.error(err);
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  }, [messageSubject, responseHandler, openPopupHandler]);
  // Notify user of missing or errors in configuration
  if (!clientOptions.isValid()) {
    return (
      <div
        style={{
          display: 'flex',
          height: '100%',
          overflow: 'none',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p>
          Your client has one or more configuration errors. Please consult the{' '}
          <a href='https://www.npmjs.com/package/@pureweb/cra-template-pureweb-client'>
            {' '}
            README{' '}
          </a>{' '}
          for details on how to configure the client template.
        </p>
      </div>
    );
  }
  if (modelDefinitionUnavailable) {
    return (
      <div
        style={{
          display: 'flex',
          height: '100%',
          overflow: 'none',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span>The model that you have requested does not exist</span>
      </div>
    );
  }
  if (launchRequestError) {
    return (
      <div
        style={{
          display: 'flex',
          height: '100%',
          overflow: 'none',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span>
          {process.env.NODE_ENV === 'development'
            ? `There was an error with the launch request: ${launchRequestError}`
            : 'It appears the requested model is currently not online as per your set schedule. Please contact support if it should be available.'}
        </span>
      </div>
    );
  }
  // Begin connection
  if (streamerStatus === StreamerStatus.Disconnected) {
    return (
      <div
        style={{
          display: 'flex',
          height: '100%',
          overflow: 'none',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h2>Disconnected from stream</h2>
      </div>
    );
  }
  if (streamerStatus === StreamerStatus.Failed) {
    return (
      <div
        style={{
          display: 'flex',
          height: '100%',
          overflow: 'none',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h2>Failure during stream</h2>
        <h2>Please refresh to request a new session</h2>
      </div>
    );
  }
  if (streamerStatus === StreamerStatus.Withdrawn) {
    return (
      <div
        style={{
          display: 'flex',
          height: '100%',
          overflow: 'none',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h2>Streamer contribution withdrawn</h2>
      </div>
    );
  }
  if (loading) {
    return (
      <EmbeddedView
        VideoStream={videoStream}
        StreamerStatus={streamerStatus}
        LaunchRequestStatus={status}
        InputEmitter={emitter}
        UseNativeTouchEvents={clientOptions.UseNativeTouchEvents}
        UsePointerLock={clientOptions.UsePointerLock}
        PointerLockRelease={clientOptions.PointerLockRelease}
      />
    );
  } else if (clientOptions.LaunchType !== 'local' && !availableModels) {
    return (
      <div>
        <Landing />
      </div>
    );
  } else if (clientOptions.LaunchType !== 'local' && !availableModels?.length) {
    return (
      <div
        style={{
          display: 'flex',
          height: '100%',
          overflow: 'none',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h2>No models are currently available in this environment.</h2>
      </div>
    );
  } else {
    return <LaunchView Launch={launch} />;
  }
};

const DigiTour = ({ openPopupHandler, responseHandler }) => {
  return System.IsBrowserSupported() ? (
    <App
      openPopupHandler={openPopupHandler}
      responseHandler={responseHandler}
    />
  ) : (
    <div className='ui red segment center aligned basic'>
      <h2 className='header'>Your browser is currently unsupported</h2>
    </div>
  );
};
export default DigiTour;
