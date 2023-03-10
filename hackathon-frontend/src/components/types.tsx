import React from "react";

export interface ISendData {
  id: string;
  userName: string;
  vote: string;
  isBoosted: boolean;
}

export interface IReceiveData {
  roundNumber: number;
  drinks: { drinkName: string; drinkChance: number }[];
  isFinished: boolean;
  addedDrinks : string[]
}
