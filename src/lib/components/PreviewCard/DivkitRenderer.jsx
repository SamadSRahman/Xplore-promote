import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { render } from '@divkitframework/divkit/client-hydratable';
import styles from './PreviewCard.module.css';
import CameraComponent from '../../../customComponent/CameraComponent/CameraComponent';

// Rename the React component to avoid confusion
const CustomCard = ({ margin }) => {
  return (
    <div>
      I am a custom card element with margin: {margin}
    </div>
  );
};

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

  useEffect(() => {
    console.log(capturedImage);
  }, [capturedImage]);

  // Define the custom element before render
  if (typeof window !== 'undefined' && !customElements.get('custom-card')) {
    class CustomCardElement extends HTMLElement {
      connectedCallback() {
        // Get attributes
        const margin = this.getAttribute('margin');
        
        // Create a container for React
        const container = document.createElement('div');
        this.appendChild(container);
        
        // Render the React component with props
        ReactDOM.render(
          <CustomCard margin={margin} />,
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

  useEffect(() => {
    if (divkitContainer.current) {
      render({
        hydrate: true,
        onCustomAction: handleCustomAction,
        id: 'divkit-root',
        target: divkitContainer.current,
        typefaceProvider: (font) => {
          console.log('font', font);
          switch (font) {
            case 'Inter': return '"Inter", sans-serif';
            case 'Poppins': return '"Poppins", sans-serif';
            case 'Roboto': return '"Roboto", sans-serif';
            case 'Open Sans': return '"Open Sans", sans-serif';
            case 'Lato': return '"Lato", sans-serif';
            case 'Montserrat': return '"Montserrat", sans-serif';
            case 'Nunito': return '"Nunito", sans-serif';
            case 'Raleway': return '"Raleway", sans-serif';
            case 'Oswald': return '"Oswald", sans-serif';
            case 'Merriweather': return '"Merriweather", serif';
            default: return 'inherit';
          }
        },
        json: divkitJson,
        customComponents: {
          custom_card: {
            element: 'custom-card',
            props: {
              margin: '16px' // Example default prop
            }
          }
        },
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