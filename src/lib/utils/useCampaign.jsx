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
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const [metaData, setMetaData] = useState({
        title: "Loading...",
        description: "Loading description...",
        image: "",
      });

      let API_BASE_URL = 'https://xplr.live/api'; 
      if(window.location.origin==="https://pre.xplore.xircular.io"){ 
       API_BASE_URL = 'https://pre.xplore.xircular.io/api';
      }
    

    
    const getCampaigns = async(pageNum = page) => {
        if (loading || pageNum >= totalPages) return; 
        const token = localStorage.getItem('accessToken');

        try {
            setLoading(true)
            const response = await axios.get(
                `${API_BASE_URL}/v1/campaign/getAll?page=${pageNum}&size=6`,
                {
                    headers: {
                        authorization: token,
                        session: channel,
                    },
                }
            );
            if (response.data.campaigns) {
                setCampaigns((prev) => [...prev, ...response.data.campaigns]);
                setPage(response.data.currentPage + 1); // Increment based on API response
                setTotalPages(response.data.totalPages); // Set total pages
              }
             
        } catch (error) {
            console.log(error);
            if(error.status === 401){
                alert("Session expired, Please login again")
                localStorage.removeItem('accessToken');
                navigate('/');
              }
            if (error.response.data.message === 'Session expired, Please login again' || error.response.data.message=== 'Token expired') {
                alert("Session expired, Please login again")
                localStorage.removeItem('accessToken');
                navigate('/');
            }


        }
        finally{
            setLoading(false)
        }
    };

     
    const getmetadataCampaignById = async (id) => {
        console.log("API call triggered for meta data", id); 
       try {
        const response = await axios.get(
            `${API_BASE_URL}/v1/viewLayout/${id}`
        );

        console.log('response from line 77', response.data.campaign.initialLayout.campaign);
        setMetaData({
            title: response.data.campaign.initialLayout.campaign.name,
            description: response.data.campaign.initialLayout.campaign.description,
            image: response.data.campaign.initialLayout.campaign.images[0].url,
          });
        
       } catch (error) {
               console.log(error);
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

        setCampaignName(response.data.data.name);
        setMetaData({
            title: response.data.data.name,
            description: response.data.data.description,
            image: response.data.data.images[0].url,
          });

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
            setCampaigns((prev) => prev.filter((c) => c.campaignID !== id));
            getCampaigns();
        } catch (error) {
            console.log(error);
        }
    };

    return {
        campaigns,
        campaignName,
        metaData,
        getmetadataCampaignById,
        getCampaignById,
        getCampaigns,
        deleteCampaign,
        currentLayout,
        layoutId,
        screens,
        loading,
        page, totalPages 
    };
}
