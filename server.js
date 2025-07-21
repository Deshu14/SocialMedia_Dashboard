import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import userRoutes from './routes/userRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.on('send_message', (data) => {
    socket.broadcast.emit('receive_message', data);
  });
});

app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  server.listen(process.env.PORT, () => console.log('Server running...'));
});
