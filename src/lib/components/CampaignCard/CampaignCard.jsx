import React, { useEffect, useRef, useState } from "react";
import styles from "./CampaignCard.module.css";
import { convertDate } from "../../utils/services";
import browseIcon from "../../../assets/browse.svg";
import qrcodeIcon from "../../../assets/qr_code_2.svg";
import deleteIcon from "../../../assets/delete.svg";
import threeDotsIcon from "../../../assets/more_vert.svg";
import QrPopupNew from "../QrPopupNew/QrPopupNew";
import { useNavigate } from "react-router-dom";
import DeleteAlert from "../DeleteAlert/DeleteAlert";
import { Loader } from "rsuite";
import useLayout from "../../utils/useLayout";
import share from "../../../assets/share.svg";
import ShareCampaignPopup from "../ShareCampaignPopup";
import placeholderImg from "../../../assets/placeholder-image.png";

export default function CampaignCard({ campaign, onDelete }) {
  const [isPopupVisble, setIsPopupVisible] = useState(false);
  const [isQrPopupVisible, setIsQrPopupVisible] = useState(false);
  const [isDeleteAlertVisible, setIsDeleteAlertVisible] = useState(false);
  const [isLoadScreenVisible, setIsLoadScreenVisible] = useState(false);
  const [isSharePopupVisible, setIsSharePopupVisible] = useState(false);
  const { addDefaultLayouts } = useLayout();
  const popupRef = useRef(null);
  const navigate = useNavigate();
  const togglePopup = (e) => {
    e.stopPropagation(); // Prevent click from closing immediately
    setIsPopupVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupVisible(false);
      }
    };

    if (isPopupVisble) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isPopupVisble]);

  const handleDelete = () => {
    setIsDeleteAlertVisible(true);
  };
  const handleNavigate = async () => {
    try {
      if (campaign.layouts.length === 0) {
        setIsLoadScreenVisible(true);
        await addDefaultLayouts(campaign.campaignID);
      }
      setIsLoadScreenVisible(false);
      localStorage.setItem("currentCampaign", campaign.name);
      localStorage.setItem("currentCampaignCode", campaign.shortCode);
      navigate(`/editor/${campaign.campaignID}/splash_screen`);
    } catch (error) {
      console.error("Error navigating to editor:", error);
      setIsLoadScreenVisible(false);
    }
  };

  return (
    <div className={styles.container}>
      {isSharePopupVisible && (
        <ShareCampaignPopup
          campaignId={campaign.campaignID}
          onClose={() => setIsSharePopupVisible(false)}
        />
      )}
      {isDeleteAlertVisible && (
        <DeleteAlert
          title={`Delete ${campaign.name} campaign?`}
          text="Are you sure, you want to delete campaign?"
          onClose={() => setIsDeleteAlertVisible(false)}
          onDelete={async () => {
            await onDelete(campaign.campaignID);
            setIsDeleteAlertVisible(false);
          }}
        />
      )}
      <QrPopupNew
        campaign={campaign}
        isOpen={isQrPopupVisible}
        onClose={() => setIsQrPopupVisible(false)}
        shortCode={campaign.shortCode}
      />
      {isLoadScreenVisible && (
        <div className={styles.loadingScreen}>
          <Loader size="md" content="Loading Screens..." />
        </div>
      )}
      <div
        className={styles.menuIcon}
        onClick={(e) => {
          e.stopPropagation();
          togglePopup(e);
        }}
      >
        <img src={threeDotsIcon} alt="menu" />
      </div>
      <div
        className={styles.mainContent}
        onClick={() =>
          window.open(`https://xplr.live/${campaign.shortCode}`, "_blank")
        }
      >
        {/* Keep your existing content here */}
        <img
          src={campaign.images?.[0]?.url || placeholderImg}
          alt="Campaign visual"
          onError={(e) => {
            e.target.src = placeholderImg; // Fallback when image fails to load
            e.target.style.objectFit = "contain"; // Adjust styling for placeholder
          }}
        />
        <strong>{campaign.name}</strong>
        <span className={styles.date}>
          {convertDate(campaign.timing.startDate)} -{" "}
          {convertDate(campaign.timing.endDate)}
        </span>
      </div>

      {isPopupVisble && (
        <div ref={popupRef} className={styles.popup}>
          <button onClick={handleNavigate}>
            <img src={browseIcon} alt="" />
            Edit Layout
          </button>
          <button onClick={() => setIsSharePopupVisible(true)}>
            <img style={{ width: "0.8rem" }} src={share} alt="" />
            Share Campaign
          </button>
          <button onClick={() => setIsQrPopupVisible(true)}>
            <img src={qrcodeIcon} alt="" />
            Get QR Code
          </button>
          <button onClick={handleDelete}>
            <img src={deleteIcon} alt="" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
