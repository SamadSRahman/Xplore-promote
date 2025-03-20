import React, { useEffect, useState } from "react";
import TableComponent from "../TableComponent/TableComponent";
import AddWhatsAppConfigPopup from "../AddWhatsAppConfigPopup";
import styles from "./WhatsAppSection.module.css";
import useConfig from "../../utils/useConfig";
import DeleteAlert from "../DeleteAlert/DeleteAlert";

export default function WhatsAppSection() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const { getWhatsAppConfigs, whatsAppConfigs } = useConfig();
  const [isDeleteAlertVisible, setIsDeleteAlertVisible] = useState(false);
  function handleEdit(config) {
    console.log("config,", config);
    setIsEdit(true);
    setSelectedConfig(config);
    setIsPopupVisible(true);
  }
  const handleDelete =  (config)=>{
    setSelectedConfig(config);
    setIsDeleteAlertVisible(true)
  }
  const confirmDelete = async () => {
    
  }
  useEffect(() => {
    getWhatsAppConfigs();
  }, [isPopupVisible]);

  return (
    <div className={styles.container}>
      {isDeleteAlertVisible && (
        <DeleteAlert
          title={"Delete Configuration?"}
          text="Are you sure you want to delete this configuration?"
          onClose={()=>setIsDeleteAlertVisible(false)}
          onDelete={confirmDelete}
        />
      )}
      {isPopupVisible && (
        <AddWhatsAppConfigPopup
          onClose={() => setIsPopupVisible(false)}
          isEdit={isEdit}
          whatsappConfig={selectedConfig}
        />
      )}
      <header className={styles.header}>
        <h6>WhatsApp</h6>
        <button
          onClick={() => setIsPopupVisible(true)}
          className={styles.addNewBtn}
        >
          Add new
        </button>
      </header>
      <TableComponent
        headers={["Name", "Version", "Phone Number ID", "Actions"]}
        data={whatsAppConfigs}
        renderRow={(item, index) => (
          <tr
            key={index}
            className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
          >
            <td>{item.name}</td>
            <td>{item.version || "-"}</td>
            <td>{item.phone_number_id || "-"}</td>
            <td className={styles.btnWrapper}>
              <button
                onClick={() => handleEdit(item)}
                className={styles.addKeyBtn}
              >
                Edit
              </button>
              {/* <button className={styles.deleteBtn}
              onClick={()=>handleDelete(item)}
              >Delete</button> */}
            </td>
          </tr>
        )}
      />
    </div>
  );
}
