import React, { useState } from "react";
import "./App.css";
import OptionSelector from "./components/OptionSelector";

function App() {
  const [selected, setSelected] = useState<number>();

  console.log(selected);

  return (
    <div className="main-screen">
      <div className="App">
        <div className="project-name">Name of Project</div>
        <OptionSelector
          options={["option1", "option2"]}
          setSelected={setSelected}
        />
      </div>
      <footer>
        <button
          className="skip-finish-button"
          onClick={() => {
            setSelected(-1);
          }}
        >
          Skip Round
        </button>
        <button
          className="skip-finish-button"
          onClick={() => {
            setSelected(-2);
          }}
        >
          Finish Drink
        </button>
      </footer>
    </div>
  );
}

export default App;
