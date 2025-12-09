import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className='home-shell'>
      <section className='hero-card'>
        <div className='eyebrow'>SER421 · Fall 2025</div>
        <h1>Real-Time Web Communication</h1>
        <h2>WebSockets & WebRTC</h2>
        <p className='lede'>
          An interactive critical inquiry project exploring how the modern web
          handles real-time data and peer-to-peer streaming.
        </p>

        <div className='pill-row'>
          <span className='pill'>Protocol deep dives</span>
          <span className='pill'>Hands-on demo</span>
          <span className='pill'>Built from scratch</span>
        </div>

        <div className='cta-row'>
          <Link to='/module1' className='start-button'>
            <span>Start Module 1</span>
            <span className='chevron'>→</span>
          </Link>
          <span className='cta-note'>Begin with History & Concepts</span>
        </div>
      </section>

      <section className='info-grid'>
        <article className='info-card'>
          <div className='card-icon'>📚</div>
          <div>
            <h3>The Tutorial</h3>
            <p>
              Learn the history of HTTP polling, the evolution of WebSockets, and
              the complex architecture of WebRTC through 3 interactive modules.
            </p>
            <ul className='key-points'>
              <li>Compare polling, long-polling, and persistent sockets.</li>
              <li>See how IETF and W3C standards shape real-time protocols.</li>
              <li>Connect theory to the live demo you will build.</li>
            </ul>
          </div>
        </article>

        <article className='info-card'>
          <div className='card-icon'>🚀</div>
          <div>
            <h3>The Demo</h3>
            <p>
              Experience a live implementation featuring a group chat room and a
              video calling application built from scratch.
            </p>
            <ul className='key-points'>
              <li>WebSocket-powered signaling and group chat.</li>
              <li>WebRTC video calling with STUN/TURN context.</li>
              <li>Design choices explained step by step.</li>
            </ul>
          </div>
        </article>

        <article className='info-card neutral'>
          <h4>What you&apos;ll explore</h4>
          <div className='steps'>
            <div className='step'>
              <span className='badge'>1</span>
              <div>
                <strong>Foundations</strong>
                <p>Why the web needed real-time and how WebSockets fixed it.</p>
              </div>
            </div>
            <div className='step'>
              <span className='badge'>2</span>
              <div>
                <strong>Architecture</strong>
                <p>Signaling, NAT traversal, and the hidden cost of peer-to-peer.</p>
              </div>
            </div>
            <div className='step'>
              <span className='badge'>3</span>
              <div>
                <strong>Build</strong>
                <p>Ship a chat + video experience and see it come alive.</p>
              </div>
            </div>
          </div>
        </article>
      </section>

      <footer className='home-footer'>
        <p>SER421 Real-Time Web • Built for Fall 2025</p>
      </footer>
    </div>
  );
};

export default Home;
