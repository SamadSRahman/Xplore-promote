import axios from "axios";
import { useState } from "react";
import { blankBackgroundJSON } from "./splashScreenData";

export default function useProfile() {
    const [profileLayout, setProfileLayout] = useState( JSON.stringify(blankBackgroundJSON))
    const token = localStorage.getItem("accessToken");
    const session = localStorage.getItem("channel");
    const [profiles, setProfiles] = useState([])
    let API_BASE_URL = 'https://xplr.live/api'; 
    if(window.location.origin==="https://pre.xplore.xircular.io"){ 
     API_BASE_URL = 'https://pre.xplore.xircular.io/api';
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

  const getProfile = async (id) => {
      try {
        const response = await axios.get(`https://xplr.live/api/v1/user/profile/getOne/${id}`);
        console.log(JSON.parse(response.data.data.layoutJSON))
        setProfileLayout((response.data.data.layoutJSON))
      } catch (error) {
        
      }
  }

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

  const updateProfile = async (id, jsonData) => {
    const formData = new FormData();
    formData.append("layoutJSON", jsonData)
    try {
      const response = await axios.post(`${API_BASE_URL}/v1/user/profile/update/${id}`)
      console.log("response:", response.data);

      
    } catch (error) {
      
    }
    
  }

  const createProfileLayout = async (name, designation, image) => {
    
    
    try {
        const data = {
          name:name,
          designation:designation,
          layoutJSON:blankBackgroundJSON
        }
        console.log("data received", data, image);
        const formData = new FormData();
        formData.append("files", image)
        formData.append("data", JSON.stringify(data))

        const response = await axios.post(`${API_BASE_URL}/v1/user/profile/create`,
          formData,
        {  headers: {
            Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data", 
              session:session,
        }}
        )
          console.log("response:", response.data);
          return true
          
    } catch (error) {
      console.log(error);
      if(error.status === 400){
        alert(error.response.data.message)
      }
    }
  }

  const getAllProfileLayouts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/user/profile/getAll`, {
        headers: {
            Authorization: `Bearer ${token}`,
            session:session,
        },
      });
      console.log("response", response.data);
        setProfiles(response.data.layouts)
    } catch (error) {
      
    }
  }
  const deleteProfile = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/v1/user/profile/delete/${id}`,
        {
          headers:{
            Authorization: `Bearer ${token}`,
            session: session,
          }
        }
      );
      console.log(response.data)
      alert("Profile Deleted Successfully!")
      const newProfiles = profiles.filter((profile)=>profile.shortCode !== id)
      setProfiles(newProfiles);
    } catch (error) {
      console.error(error);
      
    }
  }
  return {
    getProfileLayout,
    updateProfileLayout,
    createProfileLayout,
    getAllProfileLayouts,
    getProfile,
    updateProfile,
    deleteProfile,
    profileLayout,
    profiles
  };
}
