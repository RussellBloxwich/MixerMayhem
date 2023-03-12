function GetVoteResult(drinkVotes) {

  // Scale random chance to number of drinks

  // const totalChance = drinkVotes.reduce(
  //   (acc, curr) => acc + curr.drinkChance,
  //   0
  // );
  const randomChance = Math.random();

  let runningTotal = 0;
  for (const drink of drinkVotes) {
    runningTotal += drink.drinkChance;
    if (runningTotal >= randomChance) {
      return drink;
    }
  }

  // If no drink is found (e.g. due to no votes), pick at random
  var drinkVotesSliced =[];
  drinkVotes.forEach(element => {
    if (element.drinkName != 'Finish') {drinkVotesSliced.push(element)}
  });

  const randomIndex = Math.floor(Math.random() * drinkVotesSliced.length);
  return drinkVotesSliced[randomIndex];
}

export default GetVoteResult;
