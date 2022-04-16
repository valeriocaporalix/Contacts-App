import React from "react";
import './App.css';
import CreateData from "./components/create-data";
import SearchData from "./components/search-data";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="row">
        <CreateData />
        <SearchData />
        </div>
      </header>
    </div>
  );
}

export default App;
