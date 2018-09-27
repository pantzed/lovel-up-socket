const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, 'client/build')));

let chat_history = [];
//bring messages from database (knex)

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  })

  socket.emit('chat message', chat_history);
  console.log(chat_history);

  socket.on('chat message', function (msg) {
    chat_history.push(msg);
    io.emit('chat message', chat_history);
  });
});

http.listen(port, function(){
  console.log(`Socket server listening on port ${port}...`);
});
