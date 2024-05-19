// wsServer.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  ws.on('message', (message) => {
    console.log('received: %s', message);
  });
  
  ws.send('Hello! Message From Server!!');
});

console.log('WebSocket server is running on ws://localhost:9000');
