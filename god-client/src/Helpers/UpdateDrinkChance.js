function UpdateDrinkChance(
  currentDrinkVotes,
  drinkChoice,
  isBoosted = false,
  round,
  userId
) {
  const boostedMultiplier = 2;

  // See if the user has already voted this round
  // If so, remove their old vote before continuing
  if (round == 1) {
    var whoHasVoted = { 'Round 1': [] };
  }
  whoHasVoted[`Round ${round}`] = [];
  if (Object.keys(whoHasVoted[`Round ${round}`]).includes(userId)) {
    let choiceName = whoHasVoted[`Round ${round}`].userId;
    UpdateVoteCountAndProportion(choiceName, decrement, 1);
  }

  var totalVoteCount = currentDrinkVotes.reduce(function (acc, obj) {
    return acc + obj.drinkVoteCount;
  }, 0);

  // TODO (nice-to-have): Split into two functions
  function UpdateVoteCountAndProportion(
    choiceName,
    incrementOrDecrement,
    votes
  ) {
    currentDrinkVotes = currentDrinkVotes.map((choice) => {
      if (choice.drinkName == choiceName) {
        // Recalculate votes and percentage likelihood
        let newVoteCount =
          incrementOrDecrement == 'increment'
            ? choice.drinkVoteCount + votes
            : choice.drinkVoteCount - votes;
        totalVoteCount++; // Current vote
        let newPercentageLikelihood = newVoteCount / totalVoteCount;

        return {
          ...choice,
          drinkVoteCount: newVoteCount,
          drinkChance: newPercentageLikelihood,
        };
      } else {
        return choice;
      }
    });
  }

  UpdateProportionForEveryone();
  function UpdateProportionForEveryone() {
    currentDrinkVotes = currentDrinkVotes.map((choice) => ({
      ...choice,
      drinkChance: choice.drinkVoteCount / totalVoteCount,
    }));
  }

  let votesToAdd = isBoosted ? boostedMultiplier : 1;
  UpdateVoteCountAndProportion(drinkChoice, 'increment', votesToAdd);
  whoHasVoted[`Round ${round}`][userId] = drinkChoice;

  return currentDrinkVotes;
}

export default UpdateDrinkChance;
