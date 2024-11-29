/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DivkitRenderer from '../../lib/components/PreviewCard/DivkitRenderer';
import styles from './CampaignPreview.module.css';
import { blankBackgroundJSON } from '../../lib/utils/splashScreenData';
import useLayout from '../../lib/utils/useLayout';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import useEndUser from '../../lib/utils/useEndUser';
import googleLogo from '../../assets/components/google-icon.webp';


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
        const appClipUrl = `https://appclip.apple.com/id?p=com.xircular.XplorePromote.Clip&campaignId=${campaignId}`;
        const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.xircular.xplorecampaign';
         function isIOS() {
            return /iPad|iPhone|iPod/.test(navigator.userAgent);
        }
    
          function isAndroid() {
            return /android/i.test(navigator.userAgent);
        }
        console.log("userAgent", navigator.userAgent);
        
       
            if (isAndroid()) {
                const match = navigator.userAgent.match(/android\s([0-9.]+)/);
                const version = match ? parseFloat(match[1]) : 0;
                // window.location.href = playStoreUrl;
                // if (version >= 12) {
                    
                // }
                // else{
                //     alert("Please update your Android version to 12 or above");
                // }
            } else if (isIOS()) {
                const match = navigator.userAgent.match(/OS (\d+)[._]?(\d+)?/i);
                const majorVersion = match ? parseInt(match[1], 10) : 0;
                const minorVersion = match && match[2] ? parseInt(match[2], 10) : 0;
                const version = parseFloat(`${majorVersion}.${minorVersion}`);

                if (version >= 16.6) {
                    window.location.href = appClipUrl;
                }
            }
        
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
            const googleData = localStorage.getItem("userData");
            
            if (googleData && variables) {
                const googleDataObj = JSON.parse(googleData);
                variables.forEach((variable: any) => {
                    if (variable.name === 'email' && googleDataObj.email) {
                        variable.value = googleDataObj.email;
                    }
                    if (variable.name === 'userName' && googleDataObj.name) {
                        variable.value = googleDataObj.name;
                    }
                    if (variable.name === 'phone' && googleDataObj.phone) {
                        variable.value = googleDataObj.phone;
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
            const isCheckboxChecked = params.get("consent_checkbox") === "true";
            
            if (!isCheckboxChecked) {
                alert("Please agree to the terms and conditions first");
                return;
            }
            
            const formData = {
                name: params.get("userName"),
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
        if (btnAction === 'contact') {
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
        if (screen === 'landing_screen') {
            // Check if user is already logged in
            const userData = localStorage.getItem('userData');
            
            if (!userData) {
                // Only show popup if user is not logged in
                const popupShownCampaigns = JSON.parse(sessionStorage.getItem('popupShownCampaigns') || '[]');
                
                if (!popupShownCampaigns.includes(campaignId)) {
                    setShowPopup(true);
                    sessionStorage.setItem(
                        'popupShownCampaigns', 
                        JSON.stringify([...popupShownCampaigns, campaignId])
                    );
                }
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
                localStorage.setItem('userData', JSON.stringify(data.data.user));
                localStorage.setItem('token', data.data.token);
                
                // Close the popup
                setShowPopup(false);
            } else {
                console.error('Login failed:', data.message);
                setShowPopup(false);
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
                                        render={({ onClick }) => (
                                            <button
                                                onClick={onClick}
                                                className={styles.googleButton}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '8px',
                                                    backgroundColor: 'blue',
                                                }}
                                            >
                                                <img 
                                                    src={googleLogo} 
                                                    alt="google logo" 
                                                    style={{
                                                        width: '25px', 
                                                        height: '25px', 
                                                        backgroundColor: 'white', 
                                                        borderRadius: '50%'
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
                       <DivkitRenderer onClick={handleBtnClick} divkitJson={layout.layoutJSON} />
                       )}
                </div>
            </div>
        </GoogleOAuthProvider>
    );
}


