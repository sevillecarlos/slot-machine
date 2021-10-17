import React from "react";
import SlotMachine from "./views/SlotMachine";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="ribbon">
        <a
          href="https://github.com/sevillecarlos/countries-slot-machine"
          rel="noreferrer"
          target="_blank"
        >
          @sevillecarlos🍒
        </a>
      </div>
      <SlotMachine />
    </div>
  );
}

export default App;
