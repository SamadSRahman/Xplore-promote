import React, { useEffect, useRef, useState } from 'react';
import styles from './NewCampaigns.module.css';
import profileIcon from '../../assets/profile-icon.svg';
import logo from '../../assets/xplr.svg';
import CampaignsGrid from '../../lib/components/CampaignsGrid/CampaignsGrid';
import AccountSection from '../../lib/components/AccountSection/AccountSection';
import ProfileSection from '../../lib/components/ProfileSection/ProfileSection';
import InventorySection from '../../lib/components/InventorySection/InventorySection';
import { useNavigate, useSearchParams } from 'react-router-dom';
// import FontsList from '../../lib/components/FontsList/FontsList';
import { FiLogOut } from "react-icons/fi";
import { HiOutlineCurrencyRupee } from "react-icons/hi";

import useAdmin from '../../lib/utils/useAdmin';

export default function NewCampaigns() {
  // Get and set query parameters
  const [searchParams, setSearchParams] = useSearchParams();
  // Derive the selected tab from the query param, default to "Campaigns"
  const selectedTab = searchParams.get('tab') || 'Campaigns';
  const tabs = ["Campaigns", "Profiles", "Accounts", "Inventory"];
  // const [selectedFont, setSelectedFont] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
   const popupRef = useRef(null);
   const {logoutUser} = useAdmin();
   const navigate = useNavigate()

  const handleTabClick = (tab) => {
    setSearchParams({ tab });
  };
  const togglePopup = (e) => {
    e.stopPropagation(); // Prevent click from closing immediately
    setIsPopupOpen((prev) => !prev);
  };
useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupOpen(false);
      }
    };

    if (isPopupOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isPopupOpen]);
  const handleLogout= async()=>{
    const isLogoutSuccessfull = logoutUser();
    if(isLogoutSuccessfull){
      localStorage.removeItem("accessToken")
      navigate("/")
    } 
  }

  return (
    <div className={styles.container}>

      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <img src={logo} alt="logo" className={styles.logo} />
          <img src={profileIcon} alt="profile-icon" className={styles.profileIcon} onClick={togglePopup} />
          {isPopupOpen && <div ref={popupRef} className={styles.popup}>
            <button onClick={()=>navigate("/pricing")}><HiOutlineCurrencyRupee size={19}/> Pricing</button>
            <button onClick={handleLogout}><FiLogOut size={16}/> Logout</button>
          </div>}
        </div>
        <div className={styles.sidebarBody}>
          {tabs.map((tab) => (
            <button 
              key={tab}
              style={tab === selectedTab ? { backgroundColor: "#D7EEFF", color: "#39A6F5", fontWeight: "bold" } : {}}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.body}>
        {selectedTab === "Campaigns" && <CampaignsGrid />}
        {selectedTab === "Profiles" && <ProfileSection/>}
        {selectedTab === "Accounts" && <AccountSection/>}
        {selectedTab === "Inventory" && <InventorySection/>}
        {/* {selectedTab === "Fonts" && <FontsList selectedFont={selectedFont} setSelectedFont={setSelectedFont}/>} */}
      </div>
    </div>
  );
}
