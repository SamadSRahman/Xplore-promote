import React, { useEffect } from 'react';
import usePaymentStatus from '../../lib/utils/usePaymentStatus';
import styles from './PaymentStatus.module.css';

export default function PaymentStatusPage() {
  const { paymentStatus, loading } = usePaymentStatus();
  
  useEffect(() => {
    // Handle any side effects after payment
    if (paymentStatus && !loading) {
      // You could set up analytics, show special offers, etc.
    }
  }, [paymentStatus, loading]);
  
  if (loading) {
    return (
      <div className={styles.statusContainer}>
        <div className={styles.statusCard}>
          <div className={styles.loadingSpinner}></div>
          <h2>Verifying payment status...</h2>
          <p>Please wait while we check your payment status</p>
        </div>
      </div>
    );
  }
  
  if (!paymentStatus) {
    return (
      <div className={styles.statusContainer}>
        <div className={styles.statusCard}>
          <div className={styles.errorIcon}>❌</div>
          <h2>Payment Information Not Found</h2>
          <p>We couldn't retrieve your payment information. Please contact support.</p>
          <button className={styles.returnButton} onClick={() => window.location.href = '/pricing'}>
            Return to Pricing
          </button>
        </div>
      </div>
    );
  }
  
  const isSuccessful = paymentStatus.order_status === 'success' || 
    (paymentStatus.payment_details && paymentStatus.payment_details.order_status === 'ACTIVE');
  
  return (
    <div className={styles.statusContainer}>
      <div className={styles.statusCard}>
        {isSuccessful ? (
          <>
            <div className={styles.successIcon}>✓</div>
            <h2>Payment Successful!</h2>
            <p>Thank you for your purchase. Your subscription is now active.</p>
            <p className={styles.redirectMessage}>Redirecting you to the dashboard...</p>
          </>
        ) : (
          <>
            <div className={styles.pendingIcon}>⏳</div>
            <h2>Payment {paymentStatus.order_status}</h2>
            <p>Your payment is currently being processed.</p>
            <button className={styles.returnButton} onClick={() => window.location.href = '/pricing'}>
              Return to Pricing
            </button>
          </>
        )}
      </div>
    </div>
  );
}