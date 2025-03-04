import React from "react";
import styles from "./AssetsNavbar.module.css";

export default function AssetsNavbar() {
  const activeBbuttonStyling = {
    backgroundColor: "#D7EEFF",
    color: "#39A6F5",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    fontWeight: "600",
    fontSize: "15px",
    border: "none",
    curser:"pointer"
  };
  const buttonStyling = {
    backgroundColor: "transparent",
    color: "#000",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    fontWeight: "600",
    fontSize: "15px",
    border: "none",
     curser:"pointer"
  };

  return (
    <div
      style={{
        border: "1px solid",
        padding: "1rem",
        display: "flex",
        justifyContent: "left",
        gap: "1rem",
      }}
      className={styles.container}
    >
      <button style={activeBbuttonStyling}>Design</button>
      <button style={buttonStyling}>Assets</button>
    </div>
  );
}
