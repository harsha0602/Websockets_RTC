// Starter version of the Module 3 server: realtime/RTC handlers are intentionally stubbed.
// TODO markers match Module 3 steps 2-11; follow the tutorial to fill in identity, lobby,
// room management, chat, reactions/typing, and WebRTC signaling behavior.
const http = require('http');
const { WebSocketServer, WebSocket } = require('ws');
const MessageTypes = require('./messages');
const {
  getOrCreateRoom,
  joinRoom,
  removeParticipantFromAllRooms,
  addChatMessage,
  getRoomMetaData,
  roomExists,
  getParticipantSummaries,
  removeParticipant,
} = require('./rooms');

const PORT = 3001;
const clients = new Map(); // clientId -> { ws, name }
const IDENTIFY_TYPE = MessageTypes.IDENTIFY || 'IDENTIFY';
// Track lobby subscribers so every open tab stays in sync with the shared room list.
const lobbySubscribers = new Set();
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

const wss = new WebSocketServer({ server });

let nextClientId = 1;

function sendJson(ws, message) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message));
  }
}

function sendError(ws, reason, details = {}) {
  sendJson(ws, {
    type: MessageTypes.ERROR,
    payload: { reason, ...details },
  });
}

function buildRoomStatePayload(room) {
  return {
    roomId: room.id,
    roomName: room.name,
    participants: getParticipantSummaries(room),
    chatHistory: room.chatHistory,
  };
}

function broadcastToRoom(room, message, excludeClientId = null) {
  const json = JSON.stringify(message);
  room.participants.forEach((participant) => {
    if (
      participant.id !== excludeClientId &&
      participant.ws.readyState === WebSocket.OPEN
    ) {
      participant.ws.send(json);
    }
  });
}

function broadcastRoomList() {
  const message = JSON.stringify({
    type: MessageTypes.ROOM_LIST_UPDATE,
    payload: { rooms: getRoomMetaData() },
  });

  lobbySubscribers.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    } else {
      lobbySubscribers.delete(client);
    }
  });
}

function broadcastParticipantsUpdate(room) {
  broadcastToRoom(room, {
    type: MessageTypes.PARTICIPANTS_UPDATE,
    payload: { participants: getParticipantSummaries(room) },
  });
}

wss.on('connection', (ws) => {
  const clientId = nextClientId++;
  let currentRoomName = null;
  let userName = `User ${clientId}`;
  clients.set(clientId, { ws, name: null });

  console.log('Client connected', { clientId });

  ws.on('message', (data) => {
    try {
      const parsed = JSON.parse(data.toString());
      const { type, payload } = parsed;

      switch (type) {
        case MessageTypes.ROOM_LIST_SUBSCRIBE: {
          // TODO [Module 3 - Step 3]: Subscribe the client to lobby updates and send the current room list.
          console.warn('TODO handler for ROOM_LIST_SUBSCRIBE not implemented yet');
          sendJson(ws, {
            type: MessageTypes.ROOM_LIST_UPDATE,
            payload: { rooms: [] },
          });
          break;
        }

        case IDENTIFY_TYPE: {
          // TODO [Module 3 - Step 2]: Store the provided name for this client so future events use it.
          console.warn('TODO handler for IDENTIFY not implemented yet');
          break;
        }

        case MessageTypes.CREATE_ROOM: {
          // TODO [Module 3 - Step 4]: Validate and create a room, join the creator, and broadcast lobby/participant updates.
          console.warn('TODO handler for CREATE_ROOM not implemented yet');
          sendError(
            ws,
            'TODO: implement room creation and initial join (Module 3 - Step 4).'
          );
          break;
        }

        case MessageTypes.JOIN_ROOM: {
          // TODO [Module 3 - Step 4]: Validate and join an existing room, then broadcast participant updates and system messages.
          console.warn('TODO handler for JOIN_ROOM not implemented yet');
          sendError(ws, 'TODO: implement joining rooms (Module 3 - Step 4).');
          break;
        }

        case MessageTypes.LEAVE_ROOM: {
          // TODO [Module 3 - Step 6]: Remove a participant from a room and broadcast updates when they leave.
          console.warn('TODO handler for LEAVE_ROOM not implemented yet');
          sendError(ws, 'TODO: implement leaving rooms (Module 3 - Step 6).');
          break;
        }

        case MessageTypes.CHAT_MESSAGE: {
          // TODO [Module 3 - Step 5]: Persist chat messages and broadcast them to everyone in the room.
          console.warn('TODO handler for CHAT_MESSAGE not implemented yet');
          sendError(ws, 'TODO: implement chat messaging (Module 3 - Step 5).');
          break;
        }

        case MessageTypes.PARTICIPANTS_UPDATE: {
          // TODO [Module 3 - Step 6]: Broadcast the current participant roster to the room.
          console.warn('TODO handler for PARTICIPANTS_UPDATE not implemented yet');
          break;
        }

        case MessageTypes.REACTION: {
          // TODO [Module 3 - Step 7]: Relay reaction events to other participants in the room.
          console.warn('TODO handler for REACTION not implemented yet');
          break;
        }

        case MessageTypes.TYPING: {
          // TODO [Module 3 - Step 7]: Relay typing indicators to other participants in the room.
          console.warn('TODO handler for TYPING not implemented yet');
          break;
        }

        // WEBRTC SIGNALING LOGIC
        case MessageTypes.WEBRTC_OFFER:
        case MessageTypes.WEBRTC_ANSWER:
        case MessageTypes.WEBRTC_ICE_CANDIDATE: {
          // TODO [Module 3 - Steps 8-11]: Relay WebRTC signaling messages to the appropriate peer(s).
          console.warn(`TODO handler for ${type} not implemented yet`);
          break;
        }

        default:
          console.warn('Unknown message type:', type);
      }
    } catch (err) {
      console.error('Failed to parse message', {
        clientId,
        error: err.message,
      });
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected', { clientId });
    // TODO [Module 3 - Steps 6, 10-11]: Clean up room membership, notify remaining
    // participants, and tear down WebRTC signaling/state on disconnect.
    console.warn(
      'TODO: disconnect cleanup not implemented; add participant and signaling teardown in Module 3.'
    );
  });
});

function startServer() {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

if (require.main === module) {
  startServer();
}

module.exports = { startServer };
