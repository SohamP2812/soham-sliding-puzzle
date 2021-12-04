import React, { useState, useEffect } from "react";
import Square from "./square.js";

function Squares(props) {
  const [numbers, setNumbers] = useState([2, 7, 3, 5, 1, 9, 6, 4, 8]); // 9 = empty square
  const [win, setWin] = useState(false);

  useEffect(() => {
    let newNumbers = numbers.slice();
    newNumbers = numbers.slice();
    shuffle(newNumbers);
    while (!solvable(newNumbers)) {
      newNumbers = numbers.slice();
      shuffle(newNumbers);
      setNumbers(newNumbers);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", swap, false);

    return () => {
      document.removeEventListener("keydown", swap, false);
    };
  });

  useEffect(() => {
    let won = true;
    numbers.forEach(function (item, index, array) {
      if (index + 1 !== item) {
        won = false;
      }
    });
    if (won === true) {
      setWin(true);
    }
  }, [numbers]);

  function neighbour(numbers, index1) {
    let emptyPos = numbers.indexOf(9);
    let yLocEmpty = Math.floor(emptyPos / 3);
    let xLocEmpty = emptyPos - Math.floor(emptyPos / 3) * 3;
    let yLoc = Math.floor(index1 / 3);
    let xLoc = index1 - Math.floor(index1 / 3) * 3;

    if (
      ((xLoc - 1 === xLocEmpty || xLoc + 1 === xLocEmpty) &&
        yLoc === yLocEmpty) ||
      ((yLoc - 1 === yLocEmpty || yLoc + 1 === yLocEmpty) && xLoc === xLocEmpty)
    ) {
      return true;
    }
  }

  function swap(e) {
    let index = e.keyCode - 48;
    if (index > 0 && index < 9) {
      let pos = numbers.indexOf(index);
      let emptyPos = numbers.indexOf(9);
      let newNumbers = numbers.slice();
      if (neighbour(newNumbers, pos)) {
        newNumbers[emptyPos] = newNumbers[pos];
        newNumbers[pos] = 9;
      }
      setNumbers(newNumbers);
    }
  }

  function solvable(numbers) {
    let inversionSum = 0;
    numbers.forEach(function (item, index, array) {
      if (item !== 9) {
        for (let i = index + 1; i < 9; i++) {
          if (numbers[i] < item && item !== 9 && numbers[i] !== 9) {
            inversionSum++;
          }
        }
      }
    });
    if (inversionSum % 2 === 0) {
      console.log("solvable");
      return true;
    } else {
      console.log("not solvable");
      return false;
    }
  }

  function reset() {
    setWin(false);
    let newNumbers = numbers.slice();
    shuffle(newNumbers);
    setNumbers(newNumbers);
    while (!solvable(newNumbers)) {
      newNumbers = numbers.slice();
      shuffle(newNumbers);
      setNumbers(newNumbers);
    }
  }

  function shuffle(numbers) {
    let i = numbers.length;
    let rand;

    while (i !== 0) {
      rand = Math.floor(Math.random() * i);
      i--;

      let tmp = numbers[rand];
      numbers[rand] = numbers[i];
      numbers[i] = tmp;
    }

    return numbers;
  }

  return (
    <div>
      <ul className="squares" onClick={swap}>
        {numbers.map((number, index) => (
          <Square number={number} won={win} />
        ))}
      </ul>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Squares;
