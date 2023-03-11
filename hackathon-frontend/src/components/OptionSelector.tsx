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
        return (
          <button className={`${selected === option.drinkName ? "selected" : ""}`}
            key={option.drinkName + i.toString}
            onClick={() => {
              setSelected(option.drinkName);
            }}
          >
            {option.drinkName} Chance: {option.drinkChance}
          </button>
        );
      })}
    </div>
  );
};

export default OptionSelector;
