import React, { useEffect, useState } from 'react';
import styles from "./CampaignPreview.module.css";
import icon from '../../assets/xplore-logo.svg'
import useAnalytics from '../../lib/utils/useAnalytics';
import { useNavigate } from 'react-router-dom';

interface RedirectComponentProps {
  universalLink: string;
  playStoreLink: string;
  campaignId: string;
  shortId: string;
  setIsMobileDevice: (isMobile: boolean) => void;
}

const RedirectComponent: React.FC<RedirectComponentProps> = ({ universalLink, playStoreLink, setIsMobileDevice, campaignId , shortId }) => {
  const [ipAddress, setIpAddress] = useState("");
  const [source, setSource] = useState("");
  const [device, setDevice] = useState("");
  const { postAnalyticData } = useAnalytics();
  const navigate = useNavigate();
  // const androidIntent = `intent://xplorecampaign?shortId=${shortId}&launch=true#Intent;scheme=https;action=android.intent.action.VIEW;package=com.xircular.xplorecampaign;end`;


  const fetchIPAddress = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setIpAddress(data.ip);
    } catch (error) {
      console.error('Error fetching IP address:', error);
    }
  };

  const detectDevice = () => {
    const userAgent = navigator.userAgent;
    
    if (/(iPhone|iPad|iPod)/i.test(userAgent)) {
      const match = userAgent.match(/(iPhone|iPad|iPod)/i);
      return match ? match[0].toLowerCase() : "ios";
    }
    
    if (/android/i.test(userAgent)) {
      const match = userAgent.match(/Android\s([0-9.]*)/i);
      return match ? `android ${match[1]}` : "android";
    }

    if (/Windows/i.test(userAgent)) return "windows";
    if (/Macintosh/i.test(userAgent)) return "mac";
    if (/Linux/i.test(userAgent)) return "linux";
    
    return "unknown";
  };

  const detectSource = () => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    
    if (userAgent.includes("Instagram")) return "instagram";
    if (userAgent.includes('fban') || userAgent.includes('fbav')) return "facebook";
    if (userAgent.includes('linkedin')) return "linkedin";
    if (userAgent.includes("Twitter")) return "twitter";
    
    if (/iPhone|iPad|iPod/i.test(userAgent)) return "ios";
    if (/android/i.test(userAgent)) return "android";
    return "other";
  };

  useEffect(() => {
    const detectedSource = detectSource();
    const detectedDevice = detectDevice();
    setSource(detectedSource);
    setDevice(detectedDevice);
    fetchIPAddress();
  }, []);

  useEffect(() => {
    if (ipAddress && source) {
      postAnalyticData({
       campaignID: campaignId,
        source,
        ipAddress,
        device
      });
    }
  }, [ipAddress, source, device, campaignId]);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    const source = detectSource();
    
    if (/iPhone|iPad|iPod|android/i.test(userAgent)) {
      setIsMobileDevice(true);
    } else {
      setIsMobileDevice(false);
    }

    if (source === "instagram" || source === "facebook" || source === "linkedin" || source === "twitter") {
      if (/iPhone|iPad|iPod/i.test(userAgent)) {
        const iosInstruction = document.getElementById("ios-instruction");
        if (iosInstruction) {
          iosInstruction.style.display = "block";
        }
        window.stop();
      } else if (/android/i.test(userAgent)) {
        const androidIntent = `intent:${playStoreLink}#Intent;package=com.android.vending;end`;
        // const androidIntent = `intent://xplorecampaign?shortId=${shortId}&launch=true#Intent;scheme=https;action=android.intent.action.VIEW;package=com.xircular.xplorecampaign;end`;
        window.location.replace(androidIntent);
      }
    } else {
      if (/iPhone|iPad|iPod/i.test(userAgent)) {
        const iosInstruction = document.getElementById("ios-instruction");
        if (iosInstruction) {
          iosInstruction.style.display = "block";
        }
        window.stop();
      } else if (/android/i.test(userAgent)) {
        const androidIntent = `intent:${playStoreLink}#Intent;package=com.android.vending;end`;
        // const androidIntent = `intent://xplorecampaign?shortId=${shortId}&launch=true#Intent;scheme=https;action=android.intent.action.VIEW;package=com.xircular.xplorecampaign;end`;
        window.location.replace(androidIntent);
      }
    }
  }, [universalLink,playStoreLink]);


  return (
    <div id="ios-instruction">
      <div className={styles.redirectContainer}>
        <div className={styles.redirectContent}>
          <img src={icon} alt="Apple App Clip" className={styles.platformIcon} />
          <button className={styles.redirectButton} onClick={() => navigate(universalLink)}> Continue </button>
          {/* <a className={styles.redirectButton} href={universalLink} target="_blank">Continue</a> */}
        </div>
      </div>
    </div>
  );
};

export default RedirectComponent;