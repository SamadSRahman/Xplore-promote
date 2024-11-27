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
import useEndUser from '../../lib/utils/useEndUser';

export default function CampaignPreview() {
    const {getAllLayout, layouts} = useLayout()
    const navigate = useNavigate()
    const [layout, setLayout] = useState({ layoutJSON: (blankBackgroundJSON) });
    const { campaignId, screen } = useParams();
    const [showPopup, setShowPopup] = useState(false);
    const [isLoadingPopup, setIsLoadingPopup] = useState(false);
    const {data, getData} = useVisitorData(
        {extendedResult: true},
        {immediate: true}
      )
    const {submitContactForm} = useEndUser()

    useEffect(() => {
        getAllLayout(campaignId);
        getData({ignoreCache: true});
    }, []);
    useEffect(()=>{
        console.log("data", data);
        if(data?.visitorId) localStorage.setItem("visitorId", data.visitorId);
        if(data?.device) localStorage.setItem("deviceId", data.device);
    },[data])
    
    useEffect(()=>{
        if (!layouts.length) return;
        
        if (screen === undefined || screen === 'splash_screen') {
            const splashLayout = layouts.find((ele:any) => ele.name === 'splash_screen');
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
            const googleData = localStorage.getItem("user");
            
            if (googleData && variables) {
                const googleDataObj = JSON.parse(googleData);
                const fields = ['email', 'name', 'phone'];
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
        const btnAction = action.url?.split("://")[1].split("?")[0];

        if (btnAction === 'submit') {
            const params = new URLSearchParams(action.url.split("?")[1]);
            const isCheckboxChecked = params.get("isCheckboxChecked") === "true";
            
            if (!isCheckboxChecked) {
                alert("Please agree to the terms and conditions first");
                return;
            }

            const formData = {
                name: params.get("name"),
                email: params.get("email"), 
                phone: params.get("phone"),
                visitorId: localStorage.getItem("visitorId"),
                deviceId: localStorage.getItem("deviceId"),
                campaignID: campaignId
            };

            submitContactForm(formData);
            return;
        }

        if (btnAction === 'map' && action.latitude && action.longitude) {
            // Open Google Maps in new tab with coordinates
            const mapsUrl = `https://www.google.com/maps?q=${action.latitude},${action.longitude}`;
            window.open(mapsUrl, '_blank');
            return;
        }
        if (btnAction === 'open'||btnAction === 'productDetails') {
            const params = new URLSearchParams(action.url.split("?")[1]);
            const screen_name = params.get("screen_name");
            const screen_id = params.get("id");
            const screenIdentifier = screen_name || screen_id;
            
            const foundLayout = layouts.find(ele => ele.name === screenIdentifier || ele.id === screenIdentifier);
            if (foundLayout) {
                navigate(`/campaign/${campaignId}/${screenIdentifier}`);
            } else {
                console.log(`screen ${screenIdentifier} not found`);
            }
        }
        if (action.url.startsWith('xplore-promote://backBtn')) {
            const params = new URLSearchParams(action.url.split('?')[1]);
            const screenName = params.get('screen_name');
            if (screenName) {
                navigate(`/campaign/${campaignId}/${screenName}`);
            } else {
                navigate(-1); // Default behavior - go back if no screen specified
            }
            return;
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
            const deviceId = localStorage.getItem('deviceId');
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
                    visitorId: visitorId,
                    campaignID: campaignId,
                    deviceId: deviceId

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


