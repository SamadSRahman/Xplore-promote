import React, { useEffect, useState } from "react";
import styles from "../AccountSection/AccountSection.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import ProductsSection from '../ProductsSection/ProductsSection';
import CollectionsSection from '../CollectionsSection/CollectionsSection';

export default function InventorySection() {
 
    const sections = ["Collections", "Products"];
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const initialSection = queryParams.get('section') || "Collections";
    const [selectedSection, setSelectedSection] = useState(initialSection);

    useEffect(() => {
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
      <header className={styles.header}>
        <h4>Inventory</h4>
       </header>
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

        {selectedSection === "Collections" && <CollectionsSection/>}
        {selectedSection === "Products" && <ProductsSection/>}
      </div>
    </div>
  );
}
