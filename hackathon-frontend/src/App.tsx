import React, { useEffect, useState } from "react";
import "./App.css";
import OptionSelector from "./components/OptionSelector";
import { getData } from "./components/InputOutput";
import { IReceiveData, ISendData } from "./components/types";

function App() {
  const [selected, setSelected] = useState<string>();
  const [currentIn, setCurrentIn] = useState<IReceiveData>();
  const [currentOut, setCurrentOut] = useState<ISendData>();

  console.log(selected);

  useEffect(
    getData({ current: currentIn, setCurrent: setCurrentIn })
  );

  return (
    <div className="main-screen">
      <div className="App">
        <div className="project-name">
          Round Number: {currentIn?.roundNumber}
        </div>
        <OptionSelector
          options={currentIn?.drinks || []}
          setSelected={setSelected}
        />
      </div>
      <footer>
        <button
          className="skip-finish-button"
          onClick={() => {
            setSelected("skip");
          }}
        >
          Skip Round
        </button>
        <button
          className="skip-finish-button"
          onClick={() => {
            setSelected("finish");
          }}
        >
          Finish Drink
        </button>
      </footer>
    </div>
  );
}

export default App;
