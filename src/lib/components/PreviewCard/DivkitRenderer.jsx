import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { render } from '@divkitframework/divkit/client-hydratable';
import styles from './PreviewCard.module.css';
import Image360Viewer from '../../components/ImageViewer/ImageViewer';
import ChatBotComponent from '../../../customComponent/ChatBotComponent/ChatBotComponent'

const DivkitRenderer = ({ divkitJson, onClick }) => {
  const divkitContainer = useRef(null);
  const captureRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  function handleCustomAction(e) {
    const btnAction = e.url?.split("://")[1].split("?")[0];
    if (btnAction === "capture") {
      console.log("camera");
      handleCaptureClick();
      return;
    }
    onClick(e);
  }

  const handleCaptureClick = () => {
    if (captureRef.current) {
      const imageData = captureRef.current();
      setCapturedImage(imageData);
    }
  };

  // Define the custom element before render
  if (typeof window !== 'undefined' && !customElements.get('custom-card')) {
    class CustomCardElement extends HTMLElement {
      connectedCallback() {
        // Create a container for React
        const container = document.createElement('div');
        this.appendChild(container);
        
        // Render the React component with props
        ReactDOM.createRoot(
          <Image360Viewer />,
          container
        );
      }

      disconnectedCallback() {
        // Find the container and cleanup
        const container = this.firstElementChild;
        if (container) {
          ReactDOM.unmountComponentAtNode(container);
        }
      }
    }

    customElements.define('custom-card', CustomCardElement);
  }
  if (typeof window !== 'undefined' && !customElements.get('chatbot-card')) {
    class ChatbotCardElement extends HTMLElement {
      connectedCallback() {
        // Create a container for React
        const container = document.createElement('div');
        this.appendChild(container);
        
        // Render the React component into the container
        const root = ReactDOM.createRoot(container);
        root.render(<ChatBotComponent />);
      }
  
      disconnectedCallback() {
        // Clean up React when the element is removed
        const container = this.firstElementChild;
        if (container) {
          ReactDOM.unmountComponentAtNode(container);
        }
      }
    }
  
    customElements.define('chatbot-card', ChatbotCardElement);
  }

  useEffect(() => {
    if (divkitContainer.current) {
    render({
  hydrate: true,
  onCustomAction: handleCustomAction,
  id: 'divkit-root',
  target: divkitContainer.current,
  typefaceProvider: (() => {
    // Map to store loaded fonts with their family names
    const loadedFonts = new Map();
    
    // Debug counter to track function calls
    let callCount = 0;
    
    return (fontUrl) => {
      callCount++;
      console.log(`typefaceProvider called ${callCount} times with URL:`, fontUrl);
      
      // Check if font is already loaded
      if (loadedFonts.has(fontUrl)) {
        console.log('Font already loaded, returning existing family:', loadedFonts.get(fontUrl));
        return loadedFonts.get(fontUrl);
      }
      
      // Generate unique font family name
      const fontFamily = `custom-font-${btoa(fontUrl).substring(0, 8)}`;
      console.log('Generated new font family:', fontFamily);
      
      // Create and append style element if font not loaded
      const style = document.createElement('style');
      style.id = fontFamily;
      style.innerHTML = `
        @font-face {
          font-family: ${fontFamily};
          src: url('${fontUrl}') format('truetype');
          font-display: swap;
        }
      `;
      
      document.head.appendChild(style);
      console.log('Added new style element for font family:', fontFamily);
      
      // Store the font family in the map
      loadedFonts.set(fontUrl, fontFamily);
      
      // Log current state of loaded fonts
      console.log('Currently loaded fonts:', 
        Array.from(loadedFonts.entries())
          .map(([url, family]) => `${family} (${url})`)
          .join('\n')
      );
      
      return fontFamily;
    };
  })(), // Added parentheses here to execute the IIFE
  json: divkitJson,
  customComponents: new Map([
    ['threesixty_card', {
      element: 'custom-card'
    }],
    ['chatbot_card', {
      element: 'chatbot-card'
    }]
  ]),
  onError(details) {
    console.error('Divkit rendering error:', details.error);
  },
});
    }
    return () => {
      if (divkitContainer.current) {
        divkitContainer.current.innerHTML = '';
      }
    };
  }, [divkitJson]);

  return <div className={styles.renderDiv} ref={divkitContainer} />;
};

export default DivkitRenderer;