import React, { useEffect, useRef } from 'react';

const VideoPlayer = ({ stream, isLocal, username }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // TODO: will show real video once WebRTC is implemented in Module 3.
    if (videoRef.current && stream instanceof MediaStream) {
      videoRef.current.srcObject = stream;
    } else if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [stream]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#000',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isLocal}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: isLocal ? 'scaleX(-1)' : 'none',
        }}
      />
      {!stream && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            background: 'rgba(0, 0, 0, 0.6)',
            textAlign: 'center',
            padding: '12px',
            boxSizing: 'border-box',
          }}
        >
          <div>
            <div style={{ fontWeight: 600 }}>{username || (isLocal ? 'You' : 'User')}</div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>Waiting for stream</div>
          </div>
        </div>
      )}
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          background: 'rgba(0,0,0,0.5)',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
        }}
      >
        {username || (isLocal ? 'You' : 'User')}
      </div>
    </div>
  );
};

export default VideoPlayer;
