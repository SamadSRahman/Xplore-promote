import axios from 'axios';
import { VoiceResponseModelSafetyControl } from 'elevenlabs/api';

export default function useProducts() {
    let API_BASE_URL = 'https://xplr.live/api'; 
    if(window.location.origin==="https://pre.xplore.xircular.io"){ 
     API_BASE_URL = 'https://pre.xplore.xircular.io/api';
    }
    const token = localStorage.getItem("accessToken");
    const session = localStorage.getItem("channel");
    const getAllProducts = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/v1/product?limit=10&page=0`,
                { headers: {
                    Authorization: `Bearer ${token}`,
                    session :session,
                       }
                                   })
            console.log("products response:", response.data);
            return response.data?.data?.products || []
        } 
        
        catch (error) {
            console.error("Error fetching products:", error);
            
        }
    }
  return {getAllProducts}
}
