import { io } from 'socket.io-client';
const sockets = io('http://3.25.151.51:3000');

// Imports and initialisation
import GetDrinkOptions from './Helpers/GetDrinkOptions.js';
import GetVoteResult from './Helpers/GetVoteResult.js';
import IsVotingComplete from './Helpers/IsVotingComplete.js';
import SendProtocolToHardware from './Helpers/SendProtocolToHardware.js';
import UpdateDrinkVotes from './Helpers/UpdateDrinkVotes.js';
import HandleDrinkEnd from './Helpers/HandleDrinkEnd.js';
import SetUpDrinkVotes from './Helpers/SetUpDrinkVotes.js';
let roundNumber = 1;
let votingIsFinished = false;
let drinkHistory = [];
let currentVolume = 0;
let isBoosted = false;
const roundLengthInMs = 20000;

sockets.emit('drinkOptions', GetDrinkOptions(5, 0));

let drinkVotes = SetUpDrinkVotes();
setTimeout(EndRound, roundLengthInMs);

// Handle user selecting or updating their vote, and update front end client
sockets.on('drinkChoice', (socket) => {
  drinkVotes = UpdateDrinkVotes(drinkVotes, socket.drinkChoice, isBoosted);
  let payload = {
    roundNumber,
    drinkVotes,
  };
  console.log('Mid-round payload for front end: ', payload);
  sockets.emit('drinkChoiceData', payload);
});

// Handle user submitting their FINAL choice (due to round ending)
function EndRound() {
  console.log('EndRound has been triggered.');
  let voteResult = GetVoteResult();
  votingIsFinished = IsVotingComplete();
  roundNumber++;

  // Update frontend client
  let payload = {
    roundNumber,
    drinkVotes,
    votingIsFinished,
    drinkHistory: drinkHistory.push(voteResult),
    lastChosen: voteResult,
  };

  console.log('End-of-round payload for front end: ', payload);
  sockets.emit('roundEndChoiceData', payload);

  SendProtocolToHardware(voteResult);

  drinkVotes = SetUpDrinkVotes(); // Clear old votes

  if (votingIsFinished) HandleDrinkEnd();
}
