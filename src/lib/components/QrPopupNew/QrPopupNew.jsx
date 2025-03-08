import React, { useEffect, useRef } from "react";
import publishIcon from "../../../assets/publish.svg";
import previewIcon from "../../../assets/visibility.svg";
import closeIcon from "../../../assets/closeIcon.svg";
import './QrPopupNew.css'

function QrPopup({ onClose, isOpen, campaign }) {
  const qrCanvas = useRef(null);

  // Compute the URL based on the shortCode
  const url = `https://xplr.live/${campaign.shortCode}`;

  // Generate the QR code using the qrcode library
  async function generateQRCode() {
    if (!qrCanvas.current) return;
    
    try {
      const QRCode = await import("qrcode");
      await QRCode.toCanvas(qrCanvas.current, url, {
        width: 150,
        margin: 0,
        padding: 10,
        color: {
          dark: "#000",
          light: "#fff",
        },
      });
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  }

  useEffect(() => {
    if (isOpen && qrCanvas.current) {
      generateQRCode();
    }
  }, [isOpen, url]); // Add url and isOpen to dependencies

  // Download the QR code as a PNG image
  function handleDownload() {
    if (!qrCanvas.current) return;
    const qrDataUrl = qrCanvas.current.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `${campaign.name.toLowerCase().replace(/ /g, "_")}_QR.png`;
    link.click();
  }

  // Open the campaign URL in a new tab
  function handlePreview() {
    window.open(url, '_blank');
  }

  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="popup">
        <div className="headers">
         <div className="title-section">
            <img src={campaign.images[0].url} alt="" />
         <span>{campaign.name}</span>
         </div>
          <button className="closeButton" onClick={onClose} aria-label="Close">
            <img src={closeIcon} alt="Close" />
          </button>
        </div>
        <div className="content">
          <div className="qrContainer">
            <canvas ref={qrCanvas}></canvas>
          </div>
          <div className="btn-wrapper">
            <button className="downloadButton" onClick={handleDownload}>
              <img src={publishIcon} alt="" style={{ transform: "rotate(180deg)" }} />
              Download QR
            </button>
            <button className="publishButton" onClick={handlePreview}>
              <img src={previewIcon} alt="" />
              View campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QrPopup;