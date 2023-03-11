function VolumeAllowedDrinks(currentVolume) {
  const remainingVolume = 750 - currentVolume;

  var allowedSizes = [];
  var allowedDrinks = [];

  for (const sizes of drinkSizes) {
    if (sizes.volume < remainingVolume) {
      allowedSizes.push(sizes.size);
    }
  }

  for (const drinks of drinkOptions) {
    if (allowedSizes.includes(drinks.size)) {
      allowedDrinks.push(drinks.name);
    }
  }
  return allowedDrinks;
}

export const drinkSizes = [
  { size: 'L', volume: 200 },
  { size: 'S', volume: 10 },
];

export const drinkOptions = [
  { name: 'Coke', size: 'L' },
  { name: 'Milk', size: 'L' },
  { name: 'Juice', size: 'L' },
  { name: 'Vanilla', size: 'S' },
  { name: 'Lemon', size: 'S' },
  { name: 'Peppermint', size: 'S' },
  { name: 'Soy', size: 'S' },
  { name: 'Tabasco', size: 'S' },
];

export default VolumeAllowedDrinks;
