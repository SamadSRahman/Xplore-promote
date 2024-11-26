/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PreviewCard from '../../lib/components/PreviewCard/PreviewCard';
import DivkitRenderer from '../../lib/components/PreviewCard/DivkitRenderer';
import styles from './CampaignPreview.module.css';
import useApi from '../../lib/utils/useApi';
import { blankBackgroundJSON } from '../../lib/utils/splashScreenData';
import useLayout from '../../lib/utils/useLayout';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';

export default function CampaignPreview() {
    const { getCampaignById, landingScreenLayout } = useApi();
    const {getAllLayout, layouts} = useLayout()
    const navigate = useNavigate()
    const [layout, setLayout] = useState({ layoutJSON: (blankBackgroundJSON) });
    const { campaignId, screen } = useParams();
    const [inputValues, setInputValues] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [isLoadingPopup, setIsLoadingPopup] = useState(false);
    const {isLoading, error, data, getData} = useVisitorData(
        {extendedResult: true},
        {immediate: true}
      )

    useEffect(() => {
        getAllLayout(campaignId);
        getData({ignoreCache: true});
    }, []);
    useEffect(()=>{
        console.log("data", data);
        if(data?.visitorId) localStorage.setItem("visitorId", data.visitorId);
    },[data])
    
    useEffect(()=>{
        if (!layouts.length) return;
        
        if (screen === undefined || screen === 'splash_screen') {
            const splashLayout = layouts.find((ele:any) => ele.name === 'splash_screen');
            if (splashLayout) {
                const variables = splashLayout.layoutJSON.card.variables;
                const googleData =  localStorage.getItem("googleData")
                if(googleData){
                    const googleDataObj = JSON.parse(googleData)
                    if (variables) {
                        const fields = ['email', 'user', 'phone'];
                        variables.forEach((variable: any) => {
                            if (fields.includes(variable.name) && googleDataObj[variable.name]) {
                                variable.value = googleDataObj[variable.name];
                            }
                        });
                      
                        // console.log("updatedVariables line 35", updatedVariables);
                        
                        console.log("variables line 42", variables);
                     
                        splashLayout.layoutJSON.card.variables = variables;
                    }
                }
                setLayout(splashLayout);
            }
        } else {
            const newLayout = layouts.find((ele) => ele.name === screen);
            if (!newLayout) {
                console.warn(`Layout not found for screen: ${screen}`);
                return;
            }
            
            const variables = newLayout.layoutJSON?.card?.variables;
            const googleData = localStorage.getItem("googleData");
            
            if (googleData && variables) {
                const googleDataObj = JSON.parse(googleData);
                const fields = ['email', 'user', 'phone'];
                variables.forEach((variable: any) => {
                    if (fields.includes(variable.name) && googleDataObj[variable.name]) {
                        variable.value = googleDataObj[variable.name];
                    }
                });
                
                newLayout.layoutJSON.card.variables = variables;
            }
            
            setLayout(newLayout);
        }
    }, [screen, layouts]);

    function handleBtnClick(action: { url: string; log_url?: string; latitude?: string; longitude?: string }) {
        console.log("action clicked", action);
        if (action.url === 'submit-form') {
            console.log("Form submit with data:", inputValues);
            return;
        }
        const btnAction = action.url?.split("://")[1].split("?")[0];
        if (btnAction === 'map' && action.latitude && action.longitude) {
            // Open Google Maps in new tab with coordinates
            const mapsUrl = `https://www.google.com/maps?q=${action.latitude},${action.longitude}`;
            window.open(mapsUrl, '_blank');
            return;
        }
        if (btnAction === 'open') {
            const screen_name = new URLSearchParams(action.url.split("?")[1]).get("screen_name");
            const foundLayout = layouts.find(ele => ele.name === screen_name);
            if (foundLayout) {
                navigate(`/campaign/${campaignId}/${screen_name}`);
            } else {
                console.log(`screen ${screen_name} not found`);
            }
        }
    }
    
    useEffect(() => {
        console.log('line 41', layout);
        if (layout.name === "splash_screen") {
            console.log("Changing to landing screen");
            const landingLayout = layouts.find((ele) => ele.name === 'landing_screen');
           if(landingLayout){
            setTimeout(() => { navigate(`/campaign/${campaignId}/landing_screen`) }, 2000);
           }
        }
    }, [layout]);

    useEffect(() => {
        if (landingScreenLayout) {
            setTimeout(() => {}, 2000);
        }
    }, [landingScreenLayout]);

    useEffect(() => {
        if (screen === 'landing_screen') {
            // Get the array of campaigns where popup has been shown
            const popupShownCampaigns = JSON.parse(sessionStorage.getItem('popupShownCampaigns') || '[]');
            
            // Check if this campaign is in the array
            if (!popupShownCampaigns.includes(campaignId)) {
                // Show popup and add this campaign to the array
                setShowPopup(true);
                sessionStorage.setItem(
                    'popupShownCampaigns', 
                    JSON.stringify([...popupShownCampaigns, campaignId])
                );
            }
        }
    }, [screen, campaignId]);

    const handleGoogleSuccess = async (credentialResponse: any) => {
        setIsLoadingPopup(true);
        console.log("credentialResponse", credentialResponse);
        try {
            // Get visitorId from localStorage (keep this in localStorage as it's needed across sessions)
            const visitorId = localStorage.getItem('visitorId');
            
            if (!visitorId) {
                console.error('Visitor ID not found');
                return;
            }

            // Make API call
            const response = await fetch('https://pre.xplore.xircular.io/api/v1/endUser/googleSignin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': credentialResponse.credential
                },
                body: JSON.stringify({
                    visitorId: visitorId
                })
            });

            const data = await response.json();

            if (data.success) {
                // Store the user data in localStorage (keep this in localStorage as it's needed across sessions)
                localStorage.setItem('userData', JSON.stringify(data.data));
                localStorage.setItem('token', data.data.token);
                
                // Close the popup
                setShowPopup(false);
            } else {
                console.error('Login failed:', data.message);
            }
        } catch (error) {
            console.error('Error during Google sign-in:', error);
        } finally {
            setIsLoadingPopup(false);
        }
    };

    const handleGoogleError = () => {
        console.error('Google Sign-in Failed');
    };

    const handleSkip = () => {
        setShowPopup(false);
    };

    return (
        <GoogleOAuthProvider clientId="1026223734987-lqcb9auvggk9vuri3jucmblf4lhhm9sj.apps.googleusercontent.com">
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
                                        size="large"
                                        text="signin_with"
                                        shape="rectangular"
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
                       <DivkitRenderer onClick={handleBtnClick} divkitJson={layout.layoutJSON} />
                       )}
                </div>
            </div>
        </GoogleOAuthProvider>
    );
}


