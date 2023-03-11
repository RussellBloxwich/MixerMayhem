import AllowedDrinks from './VolumeCheck.js';

function GetDrinkOptions(numberDrinks, currentVolume) {
  var drinksList = AllowedDrinks(currentVolume);
  var GetRandomDrink = () =>
    drinksList[Math.floor(Math.random() * drinksList.length)];
  for (drink in numberDrinks) {
    drinkOptions.push(GetRandomDrink());
  }
  return drinksList;
}

export default GetDrinkOptions;
