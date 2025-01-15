import axios from "axios";
import { useState } from "react";

export default function useFonts() {
  const token = localStorage.getItem("accessToken");
  const session = localStorage.getItem("channel");
  const [fonts, setFonts] = useState([])


  let API_BASE_URL = "https://pre.xplore.xircular.io/api";
    if (
      window.location.origin === "https://xplr.live" ||
      window.location.origin.includes("localhost") ||
      window.location.origin.includes("vercel")
    ) {
      console.log(window.location.origin);
      API_BASE_URL = "https://xplr.live/api";
    }


  const handleFontUpload = async (formData, onClose) => {
    console.log("formData", formData);

    const formDataToSend = new FormData();
    formDataToSend.append("files", formData.file); // Append the file
    formDataToSend.append("name", formData.name);
    formDataToSend.append("fontWeight", formData.fontWeight);

    
    try {
      // Axios POST request
      const response = await axios.post(
        `${API_BASE_URL}/v1/font/upload`,
        formDataToSend,
        {
          headers: {
            session: session,
            Authorization: `Bearer ${token}`, // Replace with your actual token
            "Content-Type": "multipart/form-data", // Required for FormData
          },
        }
      );

      console.log("Upload successful:", response.data);
      alert("Font uploaded successfully!");
      getAllFonts();
      onClose();
    } catch (error) {
      console.error("Error uploading font:", error);
      alert("Failed to upload font!");
    }
  };

  const getAllFonts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/v1/font/getAll`,{
            headers:{
                session:session,
                Authorization : `Bearer ${token}`
            }
        });
        console.log(response.data);
        setFonts(response.data.data)
    } catch (error) {
        console.log("Error fetching fonts", error);
     
        
    }
  }
  return { handleFontUpload, getAllFonts, fonts, setFonts };
}
