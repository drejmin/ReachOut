const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');

// Initialize environment variables
dotenv.config();

const app = express();
const server = http.Server(app);

// Import route handlers (ensure correct paths)
const userRoutes = require('./routes/userRoutes');
const chatroom = require("./routes/chatroom");
const message = require("./routes/message");

// Use route handlers
app.use('/users', userRoutes);
app.use('/chatroom', chatroom);
app.use('/message', message);

// Error handling middlewares
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
app.use(notFound);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send("Hello World");
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

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
