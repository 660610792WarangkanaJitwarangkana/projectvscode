import { useState } from "react";
import { Link } from 'react-router-dom';
import "./Strategy.css";
import "./Gameplay.css";

export default function SetStrategy() {

  return (
    <div>
      <div>
          <Link to="/gameplay">
            <div className="confirm">
              CONFIRM
            </div>
          </Link>
      </div>
    </div>
  );
}
