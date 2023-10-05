const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const socketio = require('socket.io');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const http = require('http');
const {chats} = require('./data/data');


dotenv.config();

const app = express();
const server = http.Server(app);
const io = socketio(server);

const port = process.env.PORT || 3001;

app.get('/', (req,res)=>{
  res.send("API is Running");
});

app.get('/api/chat', (req,res)=>{
  res.send(chats);
});

app.get('/api/chat/:id', (req,res)=>{
  // console.log(req.params.id);
  const singleChat = chats.find(c=>c._id === req.params.id);
  res.send(singleChat);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



app.use(cors());
app.use(express.json());



mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});


io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`);

  socket.on('sendMessage', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});



