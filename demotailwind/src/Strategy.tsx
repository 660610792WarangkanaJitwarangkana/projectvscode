import { useState } from "react";
import { Link } from "react-router-dom";
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

// 🏆 ตัวแปรที่กำหนดตัวละครที่ถูกเลือกจากหลังบ้าน
const preselectedCharacters = [1, 3]; // ✅ เปลี่ยนค่าตามที่ต้องการ

export default function SetStrategy() {
  const [selectedCharacters, setSelectedCharacters] = useState<number[]>(preselectedCharacters);
  const [strategies, setStrategies] = useState<{ [key: number]: string }>({});

  const toggleCharacter = (id: number) => {
    setSelectedCharacters((prev) =>
      prev.includes(id)
        ? prev.filter((charId) => charId !== id)
        : [...prev, id]
    );

    // ลบค่า strategy ถ้าถอดตัวละครออก
    setStrategies((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const handleStrategyChange = (id: number, value: string) => {
    setStrategies((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const allStrategiesFilled =
    selectedCharacters.length > 0 &&
    selectedCharacters.every((id) => strategies[id]?.trim());

    
  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      
      {/*<h1 className="text-2xl font-bold">Choose Your Characters</h1>

       แสดงตัวละครให้เลือก
      <div className="grid grid-cols-5 gap-6">
        {characters.map((character) => (
          <div
            key={character.id}
            className={`char p-4 border rounded-lg cursor-pointer transition-all ${
              selectedCharacters.includes(character.id)
                ? "bg-yellow-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => toggleCharacter(character.id)}
          >
            <div className="hex">{character.name}</div>
            <div className="mt-2 text-center">{character.name}</div>
          </div>
        ))}
      </div> */}

      {/* แสดงผลตัวละครที่ถูกเลือก */}
      <h1 className="text-xl font-semibold mt-4">Set Strategy</h1>
      <div className="flex flex-wrap gap-4">
        {selectedCharacters.map((id) => {
          const character = characters.find((char) => char.id === id);
          return (
            <div key={id} className="p-4 border rounded-lg bg-gray-100 w-48">
              <div className="text-center font-bold text-lg">{character?.name}</div>
              <input
                type="text"
                placeholder="Enter Strategy"
                className="mt-2 w-full px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={strategies[id] || ""}
                onChange={(e) => handleStrategyChange(id, e.target.value)}
              />
            </div>
          );
        })}
      </div>

      {/* แจ้งเตือนถ้ายังไม่ใส่ strategy ครบทุกตัว */}
      {!allStrategiesFilled && selectedCharacters.length > 0 && (
        <p className="text-red-500">Please set your minion strategy</p>
      )}

      {/* ปุ่ม CONFIRM - แสดงเฉพาะเมื่อ strategy ครบทุกตัว */}
      {allStrategiesFilled && (
        <Link to="/gameplay">
          <button className="px-6 py-2 text-lg font-bold rounded bg-blue-500 text-white hover:bg-blue-600">
            CONFIRM
          </button>
        </Link>
      )}
    </div>
  );
}
