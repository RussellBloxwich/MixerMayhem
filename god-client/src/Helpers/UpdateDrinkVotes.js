function updateDrinkVotes(currentDrinkVotes, drinkChoice, isBoosted) {
  let boostedMultiplier = 2;
  let votesToAdd = isBoosted ? 1 : 1 * boostedMultiplier;

  let totalVoteCount = currentDrinkVotes.values().length + votesToAdd;

  // [ {drinkName: string, drinkVoteCount: int, drinkChance: decimal} ]
  currentDrinkVotes.forEach((drink) => {
    drink.drinkVoteCount += votesToAdd;
    drink.drinkChance = drink.drinkVoteCount / totalVoteCount;
  });
}

export default updateDrinkVotes;
