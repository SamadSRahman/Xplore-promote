import { useState } from "react";

export default function useChatBotConfig() {
  const [chatBots, setChatBots] = useState([]);
  const token = localStorage.getItem("accessToken");
  const session = localStorage.getItem("channel");

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

  return {
    getChatBots,
    chatBots,
  };
}
