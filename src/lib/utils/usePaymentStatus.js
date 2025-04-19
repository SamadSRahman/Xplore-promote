import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function usePaymentStatus() {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate()

  useEffect(() => {
    const checkPaymentStatus = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const orderId = urlParams.get('order_id');
      
      if (!orderId) {
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`https://xplr.live/api/v1/subscription/cashfree/order-status?order_id=${orderId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          }
        });
        
        const data = await response.json();
        
        if (data.success) {
          setPaymentStatus(data.data);
          
          // Redirect to home if payment was successful
          if (data.data.order_status === 'success' || 
             (data.data.payment_details && data.data.payment_details.order_status === 'ACTIVE')) {
            setTimeout(() => {
                navigate('/home');
            }, 3000);
          }
        }
      } catch (err) {
        console.error('Error checking payment status:', err);
      } finally {
        setLoading(false);
      }
    };
    
    checkPaymentStatus();
  }, [navigate]);
  
  return { paymentStatus, loading };
}