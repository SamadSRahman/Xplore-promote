import React, { useEffect, useRef, useState } from "react";
import AddProfilePopup from "../AddProfilePopup/AddProfilePopup";
import styles from "./ProfileSection.module.css";
import useProfile from "../../utils/useProfile";
import ProfileCard from '../ProfileCard/ProfileCard'

import { useNavigate } from "react-router-dom";

export default function ProfileSection() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const { getAllProfileLayouts, profiles } = useProfile();


  useEffect(() => {
    getAllProfileLayouts();
  }, []);
  // function handleEdit(config) {
  //   setIsEdit(true);
  //   setSelectedConfig(config);
  //   setIsPopupVisible(true);
  // }


  return (
    <div className={styles.container}>
      {isPopupVisible && (
        <AddProfilePopup
          onClose={() => setIsPopupVisible(false)}
          isEdit={isEdit}
          chatbotConfig={selectedConfig}
        />
      )}
      <header className={styles.header}>
        <h4>Profiles</h4>
        <button
          onClick={() => setIsPopupVisible(true)}
          className={styles.addNewBtn}
        >
          Add new
        </button>
      </header>
      <div className={styles.body}>
        {profiles.map((profile) => (
          <ProfileCard profile={profile} key={profile.id}/>
        ))}
      </div>
    </div>
  );
}
