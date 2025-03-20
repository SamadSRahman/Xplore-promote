import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './AccountSection.module.css';
import ChatbotSection from '../ChatbotSection/ChatbotSection';
import SmsSection from '../SmsSection/SmsSection';
import WhatsAppSection from '../WhatsAppSection/WhatsAppSection';

export default function AccountSection() {
    console.log('AccountSection mounted');
    const sections = ["Chatbot", "SMS", "WhatsApp", "Payment Gateways"];
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const initialSection = queryParams.get('section') || "Chatbot";
    const [selectedSection, setSelectedSection] = useState(initialSection);

    useEffect(() => {
      console.log('useEffect triggered');
      const params = new URLSearchParams(location.search);
      // Keep the existing tab parameter case
      const currentTab = params.get('tab');
      if (currentTab) {
          params.set('tab', currentTab);
      }
      // Only add the section parameter
      params.set('section', selectedSection);
      navigate({ search: params.toString() }, { replace: true });
  }, [selectedSection, navigate, location.search]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h4>Keys</h4>
            </div>
            <div className={styles.tabsSection}>
                {sections.map((section) => (
                    <button
                        key={section}
                        onClick={() => setSelectedSection(section)}
                        style={
                            section === selectedSection 
                            ? { backgroundColor: "#D7EEFF", color: "#39A6F5", fontWeight: "bold" } 
                            : {}
                        }
                    >
                        {section}
                    </button>
                ))}
            </div>
            <div className={styles.body}>
                {selectedSection === "Chatbot" && <ChatbotSection />}
                {selectedSection === "SMS" && <SmsSection />}
                {selectedSection === "WhatsApp" && <WhatsAppSection/>}
                {selectedSection === "Payment Gateways" && <div>Payment Gateways content goes here</div>}
            </div>
        </div>
    );
}
