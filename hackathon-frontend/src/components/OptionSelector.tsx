import React from "react";
import "./OptionSelector.css";

interface IOptions {
  options: { drinkName: string; drinkChance: number; }[];
  setSelected: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const OptionSelector = ({ options, setSelected }: IOptions) => {
  return (
    <div className="option-selector">
      {options.map((option, i) => {
        return (
          <button
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
