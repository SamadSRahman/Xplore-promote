 /* eslint-disable indent */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import styles from './PublishAndPreview.module.css';
import useApi from '../../lib/utils/useApi';
import logo from '../../assets/xplore.svg'

const PublishAndPreview = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const qrRef = useRef();
  const { getCampaignById, campaignName } = useApi();

  useEffect(() => {
    if (!campaignId) {
      navigate('/error');
    } else {
      getCampaignById(campaignId);
    }
  }, [campaignId, navigate]);


  const handleDownload = () => {
    const qrCanvas = qrRef.current.querySelector('canvas');
    const qrDataUrl = qrCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `${campaignName.toLowerCase().replace(/\s+/g, '_')}_QR.png`;
    link.click();
  };

  return (
    <div className={styles.wrapper}>
      <div
        onClick={() =>
          (navigate('/campaigns'))
        }
        className={styles.svgWrapper}
      >
        <img src={logo} alt="" />
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>Publish and Preview Campaign</h1>

          <div className={styles.qrContainer} ref={qrRef}>
            <h2 className={styles.subTitle}>QR Code for - {campaignName}</h2>
            <QRCodeCanvas
              value={`https://pre.xplore.xircular.io/campaign/${campaignId}`}
              size={150}
              bgColor="white"
              fgColor="#000"
            />
          </div>
               <div className={styles.linkWrapper}>
            <a target="_blank" href={`${window.location.origin}/campaign/${campaignId}`}>
              Click here to visit your campaign
            </a>
            <div className={styles.btnDiv}>

      <button className={styles.homeButton} onClick={()=>navigate('/campaigns')}>
              Back to home
            </button>
      <button className={styles.downloadButton} onClick={handleDownload}>
              Download QR Code
            </button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default PublishAndPreview;
