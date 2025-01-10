// index.js
import express from 'express';
import http from 'http'; // Required for creating an HTTP server
import { Server } from 'socket.io';
import cors from 'cors';

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); 
// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // React frontend URL
        methods: ['GET', 'POST'],
    },
});

// Socket.IO logic
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Listen for a message from the client
    socket.on('sendMessage', (data) => {
        console.log('Message received:', data);
        app.get('/message', (req, res)=>{
          res.send(data);
        })

        // Broadcast the message to all connected clients
        io.emit('receiveMessage', data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Start the server
const PORT = 5550;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
