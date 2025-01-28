import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { render } from '@divkitframework/divkit/client-hydratable';
import styles from './PreviewCard.module.css';
import Image360Viewer from '../../components/ImageViewer/ImageViewer';
import ChatBotComponent from '../../../customComponent/ChatBotComponent/ChatBotComponent'
import useFonts from '../../utils/useFonts';

const DivkitRenderer = ({ divkitJson, onClick }) => {
  const divkitContainer = useRef(null);
  const {getFontBySpecificName} = useFonts();
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
  typefaceProvider : (fontName) => {
    const fontFamily = `custom-font-${fontName}`;
    console.log(fontFamily);
    
    // Only add the style if it doesn't exist
    if (!document.getElementById(fontFamily)) {
  const style = document.createElement('style');
      style.textContent = `
        @font-face {
          font-family: 'custom-font-${fontName}';
          src: url(https://xplr.live/api/v1/font/getFontFile?specificName=${fontName}) format('truetype');
        }
      `;
      document.head.appendChild(style);

    }
    return `"custom-font-${fontName}", sans-serif`;
  },
  
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