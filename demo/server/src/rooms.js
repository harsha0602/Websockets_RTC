/**
 * Participant shape:
 * { id, name, ws } where ws is the WebSocket connection.
 */
class Room {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.participants = new Map();
    this.chatHistory = [];
    this.activePoll = null;
  }
}

function createRoom(name) {
  // TODO: Create and register a new room with a unique id and provided name.
  throw new Error('Not implemented');
}

function getOrCreateRoom(name) {
  // TODO: Return an existing room by name or create one if it does not exist.
  throw new Error('Not implemented');
}

function removeParticipantFromAllRooms(participantId) {
  // TODO: Remove the participant from every room and clean up empty rooms.
  throw new Error('Not implemented');
}

function getRoomSummaries() {
  // TODO: Return lightweight room metadata for lobby listings (id, name, counts).
  throw new Error('Not implemented');
}

function addChatMessage(room, message) {
  // TODO: Append chat messages, trimming to the last N entries for history.
  throw new Error('Not implemented');
}

module.exports = {
  Room,
  createRoom,
  getOrCreateRoom,
  removeParticipantFromAllRooms,
  getRoomSummaries,
  addChatMessage,
};
