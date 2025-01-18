import axios from "axios";
import { useState } from "react";

export default function useFonts() {
  const token = localStorage.getItem("accessToken");
  const session = localStorage.getItem("channel");
  const [fonts, setFonts] = useState([])
  const [font, setFont] = useState({})

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
    formDataToSend.append("fontWeightName", formData.fontWeight);
    formDataToSend.append("specificName", formData.specificName);

    
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
  const convertData = (data) => {
    return data.flatMap(font => 
      font.fontWeights.map(weight => ({
        name: weight.specificName,
        value: weight.specificName
      }))
    );
   
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
        const formattedData = convertData(response.data.data)
        return formattedData
    } catch (error) {
        console.log("Error fetching fonts", error);
     
        
    }
  }

  const deleteFontFile = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/v1/font/delete/fontWeight/${id}`,
        {  headers:{
          session:session,
          Authorization : `Bearer ${token}`
      }}
      )
      console.log("Delete successful:", response.data);
      alert("Font deleted successfully!");
      getAllFonts();
    } catch (error) {
      throw new Error("Error deleting font")
    }
  }
  const getFontById = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/font/getOne/${id}`)
      console.log(response.data);
        setFont(response.data.data)
    } catch (error) {
      
    }
    
  }

  const getFontBySpecificName = async (name) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/font/getFontFile?specificName=${name}`);
      // console.log(response.data)
      const fontHex = response.data;
      const fontBase64 = btoa(
        fontHex.match(/\w{2}/g)
          .map(byte => String.fromCharCode(parseInt(byte, 16)))
          .join('')
      );
      console.log(fontBase64);
      
    } catch (error) {
      
    }
    
  }
  return { handleFontUpload, getAllFonts, fonts, setFonts, deleteFontFile, getFontById, font, getFontBySpecificName };
}
