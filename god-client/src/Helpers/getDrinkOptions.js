import VolumeAllowedDrinks from './VolumeAllowedDrinks.js';

function GetDrinkOptions(numberDrinks = 5, currentVolume = 0) {
  var drinkOptions = [];
  // var drinksList = VolumeAllowedDrinks(currentVolume);
  var drinksList = [
    'Coke',
    'Milk',
    'Juice',
    'Vanilla essence',
    'Lime juice',
    'Peppermint essence',
  ];

  let GetRandomDrink = () =>
    drinksList[Math.floor(Math.random() * drinksList.length)];

  for (drink in numberDrinks) {
    drinkOptions.push(GetRandomDrink());
  }

  return drinksList;
}

export default GetDrinkOptions;
