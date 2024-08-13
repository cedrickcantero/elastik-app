import React from "react";
import { BrowserRouter } from "react-router-dom";
import RouterManager from "./RouterManager";
import "./styles/App.scss";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <RouterManager />
      </div>
    </BrowserRouter>
  );
}

export default App;
