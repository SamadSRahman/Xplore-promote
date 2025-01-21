import React, { useEffect, useRef } from "react";
import styles from "./RedirectionPage.module.css";

export default function RedirectionPage({link, metaData, isSocial}) {
  const anchorRef = useRef();
  const attemptCount = useRef(0); 
  useEffect(() => {
    console.log("Redirection function triggered", isSocial);

    // Ensure the anchorRef and link are available
    if (!anchorRef?.current && !link) {
      console.error("No anchorRef or link available for redirection");
      return;
    }

    const timer = setInterval(() => {
      if (attemptCount.current >= 3) {
        console.log("Max redirection attempts reached");
        clearInterval(timer);
        return;
      }

      attemptCount.current += 1;
      console.log(`Redirection attempt #${attemptCount.current}`);

      if (anchorRef?.current) {
        console.log("Triggering anchor click");
        anchorRef.current.click();
      } else if (link) {
        console.log("Redirecting to:", link);
        window.location.href = link;
      } else {
        console.log("Reloading the page");
        window.location.reload();
      }
    }, 500); // Delay of 500ms between attempts

    return () => clearInterval(timer);
  }, [anchorRef, link, isSocial]);

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
