import React from 'react';
import { Link } from 'react-router-dom';
import './Start.css';
import './index.css';
import './End.css';

export default function End() {
  return (
    <div className="start-container">
      <div className="result"> YOU LOSE !!!
        <div className="max-w-screen-lg  text-center">
          <Link to="/">
            <button className="regame-button">
              PLAY AGAIN!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

