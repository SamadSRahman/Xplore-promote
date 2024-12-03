import { useState } from "react";

export default function useAnalytics() {
    const [users, setUsers] = useState([]);
    const [data, setData] = useState([])
    const token = localStorage.getItem('accessToken');
    const channel = localStorage.getItem('channel');
    const getAnalyticsData = async (campaignId) => {
        const response = await fetch(`https://pre.xplore.xircular.io/api/v1/user/getEndUserDetails/${campaignId}`,
            {
                headers: {
                    authorization: token,
                    session: channel,
                },
            }
        );
        const data = await response.json();
        console.log(data.endUsers);
        setUsers(data.endUsers);
        const contactUsData = data.endUsers.filter((user)=>user.contactInfo!==null)
        const contactData = contactUsData.map((ele)=>ele.contactInfo)
        setData(contactData)
        console.log("contactUs", contactUsData.map((ele)=>ele.contactInfo));
    }

    return {
        getAnalyticsData,
        data,
        users
    }
}   