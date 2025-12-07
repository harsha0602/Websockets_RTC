import React from 'react';
import { Link } from 'react-router-dom';
import './Modules.css';

function StepDetail({ id, stepLabel, title, goal, files = [], steps = [], checkpoint }) {
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
    </section>
  );
}

function Module3() {
  const steps = [
    {
      title: 'Step 0: Run the starter demo (Feature 0)',
      summary: 'Install dependencies and launch the starter lobby UI so you can see the baseline routes before adding realtime features.',
      meta: 'Est. 10-15 min',
      anchor: 'step-0',
    },
    {
      title: 'Step 1: Understand the WebSocket protocol (Feature 1)',
      summary: 'Review the message types that keep the lobby and rooms in sync so you know what the server expects and returns.',
      meta: 'Est. 10-20 min',
      anchor: 'step-1',
    },
    {
      title: 'Step 2: Connect and identify over WebSockets (Feature 2)',
      summary: 'Open one WebSocket per tab and send an identify message so the server can track each participant by nickname.',
      meta: 'Est. 20-30 min',
    },
    {
      title: 'Step 3: Realtime lobby room list (Feature 3)',
      summary: 'Subscribe to lobby updates and render rooms from live data, keeping multiple tabs in sync without refreshes.',
      meta: 'Est. 20-30 min',
    },
    {
      title: 'Step 4: Robust create/join flow (Feature 4)',
      summary: 'Validate room + nickname, surface friendly errors, and navigate into rooms only after the server confirms success.',
      meta: 'Est. 25-35 min',
    },
    {
      title: 'Step 5: Realtime chat inside a room (Feature 5)',
      summary: 'Replace placeholder chat with a synchronized message timeline powered by server echoes and saved history.',
      meta: 'Est. 20-30 min',
    },
    {
      title: 'Step 6: Live participants list (Feature 6)',
      summary: 'Keep the participants sidebar accurate as people join, leave, or close their tabs using broadcast updates.',
      meta: 'Est. 15-25 min',
    },
    {
      title: 'Step 7: Reactions and typing indicators (Feature 7)',
      summary: 'Layer lightweight realtime signals—emoji reactions and typing presence—on top of the chat experience.',
      meta: 'Est. 20-30 min',
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
