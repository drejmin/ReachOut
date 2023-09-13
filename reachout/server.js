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

// Initialize Middleware
initMiddleware();

// Initialize MongoDB
initMongoDB();

// Initialize API Routes
initApiRoutes();

// Initialize Socket.IO
initSocketIO();

// Initialize the server
startServer();

function initMiddleware() {
  app.use(cors());
  app.use(express.json());
}

function initMongoDB() {
  mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  const connection = mongoose.connection;
  connection.once('open', () => {
    console.log('MongoDB connection established successfully');
  });
}

function initApiRoutes() {
  // User Schema
  const userSchema = new mongoose.Schema({
    username: String,
    password: String
  });
  const User = mongoose.model('User', userSchema);

  app.use('/message', msgRouter);

  // Register user
  app.post('/register', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      username: req.body.username,
      password: hashedPassword
    });

    try {
      await user.save();
      res.send('User Registered');
    } catch {
      res.status(400).send('Registration Failed');
    }
  });

  // Login
  app.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send('Username or Password is Wrong');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Username or Password is Wrong');

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.header('Authorization', token).send(token);
  });

  // Protected Route
  app.get('/protected', authenticateJWT, (req, res) => {
    res.send('Protected Route Accessed');
  });

  // Authentication middleware
  function authenticateJWT(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access Denied');

    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
      next();
    } catch {
      res.status(400).send('Invalid Token');
    }
  }
}

function initSocketIO() {
  io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected`);
  
    socket.on('sendMessage', (message) => {
      io.emit('message', message);
    });
  
    socket.on('disconnect', () => {
      console.log(`Socket ${socket.id} disconnected`);
    });
  });
}

function startServer() {
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}


