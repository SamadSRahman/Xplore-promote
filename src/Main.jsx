/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable indent */
// @ts-nocheck

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './main.css';
import Clarity from '@microsoft/clarity';
import { FpjsProvider, FingerprintJSPro} from '@fingerprintjs/fingerprintjs-pro-react';

const projectId = "owr1zf7tue"

Clarity.init(projectId);


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQuzdDYrPYQMjhB9gvNUGMTm1ZHMH_lcQ",
  authDomain: 'xplorepromote.firebaseapp.com'   ,
  projectId: 'xplorepromote',
  storageBucket: 'xplorepromote.appspot.com',
  messagingSenderId: '1026223734987',
  appId: '1:1026223734987:web:21468e99c1c1b9d10a5b4e',
  measurementId: 'G-DJMHYKK49W'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


createRoot(document.getElementById('app')).render(
<FpjsProvider
loadOptions={{
    apiKey: "fV3yxgFXWOAzkQz50q9T",
    // region: "eu",
    region:'ap',
    // endpoint: [
    //     FingerprintJSPro.default.endpoint,
    // ],
    // scriptUrlPattern: [
    //     // "https://metrics.yourwebsite.com/web/v<version>/<apiKey>/loader_v<loaderVersion>.js",
    //     FingerprintJSPro.defaultScriptUrlPattern
    //   ],
}}
>
<App />
</FpjsProvider>
);
