import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useAdmin() {
  const navigate = useNavigate();
  let API_BASE_URL = 'https://xplr.live/api'; 
  if(window.location.origin==="https://pre.xplore.xircular.io"){ 
   API_BASE_URL = 'https://pre.xplore.xircular.io/api';
  }


  const adminLogin = async (email, pass) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/v1/admin/login`, {
        email: email,
        password: pass,
      });
      console.log(response.data);
      localStorage.setItem("adminToken", response.data.token);
      alert("Login Successful");
      navigate("/admin/homepage");
    } catch (error) {
      console.log("Error in Admin Login", error.response.data.message);
      alert(error.response.data.message);
    }
  };
  return { adminLogin };
}
