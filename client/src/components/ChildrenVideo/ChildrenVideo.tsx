"use state"
import React, { useEffect, useRef } from 'react';

const ChildrenVideo = ({ userVideoSrc }: any) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const handleVideoRef = () => {
      if (videoRef.current && userVideoSrc instanceof MediaStream) {
        videoRef.current.srcObject = userVideoSrc;
      }
    };
    handleVideoRef();
  }, [userVideoSrc]);
console.log(userVideoSrc);

  return (
    <div className='w-5/6 h-1/4 bg-violet-400 mt-5'>
      <video ref={videoRef} autoPlay playsInline muted width="324" height="200" />
    </div>
  );
};

export default ChildrenVideo;
