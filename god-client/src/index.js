import { io } from 'socket.io-client';
const sockets = io('https://3.25.151.51:3000');

// Imports and initialisation
import GetDrinkOptions from './Helpers/GetDrinkOptions.js';
import GetVoteResult from './Helpers/GetVoteResult.js';
import IsVotingComplete from './Helpers/IsVotingComplete.js';
import UpdateDrinkChance from './Helpers/UpdateDrinkChance.js';
import HandleDrinkEnd from './Helpers/HandleDrinkEnd.js';
import SendProtocolToHardware from './Helpers/SendProtocolToHardware.js';
import SetUpDrinkVotes from './Helpers/SetUpDrinkVotes.js';
import PlayAudio from './Helpers/PlayAudio.js';
import { drinkSizes, drinkOptions } from './Helpers/VolumeAllowedDrinks.js';
import RandomAudioGet from './Helpers/RandomAudioGet.js';
let roundNumber = 1;
let votingIsFinished = false;
let drinkHistory = [];
const roundLengthInMs = 5_000;
const delayLengthInMs = 5_000;
let drinkVotes;
let isRoundActive = false;
let actions = {
  hasMixed: false,
  hasHeated: false,
};
let currentVolume = 0;
let numberOfRounds = 5;
let audioScramble = false;
let audioIndex = 0;

function StartRoundSetup() {
  // Send viable drink options to frontend
  console.log(`Current Volume: ${currentVolume}`);
  const drinkOptions = GetDrinkOptions(4, currentVolume, actions);
  sockets.emit('drinkOptions', drinkOptions);
  drinkVotes = SetUpDrinkVotes(drinkOptions);
  setTimeout(EndRound, roundLengthInMs);
  isRoundActive = true;
}

PlayAudio('./src/Audio/Welcome.pcm');
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
  console.log(`\nEndRound (round ${roundNumber}) has been triggered.`);
  votingIsFinished = IsVotingComplete(
    drinkVotes,
    roundNumber,
    currentVolume,
    numberOfRounds
  );


  let voteResult = GetVoteResult(drinkVotes);
  console.log(`The vote result was ${voteResult.drinkName}.\n`);

  if (voteResult.drinkName == 'Skip' || voteResult.drinkName == 'Finish') {
    // Take care of yourself
  } else if (voteResult.drinkName == 'Mix') {
    numberOfRounds++;
    actions['hasMixed'] = true;
    SendProtocolToHardware('Mix');
  } else if (voteResult.drinkName == 'Heat') {
    numberOfRounds++;
    actions['hasHeated'] = true;
    SendProtocolToHardware('Heat');
  } else {
    const drinkVolume = drinkSizes.find(
      (object) =>
        object.size ===
        drinkOptions.find((drink) => drink.name === voteResult.drinkName).size
    ).volume;
    currentVolume += drinkVolume;
    SendProtocolToHardware(voteResult.drinkName);
  }

  drinkHistory.push(voteResult);

  // Update frontend client
  let payload = {
    roundNumber,
    drinkVotes,
    votingIsFinished,
    drinkHistory,
    lastChosen: voteResult.drinkName ?? null,
  };
  roundNumber++;

  console.log('End-of-round payload to send to front end: ', payload);
  sockets.emit('roundEndChoiceData', payload);


  // Finish drink or move to next round
  if (votingIsFinished) {
    PlayAudio('./src/Audio/Mmmmmmm.pcm');
    HandleDrinkEnd();
  } else {
    PlayAudio(RandomAudioGet(audioScramble, audioIndex))
    if (!audioScramble) {audioScramble = true};
    if (audioIndex == 5) {audioIndex =0} else {audioIndex++}
    isRoundActive = false;
    setTimeout(StartRoundSetup, delayLengthInMs);
  }
}
