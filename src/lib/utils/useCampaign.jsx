/* eslint-disable no-console */
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { blankBackgroundJSON } from './splashScreenData';
import { getScreenName, getScreenPath } from './services';



export default function useCampaign() {
    const navigate = useNavigate();
    // const [name, setName] = useState("");
    const channel = localStorage.getItem('channel');
    const token = localStorage.getItem('accessToken');
    const [campaignName, setCampaignName] = useState('');
    const [currentLayout, setCurrentLayout] = useState(JSON.stringify(blankBackgroundJSON));
    const [layoutId, setLayoutId] = useState('');
    const [campaigns, setCampaigns] = useState([]);
    const [screens, setScreens] = useState([]);

    let API_BASE_URL = 'https://pre.xplore.xircular.io/api'; 
    if(window.location.origin==="https://xplr.live"||window.location.origin.includes("localhost")||window.location.origin.includes("vercel")){
        console.log(window.location.origin);  
     API_BASE_URL = 'https://xplr.live/api';
    }

    
    const getCampaigns = async() => {
        const token = localStorage.getItem('accessToken');

        try {
            const response = await axios.get(
                `${API_BASE_URL}/v1/campaign/getAll?page=0&size=50`,
                {
                    headers: {
                        authorization: token,
                        session: channel,
                    },
                }
            );
            console.log('response', response);
            setCampaigns(response.data.campaigns);
        } catch (error) {
            console.log(error);
            if (error.response.data.message === 'Session expired, Please login again' || error.response.data.message=== 'jwt expired') {
                alert("Session expired, Please login again")
                localStorage.removeItem('accessToken');
                navigate('/');
            }


        }
    };
    const getCampaignById = async (id, page) => {
       try {
        const response = await axios.get(
            `${API_BASE_URL}/v1/campaign/getOne/${id}`,
            {
                headers: {
                    authorization: token,
                    session: channel,
                },
            }
        );
        console.log('response', response.data.data, getScreenName(page));
        setCampaignName(response.data.data.name, );

        const campaignScreens = response.data.data.layouts.map(ele=>ele);

        const formattedScreens = campaignScreens.map(screen => ({
            name: getScreenName(screen.name),
            path: getScreenPath(screen.name),
            isInitial: screen.isInitial,
            id: screen.layoutID
        }));
        console.log(formattedScreens, page);
        
        // setScreens(formattedScreens);
        localStorage.setItem('screens', JSON.stringify(formattedScreens))

        const splashLayout = response.data.data.layouts.find(
            ele => ele.name === page
        );
        console.log('splashLaout', splashLayout);
        setLayoutId(splashLayout.layoutID);
        setCurrentLayout(JSON.stringify(splashLayout?.layoutJSON));
        
       } catch (error) {
        console.log(error);
        if(error.response.data.message==='jwt expired'){
            alert("session expired")
        }
       }
    };
    const deleteCampaign = async id => {
        try {
            const response = await axios.delete(
                `${API_BASE_URL}/v1/campaign/delete/${id}`,
                {
                    headers: {
                        authorization: token,
                        session: channel,
                    },
                }
            );
            console.log('campaign deleted successfuly', response);
            getCampaigns();
        } catch (error) {
            console.log(error);
        }
    };

    return {
        campaigns,
        campaignName,
        getCampaignById,
        getCampaigns,
        deleteCampaign,
        currentLayout,
        layoutId,
        screens,
    };
}
