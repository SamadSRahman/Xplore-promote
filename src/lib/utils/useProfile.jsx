import axios from "axios";
import { useState } from "react";
import { blankBackgroundJSON } from "./splashScreenData";

export default function useProfile() {
    const [profileLayout, setProfileLayout] = useState( JSON.stringify(blankBackgroundJSON))
    const token = localStorage.getItem("accessToken");

    let API_BASE_URL = 'https://pre.xplore.xircular.io/api'; 
    if(window.location.origin==="https://xplr.live"||window.location.origin.includes("localhost")||window.location.origin.includes("vercel")){
        console.log(window.location.origin);  
     API_BASE_URL = 'https://xplr.live/api';
    }

    
  const getProfileLayout = async (id) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/v1/user/getUserProfile/${id}`
      );
      console.log("respones", response);
      if(response.data.ProfileLayout!==null){
        setProfileLayout(JSON.stringify(response.data.ProfileLayout))
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfileLayout = async (jsonData) => {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        profileLayoutJson: JSON.parse(jsonData),
      })
    );   
  
    try {
      const response = await axios.put(`${API_BASE_URL}/v1/user/updateUser`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data", // Set content type to handle FormData
        },
      });
  
      console.log("Response:", response.data);
      alert("Profile Updated successfully")
      return response.data;

    } catch (error) {
      console.error("Error updating profile layout:", error);
      throw error; // Rethrow the error for further handling
    }
  };
  return {
    getProfileLayout,
    updateProfileLayout,
    profileLayout
  };
}
