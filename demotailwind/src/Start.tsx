import React from 'react';
import { Link } from 'react-router-dom';
import './Start.css';
import './index.css';

export default function Start() {
  return (
    <div className="start-container">
      <div className="name"> KOMBAT
        <div className="max-w-screen-lg  text-center">
          <Link to="/setup">
            <button className="start-button">
              START
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

