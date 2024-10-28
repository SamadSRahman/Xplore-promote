/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ThemeSelection.module.css';
import solidBackground from '../../assets/SolidBackground.png';
import imageBackground from '../../assets/ImageBackground.png';
import gradientBackground from '../../assets/GradientBackground.png';
import {
  gradientBackgroundJSON,
  imageBackgroundJSON,
  solidBackgroundJSON,
} from '../../lib/utils/splashScreenData';

export default function ThemeSelection() {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState(null);

  useEffect(()=>{
    alert('Hi,');
  }, []);
  const themes = [
    {
      name: 'Gradient Background',
      description:
        'A smooth blend of colors creating a dynamic and modern look.',
      preview: gradientBackground, // Replace with actual preview images
      id: 1,
      JSON: gradientBackgroundJSON,
    },
    {
      name: 'Solid Background',
      description:
        'A clean, single-color background for a sleek and minimalist appearance.',
      preview: solidBackground,
      id: 2,
      JSON: solidBackgroundJSON,
    },
    {
      name: 'Image Background',
      description:
        'A striking visual backdrop with customizable images for a personalized touch.',
      preview: imageBackground,
      id: 3,
      JSON: imageBackgroundJSON,
    },
  ];

  function handleThemeSelect(theme) {
    setSelectedTheme(theme.name);
  }

  function handleContinue() {
    let type = '';
    if (selectedTheme) {
      // Save selected theme and navigate to the editor
      if (selectedTheme.includes('Gradient')) {
        type = 'gradient';
      } else if (selectedTheme.includes('Solid')) {
        type = 'solid';
      } else if (selectedTheme.includes('Image')) {
        type = 'image';
      } else {
        type = 'blank';
      }
      navigate(`/editor/${type}`);
    } else {
      alert('Please select a theme to continue.');
    }
  }

  return (
    <div className={styles.container}>
      <h1>Select Your Splash Screen</h1>
      <div className={styles.themeGrid}>
        {themes.map((theme, index) => (
          <div
            key={index}
            className={`${styles.themeCard} ${
              selectedTheme === theme ? styles.selected : ''
            }`}
            style={selectedTheme === theme.name ? { border: '3px solid #007bff', transform: 'translateY(-10px)'} : {}}
            onClick={() => handleThemeSelect(theme)}
          >
            <img
              src={theme.preview}
              alt={`${theme.name} Preview`}
              className={styles.themePreview}
            />
            <h2
            >{theme.name}</h2>
            <p
            >{theme.description}</p>
          </div>
        ))}
      </div>
      <button onClick={handleContinue} className={styles.continueButton}>
        Continue to Editor
      </button>
      <div className={styles.extraSection}>
        <span>
          None suitable for your needs?
          <Link to="/editor/blank"> Create from scratch</Link>
        </span>
      </div>
    </div>
  );
}
