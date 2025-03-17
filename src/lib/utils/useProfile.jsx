import axios from "axios";
import { useState } from "react";
import { blankBackgroundJSON, newProfileLayout } from "./splashScreenData";

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
        const response = await axios.get(`${API_BASE_URL}/v1/user/profile/getOne/${id}`);
        console.log("API response:", response.data?.data);
        
        // Check if layoutJSON exists and is not null
        if (response.data?.data?.layoutJSON) {
          setProfileLayout(JSON.stringify(response.data.data.layoutJSON));
        } else {
          // Use the newProfileLayout as fallback and update with API data
          const defaultLayout = JSON.parse(JSON.stringify(newProfileLayout)); // Deep clone to avoid modifying the original
          
          // Find the variables array
          if (defaultLayout.card && defaultLayout.card.variables) {
            // Update the name, designation and image if they exist in the API response
            defaultLayout.card.variables.forEach(variable => {
              if (variable.name === "name" && response.data?.data?.name) {
                variable.value = response.data.data.name;
              }
              if (variable.name === "designation" && response.data?.data?.designation) {
                variable.value = response.data.data.designation;
              }
              if (variable.name === "image" && response.data?.data?.userImage?.cdnUrl) {
                variable.value = response.data.data.userImage.cdnUrl;
              }
            });
          }
          
          console.log("Updated defaultLayout:", defaultLayout);
          setProfileLayout(JSON.stringify(defaultLayout));
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        // Use the blank background JSON as fallback on error
        setProfileLayout(JSON.stringify(blankBackgroundJSON));
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
    console.log("JSON Data", jsonData);
    
    try {
      const response = await axios.put(`${API_BASE_URL}/v1/user/profile/update/${id}`, 
        {
          data: {
            layoutJSON: JSON.parse(jsonData)
          }
        }, 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            session: session,
          }
        }
      );
      console.log("response:", response.data);
      alert("Profile updated successfully!");
      return response.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  }

  const createProfileLayout = async (name, designation, image) => {
    
    
    try {
        const data = {
          name:name,
          designation:designation,
          // layoutJSON:blankBackgroundJSON
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
