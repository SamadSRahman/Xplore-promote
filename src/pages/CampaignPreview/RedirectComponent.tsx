import React, { useEffect } from 'react';
import styles from "./CampaignPreview.module.css";
import icon from '../../assets/xplore-logo.svg'

interface RedirectComponentProps {
  universalLink: string;
  playStoreLink: string;
}

const RedirectComponent: React.FC<RedirectComponentProps> = ({ universalLink, playStoreLink }) => {
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    const instagramWebView = userAgent.includes("Instagram");
    const fbView = userAgent.includes('fban') || userAgent.includes('fbav');
    const linkedinWebView = userAgent.includes('linkedin');
    const twitterView = userAgent.includes("Twitter");

    const redirect = () => {
      if (instagramWebView || fbView || linkedinWebView || twitterView) {
        console.log("Instagram WebView detected.");

        if (/iPhone|iPad|iPod/i.test(userAgent)) {
          console.log("iOS device in Instagram WebView.");
          const iosInstruction = document.getElementById("ios-instruction");
          if (iosInstruction) {
            iosInstruction.style.display = "block";
          }
          window.stop();
          return;
        } else if (/android/i.test(userAgent)) {
          console.log("Android device in Instagram WebView.");
          const androidIntent = `intent:${playStoreLink}#Intent;package=com.android.chrome;end`; 
          window.location.replace(androidIntent);
          return;
        } else {
          console.log("Other platform detected in Instagram WebView.");
          // window.location.replace(universalLink);
          // return;
        }
      } else {
        console.log("Non-Instagram browser detected.");
        if (/iPhone|iPad|iPod/i.test(userAgent)) {
          console.log("iOS device outside Instagram.");
          const iosInstruction = document.getElementById("ios-instruction");
          if (iosInstruction) {
            iosInstruction.style.display = "block";
          }
          window.stop();
          return;
        } else if (/android/i.test(userAgent)) {
          const androidIntent = `intent:${playStoreLink}#Intent;package=com.android.chrome;end`;           window.location.replace(androidIntent);
          return;
        } else {
          console.log("Default fallback.");
          // window.location.replace(universalLink);
          // return;
        }
      }
    };

    // Perform redirection
    redirect();
  }, [universalLink, playStoreLink]);

  return (
    <div id="ios-instruction">
       <div className={styles.redirectContainer} >
            <div className={styles.redirectContent}>
               <img src={icon} alt="Apple App Clip" className={styles.platformIcon} />
              <a className={styles.redirectButton} href={universalLink} target="_blank"> Continue </a>
            </div>
          </div>
    </div>
  );
};

export default RedirectComponent;