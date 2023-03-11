import GetDrinkOptions from './GetDrinkOptions.js';

function SetUpDrinkVotes() {
  console.log('Setting up drink votes object');
  let drinkVotes = [];
  let drinkOptions = GetDrinkOptions(5, 0);
  console.log(drinkOptions);
  drinkOptions.forEach(element => {
    drinkVotes.push({
      drinkName: element,
      drinkVoteCount: 0,
      drinkChance: 0,
    });
  });
  return drinkVotes;
}

export default SetUpDrinkVotes;
