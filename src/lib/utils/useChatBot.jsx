import axios from 'axios';
import { useState } from 'react';

export default function useChatBot() {

    let API_BASE_URL = 'https://pre.xplore.xircular.io/api'; 
    if(window.location.origin==="https://xplr.live"||window.location.origin.includes("localhost")||window.location.origin.includes("vercel")){
        console.log(window.location.origin);  
     API_BASE_URL = 'https://xplr.live/api';
    }

    const [generatedText, setGeneratedText] = useState("")
    //https://pre.xplore.xircular.io/api/v1/chatBot/chat
    const postMessage = async (query) => {
        const response= await axios.post(`${API_BASE_URL}/v1/chatBot/chat`, {Question: query})
        console.log("response from chatbot", response.data)
        setGeneratedText(response.data)
        return response.data
    }

    const getSpeechFromText = async (text) => {
      try {
        const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM", {
          method: "POST",
          headers: {
            "xi-api-key": "sk_54bb120d056452299fd2f6aa61cb6cdd5a115d8e16a02485",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: text
          }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const audioBlob = await response.blob();

        return audioBlob
      } catch (error) {
        console.error("error getting speech from text",error);
      }
      
    }
  return {postMessage, generatedText, getSpeechFromText}
}

