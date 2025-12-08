import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useWebRTC } from '../ws/useWebRTC';
import VideoPlayer from '../components/VideoPlayer';

const RoomPage = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const nickname = location.state?.nickname || 'Anonymous';

  // Starter placeholders; real data will arrive from WebSocket in Module 3 Steps 4-7.
  // TODO [Module 3 - Step 5]: Replace placeholder chat messages with server history.
  const [messages, setMessages] = useState([
    {
      id: 'starter-1',
      sender: 'System',
      text: 'Welcome to the starter room.',
    },
    {
      id: 'starter-2',
      sender: 'Guide',
      text: 'Chat goes live in Module 3 - Step 5.',
    },
  ]);
  // TODO [Module 3 - Step 6]: Replace placeholder participants with live roster updates.
  const [participants, setParticipants] = useState(() => [
    { id: 'you', name: nickname || 'You' },
    { id: 'peer', name: 'Remote peer' },
  ]);
  const [draft, setDraft] = useState('');
  const [joinError] = useState('');
  const [typingIndicator] = useState('');

  const sendWsMessage = useCallback((type, payload) => {
    console.warn(
      'TODO: send WebSocket message (Module 3 - Steps 4-7).',
      type,
      payload
    );
  }, []);

  const {
    localStream,
    remoteStreams,
    isVideoEnabled,
    isAudioEnabled,
    joinCall,
    toggleMute,
    toggleCamera,
    handleWebRTCSignal,
    connectToNewUser,
    removePeer,
    leaveCall,
  } = useWebRTC(roomId, sendWsMessage);

  const displayRemoteStreams =
    remoteStreams && remoteStreams.length > 0
      ? remoteStreams
      : [{ id: 'demo-remote', stream: null }];

  useEffect(() => {
    // TODO [Module 3 - Step 4]: Join the room via WebSocket and request initial state.
    console.warn('TODO: join room over WebSocket.', { roomId, nickname });
    return () => {
      // TODO [Module 3 - Steps 6, 10-11]: Notify server about leaving and clean up media/signaling.
      console.warn('TODO: leave room and clean up.', { roomId });
    };
  }, [roomId, nickname]);

  useEffect(() => {
    // TODO [Module 3 - Steps 5-7]: Register WebSocket message handlers for chat, participants,
    // reactions, typing, and WebRTC signaling (handleWebRTCSignal/connectToNewUser/removePeer).
    // TODO [Module 3 - Steps 9-11]: Trigger joinCall/leaveCall and route signaling to WebRTC hook.
  }, [handleWebRTCSignal, connectToNewUser, removePeer]);

  const sendTyping = () => {
    console.warn('TODO: send TYPING indicator (Module 3 - Step 7).', {
      roomId,
      sender: nickname,
    });
  };

  const handleDraftChange = (e) => {
    setDraft(e.target.value);
    sendTyping();
  };

  const handleSend = () => {
    if (!draft.trim()) return;

    console.warn('TODO: send CHAT_MESSAGE (Module 3 - Step 5).', {
      roomId,
      text: draft,
    });
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: nickname, text: draft },
    ]);
    setDraft('');
  };

  const handleReaction = (emoji) => {
    if (!emoji) return;
    console.warn('TODO: send REACTION (Module 3 - Step 7).', {
      roomId,
      emoji,
      sender: nickname,
    });
  };

  const handleExit = () => {
    leaveCall();
    navigate('/');
  };

  return (
    <div className='room-layout'>
      <div className='room-main'>
        <div className='card' style={{ padding: 16 }}>
          <h2 className='section-title' style={{ marginBottom: 4 }}>
            Room: {roomId}
          </h2>
          {joinError && (
            <p style={{ color: '#d22', marginTop: 4, fontSize: 13 }}>
              {joinError} Redirecting to lobby...
            </p>
          )}
          <p className='section-subtitle'>
            Video, chat, reactions, and polls will all be wired to live
            WebSocket and WebRTC behavior in the later modules.
          </p>
        </div>

        <div className='card' style={{ padding: 16 }}>
          <h3 className='section-title'>Video Area</h3>
          <p className='section-subtitle'>
            Video tiles are placeholders; real streams appear after Module 3 Steps
            9-10 wire up WebRTC.
          </p>
          <div className='video-grid'>
            <div className='video-tile'>
              <VideoPlayer stream={localStream} isLocal={true} username={nickname} />
            </div>

            {displayRemoteStreams.map((peer) => {
              const participant = participants.find(
                (p) => String(p.id) === String(peer.id)
              );
              const displayName = participant
                ? participant.name
                : 'Remote peer';

              return (
                <div key={peer.id} className='video-tile'>
                  <VideoPlayer
                    stream={peer.stream}
                    isLocal={false}
                    username={displayName}
                  />
                </div>
              );
            })}
          </div>
          <div className='chat-controls-row'>
            <button
              type='button'
              className={`btn btn-pill ${
                !isAudioEnabled ? 'btn-danger' : 'btn-ghost'
              }`}
              onClick={toggleMute}
            >
              {isAudioEnabled ? 'Mute' : 'Unmute'}
            </button>

            <button
              type='button'
              className={`btn btn-pill ${
                !isVideoEnabled ? 'btn-danger' : 'btn-ghost'
              }`}
              onClick={toggleCamera}
            >
              {isVideoEnabled ? 'Stop Video' : 'Start Video'}
            </button>
            <button
              type='button'
              className='btn btn-ghost btn-pill'
              onClick={handleExit}
              style={{ color: '#d33', borderColor: '#d33' }}
            >
              Leave call
            </button>
          </div>
        </div>

        <div className='chat-card card'>
          <h3 className='section-title' style={{ marginBottom: 8 }}>
            Chat
          </h3>
          <div className='chat-messages'>
            {messages.map((m, idx) => (
              <div key={m.id || idx} className='chat-message'>
                <strong>{m.sender}:</strong> {m.text}
              </div>
            ))}
            {messages.length === 0 && (
              <div style={{ color: '#888', fontStyle: 'italic' }}>
                No messages yet.
              </div>
            )}
          </div>

          <div className='chat-input-row'>
            <input
              className='input'
              placeholder='Type a message'
              value={draft}
              onChange={handleDraftChange}
            />
            <button
              type='button'
              className='btn btn-primary btn-pill'
              onClick={handleSend}
            >
              Send
            </button>
          </div>

          {typingIndicator && (
            <div
              style={{
                marginTop: 6,
                color: '#444',
                fontSize: 12,
                background: '#f3f4f6',
                padding: '6px 10px',
                borderRadius: 8,
              }}
              aria-live='polite'
            >
              {typingIndicator}
            </div>
          )}

          <div className='reaction-row'>
            {['👍', '❤️', '😂', '🎉'].map((emoji) => (
              <button
                key={emoji}
                type='button'
                className='btn btn-xs btn-pill'
                onClick={() => handleReaction(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </div>

      <aside className='room-sidebar card-soft'>
        <h3 className='section-title'>Participants</h3>
        <div className='participant-list'>
          {participants.map((p) => (
            <div key={p.id} className='participant'>
              {p.name} {p.name === nickname ? '(You)' : ''}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default RoomPage;
