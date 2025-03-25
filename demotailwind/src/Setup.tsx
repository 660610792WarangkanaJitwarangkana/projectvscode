import { useState } from "react";
import { Link } from 'react-router-dom';
import BackButton from "./BackButton";
import "./Setup.css";
import "./Strategy.css";
import "./Start.css";

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
      <BackButton />
      <div className="p-1 max-w-md mx-auto text-center">
      {selectedCharacters.length > 0 && (
        <Link to="/strategy" state={{ selectedCharacters }}>
          <button className="next-button flex">
            NEXT
          </button>
        </Link>
        )}

        <h1>SETUP</h1>

        <h2 className="font-bold mb-4">1. Select Game Mode</h2>

        <div className="flex items-center justify-center gap-2 mb-4">
          <button className="arrow-left" onClick={handlePrevious}>
          </button>
          <div className="mode-selection">
            {modes[selectedModeIndex]}
          </div>
          <button className="arrow-right" onClick={handleNext}>
          </button>
        </div>
        <h2 className="text-xl font-bold mb-1">2. Select Character</h2>

      </div>

      <div>
      <div className="w-280 grid grid-cols-5 justify-center items-center mt-16 ml-40">
        {characters.map((character) => (
      <div
        key={character.id}
        className={`char ${character.name.toLowerCase()} ${selectedCharacters.includes(character.id) ? "selected" : ""}`}
            onClick={() => toggleCharacter(character.id)}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <div className={`hex ${character.name.toLowerCase()}`}></div>
          <div className={`character-name  ${selectedCharacters.includes(character.id) ? "text-yellow-500" : ""}`}>
            {character.name}
          </div>
      </div>))}
      </div>

      <div className="flex justify-center">
        {Array.from({ length: maxSelection }).map((_, index) => (
          <div
            key={index}
            className={`daimond ${index < selectedCharacters.length ? "selected" : "remain"} ${index === 1 ? "higher" : ""}`}
          />
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
        <h4 className="flex justify-center">Please choose at least 1 type of minion</h4>
      )} 
      
      </div>
      
  </div>
  );
};