import GetDrinkOptions from './GetDrinkOptions.js';

function SetUpDrinkVotes() {
  let drinkVotes = [];
  let drinkOptions = GetDrinkOptions(5, 0);
  let allOptions = [...drinkOptions, 'Skip', 'End', 'Rotate'];

  console.log(`Drink and action options: ${allOptions}`);
  allOptions.forEach((element) => {
    drinkVotes.push({
      drinkName: element,
      drinkVoteCount: 0,
      drinkChance: 0,
    });
  });
  return drinkVotes;
}

export default SetUpDrinkVotes;
