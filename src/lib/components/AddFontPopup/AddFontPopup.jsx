import React, { useEffect, useState } from "react";
import styles from "./AddFontPopup.module.css";
import uploadFile from "../../../assets/upload-file.svg";
import { fontWeights } from "../../utils/services";
import { IoMdArrowDropdown } from "react-icons/io";
import useFont from "../../utils/useFonts";

export default function AddFontPopup({ onClose, fontName }) {
  const { handleFontUpload } = useFont();
  const [formData, setFormData] = useState({
    name: fontName,
    fontWeight: "",
    file: null,
    specificName: "",
  });

  const [selectedWeight, setSelectedWeight] = useState({
    text: "",
    weight: "",
  });
  const [isSelectDrawerVisible, setIsSelectDrawerVisible] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        file: file,
      }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        file,
      }));
    }
  };

  const handleWeightSelect = (value) => {
    const { text } = value;
    setFormData((prevData) => ({
      ...prevData,
      fontWeight: text,
    }));
    setSelectedWeight(value);
    setIsSelectDrawerVisible(false);
  };

  const handleAdd = () => {
    if (selectedWeight && formData.file) {
      if (formData.name === "Untitled") {
        alert(
          "Please add a valid name to the Font by clicking on the arrow next to the Font Name"
        );
      } else {
        handleFontUpload(formData, onClose);
      }
    } else {
      alert("Please select a weight and upload a file.");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h3>Add font weight</h3>
        <div className={styles.formGroup}>
          <label htmlFor="specificName">Enter name</label>
          <input
            className={styles.specificNameInput}
            type="text"
            value={formData.specificName}
            name="specificName"
            placeholder="Enter name"
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                specificName: e.target.value,
              }))
            }
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="weightSelect">Select weight</label>

          <div className={styles.select}>
            <div
              className={styles.selectedWeight}
              onClick={() => setIsSelectDrawerVisible((prev) => !prev)}
            >
              {selectedWeight.text ? (
                <span>
                  {selectedWeight.text} {selectedWeight.weight}{" "}
                </span>
              ) : (
                <span className={styles.placeholder}>
                  {" "}
                  Select a font weight
                </span>
              )}

              <IoMdArrowDropdown
                style={{
                  transform: isSelectDrawerVisible
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
              />
            </div>
            {isSelectDrawerVisible && (
              <div className={styles.selectDrawer}>
                {fontWeights.map((weight) => (
                  <div
                    key={weight.weight}
                    onClick={() => handleWeightSelect(weight)}
                  >{`${weight.text} (${weight.weight})`}</div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="fileUpload">Upload file</label>
          <div
            className={styles.fileInput}
            onClick={() => document.getElementById("fileUpload").click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="fileUpload"
              onChange={handleFileChange}
              accept=".ttf, .otf, .woff, .woff2"
              style={{ display: "none" }} // Hide the input element
            />
            <img src={uploadFile} alt="" />
            {formData.file ? (
              <p>{formData.file.name}</p>
            ) : (
              <p>Drag and drop a file or click to upload</p>
            )}
          </div>
        </div>
        <div className={styles.actions}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.addButton} onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
