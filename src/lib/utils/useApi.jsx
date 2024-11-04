/* eslint-disable brace-style */
/* eslint-disable arrow-parens */
/* eslint-disable keyword-spacing */
/* eslint-disable space-before-blocks */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-console */
/* eslint-disable quotes */
/* eslint-disable indent */
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { blankBackgroundJSON } from "./splashScreenData";


export default function useApi() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [name, setName] = useState("");
  const [splashScreenLayout, setSplashScreenLayout] = useState(
    JSON.stringify(blankBackgroundJSON)
  );
  const [campaignName, setCampaignName] = useState('');
  const [isSplashScreenAvailable, setIsSplashScreenAvailable] = useState(false);
  const [landingScreenLayout, setLandingScreenLayout] = useState(
    JSON.stringify(blankBackgroundJSON)
  );
  const [layoutId, setLayoutId] = useState('');
  const token = localStorage.getItem("accessToken");
  const getUserDetails = async () => {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(
      "https://pre.xplore.xircular.io/api/v1/user/getUserByToken",
      {
        headers: {
          authorization: token,
        },
      }
    );

    console.log("response", response);
    localStorage.setItem("user", JSON.stringify(response.data.data));
    setName(response.data.data.name);
  };
  const getCampaigns = async () => {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(
      "https://pre.xplore.xircular.io/api/v1/campaign/getAll?page=0&size=20",
      {
        headers: {
          authorization: token,
        },
      }
    );

    console.log("response", response);
    setCampaigns(response.data.campaigns);
  };
  const getCampaignById = async (id) => {
    const response = await axios.get(
      `https://pre.xplore.xircular.io/api/v1/campaign/getOne/${id}`,
      {
        headers: {
          authorization: token,
        },
      }
    );

    console.log("response", response.data.data);
    setCampaignName(response.data.data.name);
    const splashLayout = response.data.data.layouts.find(
      (ele) => ele.name === "splash_screen"
    );
   if(splashLayout){
    console.log("splash", splashLayout);
    setSplashScreenLayout(
      JSON.stringify(splashLayout?.layoutJSON)
    );
    setLayoutId(splashLayout?.layoutID);
    setIsSplashScreenAvailable(true);
   }
    const landingLayout = response.data.data.layouts.find(
      (ele) => ele.name === "landing_screen"
    );
   if(landingLayout){
    console.log("landing", landingLayout);
    setLandingScreenLayout(
      JSON.stringify(landingLayout?.layoutJSON)
    );
    setLayoutId(landingLayout?.layoutID);
    setIsSplashScreenAvailable(true);
   }
  };
  const updateLayout = async (id, layout, name, campaignId) => {
    try {
      const response = await axios.put(
        `https://pre.xplore.xircular.io/api/v1/layout/update/${id}`,
        {
          // Pass the body content as a JavaScript object
          name: name,
          layoutJSON: JSON.parse(layout), // Parse `layout` to a JSON object
        },
        {
          headers: {
            "Content-Type": "application/json", // Specify the content type
            authorization: `${token}`, // Include the authorization token
          },
        }
      );
      console.log("Response:", response.data);
      alert("Layout saved succssfully");
      if(name === 'splash_screen'){
        window.location.href = (`/editor/${campaignId}/landing_screen`);
       }
       else{
        window.location.href = (`/publish/${campaignId}`);
       }
    } catch (error) {
      console.error("Error updating layout:", error);
    }
  };

  const deleteCampaign = async(id) =>{
    try{
      const response = await axios.delete(`https://pre.xplore.xircular.io/api/v1/campaign/delete/${id}`, {
        headers: {
          authorization: token
        }
      });
      console.log("campaign deleted successfuly", response);
      getCampaigns();
    }
    catch(error){
      console.log(error);
    }
  };

  return {
    getCampaigns,
    getUserDetails,
    getCampaignById,
    updateLayout,
    deleteCampaign,
    name,
    campaigns,
    splashScreenLayout,
    landingScreenLayout,
    layoutId,
    isSplashScreenAvailable,
    campaignName
  };
}
