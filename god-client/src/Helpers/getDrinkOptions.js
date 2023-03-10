function GetDrinkOptions(numberDrinks) {
  var drinksList = [];
  var drinkOptions = ['Coke', 'Water', 'Oil', 'Vanilla essence', 'Red bull'];
  var GetRandomDrink = () =>
    drinksList[Math.floor(Math.random() * drinksList.length)];

  for (drink in numberDrinks) {
    drinkOptions.push(GetRandomDrink());
  }

  return drinksList;
}

export default GetDrinkOptions;
