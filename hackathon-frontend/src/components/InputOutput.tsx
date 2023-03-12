import { IReceiveData } from "./types";
import React, { useEffect } from "react";
import { io } from "socket.io-client";
const sockets = io("http://3.25.151.51:3000");

interface IGetData {
  current: IReceiveData | undefined;
  setCurrent: React.Dispatch<React.SetStateAction<IReceiveData | undefined>>;
}

// Initial values are just for testing.
// TODO: Remove drink placeholder values if this works in prod
let data: IReceiveData = {
  roundNumber: 1,
  drinks: [
    { drinkName: "Coke", drinkVoteCount: 0, drinkChance: 10 },
    { drinkName: "Milk", drinkVoteCount: 0, drinkChance: 9 },
    { drinkName: "Juice", drinkVoteCount: 0, drinkChance: 24 },
    { drinkName: "Tabasco", drinkVoteCount: 0, drinkChance: 24 },
    { drinkName: "Vanilla essence", drinkVoteCount: 0, drinkChance: 24 },
    { drinkName: "Lemon juice", drinkVoteCount: 0, drinkChance: 12 },
    { drinkName: "Peppermint", drinkVoteCount: 0, drinkChance: 11 },
    { drinkName: "Soy sauce", drinkVoteCount: 0, drinkChance: 0 },
    { drinkName: "Mix", drinkVoteCount: 0, drinkChance: 0 },
    { drinkName: "Skip", drinkVoteCount: 0, drinkChance: 0 },
    { drinkName: "Finish Drink", drinkVoteCount: 0, drinkChance: 0 },
  ],
  isFinished: false,
  addedDrinks: [
    "Coke",
    "Milk",
    "Juice",
    "Tabasco",
    "Vanilla",
    "Lemon",
    "Peppermint",
    "Soy",
    "Mix",
    // "Skip",
    // "Finish Drink",
  ],
};

export const useGetDrinkOptions = (
  setRoundOptions: (options: string[]) => void
) => {
  useEffect(() => {
    sockets.on("drinkOptions", (drinkOptionsArrayFromSocket: string[]) => {
      console.log("Drink options", drinkOptionsArrayFromSocket);
      setRoundOptions(drinkOptionsArrayFromSocket);
    });
  }, [setRoundOptions]);
};

export const getVoteData = (): IReceiveData => {
  sockets.on("drinkChoiceData", (midRoundDataFromSocket) => {
    console.log("Drink choice data", midRoundDataFromSocket);
  });

  sockets.on("drinkChoice", (finalDataFromSocket) => {
    console.log(finalDataFromSocket);
  });

  return data;
};
