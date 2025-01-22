import React from "react";
import styles from "./BikerBayTermsPage.module.css";

export default function BikerBayTermsPage() {
    return (
        <div className={styles.container}>
          <h1 className={styles.heading}>Bikers Bay Prize Money Contest</h1>
    
          <section className={styles.section}>
            <h2 className={styles.subHeading}>Eligibility:</h2>
            <ul className={styles.list}>
              <li>Minimum age requirement: above 18 years as on 1-12-2024.</li>
              <li>Geographic restrictions: applicable for Indian Nationals only registering vehicles in Bangalore.</li>
              <li>Exclusions: dealers of OEM or anyone involved in the Integrated Activations zone.</li>
            </ul>
          </section>
    
          <section className={styles.section}>
            <h2 className={styles.subHeading}>Entry Details:</h2>
            <ul className={styles.list}>
              <li>Spot booking to be conducted by paying a minimum downpayment amount of ₹10,000 or as applicable.</li>
              <li>The vehicle purchase should happen within a maximum of ten days subsequently.</li>
              <li>Signing of the booking form provided by Bikers Bay.</li>
              <li>Eligible dates: 11th Dec and 12th Dec 2024.</li>
            </ul>
          </section>
    
          <section className={styles.section}>
            <h2 className={styles.subHeading}>Prize Information:</h2>
            <ul className={styles.list}>
              <li>The first spot booking Golden Key entails ₹10,000, applicable only on the purchase of a new vehicle (1 winner).</li>
              <li>Silver Keys (5 winners): ₹6,000 each, eligible for new/used vehicles.</li>
              <li>Bronze Keys (5 winners): ₹4,000 each, eligible for new/used vehicles.</li>
              <li>The prize is non-transferable and must be availed by booking the vehicle.</li>
              <li>The prize money will be transferred to the respective winner once the invoice is raised.</li>
            </ul>
          </section>
    
          <section className={styles.section}>
            <h2 className={styles.subHeading}>Winner Selection Process:</h2>
            <ul className={styles.list}>
              <li>Spot booking starts on 22nd Jan 2025 at 10 AM and closes at 6 PM, resuming on 23rd Jan 2025 from 10 AM to 6 PM.</li>
              <li>Winners will be notified on the spot and declared with their government ID number.</li>
            </ul>
          </section>
    
          <section className={styles.section}>
            <h2 className={styles.subHeading}>Participant Responsibilities:</h2>
            <ul className={styles.list}>
              <li>Providing contact information.</li>
              <li>Providing government ID.</li>
              <li>Agreeing to abide by contest rules.</li>
            </ul>
          </section>
    
          <section className={styles.section}>
            <h2 className={styles.subHeading}>Legal Considerations:</h2>
            <ul className={styles.list}>
              <li>Compliance with local laws regarding prize competitions.</li>
              <li>Participants are responsible for taxes on the prize.</li>
              <li>Right to disqualify entries for fraudulent activity.</li>
              <li>
                Indemnification clause: participants agree to hold the organizer harmless from any liability related to the contest.
              </li>
            </ul>
          </section>
        </div>
      );
}
