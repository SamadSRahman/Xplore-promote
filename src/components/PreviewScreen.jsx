import React, { useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import { render } from '@divkitframework/divkit/client';
import './styles.css';

const PreviewScreen = ({ isOpen, onClose, jsonData }) => {
  const previewContainer = useRef(null);

  useEffect(() => {
    if (isOpen && previewContainer.current && jsonData) {
      render({
        onCustomAction: (e) => console.log('Custom action:', e),
        id: 'preview-divkit-root',
        target: previewContainer.current,
        typefaceProvider: (font) => {
          // Return the CSS font-family based on the font name
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
        json: JSON.parse(jsonData),
        onError(details) {
          console.error('Preview rendering error:', details.error);
        },
      });
    }

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
        >
          <IoClose size={24} />
        </button>
        <div className="preview-content">
          <div className='render-container' style={{color:'#000', height:'85vh'}} ref={previewContainer} />
        </div>
      </div>
    </div>
  );
};

export default PreviewScreen; 