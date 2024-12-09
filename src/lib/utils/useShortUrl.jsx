import axios from 'axios'
import { useState } from 'react';

export default function useShortUrl() {
  const [layouts, setLayouts] = useState([]);
  const [campaignId, setCampaignId] = useState("")
    const getLayoutByShortId = async(id)=>{
       try {
        const response = await axios.get(`https://xplr.live/v1/viewLayout/${id}`);
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
