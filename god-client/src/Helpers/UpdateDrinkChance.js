function UpdateDrinkChance(
  currentDrinkVotes,
  drinkChoice,
  isBoosted = false,
  round,
  userId
) {
  const boostedMultiplier = 2;

  let totalVoteCount = currentDrinkVotes.reduce(function (acc, obj) {
    let count = acc + obj.drinkVoteCount;
    return count;
  }, 0);
  totalVoteCount++; // For the current vote

  // See if the user has already voted this round
  // If so, remove their old vote before continuing
  var whoHasVoted = { 'Round 1': [] };
  whoHasVoted[`Round ${round}`] = [];
  if (Object.keys(whoHasVoted[`Round ${round}`]).includes(userId)) {
    let choiceName = whoHasVoted[`Round ${round}`].userId;
    totalVoteCount--;
    UpdateVoteCount(choiceName, decrement, 1);
  }

  function UpdateVoteCount(choiceName, incrementOrDecrement, votes) {
    currentDrinkVotes = currentDrinkVotes.map((choice) => {
      if (choice.drinkName == choiceName) {
        let newVoteCount =
          incrementOrDecrement == 'increment'
            ? choice.drinkVoteCount + votes
            : choice.drinkVoteCount - votes;
        return {
          ...choice,
          drinkVoteCount: newVoteCount,
        };
      } else {
        return choice;
      }
    });
  }

  function UpdateAllProportions() {
    currentDrinkVotes = currentDrinkVotes.map((choice) => ({
      ...choice,
      drinkChance: choice.drinkVoteCount / totalVoteCount,
    }));
  }

  let votesToAdd = isBoosted ? boostedMultiplier : 1;
  UpdateVoteCount(drinkChoice, 'increment', votesToAdd);
  UpdateAllProportions();
  whoHasVoted[`Round ${round}`][userId] = drinkChoice;

  return currentDrinkVotes;
}

export default UpdateDrinkChance;
