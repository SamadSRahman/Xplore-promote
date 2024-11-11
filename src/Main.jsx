/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable indent */
// @ts-nocheck

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './main.css';
import Clarity from '@microsoft/clarity';


const projectId = "owr1zf7tue"

Clarity.init(projectId);

createRoot(document.getElementById('app')).render(<App />);
