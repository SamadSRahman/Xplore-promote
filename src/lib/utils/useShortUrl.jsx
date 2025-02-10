import axios from 'axios'
import { useState } from 'react';

export default function useShortUrl() {
  const [layouts, setLayouts] = useState([]);
  const [campaignId, setCampaignId] = useState("");

  let API_BASE_URL = 'https://xplr.live/api'; 
  if(window.location.origin==="https://pre.xplore.xircular.io"){ 
   API_BASE_URL = 'https://pre.xplore.xircular.io/api';
  }

    const getLayoutByShortId = async(id)=>{
       try {
        const response = await axios.get(`${API_BASE_URL}/v1/viewLayout/${id}`);
        console.log("response", response.data);
          if(response.data.type==="campaign"){
            setLayouts(response.data.campaign.layouts)
            setCampaignId(response.data.campaign.id)
          }
          else if(response.data.type==="profile"){
            setLayouts(response.data.profile.layouts)
          }

       } catch (error) {
        console.log("error", error);
       }

    }
  return {

    getLayoutByShortId,
    campaignId,
    layouts
  }
}
