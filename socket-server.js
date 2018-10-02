const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

const port = process.env.PORT || 8000;
const db = (
  process.env.NODE_ENV === 'production' ? 
  'https://lovel-up.herokuapp.com' : 
  'http://localhost:5000/'
  );

app.use(express.static(path.join(__dirname, 'client/build')));


io.on('connection', function (socket) {
  socket.on('disconnect', function () {
  })

  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log(`Socket server listening on port ${port}...`);
});
