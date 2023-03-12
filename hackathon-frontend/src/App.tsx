import React, { useState, useEffect } from "react";
import "./App.css";
import OptionSelector from "./components/OptionSelector";
import { useGetDrinkOptions, useGetVoteData } from "./components/InputOutput";
import { IReceiveData, ISendData } from "./components/types";
import DrinkVisualization from "./components/DrinkVisualization";
import Login from "./components/Login";
import { generateUUID } from "./components/generateUUID";
import LoadingBar from "./components/LoadingBar";
import LoadingScreen from "./components/LoadingScreen";

import { io } from "socket.io-client";
const sockets = io("http://3.25.151.51:3000");

function App() {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string>("");
  const [roundOptions, setRoundOptions] = useState<string[]>([]);
  useGetDrinkOptions(setRoundOptions);
  const [voteData, setVoteData] = useState<IReceiveData | undefined>({
    roundNumber: 2,
    drinks: [{ drinkName: "Coke", drinkVoteCount: 20, drinkChance: 20 }],
    isFinished: false,
    addedDrinks: [],
  });
  useGetVoteData(setVoteData);
  const [currentOut, setCurrentOut] = useState<ISendData>({
    isBoosted: false,
    drinkChoice: "",
    id: generateUUID(userName),
    userName: userName,
    vote: "",
    roundEndChoice: "",
  });
  const [increasePower, setIncreasePower] = useState(false);

  // setVoteData({
  //   roundNumber: 2,
  //   drinks: [],
  //   isFinished: false,
  //   addedDrinks: ["Coke", "Vanilla"],
  // });
  console.log("voteData:", voteData);

  const handleChoice = () => {
    setCurrentOut({
      ...currentOut,
      isBoosted: increasePower,
      drinkChoice: selected,
    });
    sockets.emit("drinkChoice", currentOut);
    console.log(currentOut);
  };

  var finishDrinkPercentage = 0;
  var nextRoundPercentage = 0;

  useEffect(() => {
    if (voteData?.drinks != undefined) {
      voteData?.drinks.forEach((drink: any) => {
        if (drink.drinkName === "finish drink") {
          finishDrinkPercentage = drink.drinkChance;
        }
      });
    }

    if (voteData?.drinks != undefined) {
      voteData?.drinks.forEach((drink: any) => {
        if (drink.drinkName === "skip round") {
          nextRoundPercentage = drink.drinkChance;
        }
      });
    }
  }, [voteData]);

  return (
    <>
      {userName === "" && !loading && <Login setUserName={setUserName} />}
      {((loading && userName !== "") ||
        (voteData === undefined && userName !== "")) && (
        <LoadingScreen username={userName} />
      )}

      {userName !== "" && !loading && voteData !== undefined && (
        <div className="main-screen">
          <div className="App">
            <div className="project-name">
              <LoadingBar currentTime={40} totalTime={45} />
              <header>
                <div>User Name: {userName}</div>
                {/* <div>Round Number: {voteData?.roundNumber || 4}</div> */}
              </header>
              {
                //REMOVED THE BUTTON TO INCREASE POWER
              }
              {/* <button
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
              </button> */}
            </div>
            <OptionSelector
              options={roundOptions}
              setSelected={setSelected}
              selected={selected || ""}
              handleChoice={handleChoice}
              voteData={voteData}
            />
          </div>
          <div className="drink-visualization-wrapper">
            <DrinkVisualization
              data={
                //   {
                //   roundNumber: 2,
                //   drinks: [],
                //   isFinished: false,
                //   addedDrinks: ["Coke", "Vanilla", "Tobasco", "Soy"],
                // }
                voteData || {
                  roundNumber: 0,
                  drinks: [],
                  isFinished: false,
                  addedDrinks: [],
                }
              }
            />
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
      <button
        onClick={() =>
          setVoteData({
            roundNumber: 2,
            drinks: [
              { drinkName: "Coke", drinkVoteCount: 20, drinkChance: 20 },
              { drinkName: "Milk", drinkVoteCount: 202, drinkChance: 20 },
              { drinkName: "Vanilla", drinkVoteCount: 2, drinkChance: 20 },
              { drinkName: "Juice", drinkVoteCount: 14, drinkChance: 20 },
            ],
            isFinished: false,
            addedDrinks: ["Coke", "Vanilla", "Tobasco", "Soy"],
          })
        }
      >
        Click here to update data
      </button>
    </>
  );
}

export default App;
