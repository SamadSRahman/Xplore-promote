/* eslint-disable no-console */
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { blankBackgroundJSON } from './splashScreenData';
import { getScreenName, getScreenPath } from './services';



export default function useCampaign() {
    const navigate = useNavigate();
    // const { page } = useParams();
    const channel = localStorage.getItem('channel');
    const token = localStorage.getItem('accessToken');
    const [campaignName, setCampaignName] = useState('');
    const [currentLayout, setCurrentLayout] = useState(JSON.stringify(blankBackgroundJSON));
    const [layoutId, setLayoutId] = useState('');
    const [campaigns, setCampaigns] = useState([]);
    const [screens, setScreens] = useState([]);

    const getCampaigns = async() => {
        const token = localStorage.getItem('accessToken');

        try {
            const response = await axios.get(
                'https://pre.xplore.xircular.io/api/v1/campaign/getAll?page=0&size=20',
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
            `https://pre.xplore.xircular.io/api/v1/campaign/getOne/${id}`,
            {
                headers: {
                    authorization: token,
                    session: channel,
                },
            }
        );
        console.log('response', response.data.data, getScreenName(page));
        setCampaignName(response.data.data.name, );

        const campaignScreens = response.data.data.layouts.map(ele=>ele.name);

        const formattedScreens = campaignScreens.map(screen => ({
            name: getScreenName(screen),
            path: getScreenPath(screen),
        }));
        console.log(formattedScreens, page);
        
        setScreens(formattedScreens);

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
                `https://pre.xplore.xircular.io/api/v1/campaign/delete/${id}`,
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
