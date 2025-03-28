import React, { useState, useEffect } from 'react';
import styles from './AddChatbotPopup/AddChatbotPopup.module.css';
import close from '../../assets/closeIcon.svg';
import useShareCampaign from '../utils/useShareCampaign';

const ShareCampaignPopup = ({ onClose, campaignId }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sharedUsers, setSharedUsers] = useState([]);
  const [showShareForm, setShowShareForm] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [usersError, setUsersError] = useState(null);
  
  const { userLogin, fetchSharedUsers } = useShareCampaign();

  // Fetch shared users when component mounts
  useEffect(() => {
    const loadSharedUsers = async () => {
      try {
        setIsLoadingUsers(true);
        const users = await fetchSharedUsers(campaignId);
        setSharedUsers(users);
        setUsersError(null);
      } catch (error) {
        setUsersError('Failed to load shared users');
      } finally {
        setIsLoadingUsers(false);
      }
    };

    loadSharedUsers();
  }, [campaignId]);

  const handleSubmit = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await userLogin(email, password, campaignId);
      // Refresh shared users list after successful share
      const updatedUsers = await fetchSharedUsers(campaignId);
      setSharedUsers(updatedUsers);
      setShowShareForm(false);
      setEmail('');
      setPassword('');
    } catch (err) {
      setError('Failed to share campaign. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <header>
          <h5>Share Campaign</h5>
          <img src={close} alt="close" onClick={onClose} />
        </header>

        <div className={styles.body}>
          {isLoadingUsers ? (
            <div>Loading shared users...</div>
          ) : usersError ? (
            <div style={{ color: '#ff4d4f' }}>{usersError}</div>
          ) : (
            <>
              {sharedUsers.length > 0 && !showShareForm ? (
                <div className={styles.userList}>
                  <h6>Shared with:</h6>
                  {sharedUsers.map((user) => (
                    <div key={user.id} className={styles.userItem}>
                      <span>{user.email}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className={styles.inputWrapper} style={{ width: '100%' }}>
                    <label>
                      Email
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email address"
                      />
                    </label>
                  </div>

                  <div className={styles.inputWrapper} style={{ width: '100%' }}>
                    <label>
                      Password
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                      />
                    </label>
                  </div>
                </>
              )}
              {error && (
                <div style={{ color: '#ff4d4f', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  {error}
                </div>
              )}
            </>
          )}
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          {!isLoadingUsers && !usersError && sharedUsers.length > 0 && !showShareForm ? (
            <button
              className={styles.deleteBtn}
              onClick={() => setShowShareForm(true)}
            >
              Share Again
            </button>
          ) : (
            <button 
              className={styles.deleteBtn} 
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Sharing...' : 'Login to Share'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareCampaignPopup;