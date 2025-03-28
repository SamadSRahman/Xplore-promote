import axios from 'axios';

export const usePaymentGateway = () => {
  let API_BASE_URL = 'https://xplr.live/api';
  if (window.location.origin === "https://pre.xplore.xircular.io") {
    API_BASE_URL = 'https://pre.xplore.xircular.io/api';
  }
  const session = localStorage.getItem("channel")
  const getAllConfigs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/user/cashfree/getAllConfig`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
          'session':session
        }
      });
      return response;
    } catch (error) {
      console.error('Error fetching payment configs:', error);
      throw error;
    }
  };

  const createConfig = async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/v1/user/cashfree/create`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
          'session':session
        }
      });
      return response;
    } catch (error) {
      console.error('Error creating payment config:', error);
      throw error;
    }
  };

  const updateConfig = async (id, data) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/v1/user/cashfree/update/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
          'session':session
        }
      });
      return response;
    } catch (error) {
      console.error('Error updating payment config:', error);
      throw error;
    }
  };

  return {
    getAllConfigs,
    createConfig,
    updateConfig
  };
}; 