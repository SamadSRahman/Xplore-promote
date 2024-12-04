import axios from "axios";
import { useState } from "react";
import { profileJSON } from "./splashScreenData";

export default function useProfile() {
    const [profileLayout, setProfileLayout] = useState( JSON.stringify(profileJSON))
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
  return {
    getProfileLayout,
    profileLayout
  };
}
