import React, { useState } from "react";
import "./App.css";
import OptionSelector from "./components/OptionSelector";

function App() {
  const [selected, setSelected] = useState<string>();

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
