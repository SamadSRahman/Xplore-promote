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
            case 'Arial': return 'Arial, sans-serif';
            case 'Roboto': return '"Roboto", sans-serif';
            case 'Times': return '"Times New Roman", serif';
            // Add more cases for other fonts as needed
            default: return 'inherit'; // fallback for unspecified fonts
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
