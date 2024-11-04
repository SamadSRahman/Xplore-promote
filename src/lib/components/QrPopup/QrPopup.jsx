import React, { useEffect, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { IoMdClose } from 'react-icons/io';

import styles from './QrPopup.module.css';

const QrPopup = ({ campaignId, onClose, campaignName }) => {
  
    const qrRef = useRef(null);

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
        link.download = `campaign_${campaignId}_QR.png`;
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
              value={`https://pre.xplore.xircular.io/campaign/${campaignId}`}
              size={150}
              bgColor="white"
              fgColor="#808080"
            />
          </div>
          <div className={styles.linkWrapper}>
            <a
              target="_blank"
              href={`https://pre.xplore.xircular.io/campaign/${campaignId}`}
              rel="noreferrer"
            >
              Click here to visit your campaign
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
