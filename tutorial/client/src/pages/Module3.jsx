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
        <p>This is the hands-on module where you will build the Realtime Study Rooms demo using WebSockets to power lobby updates, room presence, and chat. WebRTC will enter in a later module—here we focus on socket-driven collaboration features.</p>
        <p>By the end of these steps, you will have a working lobby and room experience that stays synchronized across tabs, with clear patterns you can reuse in your own projects.</p>

        <section>
          <h2>Learning Outcomes</h2>
          <ul>
            <li>Run the starter UI and confirm the baseline lobby and room routes (Feature 0).</li>
            <li>Explain the WebSocket message types that drive lobby and room state (Feature 1).</li>
            <li>Establish a single WebSocket connection per tab and identify users by nickname (Feature 2).</li>
            <li>Render a live lobby list and implement validated create/join flows with server feedback (Features 3–4).</li>
            <li>Build a synchronized room chat timeline and accurate participants list (Features 5–6).</li>
            <li>Add reactions and typing indicators to layer lightweight realtime signals onto chat (Feature 7).</li>
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
            </ul>
          </div>
        </section>

        <section>
          <h2>Build steps overview</h2>
          <p>Follow these steps to evolve the starter lobby into a fully synchronized study room experience.</p>
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
