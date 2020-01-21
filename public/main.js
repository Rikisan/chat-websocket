var socket = io.connect('http://192.168.10.154:4000', { 
  'forceNew': true
}); 
socket.on('messages', function(data) { 
  console.log(data);
  render(data);
  document.getElementById('xyz').play();
  alertMessage();
});
function render (data) { 
  var html = data.map(function(elem, index) { 
    return(`<div>
            <strong>${elem.author}</strong>: 
            <em>${elem.text}</em> </div>`);
  }).join(" "); 
  document.getElementById('messages').innerHTML = html; 
} 
function addMessage(e) { 
  var message = { 
    author: document.getElementById('username').value, 
    text: document.getElementById('texto').value,
  }; 
  socket.emit('new-message', message);
  document.getElementById("texto").value = "";
  return false;
}

function alertMessage(e) { 
  alert("Nuevo mensaje recibido");
  return false;
}