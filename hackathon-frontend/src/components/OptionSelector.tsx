import React from "react";
import "./OptionSelector.css";

interface IOptions {
  options: { drinkName: string; drinkChance: number }[];
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  selected: string;
}

const OptionSelector = ({ options, setSelected, selected }: IOptions) => {
  return (
    <div className="option-selector">
      {options.map((option, i) => {
        if (
          !(option.drinkName === "finish drink") &&
          !(option.drinkName === "skip round")
        ) {
          return (
            <button
              className={`${
                selected === option.drinkName ? "selected " : ""
              } drink-option`}
              key={option.drinkName + i.toString}
              onClick={() => {
                setSelected(option.drinkName);
              }}
            >
              <div>{option.drinkName}</div>{" "}
              <div>Chance: {option.drinkChance}%</div>
            </button>
          );
        }
      })}
    </div>
  );
};

export default OptionSelector;
