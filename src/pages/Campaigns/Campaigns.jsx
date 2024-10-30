/* eslint-disable no-console */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Campaigns.module.css';
import logo from '../../assets/xplore.svg';
import example1 from '../../assets/Bottom sheet Image.svg';
import example2 from '../../assets/Frame 13822.svg';
import example3 from '../../assets/Frame 13816.svg';
import useApi from '../../lib/utils/useApi';


export default function Campaigns() {
const { name, campaigns, getCampaigns, getUserDetails } = useApi();
    const navigate = useNavigate();
  useEffect(()=>{
    getUserDetails();
     getCampaigns();
    }, []);

  return (
    <div className={styles.container}>
      <div className={styles.sideBar}>
        <div className={styles.header}>
          <img src={logo} alt="" />
        </div>
        <div className={styles.body}>
          <div className={styles.welcomeText}>
            <h4>Hi {name}, Welcome</h4>
          </div>
          {campaigns.length > 0 ? (
            (
              <div>
                {campaigns.map(campaign=>(
                  <div 
                  onClick={()=>navigate(`/editor/${campaign.campaignID}/splash_screen`)}
                  className={styles.campaignItem}>
                    {campaign.name}
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className={styles.noCampaigns}>
              <p>No campaigns </p>
            </div>
          )}
        </div>
      </div>
      <div className={styles.mainBody}>
        <div className={styles.createNewCard}>
          <div className={styles.imgSection}>
            <div className={styles.leftSection}>
              <img src={example1} alt="" />
              <img src={example2} alt="" />
            </div>
            <div className={styles.rightSection}>
              <img src={example3} alt="" />
            </div>
          </div>
          <div className={styles.contentSection}>
            <h4>Create campaign</h4>
            <p>Want to get more reach, create your event</p>
            <button>Create your campaign</button>
          </div>
        </div>
      </div>
    </div>
  );
}
