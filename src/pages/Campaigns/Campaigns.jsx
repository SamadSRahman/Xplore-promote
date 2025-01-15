import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { MdDesignServices, MdLogout } from "react-icons/md";
import styles from "./Campaigns.module.css";
import logo from "../../assets/xplore.svg";
import useApi from "../../lib/utils/useApi";
import QrPopup from "../../lib/components/QrPopup/QrPopup";
import useCampaign from "../../lib/utils/useCampaign";
import CampaignsList from "../../lib/components/CampaignList/CampaignList";
import CreateNewCampaign from "../../lib/components/CreateNewCampaign/CreateNewCampaign";
import FontsList from "../../lib/components/FontsList/FontsList";
import FontDetails from "../../lib/components/FontDetails/FontDetails";

export default function Campaigns() {
  const { name, getUserDetails, userId } = useApi();
  const { campaigns, getCampaigns, deleteCampaign } = useCampaign();
  const navigate = useNavigate();
  const location = useLocation();
  const popupRef = useRef();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedCampaignName, setSelectedCampaignName] = useState("");
  const [isLogoutPopupVisible, setIsLogoutPopupVisible] = useState(false);
  const [selectedShortUrl, setSelectedShortUrl] = useState("");
  const [selectedShortCode, setSelectedShortCode] = useState("");
  const [isCampaignTab, setIsCampaignTab] = useState(true);
  const [selectedFont, setSelectedFont] = useState({})
  useEffect(() => {
    let token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Please login to access your campaigns");
      navigate("/");
    }

    getUserDetails();
    getCampaigns();
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsLogoutPopupVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (location.pathname.includes("fonts")) {
      setIsCampaignTab(false);
    } else setIsCampaignTab(true);
  }, [location]);

  const handleGetQr = (campaign) => {
    setSelectedId(campaign.campaignID);
    setSelectedCampaignName(campaign.name);
    setSelectedShortUrl(campaign.shortUrl);
    setSelectedShortCode(campaign.shortCode);
    setIsPopupVisible(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
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
                style={{ cursor: "pointer" }}
                onClick={() => setIsLogoutPopupVisible(true)}
              />
              {isLogoutPopupVisible && (
                <div ref={popupRef} className={styles.popupMenu}>
                  <div
                    className={styles.popupItem}
                    onClick={() => navigate(`/profileDesign/${userId}`)}
                  >
                    <MdDesignServices size={15} /> Profile Design
                  </div>
                  <div className={styles.popupItem} onClick={handleLogout}>
                    <MdLogout size={15} /> Logout
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className={styles.tabSection}>
              <div
                onClick={() => navigate("/campaigns")}
                style={
                  isCampaignTab
                    ? { backgroundColor: "#F0F0F0", fontWeight: "bold" }
                    : {}
                }
              >
                Campaigns
              </div>
              <div
                onClick={() => navigate("/fonts")}
                style={
                  !isCampaignTab
                    ? { backgroundColor: "#F0F0F0", fontWeight: "bold" }
                    : {}
                }
              >
                Fonts
              </div>
            </div>

            {isCampaignTab ? (
              campaigns.length > 0 && (
                <CampaignsList
                  campaigns={campaigns}
                  onDelete={deleteCampaign}
                  onGetQr={handleGetQr}
                />
              )
            ) : (
              <FontsList selectedFont={selectedFont} setSelectedFont={setSelectedFont} />
            )}
          </div>
        </div>
      </div>
      {isCampaignTab ? <CreateNewCampaign />:<FontDetails font={selectedFont}/>}
    </div>
  );
}
