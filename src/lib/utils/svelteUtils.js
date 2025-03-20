import axios from "axios";
import { getScreenName, getScreenPath } from "./services";

let API_BASE_URL = 'https://xplr.live/api'; 
if(window.location.origin==="https://pre.xplore.xircular.io"){ 
 API_BASE_URL = 'https://pre.xplore.xircular.io/api';
}
const token = localStorage.getItem("accessToken");
const channel = localStorage.getItem("channel");
export const saveLayout = async (id, layout, name, isAlert) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/v1/layout/update/${id}`,
            {
                // Pass the body content as a JavaScript object
                name: getScreenPath(name),
                layoutJSON: JSON.parse(layout), // Parse `layout` to a JSON object
            },
            {
                headers: {
                    "Content-Type": "application/json", // Specify the content type
                    authorization: `${token}`, // Include the authorization token
                    session: channel,
                },
            }
        );
        console.log("Response:", response.data);
      if(isAlert){
        alert("Layout saved succssfully");
      }
        // if (name === "splash_screen") {
        //     window.location.href = `/editor/${campaignId}/landing_screen`;
        // } else {
        //     window.location.href = `/publish/${campaignId}`;
        // }
    } catch (error) {
        console.error("Error updating layout:", error);
    }
};


export const getAllLayoutNames = async (campaignId, page = 0, size = 10) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/v1/layout/getAllLayoutName/${campaignId}`,
            {
                params: { page, size },
                headers: {
                    authorization: token,
                    session: channel
                }
            }
        );
        
        const formattedScreens = response.data.layoutNames.map(screen => ({
            name: getScreenName(screen.name),
            path: getScreenPath(screen.name),
            id: screen.id,
            isInitial: screen.isInitial
        }));
        
        console.log('screens updated', formattedScreens);
        // setScreens(formattedScreens);
        localStorage.setItem('screens', JSON.stringify(formattedScreens));
        return formattedScreens;
    } catch (error) {
        console.error('Error fetching layout names:', error);
    }
};

export const createLayout = async (jsonData, campaignId, page, isInitial) => {
    console.log("create layout triggered");
    
    try {
        const response = await fetch(
            `${API_BASE_URL}/v1/layout/create/${campaignId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token,
                    session: channel
                },
                body: JSON.stringify({
                    name: getScreenPath(page),
                    layoutJSON: JSON.parse(jsonData),
                    isInitial: isInitial?true:false
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json(); // Capture the error response
            throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Layout created successfully', data);
        getAllLayoutNames(campaignId);
        return true
    } catch (error) {
        console.log('Error posting layout data:', error);
        alert(error.message || 'Failed to publish layout. Please try again.');
    }
};

export const setInitialLayout = async (id) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/v1/layout/update/${id}`,
            {
                isInitial: true
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    authorization: token,
                    session: channel
                }
            }
        );
        console.log("Response:", response.data);
        alert("Screen set as initial successfully");
    } catch (error) {
        console.error("Error setting initial layout:", error);
    }
}

export const updateLayout = async (id, layout, name, isAlert) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/v1/layout/update/${id}`,
            {
                // Pass the body content as a JavaScript object
                name: getScreenPath(name),
                layoutJSON: JSON.parse(layout), // Parse `layout` to a JSON object
            },
            {
                headers: {
                    "Content-Type": "application/json", // Specify the content type
                    authorization: `${token}`, // Include the authorization token
                    session: channel,
                },
            }
        );
        console.log("Response:", response.data);
      if(isAlert){
        alert("Layout saved succssfully");
      }
        // if (name === "splash_screen") {
        //     window.location.href = `/editor/${campaignId}/landing_screen`;
        // } else {
        //     window.location.href = `/publish/${campaignId}`;
        // }
    } catch (error) {
        console.error("Error updating layout:", error);
    }
};

export const deleteLayout = async (id)=>{
    if (!window.confirm('Are you sure you want to delete this screen?')) {
        return;
    }
    try {
        const response = await axios.delete(`${API_BASE_URL}/v1/layout/delete/${id}`,{
            headers: {
                authorization: token,
                session: channel
            }
        })
        
    } catch (error) {
        console.log('Error deleting layout:', error);
    }
}

export const updateProfile = async (id, jsonData) => {
    const formData = new FormData();
    console.log("jsonData", JSON.parse(jsonData));
    formData.append("data", JSON.stringify(
        {
            layoutJSON:JSON.parse(jsonData)
        }
    ))
    try {
      const response = await axios.put(`${API_BASE_URL}/v1/user/profile/update/${id}`, formData, {
        headers:{
            Authorization: `Bearer ${token}`,
            session: channel,
        }
      })
      console.log("response:", response.data);
      alert("Profile layout saved successfully!")
      
    } catch (error) {
      
    }
    
  }

  export const getChatBots = async () => {
    try {
      
      const response = await fetch(
        "https://xplr.live/api/v1/user/chatBot/getAllConfig",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            session: `${channel}`,
          },
        }
      );
      const data = await response.json();
      return data.configurations;
    } catch (error) {
      console.error("Error fetching chat bots:", error);
    }
  };

export const isVerifyOTPScreenAvailable = async(screenName)=>{
    const campaignId = window.location.pathname.split("/")[2]
    const screens = await getAllLayoutNames(campaignId);
    const verify_otp_screen = screens.find((screen)=>screen.path===screenName)
    if(verify_otp_screen?.name){
        return true
    }
    else{
        return false
    }
}