// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './Start.tsx'
// // import App from './Setup.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Start from './Start';
import Setup from './Setup';
import Gameplay from './Gameplay'; 

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/gameplay" element={<Gameplay />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
