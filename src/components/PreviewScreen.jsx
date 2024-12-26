import React, { useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import { render } from '@divkitframework/divkit/client';
import ReactDOM from 'react-dom';
import './styles.css';
import Image360Viewer from '../lib/components/ImageViewer/ImageViewer';


// Move CustomCard component outside of PreviewScreen
const CustomCard = ({ margin }) => {
  return (
    <div style={{ margin }}>
      I am a custom card element.
    </div>
  );
};

// Define custom element outside of the component to avoid re-definition
if (typeof window !== 'undefined' && !customElements.get('custom-card')) {
  class CustomCardElement extends HTMLElement {
    connectedCallback() {
      const container = document.createElement('div');
      this.appendChild(container);
      const productId = this.getAttribute('productId');
      console.log("productId", productId);
      
      ReactDOM.render(
        <Image360Viewer productId={productId}  />,
        container
      );
    }

    disconnectedCallback() {
      const container = this.firstElementChild;
      if (container) {
        ReactDOM.unmountComponentAtNode(container);
      }
    }

    static get observedAttributes() {
      return ['margin'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'margin' && oldValue !== newValue && this.firstElementChild) {
        ReactDOM.createRoot(
          <CustomCard margin={newValue} />,
          this.firstElementChild
        );
      }
    }
  }

  customElements.define('custom-card', CustomCardElement);
}

const PreviewScreen = ({ isOpen, onClose, jsonData }) => {
  const previewContainer = useRef(null);

  useEffect(() => {
    if (!isOpen || !previewContainer.current || !jsonData) {
      return;
    }

    let parsedJson;
    try {
      parsedJson = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
    } catch (error) {
      console.error('Error parsing JSON data:', error);
      return;
    }

    const configuration = {
      onCustomAction: (e) => console.log('Custom action:', e),
      id: 'preview-divkit-root',
      target: previewContainer.current,
      typefaceProvider: (font) => {
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
        customComponents: new Map([
          ['threesixty_card', {
              element: 'custom-card'
          }]
      ]),
      json: parsedJson,
      onError(details) {
        console.error('Preview rendering error:', details.error);
      },
    };

    render(configuration);

    return () => {
      if (previewContainer.current) {
        previewContainer.current.innerHTML = '';
      }
    };
  }, [isOpen, jsonData]);

  if (!isOpen) return null;

  return (
    <div className="preview-overlay">
      <div className="preview-container">
        <button
          onClick={onClose}
          className="preview-close-button"
          aria-label="Close preview"
        >
          <IoClose size={24} />
        </button>
        <div className="preview-content">
          <div 
            className="render-container" 
            style={{ color: '#000', height: '85vh' }} 
            ref={previewContainer} 
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewScreen;