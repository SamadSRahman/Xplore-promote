import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from "react-router-dom";
import usePreview from "../../lib/utils/useShortUrl";
import { blankBackgroundJSON } from "../../lib/utils/splashScreenData";
import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";
import CameraComponent from "../../customComponent/CameraComponent/CameraComponent";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import styles from '../CampaignPreview/CampaignPreview.module.css'
import DivkitRenderer from "../../lib/components/PreviewCard/DivkitRenderer";
import useEndUser from "../../lib/utils/useEndUser";
import googleLogo from "../../assets/components/google-icon.webp";
import { uid } from "uid";
import RidirectComponent from "../CampaignPreview/RedirectComponent"
import useCampaign from "../../lib/utils/useCampaign";


export default function Preview() {
  const { shortId } = useParams();
  const { metaData, getmetadataCampaignById } = useCampaign();
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  useEffect(() => {
    if (shortId) {
      getmetadataCampaignById(shortId);
    }
  }, [shortId]);

  const { getLayoutByShortId, layouts, campaignId} = usePreview();
  const navigate = useNavigate();
  const [layout, setLayout] = useState({ layoutJSON: blankBackgroundJSON });
  const { screen } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [isLoadingPopup, setIsLoadingPopup] = useState(false);
  const [isCameraScreen, setIsCameraScreen] = useState(false);

  const [appclip, setAppClip] = useState(`https://appclip.apple.com/id?p=com.xircular.XplorePromote.Clip&shortId=${shortId}&sourcename=qrcode`);
  const [playstore, setPlayStore] = useState(`https://play.google.com/store/apps/details?id=com.xircular.xplorecampaign&shortId=${shortId}&sourcename=qrcode&launch=true`);
  
  useEffect(() => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  
      if (userAgent.includes("Instagram")) 
      {
        setAppClip(`https://appclip.apple.com/id?p=com.xircular.XplorePromote.Clip&shortId=${shortId}&sourcename=instagram`);
        setPlayStore(`https://play.google.com/store/apps/details?id=com.xircular.xplorecampaign&shortId=${shortId}&sourcename=instagram&launch=true`);
      }
       else if (userAgent.includes('fban') || userAgent.includes('fbav')) 
       {
         setAppClip(`https://appclip.apple.com/id?p=com.xircular.XplorePromote.Clip&shortId=${shortId}&sourcename=facebook`);
         setPlayStore(`https://play.google.com/store/apps/details?id=com.xircular.xplorecampaign&shortId=${shortId}&sourcename=facebook&launch=true`);
       }
      else if (userAgent.includes('linkedin'))  {
          setAppClip(`https://appclip.apple.com/id?p=com.xircular.XplorePromote.Clip&shortId=${shortId}&sourcename=linkedin`);
          setPlayStore(`https://play.google.com/store/apps/details?id=com.xircular.xplorecampaign&shortId=${shortId}&sourcename=linkedin&launch=true`);
      }
     else if(userAgent.includes("Twitter")){
      setAppClip(`https://appclip.apple.com/id?p=com.xircular.XplorePromote.Clip&shortId=${shortId}&sourcename=twitter`);
      setPlayStore(`https://play.google.com/store/apps/details?id=com.xircular.xplorecampaign&shortId=${shortId}&sourcename=twitter&launch=true`);  
     } 
     else if (userAgent.includes("whatsapp")) {
      setAppClip(`https://appclip.apple.com/id?p=com.xircular.XplorePromote.Clip&shortId=${shortId}&sourcename=whatsapp`);
      setPlayStore(`https://play.google.com/store/apps/details?id=com.xircular.xplorecampaign&shortId=${shortId}&sourcename=whatsapp&launch=true`);
     }
     else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      setAppClip(`https://appclip.apple.com/id?p=com.xircular.XplorePromote.Clip&shortId=${shortId}&sourcename=ios`);    
      setPlayStore(`https://play.google.com/store/apps/details?id=com.xircular.xplorecampaign&shortId=${shortId}&sourcename=ios&launch=true`); 
     }
     else if (/android/i.test(userAgent)) {
        setAppClip(`https://appclip.apple.com/id?p=com.xircular.XplorePromote.Clip&shortId=${shortId}&sourcename=android`);
        setPlayStore(`https://play.google.com/store/apps/details?id=com.xircular.xplorecampaign&shortId=${shortId}&sourcename=android&launch=true`);  
      }else{
        setAppClip(`https://appclip.apple.com/id?p=com.xircular.XplorePromote.Clip&shortId=${shortId}&sourcename=other`);
        setPlayStore(`https://play.google.com/store/apps/details?id=com.xircular.xplorecampaign&shortId=${shortId}&sourcename=other&launch=true`);  
      }
     
    }, [shortId]);
  

  const { data, getData } = useVisitorData(
    { extendedResult: true },
    { immediate: true }
  );
  const { submitContactForm, updateInterestedProduct, saveUserDetails } = useEndUser();

  useEffect(() => {
    const deviceId = localStorage.getItem("deviceId");
    if (!deviceId) {
      const id = uid();
      localStorage.setItem("deviceId", id);
    }

  }, []);

  useEffect(() => {
    getLayoutByShortId(shortId);
    getData({ ignoreCache: true });

    const requestPushNotificationPermission = async () => {
      if ("Notification" in window) {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          console.log("Push notification permission granted.");
          // You can also register a service worker here if needed
        } else {
          console.log("Push notification permission denied.");
        }
      } else {
        console.log("This browser does not support notifications.");
      }
    };

    requestPushNotificationPermission();

  }, []);


  useEffect(() => {
    if (data?.visitorId) localStorage.setItem("visitorId", data.visitorId);
    if (data?.device) localStorage.setItem("deviceId", data.device);
    if (data?.visitorId) {
      saveUserDetails(campaignId, data.visitorId, data.device)
    }
  }, [data]);



  useEffect(() => {
    if (!layouts.length) return;
    if (layouts.length === 1) {
      setLayout(layouts[0])
      return; //for profile page
    }

    if (screen === undefined || screen === "splash_screen") {
      const splashLayout = layouts.find(
        (ele: any) => ele.name === "splash_screen"
      );
      if (splashLayout) {
        setLayout(splashLayout);
      }
    } else {
      const newLayout = layouts.find((ele) => ele.name === screen);
      if (!newLayout) {
        console.warn(`Layout not found for screen: ${screen}`);
        return;
      }

      const variables = newLayout.layoutJSON?.card?.variables;

      const googleData = localStorage.getItem("userData");
      const imageData = localStorage.getItem("userUploadUrl");

      console.log("variables", variables);
      console.log("googleData", googleData);
      console.log("imageData", imageData);

      if (variables && Array.isArray(variables)) {
        try {
          // Process Google Data
          if (googleData) {
            const googleDataObj = JSON.parse(googleData);

            variables.forEach((variable) => {
              if (!variable || typeof variable !== 'object') return;

              if (variable.name === "email" && googleDataObj.email) {
                variable.value = googleDataObj.email;
              }
              if (variable.name === "userName" && googleDataObj.name) {
                variable.value = googleDataObj.name;
              }
              if (variable.name === "phone" && googleDataObj.phone) {
                variable.value = googleDataObj.phone;
              }
            });
          }

          // Process Image Data
          if (imageData) {
            variables.forEach((variable) => {
              if (!variable || typeof variable !== 'object') return;

              if (variable.name === "picture") {
                variable.value = imageData;
              }
            });
          }

          newLayout.layoutJSON.card.variables = variables;
        } catch (error) {
          console.error("Error processing user data:", error);
        }
      }

      setLayout(newLayout);
    }
  }, [screen, layouts]);

  async function handleBtnClick(action: {
    url: string;
    log_url?: string;
    latitude?: string;
    longitude?: string;
    email?: string;
    phone?: string;
    socialPlatform?: string;
    socialProfile?: string;
    webUrl?: string;
    selected_variables: [];
    attachmentUrl?: string;
  }) {
    console.log("action clicked", action);
    const btnAction = action.url?.split("://")[1].split("?")[0];

    if (btnAction === "emailAddress" && action.email) {
      // Open native email client
      const mailtoLink = `mailto:${action.email}`;
      window.location.href = mailtoLink;
      return;
    }
    if(btnAction==="share"){
     
      
      if (navigator.share) {
        try {
          await navigator.share({
            title: "Check this out!",
            text: "Here's something interesting for you.",
            url: action.attachmentUrl 
              ? action.attachmentUrl // Share `attachmentUrl` if available
              : `${window.location.origin}/${shortId}`, // Fallback to the constructed URL
          });
          console.log("Content shared successfully!");
        } catch (error) {
          console.error("Error sharing:", error);
        }
      } else {
        alert("Web Share API is not supported in your browser.");
      }
    }
    if (btnAction === "phoneNumber" && action.phone) {
      // Check if device is mobile
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      if (isMobile) {
        // For mobile devices, open phone dialer
        window.location.href = `tel:${action.phone}`;
      } else {
        // For non-mobile devices, copy to clipboard and show a message
        navigator.clipboard.writeText(action.phone).then(() => {
          alert(`Phone number ${action.phone} copied to clipboard`);
        });
      }
      return;
    }
    if (btnAction === "socialMedia" && action.socialPlatform && action.socialProfile) {
      const redirectUrl = action.socialProfile;
      window.open(redirectUrl, '_blank');
      return;
    }
    if (btnAction === "webLink" && action.webUrl) {
      const redirectUrl = action.webUrl;
      window.open(redirectUrl, '_blank');
      return;
    }
    if (btnAction === "camera") {
      navigate(`/${shortId}/camera_screen`);
    }

    if (btnAction === "submit") {
      console.log(action.selectedVariables);

      const params = new URLSearchParams(action.url.split("?")[1]);
      const isCheckboxChecked = params.get("consent_checkbox") === "true";

      // Dynamic validation based on selected variables
      const missingVariables = action.selected_variables.filter(variable => {
        // Skip validation for consent checkbox
        if (variable === "consent_checkbox") return false;

        const value = params.get(variable);
        // Check if value is undefined, null, or empty string
        return !value || value.trim() === '';
      });

      // if (missingVariables.length > 0) {
      //   alert(`Please fill in the following required fields: ${missingVariables.join(', ')}`);
      //   return;
      // }

      if (!isCheckboxChecked) {
        alert("Please agree to the terms and conditions first");
        return;
      }

      // Prepare otherFields object for additional variables
      const otherFields = {};

      // Add any extra variables from action.selected_variables to otherFields
      action.selected_variables.forEach(variable => {
        const value = params.get(variable);
        if (value &&
          !['userName', 'email', 'phone', 'consent_checkbox'].includes(variable)) {
          console.log("variable,", variable);

          otherFields[variable] = value;
        }
      });
      console.log(otherFields);

      const formData = {
        name: params.get("userName"),
        email: params.get("email") || '',
        phone: params.get("phone"),
        visitorId: localStorage.getItem("visitorId"),
        deviceId: localStorage.getItem("deviceId"),
        campaignID: campaignId,
        otherFields: otherFields
      };
      console.log("formData", formData);

      await submitContactForm(formData);
      const screenName = params.get("screen_name");
      if (screenName) {
        navigate(`/campaign/${campaignId}/${screenName}`)
      }
      updateInterestedProduct(campaignId);
      return;
    }

    if (btnAction === "map" && action.latitude && action.longitude) {
      // Open Google Maps in new tab with coordinates
      const mapsUrl = `https://www.google.com/maps?q=${action.latitude},${action.longitude}`;
      window.open(mapsUrl, "_blank");
      return;
    }
    if (btnAction === "contact") {
      const params = new URLSearchParams(action.url.split("?")[1]);
      const screenName = params.get("screen_name");
      const interestedProduct = params.get("interested_product");

      if (interestedProduct) {
        localStorage.setItem("interestedProduct", interestedProduct);
      }

      if (screenName) {
        navigate(`/${shortId}/${screenName}`);
      }
      return;
    }
    if (btnAction === "open" || btnAction === "productDetails") {
      const params = new URLSearchParams(action.url.split("?")[1]);
      const screen_name = params.get("screen_name");
      const screen_id = params.get("id");
      const screenIdentifier = screen_name || screen_id;

      const foundLayout = layouts.find(
        (ele) => ele.name === screenIdentifier || ele.id === screenIdentifier
      );
      if (foundLayout || screenIdentifier === "camera_screen") {
        navigate(`/${shortId}/${screenIdentifier}`);
      } else {
        console.log(`screen ${screenIdentifier} not found`);
      }
    }
    if (action.url.startsWith("xplore-promote://backBtn")) {
      const params = new URLSearchParams(action.url.split("?")[1]);
      const screenName = params.get("screen_name");
      if (screenName) {
        navigate(`/${shortId}/${screenName}`);
      } else {
        navigate(-1); // Default behavior - go back if no screen specified
      }
      return;
    }
  }

  useEffect(() => {
    console.log("line 41", layout);
    if (layout.name === "splash_screen") {
      console.log("Checking for initial screen");
      const initialLayout = layouts.find((ele) => ele.isInitial === true);
      if (initialLayout) {
        setTimeout(() => {
          navigate(`/${shortId}/${initialLayout.name}`);
        }, 2000);
      } else {
        console.log("No initial screen found");
      }
    }
  }, [layout]);

  useEffect(() => {
    if (screen === "landing_screen") {
      // Check if user is already logged in
      const userData = localStorage.getItem("userData");

      if (!userData) {
        // Only show popup if user is not logged in
        const popupShownCampaigns = JSON.parse(
          sessionStorage.getItem("popupShownCampaigns") || "[]"
        );

        if (!popupShownCampaigns.includes(campaignId)) {
          setShowPopup(true);
          sessionStorage.setItem(
            "popupShownCampaigns",
            JSON.stringify([...popupShownCampaigns, campaignId])
          );
        }
      }
    }
    else if (screen === "camera_screen") {
      setIsCameraScreen(true)
    }
  }, [screen, campaignId]);

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setIsLoadingPopup(true);
    console.log("credentialResponse", credentialResponse);
    try {
      // Get visitorId from localStorage (keep this in localStorage as it's needed across sessions)
      const visitorId = localStorage.getItem("visitorId");
      const deviceId = localStorage.getItem("deviceId");
      // if (!visitorId) {
      //   console.error("Visitor ID not found");
      //   return;
      // }

      // Make API call
      const response = await fetch(
        "https://xplr.live/api/v1/endUser/googleSignin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${credentialResponse.credential}`,
          },
          body: JSON.stringify({
            visitorId: visitorId,
            campaignID: campaignId,
            deviceId: deviceId,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Store the user data in localStorage (keep this in localStorage as it's needed across sessions)
        localStorage.setItem("userData", JSON.stringify(data.data.user));
        localStorage.setItem("token", data.data.token);

        // Close the popup
        setShowPopup(false);
      } else {
        console.error("Login failed:", data.message);
        setShowPopup(false);
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    } finally {
      setIsLoadingPopup(false);
    }
  };

  const handleGoogleError = () => {
    console.error("Google Sign-in Failed");
  };

  const handleSkip = () => {
    setShowPopup(false);
  };

  if (isCameraScreen) {
    return (<CameraComponent />)
  }

  return (
    <div>
     <Helmet> 
        <title>{metaData.title}</title>
       <meta name="description" content={metaData.description} />
       <meta name="keywords" content="Campaign Management, Campaign editor tool,Marketing Automation, Digital Campaigns, Social Media Ads, Social Media Ads campaign Tools, Techie chefs campaigns, Techie chefs campaigns 2025 , Techie Chefs Digital Menu, Best tech-friendly recipes for food enthusiasts,
          ,Explore innovative dishes with Techie Chefs digital menu" />
        <link rel="icon" href={metaData.image} />
        <meta property="og:title" content={metaData.title} />
        <meta property="og:description" content={metaData.description} />
        <meta property="og:image" content={metaData.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaData.title}  />
        <meta name="twitter:description" content={metaData.description} />
        <meta name="twitter:image" content={metaData.image} />
      </Helmet>

         {!isMobileDevice &&  <GoogleOAuthProvider clientId="1026223734987-p8esfqcf3g2r71p78b2qfapo6hic8jh0.apps.googleusercontent.com">
            <div className={styles.container}>
              {showPopup && (
                <div className={styles.popupOverlay}>
                  <div className={styles.popup}>
                    <h2>Sign in with Google</h2>
                    <p>Sign in to personalize your experience</p>
                    <div className={styles.popupButtons}>
                      {isLoadingPopup ? (
                        <div className={styles.loader}>Loading...</div>
                      ) : (
                        <GoogleLogin
                          onSuccess={handleGoogleSuccess}
                          onError={handleGoogleError}
                          useOneTap
                          type="standard"
                          theme="filled_blue"
                          render={({ onClick }) => (
                            <button
                              onClick={onClick}
                              className={styles.googleButton}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px",
                                backgroundColor: "blue",
                              }}
                            >
                              <img
                                src={googleLogo}
                                alt="google logo"
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  backgroundColor: "white",
                                  borderRadius: "50%",
                                }}
                              />
                              Sign in with Google
                            </button>
                          )}
                        />
                      )}
                      <button
                        className={styles.skipButton}
                        onClick={handleSkip}
                        disabled={isLoadingPopup}
                      >
                        Skip
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div className={styles.cardWrapper}>
                {layout?.layoutJSON && (
                  // <PreviewCard handleInputChange={handleInputChange} handleOnClick={handleBtnClick} jsonData={layout.layoutJSON} />
                  <DivkitRenderer
                    onClick={handleBtnClick}
                    divkitJson={layout.layoutJSON}
                  />
                )}
              </div>
            </div>
          </GoogleOAuthProvider>}

     <RidirectComponent metaData={metaData} setIsMobileDevice={setIsMobileDevice} universalLink={appclip} playStoreLink={playstore} 
       campaignId={campaignId} shortId={shortId} />

  </div>

   

  )
}
