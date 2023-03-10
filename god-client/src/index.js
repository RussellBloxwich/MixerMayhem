// Main - subscribe to web socket (same as FE clients)
// Main - send protocol to web socket (JSON object)
const http = require('http');
const server = http.createServer();

server.listen(3000, () => {
  console.log('listening on *:3000');
});

// Initialisation
let roundNumber = 1;
let drinkChance = new Object({
  drinkName: '',
  drinkChance: null,
});
let drinkVotes = []; // Array of drinkChance
let votingIsFinished = false;
let drinkHistory = [];

// Handle new client connection
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}. User name: ${socket.userId}.`);
  let vote = socket.vote;
  let isBoosted = socket.vote ?? false;
});
