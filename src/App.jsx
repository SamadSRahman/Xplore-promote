/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable indent */
// @ts-nocheck
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import EditorPage from './pages/EditorPage/EditorPage.tsx';

export default function App() {
  return (
    <div>
          <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingPage />}/>
            <Route path='/editor' element={<EditorPage />}/>
          </Routes>
          </BrowserRouter>
    </div>
  );
}
