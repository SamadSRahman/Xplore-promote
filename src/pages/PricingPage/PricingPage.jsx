import React, { useState, useEffect } from 'react';
// import { CheckCircle } from 'lucide-react';
import styles from './PricingPage.module.css';
import { load } from "@cashfreepayments/cashfree-js";


export default function PricingPage() {
  const [plans, setPlans] = useState([]);
  const [selectedFrequency, setSelectedFrequency] = useState('monthly');
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [error, setError] = useState(null);
  
  const frequencies = [
    { id: 'monthly', label: 'Monthly' },
    { id: 'quarterly', label: 'Quarterly' },
    { id: 'half-yearly', label: '6 Months' },
    { id: 'annually', label: 'Annually' }
  ];

  useEffect(() => {
    fetchPlans();
  }, []);
  
  useEffect(() => {
    fetchPlansByFrequency(selectedFrequency);
  }, [selectedFrequency]);
  
  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://xplr.live/api/v1/subscription/with-subscription-plans', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        }
      });
      
      const data = await response.json();
      if (data.status) {
        setPlans(data.response.products);
      } else {
        setError('Failed to fetch plans');
      }
    } catch (err) {
      setError('An error occurred while fetching plans');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlansByFrequency = async (frequency) => {
    try {
      setLoading(true);
      const response = await fetch(`https://xplr.live/api/v1/subscription/getByFrequency?frequency=${frequency}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        }
      });
      
      const data = await response.json();
      if (data.status) {
        // Map the plans to match our expected format
        const updatedPlans = data.subscriptionPlans.map(plan => {
          return {
            ...plan.saasPlan,
            subscriptionPlans: [plan]
          };
        });
        setPlans(updatedPlans);
      } else {
        setError('Failed to fetch plans by frequency');
      }
    } catch (err) {
      setError('An error occurred while fetching plans');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (planName, frequency, features) => {
    try {
      setProcessingPayment(true);
      const response = await fetch('https://xplr.live/api/v1/subscription/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          subscription: {
            planName,
            frequency,
            features
          }
        })
      });
      
      const data = await response.json();
      if (data.status) {
        return data.data;
      } else {
        throw new Error('Failed to create order');
      }
    } catch (err) {
      setError('An error occurred while creating order');
      console.error(err);
      throw err;
    }
  };

  const initiateCheckout = async (orderId, planPrice) => {
    try {
      const response = await fetch('https://xplr.live/api/v1/subscription/cashfree/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          orderId,
          returnUrl: `${window.location.origin}/paymentStatus`,
          planPrice,
          currency: 'INR'
        })
      });
      
      const data = await response.json();
      if (data.success) {
        // window.location.href = data.data.payment_url;

        let checkoutOptions = {
            paymentSessionId: data.data.payment_session_id,
            returnUrl:
              `${window.location.origin}/paymentStatus?order_id=${data.data.order_id}`, // URL to redirect after payment
          };
          try {
            const cashfree = await load({
              mode:"sandbox", //or production
              // redirectTarget: "_self" 
          });
          
            cashfree.checkout(checkoutOptions).then(function (result) {
              if (result.error) {
                alert(result.error);
              }
              if (result.redirect) {
                console.log("redirection");
                console.log(result);
              }
            });
          } catch (error) {
            console.error("Error creating order:", error);
            
          }
      } else {
        throw new Error('Failed to initiate checkout');
      }
    } catch (err) {
      setError('An error occurred during checkout');
      console.error(err);
    } finally {
      setProcessingPayment(false);
    }
  };

  const handleSubscribe = async (plan) => {
    try {
      setError(null);
      const subscriptionPlan = plan.subscriptionPlans.find(p => p.frequency === selectedFrequency);
      
      if (!subscriptionPlan) {
        setError(`No ${selectedFrequency} plan available for ${plan.name}`);
        return;
      }
      
      const order = await createOrder(plan.name, selectedFrequency, plan.features);
      await initiateCheckout(order.id, subscriptionPlan.price);
    } catch (err) {
      setError('Payment process failed. Please try again.');
      setProcessingPayment(false);
    }
  };
  
  const getSubscriptionPrice = (plan) => {
    const subscriptionPlan = plan.subscriptionPlans.find(p => p.frequency === selectedFrequency);
    return subscriptionPlan ? parseFloat(subscriptionPlan.price).toFixed(2) : '-';
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading pricing plans...</p>
      </div>
    );
  }

  return (
    <div className={styles.pricingContainer}>
      <div className={styles.header}>
        <h1>Choose Your Plan</h1>
        <p>Select the perfect plan that fits your needs</p>
      </div>
      
      <div className={styles.frequencyToggle}>
        {frequencies.map((freq) => (
          <button
            key={freq.id}
            className={`${styles.frequencyBtn} ${selectedFrequency === freq.id ? styles.activeFrequency : ''}`}
            onClick={() => setSelectedFrequency(freq.id)}
          >
            {freq.label}
          </button>
        ))}
      </div>
      
      {error && <div className={styles.errorMessage}>{error}</div>}
      
      <div className={styles.plansContainer}>
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={`${styles.planCard} ${plan.name === 'Pro' ? styles.popularPlan : ''}`}
          >
            {plan.name === 'Pro' && <div className={styles.popularBadge}>Most Popular</div>}
            <h2 className={styles.planName}>{plan.name}</h2>
            <p className={styles.planDescription}>{plan.description}</p>
            
            <div className={styles.priceContainer}>
              <span className={styles.currency}>₹</span>
              <span className={styles.price}>{getSubscriptionPrice(plan)}</span>
              <span className={styles.period}>/{selectedFrequency}</span>
            </div>
            
            <div className={styles.featureList}>
              <h3>Features</h3>
              {Object.entries(plan.features).map(([feature, value]) => (
                <div key={feature} className={styles.feature}>
                  {/* <CheckCircle size={18} className={styles.checkIcon} /> */}
                  <span>{feature}: {value}</span>
                </div>
              ))}
            </div>
            
            <button 
              className={styles.subscribeBtn}
              onClick={() => handleSubscribe(plan)}
              disabled={processingPayment}
            >
              {processingPayment ? 'Processing...' : 'Subscribe Now'}
            </button>
          </div>
        ))}
      </div>
      
      {/* <div className={styles.guaranteeSection}>
        <h3>100% Satisfaction Guarantee</h3>
        <p>Try risk-free with our 30-day money-back guarantee</p>
      </div> */}
    </div>
  );
}