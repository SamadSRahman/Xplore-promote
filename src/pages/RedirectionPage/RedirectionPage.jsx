import React from "react";
import styles from "./RedirectionPage.module.css";
import xplore from "../../assets/xplr.svg";
import redImg from "../../assets/Redirect-img.svg";

export default function RedirectionPage({link, metaData}) {
  return (
    <div className={styles.container}>
      <div className={styles.contentSection}>
        <h2>Welcome</h2>
        <h4>to</h4>
        <div className={styles.xploreDiv}>
          {/* <img src={xplore} className={styles.logo} alt="logo" /> */}
          <h2>{metaData.title}</h2>
          <p>{metaData.description}</p>
          <img src={metaData.image} className={styles.rdctImg} alt="img1" />
          <a href={link} target="_blank">Continue</a>
        </div>
      </div>
    </div>
  );
}
