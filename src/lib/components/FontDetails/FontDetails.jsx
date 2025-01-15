import React, { useState } from "react";
import styles from "./FontDetails.module.css";
import { IoMdArrowDropdown } from "react-icons/io";
import file from "../../../assets/fontFile.svg";
import { IoIosAdd } from "react-icons/io";
import AddFontPopup from "../AddFontPopup/AddFontPopup";
import { fontWeights } from "../../utils/services";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function FontDetails({ font }) {
  const [isAddFontVisible, setIsAddFontVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFontName, setEditedFontName] = useState(
    font.fontName || "Untitled"
  );

  const handleDelete = (weight) =>{
    alert(`Are you sure you want to delete ${weight} font weight?`)
  }
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setEditedFontName(e.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    if (onFontNameChange) {
      onFontNameChange(editedFontName);
    }
  };

  const weightScales = Object.fromEntries(
    fontWeights.map((fw) => [fw.text.toLowerCase().replace(" ", ""), fw.weight])
  );

  return (
    <div className={styles.container}>
      {isAddFontVisible && (
        <AddFontPopup
          onClose={() => setIsAddFontVisible(false)}
          fontName={editedFontName}
        />
      )}
      <header className={styles.header}>
        <div className={styles.nameSection}>
          <span>Font Name</span>
          {isEditing ? (
            <input
              type="text"
              value={editedFontName}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className={styles.fontNameInput}
              autoFocus
            />
          ) : (
            <h4 onClick={handleEditClick} className={styles.fontNameDisplay}>
              {editedFontName} <IoMdArrowDropdown size={22} />
            </h4>
          )}
        </div>
        <button onClick={() => setIsAddFontVisible(true)}>
          Add font weight <IoIosAdd size={20} />
        </button>
      </header>
      <div className={styles.body}>
        {font?.fontWeight && (
          <div className={styles.table}>
            <div className={styles.tableHead}>
              <span className={styles.weightName}>Weight Name</span>
              <span className={styles.scale}>Scale</span>
              <span className={styles.url}>URL</span>
            </div>
            <div className={styles.tableBody}>
              {Object.entries(font.fontWeight).map(([key, url]) => (
                <div className={styles.tableRow} key={key}>
                  <span className={styles.weightName}>
                    {" "}
                    <img src={file} alt="" />{" "}
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                  <span className={styles.scale}>
                    {weightScales[key.toLowerCase()] || "N/A"}
                  </span>
                  <span className={styles.url}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {url}
                    </a>
                    <div className={styles.iconSection}>
                      <MdEdit className={styles.icon} />
                      <MdDelete onClick={()=>handleDelete(key.charAt(0).toUpperCase() + key.slice(1), )} className={styles.icon} />
                    </div>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
