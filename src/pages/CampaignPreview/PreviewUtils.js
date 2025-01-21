import useEndUser from "../../lib/utils/useEndUser";

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


const {submitContactForm, updateInterestedProduct} = useEndUser();

export async function handleBtnClick(action, navigate, shortId, campaignId, layouts) {
    console.log("Action clicked:", action);
  
    // Helper function for navigation
    const navigateTo = (path) => {
      if (shortId?.length > 0) {
        navigate(`/${shortId}/${path}`);
      } else {
        navigate(`/campaign/${campaignId}/${path}`);
      }
    };
  
    // Helper function to extract parameters from the URL
    const getParams = (url) => new URLSearchParams(url.split("?")[1]);
  
    // Helper function for form data preparation
    const prepareFormData = (params, selectedVariables) => {
      const otherFields = {};
      selectedVariables.forEach((variable) => {
        const value = params.get(variable);
        if (value && !["userName", "email", "phone", "consent_checkbox"].includes(variable)) {
          otherFields[variable] = value;
        }
      });
      return {
        name: params.get("userName"),
        email: params.get("email") || "",
        phone: params.get("phone"),
        visitorId: localStorage.getItem("visitorId")||"",
        deviceId: localStorage.getItem("deviceId")||"",
        campaignID: campaignId,
        otherFields,
      };
    };
  
    // Determine the action type
    const btnAction = action.url?.split("://")[1]?.split("?")[0];
    console.log("Button action:", btnAction);
    
    try {
      switch (btnAction) {
        case "emailAddress":
          if (action.email) {
            window.location.href = `mailto:${action.email}`;
          }
          break;
  
        case "share":
          if (navigator.share) {
            await navigator.share({
              title: "Check this out!",
              text: "Here's something interesting for you.",
              url: action.attachmentUrl || `${window.location.origin}/${shortId}`,
            });
            console.log("Content shared successfully!");
          } else {
            alert("Web Share API is not supported in your browser.");
          }
          break;
  
        case "phoneNumber":
          const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
          if (isMobile) {
            window.location.href = `tel:${action.phone}`;
          } else {
            await navigator.clipboard.writeText(action.phone);
            alert(`Phone number ${action.phone} copied to clipboard`);
          }
          break;
  
        case "socialMedia":
          if (action.socialProfile) {
            window.open(action.socialProfile, "_blank");
          }
          break;
  
        case "webLink":
          if (action.webUrl) {
            window.open(action.webUrl, "_blank");
          }
          break;
  
        case "camera":
          navigateTo("camera_screen");
          break;
  
        case "submit":
          const params = getParams(action.url);
          const isCheckboxChecked = params.get("consent_checkbox") === "true";
          const missingVariables = action.selected_variables.filter((variable) => {
            if (variable === "consent_checkbox") return false;
            const value = params.get(variable);
            return !value || value.trim() === "";
          });
  
          if (!isCheckboxChecked) {
            alert("Please agree to the terms and conditions first");
            return;
          }
  
        //   if (missingVariables.length > 0) {
        //     alert("Please fill in all required fields");
        //     return;
        //   }
  
          const formData = prepareFormData(params, action.selected_variables);
          console.log("FormData:", formData);
  
          await submitContactForm(formData);
          const screenName = params.get("screen_name");
          if (screenName) {
            navigateTo(screenName);
          }
          updateInterestedProduct(campaignId);
          break;
  
        case "map":
          if (action.latitude && action.longitude) {
            const mapsUrl = `https://www.google.com/maps?q=${action.latitude},${action.longitude}`;
            window.open(mapsUrl, "_blank");
          }
          break;
  
        case "contact":
          const contactParams = getParams(action.url);
          const contactScreenName = contactParams.get("screen_name");
          const interestedProduct = contactParams.get("interested_product");
          if (interestedProduct) {
            localStorage.setItem("interestedProduct", interestedProduct);
          }
          if (contactScreenName) {
            navigateTo(contactScreenName);
          }
          break;
  
        case "open":
        case "productDetails":
          const openParams = getParams(action.url);
          const screenIdentifier = openParams.get("screen_name") || openParams.get("id");
          const foundLayout = layouts.find((ele) => ele.name === screenIdentifier || ele.id === screenIdentifier);
  
          if (foundLayout || screenIdentifier === "camera_screen") {
            navigateTo(screenIdentifier);
          } else {
            console.log(`Screen ${screenIdentifier} not found`);
          }
          break;
  
        case "backBtn":
          const backParams = getParams(action.url);
          const backScreenName = backParams.get("screen_name");
          if (backScreenName) {
            navigateTo(backScreenName);
          } else {
            navigate(-1); // Go back
          }
          break;
  
        default:
          console.warn("Unknown button action:", btnAction);
      }
    } catch (error) {
      console.error("Error handling button click:", error);
    }
  }
  
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