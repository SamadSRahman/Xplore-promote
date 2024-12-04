import axios from "axios";
import { useState } from "react";
import { profileJSON } from "./splashScreenData";

export default function useProfile() {
    const [profileLayout, setProfileLayout] = useState( JSON.stringify(profileJSON))
    const token = localStorage.getItem("accessToken")
  const getProfileLayout = async (id) => {
    try {
      const response = await axios.get(
        `https://pre.xplore.xircular.io/api/v1/user/getUserProfile/${id}`
      );
      console.log("respones", response);
      if(response.data.ProfileLayout!==null){
        setProfileLayout(response.data.ProfileLayout)
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
      const response = await axios.put("https://pre.xplore.xircular.io/api/v1/user/updateUser", formData, {
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
