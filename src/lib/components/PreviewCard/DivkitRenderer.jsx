import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { render } from '@divkitframework/divkit/client-hydratable';
import styles from './PreviewCard.module.css';
import CameraComponent from '../../../customComponent/CameraComponent/CameraComponent';

// Define the custom element outside the component to avoid redefining it
class CustomCardElement extends HTMLElement {
  connectedCallback() {
    const margin = this.getAttribute("margin");
    console.log("margin", margin);

    this.cameraRef = React.createRef();

    ReactDOM.render(
      <CameraComponent ref={this.cameraRef} styles={margin} />,
      this
    );
  }

  disconnectedCallback() {
    ReactDOM.unmountComponentAtNode(this);
  }
}

customElements.define("custom-card", CustomCardElement);


const DivkitRenderer = ({ divkitJson, onClick }) => {
  const divkitContainer = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const handleCaptureClick = () => {
    const customCards = document.querySelectorAll("custom-card");
    customCards.forEach((card) => {
      if (card.cameraRef?.current) {
        const imageData = card.cameraRef.current.capture();
        console.log("Captured Image Data:", imageData); // Debug captured image
        setCapturedImage(imageData); // Set captured image to state
      }
    });
  };

  function handleCustomAction(e) {
    const btnAction = e.url?.split("://")[1]?.split("?")[0];
    if (btnAction === "capture") {
      console.log("Capture action triggered");
      handleCaptureClick();
      return;
    }
    onClick(e);
  }

  useEffect(() => {
    if (divkitContainer.current) {
      render({
        hydrate: true,
        onCustomAction: handleCustomAction,
        id: "divkit-root",
        target: divkitContainer.current,
        json: divkitJson,
        customComponents: new Map([
          ["custom_card", { element: "custom-card" }],
        ]),
        onError(details) {
          console.error("Divkit rendering error:", details.error);
        },
      });
    }
    return () => {
      if (divkitContainer.current) {
        divkitContainer.current.innerHTML = ""; // Cleanup
      }
    };
  }, [divkitJson]);

  return (
<>
<div
      ref={divkitContainer}
      style={{ position: "relative", width: "100%", height: "100%" }}
    />
    {capturedImage && (
      <div>
        <h4>Captured Image:</h4>
        <img
          src={capturedImage}
          alt="Captured"
          style={{ width: "100%", maxWidth: "400px", border: "1px solid black" }}
        />
      </div>
    )}</>
  );
};

export default DivkitRenderer;

