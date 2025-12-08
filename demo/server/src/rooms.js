// Starter version of Module 3 rooms helpers: logic is stubbed for learners to implement.
// Full behavior (lobby summaries, room join/create, chat history, participant tracking)
// exists on the dev branch; follow Module 3 steps to fill in the TODOs below.
const { v4: uuidv4 } = require('uuid');
const rooms = new Map();

/**
 * Participant shape:
 * { id, name, ws } where ws is the WebSocket connection instance.
 */
function createParticipant(id, name, ws) {
  // TODO [Module 3 - Step 4]: Create and return a participant record storing id, name, and ws.
  throw new Error('TODO: implement createParticipant as described in Module 3');
}

function getParticipantDisplayInfo(participant) {
  // TODO [Module 3 - Step 6]: Return a display-safe subset (id, name) for a participant.
  throw new Error(
    'TODO: implement getParticipantDisplayInfo as described in Module 3'
  );
}

class Room {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    // Map<string, Participant>
    this.participants = new Map();
    this.chatHistory = [];
    this.activePoll = null;
  }
}

function getRoomMetaData() {
  // TODO [Module 3 - Step 3]: Return lobby-friendly metadata for all rooms (id, name, participant count).
  throw new Error('TODO: implement getRoomMetaData as described in Module 3');
}

function getRoomSummaries() {
  // TODO [Module 3 - Step 3]: Return summaries of active rooms for the lobby list.
  throw new Error('TODO: implement getRoomSummaries as described in Module 3');
}

function roomExists(name) {
  // TODO [Module 3 - Step 4]: Check if a room already exists by name.
  throw new Error('TODO: implement roomExists as described in Module 3');
}

function getOrCreateRoom(name) {
  // TODO [Module 3 - Step 4]: Retrieve an existing room by name or create a new one with a generated id.
  throw new Error('TODO: implement getOrCreateRoom as described in Module 3');
}

function addParticipant(room, participant) {
  // TODO [Module 3 - Step 4]: Add a participant to the room's participants map.
  throw new Error('TODO: implement addParticipant as described in Module 3');
}

function removeParticipant(room, participantId) {
  // TODO [Module 3 - Step 6]: Remove and return a participant from the room by id, or null if missing.
  throw new Error('TODO: implement removeParticipant as described in Module 3');
}

function getParticipantSummaries(room) {
  // TODO [Module 3 - Step 6]: Return display info for all participants in the room.
  throw new Error(
    'TODO: implement getParticipantSummaries as described in Module 3'
  );
}

function joinRoom(roomName, participant) {
  // TODO [Module 3 - Step 4]: Look up or create a room, add the participant, and return the room.
  throw new Error('TODO: implement joinRoom as described in Module 3');
}

function removeParticipantFromAllRooms(participantId) {
  // TODO [Module 3 - Step 6]: Remove a participant from every room and return the list of rooms affected.
  throw new Error(
    'TODO: implement removeParticipantFromAllRooms as described in Module 3'
  );
}

function addChatMessage(room, messageData) {
  // TODO [Module 3 - Step 5]: Append a chat message to the room history and return the stored entry.
  throw new Error('TODO: implement addChatMessage as described in Module 3');
}

module.exports = {
  getOrCreateRoom,
  joinRoom,
  removeParticipantFromAllRooms,
  addChatMessage,
  getRoomMetaData,
  getRoomSummaries,
  roomExists,
  createParticipant,
  getParticipantDisplayInfo,
  addParticipant,
  removeParticipant,
  getParticipantSummaries,
};
