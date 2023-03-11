import GetDrinkOptions from './GetDrinkOptions.js';

function SetUpDrinkVotes() {
  console.log('Setting up drink votes object');
  let drinkVotes = [];
  let drinkOptions = GetDrinkOptions();
  drinkOptions.forEach((drink) => {
    drinkVotes.push({
      drinkName: drink,
      drinkVoteCount: 0,
      drinkChance: 0,
    });
  });
  return drinkVotes;
}

export default SetUpDrinkVotes;
