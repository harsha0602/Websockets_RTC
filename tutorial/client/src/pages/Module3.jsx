import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Modules.css';

function StepDetail({
  id,
  stepLabel,
  title,
  goal,
  files = [],
  steps = [],
  checkpoint,
  quickCheck = [],
  hints = [],
}) {
  const [showQuickCheck, setShowQuickCheck] = useState(false);
  const [showHints, setShowHints] = useState(false);

  return (
    <section id={id} className="step-card" style={{ marginTop: '16px' }}>
      <div className="step-card-header">
        <h3>{`${stepLabel}: ${title}`}</h3>
        <span className="step-badge">{stepLabel}</span>
      </div>
      <div>
        <h4>Goal</h4>
        <p>{goal}</p>
      </div>
      {files.length > 0 && (
        <div>
          <h4>Files you will edit</h4>
          <ul>
            {files.map((file) => (
              <li key={file}>{file}</li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <h4>Steps</h4>
        <ol>
          {steps.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </div>
      <div className="note" style={{ marginTop: '12px' }}>
        <strong>Checkpoint:</strong> {checkpoint}
      </div>
      {quickCheck && quickCheck.length > 0 && (
        <div style={{ marginTop: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ margin: 0 }}>Quick check</h4>
            <button
              type="button"
              onClick={() => setShowQuickCheck((open) => !open)}
              style={{ background: 'none', border: 'none', color: '#04AA6D', cursor: 'pointer', fontWeight: 600 }}
            >
              {showQuickCheck ? 'Hide' : 'Show'}
            </button>
          </div>
          {showQuickCheck && (
            <ul>
              {quickCheck.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      {hints && hints.length > 0 && (
        <div style={{ marginTop: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ margin: 0 }}>Hints and pitfalls</h4>
            <button
              type="button"
              onClick={() => setShowHints((open) => !open)}
              style={{ background: 'none', border: 'none', color: '#04AA6D', cursor: 'pointer', fontWeight: 600 }}
            >
              {showHints ? 'Hide' : 'Show'}
            </button>
          </div>
          {showHints && (
            <ul>
              {hints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}

function Module3() {
  const steps = [
    {
      title: 'Step 0: Run the starter demo (Feature 0)',
      summary: 'Install dependencies and launch the starter lobby UI so you can see the baseline routes before adding realtime features.',
      meta: 'Est. 15-20 min',
      anchor: 'step-0',
    },
    {
      title: 'Step 1: Understand the WebSocket protocol (Feature 1)',
      summary: 'Review the message types that keep the lobby and rooms in sync so you know what the server expects and returns.',
      meta: 'Est. 25-35 min',
      anchor: 'step-1',
    },
    {
      title: 'Step 2: Connect and identify over WebSockets (Feature 2)',
      summary: 'Open one WebSocket per tab and send an identify message so the server can track each participant by nickname.',
      meta: 'Est. 45-60 min',
    },
    {
      title: 'Step 3: Realtime lobby room list (Feature 3)',
      summary: 'Subscribe to lobby updates and render rooms from live data, keeping multiple tabs in sync without refreshes.',
      meta: 'Est. 60-90 min',
    },
    {
      title: 'Step 4: Robust create/join flow (Feature 4)',
      summary: 'Validate room + nickname, surface friendly errors, and navigate into rooms only after the server confirms success.',
      meta: 'Est. 60-90 min',
    },
    {
      title: 'Step 5: Realtime chat inside a room (Feature 5)',
      summary: 'Replace placeholder chat with a synchronized message timeline powered by server echoes and saved history.',
      meta: 'Est. 90-120 min',
    },
    {
      title: 'Step 6: Live participants list (Feature 6)',
      summary: 'Keep the participants sidebar accurate as people join, leave, or close their tabs using broadcast updates.',
      meta: 'Est. 60-90 min',
    },
    {
      title: 'Step 7: Reactions and typing indicators (Feature 7)',
      summary: 'Layer lightweight realtime signals—emoji reactions and typing presence—on top of the chat experience.',
      meta: 'Est. 45-75 min',
    },
    {
      title: 'Step 8: WebRTC signaling overview (Feature 8)',
      summary: 'Design the signaling protocol and message types (offer, answer, ICE) that ride on the existing WebSocket channel.',
      meta: 'Est. 20-30 min',
      anchor: 'step-8',
    },
    {
      title: 'Step 9: Join call and show local video (Feature 9)',
      summary: 'Request camera/mic permission, create a PeerConnection, and render your own mirrored video tile.',
      meta: 'Est. 45-75 min',
      anchor: 'step-9',
    },
    {
      title: 'Step 10: Remote peers and video tiles (Feature 10)',
      summary: 'Connect participants in the same room, manage remote streams, and fill the remaining video tiles with names.',
      meta: 'Est. 60-90 min',
      anchor: 'step-10',
    },
    {
      title: 'Step 11: Media controls and cleanup (Feature 11)',
      summary: 'Hook up Mute / Toggle camera / Leave call and cleanly tear down peers and tracks when exiting.',
      meta: 'Est. 45-60 min',
      anchor: 'step-11',
    },
  ];

  const stepDetails = [
    {
      id: 'step-0',
      stepLabel: 'Step 0',
      title: 'Run the starter demo',
      goal: 'Install dependencies and run the starter backend and frontend so you can see the baseline lobby and room UI before adding realtime features.',
      files: ['demo/server', 'demo/client'],
      steps: [
        'Clone the repository locally so you have both the tutorial and demo folders.',
        'From demo/server, run npm install to set up server dependencies.',
        'From demo/client, run npm install to set up client dependencies.',
        'Start the server from demo/server with node src/index.js and leave it running.',
        'Start the client from demo/client with npm run dev and leave it running.',
        'Visit the lobby in your browser (dev server URL) and manually open /room/test-room to confirm the starter room route works.',
      ],
      checkpoint: 'Lobby page renders and /room/test-room loads without errors in the console.',
      quickCheck: [
        'Do you have both the tutorial and demo folders on your machine?',
        'Can you start demo/server with node src/index.js without errors?',
        'Can you open the lobby and /room/test-room in your browser without console errors?',
      ],
      hints: [
        'If npm install fails, double check you are in demo/server or demo/client, not the repo root.',
        'If the frontend cannot reach the backend, confirm the server is listening on the expected port.',
      ],
    },
    {
      id: 'step-1',
      stepLabel: 'Step 1',
      title: 'WebSocket protocol overview',
      goal: 'Understand the message types that keep the lobby and rooms synchronized in the Realtime Study Rooms demo.',
      files: [
        'tutorial/demo-notes.md',
        'demo/server/src/messages.js',
        'demo/server/src/index.js',
        'demo/client/src/pages/LobbyPage.jsx',
        'demo/client/src/pages/RoomPage.jsx',
        'demo/client WebSocket helper (currently inline in the pages)',
      ],
      steps: [
        'Open tutorial/demo-notes.md and skim Feature 1 to see the message shapes and meanings.',
        'Review the message type constants in demo/server/src/messages.js.',
        'In demo/server/src/index.js, find where ROOM_LIST_UPDATE, JOIN_ROOM, CHAT_MESSAGE, and related messages are handled and broadcast.',
        'In the client pages (LobbyPage and RoomPage) and WebSocket helper, locate where those messages are sent and where incoming events update UI state.',
      ],
      checkpoint: 'You can describe or sketch how a chat message travels from one browser to the server and back out to every participant in a room.',
      quickCheck: [
        'Which message types keep the lobby room list in sync?',
        'Which message types are used for joining a room and sending chat messages?',
      ],
      hints: [
        'Search in demo/server/src/index.js for where ROOM_LIST_UPDATE and CHAT_MESSAGE are handled.',
        'Compare the message constants in demo/server/src/messages.js with the messages sent from LobbyPage and RoomPage.',
      ],
    },
    {
      id: 'step-2',
      stepLabel: 'Step 2',
      title: 'Connect and identify over WebSockets',
      goal: 'Open a single WebSocket per tab and identify the user so the server can associate a nickname with each connection.',
      files: [
        'demo/server/src/index.js',
        'demo/server/src/rooms.js',
        'demo/client/src/ws/useWebSocketClient.js (or helper)',
        'demo/client/src/pages/LobbyPage.jsx',
      ],
      steps: [
        'Ensure the client opens exactly one WebSocket connection per tab and exposes a sendJsonMessage helper.',
        'Send an IDENTIFY (or similar) message with the chosen nickname right after the socket connects.',
        'On the server, store { id, name, ws } for each connection and use the nickname when creating participants.',
        'Keep the nickname accessible to the Room page (navigation state or URL params) until a shared store exists.',
      ],
      checkpoint: 'Refreshing with devtools open shows one active socket per tab and server logs like “Client <id> identified as <nickname>.”',
      quickCheck: [
        'Can you point to the single place where the WebSocket connection is opened?',
        'Where is the user\'s nickname attached to the connection on the server?',
      ],
      hints: [
        'Look for the IDENTIFY or similar message type in demo/server/src/index.js.',
        'Make sure each tab opens exactly one socket; multiple sockets per tab are a red flag.',
      ],
    },
    {
      id: 'step-3',
      stepLabel: 'Step 3',
      title: 'Realtime lobby room list',
      goal: 'Render the lobby from live room data so multiple tabs stay in sync without refreshes.',
      files: [
        'demo/server/src/rooms.js',
        'demo/server/src/index.js',
        'demo/client/src/pages/LobbyPage.jsx',
      ],
      steps: [
        'Add a helper on the server to return room summaries (name and participant count).',
        'When receiving ROOM_LIST_SUBSCRIBE, add the connection to lobby subscribers and send ROOM_LIST_UPDATE immediately.',
        'Broadcast ROOM_LIST_UPDATE whenever rooms are created or participants join/leave.',
        'In the lobby page, subscribe on mount, keep rooms state from ROOM_LIST_UPDATE, and render with empty-state handling.',
      ],
      checkpoint: 'With two tabs open, creating or closing a room in one tab updates the other within a second without manual refresh.',
      quickCheck: [
        'With two tabs on the lobby, does creating a room in one tab update the other without refresh?',
        'Does closing the last room participant eventually remove the room from the lobby?',
      ],
      hints: [
        'Search for ROOM_LIST_SUBSCRIBE and ROOM_LIST_UPDATE in both server and client.',
        'If the list does not update, add console.log in the server broadcast and client onmessage handler.',
      ],
    },
    {
      id: 'step-4',
      stepLabel: 'Step 4',
      title: 'Robust create/join flow',
      goal: 'Validate room creation and joining with friendly errors and only navigate after server confirmation.',
      files: [
        'demo/server/src/index.js',
        'demo/client/src/pages/LobbyPage.jsx',
        'demo/client/src/pages/RoomPage.jsx',
      ],
      steps: [
        'Validate room name and nickname on the client before sending create or join requests.',
        'On the server, validate CREATE_ROOM and JOIN_ROOM, replying with success payloads or ERROR messages.',
        'Handle ERROR messages in the lobby by rendering a clear message; on success, navigate to /room/:roomName.',
        'Handle failed joins in RoomPage by showing an error and redirecting back to the lobby.',
      ],
      checkpoint: 'Joining a non-existent room or leaving nickname empty shows a clear error instead of a broken room view.',
      quickCheck: [
        'What happens if you try to join a non-existent room?',
        'What happens if you leave the nickname blank and click Create room?',
      ],
      hints: [
        'Use a dedicated ERROR message type from the server and render it instead of alert().',
        'Keep all navigation to /room/:roomName behind a successful server response.',
      ],
    },
    {
      id: 'step-5',
      stepLabel: 'Step 5',
      title: 'Realtime chat inside a room',
      goal: 'Keep the room chat timeline synchronized across participants using server-echoed messages and stored history.',
      files: [
        'demo/server/src/rooms.js',
        'demo/server/src/index.js',
        'demo/client/src/pages/RoomPage.jsx',
      ],
      steps: [
        'Handle CHAT_MESSAGE on the server only for room members, append to chatHistory, and broadcast normalized payloads.',
        'Include recent chatHistory in the join success payload so new arrivals see context.',
        'On the client, initialize messages from join payload and append only on incoming chat events.',
        'Send chat input to the server and let the broadcast update the UI to keep ordering consistent.',
      ],
      checkpoint: 'Two tabs in the same room see new messages in the same order; reloading shows recent history instead of an empty chat.',
      quickCheck: [
        'Do messages appear in both tabs when you send from either side?',
        'Does reloading a tab show the last N messages instead of an empty chat?',
      ],
      hints: [
        'Only add messages to the UI when they come from the server broadcast, not when you click Send.',
        'Store messages with timestamps so you can keep ordering consistent.',
      ],
    },
    {
      id: 'step-6',
      stepLabel: 'Step 6',
      title: 'Live participants list',
      goal: 'Keep the participants sidebar accurate as users join, leave, or close their tabs.',
      files: [
        'demo/server/src/rooms.js',
        'demo/server/src/index.js',
        'demo/client/src/pages/RoomPage.jsx',
      ],
      steps: [
        'Maintain a Map of participants per room on the server and update it on join/leave/disconnect.',
        'Broadcast PARTICIPANTS_UPDATE with an array of { id, name } whenever membership changes.',
        'Update participants state in RoomPage on PARTICIPANTS_UPDATE and render the list (optionally highlight self).',
      ],
      checkpoint: 'Joining from a new tab adds a participant in other tabs; closing a tab removes that participant almost immediately.',
      quickCheck: [
        'Does the participants sidebar update when a new user joins the room?',
        'Does closing a tab remove that user from the other tab\'s list?',
      ],
      hints: [
        'Implement a getParticipantSummaries helper on the server so the client only sees id and name.',
        'If the list gets out of sync, log when PARTICIPANTS_UPDATE is sent vs. when it is received.',
      ],
    },
    {
      id: 'step-7',
      stepLabel: 'Step 7',
      title: 'Reactions and typing indicators',
      goal: 'Layer lightweight realtime signals (emoji reactions and typing presence) on top of chat.',
      files: [
        'demo/server/src/index.js',
        'demo/client/src/pages/RoomPage.jsx',
      ],
      steps: [
        'Send a REACTION message with roomName, emoji, and sender when an emoji is clicked; broadcast to the room.',
        'Send TYPING messages when the user types (with basic throttling) and show transient “X is typing...” UI.',
        'Render brief reaction feedback in the room without needing to persist reactions long term.',
      ],
      checkpoint: 'Clicking a reaction shows feedback in the other tab; typing in one tab briefly shows “X is typing...” in the other.',
      quickCheck: [
        'Click an emoji in one tab: do you see some feedback in the other tab?',
        'When one user types, does “X is typing...” appear briefly in the other tab?',
      ],
      hints: [
        'Throttle TYPING messages; sending them on every keypress can spam the server.',
        'Reactions are ephemeral; you do not need to store them in chatHistory unless you want a permanent record.',
      ],
    },
    {
      id: 'step-8',
      stepLabel: 'Step 8',
      title: 'WebRTC signaling overview',
      goal: 'Understand how WebRTC offer/answer/ICE messages ride on the existing WebSocket connection and which side sends each.',
      files: [
        'tutorial/demo-notes.md',
        'demo/server/src/messages.js',
        'demo/server/src/index.js',
        'demo/client/src/ws/useWebSocketClient.js',
        'demo/client/src/ws/useWebRTC.js',
        'demo/client/src/pages/RoomPage.jsx',
      ],
      steps: [
        'Add WEBRTC_OFFER, WEBRTC_ANSWER, and WEBRTC_ICE_CANDIDATE types to the shared messages enum used by server and client.',
        'Decide who sends which payload: the caller emits offers, the callee replies with answers, and both sides send ICE candidates as they appear.',
        'On the server, forward WEBRTC_* messages to the intended peer(s) in the same room via the existing WebSocket without parsing SDP or ICE.',
        'In the client socket handler, intercept WEBRTC_* events and pass them to useWebRTC; when a participant joins, emit offers to the newcomer.',
      ],
      checkpoint: 'You can sketch the signaling flow for a user joining: which WEBRTC_* messages move over WebSockets, who originates them, and how the server forwards them.',
      quickCheck: [
        'Which message types carry WebRTC signaling in this app?',
        'Who sends offers vs. answers when a new participant joins?',
      ],
      hints: [
        'Reuse the same sendJsonMessage helper for WEBRTC_* types; no new transport is needed.',
        'The server should only tag senderId and forward the payload; it should not interpret SDP.',
      ],
    },
    {
      id: 'step-9',
      stepLabel: 'Step 9',
      title: 'Join call and show local video',
      goal: 'Request camera/mic access, create a PeerConnection, and render your own video in the first tile once you join a call.',
      files: [
        'demo/client/src/ws/useWebRTC.js',
        'demo/client/src/components/VideoPlayer.jsx',
        'demo/client/src/pages/RoomPage.jsx',
      ],
      steps: [
        'Call navigator.mediaDevices.getUserMedia for audio/video in useWebRTC, storing the local stream in state/refs and attaching tracks to new PeerConnections.',
        'Expose helpers like initialize/join, toggleAudio, toggleVideo, handleWebRTCSignal, connectToNewUser, removePeer, and leaveCall along with local/remote stream state.',
        'After joining the room over WebSocket, wire incoming WEBRTC_* messages to handleWebRTCSignal and start offers to newcomers via connectToNewUser.',
        'Render the first video tile with the local stream using VideoPlayer, mirroring the feed for the local user and labeling it with their name.',
        'Handle permission errors gracefully (log and briefly surface a message) so the UI can redirect or disable controls if media access is denied.',
      ],
      checkpoint: 'Clicking Join call starts the camera and shows your own video in the first tile; leaving the room removes your tile and stops local tracks.',
      quickCheck: [
        'Do the Mute/Video controls stay disabled until local media is available?',
        'After clicking Join call, do you see a mirrored local video tile?',
      ],
      hints: [
        'Set video transform: scaleX(-1) for the local feed to mirror it.',
        'Only add tracks to PeerConnections after getUserMedia resolves successfully.',
      ],
    },
    {
      id: 'step-10',
      stepLabel: 'Step 10',
      title: 'Remote peers and video tiles',
      goal: 'Connect multiple participants in the same room, receive their media tracks, and render remote tiles with names.',
      files: [
        'demo/server/src/index.js',
        'demo/client/src/ws/useWebRTC.js',
        'demo/client/src/components/VideoPlayer.jsx',
        'demo/client/src/pages/RoomPage.jsx',
      ],
      steps: [
        'Create and manage one RTCPeerConnection per participant in useWebRTC, wiring onicecandidate to send WEBRTC_ICE_CANDIDATE over WebSockets and ontrack to capture incoming streams.',
        'When a participant joins, existing peers send WEBRTC_OFFER and receivers reply with WEBRTC_ANSWER, adding or queuing ICE candidates until negotiation completes.',
        'Store remote MediaStreams along with the sender/participant id so you can render them consistently.',
        'In RoomPage, render one VideoPlayer per remote stream and match stream ids to participant records to show the correct display name.',
        'On leave or disconnect, close the relevant PeerConnection, drop its stream from state, and remove the tile.',
      ],
      checkpoint: 'With two tabs in the same room, both tabs show their own video plus the other user’s video; when one tab leaves, the other removes the remote tile.',
      quickCheck: [
        'Do you see the other tab’s video after both click Join call?',
        'Does the remote tile disappear when the other tab closes or leaves?',
      ],
      hints: [
        'Use the participant id from signaling payloads to key PeerConnections and remote streams.',
        'Close RTCPeerConnection instances immediately when a participant leaves to free resources.',
      ],
    },
    {
      id: 'step-11',
      stepLabel: 'Step 11',
      title: 'Media controls and leaving the call cleanly',
      goal: 'Wire mute/toggle camera controls and tear down WebRTC state cleanly when leaving a call.',
      files: [
        'demo/client/src/ws/useWebRTC.js',
        'demo/client/src/pages/RoomPage.jsx',
      ],
      steps: [
        'Implement toggleAudio and toggleVideo in useWebRTC to enable/disable the matching tracks on the local stream and expose booleans for UI state.',
        'Connect RoomPage controls to these handlers, updating labels/styles based on isAudioEnabled and isVideoEnabled and disabling them until a local stream exists.',
        'Add a leaveCall helper that stops all local tracks, closes every RTCPeerConnection, clears refs, and resets local/remote stream state.',
        'Call leaveCall when the user clicks Leave call and in the RoomPage cleanup effect to avoid orphaned peers or active camera/mic.',
        'Optionally emit a lightweight leave signal so remote peers can drop the departing participant’s tile promptly.',
      ],
      checkpoint: 'You can mute/unmute and toggle the camera mid-call, and leaving reliably clears all tiles and releases camera/mic access in both tabs.',
      quickCheck: [
        'Do the mute/video buttons reflect the current track state?',
        'After leaving the room, is the camera light off and are remote tiles removed?',
      ],
      hints: [
        'Toggle the track.enabled flag instead of removing tracks to keep negotiation simple.',
        'Run leaveCall from useEffect cleanup to cover navigation away or tab closes.',
      ],
    },
  ];

  const handleCardClick = (anchor) => {
    if (!anchor) return;
    const el = document.getElementById(anchor);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="module-container">
      <nav className="sidebar">
        <h2>Real-Time Web</h2>
        <Link to="/" className="sidebar-link">Home</Link>
        <Link to="/module1" className="sidebar-link">Module 1: History and Fundamentals</Link>
        <Link to="/module2" className="sidebar-link">Module 2: Analysis</Link>
        <Link to="/module3" className="sidebar-link active">Module 3: Hands-on work</Link>
      </nav>

      <main className="main-content">
        <h1>Module 3: Building the Realtime Study Rooms demo</h1>
        <p>This is the hands-on module where you will build the Realtime Study Rooms demo: start with WebSockets for lobby updates, presence, and chat, then layer WebRTC on the same signaling channel to add video inside each room.</p>
        <p>By the end of these steps, you will have a synchronized lobby and room experience plus a basic video call with media controls that you can reuse in your own projects.</p>

        <section>
          <h2>Learning Outcomes</h2>
          <ul>
            <li>Run the starter UI and confirm the baseline lobby and room routes (Feature 0).</li>
            <li>Explain the WebSocket message types that drive lobby and room state (Feature 1).</li>
            <li>Establish a single WebSocket connection per tab and identify users by nickname (Feature 2).</li>
            <li>Render a live lobby list and implement validated create/join flows with server feedback (Features 3–4).</li>
            <li>Build a synchronized room chat timeline and accurate participants list (Features 5–6).</li>
            <li>Add reactions and typing indicators to layer lightweight realtime signals onto chat (Feature 7).</li>
            <li>Understand WebRTC signaling messages and how they ride on the WebSocket transport (Feature 8).</li>
            <li>Join a call and render your local camera feed in the first video tile (Feature 9).</li>
            <li>Establish peer connections so remote participants appear as additional video tiles (Feature 10).</li>
            <li>Wire Mute / Toggle camera / Leave call buttons to real media controls and teardown logic (Feature 11).</li>
          </ul>
        </section>

        <section>
          <h2>Prerequisites</h2>
          <div className="note">
            <p>Before starting, make sure you have:</p>
            <ul>
              <li>Completed Module 1 (fundamentals) and Module 2 (analysis).</li>
              <li>Node.js and npm installed locally.</li>
              <li>The starter UI running from Feature 0 so you can iterate quickly.</li>
              <li>A working lobby, chat, and presence flow from Steps 0-7 before adding video.</li>
              <li>A machine with camera/microphone access and permission to use them in the browser.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2>Build steps overview</h2>
          <p>Follow these steps to evolve the starter lobby into a synchronized study room experience and then layer in WebRTC video.</p>
          <div className="step-grid">
            {steps.map((step) => (
              <div
                key={step.title}
                className="step-card"
                onClick={() => handleCardClick(step.anchor)}
                style={step.anchor ? { cursor: 'pointer' } : undefined}
              >
                <div className="step-card-header">
                  <h3>{step.title}</h3>
                  <span className="step-badge">{step.meta}</span>
                </div>
                <p>{step.summary}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '28px' }}>
          <h2>Detailed walkthrough</h2>
          <p>Use these notes when you are ready to implement each step. They line up with the demo notes and keep you anchored to the goals and checkpoints.</p>
          {stepDetails.map((detail) => (
            <StepDetail key={detail.id} {...detail} />
          ))}
        </section>

        <div className="nav-buttons">
          <Link to="/module2" className="nav-btn">← Back to Module 2</Link>
          <Link to="/" className="nav-btn next">Return Home →</Link>
        </div>
      </main>
    </div>
  );
}

export default Module3;
