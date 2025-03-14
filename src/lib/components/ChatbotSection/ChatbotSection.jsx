import React, { useEffect, useState } from "react";
import TableComponent from "../TableComponent/TableComponent";
import AddChatbotPopup from "../AddChatbotPopup/AddChatbotPopup";
import styles from "./ChatbotSection.module.css";
import useChatBotConfig from "../../utils/useChatBotConfig";

export default function ChatbotSection() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false)
  const [selectedConfig, setSelectedConfig] = useState(null)
 
  const {chatBots, getChatBots} = useChatBotConfig();

  useEffect(()=>{
    getChatBots();
  },[])
  function handleEdit(config){
    setIsEdit(true)
    setSelectedConfig(config)
    setIsPopupVisible(true)
  }
  return (
    <div className={styles.container}>
      {isPopupVisible && (
        <AddChatbotPopup onClose={() => setIsPopupVisible(false)} isEdit={isEdit} chatbotConfig={selectedConfig}/>
      )}
      <header className={styles.header}>
        <h6>Chatbots</h6>
        <button onClick={()=>setIsPopupVisible(true)} className={styles.addNewBtn}>Add new</button>
      </header>
      <TableComponent
  headers={["Name", "Provider", "API Key", "Actions"]}
  data={chatBots}
  renderRow={(item, index) => (
    <tr key={index} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
      <td>{item.name}</td>
      <td>{item.provider || "-"}</td>
      <td>{item.api_key || "-"}</td>
      <td>
        {item.status === "delete" ? (
          <button className={styles.deleteBtn}>Delete</button>
        ) : (
          <button onClick={()=>handleEdit(item)} className={styles.addKeyBtn}>Edit</button>
        )}
      </td>
    </tr>
  )}
/>
    </div>
  );
}
