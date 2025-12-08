import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Starter version: lobby WebSocket wiring is stubbed.
// TODO [Module 3 - Step 3]: subscribe to ROOM_LIST_UPDATE for live lobby data.
// TODO [Module 3 - Step 4]: send CREATE_ROOM / JOIN_ROOM over WebSocket.

const LobbyPage = () => {
  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [rooms, setRooms] = useState([
    { id: 'demo-1', name: 'Sample Room A', participantCount: 2 },
    { id: 'demo-2', name: 'Sample Room B', participantCount: 1 },
  ]);
  const [selectedRoomName, setSelectedRoomName] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const ws = useRef(null);
  const nicknameRef = useRef('');

  useEffect(() => {
    nicknameRef.current = nickname;
  }, [nickname]);

  useEffect(() => {
    // TODO [Module 3 - Step 3]: open WebSocket connection and subscribe to ROOM_LIST_UPDATE.
    // For starter, no network calls are made.
    ws.current = null;
  }, []);

  const handleCreateRoom = () => {
    if (!nickname.trim()) {
      setNicknameError('Please enter a nickname first.');
      return;
    }
    setNicknameError('');
    const newRoomName = prompt('Enter new room name:');
    if (newRoomName) {
      setError('');
      console.warn(
        'TODO: implement CREATE_ROOM via WebSocket (Module 3 - Step 4).',
        { roomName: newRoomName, nickname }
      );
      // TODO: send CREATE_ROOM over WebSocket and navigate on success.
    }
  };

  const handleJoinRoom = () => {
    if (!selectedRoomName) {
      setError('Please select a room to join.');
      return;
    }
    if (!nickname.trim()) {
      setNicknameError('Please enter a nickname.');
      return;
    }
    setNicknameError('');
    setError('');
    console.warn(
      'TODO: implement JOIN_ROOM via WebSocket (Module 3 - Step 4).',
      { roomName: selectedRoomName, nickname }
    );
    // TODO: send JOIN_ROOM over WebSocket, then navigate on success.
    navigate(`/room/${selectedRoomName}`, { state: { nickname } });
  };

  return (
    <div className='lobby-grid card'>
      <section className='lobby-left'>
        <h2 className='section-title'>Welcome</h2>
        <p className='section-subtitle'>
          Pick a display name and join a study room. Later, WebSockets will keep
          this lobby live.
        </p>

        <div style={{ marginTop: 16, maxWidth: 360 }}>
          <label
            htmlFor='nickname'
            style={{ display: 'block', fontSize: 13, marginBottom: 6 }}
          >
            Nickname
          </label>
          <input
            id='nickname'
            className='input'
            placeholder='Enter your display name'
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              if (nicknameError) setNicknameError('');
            }}
          />
          {nicknameError && (
            <p style={{ color: '#d22', marginTop: 6 }}>{nicknameError}</p>
          )}
          <p className='text-muted' style={{ marginTop: 6 }}>
            This will show up in chat, reactions, and the participant list.
          </p>
        </div>
      </section>

      <section className='lobby-right card-soft'>
        <h2 className='section-title'>Available rooms</h2>
        <p className='section-subtitle'>
          {rooms.length === 0
            ? 'No active rooms. Create one to get started! (Live list arrives in Module 3 - Step 3.)'
            : 'Join an active conversation below.'}
        </p>

        <div className='room-list'>
          {rooms.map((room) => {
            const selected = room.name === selectedRoomName;
            const count = room.participantCount ?? room.participants ?? 0;
            return (
              <button
                key={room.id || room.name}
                type='button'
                className={`room-card ${selected ? 'selected' : ''}`}
                onClick={() => setSelectedRoomName(room.name)}
              >
                <div className='room-card-main'>
                  <span className='room-dot' />
                  <div>
                    <div className='room-name'>{room.name}</div>
                    <div className='room-meta'>
                      {count} participants
                    </div>
                  </div>
                </div>
                <span className='room-meta'>Join</span>
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
          <button
            type='button'
            className='btn btn-ghost btn-pill'
            onClick={handleCreateRoom}
          >
            + Create room
          </button>
          <button
            type='button'
            className='btn btn-primary btn-pill'
            onClick={handleJoinRoom}
          >
            Join selected room
          </button>
        </div>
        {error && (
          <p style={{ color: '#d22', marginTop: 8, fontSize: 13 }}>{error}</p>
        )}
      </section>
    </div>
  );
};

export default LobbyPage;
