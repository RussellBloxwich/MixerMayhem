import React from "react";
import "./OptionSelector.css";
import { IReceiveData } from "./types";

interface IOptions {
  options: string[];
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  selected: string;
  handleChoice: () => void;
  voteData: IReceiveData | undefined;
}

const testData = {
  roundNumber: 4,
  drinks: [
    { drinkName: "Coke", drinkVoteCount: 20, drinkChance: 20 },
    { drinkName: "Coke", drinkVoteCount: 20, drinkChance: 20 },
    { drinkName: "Coke", drinkVoteCount: 20, drinkChance: 20 },
    { drinkName: "Coke", drinkVoteCount: 20, drinkChance: 20 },
  ],
  isFinished: false,
  addedDrinks: [],
};

const OptionSelector = ({
  options,
  setSelected,
  selected,
  handleChoice,
  voteData = {
    roundNumber: 4,
    drinks: [
      { drinkName: "Coke", drinkVoteCount: 20, drinkChance: 20 },
      { drinkName: "Coke", drinkVoteCount: 20, drinkChance: 20 },
      { drinkName: "Coke", drinkVoteCount: 20, drinkChance: 20 },
      { drinkName: "Coke", drinkVoteCount: 20, drinkChance: 20 },
    ],
    isFinished: false,
    addedDrinks: [],
  },
}: IOptions) => {
  var display;

  const handleClick = (name: string) => {
    setSelected(name);
    console.log(name);
    handleChoice();
  };

  if (voteData !== undefined) {
    display = voteData.drinks.map((e) => {
      return (
        <button
          key={e.drinkName}
          onClick={() => {
            handleClick(e.drinkName);
          }}
        >
          {e.drinkName} : {e.drinkChance}
        </button>
      );
    });
  } else {
    display = options.map((e) => {
      return (
        <button
          key={e}
          onClick={() => {
            handleClick(e);
          }}
        >
          {e}
        </button>
      );
    });
  }

  return <>{display}</>;
};

export default OptionSelector;
