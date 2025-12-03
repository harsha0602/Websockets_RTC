const http = require('http');
const { WebSocketServer } = require('ws');
const MessageTypes = require('./messages');

const PORT = 3001;
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

wss.on('connection', (ws) => {
  const clientId = nextClientId++;
  console.log('Client connected', { clientId });

  ws.on('message', (data) => {
    try {
      const parsed = JSON.parse(data.toString());
      // TODO: Route message by parsed.type using MessageTypes.
      void parsed;
    } catch (err) {
      console.error('Failed to parse message', { clientId, error: err.message });
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected', { clientId });
    // TODO: Remove participant from any rooms they were in.
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
