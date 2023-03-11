import AllowedDrinks from './VolumeCheck.js';

function GetDrinkOptions(numberDrinks = 5, currentVolume = 0) {
  var drinkOptions = [];
  // var drinksList = AllowedDrinks(currentVolume);
  var drinksList = [
    'Coke',
    'Milk',
    'Juice',
    'Vanilla essence',
    'Lime juice',
    'Peppermint essence',
  ];
  var GetRandomDrink = () =>
    drinksList[Math.floor(Math.random() * drinksList.length)];
  for (drink in numberDrinks) {
    drinkOptions.push(GetRandomDrink());
  }
  return drinksList;
}

export default GetDrinkOptions;
