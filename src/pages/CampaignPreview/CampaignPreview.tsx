/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DivkitRenderer from "../../lib/components/PreviewCard/DivkitRenderer";
import styles from "./CampaignPreview.module.css";
import { blankBackgroundJSON } from "../../lib/utils/splashScreenData";
import useLayout from "../../lib/utils/useLayout";
import useCampaign from "../../lib/utils/useCampaign";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";
import useEndUser from "../../lib/utils/useEndUser";
import googleLogo from "../../assets/components/google-icon.webp";
import icon from '../../assets/xplore-logo.svg'
import CameraComponent from "../../customComponent/CameraComponent/CameraComponent";
import { uid } from "uid";
import { Helmet } from "react-helmet";

export default function CampaignPreview() {
  const { getAllLayout, layouts } = useLayout();
  const navigate = useNavigate();
  const [layout, setLayout] = useState({ layoutJSON: blankBackgroundJSON });
  const { campaignId, screen } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [isLoadingPopup, setIsLoadingPopup] = useState(false);
  const [deviceType, setDeviceType] = useState("");
  const [redirectURL, setRedirectURL] = useState("");
  const [isCameraScreen, setIsCameraScreen] = useState(false);
  const { metaData, getCampaignById }  = useCampaign();


  useEffect(() => {
                getCampaignById(campaignId, screen);

  }, [campaignId]);

  useEffect(()=>{
    console.log("metaData", metaData);
    
  },[metaData])
     

  const appClipUrl = `https://appclip.apple.com/id?p=com.xircular.XplorePromote.Clip&campaignId=${campaignId}`;
 // const playStoreUrl = `https://play.google.com/store/apps/details?id=com.xircular.xplorecampaign&campaignId=${campaignId}&launch=true`;
  const androidIntent = `intent://play.google.com/store/apps/details?id=com.xircular.xplorecampaign&campaignId=${campaignId}&launch=true#Intent;scheme=https;package=com.android.vending;end`;   


  // const { data, getData } = useVisitorData(
  //   { extendedResult: true }, 
  //   { immediate: true }
  // );
  const { submitContactForm, updateInterestedProduct, saveUserDetails } = useEndUser();

  useEffect(() => {
    getAllLayout(campaignId);
   

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

    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // Detect Facebook/Instagram in-app browsers
    const isInAppBrowser = /(FBAN|FBAV|Instagram|Twitter|LinkedIn|WhatsApp|Snapchat|Pinterest|Messenger)/i.test(userAgent);
    console.log("userAgent", userAgent);

    // Function to extract Android version from the user agent string
    const getAndroidVersion = (userAgent: any) => {
      const match = userAgent.match(/Android (\d+(\.\d+)+)/);
      return match ? match[1] : null;
    };

    // Function to extract iOS version from the user agent string
    const getIosVersion = (userAgent: any) => {
      const match = userAgent.match(/OS (\d+(_\d+)+)/);
      console.log("version", match ? match[1].replace(/_/g, '.') : null);
      // alert(`version: ${match ? match[1].replace(/_/g, '.') : null}`);
      return match ? match[1].replace(/_/g, '.') : null;
    };


    if (isInAppBrowser) {
      // Handle redirection for in-app browsers in social media
       if (/android/i.test(userAgent)) {
        const androidVersion = getAndroidVersion(userAgent);
        if (androidVersion && parseFloat(androidVersion) >= 12) {
          // alert("android")
          setDeviceType("android");
          setRedirectURL(androidIntent);
          setTimeout(() => {  
           window.location.replace(androidIntent);
           }, 100);
         }
        else {
             setDeviceType("other");  
         }       
      } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
          const iosVersion = getIosVersion(userAgent);
          if (iosVersion && parseFloat(iosVersion) >= 16.6) {
          setDeviceType("ios");
          setRedirectURL(appClipUrl);

         } 
        else {
           setDeviceType("other");  // iOS version < 16.6
        }     
      } else {
          console.log('In-app browser detected on an unsupported platform.');     
       }
   }
   else { // Non Social media platforms
        if (/android/i.test(userAgent)) {
          const androidVersion = getAndroidVersion(userAgent);
          if (androidVersion && parseFloat(androidVersion) >= 12) {
            // alert("android")
            setDeviceType("android");
            setRedirectURL(androidIntent);
            setTimeout(() => {  
             window.location.replace(androidIntent);
             }, 100);
          }    
          else {
              // alert("Version not found ")
              setDeviceType("other");  // Android version < 12
          }
        }
        else if (/iPad|iPhone|iPod/.test(userAgent)) {
          const iosVersion = getIosVersion(userAgent);
          if (iosVersion && parseFloat(iosVersion) >= 16.6) {
            setDeviceType("ios");
            setRedirectURL(appClipUrl);
            setTimeout(() => {
              window.location.replace(appClipUrl);
            }, 100);
          } 
          else {
            setDeviceType("other");  // iOS version < 16.6
          }

        } else {
          //Web view fallback
          setDeviceType("other");
        }
    }

  });



  useEffect(() => {
    console.log("deviceType", deviceType, redirectURL);
    // alert(`device type: ${deviceType}` )
  }, [deviceType, redirectURL])


  useEffect(() => {
   const deviceId = localStorage.getItem("deviceId");
   if(!deviceId){
    const id = uid();
    localStorage.setItem("deviceId", id);
   }

  }, []);

  // if (deviceType === "ios"|| deviceType === "android") {
  //   return
  // }

  useEffect(() => {
    if (!layouts.length) return;

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
    selected_variables:[]
  }) {
    console.log("action clicked", action);
    const btnAction = action.url?.split("://")[1].split("?")[0];

    if (btnAction === "emailAddress" && action.email) {
      // Open native email client
      const mailtoLink = `mailto:${action.email}`;
      window.location.href = mailtoLink;
      return;
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
    if(btnAction === "camera"){
      navigate(`/campaign/${campaignId}/camera_screen`);
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
      // action.selected_variables.forEach(variable => {
      //   const value = params.get(variable);
      //   if (value && 
      //       !['userName', 'email', 'phone', 'consent_checkbox'].includes(variable)) {
      //         console.log("variable,", variable);
              
      //     otherFields[variable] = value;
      //   }
      // });
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

      if(!formData.name || formData.email|| formData.phone){
        alert("Please fill all the fields");
        return
      }
      
      await submitContactForm(formData);
      const screenName = params.get("screen_name");
      if(screenName){
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
        navigate(`/campaign/${campaignId}/${screenName}`);
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
      if (foundLayout || screenIdentifier==="camera_screen") {
        navigate(`/campaign/${campaignId}/${screenIdentifier}`);
      } else {
        console.log(`screen ${screenIdentifier} not found`);
      }
    }
    if (action.url.startsWith("xplore-promote://backBtn")) {
      const params = new URLSearchParams(action.url.split("?")[1]);
      const screenName = params.get("screen_name");
      if (screenName) {
        navigate(`/campaign/${campaignId}/${screenName}`);
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
          navigate(`/campaign/${campaignId}/${initialLayout.name}`);
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
    else if(screen==="camera_screen"){
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
      if (!visitorId) {
        console.error("Visitor ID not found");
        return;
      }

      // Make API call
      const response = await fetch(
        "https://pre.xplore.xircular.io/api/v1/endUser/googleSignin",
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

  if(isCameraScreen){
    return (<CameraComponent/>)
  }
  return (

    <div>

     <Helmet>
        <meta property="og:title" content={metaData.title} />
        <meta property="og:description" content={metaData.description} />
        <meta property="og:image" content={metaData.image} />
        <title>{metaData.title}</title>
      </Helmet>

      {deviceType === "ios" || deviceType === "android" ?
        (
         <div className={styles.redirectContainer} >
            <div className={styles.redirectContent}>
             <img src={icon} alt="Apple App Clip" className={styles.platformIcon} />
             <a className={styles.redirectButton} href={redirectURL} target="_blank"> Continue </a>
           </div>
          </div>
        ) : (
          <GoogleOAuthProvider clientId="1026223734987-p8esfqcf3g2r71p78b2qfapo6hic8jh0.apps.googleusercontent.com">
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
          </GoogleOAuthProvider>
        )

      }

    </div>

  )
}
