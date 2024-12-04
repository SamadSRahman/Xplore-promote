import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { render } from '@divkitframework/divkit/client-hydratable';
import styles from './PreviewCard.module.css'
import CameraComponent from '../../../customComponent/CameraComponent/CameraComponent'

// class CustomCard extends HTMLElement {
//   constructor() {
//       super();

//       // Create a shadow root if needed
//       const shadow = this.attachShadow({ mode: 'open' });

//       // Add content or logic here
//       const container = document.createElement('div');
//       container.textContent = 'This is a Custom Card';
//       container.style.padding = '16px';
//       container.style.border = '1px solid #ddd';
//       container.style.borderRadius = '8px';

//       shadow.appendChild(container);
//   }
// }
const CustomCard = () => {
  return (
    <div>
      This is a custom functional card rendered with React.
    </div>
  );
};
 
class CustomCardElement extends HTMLElement {
  connectedCallback() {
    // Render the React component inside the custom element
    const margin = this.getAttribute('margin');
    console.log("margin", margin);
    ReactDOM.render(<CameraComponent styles={margin} />, this);

  }
  disconnectedCallback() {
    // Cleanup when the element is removed from the DOM
    ReactDOM.unmountComponentAtNode(this);
  }
}
customElements.define('custom-card', CustomCardElement);

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
        customComponents: new Map([
          ['custom_card', {
              element: 'custom-card'
          }]
      ]),
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
