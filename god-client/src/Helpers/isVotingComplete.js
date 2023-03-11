import AllowedDrinks from './VolumeCheck.js';

function IsVotingComplete(drinkVotes, currentVolume, CurrentRound) {
  // Configurables
  const numberOfRounds = 5;

  // Check round
  if (numberOfRounds == CurrentRound) {
    return true;
  }

  // Check volume
  if (!AllowedDrinks(currentVolume)) {
    return true;
  }

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
    return true;
  }

  return false;
}

export default IsVotingComplete;
