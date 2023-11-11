const WebSocket = require('ws');

console.log('Starting server...');

const server = new WebSocket.Server({ port: 8080 });

console.log('Server started', server.options.port);

server.on('connection', (socket) => {
    console.log('Client connected');

    // Handle messages from clients
    socket.on('message', (message) => {
        console.log(`Received message: ${message}`);

        // Send a response back to the client
        socket.send('Server received your message.');
    });

    // Handle disconnections
    socket.on('close', () => {
        console.log('Client disconnected');
    });
});
