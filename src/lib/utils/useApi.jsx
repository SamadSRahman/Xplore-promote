/* eslint-disable arrow-parens */
/* eslint-disable keyword-spacing */
/* eslint-disable space-before-blocks */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-console */
/* eslint-disable quotes */
/* eslint-disable indent */
import axios from "axios";
import { useState } from "react";
import { blankBackgroundJSON } from "./splashScreenData";

export default function useApi() {
  const [campaigns, setCampaigns] = useState([]);
  const [name, setName] = useState("");
  const [splashScreenLayout, setSplashScreenLayout] = useState(
    JSON.stringify(blankBackgroundJSON)
  );
  const [isSplashScreenAvailable, setIsSplashScreenAvailable] = useState(false)
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
    console.log("splash", landingLayout);
    setLandingScreenLayout(
      JSON.stringify(landingLayout?.layoutJSON)
    );
    setLayoutId(landingLayout?.layoutID);
    setIsSplashScreenAvailable(true);
   }
  };
  const updateLayout = async (id, layout, name) => {
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
    } catch (error) {
      console.error("Error updating layout:", error);
    }

      // Check if the response is OK (status in the range 200-299)
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }

    //   const data = await response.json(); // Parse the JSON response
    //   console.log("Response:", data); // Log the response data
    //   alert("Layout published successfully!");
    // } catch (error) {
    //   console.error("Error posting layout data:", error); // Log any errors
    // }
  };

  return {
    getCampaigns,
    getUserDetails,
    getCampaignById,
    updateLayout,
    name,
    campaigns,
    splashScreenLayout,
    landingScreenLayout,
    layoutId,
    isSplashScreenAvailable
  };
}
