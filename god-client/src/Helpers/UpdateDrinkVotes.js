function UpdateDrinkVotes(currentDrinkVotes, drinkChoice, isBoosted = false) {
  let boostedMultiplier = 2;
  let votesToAdd = isBoosted ? 1 : 1 * boostedMultiplier;

  let totalVoteCount = Object.values(currentDrinkVotes).length + votesToAdd;

  // [ {drinkName: string, drinkVoteCount: int, drinkChance: decimal} ]
  Object.values(currentDrinkVotes).forEach((drink) => {
    if (drink.drinkName == drinkChoice) {
      drink.drinkVoteCount += votesToAdd;
    }
    drink.drinkChance = drink.drinkVoteCount / totalVoteCount;
  });

  return currentDrinkVotes;
}

export default UpdateDrinkVotes;
