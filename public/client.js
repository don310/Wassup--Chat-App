// Initialize socket.io client
const socket = io();

let name;

// Prompt the user to enter their name
do {
    name = prompt('Please enter your name');
} while (!name);

let textarea = document.querySelector('textarea');
let messageArea = document.querySelector('.message__area');

// Listen for keyup event in the textarea
textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
    }
});

// Function to send a message to the server
function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    };

    // Emit the message to the server
    socket.emit('message', msg);

    // Append the message to the chat interface
    appendMessage(msg, 'outgoing');

    // Clear the textarea after sending the message
    textarea.value = '';
    scrollToBottom()

    // Send to Server
    socket.emit('message', emit)
}

// Function to append a message to the chat interface
function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;
    mainDiv.innerHTML = markup;

    messageArea.appendChild(mainDiv);
}

// Listen for incoming messages from the server
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
});


function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}