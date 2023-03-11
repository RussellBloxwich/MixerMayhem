import { toNamespacedPath } from "path";

function UpdateDrinkVotes(currentDrinkVotes, drinkChoice, isBoosted) {
  let boostedMultiplier = 2;
  let votesToAdd = (isBoosted ? boostedMultiplier : 1);
  let totalVoteCount = 0;

  console.log(`isBoosted: ${isBoosted}`);
  console.log(`votesToAdd: ${votesToAdd}`);

  currentDrinkVotes.forEach(element => {
    totalVoteCount += element.drinkVoteCount;
  })
  totalVoteCount += votesToAdd;

  console.log(`totalVoteCount: ${JSON.stringify(totalVoteCount)}`);
  
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
