function GetVoteResult(drinkVotes) {
  // TODO: Add skip logic (treated differently)

  // Scale random chance to number of drinks
  const totalChance = drinkVotes.reduce(
    (acc, curr) => acc + curr.drinkChance,
    0
  );
  const randomChance = Math.random() * totalChance;

  let runningTotal = 0;
  for (const drink of drinkVotes) {
    runningTotal += drink.drinkChance;
    if (runningTotal >= randomChance) {
      return drink;
    }
  }

  // If no drink is found (e.g. due to no votes), pick at random
  const randomIndex = Math.floor(Math.random() * drinkVotes.length);
  return drinkVotes[randomIndex];
}

export default GetVoteResult;
