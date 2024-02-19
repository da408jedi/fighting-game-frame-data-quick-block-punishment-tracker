import React, { useState } from "react";
import "./App.css";
import jsonData from "./fighter_data.json";

function App() {
  const fighters = jsonData.fighters;
  const [isFighter1Selected, setFighter1] = useState(false);
  const [selectedFighter1, changeText1] = useState("CHOOSE ▼");
  const [isFighter1MoveSelected, setFighter1Move] = useState(false);
  const [moveList1, getMoveList1] = useState([]);
  const [selectedMove1, changeMove1] = useState("None selected");
  const [selectedMoveOnBlock1, changeMoveOnBlock1] = useState(0);
  const [moveName, setMoveName] = useState("CHOOSE ▼");
  const [isFighter2Selected, setFighter2] = useState(false);
  const [selectedFighter2, changeText2] = useState("CHOOSE ▼");
  const [moveList2, getMoveList2] = useState([]);

  function FrameSum(a, b) {
    if ((a + b) <= 0) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="mainDiv">
      {/* dropdown 1 */}
      <div className="dropdown">
        <div className="dropdown-header">SELECT THE ATTACKING FIGHTER</div>
        <div className="dropdown-button" onClick={(e) => setFighter1(!isFighter1Selected)}>
          {selectedFighter1}
        </div>
        {isFighter1Selected && (
          <div className="dropdown-content">
            {fighters.map((fighter) => (
              <div className="dropdown-listed-item" key={fighter.name + "1"} onClick={(e) => {
                changeText1(fighter.name)
                setMoveName("CHOOSE ▼")
                getMoveList1([...fighter.movelist])
                changeMove1("None selected")
                changeMoveOnBlock1(0)
                setFighter1Move(false)
                setFighter1(false)
              }}>
                {fighter.name}
              </div>
              ))}
          </div>
        )}
      </div>
      {/* dropdown 1.2 */}
      {selectedFighter1 != "CHOOSE ▼" && <div className="dropdown">
        <div className="dropdown-header">SELECT THE ATTACKER'S MOVE</div>
        <div className="dropdown-button" onClick={(e) => setFighter1Move(!isFighter1MoveSelected)}>
          {moveName}
        </div>
        {isFighter1MoveSelected && (
          <div className="dropdown-content">
            {moveList1.map((move) => (
              <div className="dropdown-listed-item" key={move.movename + move.id} onClick={(e) => {
                setMoveName(move.movenotation)
                changeMove1(move.movenotation)
                changeMoveOnBlock1(move.onblock)
              }}>
                {move.movenotation} <b>({move.onblock})</b>
              </div>
            )
            )}
          
          
          </div>
        )}
      </div>}
      {/* center div*/}
      <div className="centerpiece">
        <h1>Tekken 8 (or any other fighting game)<br /> Quick Block Punishment Checker</h1>
        <div className="calculator">
          <h3>Attacker's Move:</h3>
          <b>{selectedMove1}</b>
          <h4>is {selectedMoveOnBlock1} on block,<br />and can be block punished by the following moves:</h4>
            <div className="punishing-moves">
              {moveList2.map((move) => (
                <div key={move.movename + move.id + "2"}>
                {FrameSum(selectedMoveOnBlock1, move.startupframes) &&
                  <div key={move.movename + move.id}>- i{move.startupframes}: <b>{move.movenotation}</b>
                  </div>
                }
                </div>
              ))}
            </div>
        </div>
        
        <p><b>How to use:</b></p>
        <ul>
          <li>Select the attacking fighter whose attack will get blocked</li>
          <li>Select the defending fighter that will punish the attack on block</li>
          <li>Select the attacking fighter's specific move</li>
          <li>Attacker's stun frames on block will be compared with the defending fighter's move startup, and the possible moves that will result will be listed on the defending fighter's side</li>
          <li><b>Important:</b> This tool does not take into account if players are crouching on block.</li>
        </ul>
        
      </div>
      {/* dropdown 2 */}
      <div className="dropdown">
        <div className="dropdown-header">SELECT THE DEFENDING FIGHTER</div>
        <div className="dropdown-button" onClick={(e) => setFighter2(!isFighter2Selected)}>
          {selectedFighter2}
        </div>
        {isFighter2Selected && (
          <div className="dropdown-content">
            {fighters.map((fighter) => (
              <div className="dropdown-listed-item" key={fighter.name + "2"} onClick={(e) => {
                changeText2(fighter.name)
                setFighter2(false)
                getMoveList2([...fighter.movelist])
              }}>
                {fighter.name}
              </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
