import React from "react";
import { IReceiveData } from "./types";

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

export const sendData = () => {};
