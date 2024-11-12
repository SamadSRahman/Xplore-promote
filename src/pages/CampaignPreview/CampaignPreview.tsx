/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PreviewCard from '../../lib/components/PreviewCard/PreviewCard';
import styles from './CampaignPreview.module.css';
import useApi from '../../lib/utils/useApi';
import { blankBackgroundJSON } from '../../lib/utils/splashScreenData';
import useLayout from '../../lib/utils/useLayout';

export default function CampaignPreview() {
    const { getCampaignById, landingScreenLayout } = useApi();
    const {getAllLayout, layouts} = useLayout()
    const navigate = useNavigate()
    const [layout, setLayout] = useState({ layoutJSON: (blankBackgroundJSON) });
    const { campaignId, screen } = useParams();
    const [inputValues, setInputValues] = useState({});

    useEffect(()=>{
        if(screen===undefined){
            const splashLayout = layouts.find((ele) => ele.name === 'splash_screen');
            if (splashLayout) {
                setLayout(splashLayout);
            }
        }
        else{
            const newLayout = layouts.find((ele) => ele.name === screen);
            if (newLayout) {
                setLayout(newLayout);
            }
        }
    },[screen, layouts])
    function handleBtnClick(action: { url: string; }) {
        console.log("action clicked", action);
        if( action.url === 'submit-form'){
            console.log("Form submit with data:", inputValues);
            return;
        }
        const btnAction = action.url?.split("://")[1].split("?")[0]; // Extracts 'open'
        const id = new URLSearchParams(action.url.split("?")[1]).get("id");
        if (btnAction === 'open') {
            const foundLayout = layouts.find(ele => ele.name === id);
            if (foundLayout) {
                navigate(`/campaign/${campaignId}/${id}`);
            } else {
                console.log(`screen ${id} not found`);
            }
        }
      
    }
    const handleInputChange = (hintText: string, value: string) => {
        setInputValues(prevValues => ({
            ...prevValues,
            [hintText.toLowerCase().replace(/ /g, "_")]: value,
        }));
    };
    
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
        // getCampaignById(campaignId);
        getAllLayout(campaignId);
    }, []);

    useEffect(() => {
        if (landingScreenLayout) {
            setTimeout(() => {}, 2000);
        }
    }, [landingScreenLayout]);

    return (
        <div className={styles.container}>
            <div className={styles.cardWrapper}>
                {layout?.layoutJSON && (
                    <PreviewCard handleInputChange={handleInputChange} handleOnClick={handleBtnClick} jsonData={layout.layoutJSON} />
                )}
            </div>
        </div>
    );
}


