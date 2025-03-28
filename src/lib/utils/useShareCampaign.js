import React from "react";
import axios from "axios";

export default function useShareCampaign() {
  let API_BASE_URL = "https://xplr.live/api";
  if (window.location.origin === "https://pre.xplore.xircular.io") {
    API_BASE_URL = "https://pre.xplore.xircular.io/api";
  }
  let session = localStorage.getItem("channel");
  const token = localStorage.getItem("accessToken");
  const userLogin = async (email, password, campaignId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/v1/user/login`, {
        email,
        password,
      });
      localStorage.setItem("recipentAuthToken", response.data.token);

      // Share campaign after successful login
      const shareResponse = await axios.post(
        `${API_BASE_URL}/v1/campaign/share`,
        {
          campaignId,
        },
        {
          headers: {
            "recipient-auth": response.data.token,
            Authorization: `Bearer ${token}`,
            session: session,
          },
        }
      );

      return shareResponse.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const fetchSharedUsers = async (id) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/v1/campaign/sharedUsers/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            session:session
          },
        }
      );
      console.log("response:", response.data);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };
  return {
    userLogin,
    fetchSharedUsers,
  };
}
