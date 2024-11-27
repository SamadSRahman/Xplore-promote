import React, { useEffect } from 'react';
import styles from './CampaignAnalytics.module.css';
import useAnalytics from '../../lib/utils/useAnalytics';
import { useParams } from 'react-router-dom';

const CampaignAnalytics = () => {
    const { users, getAnalyticsData } = useAnalytics();  
    const { campaignId } = useParams();
    
    useEffect(() => {
        getAnalyticsData(campaignId);
    }, []);

    const renderContent = () => {
        if (!users || users.length === 0) {
            return (
                <div className={styles.noDataContainer}>
                    <p className={styles.noDataMessage}>No analytics data available for this campaign.</p>
                </div>
            );
        }

        return (
            <>
                {/* Header Row */}
                <div className={styles.userCard}>
                    <div className={styles.userHeader}>
                        <h3>Name</h3>
                    </div>
                    <div className={styles.userDetails}>
                        <div className={styles.detailItem}>
                            <span className={styles.label}>Email</span>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.label}>Phone</span>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.label}>Auth Provider</span>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.label}>Interested Product</span>
                        </div>
                    </div>
                </div>
                
                {/* Data Rows */}
                {users.map(user => (
                    <div key={user.id} className={styles.userCard}>
                        <div className={styles.userHeader}>
                            <h3>{user.name}</h3>
                            {user.isEmailVerified && <span className={styles.verifiedBadge}>Verified</span>}
                        </div>
                        <div className={styles.userDetails}>
                            <div className={styles.detailItem}>
                                <span>{user.email}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <span>{user.countryCode ? `+${user.countryCode}` : ''} {user.phone}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <span className={styles.authProvider}>{user.authProvider}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <span>{Array.isArray(user.isInterestedProducts) ? user.isInterestedProducts.join(', ') : 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </>
        );
    };
    
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Campaign Analytics</h1>
            <div className={styles.analyticsContainer}>
                {renderContent()}
            </div>
        </div>
    );
};

export default CampaignAnalytics;