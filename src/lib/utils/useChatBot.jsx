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
        setGeneratedText(response.data.generated_text)
        return response.data
    }
  return {postMessage, generatedText}
}
