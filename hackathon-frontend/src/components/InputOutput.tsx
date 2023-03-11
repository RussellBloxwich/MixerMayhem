import { IReceiveData } from "./types";

interface IGetData {
  current: IReceiveData | undefined;
  setCurrent: React.Dispatch<React.SetStateAction<IReceiveData | undefined>>;
}

export const getData = (): IReceiveData => {
  const test: IReceiveData = {
    roundNumber: 4,
    drinks: [
      { drinkName: "Coke", drinkChance: 10 },
      { drinkName: "vanilla essence", drinkChance: 9 },
      { drinkName: "ice", drinkChance: 24 },
    ],
    isFinished: false,
    addedDrinks: ["tobasco", "mayonnaise", "vodka", "apple juice"],
  };

  return test;
};
