import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BackButton from "./BackButton";
import "./Strategy.css";
import "./Setup.css";
import "./Gameplay.css";

const characters = [
  { id: 1, name: "Daisy" },
  { id: 2, name: "Hydrangeas" },
  { id: 3, name: "Rose" },
  { id: 4, name: "Bell" },
  { id: 5, name: "Lotus" },
];

export default function SetStrategy() {
  const location = useLocation();
  const p1selectedCharacters = location.state?.selectedCharacters || [];
  const p2selectedCharacters = [1, 2];
  const combinedCharacters = Array.from(new Set([...p1selectedCharacters, ...p2selectedCharacters]));

  const [selectedCharacters, setSelectedCharacters] = useState<number[]>(combinedCharacters);
  const [strategies, setStrategies] = useState<{ [key: number]: string }>({});
  const [editingCharacter, setEditingCharacter] = useState<number | null>(null);
  const [tempStrategy, setTempStrategy] = useState("");

  const handleEditClick = (id: number) => {
    setEditingCharacter(id);
    setTempStrategy(strategies[id] || "");
  };

  const handleSaveStrategy = () => {
    if (editingCharacter !== null) {
      setStrategies((prev) => ({
        ...prev,
        [editingCharacter]: tempStrategy,
      }));
    }
    setEditingCharacter(null);
  };

  const allStrategiesFilled =
    selectedCharacters.length > 0 &&
    selectedCharacters.every((id) => strategies[id]?.trim());

  return (
    <div>
      <div className="flex mr-320 mb-20">
        <BackButton />
      </div>
      <div className="flex flex-col items-center space-y-6 p-6 mb-50">
        <h1 className="text-xl font-semibold mt-4">Set Strategy</h1>
        <div className="flex flex-wrap gap-4">
          {selectedCharacters.map((id) => {
            const character = characters.find((char) => char.id === id);
            return (
              <div key={id} className="card p-4 border rounded-lg w-50">
                <div className="named text-center mb-4">{character?.name}</div>
                <div
                  className="justify-center"
                  style={{
                    backgroundImage: `url(/assets/${character?.name.toLowerCase()}.png)`,
                    width: "160px",
                    height: "180px",
                    backgroundSize: "190px",
                    backgroundPosition: "center",
                  }}
                ></div>
                
                <button
                  className={`edit button mt-4 w-full px-3 py-2 text-white rounded 
                    ${strategies[id]?.trim() ? "edited-button" : "edit-button"}`}
                  onClick={() => handleEditClick(id)}
                >
                  Edit Strategy
                </button>


              </div>
            );
          })}
        </div>

        {!allStrategiesFilled && selectedCharacters.length > 0 && (
          <h3 className="text-red-500 mb">Please set your minion strategy</h3>
        )}

        {allStrategiesFilled && (
          <Link to="/gameplay">
            <button className="confirm-button">CONFIRM</button>
          </Link>
        )}
      </div>

      {editingCharacter !== null && (
        <div className="modal-overlay">
          <div className="strategy-box modal-content p-6 bg-black rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Edit Strategy for {characters.find((c) => c.id === editingCharacter)?.name}
            </h2>
            <textarea
              className="w-full h-40 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              value={tempStrategy}
              onChange={(e) => setTempStrategy(e.target.value)}
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                className="cancle-button "
                onClick={() => setEditingCharacter(null)}
              >
                Cancel
              </button>
              <button
                className="save-button"
                onClick={handleSaveStrategy}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
