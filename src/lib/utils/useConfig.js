import axios from "axios";
import { useState } from "react";

export default function useConfig() {
  const [chatBots, setChatBots] = useState([]);
  const token = localStorage.getItem("accessToken");
  const session = localStorage.getItem("channel");
  const [smsServices, setSmsServices] = useState([]);
  const [whatsAppConfigs, setWhatsAppConfigs] = useState([]);

  const getChatBots = async () => {
    try {
      const response = await fetch(
        "https://xplr.live/api/v1/user/chatBot/getAllConfig",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            session: `${session}`,
          },
        }
      );
      const data = await response.json();
      setChatBots(data.configurations);
    } catch (error) {
      console.error("Error fetching chat bots:", error);
    }
  };

  const createSMSService = async (config) => {
    try {
      const response = await axios.post(
        "https://xplr.live/api/v1/user/sms/create",
        {
          name: config.name,
          account_id: config.accountId,
          api_key: config.apiKey,
          base_url: config.baseUrl,
          provider: config.provider,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            session: session,
          },
        }
      );
      alert("Config added successfully");
      return true;
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getSMSServices = async () => {
    try {
      const res = await axios.get(
        "https://xplr.live/api/v1/user/sms/getAllConfig",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            session: session,
          },
        }
      );
      console.log(res.data);
      setSmsServices(res.data.configurations);
    } catch (error) {}
  };
  const updateSmsService = async (config) => {
    try {
      const response = await axios.put(
        `https://xplr.live/api/v1/user/sms/update/${config.id}`,
        {
          name: config.name,
          base_url: config.baseUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            session: session,
          },
        }
      );
      console.log("response", response);
      alert("Configuration updated successfully");
      return true;
    } catch (error) {
      console.error(error);
    }
  };

  const getWhatsAppConfigs = async () => {
    try {
      const response = await axios.get(
        "https://xplr.live/api/v1/user/whatsapp/getAllConfig",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            session: session,
          },
        }
      );
      console.log("response", response.data);
      setWhatsAppConfigs(response.data.configurations);
    } catch (error) {
      console.error(error);
    }
  };
  const createWhatsAppConfig = async (config) => {
    try {
      const response = await axios.post(
        "https://xplr.live/api/v1/user/whatsapp/create",
        {
          name: config.name,
          version: config.version,
          phone_number_id: config.phoneNumberId,
          webhook_verify_token: config.webhookVerifyToken,
          otp_template_name: config.otpTemplateName,
          link_template_name: config.linkTemplateName,
          meta_app_access_token: config.metaAppAccessToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            session: session,
          },
        }
      );
      alert("WhatsApp config added successfully");
      console.log(response.data);
      return true;
    } catch (error) {
      console.error("Error creating WhatsApp config:", error);
      return false;
    }
  };
  const updateWhatsAppConfig = async (config) => {
    try {
      const response = await axios.put(
        `https://xplr.live/api/v1/user/whatsapp/update/${config.id}`,
        {
          name: config.name,
          version: config.version,
          webhook_verify_token: config.webhookVerifyToken,
          otp_template_name: config.otpTemplateName,
          link_template_name: config.linkTemplateName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            session: session,
          },
        }
      );
      console.log("response", response);
      alert("WhatsApp configuration updated successfully");
      return true;
    } catch (error) {
      console.error("Error updating WhatsApp config:", error);
      return false;
    }
  };
  // const deleteWhatsAppConfig = async (id) => {
  //   try {
  //     const response = await axios.delete("")
  //   } catch (error) {
      
  //   }
    
  // }
  return {
    getChatBots,
    chatBots,
    smsServices,
    createSMSService,
    getSMSServices,
    updateSmsService,
    getWhatsAppConfigs,
    whatsAppConfigs,
    createWhatsAppConfig,
    updateWhatsAppConfig,
  };
}
