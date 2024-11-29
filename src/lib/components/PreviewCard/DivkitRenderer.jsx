import React, { useEffect, useRef } from 'react';
import { render } from '@divkitframework/divkit/client-hydratable';
import styles from './PreviewCard.module.css'
const DivkitRenderer = ({ divkitJson , onClick}) => {
  const divkitContainer = useRef(null);

  useEffect(() => {
    if (divkitContainer.current) {
      render({
        hydrate: true,
        onCustomAction:(e)=>onClick(e),
        id: 'divkit-root',
        target: divkitContainer.current,
        typefaceProvider: (font) => {
          console.log('font', font); // Check the font name coming from JSON

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
        json: divkitJson,
       
        onError(details) {
          console.error('Divkit rendering error:', details.error);
        },
      });
    }
    return () => {
      if (divkitContainer.current) {
        divkitContainer.current.innerHTML = ''; // Clear the container
      }
    };
  }, [divkitJson]);

  return <div className={styles.renderDiv} ref={divkitContainer} dangerouslySetInnerHTML={{ __html: '' }}/>;
};

export default DivkitRenderer;
