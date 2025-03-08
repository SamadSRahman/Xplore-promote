import React, { useEffect, useRef, useState } from "react";
import styles from "./CampaignCard.module.css";
import { convertDate } from "../../utils/services";
import browseIcon from "../../../assets/browse.svg";
import qrcodeIcon from "../../../assets/qr_code_2.svg";
import deleteIcon from "../../../assets/delete.svg";
import threeDotsIcon from "../../../assets/more_vert.svg";
import QrPopupNew from "../QrPopupNew/QrPopupNew";
import { useNavigate } from "react-router-dom";

export default function CampaignCard({ campaign, onDelete }) {
  const [isPopupVisble, setIsPopupVisible] = useState(false);
  const [isQrPopupVisible, setIsQrPopupVisible] = useState(false);
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

  return (
    <div className={styles.container}>
      <QrPopupNew
        campaign={campaign}
        isOpen={isQrPopupVisible}
        onClose={() => setIsQrPopupVisible(false)}
        shortCode={campaign.shortCode}
      />
      <div className={styles.menuIcon} onClick={togglePopup}>
        <img src={threeDotsIcon} alt="" />
      </div>
      <img src={campaign.images[0].url} alt="" />
      <strong> {campaign.name}</strong>
      <span className={styles.date}>
        {convertDate(campaign.timing.startDate)} -{" "}
        {convertDate(campaign.timing.endDate)}
      </span>
      {isPopupVisble && (
        <div ref={popupRef} className={styles.popup}>
          <button
            onClick={() =>
              navigate(`/editor/${campaign.campaignID}/splash_screen`)
            }
          >
            <img src={browseIcon} alt="" />
            Edit Layout
          </button>
          <button onClick={() => setIsQrPopupVisible(true)}>
            <img src={qrcodeIcon} alt="" />
            Get QR Code
          </button>
          <button onClick={() => onDelete(campaign.campaignID, campaign.name)}>
            <img src={deleteIcon} alt="" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
