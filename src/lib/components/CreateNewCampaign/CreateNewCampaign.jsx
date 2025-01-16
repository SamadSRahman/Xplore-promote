import React from 'react'
import styles from '../../../pages/Campaigns/Campaigns.module.css'
import example1 from "../../../assets/Bottom sheet Image.svg";
import example2 from "../../../assets/Frame 13822.svg";
import example3 from "../../../assets/Frame 13816.svg";
import { useNavigate } from 'react-router-dom';

export default function CreateNewCampaign() {
  const navigate = useNavigate();
  return (
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
              <button onClick={() => navigate("/createCampaign")}>
                Create your campaign
              </button>
            </div>
          </div>
    </div>
  )
}
