import React, { useEffect, useRef } from 'react';
import { render } from '@divkitframework/divkit/client';
import styles from './PreviewCard.module.css'
const DivkitRenderer = ({ divkitJson , onClick}) => {
  const divkitContainer = useRef(null);

  useEffect(() => {
    if (divkitContainer.current) {
      render({
        onCustomAction:(e)=>onClick(e),
        id: 'divkit-root',
        target: divkitContainer.current,
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
