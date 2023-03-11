import { io } from 'socket.io-client';
const sockets = io('http://3.25.151.51:3000');

// Imports and initialisation
import GetDrinkOptions from './Helpers/GetDrinkOptions.js';
import GetVoteResult from './Helpers/GetVoteResult.js';
import IsVotingComplete from './Helpers/IsVotingComplete.js';
import SendProtocolToHardware from './Helpers/SendProtocolToHardware.js';
import UpdateDrinkVotes from './Helpers/UpdateDrinkVotes.js';
let roundNumber = 1;
let drinkChance = new Object({
  drinkName: '',
  drinkVoteCount: 0,
  drinkChance: null,
});
let drinkVotes = []; // Array of drinkChance
let votingIsFinished = false;
let drinkHistory = [];

sockets.emit('drinkOptions', GetDrinkOptions(5));

// Handle user updating their choice (via selecting or changing option)
sockets.on('drinkChoice', (socket) => {
  console.log(`Choice updated: ${socket.id}. User name: ${socket.userName}.`);

  let isBoosted = socket.isBoosted ?? false;
  drinkVotes = UpdateDrinkVotes(drinkVotes, socket.drinkChoice, isBoosted);
  votingIsFinished = IsVotingComplete();

  // Update the front end (via web socket) whenever new data comes in
  var protocol = {
    roundNumber,
    drinkVotes,
    votingIsFinished,
    drinkHistory: [],
  };
  sockets.emit('drinkChoiceData', protocol);
});

// Handle user submitting their FINAL choice (via round ending)
sockets.on('roundEndChoice', (socket) => {
  console.log(
    `Client choice updated: ${socket.id}. User name: ${socket.userName}.`
  );

  let isBoosted = socket.isBoosted ?? false;
  UpdateDrinkVotes(socket.drinkChoice, isBoosted);
  UpdateDrinkVotes(drinkVotes);

  // Update the front end (via web socket) whenever new data comes in
  var protocol = {
    roundNumber,
    drinkVotes,
    votingIsFinished: IsVotingComplete(),
    drinkHistory,
  };
  sockets.emit('roundEndChoiceData', protocol);

  round++;
  // Send data to hardware

  // Handle voting finish
  votingIsFinished = IsVotingComplete();
  if (votingIsFinished) {
    // ?
  }
});
