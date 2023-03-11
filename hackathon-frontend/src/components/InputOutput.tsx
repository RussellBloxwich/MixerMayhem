import { IReceiveData } from "./types";
import { io } from 'socket.io-client';
const sockets = io('http://3.25.151.51:3000');

interface IGetData {
  current: IReceiveData | undefined;
  setCurrent: React.Dispatch<React.SetStateAction<IReceiveData | undefined>>;
}

export const getData = (): IReceiveData => {
  console.log("Entered InputOutput.");

  sockets.on('drinkChoice', (socket) => {
    console.log(socket);
  });

  sockets.on('drinkChoiceData', (socket) => {
    console.log(socket);
  });

  const test: IReceiveData = {
    roundNumber: 4,
    drinks: [
      { drinkName: "Coke", drinkChance: 10 },
      { drinkName: "vanilla essence", drinkChance: 9 },
      { drinkName: "ice", drinkChance: 24 },
      { drinkName: "vinegar", drinkChance: 24 },
      { drinkName: "mix", drinkChance: 24 },
      { drinkName: "finish drink", drinkChance: 12 },
      { drinkName: "skip round", drinkChance: 11 },
    ],
    isFinished: false,
    addedDrinks: ["tobasco", "mayonnaise", "vodka", "apple juice"],
  };

  return test;
};
