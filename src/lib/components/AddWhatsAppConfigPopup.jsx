import React, { useState, useEffect } from "react";
import styles from "./AddChatbotPopup/AddChatbotPopup.module.css";
import close from "../../assets/closeIcon.svg";
import useConfig from "../utils/useConfig";

export default function AddWhatsAppConfigPopup({ onClose, isEdit, whatsappConfig }) {
  const [whatsappDetails, setWhatsappDetails] = useState({
    name: "",
    version: "",
    phoneNumberId: "",
    webhookVerifyToken: "",
    otpTemplateName: "",
    linkTemplateName: "",
    metaAppAccessToken: "",
  });
  const { createWhatsAppConfig, updateWhatsAppConfig} = useConfig();

  function handleWhatsappDetailsChange(field, value) {
    setWhatsappDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  useEffect(() => {
    if (isEdit && whatsappConfig) {
      const config = {
        id: whatsappConfig.id,
        name: whatsappConfig.name,
        version: whatsappConfig.version,
        phoneNumberId: whatsappConfig.phone_number_id,
        webhookVerifyToken: whatsappConfig.webhook_verify_token,
        otpTemplateName: whatsappConfig.otp_template_name,
        linkTemplateName: whatsappConfig.link_template_name,
        metaAppAccessToken: whatsappConfig.meta_app_access_token,
      };
      setWhatsappDetails(config);
    }
  }, [isEdit, whatsappConfig]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isCreated;
    if(!isEdit){
         isCreated = await createWhatsAppConfig(whatsappDetails);
    }
    else{
        isCreated = await updateWhatsAppConfig(whatsappDetails)
    }
    if (isCreated) onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>
          <h6> {isEdit ? "Edit" : "Add"} WhatsApp Configuration</h6>
          <img onClick={onClose} src={close} alt="Close" />
        </header>
        <form onSubmit={handleSubmit}>
          <div className={styles.body}>
            <div className={styles.inputWrapper}>
              <label>
                <strong>Name:</strong>
                <input
                  type="text"
                  placeholder="Name"
                  value={whatsappDetails.name}
                  onChange={(e) =>
                    handleWhatsappDetailsChange("name", e.target.value)
                  }
                  required
                />
              </label>
            </div>
            <div className={styles.inputWrapper}>
              <label>
                <strong>Version:</strong>
                <input
                  type="text"
                  placeholder="Version"
                  value={whatsappDetails.version}
                  onChange={(e) =>
                    handleWhatsappDetailsChange("version", e.target.value)
                  }
                  required
                />
              </label>
            </div>
            <div className={styles.inputWrapper}>
              <label>
                <strong>Phone Number ID:</strong>
                <input
                  type="text"
                  placeholder="Phone Number ID"
                  value={whatsappDetails.phoneNumberId}
                  disabled = {isEdit}
                  onChange={(e) =>
                    handleWhatsappDetailsChange("phoneNumberId", e.target.value)
                  }
                  required
                />
              </label>
            </div>
            <div className={styles.inputWrapper}>
              <label>
                <strong>Webhook Verify Token:</strong>
                <input
                  type="text"
                  placeholder="Webhook Verify Token"
                  value={whatsappDetails.webhookVerifyToken}
                  onChange={(e) =>
                    handleWhatsappDetailsChange("webhookVerifyToken", e.target.value)
                  }
                  required
                />
              </label>
            </div>
            <div className={styles.inputWrapper}>
              <label>
                <strong>OTP Template Name:</strong>
                <input
                  type="text"
                  placeholder="OTP Template Name"
                  value={whatsappDetails.otpTemplateName}
                  onChange={(e) =>
                    handleWhatsappDetailsChange("otpTemplateName", e.target.value)
                  }
                  required
                />
              </label>
            </div>
            <div className={styles.inputWrapper}>
              <label>
                <strong>Link Template Name:</strong>
                <input
                  type="text"
                  placeholder="Link Template Name"
                  value={whatsappDetails.linkTemplateName}
                  onChange={(e) =>
                    handleWhatsappDetailsChange("linkTemplateName", e.target.value)
                  }
                  required
                />
              </label>
            </div>
            <div className={styles.inputWrapper}
            style={{width:'100%'}}
            >
              <label>
                <strong>Meta App Access Token:</strong>
                <textarea
                  type="text"
                  disabled = {isEdit}
                  placeholder="Meta App Access Token"
                  value={whatsappDetails.metaAppAccessToken}
                  onChange={(e) =>
                    handleWhatsappDetailsChange("metaAppAccessToken", e.target.value)
                  }
                  required
                />
              </label>
            </div>
          </div>
          <div className={styles.footer}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelBtn}
            >
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