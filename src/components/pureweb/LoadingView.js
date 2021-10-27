import React from 'react';
import { LaunchStatusType, StreamerStatus } from '@pureweb/platform-sdk';
import Loading from '../Html/Home/Loading';

function LoadingView(props) {
  if (
    props.StreamerStatus === StreamerStatus.Connected ||
    props.StreamerStatus === StreamerStatus.Completed
  ) {
    return <div />;
  }
  let content;
  if (props.StreamerStatus === StreamerStatus.NotSupported) {
    content = (
      <div>
        <h3>
          Your browser does not support the necessary WebRTC capabilities.
        </h3>
      </div>
    );
  }
  if (
    props.LaunchRequestStatus.status === LaunchStatusType.Unavailable ||
    props.LaunchRequestStatus.status === LaunchStatusType.Error ||
    props.StreamerStatus === StreamerStatus.Failed
  ) {
    content = (
      <div>
        <h3>The experience is presently unavailable.</h3>
        <h3>Please refresh to request a new session.</h3>
      </div>
    );
  } else {
    content = (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div style={{ textAlign: 'center' }}>{content}</div>
    </div>
  );
}

export default LoadingView;
