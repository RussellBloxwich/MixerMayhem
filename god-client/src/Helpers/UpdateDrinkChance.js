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

  function UpdateVoteCountAndProportion(
    choiceName,
    incrementOrDecrement,
    votes
  ) {
    var totalVoteCount = currentDrinkVotes.reduce(function (acc, obj) {
      return acc + obj.drinkVoteCount;
    }, 0);

    currentDrinkVotes.map((choice) => {
      if (choice.drinkName == choiceName) {
        // Recalculate votes
        let newVoteCount;
        let newPercentageLikelihood;
        incrementOrDecrement == 'increment'
          ? (newVoteCount = choice.drinkVoteCount += votes)
          : (newVoteCount = choice.drinkVoteCount -= votes);

        // Recalculate percentage likelihood to be picked
        newPercentageLikelihood = choice.drinkVoteCount / totalVoteCount;

        return {
          ...currentDrinkVotes,
          choice: {
            drinkName: choice.drinkName,
            drinkVoteCount: newVoteCount,
            drinkChance: newPercentageLikelihood,
          },
        };
      } else {
        return choice;
      }
    });
  }

  let votesToAdd = isBoosted ? boostedMultiplier : 1;
  UpdateVoteCountAndProportion(drinkChoice, 'increment', votesToAdd);
  whoHasVoted[`Round ${round}`][userId] = drinkChoice;

  return currentDrinkVotes;
}

export default UpdateDrinkChance;
