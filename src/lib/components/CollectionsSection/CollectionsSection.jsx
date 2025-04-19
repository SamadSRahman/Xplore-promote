import React, { useEffect, useState } from "react";
import styles from "../ChatbotSection/ChatbotSection.module.css";
import AddProductPopup from '../AddProductPopup/AddProductPopup.jsx'
import useInventory from "../../utils/useInventory";
import CollectionCard from '../CollectionCard/CollectionCard';

export default function CollectionsSection() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [collections, setCollections] = useState([]);
    const {getAllCollections} = useInventory();
    useEffect(() => {
        const fetchCollections = async () => {
          const newCollections = await getAllCollections();
          setCollections(newCollections);
        };
      
        fetchCollections();
      }, []);

  return (
    <div className={styles.container}>
      {isPopupVisible && (<AddProductPopup onClose={() => setIsPopupVisible(false)} />)}
      <header className={styles.header}>
        <h6>Collections</h6>
        <button
          onClick={() => setIsPopupVisible(true)}
          className={styles.addNewBtn}
        >
          Add New
        </button>
      </header>
      <div className={styles.body}>
        {collections.map((collection, index) => (
            <div key={index}>
               <CollectionCard
               name={collection.name}
               imageUrl={collection.image}
               />
            </div>
        ))}
      </div>
    </div>
  );
}
