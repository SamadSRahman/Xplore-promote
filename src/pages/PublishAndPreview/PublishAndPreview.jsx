/* eslint-disable indent */
/* eslint-disable import/no-extraneous-dependencies */
// PublishAndPreview.jsx

import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import styles from './PublishAndPreview.module.css';

const PublishAndPreview = () => {
    const { campaignId } = useParams();
    const navigate = useNavigate();
    const qrRef = useRef();
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      if (!campaignId) {
        navigate('/error');
      }
    }, [campaignId, navigate]);
  
    const handlePublish = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/publish-campaign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ campaignId }),
        });
        
        if (response.ok) {
          alert('Campaign published successfully!');
        } else {
          alert('Failed to publish campaign.');
        }
      } catch (error) {
        console.error('Error publishing campaign:', error);
        alert('An error occurred while publishing the campaign.');
      }
      setLoading(false);
    };
  
    const handleDownload = () => {
      const qrCanvas = qrRef.current.querySelector('canvas');
      const qrDataUrl = qrCanvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = qrDataUrl;
      link.download = `campaign_${campaignId}_QR.png`;
      link.click();
    };
  
    return (
  <div  className={styles.wrapper}>
        <div className={styles.container}>
        <h1 className={styles.title}>Publish and Preview Campaign</h1>
        <div className={styles.qrContainer} ref={qrRef}>
          <h2 className={styles.subTitle}>Campaign QR Code</h2>
          <QRCodeCanvas
            value={`https://pre.xplore.xircular.io/campaign/${campaignId}`}
            size={150}
            bgColor="white"
            fgColor="#808080"
          />
        </div>
        <button className={styles.publishButton} onClick={handlePublish} disabled={loading}>
          {loading ? 'Publishing...' : 'Publish'}
        </button>
        <button className={styles.downloadButton} onClick={handleDownload}>
          Download QR Code
        </button>
      </div>
  </div>
    );
  };
  
  export default PublishAndPreview;
