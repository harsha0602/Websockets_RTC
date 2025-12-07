import { useState, useRef, useCallback } from 'react';

const STUN_SERVERS = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

export const useWebRTC = (roomId, sendMessage) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);

  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const peersRef = useRef({});
  const localStreamRef = useRef(null);

  const initializeMedia = useCallback(async () => {
    try {
      // Get permission on entering room
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setLocalStream(stream);
      localStreamRef.current = stream;

      return stream;
    } catch (err) {
      console.error('Error accessing media:', err);
      return null;
    }
  }, []);

  const toggleVideo = useCallback(() => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  }, []);

  const toggleAudio = useCallback(() => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
      }
    }
  }, []);

  const createPeer = useCallback(
    (targetId, initiator = false) => {
      if (peersRef.current[targetId]) return peersRef.current[targetId];

      const peer = new RTCPeerConnection(STUN_SERVERS);
      peer.iceCandidateQueue = [];

      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => {
          peer.addTrack(track, localStreamRef.current);
        });
      }

      peer.ontrack = (event) => {
        const remoteStream = event.streams[0];
        setRemoteStreams((prev) => {
          if (prev.some((p) => p.id === targetId)) return prev;
          return [...prev, { id: targetId, stream: remoteStream }];
        });
      };

      peer.onicecandidate = (event) => {
        if (event.candidate) {
          sendMessage('WEBRTC_ICE_CANDIDATE', {
            targetId,
            candidate: event.candidate,
            roomName: roomId,
          });
        }
      };

      if (initiator) {
        peer
          .createOffer()
          .then((offer) => {
            peer.setLocalDescription(offer);
            sendMessage('WEBRTC_OFFER', {
              targetId,
              sdp: offer,
              roomName: roomId,
            });
          })
          .catch((err) => console.error('Error creating offer:', err));
      }

      peersRef.current[targetId] = peer;
      return peer;
    },
    [roomId, sendMessage]
  );

  const handleWebRTCSignal = useCallback(
    async (type, payload) => {
      const { senderId, sdp, candidate } = payload;

      switch (type) {
        case 'WEBRTC_OFFER': {
          const peer = createPeer(senderId, false);
          await peer.setRemoteDescription(new RTCSessionDescription(sdp));

          while (peer.iceCandidateQueue.length > 0) {
            const c = peer.iceCandidateQueue.shift();
            await peer.addIceCandidate(new RTCIceCandidate(c));
          }

          const answer = await peer.createAnswer();
          await peer.setLocalDescription(answer);
          sendMessage('WEBRTC_ANSWER', {
            targetId: senderId,
            sdp: answer,
            roomName: roomId,
          });
          break;
        }

        case 'WEBRTC_ANSWER': {
          const peer = peersRef.current[senderId];
          if (peer) {
            await peer.setRemoteDescription(new RTCSessionDescription(sdp));
            while (peer.iceCandidateQueue.length > 0) {
              const c = peer.iceCandidateQueue.shift();
              await peer.addIceCandidate(new RTCIceCandidate(c));
            }
          }
          break;
        }

        case 'WEBRTC_ICE_CANDIDATE': {
          const peer = peersRef.current[senderId];
          if (peer) {
            if (peer.remoteDescription) {
              await peer.addIceCandidate(new RTCIceCandidate(candidate));
            } else {
              peer.iceCandidateQueue.push(candidate);
            }
          }
          break;
        }
        default:
          break;
      }
    },
    [roomId, createPeer, sendMessage]
  );

  const connectToNewUser = useCallback(
    (userId) => {
      console.log('Calling new user:', userId);
      createPeer(userId, true);
    },
    [createPeer]
  );

  const removePeer = useCallback((userId) => {
    if (peersRef.current[userId]) {
      peersRef.current[userId].close();
      delete peersRef.current[userId];
    }
    setRemoteStreams((prev) => prev.filter((p) => p.id !== userId));
  }, []);

  const leaveCall = useCallback(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }
    setLocalStream(null);

    Object.values(peersRef.current).forEach((peer) => peer.close());
    peersRef.current = {};
    setRemoteStreams([]);
  }, []);

  return {
    localStream,
    remoteStreams,
    isVideoEnabled,
    isAudioEnabled,
    initializeMedia,
    toggleVideo,
    toggleAudio,
    handleWebRTCSignal,
    connectToNewUser,
    removePeer,
    leaveCall,
  };
};
