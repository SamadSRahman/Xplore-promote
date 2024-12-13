import { useState } from "react";

export default function useAnalytics() {
    const [users, setUsers] = useState([]);
    const [data, setData] = useState([])
    const token = localStorage.getItem('accessToken');
    const channel = localStorage.getItem('channel');

    let API_BASE_URL = 'https://pre.xplore.xircular.io/api'; 
    if(window.location.origin==="https://xplr.live"){
        console.log(window.location.origin);  
     API_BASE_URL = 'https://xplr.live/api';
    }

    
    const getAnalyticsData = async (campaignId) => {
        const response = await fetch(`${API_BASE_URL}v1/user/getSubmittedContact/${campaignId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    session: channel,
                },
            }
        );
        const data = await response.json();
        console.log(data.contacts);
        setUsers(data.contacts);

        setData(data.contacts)
        console.log("contactUs", contactUsData.map((ele)=>ele.contactInfo));
    }

    return {
        getAnalyticsData,
        data,
        users
    }
}   