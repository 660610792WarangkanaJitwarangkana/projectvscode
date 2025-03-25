import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./index.css";
import "./Gameplay.css";

type Owner = "empty" | "player1" | "player2";

type HexProps = {
  row: number;
  col: number;
  initialOwner: Owner;
};

const initialGrid: Owner[][] = Array(8)
  .fill(null)
  .map(() => Array(8).fill("empty" as Owner));

const predefinedTiles = [
  { row: 1, col: 1, owner: "player2" as Owner },
  { row: 1, col: 2, owner: "player2" as Owner },
  { row: 1, col: 3, owner: "player2" as Owner },
  { row: 2, col: 1, owner: "player2" as Owner },
  { row: 2, col: 2, owner: "player2" as Owner },
  { row: 8, col: 6, owner: "player1" as Owner },
  { row: 8, col: 7, owner: "player1" as Owner },
  { row: 8, col: 8, owner: "player1" as Owner },
  { row: 7, col: 7, owner: "player1" as Owner },
  { row: 7, col: 8, owner: "player1" as Owner },
];

predefinedTiles.forEach(({ row, col, owner }) => {
  initialGrid[row - 1][col - 1] = owner;
});

const HexTile: React.FC<HexProps> = ({ row, col, initialOwner }) => {
  const [owner, setOwner] = useState<Owner>(initialOwner);
  const [showBuy, setShowBuy] = useState<boolean>(false);

  const handleMouseEnter = () => {
    if (owner === "player1") {
      setShowBuy(true);
    } else if (owner === "empty") {
      const adjacentGrass = [
        [col - 1, row],
        [col - 1, row + 1],
        [col, row - 1],
        [col, row + 1],
        [col + 1, row - 1],
        [col + 1, row],
        [col + 1, row + 1],
      ];
      if (
        adjacentGrass.some(([r, c]) =>
          r >= 1 && r <= 8 && c >= 1 && c <= 8 && initialGrid[r - 1][c - 1] === "player1"
        )
      ) {
        setShowBuy(true);
      }
    }
  };

  const handleMouseLeave = () => {
    setShowBuy(false);
  };

  return (
    <div
      className={`hex ${owner}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {owner === "empty" && <span>{row},{col}</span>}
      {showBuy && <div className="buy-char">BUY</div>}
    </div>
  );
};

const HexGrid: React.FC = () => {
  return (
    <div className="hex-grid">
      {Array.from({ length: 8 }).map((_, colIndex) => (
        <div key={colIndex} className="hex-row" style={{ marginTop: colIndex % 2 === 1 ? "-11px" : "30px" }}>
          {Array.from({ length: 8 }).map((_, rowIndex) => (
            <HexTile key={`${colIndex}-${rowIndex}`} row={colIndex + 1} col={rowIndex + 1} initialOwner={initialGrid[rowIndex][colIndex]} />
          ))}
        </div>
      ))}
    </div>
  );
};

function App() {
  const [hexCounts, setHexCounts] = useState<{ player1: number; player2: number }>({
    player1: 5,
    player2: 5,
  });

  const [timeLeft, setTimeLeft] = useState<number>(180);
  const [coins, setCoins] = useState<number>(50);
  const maxCoins: number = 100;
  const [turn, setTurn] = useState<number>(1);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [phase, setPhase] = useState<string>("BUY PHASE");
  const [round, setRound] = useState<number>(1);

  useEffect(() => {
    if (timeLeft > 0 && !isReady) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isReady) {
      setPhase(`ROUND ${round}`);
    }
  }, [timeLeft, isReady, round]);

  const handleReadyClick = () => {
    setIsReady((prev) => !prev);
    setPhase((prev) => (prev === "BUY PHASE" ? "WAITING..." : "BUY PHASE"));
  };

  return (
    <div>
    <div className="flex flex-col items-center min-h-screen p-4 mt-4">
    <h2 className="absolute right-0">Start Turn: Player {turn}</h2>
      {/* <h2 className="absolute right-18 font-bold">Time :</h2>
      <div className="relative w-full mt-4">
        <h2 className="absolute top-5 left-286 bg-white p-2 rounded-lg shadow-xl">
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
        </h2>
      </div> */}
      <div className="header">{phase}</div>

      {/* <p>Player 1: {hexCounts.player1} | Player 2: {hexCounts.player2}</p> */}
      <HexGrid />

      <div className="coin text flex">
        {coins}/{maxCoins}🪙
      </div>

      <div className="mt-4">
        
        
      </div>

        <div>
        <Link to="/">
        <button className="end-button flex">
          EXIT
          </button>
        </Link>
          <button className="ready-button flex" onClick={handleReadyClick}>
          {isReady ? "CANCEL" : "DONE"}
        </button>
        </div>

    </div>
    
</div>
  );
}

export default App;
