import React, { useEffect } from 'react';
import styles from './CampaignAnalytics.module.css';
import PerformanceAnalytics from './PerformanceAnalytics.jsx';
import useAnalytics from '../../lib/utils/useAnalytics';
import { useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';

const CampaignAnalytics = () => {
    const { users, getAnalyticsData, data , getperformamceAnalyticsData, performancedata } = useAnalytics();  
    const { campaignId } = useParams();
    
    useEffect(() => {
            if(campaignId){
                getAnalyticsData(campaignId);
                getperformamceAnalyticsData(campaignId);
            }
    }, [campaignId]);

    useEffect(()=>{
        console.log("data", data);
    },[data])

const handleExportExcel = () => {
    // Prepare data for export (remove any nested objects or complex structures)
    const exportData = data.map(user => ({
      Name: user.name,
      Email: user.email,
      Phone: `+${user.countryCode} ${user.phone}`,
      InterestedProduct: user.isInterestedProducts!==null? user.isInterestedProducts.join(","):""
    }));

    // Create a new workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

    // Generate and download the Excel file
    XLSX.writeFile(workbook, 'user_details.xlsx');
  };


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
                            <span className={styles.label}>Interested Product</span>
                        </div>
                    </div>
                </div>
                
                {/* Data Rows */}
                {data.map(user => (
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
             <PerformanceAnalytics />

            <h1 className={styles.title}>Campaign Analytics</h1>
         
            <div className={styles.analyticsContainer}>
                <button onClick={handleExportExcel}
                   className={styles.exportButton}
                >Export to Excel</button>
                {/* {renderContent()}
                    
                
                */}
                <div className={styles.tableContainer}>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Interested Product</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>+{user.countryCode} {user.phone}</td>
              <td>{user.isInterestedProducts}</td>
              <td>{user.otherDetails?.imageUrl  && <img src={user.otherDetails?.imageUrl} alt="" />}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
            </div>
        </div>
    );
};

export default CampaignAnalytics;