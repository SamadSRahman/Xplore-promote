import React from "react";
import styles from "./RedirectionPage.module.css";
import xplore from "../../assets/xplr.svg";
import redImg from "../../assets/Redirect-img.svg";

export default function RedirectionPage({link}) {
  return (
    <div className={styles.container}>
      <div className={styles.contentSection}>
        <h2>Welcome</h2>
        <h4>to</h4>
        <div className={styles.xploreDiv}>
          <img src={xplore} className={styles.logo} alt="" />
          <p>You are now opening the instant app</p>
          <img src={redImg} className={styles.rdctImg} alt="" />
          <a href={link} target="_blank">Continue</a>
        </div>
      </div>
    </div>
  );
}
