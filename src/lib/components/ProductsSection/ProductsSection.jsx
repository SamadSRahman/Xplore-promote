import React, { useEffect, useState } from "react";
import styles from "../ChatbotSection/ChatbotSection.module.css";
import AddProductPopup from '../AddProductPopup/AddProductPopup.jsx'

export default function ProductsSection() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      {isPopupVisible && (<AddProductPopup onClose={() => setIsPopupVisible(false)} />)}
      <header className={styles.header}>
        <h6>Products</h6>
        <button
          onClick={() => setIsPopupVisible(true)}
          className={styles.addNewBtn}
        >
          Add New
        </button>
      </header>
      <div className={styles.body}></div>
    </div>
  );
}
