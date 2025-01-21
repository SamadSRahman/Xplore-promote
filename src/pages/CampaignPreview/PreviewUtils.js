// Device and OS detection
const getDeviceInfo = () => {
    const ua = navigator.userAgent;
    
    // Device type detection
    let deviceType;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      deviceType = 'tablet';
    }
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      deviceType = 'mobile';
    }
    else {
      deviceType = 'desktop';
    }
  
    // OS detection
    const isIOS = /iPad|iPhone|iPod/.test(ua) || 
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); // For iPad Pro
    const isAndroid = /Android/.test(ua);
    
    return {
      deviceType,
      os: isIOS ? 'ios' : isAndroid ? 'android' : 'other',
      isIOS,
      isAndroid
    };
  };
  
  // Social platform detection
  const getPlatform = () => {
    const ua = navigator.userAgent;
    const url = window.location.href;
    
    // Instagram webview detection
    if (ua.includes('Instagram')) {
      return 'instagram';
    }
    
    // Facebook webview detection
    if (ua.includes('FBAN') || ua.includes('FBAV') || url.includes('fb_iframe_origin')) {
      return 'facebook';
    }
    
    // LinkedIn webview detection
    if (ua.includes('LinkedInApp') || url.includes('linkedin')) {
      return 'linkedin';
    }
    
    // Twitter webview detection
    if (ua.includes('Twitter') || url.includes('twitter')) {
      return 'twitter';
    }
    
    // General webview detection for iOS and Android
    if (ua.includes('wv') || ua.includes('WebView')) {
      return 'webview';
    }
    
    return 'browser';
  };
  
  // Combined utility function
  export const detectEnvironment = () => {
    const deviceInfo = getDeviceInfo();
    const platform = getPlatform();
    
    return {
      ...deviceInfo,
      platform,
      isMobile: deviceInfo.deviceType === 'mobile',
      isTablet: deviceInfo.deviceType === 'tablet',
      isDesktop: deviceInfo.deviceType === 'desktop',
      isSocialPlatform: ['instagram', 'facebook', 'linkedin', 'twitter'].includes(platform),
      isWebview: platform === 'webview' || ['instagram', 'facebook', 'linkedin', 'twitter'].includes(platform)
    };
  };
  
  

  export const appClipURL = "https://appclip.apple.com/id?p=com.xircular.XplorePromote.Clip";
  export const playStoreURL = "https://play.google.com/store/apps/details?id=com.xircular.xplorecampaign";


//   useEffect(() => {
//       console.log("Redirection function triggered", isSocial, link);
  
//       // Ensure the anchorRef and link are available
//       if (!anchorRef?.current && !link) {
//         console.error("No anchorRef or link available for redirection");
//         return;
//       }
  
//       const timer = setInterval(() => {
//         if (attemptCount.current >= 3) {
//           console.log("Max redirection attempts reached");
//           clearInterval(timer);
//           return;
//         }
  
//         attemptCount.current += 1;
//         console.log(`Redirection attempt #${attemptCount.current}`);
  
//         if (anchorRef?.current) {
//           console.log("Triggering anchor click");
//           anchorRef.current.click();
//         } else if (link) {
//           console.log("Redirecting to:", link);
//           // window.location.href = link;
//         } else {
//           console.log("Reloading the page");
//           window.location.reload();
//         }
//       }, 500); // Delay of 500ms between attempts
  
//       return () => clearInterval(timer);
//     }, [anchorRef, link, isSocial]);