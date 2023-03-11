import React from "react";
import "./OptionSelector.css";
import { IReceiveData } from "./types";

interface IOptions {
  options: string[];
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  selected: string;
  handleChoice: () => void;
  voteData: any | undefined;
}

const OptionSelector = ({
  options,
  setSelected,
  selected,
  handleChoice,
  voteData
}: IOptions) => {
  console.log('voteData', voteData)
  return (
    options ?
    <div className="option-selector">
      {options.map((option, i) => {
        if (
          !(option === "finish drink") &&
          !(option === "skip round")
        ) {
          return (
            <button
              className={`${
                selected === option ? "selected " : ""
              } drink-option`}
              key={option + i.toString}
              onClick={() => {
                setSelected(option);
                handleChoice();
              }}
            >
              <div>{option}</div>{" "}
              <div>Chance: {voteData?.drinkChance ?? "0"}%</div>
            </button>
          );
        }
      })}
    </div>
    : <div>Options will show when a new round starts.</div>
  );
};

export default OptionSelector;
