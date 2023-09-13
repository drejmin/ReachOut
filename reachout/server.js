const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const socketio = require('socket.io');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const http = require('http');
const msgRouter = require('message');

dotenv.config();

const app = express();
const server = http.Server(app);
const io = socketio(server);

const port = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());



mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

const validPassword = await bcrypt.compare(req.body.password, user.password);
if (!validPassword) return res.status(400).send('Username or Password is Wrong');

const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
res.header('Authorization', token).send(token);

app.use('/message', msgRouter);

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`);

  socket.on('sendMessage', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


