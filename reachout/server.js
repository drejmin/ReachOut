const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const socketio = require('socket.io');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const http = require('http');
const {chats} = require('./data/data');
const userRoutes = require("./routes/userRoutes");
const { NOTFOUND } = require('dns');

dotenv.config();

const app = express();
const server = http.Server(app);
const io = socketio(server);

const port = process.env.PORT || 3001;

//Set up Routes

app.get('/', (req,res)=>{
  res.send("API is Running");
});

app.use('/api/user', userRoutes)

// error routes for user not found

app.user(notFound)
app.user(errorHandler)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use(cors());
app.use(express.json());

//Mongoose DB connection

mongoose.connect(process.env.DATABASE_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true
 });

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});


//Socket Io connection

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`);

  socket.on('sendMessage', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});



