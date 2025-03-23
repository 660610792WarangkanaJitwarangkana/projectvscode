import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Start from './Start';
import Setup from './Setup';
import Strategy from './Strategy';
import Gameplay from './Gameplay';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/strategy" element={<Strategy />} />
        <Route path="/gameplay" element={<Gameplay />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
