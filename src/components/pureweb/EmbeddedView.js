import React, { useState, useRef } from 'react';
import { StreamerStatus } from '@pureweb/platform-sdk';
import { IdleTimeout, VideoStream, System } from '@pureweb/platform-sdk-react';
import Fullscreen from 'react-full-screen';
import { Button, Icon } from 'semantic-ui-react';
import Vlanding from '../pages/Vlanding';
import Products from '../pages/Products';
import Enav from '../Html/Digitour/Enav';
import ExploreModal from '../Html/Global/modal/Explore';
import LoadingView from './LoadingView';
import MobileNav from '../Html/Global/modal/navMobile';

export default function EmbeddedView(props) {
  const videoRef = useRef(null);
  const [isFull, setIsFull] = useState(false);
  console.log(props);

  function goToLevel(level) {
    console.log(level);
    props.InputEmitter.EmitUIInteraction(level);
  }

  const goToLevelExplore = val => {
    goToLevel(val);
  };

  // Fullscreen API presently supported on iPad, but not iPhone or iPod
  const isIPhone =
    System.Browser().os === 'iOS' &&
    !window.navigator.userAgent.includes('iPad');
  return (
    <div style={{ height: '100%' }}>
      <Fullscreen enabled={isFull} onChange={isFull => setIsFull(isFull)}>
        <IdleTimeout
          Status={props.StreamerStatus}
          WarningThreshold={300}
          ExitThreshold={120}
          WarningCallback={() => setIsFull(false)}
          ExitCallback={() => window.location.reload()} // TODO: How to 'close' a contribution?
        />

        <LoadingView
          LaunchRequestStatus={props.LaunchRequestStatus}
          StreamerStatus={props.StreamerStatus}
        />
        <VideoStream
          VideoRef={videoRef}
          Emitter={props.InputEmitter}
          Stream={props.VideoStream}
          UseNativeTouchEvents={props.UseNativeTouchEvents}
          UsePointerLock={props.UsePointerLock}
          PointerLockRelease={props.PointerLockRelease}
        />

        <Button
          onClick={() => setIsFull(true)}
          style={{ position: 'absolute', top: 10, right: 10 }}
          className={
            isIPhone ||
            isFull ||
            props.StreamerStatus !== StreamerStatus.Connected
              ? 'hidden'
              : ''
          }
        >
          <Icon name='expand' />
        </Button>
        <Enav goTo={goToLevelExplore} />
        <MobileNav />
        <Vlanding Status={props.StreamerStatus} goLevel={goToLevelExplore} />
        <Products />
        <ExploreModal goTo={goToLevelExplore} />
      </Fullscreen>
    </div>
  );
}
