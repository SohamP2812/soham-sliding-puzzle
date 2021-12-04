import React from "react";

function Square(props) {
  if (props.won) {
    return (
      <div className="square" style={{ background: "green" }}>
        <p></p>
      </div>
    );
  } else {
    if (props.number === 9) {
      return (
        <div className="square" style={{ background: "#282c33" }}>
          <p></p>
        </div>
      );
    } else {
      return (
        <div className="square">
          <p>{props.number}</p>
        </div>
      );
    }
  }
}

export default Square;
