import React, { useEffect, useState } from "react";
import styles from "../AddChatbotPopup/AddChatbotPopup.module.css";
import close from "../../../assets/closeIcon.svg";
import useConfig from "../../utils/useConfig";

export default function SmsConfigPopup({ onClose, isEdit, smsConfig }) {
  const [smsDetails, setSmsDetails] = useState({
    name: "",
    accountId: "",
    apiKey: "",
    baseUrl: "",
    provider: "",
  });
  const { createSMSService, updateSmsService } = useConfig();
  function handleSmsDetailsChange(field, value) {
    setSmsDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  useEffect(() => {
    console.log("smsConfig", smsConfig);

    const config = {
      id:smsConfig.id,
      name: smsConfig.name,
      accountId: smsConfig.account_id,
      apiKey: smsConfig.api_key,
      baseUrl: smsConfig.base_url,
      provider: smsConfig.provider,
    };
    setSmsDetails(config);
  }, [smsConfig]);

  const handleSubmit = (e) => {
    e.preventDefault();
let isCreated ;
if(!isEdit){
  isCreated = createSMSService(smsDetails);
}
else {
  isCreated = updateSmsService(smsDetails);

}
     
    isCreated ? onClose() : "";
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>
          <h6> {isEdit ? "Edit" : "Add"} SMS Configuration</h6>
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
                  value={smsDetails.name}
                  onChange={(e) =>
                    handleSmsDetailsChange("name", e.target.value)
                  }
                  required
               
                />
              </label>
            </div>
            <div className={styles.inputWrapper}>
              <label>
                <strong>Provider:</strong>
                <select
                  name="provider"
                  id=""
                  required
                  onChange={(e) =>
                    handleSmsDetailsChange("provider", e.target.value)
                  }
                  disabled={isEdit}
                >
                  <option value="">Select Provider</option>
                  <option value="kaleyra">Kaleyra</option>
                  <option value="twillo">Twillo</option>
                </select>
              </label>
            </div>
            <div className={styles.inputWrapper}>
              <label>
                <strong>Account Id:</strong>
                <input
                  type="text"
                  placeholder="Account Id"
                  value={smsDetails.accountId}
                  onChange={(e) =>
                    handleSmsDetailsChange("accountId", e.target.value)
                  }
                  required
                  disabled={isEdit}
                />
              </label>
            </div>

            <div className={styles.inputWrapper}>
              <label>
                <strong>Base URL:</strong>
                <input
                  type="text"
                  placeholder="Base URL"
                  value={smsDetails.baseUrl}
                  onChange={(e) =>
                    handleSmsDetailsChange("baseUrl", e.target.value)
                  }
                  required
                  disabled={false}
                />
              </label>
            </div>
            <div className={styles.inputWrapper} style={{ width: "100%" }}>
              <label>
                <strong>API Key:</strong>
                <input
                  type="text"
                  placeholder="API Key"
                  value={smsDetails.apiKey}
                  onChange={(e) =>
                    handleSmsDetailsChange("apiKey", e.target.value)
                  }
                  required
                  disabled={isEdit}
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
