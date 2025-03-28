import axios from 'axios';

const API_BASE_URL = window.location.origin === "https://pre.xplore.xircular.io" 
  ? 'https://pre.xplore.xircular.io/api'
  : 'https://xplr.live/api';

export async function getAllFonts() {
  const token = localStorage.getItem("accessToken");
  const session = localStorage.getItem("channel");

  try {
    const response = await axios.get(`${API_BASE_URL}/v1/font/getAll`, {
      headers: {
        session: session,
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.error('Error fetching fonts:', error);
    throw error;
  }
} 