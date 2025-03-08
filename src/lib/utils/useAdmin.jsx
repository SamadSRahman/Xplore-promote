import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useAdmin() {
  const navigate = useNavigate();
  let API_BASE_URL = 'https://xplr.live/api'; 
  if(window.location.origin==="https://pre.xplore.xircular.io"){ 
   API_BASE_URL = 'https://pre.xplore.xircular.io/api';
  }
  const channel = localStorage.getItem('channel');
  const token = localStorage.getItem('accessToken');

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
  const logoutUser = async () =>{
    try {
      const response = await axios.delete(`${API_BASE_URL}/v1/user/logout`, {
        headers:{
          authorization: token,
          session: channel,
        }
      })
      console.log(response.data);
        if(response.data.message==="User Logout successful"){
          alert("Logout Successful")
          return true
        }

    } catch (error) {
      console.log(error);
      
    }
    
  }
  return { adminLogin, logoutUser};
}
