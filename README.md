# Websockets_RTC

## Tutorial

The `tutorial/` folder contains the step-by-step learning materials used to build this stack.

Run the tutorial client:

```bash
cd tutorial/client
npm install
npm run dev
```

## Websockets + WebRTC Study Rooms

A real-time video call and chat application using Node.js (WebSocket signaling) and React (WebRTC).

## 🚀 Demo App

The complete working application is located in the `demo/` folder. You need to run the backend and frontend in two separate terminals.

### 1. Start the Backend

Runs the signaling server on port `3001`.

```bash
cd demo/server
npm install
npm run dev
```

### 2. Start the Frontend

Runs the React client on port `5173`.

```bash
cd demo/client
npm install
npm run dev
```
