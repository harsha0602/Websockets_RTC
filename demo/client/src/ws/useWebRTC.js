import { useState, useCallback } from 'react';

// Starter version: WebRTC is intentionally stubbed for Module 3 Phase 2.
// Follow steps 9-11 to implement local media, peer connections, and controls.

export const useWebRTC = (roomId, sendMessage) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const joinCall = useCallback(() => {
    console.warn('TODO: implement joinCall (Module 3 - Steps 9-11).', {
      roomId,
    });
  }, [roomId]);

  const leaveCall = useCallback(() => {
    console.warn('TODO: implement leaveCall (Module 3 - Steps 10-11).', {
      roomId,
    });
  }, [roomId]);

  const toggleCamera = useCallback(() => {
    console.warn('TODO: implement toggleCamera (Module 3 - Step 11).');
    setIsVideoEnabled((prev) => prev);
  }, []);

  const toggleMute = useCallback(() => {
    console.warn('TODO: implement toggleMute (Module 3 - Step 11).');
    setIsAudioEnabled((prev) => prev);
  }, []);

  const handleWebRTCSignal = useCallback(
    (type, payload) => {
      console.warn(
        `TODO: handleWebRTCSignal for ${type} (Module 3 - Steps 8-11).`,
        payload
      );
    },
    []
  );

  const connectToNewUser = useCallback((userId) => {
    console.warn(
      'TODO: implement connectToNewUser (Module 3 - Steps 9-10).',
      userId
    );
  }, []);

  const removePeer = useCallback((userId) => {
    console.warn('TODO: implement removePeer (Module 3 - Steps 10-11).', {
      userId,
    });
    setRemoteStreams((prev) => prev);
  }, []);

  return {
    localStream,
    remoteStreams,
    isVideoEnabled,
    isAudioEnabled,
    joinCall,
    leaveCall,
    toggleMute,
    toggleCamera,
    handleWebRTCSignal,
    connectToNewUser,
    removePeer,
  };
};
