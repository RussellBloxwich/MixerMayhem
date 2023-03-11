type Dictionary<T> = Record<string, T>;
var drinkVolumeList: Dictionary<number> = { init: -1 };
var drinkPercentageState: DrinkPercentage[] = [
  { name: "init", percentage: 0, totalVolume: 0, colour: "black" },
];

interface DrinkPercentage {
  name: string;
  percentage: number;
  totalVolume: number;
  colour: string;
}

interface DrinkData {
  name: string;
  volume: number;
  colour: string;
}

// Drink List
const drinkList: DrinkData[] = [
  { name: "Coke", volume: 200, colour: "brown" },
  { name: "Milk", volume: 200, colour: "white" },
  { name: "Juice", volume: 200, colour: "orange" },
  { name: "Tabasco", volume: 20, colour: "red" },
  { name: "Vanilla", volume: 20, colour: "NavahoWhite" },
  { name: "Lemon", volume: 20, colour: "yellow" },
  { name: "Peppermint", volume: 20, colour: "#C1E4D8" },
  { name: "Soy", volume: 20, colour: "black" },
];

// Set number of decimal places for the percentages
const PERCENTAGEROUNDING = 0;

export const getDrinkArray = (
  drinkList: Array<string>
): Array<DrinkPercentage> => {
  readDrinkStateList(drinkList);
  return drinkPercentageState;
};

const readDrinkStateList = (drinkList: Array<string>) => {
  // Tally up drinks
  for (const drink of drinkList) {
    if (drinkAlreadyTallied(drink)) {
      drinkVolumeList[drink] += findDrinkVolume(drink);
    } else {
      drinkVolumeList[drink] = findDrinkVolume(drink);
    }
  }
  // Remove init value
  delete drinkVolumeList["init"];

  // Find total volume
  var totalVolume = 0;
  for (const drink in drinkVolumeList) {
    totalVolume += drinkVolumeList[drink];
  }
  if (totalVolume === 0) {
    totalVolume = 1;
  }

  // create percentage state array
  for (const drink in drinkVolumeList) {
    const drinkPercentageData: DrinkPercentage = {
      name: drink,
      percentage: parseInt(
        ((100 * drinkVolumeList[drink]) / totalVolume).toFixed(
          PERCENTAGEROUNDING
        )
      ),
      totalVolume: drinkVolumeList[drink],
      colour: findDrinkColour(drink),
    };
    drinkPercentageState.push(drinkPercentageData);
  }
  // Remove init value
  drinkPercentageState.splice(0, 1);
};

const drinkAlreadyTallied = (name: string): boolean => {
  if (drinkVolumeList === undefined) {
    return false;
  }
  return name in drinkVolumeList;
};

const findDrinkVolume = (drink: string) => {
  const drinkVolume = drinkList.find(
    (drinkObj) => drinkObj.name === drink
  )?.volume;
  return drinkVolume ? drinkVolume : 0;
};

const findDrinkColour = (drink: string) => {
  const drinkColour = drinkList.find(
    (drinkObj) => drinkObj.name === drink
  )?.colour;
  return drinkColour ? drinkColour : "black";
};

export default getDrinkArray;
