import VolumeAllowedDrinks from './VolumeAllowedDrinks.js';

export function GetDrinkOptions(numberDrinks, currentVolume) {
  var allowedDrinks = VolumeAllowedDrinks(currentVolume);
  return GetRandomDrink(allowedDrinks, numberDrinks);
}

const GetRandomDrink = (allowedDrinks, numberDrinks) => {
  const drinkList = [];
  const shuffled = allowedDrinks;
  var l = allowedDrinks.length;
  var i = 0;
  var temp = "";

  while (l--) {
    i = Math.floor(Math.random() * (l + 1));
    temp = shuffled[l];
    shuffled[l] = shuffled[i];
    shuffled[i] = temp;
  }

  for (let j = 0; j < numberDrinks; j++) {
    drinkList.push(shuffled[j]);
  }

  return drinkList;
};

export default GetDrinkOptions;
