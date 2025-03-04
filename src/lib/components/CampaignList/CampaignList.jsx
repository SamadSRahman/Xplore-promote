import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsThreeDots } from "react-icons/bs";
import { FaChartLine, FaEdit, FaTrashAlt } from "react-icons/fa";
import { MdOutlineQrCode2 } from "react-icons/md";
import styles from "../../../pages/Campaigns/Campaigns.module.css";

const CampaignsList = ({ campaigns, onDelete, onGetQr }) => {
  const navigate = useNavigate();
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const popupRef = useRef();

  const handleEdit = (campaignId, name, code) => {
    navigate(`/editor/${campaignId}/splash_screen`);
    localStorage.setItem("currentCampaign",name )
    localStorage.setItem("currentCampaignCode",code )

    setSelectedCampaign(null);
  };

  const handleDelete = (campaignId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this campaign?"
    );
    if (isConfirmed) {
      onDelete(campaignId);
      setSelectedCampaign(null);
    }
  };

  return (
    <div className={styles.campaignList}>
      {campaigns.map((campaign) => (
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
                onClick={() => handleEdit(campaign.campaignID, campaign.name, campaign.shortCode)}
              >
                <FaEdit size={15} /> Change Layout
              </div>
              <div
                className={styles.popupItem}
                onClick={() => onGetQr(campaign)}
              >
                <MdOutlineQrCode2 size={15} /> Get QR Code
              </div>
              <div
                className={styles.popupItem}
                onClick={() =>
                  navigate(`/analyticsDashboard/${campaign.campaignID}`)
                }
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
  );
};

export default CampaignsList;