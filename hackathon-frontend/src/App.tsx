import React, { useState } from "react";
import "./App.css";
import OptionSelector from "./components/OptionSelector";
import { getData } from "./components/InputOutput";
import { IReceiveData, ISendData } from "./components/types";
import DrinkVisualization from "./components/DrinkVisualization";
import Login from "./components/Login";
import { generateUUID } from "./components/generateUUID";
import LoadingBar from "./components/LoadingBar";

function App() {
  const [userName, setUserName] = useState("");
  const [selected, setSelected] = useState<string>("");
  const [currentIn, setCurrentIn] = useState<IReceiveData>(getData());
  const [currentOut, setCurrentOut] = useState<ISendData>({
    isBoosted: false,
    drinkChoice: "",
    id: generateUUID(userName),
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
    <>
      {userName === "" && <Login setUserName={setUserName} />}
      {userName !== "" && (
        <div className="main-screen">
          <div className="App">
            <div className="project-name">
              <LoadingBar currentTime={40} totalTime={45} />
              <header>
                <div>{userName}</div>
                <div>Round Number: {currentIn?.roundNumber}</div>
              </header>
              <button
                className="increase-vote"
                style={{
                  backgroundColor: increasePower
                    ? "rgba(255, 255, 0, 0.7)"
                    : "rgba(0, 214, 0, 0.3)",
                }}
                onClick={() => {
                  setIncreasePower(!increasePower);
                  handleChoice();
                }}
              >
                Increase Vote Power: {increasePower ? " Active" : " Inactive"}
              </button>
            </div>
            <OptionSelector
              options={currentIn?.drinks}
              setSelected={setSelected}
              selected={selected || ""}
              handleChoice={handleChoice}
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
                handleChoice();
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
                handleChoice();
              }}
            >
              <div>Finish Drink</div>
              <div>{finishDrinkPercentage}%</div>
            </button>
          </footer>
        </div>
      )}
    </>
  );
}

export default App;
