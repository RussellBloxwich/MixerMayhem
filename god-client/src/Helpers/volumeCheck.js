function AllowedDrinks(currentVolume) {
  const remainingVolume = 750 - currentVolume;

  var allowedSizes = [];
  var allowedDrinks = [];

  for (const sizes in drinkSizes) {
    if (sizes.volume < remainingVolume) {
      allowedSizes.push(sizes.size);
    }
  }

  for (const drinks in drinkOptions) {
    if (allowedSizes.includes(drinks.size)) {
      allowedDrinks.push(drinks.name);
    }
  }
}

export const drinkSizes = [
  { size: 'L', volume: 200 },
  { size: 'M', volume: 10 },
  { size: 'S', volume: 15 },
];

export const drinkOptions = [
  { name: 'coke', size: 'L' },
  { name: 'Water', size: 'L' },
  { name: 'Oil', size: 'M' },
  { name: 'Vanilla  essence', size: 'S' },
  { name: 'Red bull', size: 'L' },
];

export default AllowedDrinks;
