// Make connection
var socket = io.connect("http://localhost:4000/");

// Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

// emit event
btn.addEventListener('click', function (event) {
  // name of the msg, actual data/msg
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
});

message.addEventListener('keypress', function () {
  if (message.value)
    socket.emit('typing', handle.value);
});

// listen for events
socket.on('chat', function (data) {
  feedback.innerHTML = "";
  output.innerHTML += `<p><strong>${data.handle}:</strong> ${data.message}</p>`
})

socket.on('typing', function (data) {
  feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
})
