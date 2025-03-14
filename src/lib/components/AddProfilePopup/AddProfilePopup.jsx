import React, { useEffect, useState } from "react";
import styles from "../AddChatbotPopup/AddChatbotPopup.module.css";
import close from "../../../assets/closeIcon.svg";
import useProfile from "../../utils/useProfile";

export default function AddProfilePopup({ onClose, isEdit, profile }) {
  const [profileDetails, setProfileDetails] = useState({
    name: "",
    designation: "",
  });
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { createProfileLayout } = useProfile();

  useEffect(() => {
    if (isEdit && profile) {
      setProfileDetails({
        name: profile.name || "",
        designation: profile.designation || "",
      });
    }
  }, [isEdit, profile]);

  function handleProfileDetailsChange(field, value) {
    setProfileDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleFileChange(e) {
    const selectedFile = e.target.files[0]; // Get only the first file
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile)); // Create preview URL
    }
  }

 async function handleSubmit(e) {
    e.preventDefault();
    console.log("Form submitted with:", profileDetails, file);
   const isCreated =  await createProfileLayout(profileDetails.name, profileDetails.designation, file);
   if(isCreated){
    onClose();
   }
  }

  useEffect(() => {
    // Cleanup object URL when component unmounts or file changes
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>
          <h6>{isEdit ? "Edit" : "Add"} Profile Details</h6>
          <img onClick={onClose} src={close} alt="Close" />
        </header>
        <form onSubmit={handleSubmit}>
          <div className={styles.body}>
            <div className={styles.inputWrapper} style={{ width: "100%" }}>
              <label>
                <strong>Name:</strong>
                <input
                  type="text"
                  disabled={isEdit}
                  placeholder="Your name"
                  value={profileDetails.name}
                  onChange={(e) =>
                    handleProfileDetailsChange("name", e.target.value)
                  }
                  required
                />
              </label>
            </div>

            <div className={styles.inputWrapper} style={{ width: "100%" }}>
              <label>
                <strong>Designation:</strong>
                <input
                  type="text"
                  disabled={isEdit}
                  placeholder="Your Designation"
                  value={profileDetails.designation}
                  onChange={(e) =>
                    handleProfileDetailsChange("designation", e.target.value)
                  }
                  required
                />
              </label>
            </div>

            <div className={styles.inputWrapper} style={{ width: "100%" }}>
              <label>
                <strong>Image:</strong>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required={!file}
                />
              </label>

              {/* Display Image Preview */}
              {imagePreview && (
                <div className={styles.fileList}>
                  <p>Image Preview:</p>
                  <img
                    src={imagePreview}
                    alt="Selected Preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.footer}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>
              Cancel
            </button>
            <button type="submit" className={styles.deleteBtn}>
              {isEdit ? "Edit" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
