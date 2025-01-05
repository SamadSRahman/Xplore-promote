import React, { useEffect } from 'react';

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
          window.location.replace(universalLink);
          return;
        }
      } else {
        console.log("Non-Instagram browser detected.");
        if (/iPhone|iPad|iPod/i.test(userAgent)) {
          console.log("iOS device outside Instagram.");
          window.location.replace(universalLink);
          return;
        } else if (/android/i.test(userAgent)) {
          const androidIntent = `intent://play.google.com/store/apps/details?id=com.xircular.xplorecampaign&campaignId=043a10ed-79c6-4b3d-8c16-7ab9d72e96d8&launch=true#Intent;scheme=https;package=com.android.vending;end`;
          window.location.replace(androidIntent);
          return;
        } else {
          console.log("Default fallback.");
          window.location.replace(universalLink);
          return;
        }
      }
    };

    // Perform redirection
    redirect();
  }, [universalLink, playStoreLink]);

  return (
    <div>
      <div id="ios-instruction" style={{ display: 'none', textAlign: 'center', marginTop: '50px' }}>
        <h1>Open in Safari</h1>
        <p>To continue, please tap the link below:</p>
        <a href={universalLink} target="_blank" rel="noopener noreferrer">Open App Clip in Safari</a>
      </div>
    </div>
  );
};

export default RedirectComponent;