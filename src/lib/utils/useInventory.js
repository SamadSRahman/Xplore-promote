import axios from "axios";

export default function useInventory() {
  let API_BASE_URL = "https://xplr.live/api";
  if (window.location.origin === "https://pre.xplore.xircular.io") {
    API_BASE_URL = "https://pre.xplore.xircular.io/api";


  }

  const getEncodedKey = async () => {
    const response = await axios.get(`${API_BASE_URL}/v1/auth/key`);
    console.log(response.data)
    return response.data.key;
  }

  const token = localStorage.getItem("accessToken");
  const session = localStorage.getItem("channel");
  const getAllCollections = async () => {
    const encodedKey = await getEncodedKey();
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/collection`, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
          'session': session,
          'x-encrypted-auth':encodedKey
        },
      });
      console.log("response", response.data);
      return response.data.data;
      
    } catch (error) {
      console.error("Error fetching collections:", error);
      return []
    }
  };
  return {getAllCollections};
}
