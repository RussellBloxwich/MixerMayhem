import React, { useEffect, useState } from "react";
import "./App.css";
import OptionSelector from "./components/OptionSelector";
import { getData } from "./components/InputOutput";
import { IReceiveData, ISendData } from "./components/types";
import DrinkVisualization from "./components/DrinkVisualization";

function App() {
  const userName = "getUserNameHere";
  const [selected, setSelected] = useState<string>("");
  const [currentIn, setCurrentIn] = useState<IReceiveData>(getData());
  const [currentOut, setCurrentOut] = useState<ISendData>({
    isBoosted: false,
    drinkChoice: "",
    id: "",
    userName: userName,
    vote: "",
    roundEndChoice: "",
  });
  const [increasePower, setIncreasePower] = useState(false);

  console.log(selected);

  const handleChoice = () => {
    setCurrentOut({
      ...currentOut,
      isBoosted: increasePower,
      drinkChoice: selected,
    });
  };

  var finishDrinkPercentage = 0;
  currentIn.drinks.forEach((drink) => {
    if (drink.drinkName === "finish drink") {
      finishDrinkPercentage = drink.drinkChance;
    }
  });

  var nextRoundPercentage = 0;
  currentIn.drinks.forEach((drink) => {
    if (drink.drinkName === "skip round") {
      nextRoundPercentage = drink.drinkChance;
    }
  });

  return (
    <div className="main-screen">
      <div className="App">
        <div className="project-name">
          Round Number: {currentIn?.roundNumber}
          <button
            className="increase-vote"
            style={{
              backgroundColor: increasePower
                ? "rgba(255, 255, 0, 0.7)"
                : "rgba(0, 214, 0, 0.3)",
            }}
            onClick={() => {
              setIncreasePower(!increasePower);
            }}
          >
            Increase Vote Power: {increasePower ? " Active" : " Inactive"}
          </button>
        </div>
        <OptionSelector
          options={currentIn?.drinks}
          setSelected={setSelected}
          selected={selected || ""}
        />
      </div>
      <div className="drink-visualization-wrapper">
        <DrinkVisualization />
      </div>
      <footer>
        <button
          className={`${
            selected === "skip" ? "selected " : ""
          } skip-finish-button`}
          onClick={() => {
            setSelected("skip");
          }}
        >
          <div>Skip Round</div>
          <div>{nextRoundPercentage}%</div>
        </button>
        <button
          className={`${
            selected === "finish" ? "selected " : ""
          } skip-finish-button`}
          onClick={() => {
            setSelected("finish");
          }}
        >
          <div>Finish Drink</div>
          <div>{finishDrinkPercentage}%</div>
        </button>
      </footer>
    </div>
  );
}

export default App;
