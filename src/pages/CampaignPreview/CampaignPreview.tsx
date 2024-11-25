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

export default function CampaignPreview() {
    const { getCampaignById, landingScreenLayout } = useApi();
    const {getAllLayout, layouts} = useLayout()
    const navigate = useNavigate()
    const [layout, setLayout] = useState({ layoutJSON: (blankBackgroundJSON) });
    const { campaignId, screen } = useParams();
    const [inputValues, setInputValues] = useState({});

    useEffect(()=>{
        if(screen===undefined||screen==='splash_screen'){
           
            const splashLayout = layouts.find((ele) => ele.name === 'splash_screen');
            if (splashLayout) {
                console.log("splashLayout line 30", splashLayout.layoutJSON.card.variables);
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
        }
        else{
            const newLayout = layouts.find((ele) => ele.name === screen)||{};
            console.log("newLayout line 30", newLayout);
            const variables = newLayout.layoutJSON.card.variables;
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
                  
                    
                    console.log("variables line 42", variables);
                 
                    newLayout.layoutJSON.card.variables = variables;

                    if (newLayout) {
                        setLayout(newLayout);
                    }
                }
            }
        }
    },[screen, layouts])
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
            const id = new URLSearchParams(action.url.split("?")[1]).get("id");
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
                    // <PreviewCard handleInputChange={handleInputChange} handleOnClick={handleBtnClick} jsonData={layout.layoutJSON} />
               <DivkitRenderer onClick={handleBtnClick} divkitJson={layout.layoutJSON} />
               )}
            </div>
        </div>
    );
}


