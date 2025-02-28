const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });

    // Handle multiplayer game events here
    socket.on('join-game', (gameId) => {
        socket.join(gameId);
        console.log(`User ${socket.id} joined game ${gameId}`);
    });
});

const PORT = 5001; // Force port 5001
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});