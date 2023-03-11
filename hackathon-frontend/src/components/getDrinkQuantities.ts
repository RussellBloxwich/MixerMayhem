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
const DRINKQUANTITIES: DrinkData[] = [
  { name: "Coke", volume: 200, colour: "brown" },
  { name: "Milk", volume: 200, colour: "white" },
  { name: "Juice", volume: 200, colour: "orange" },
  { name: "Tabasco", volume: 40, colour: "red" },
  { name: "Vanilla", volume: 20, colour: "NavahoWhite" },
  { name: "Lemon", volume: 20, colour: "yellow" },
  { name: "Peppermint", volume: 20, colour: "#C1E4D8" },
  { name: "Soy", volume: 20, colour: "black" },
];

const TOTALQUANTITY = 600;

export const getDrinkQuantities = (drinks: string[]) => {
  const toReturn = drinks.map((e: string) => {
    const drinkData = DRINKQUANTITIES.find((d) => {
      console.log(d.name, e);
      if (d.name === e) {
        return d;
      }
    });
    console.log("Drink Data: ", drinkData);
    const percentage = drinkData ? drinkData.volume / TOTALQUANTITY : 0;
    console.log(
      "Drink:",
      e,
      "    percentage:",
      percentage * 100,
      "DrinkData:",
      drinkData
    );
    return {
      name: e,
      percentage: percentage * 100,
      totalVolume: percentage * TOTALQUANTITY,
      colour: drinkData ? drinkData.colour : "",
    };
  });
  console.log("Returning: ", toReturn);
  return toReturn;
};
