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
  const [qrValue, setQrValue] = useState('');

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
    <div className={styles.wrapper}>
      <div onClick={() => window.location.href = `/editor/${campaignId}/landing_screen`} className={styles.svgWrapper}>
        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
          <path d="M0 7.49577C0 7.64257 0.0265226 7.77809 0.0795678 7.90232C0.138507 8.02654 0.226916 8.14512 0.344794 8.25805L7.23183 14.712C7.43222 14.904 7.67387 15 7.95678 15C8.15128 15 8.32515 14.9548 8.47839 14.8645C8.63752 14.7798 8.76424 14.6612 8.85855 14.5088C8.95285 14.3619 9 14.1982 9 14.0175C9 13.7465 8.89096 13.5065 8.67289 13.2976L2.4666 7.49577L8.67289 1.69396C8.89096 1.48504 9 1.24788 9 0.982496C9 0.79616 8.95285 0.629588 8.85855 0.482778C8.76424 0.335968 8.63752 0.220215 8.47839 0.135517C8.32515 0.0451722 8.15128 0 7.95678 0C7.67387 0 7.43222 0.0931677 7.23183 0.279503L0.344794 6.73348C0.226916 6.84641 0.138507 6.96499 0.0795678 7.08922C0.0265226 7.21344 0 7.34896 0 7.49577Z" fill="black" />
        </svg>
        <span>Back</span>
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>Publish and Preview Campaign</h1>
        {qrValue && <div className={styles.qrContainer} ref={qrRef}>
          <h2 className={styles.subTitle}>Campaign QR Code</h2>
          <QRCodeCanvas
            value={qrValue}
            size={150}
            bgColor="white"
            fgColor="#808080"
          />
        </div>}
        {qrValue ? (<div className={styles.linkWrapper}>
          <a target='_blank' href={qrValue}>CLick here to visit your campaign</a>
          <button className={styles.downloadButton} onClick={handleDownload}>
          Download QR Code
        </button>
        </div>) : <button className={styles.publishButton} onClick={() => setQrValue(`https://pre.xplore.xircular.io/campaign/${campaignId}`)} disabled={loading}>
          {loading ? 'Publishing...' : 'Publish'}
        </button>}
      </div>
    </div>
  );
};

export default PublishAndPreview;
