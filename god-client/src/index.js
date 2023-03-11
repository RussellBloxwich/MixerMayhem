import { io } from 'socket.io-client';
const socket = io('http://3.25.151.51:3000');

// Imports and initialisation
import GetDrinkOptions from './Helpers/GetDrinkOptions.js';
import GetVoteResult from './Helpers/GetVoteResult.js';
import IsVotingComplete from './Helpers/IsVotingComplete.js';
import SendProtocolToHardware from './Helpers/SendProtocolToHardware.js';
import UpdateDrinkVotes from './Helpers/UpdateDrinkVotes.js';

let roundNumber = 1;
let drinkChance = new Object({
  drinkName: '',
  drinkChance: null,
});
let drinkVotes = []; // Array of drinkChance
let votingIsFinished = false;
let drinkHistory = [];
let currentVolume = 0;

socket.emit('drinkOptions', GetDrinkOptions(5, currentVolume));

// Handle user updating their choice
socket.on('drinkChoice', (socket) => {
  console.log(
    `Client choice updated: ${socket.id}. User name: ${socket.userId}.`
  );
  let vote = socket.vote;
  let isBoosted = socket.vote ?? false;
  let drinkChoice = socket.drinkChoice;
  UpdateDrinkVotes(drinkVotes);
  votingIsFinished = IsVotingComplete();

  // Update the front end (via web socket) whenever new data comes in
  var protocol = {
    roundNumber,
    drinkVotes,
    votingIsFinished,
    drinkHistory: [],
  };
  socket.emit('drinkChoiceData', protocol);
});

// Handle user submitting their FINAL choice (via round ending)
socket.on('roundEndChoice', (socket) => {
  console.log(
    `Client choice finalised: ${socket.id}. User name: ${socket.userId}.`
  );
  let vote = socket.vote;
  let isBoosted = socket.vote ?? false;
  let drinkChoice = socket.drinkChoice;
  UpdateDrinkVotes(drinkVotes);
  votingIsFinished = IsVotingComplete();

  // Update the front end (via web socket) whenever new data comes in
  var protocol = {
    roundNumber,
    drinkVotes,
    votingIsFinished,
    drinkHistory: [],
  };
  socket.emit('roundEndChoiceData', protocol);

  round++;
  // Send data to hardware

  // Handle voting finish
  votingIsFinished = IsVotingComplete();
  if (votingIsFinished) {
    // ?
  }
});
