const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const favicon = require('serve-favicon');
const logger = require('morgan');
const path = require('path');


// Initialize environment variables
require('dotenv').config();

require('./config/database');

const app = express();
const server = http.Server(app);

app.use(logger('dev'));
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Middleware to check and verify a JWT and
// assign the user object from the JWT to req.user
app.use(require('./config/checkToken'));

const port = process.env.PORT || 3000;

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
app.use('/chatroom', require('./routes/chatroom'));
app.use('/message', require("./routes/message"));

// Import route handlers (ensure correct paths)
const message = require("./routes/message");

// Use route handlers
// app.use('/users', userRoutes);

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX/API requests
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});



// Initialize Socket.IO
const io = socketIo(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  setupSocketEventListeners(socket);

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  });
});

function setupSocketEventListeners(socket) {
    socket.on("setup", userData => {
      socket.join(userData._id);
      socket.emit("connected");
    });
    io.on("connection", (socket) => {
      console.log("Connected to socket.io");
      socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
      });

      socket.on('sendMessage', async (messageData) => {
        try {
            const message = new MessageChannel({
                content: messageData.content,
                sender: messageData.sender,
                //other content as necessary
            });
        const savedMessage = await message.save();

        io.emit('message', savedMessage);
        } catch(error){
            console.error('Error saving message:', error);
        }
      });

      socket.on('disconnect', () =>{
        console.log('Client disconnected');
      });
    
      socket.on("join chat", (room) => {
        socket.join(room);
        console.log("Joined Room: " + room);
      });

      socket.on("typing", (room) => socket.in(room).emit("typing"));
      socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
    
      socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
    
        if (!chat.users) return console.log("chat.users not defined");
    
        chat.users.forEach((user) => {
          if (user._id == newMessageRecieved.sender._id) return;
    
          socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
      });
    
      socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      });
    });
}