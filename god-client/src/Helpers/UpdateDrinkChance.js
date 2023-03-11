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
    updateVoteCountAndProportion(choiceName, decrement, 1);
  }

  function updateVoteCountAndProportion(
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
        console.log(choice);
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

    // let option = currentDrinkVotes.Map(
    //   (choice) => choice.drinkName == choiceName
    // );
    // incrementOrDecrement == 'increment'
    //   ? (option.drinkVoteCount += votes)
    //   : (option.drinkVoteCount -= votes);
    // // Recalculate percentage
    // var totalVoteCount = currentDrinkVotes.reduce(function (acc, obj) {
    //   return acc + obj.drinkVoteCount;
    // }, 0);
    // console.log('totalVoteCount!', totalVoteCount);
    // currentDrinkVotes[choiceName].drinkChance =
    //   currentDrinkVotes[choiceName].drinkVoteCount / totalVoteCount;
    // console.log('TEMP currentDrinkVotes', currentDrinkVotes);
  }

  let votesToAdd = isBoosted ? 1 : boostedMultiplier;
  updateVoteCountAndProportion(drinkChoice, 'increment', votesToAdd);
  whoHasVoted[`Round ${round}`][userId] = drinkChoice;

  return currentDrinkVotes;
}

export default UpdateDrinkChance;
