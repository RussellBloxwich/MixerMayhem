function GetVoteResult(drinkVotes) {
  // Scale random chance to number of drinks

  var selectedOption;

  const totalChance = drinkVotes.reduce(
    (acc, curr) => acc + curr.drinkChance,
    0
  );
  const randomChance = Math.random() * totalChance;

  let runningTotal = 0;
  for (const drink of drinkVotes) {
    runningTotal += drink.drinkChance;
    if (runningTotal >= randomChance) {
      selectedOption = drink;
    }
  }

  // If no drink is found (e.g. due to no votes), pick at random
  if (!selectedOption) {
    const randomIndex = Math.floor(Math.random() * drinkVotes.length);
    selectedOption = drinkVotes[randomIndex];
  }
}
export default GetVoteResult;
