import React, { useState } from 'react'
import styles from './AccountSection.module.css'
import ChatbotSection from '../ChatbotSection/ChatbotSection'

export default function AccountSection() {
    const tabs = ["Chatbot", "SMS", "Payment Gateways"];
    const [selectedTab, setSelectedTab] = useState("Chatbot")
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4>Keys</h4>
      </div>
      <div className={styles.tabsSection}>
        {tabs.map((tab)=>(
            <button 
            onClick={()=>setSelectedTab(tab)}
            style={tab === selectedTab ? { backgroundColor: "#D7EEFF", color: "#39A6F5", fontWeight: "bold" } : {}}
            key={tab}>{tab}</button>
        ))}

      </div>
      <div className={styles.body}>
        {selectedTab==="Chatbot" && <ChatbotSection/>}
      </div>
     </div>
  )
}
