/* eslint-disable indent */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable quotes */
// @ts-nocheck

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";
import WebViewRedirect from '../../lib/components/WebViewRedirect';


export default function LandingPage() {
  const navigate = useNavigate();
  const [token, setToken] = useState("1234567890");
  const [id, setId] = useState("1234567890");

  function handleOnSubmit(e) {
    e.preventDefault();
    if (token.length < 10 || id.length < 10) {
      alert("Please enter a valid token to continue");
    } else {
      localStorage.setItem('accessToken', token);
      localStorage.setItem('adId', id);
      navigate('/themeSelection');
    }
  }
  return (
    <div className={styles.container}>
      <WebViewRedirect targetUrl={'https://xplore-instant.vercel.app/'} />
   <form onSubmit={handleOnSubmit}>
        <label htmlFor="token">Enter token here:</label>
        <input
          value={token}
          onChange={e => setToken(e.target.value)}
          type="text"
          name="token"
          placeholder="Token"
        />
         <label htmlFor="token">Enter Ad Id here:</label>
        <input
         value={id}
         onChange={e => setId(e.target.value)}
         type="text"
         name="id"
         placeholder="Advertisment Id"
        />
        <button>Continue</button>
      </form>
    </div>
  );
}
