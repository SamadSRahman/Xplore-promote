import React, { useEffect, useRef, useState } from "react";
import profileImage from "../../../assets/profile_placeholder.png";
import threeDotsIcon from "../../../assets/more_vert.svg";
import browseIcon from "../../../assets/browse.svg";
import qrcodeIcon from "../../../assets/qr_code_2.svg";
import deleteIcon from "../../../assets/delete.svg";
import styles from "./ProfileCard.module.css";
import { useNavigate } from "react-router-dom";
import QrPopupNew from "../QrPopupNew/QrPopupNew";
import useProfile from "../../utils/useProfile";
import DeleteAlert from "../DeleteAlert/DeleteAlert";

export default function ProfileCard({ profile }) {
  const popupRef = useRef(null);
  const navigate = useNavigate();
  const [isDeleteAlertVisible, setIsDeleteAlertVisible] = useState(false);

  const [isQrPopupVisible, setIsQrPopupVisible] = useState(false);
  const [isDropDownVisble, setIsDropDownVisible] = useState(false);
  const { deleteProfile } = useProfile();
  const togglePopup = (e) => {
    e.stopPropagation(); // Prevent click from closing immediately
    setIsDropDownVisible((prev) => !prev);
  };
  const handleDelete = async () => {
    await deleteProfile(profile.shortCode);
  };
  const handleNavigate = () => {
    navigate(`/profileDesign/${profile.id}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsDropDownVisible(false);
      }
    };

    if (isDropDownVisble) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropDownVisble]);
  return (
    <div key={profile.id} className={styles.profileCard}>
      {isDeleteAlertVisible && (
        <DeleteAlert
          title={`Delete ${profile.name} profile?`}
          text="Are you sure, you want to delete profile?"
          onClose={() => setIsDeleteAlertVisible(false)}
          onDelete={async () => {
            await handleDelete();
            setIsDeleteAlertVisible(false);
          }}
        />
      )}
      <QrPopupNew
        campaign={profile}
        isOpen={isQrPopupVisible}
        onClose={() => setIsQrPopupVisible(false)}
        shortCode={profile.shortCode}
      />
      <div
        className={styles.menuIcon}
        onClick={(e) => {
          e.stopPropagation();
          togglePopup(e);
        }}
      >
        <img src={threeDotsIcon} alt="menu" />
      </div>
      <img src={profileImage} alt="" />
      <div className={styles.contentSection}>
        <h6>{profile.name}</h6>
        <p>{profile.designation}</p>
      </div>
      {isDropDownVisble && (
        <div ref={popupRef} className={styles.popup}>
          <button onClick={handleNavigate}>
            <img src={browseIcon} alt="" />
            Edit Layout
          </button>
          <button onClick={() => setIsQrPopupVisible(true)}>
            <img src={qrcodeIcon} alt="" />
            Get QR Code
          </button>
          <button
            // onClick={() => onDelete(campaign.campaignID, campaign.name)}
            onClick={() => setIsDeleteAlertVisible(true)}
          >
            <img src={deleteIcon} alt="" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
