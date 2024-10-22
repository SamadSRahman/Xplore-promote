/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable indent */
// @ts-nocheck
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import EditorPage from './pages/EditorPage/EditorPage.tsx';
import ThemeSelection from './pages/ThemeSelection/ThemeSelection.jsx';


export default function App() {
  return (
    <div>
         <RecoilRoot>
         <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingPage />}/>
            <Route path='/themeSelection' element={<ThemeSelection />}/>
            <Route path='/editor/:type' element={<EditorPage />}/>
          </Routes>
          </BrowserRouter>
         </RecoilRoot>
    </div>
  );
}
