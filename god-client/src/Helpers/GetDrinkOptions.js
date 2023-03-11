import VolumeAllowedDrinks from './VolumeAllowedDrinks.js';

export function GetDrinkOptions(numberDrinks, currentVolume, actions) {
  var allowedDrinks = VolumeAllowedDrinks(currentVolume);
  if (actions[0] && actions[1]) {return GetRandomDrink(allowedDrinks, numberDrinks)};

  return GetRandomDrink(allowedDrinks, numberDrinks - 1).concat(addActions(actions));

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

const addActions = (actions) => {
  var actionList = [];
  if (!actions[0]) {actionList.push("Mix")}
  if (!actions[1]) {actionList.push("Heat")}

  if (actionList.length == 2) {
  return Math.floor(Math.random()*2) >= 1 ? actionList[1] : actionList[0];
  } 

  return actionList[0];
}

export default GetDrinkOptions;
