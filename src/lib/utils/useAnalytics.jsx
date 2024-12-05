import { useState } from "react";

export default function useAnalytics() {
    const [users, setUsers] = useState([]);
    const [data, setData] = useState([])
    const token = localStorage.getItem('accessToken');
    const channel = localStorage.getItem('channel');

    const getAnalyticsData = async (campaignId) => {
        const response = await fetch(`https://pre.xplore.xircular.io/api/v1/user/getSubmittedContact/${campaignId}`,
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