import React, { useState, useEffect } from 'react';
import styles from './AddChatbotPopup/AddChatbotPopup.module.css';
import close from '../../assets/closeIcon.svg'
const AddPaymentGatewayPopup = ({ onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    XClientId: '',
    XClientSecret: '',
    redirection_url: '',
    provider: 'cashfree'
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <header>
          <h5>{initialData ? 'Edit Payment Gateway' : 'Add Payment Gateway'}</h5>
          <img src={close} alt="close" onClick={onClose} />
        </header>

        <form onSubmit={handleSubmit} className={styles.body}>
          <div className={styles.inputWrapper}>
            <label>
              Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter configuration name"
                required
              />
            </label>
          </div>

          <div className={styles.inputWrapper}>
            <label>
              Client ID
              <input
                type="text"
                name="XClientId"
                value={formData.XClientId}
                onChange={handleChange}
                placeholder="Enter client ID"
                required
              />
            </label>
          </div>

          <div className={styles.inputWrapper}>
            <label>
              Client Secret
              <input
                type="text"
                name="XClientSecret"
                value={formData.XClientSecret}
                onChange={handleChange}
                placeholder="Enter client secret"
                required
              />
            </label>
          </div>

          <div className={styles.inputWrapper}>
            <label>
              Redirect URL
              <input
                type="url"
                name="redirection_url"
                value={formData.redirection_url}
                onChange={handleChange}
                placeholder="Enter redirect URL"
                required
              />
            </label>
          </div>
        </form>

        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button 
            className={styles.deleteBtn} 
            onClick={handleSubmit}
          >
            {initialData ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPaymentGatewayPopup; 