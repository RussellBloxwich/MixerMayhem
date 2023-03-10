import React from "react";
import "./OptionSelector.css";

interface IOptions {
  options: string[];
  setSelected: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const OptionSelector = ({ options, setSelected }: IOptions) => {
  return (
    <div className="option-selector">
      {options.map((option, i) => {
        return (
          <button
            onClick={() => {
              setSelected(i);
            }}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default OptionSelector;
