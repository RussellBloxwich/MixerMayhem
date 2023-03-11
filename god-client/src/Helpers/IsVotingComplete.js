import VolumeAllowedDrinks from './VolumeAllowedDrinks.js';

function IsVotingComplete(drinkVotes, currentRound, currentVolume) {
  // Configurables
  const numberOfRounds = 5;

  // Check round
  if (numberOfRounds == currentRound) {
    console.log('Ending drink due to running out of rounds.');
    return true;
  }

  // Check volume
  // TODO: Fix code. This doesn't work
  // if (!VolumeAllowedDrinks(currentVolume)) {
  //   console.log('Ending drink due to too much volume.');
  //   return true;
  // }

  // Check votes to end
  var endRoundTally;
  var totalVotes = 0;
  for (const drinkVote in drinkVotes) {
    if (drinkVote.drinkName == 'Finish Drink') {
      endRoundTally = drinkVote.drinkVoteCount;
    }
    totalVotes += drinkVote.drinkVoteCount;
  }

  if (2 * endRoundTally > totalVotes) {
    console.log('Ending drink due to popular vote.');
    return true;
  }

  return false;
}

export default IsVotingComplete;
