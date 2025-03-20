import React, { useEffect, useState } from "react";
import TableComponent from "../TableComponent/TableComponent";
import SmsConfigPopup from "./SmsConfigPopup";
import styles from "./SmsSection.module.css";
import useConfig from "../../utils/useConfig";

export default function SmsSection() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const { getSMSServices, smsServices } = useConfig();

  function handleEdit(config) {
    console.log("config,", config);
    
    setIsEdit(true);
    setSelectedConfig(config);
    setIsPopupVisible(true);
  }

  useEffect(() => {
    getSMSServices();

  }, []);
  
  return (
    <div className={styles.container}>
      {isPopupVisible && (
        <SmsConfigPopup
          onClose={() => setIsPopupVisible(false)}
          isEdit={isEdit}
          smsConfig={selectedConfig}
        />
      )}
      <header className={styles.header}>
        <h6>SMS</h6>
        <button
          onClick={() => setIsPopupVisible(true)}
          className={styles.addNewBtn}
        >
          Add new
        </button>
      </header>
      <TableComponent
        headers={["Name", "Provider", "API Key", "Actions"]}
        data={smsServices}
        renderRow={(item, index) => (
          <tr
            key={index}
            className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
          >
            <td>{item.name}</td>
            <td>{item.provider || "-"}</td>
            <td>{item.api_key || "-"}</td>
            <td
            className={styles.btnWrapper}
            > <button
                  onClick={() => handleEdit(item)}
                  className={styles.addKeyBtn}
                >
                  Edit
                </button>
             
                <button className={styles.deleteBtn}>Delete</button>
             
               
           
            </td>
          </tr>
        )}
      />
    </div>
  );
}
