import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import { FaChartLine, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { MdOutlineQrCode2 } from 'react-icons/md';
import styles from './Campaigns.module.css';
import logo from '../../assets/xplore.svg';
import example1 from '../../assets/Bottom sheet Image.svg';
import example2 from '../../assets/Frame 13822.svg';
import example3 from '../../assets/Frame 13816.svg';
import useApi from '../../lib/utils/useApi';
import QrPopup from '../../lib/components/QrPopup/QrPopup';
import useCampaign from '../../lib/utils/useCampaign';
import { MdDesignServices } from "react-icons/md";
import { MdLogout } from "react-icons/md";


export default function Campaigns() {
    const { name, getUserDetails, isBusinessUser, userId } = useApi();
    const { campaigns, getCampaigns, deleteCampaign, } = useCampaign();
    const navigate = useNavigate();
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const popupRef = useRef();
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedId, setSelectedId] = useState('');
    const [selectedCampaignName, setSelectedCampaignName] = useState('');
    const [isLogoutPopupVisible, setIsLogoutPopupVisible] = useState(false);
    const [selectedShortUrl, setSelectedShortUrl] = useState("")
    const [selectedShortCode, setSelectedShortCode] = useState("")


    useEffect(() => {
      let token = localStorage.getItem('accessToken')
      if(!token){
        alert("Please login to access your campaigns")
        navigate('/')
      }
        getUserDetails();
        getCampaigns();
        const handleClickOutside = event => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setSelectedCampaign(null);
                setIsLogoutPopupVisible(false)
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleEdit = campaignId => {
        navigate(`/editor/${campaignId}/splash_screen`);
        setSelectedCampaign(null); // Close the popup after navigating
    };
    const handleDelete = (campaignId) => {
      const isConfirmed = window.confirm("Are you sure you want to delete this campaign?");
      if (isConfirmed) {
          deleteCampaign(campaignId);
          setSelectedCampaign(null); // Close the popup after deletion
      }
  };
    const handleGetQr = campaign => {
        setSelectedId(campaign.campaignID);
        setSelectedCampaignName(campaign.name);
        setSelectedShortUrl(campaign.shortUrl)
        setSelectedShortCode(campaign.shortCode)
        setIsPopupVisible(true);
    };
    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };
    return (
    <div className={styles.container}>
      {isPopupVisible && (
        <QrPopup
        type={"campaign"}
          campaignId={selectedId}
          onClose={() => setIsPopupVisible(false)}
          campaignName={selectedCampaignName}
          shortUrl={selectedShortUrl}
          shortCode={selectedShortCode}
        />
      )}
      <div className={styles.sideBar}>
        <div className={styles.header}>
          <img src={logo} alt="" />
        </div>
        <div className={styles.body}>
          <div className={styles.welcomeText}>
            <div>
              <h4>Hi {name}, Welcome</h4>
            </div>

            <div>
              <BsThreeDots
                style={{ cursor: 'pointer' }}
                onClick={() => setIsLogoutPopupVisible(true)}
              />
              {isLogoutPopupVisible && (
                <div ref={popupRef} className={styles.popupMenu}>
                   <div className={styles.popupItem} onClick={()=>navigate(`/profileDesign/${userId}`)}>
                  <MdDesignServices size={15}/>   Profile Design
                  </div>
                  <div className={styles.popupItem} onClick={handleLogout}>
                <MdLogout size={15}/>     Logout
                  </div>
                </div>
              )}
            </div>
          </div>
          {campaigns.length > 0 ? (
            <div>
              <p>Your campaigns:</p>
              <div className={styles.campaignList}>
                {campaigns.map(campaign => (
                  <div
                    key={campaign.campaignID}
                    className={styles.campaignItem}
                    onClick={() => setSelectedCampaign(campaign.campaignID)}
                  >
                    {campaign.name}
                    <div className={styles.iconWrapper}>
                      <BsThreeDots />
                    </div>
                    {selectedCampaign === campaign.campaignID && (
                      <div ref={popupRef} className={styles.popupMenu}>
                        <div
                          className={styles.popupItem}
                          onClick={() => handleEdit(campaign.campaignID)}
                        >
                          <FaEdit size={15} /> Change Layout
                        </div>
                        <div
                          className={styles.popupItem}
                          onClick={() => handleGetQr(campaign)}
                        >
                          <MdOutlineQrCode2 size={15}/> Get QR Code
                        </div>
                        <div
                          className={styles.popupItem}
                          onClick={() => navigate(`/analyticsDashboard/${campaign.campaignID}`)}
                        >
                          <FaChartLine size={15} /> Analytics
                        </div>
                        <div
                          className={styles.popupItem}
                          onClick={() => handleDelete(campaign.campaignID)}
                        >
                          <FaTrashAlt size={15} /> Delete
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.noCampaigns}>
              <p>No campaigns</p>
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
          <button onClick={() => navigate('/createCampaign')}>
              Create your campaign
            </button>
          </div>
        </div>
      </div>
    </div>
    );
}
