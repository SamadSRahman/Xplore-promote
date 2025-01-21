/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useCampaigns from '../../lib/utils/useCampaign'
import usePreview from '../../lib/utils/useShortUrl';
import DivkitRenderer from '../../lib/components/PreviewCard/DivkitRenderer';
import { blankBackgroundJSON } from '../../lib/utils/splashScreenData';
import styles from '../CampaignPreview/CampaignPreview.module.css';
import { detectEnvironment, appClipURL, playStoreURL, handleBtnClick } from '../CampaignPreview/PreviewUtils';
import RedirectionPage from '../RedirectionPage/RedirectionPage';
import useAnalytics from '../../lib/utils/useAnalytics';

export default function () {
    const { shortId, screen } = useParams();
    const { postAnalyticData } = useAnalytics();
    const [layout, setLayout] = useState({ layoutJSON: blankBackgroundJSON });
    const [showRedirectionPage, setShowRedirectionPage] = useState(false);
    const [redirectUrl, setRedirectUrl] = useState("");
    const { getmetadataCampaignById, metaData } = useCampaigns();
    const { getLayoutByShortId, layouts, campaignId } = usePreview();
    const navigate = useNavigate();
    const enviroment = detectEnvironment();

    useEffect(() => {
        console.log(enviroment);

        getmetadataCampaignById(shortId);
        if (enviroment.deviceType === "mobile" && enviroment.isIOS) {
            setRedirectUrl(`${appClipURL}&shortId=${shortId}&sourcename=${enviroment.platform}`);
            setShowRedirectionPage(true);
            console.log(`${appClipURL}&shortId=${shortId}&sourcename=${enviroment.platform}`);

        }
        else if (enviroment.deviceType === "mobile" && enviroment.isAndroid) {
            setRedirectUrl(`${playStoreURL}&shortId=${shortId}&sourcename=${enviroment.platform}`);
            setShowRedirectionPage(true);
            console.log(`${playStoreURL}&shortId=${shortId}&sourcename=${enviroment.platform}`);

        }
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
                    navigate(`/campaign/${campaignId}/${initialLayout.name}`);
                }, 2000);
            } else {
                console.log("No initial screen found");
            }
        }
    }, [layout]);

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

    return (
        <div className={styles.container}>

            {showRedirectionPage ? <RedirectionPage isSocial={enviroment.isSocialPlatform} metaData={metaData} link={redirectUrl} /> :
                <div className={styles.cardWrapper}>
                    <DivkitRenderer onClick={(action: any) => handleBtnClick(action, navigate, "", campaignId, layouts,)}
                        divkitJson={layout.layoutJSON} />
                </div>
            }
        </div>
    )
}
