import React, { useEffect, useRef } from "react";
import styles from "./RedirectionPage.module.css";

export default function RedirectionPage({link, metaData, isSocial}) {
  const anchorRef = useRef();
  useEffect(() => {
    console.log("Redirection function triggered", isSocial);
    // alert(`Redirection function triggered ${isSocial}`);
    
    // Ensure the anchorRef and link are available
    if (!anchorRef.current && !link) {
      console.error("No anchorRef or link available for redirection");
      return;
    }
  
    const timer = setTimeout(() => {
      if (anchorRef.current) {
        // Programmatically trigger the anchor click
        // alert("Triggering anchor click");
        console.log("Triggering anchor click");
        anchorRef.current.click();
      } else if (link) {
        // Fallback to directly setting the window location
        // alert("Redirecting to:", link);
        // console.log("Redirecting to:", link);
        // window.location.href = link;
      } else {
        // alert("Reloading the page");
        console.log("Reloading the page");
        window.location.reload();
      }
      // alert("fallback");
      console.log("fallback");
      window.location.reload();
    }, 300); // Increased delay to 300ms for better handling
  
    return () => clearTimeout(timer);
  }, [anchorRef, link]);

  return (
    <div className={styles.container}>
      <div className={styles.contentSection}>
        <h2>Welcome</h2>
        <h4>to</h4>
        <div className={styles.xploreDiv}>
          <h2>{metaData.title}</h2>
          <p>{metaData.description}</p>
          <img src={metaData.image} className={styles.rdctImg} alt="img" />
          <a ref={anchorRef} href={link} target={isSocial?"_blank":""} >Continue</a>
        </div>
      </div>
    </div>
  );
}
