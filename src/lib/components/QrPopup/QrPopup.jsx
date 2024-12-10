import React, { useEffect, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { IoMdClose } from 'react-icons/io';

import styles from './QrPopup.module.css';

const QrPopup = ({ campaignId, onClose, campaignName, type, shortUrl, shortCode }) => {
  
    const qrRef = useRef(null);
    console.log("shortUrl", shortUrl, shortCode);
    // let url = ""
    // if(window.location.origin==="https://xplr.live"){
    //   url = `${window.location.origin}/${shortId}`
    // }
    // else {
    //  url = `${window.location.origin}/${type}/${campaignId}`
    // }
    const url = `https://xplr.live/${shortCode}`
    useEffect(() => {
        if (!campaignId) {
            onClose();
        }
    }, [campaignId, onClose]);

    const handleDownload = () => {
        const qrCanvas = qrRef.current.querySelector('canvas');
        const qrDataUrl = qrCanvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = qrDataUrl;
        link.download = `${campaignName.toLowerCase().replace(/ /g, "_")}_QR.png`;
        link.click();
    };

    return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
      <div className={styles.headers}>
        <span>{campaignName}</span>
      <div className={styles.closeButton} onClick={onClose}>
          <IoMdClose size={24} />
        </div>
      </div>
        <div className={styles.content}>
          <div className={styles.qrContainer} ref={qrRef}>
            <h2 className={styles.subTitle}>Campaign QR Code</h2>
            <QRCodeCanvas
              value={url}
              size={150}
              bgColor="white"
              fgColor="#000"
            />
          </div>
          <div className={styles.linkWrapper}>
            <a
              target="_blank"
              href={url}
              rel="noreferrer"
            >
              Click here to visit your {type}
            </a>
            <button className={styles.downloadButton} onClick={handleDownload}>
              Download QR Code
            </button>
          </div>
        </div>
      </div>
    </div>
    );
};

export default QrPopup;
