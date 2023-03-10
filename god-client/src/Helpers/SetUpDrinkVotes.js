import GetDrinkOptions from './GetDrinkOptions.js';

function SetUpDrinkVotes(drinkOptions) {
  let drinkVotes = [];
  let allOptions = [...drinkOptions, 'Skip', 'Finish'];

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
