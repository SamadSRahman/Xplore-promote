/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useCampaigns from '../../lib/utils/useCampaign'
import usePreview from '../../lib/utils/useShortUrl';
import DivkitRenderer from '../../lib/components/PreviewCard/DivkitRenderer';
import CameraComponent from "../../customComponent/CameraComponent/CameraComponent";
import { blankBackgroundJSON } from '../../lib/utils/splashScreenData';
import styles from '../CampaignPreview/CampaignPreview.module.css';
import { detectEnvironment, appClipURL, playStoreURL, handleBtnClick } from '../CampaignPreview/PreviewUtils';
import RedirectionPage from '../RedirectionPage/RedirectionPage';
import useAnalytics from '../../lib/utils/useAnalytics';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import googleLogo from "../../assets/components/google-icon.webp";
import { uid } from 'uid';

export default function () {
    const { shortId, screen } = useParams();
    const { postAnalyticData } = useAnalytics();
    const [layout, setLayout] = useState({ layoutJSON: blankBackgroundJSON });
    const [showRedirectionPage, setShowRedirectionPage] = useState(false);
    const [redirectUrl, setRedirectUrl] = useState("");
    const { getmetadataCampaignById, metaData } = useCampaigns();
    const { getLayoutByShortId, layouts, campaignId } = usePreview();
    const [isLoadingPopup, setIsLoadingPopup] = useState(false);
    const navigate = useNavigate();
    const enviroment = detectEnvironment();
    const [showPopup, setShowPopup] = useState(false);
    const [isCameraScreen, setIsCameraScreen] = useState(false);
    
    useEffect(() => {
        console.log(enviroment);

        getmetadataCampaignById(shortId);
        if (enviroment.deviceType === "mobile" && enviroment.isIOS) {
            setRedirectUrl(`${appClipURL}&shortId=${shortId}&sourcename=${enviroment.platform}`);
            setShowRedirectionPage(true);
            console.log(`${appClipURL}&shortId=${shortId}&sourcename=${enviroment.platform}`);

        }
        // else if (enviroment.deviceType === "mobile" && enviroment.isAndroid) {
        //     setRedirectUrl(`${playStoreURL}&shortId=${shortId}&sourcename=${enviroment.platform}`);
        //     setShowRedirectionPage(true);
        //     console.log(`${playStoreURL}&shortId=${shortId}&sourcename=${enviroment.platform}`);

        // }
        else {
            getLayoutByShortId(shortId);
        }
    }, [shortId]);

    useEffect(() => {
        if (campaignId && enviroment.deviceType !== "mobile") {
            postAnalyticData({ campaignID: campaignId, source: enviroment.platform === "browser" ? "other" : enviroment.platform })
        }
    }, [campaignId]);

    useEffect(() => {
        console.log("line 41", layout);
        if (layout.name === "splash_screen") {
            console.log("Checking for initial screen");
            const initialLayout = layouts.find((ele: any) => ele.isInitial === true);
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
        if (!layouts.length) return;
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

        if (screen === undefined || screen === "splash_screen") {
            const splashLayout = layouts.find(
                (ele: any) => ele.name === "splash_screen"
            );
            if (splashLayout) {
                setLayout(splashLayout);
            }
        } else {
            const newLayout: any = layouts.find((ele: { name: string }) => ele.name === screen);
            if (!newLayout) {
                console.warn(`Layout not found for screen: ${screen}`);
                return;
            }
            const variables = newLayout.layoutJSON?.card?.variables;
            const googleData = localStorage.getItem("userData");
            const imageData = localStorage.getItem("userUploadUrl");
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

    const handleGoogleSuccess = async (credentialResponse: any) => {
        setIsLoadingPopup(true);
        console.log("credentialResponse", credentialResponse);
        try {
          // Get visitorId from localStorage (keep this in localStorage as it's needed across sessions)
          const visitorId = localStorage.getItem("visitorId") || uid(8);
          const deviceId = localStorage.getItem("deviceId")|| uid(8);
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
            console.log("Google sign-in response:", data);
          if (data.status) {

            // Store the user data in localStorage (keep this in localStorage as it's needed across sessions)
            console.log(data.user);
            
            localStorage.setItem("userData", JSON.stringify(data.user));
            // localStorage.setItem("token", data.data.token);
    
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


    if (isCameraScreen) {
        return (<CameraComponent />)
      }

    return (
        <div className={styles.container}>

            {showRedirectionPage ? <RedirectionPage isSocial={enviroment.isSocialPlatform} metaData={metaData} link={redirectUrl} /> :
                <div className={styles.cardWrapper}>
                    <GoogleOAuthProvider clientId="1026223734987-p8esfqcf3g2r71p78b2qfapo6hic8jh0.apps.googleusercontent.com">
           
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
                          onError={(error:any) => console.error("Google login error:", error)}
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
                        onClick={() => setShowPopup(false)}
                        disabled={isLoadingPopup}
                      >
                        Skip
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
          </GoogleOAuthProvider>
                    <DivkitRenderer onClick={(action: any) => handleBtnClick(action, navigate, "", campaignId, layouts,)}
                        divkitJson={layout.layoutJSON} />
                </div>
            }
        </div>
    )
}
