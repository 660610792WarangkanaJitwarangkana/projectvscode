import { useState } from "react";
import { Link } from 'react-router-dom';
import "./Setup.css";
import "./Gameplay.css";

const modes = ["DUEL", "SOLITAIRE", "AUTO"];
const characters = [
  { id: 1, name: "Daisy" },
  { id: 2, name: "Hydrangeas" },
  { id: 3, name: "Rose" },
  { id: 4, name: "Bell" },
  { id: 5, name: "Lotus" },
];

export default function CharacterSelection() {
  const [selectedModeIndex, setSelectedModeIndex] = useState(0);
  const [selectedCharacters, setSelectedCharacters] = useState<number[]>([]);
  const maxSelection = 3;

  const toggleCharacter = (id: number) => {
    setSelectedCharacters((prev) =>
      prev.includes(id)
        ? prev.filter((charId) => charId !== id)
        : prev.length < maxSelection
        ? [...prev, id]
        : prev
    );
  };

  const handlePrevious = () => {
    setSelectedModeIndex((prevIndex) => (prevIndex === 0 ? modes.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setSelectedModeIndex((prevIndex) => (prevIndex === modes.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div>
    <div className="p-4 max-w-md mx-auto text-center">
      <h1>SETUP</h1>

      <h2 className="text-xl font-bold mb-4">1. Select Game Mode</h2>

      <div className="flex items-center justify-center gap-4 mb-6">
        <button className="px-4 py-2 bg-gray-300 rounded" onClick={handlePrevious}>
          ←
        </button>
        <div className="mode-selection">
          {modes[selectedModeIndex]}
        </div>
        <button className="arrowright" onClick={handleNext}>
        </button>
      </div>

    </div>

    <div className="grid grid-cols-5 gap-4 justify-items-center items-center">
        {characters.map((character) => (
      <div
        key={character.id}
        className={`char ${character.name.toLowerCase()} ${selectedCharacters.includes(character.id) ? "selected" : ""}`}
            onClick={() => toggleCharacter(character.id)}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
    >
      <div className={`hex ${character.name.toLowerCase()}`} style={{ width: '100px', height: '100px' }}></div>
          <div className={`character-name mt-2 ${selectedCharacters.includes(character.id) ? "text-yellow-500" : ""}`}>
            {character.name}
          </div>
      </div>
  ))}
  </div>


      <div className="flex justify-center mb-4">
        {Array.from({ length: maxSelection }).map((_, index) => (
          <div
            key={index}
            className={`daimond ${index < selectedCharacters.length ? "selected" : "remain"} ${index === 1 ? "higher" : ""}`}
          />
        ))}
      </div>

      {selectedCharacters.length === 0 && (
        <p className="text-red-500 mt-4">Please choose at least 1 type of minion</p>
      )}

      {selectedCharacters.length > 0 && (
        <Link to="/gameplay">
          <button className="#confirm-btn">
            CONFIRM
          </button>
        </Link>
      )}
    
    
  </div>
  );
}
