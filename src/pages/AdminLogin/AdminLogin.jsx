import React, { useState } from 'react';
import styles from './AdminLogin.module.css';
import logo from '../../assets/xplore-logo.svg'
import useAdmin from '../../lib/utils/useAdmin';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {adminLogin} = useAdmin();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log('Login attempted', { email, password });
    adminLogin(email, password)
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.logoContainer}>
          {/* <div className={styles.logo}></div> */}
          <img src={logo} alt="" />
        </div>
        <h2 className={styles.loginTitle}>Admin Login</h2>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input 
              type="email" 
              id="email"
              className={styles.input} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input 
              type="password" 
              id="password"
              className={styles.input} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className={styles.loginButton}>
            Sign In
          </button>
        </form>
        <div className={styles.forgotPassword}>
          <a href="/forgot-password">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;