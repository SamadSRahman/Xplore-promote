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
import { getScreenName } from "./services";

export default function useApi() {
  const channel = localStorage.getItem("channel");
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [name, setName] = useState("");
  const [splashScreenLayout, setSplashScreenLayout] = useState(
    JSON.stringify(blankBackgroundJSON)
  );
  const [campaignName, setCampaignName] = useState("");
  const [isSplashScreenAvailable, setIsSplashScreenAvailable] = useState(false);
  const [isLandingScreenAvailable, setIsLandingScreenAvailable] =
    useState(false);
  const [landingScreenLayout, setLandingScreenLayout] = useState(
    JSON.stringify(blankBackgroundJSON)
  );
  // const [layoutId, setLayoutId] = useState('');
  const [splashScreenId, setSplashScreenId] = useState("");
  const [landingScreenId, setLandingScreenId] = useState("");
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

    try {
      const response = await axios.get(
        "https://pre.xplore.xircular.io/api/v1/campaign/getAll?page=0&size=20",
        {
          headers: {
            authorization: token,
            session: channel,
          },
        }
      );

      console.log("response", response);
      setCampaigns(response.data.campaigns);
    } catch (error) {
      console.log(error);
      if(error.message === 'Session expired, Please login again'){
        localStorage.removeItem("accessToken");
        navigate('/');
      }
    }
  };
  const getCampaignById = async (id) => {
    const response = await axios.get(
      `https://pre.xplore.xircular.io/api/v1/campaign/getOne/${id}`,
      {
        headers: {
          authorization: token,
          session: channel,
        },
      }
    );

    console.log("response", response.data.data);
    setCampaignName(response.data.data.name);
    const splashLayout = response.data.data.layouts.find(
      (ele) => ele.name === "splash_screen"
    );
    if (splashLayout) {
      console.log("splash", splashLayout);
      setSplashScreenLayout(JSON.stringify(splashLayout?.layoutJSON));
      setSplashScreenId(splashLayout?.layoutID);
      setIsSplashScreenAvailable(true);
    }
    const landingLayout = response.data.data.layouts.find(
      (ele) => ele.name === "explore_screen"
    );
    if (landingLayout) {
      console.log("landing", landingLayout);
      setLandingScreenLayout(JSON.stringify(landingLayout?.layoutJSON));
      setLandingScreenId(landingLayout?.layoutID);
      setIsLandingScreenAvailable(true);
    }
  };



  const createLayout = async (jsonData, campaignId, page) => {
    try {
      const response = await fetch(
        `https://pre.xplore.xircular.io/api/v1/layout/create/${campaignId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: token,
            session: channel
          },
          body: JSON.stringify({
            name: page,
            layoutJSON: JSON.parse(jsonData)
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Layout created successfully', data);
    } catch (error) {
      console.error('Error posting layout data:', error);
      alert('Failed to publish layout. Please try again.');
    }
  };




  const updateLayout = async (id, layout, name, campaignId) => {
    try {
      const response = await axios.put(
        `https://pre.xplore.xircular.io/api/v1/layout/update/${id}`,
        {
          // Pass the body content as a JavaScript object
          name: getScreenName(name),
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
      alert("Layout saved succssfully");
      if (name === "splash_screen") {
        window.location.href = `/editor/${campaignId}/landing_screen`;
      } else {
        window.location.href = `/publish/${campaignId}`;
      }
    } catch (error) {
      console.error("Error updating layout:", error);
    }
  };

  const deleteCampaign = async (id) => {
    try {
      const response = await axios.delete(
        `https://pre.xplore.xircular.io/api/v1/campaign/delete/${id}`,
        {
          headers: {
            authorization: token,
            session: channel,
          },
        }
      );
      console.log("campaign deleted successfuly", response);
      getCampaigns();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getCampaigns,
    getUserDetails,
    getCampaignById,
    updateLayout,
    deleteCampaign,
    createLayout,
    name,
    campaigns,
    splashScreenLayout,
    landingScreenLayout,
    splashScreenId,
    landingScreenId,
    isSplashScreenAvailable,
    isLandingScreenAvailable,
    campaignName,
  };
}
