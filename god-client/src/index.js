import { io } from 'socket.io-client';
const sockets = io('http://3.25.151.51:3000');

// Imports and initialisation
import GetDrinkOptions from './Helpers/GetDrinkOptions.js';
import GetVoteResult from './Helpers/GetVoteResult.js';
import IsVotingComplete from './Helpers/IsVotingComplete.js';
import UpdateDrinkChance from './Helpers/UpdateDrinkChance.js';
import HandleDrinkEnd from './Helpers/HandleDrinkEnd.js';
import SendProtocolToHardware from './Helpers/SendProtocolToHardware.js';
import SetUpDrinkVotes from './Helpers/SetUpDrinkVotes.js';
let roundNumber = 1;
let votingIsFinished = false;
let drinkHistory = [];
const roundLengthInMs = 20_000;
const delayLengthInMs = 30_000;
let drinkVotes;
let isRoundActive = false;

function StartRoundSetup() {
  // Send viable drink options to frontend
  sockets.emit('drinkOptions', GetDrinkOptions(5, 0));
  drinkVotes = SetUpDrinkVotes();
  setTimeout(EndRound, roundLengthInMs);
  isRoundActive = true;
}

StartRoundSetup();

// Handle user selecting or updating their vote, and update front end client
sockets.on('drinkChoice', (socket) => {
  if (!isRoundActive) return;

  drinkVotes = UpdateDrinkChance(
    drinkVotes,
    socket.drinkChoice,
    socket.isBoosted,
    roundNumber,
    socket.id
  );
  let payload = {
    roundNumber,
    drinkVotes,
  };
  console.log(
    `Mid-round (round ${roundNumber}) payload to send to front end: `,
    payload
  );
  sockets.emit('drinkChoiceData', payload);
});

// Handle user submitting their FINAL choice (due to round ending)
function EndRound() {
  console.log(`EndRound (round ${roundNumber}) has been triggered.`);
  let voteResult = GetVoteResult();
  votingIsFinished = IsVotingComplete(drinkVotes, roundNumber);

  // Update frontend client
  let payload = {
    roundNumber,
    drinkVotes,
    votingIsFinished,
    drinkHistory: drinkHistory.push(voteResult),
    lastChosen: voteResult ?? null,
  };
  roundNumber++;

  console.log('End-of-round payload to send to front end: ', payload);
  sockets.emit('roundEndChoiceData', payload);

  SendProtocolToHardware(voteResult);

  // Finish drink or move to next round
  if (votingIsFinished) {
    HandleDrinkEnd();
  } else {
    isRoundActive = false;
    setTimeout(StartRoundSetup, delayLengthInMs);
  }
}
