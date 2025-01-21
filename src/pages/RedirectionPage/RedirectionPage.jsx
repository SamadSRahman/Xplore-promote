import React, { useEffect, useRef } from "react";
import styles from "./RedirectionPage.module.css";

export default function RedirectionPage({link, metaData, isSocial}) {
  const anchorRef = useRef();
  useEffect(()=>{
    if(anchorRef.current){
      anchorRef.current.click()
    }
   
  },[link]) 
  

  return (
    <div className={styles.container}>
      <div className={styles.contentSection}>
        <h2>Welcome</h2>
        <h4>to</h4>
        <div className={styles.xploreDiv}>
          <h2>{metaData?.title}</h2>
          <p>{metaData?.description}</p>
          <img src={metaData?.image} className={styles.rdctImg} alt="img" />
          <a ref={anchorRef} href={link} target={isSocial?"_blank":""} >Continue</a>
        </div>
      </div>
    </div>
  );
}
