import React from "react";
import "./OptionSelector.css";

interface IOptions {
  options: string[];
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  selected: string;
  handleChoice: () => void;
}

const OptionSelector = ({
  options,
  setSelected,
  selected,
  handleChoice,
}: IOptions) => {
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
              <div>Chance: {option}%</div>
            </button>
          );
        }
      })}
    </div>
    : <div>Options will show when a new round starts.</div>
  );
};

export default OptionSelector;
