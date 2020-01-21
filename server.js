var express = require('express'); 
var app = express(); 
var server = require('http').Server(app); 
var io = require('socket.io')(server); 

var messages = [{ 
  text: "Hola soy un mensaje", 
  author: "Ricardo Labarca" 
}]; 

app.use(express.static('public'));

io.on('connection', function(socket) { 
  console.log('Alguien se ha conectado con Sockets');   
  
  socket.emit('messages', messages); 
  
  socket.on('new-message', function(data) { 
    messages.push(data); 
    io.sockets.emit('messages', messages); 
  });
  socket.on('disconnect', function () {
    console.log('Usuario desconectado');
  });
  
}); 

server.listen(4000, '192.168.10.154', function() { 
  console.log("Servidor corriendo..."); 
});