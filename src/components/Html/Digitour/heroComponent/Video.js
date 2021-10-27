import React, { useRef, useEffect } from 'react';

export default function Video({ url }) {
  const videoRef = useRef();
  const previousUrl = useRef(url);

  useEffect(() => {
    if (previousUrl.current === url) {
      return;
    }

    if (videoRef.current) {
      videoRef.current.load();
    }

    previousUrl.current = url;
  }, [url]);
  return (
    <>
      <div className='overlayBgVideo'></div>
      <video ref={videoRef} className='VlangdingVidbg' autoPlay muted loop>
        <source src={url} type='video/mp4' />
      </video>
    </>
  );
}
