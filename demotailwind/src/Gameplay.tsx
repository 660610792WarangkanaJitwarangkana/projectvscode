import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./index.css";
import "./Gameplay.css";

type Owner = "empty" | "player1" | "player2";
type HexType = "stone" | "grass" | "wood";

const HexTile: React.FC<{ isOffset: boolean }> = ({ isOffset }) => {
  const [owner, setOwner] = useState<Owner>("empty");
  const [hexType, setHexType] = useState<HexType | null>(null);
  const [showBuy, setShowBuy] = useState<boolean>(false);

  useEffect(() => {
    const randomType = Math.random();
    if (randomType < 0.33) setHexType("stone");
    else if (randomType < 0.66) setHexType("grass");
    else setHexType("wood");
  }, []);

  const handleClick = () => {
    setOwner((prev) => {
      if (prev === "empty") return "player1";
      if (prev === "player1") return "player2";
      return "empty";
    });
  };

  const handleMouseEnter = () => {
    if (owner === "player1") setShowBuy(true);
  };

  const handleMouseLeave = () => {
    setShowBuy(false);
  };

  return (
    <div
      className={`hex ${owner} ${hexType}`}
      style={{ marginTop: isOffset ? "32px" : "42px" }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showBuy && <div className="buy-text">Buy</div>}
    </div>
  );
};

const HexGrid: React.FC = () => {
  return (
    <div className="hex-grid">
      {Array.from({ length: 8 }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="hex-row"
          style={{ marginTop: rowIndex % 2 === 1 ? "0px" : "40px" }}
        >
          {Array.from({ length: 8 }).map((_, colIndex) => (
            <HexTile key={`${rowIndex}-${colIndex}`} isOffset={rowIndex % 2 === 1} />
          ))}
        </div>
      ))}
    </div>
  );
};

function App() {
  const [timeLeft, setTimeLeft] = useState<number>(180);
  const [coins, setCoins] = useState<number>(50);
  const maxCoins: number = 100;
  const [turn, setTurn] = useState<number>(1);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [phase, setPhase] = useState<string>("BUY PHASE");
  const [round, setRound] = useState<number>(1);
  const [hexCounts, setHexCounts] = useState<{ stone: number; grass: number; wood: number }>({
    stone: 0,
    grass: 0,
    wood: 0,
  });

  useEffect(() => {
    if (timeLeft > 0 && !isReady) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isReady) {
      setPhase(`ROUND ${round}`);
    }
  }, [timeLeft, isReady, round]);

  useEffect(() => {
    const hexTiles = document.querySelectorAll(".hex");
    let stoneCount = 0;
    let grassCount = 0;
    let woodCount = 0;

    hexTiles.forEach((tile) => {
      if (tile.classList.contains("empty")) stoneCount++;
      if (tile.classList.contains("player1")) grassCount++;
      if (tile.classList.contains("player2")) woodCount++;
    });

    setHexCounts({ stone: stoneCount, grass: grassCount, wood: woodCount });
  }, []);

  const handleReadyClick = () => {
    setIsReady((prev) => !prev);
    setPhase((prev) => (prev === "BUY PHASE" ? "WAITING..." : "BUY PHASE"));
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <h3 className="absolute right-18 font-bold">Time :</h3>
      <div className="relative w-full mt-4">
        <h2 className="absolute top-5 left-323 bg-white p-2 rounded-lg shadow-xl ">
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
        </h2>
      </div>
      <h1 className="text-white text-4xl font-bold">{phase}</h1>

      <HexGrid />

      <div className="flex justify-between w-full max-w-xl mt-6">
        {coins}/{maxCoins}
      </div>

      <div className="mt-4">
        <p>Start Turn: Player {turn}</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleReadyClick}
        >
          {isReady ? "CANCEL" : "READY"}
        </button>
      </div>

      <div className="mt-4">
        <p>Stone: {hexCounts.stone}, Grass: {hexCounts.grass}, Wood: {hexCounts.wood}</p>
      </div>
    </div>
  );
}

export default App;