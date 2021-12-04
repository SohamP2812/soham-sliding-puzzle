import logo from "./logo.svg";
import "./App.css";
import Squares from "./components/squares.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Soham's Sliding Puzzle</h1>
        <p>
          Click the number on your keyboard of the corresponding value of the
          square you want to move
        </p>
        <div className="parent">
          <Squares></Squares>
        </div>
      </header>
    </div>
  );
}

export default App;
