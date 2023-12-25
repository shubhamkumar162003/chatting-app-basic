const socket = io('http://localhost:8000');

//Get DOM elements in their respective Js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container");

//Audio that will play on receiving messages
var audio= new Audio('ting.mp3');

//Function which will append event left to the container
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
}
//Ask new user for his/her name
const names = prompt("Enter your name to join");
socket.emit('new-user-joined', names);

socket.on('user-joined', names=> {
    append(`${names} joined the chat`, 'right');
})
socket.on('receive', data => {
    append(`${data.names}:{data.message}`, 'left');
})

socket.on('left', names => {
    append(`${names} left the chat`, 'right');
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message);
    messageInput.value = '';
})


