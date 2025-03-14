import React, { useEffect, useState } from "react";
import styles from "./AddChatbotPopup.module.css";
import close from "../../../assets/closeIcon.svg";

export default function AddChatbotPopup({ onClose, isEdit, chatbotConfig }) {
  const [chatbotDetails, setChatbotDetails] = useState({
    name: "",
    apiKey: "",
    provider: "",
    basePrompt: "",
    adapterSource: "pbase",
    adapterId: "test/3",
    maxNewTokens: "500",
    tenantId: "ab65d0d3",
  });
  const [files, setFiles] = useState([]);
  useEffect(()=>{
    if(isEdit){
      
      const config = {
        name:chatbotConfig.name,
        apiKey: chatbotConfig.api_key,
        provider: chatbotConfig.provider,
        basePrompt: chatbotConfig.base_prompt,
        adapterSource: chatbotConfig.adapter_source || "pbase",
        adapterId: chatbotConfig.adapter_id ||"test/3",
        maxNewTokens:chatbotConfig.max_tokens || "500",
        tenantId:chatbotConfig.tenant_id || "ab65d0d3",
      }
      setChatbotDetails(config)
    }
  },[isEdit])
  function handleChatbotDetailsChange(field, value) {
    setChatbotDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const token = localStorage.getItem("accessToken"); // Adjust token retrieval as per your app
    const session = localStorage.getItem("channel"); // Adjust token retrieval as per your app

    // Common fields
    formData.append("api_key", chatbotDetails.apiKey);
    formData.append("provider", chatbotDetails.provider);
    formData.append("name", chatbotDetails.name);
    formData.append("base_prompt", chatbotDetails.basePrompt);
    files.forEach((file) => formData.append("files", file));

    // Predibase specific fields
    if (chatbotDetails.provider === "predibase") {
      formData.append("adapter_source", chatbotDetails.adapterSource);
      formData.append("adapter_id", chatbotDetails.adapterId);
      formData.append("max_new_tokens", chatbotDetails.maxNewTokens);
      formData.append("tenant_id", chatbotDetails.tenantId);
    }

    try {
      const endpoint = "https://xplr.live/api/v1/user/chatBot/create";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          session: session,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Request failed");
      onClose();
    } catch (error) {
      console.error("Error submitting chatbot:", error);
      // Add error handling here
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const token = localStorage.getItem("accessToken");
    const session = localStorage.getItem("channel");

    formData.append("api_key", chatbotDetails.apiKey);
    formData.append("provider", chatbotDetails.provider);
    formData.append("name", chatbotDetails.name);
    formData.append("base_prompt", chatbotDetails.basePrompt);
    files.forEach((file) => formData.append("files", file));

    if (chatbotDetails.provider === "predibase") {
      formData.append("adapter_source", chatbotDetails.adapterSource);
      formData.append("adapter_id", chatbotDetails.adapterId);
      formData.append("max_new_tokens", chatbotDetails.maxNewTokens);
      formData.append("tenant_id", chatbotDetails.tenantId);
    }

    try {
      const endpoint = `https://xplr.live/api/v1/user/chatBot/update/${chatbotConfig.id}`;

      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          session: session,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Request failed");
      onClose();
    } catch (error) {
      console.error("Error updating chatbot:", error);
      // Add error handling here
    }
  };

  const handleSubmit = isEdit ? handleUpdate : handleCreate;
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>
          <h6> {isEdit?"Edit":"Add"} Chatbot Details</h6>
          <img onClick={onClose} src={close} alt="Close" />
        </header>
        <form onSubmit={handleSubmit}>
          <div className={styles.body}>
            <div className={styles.inputWrapper}>
              <label>
                <strong>Name:</strong>
                <input
                  type="text"
                  disabled={isEdit}
                  placeholder="Chatbot name"
                  value={chatbotDetails.name}
                  onChange={(e) =>
                    handleChatbotDetailsChange("name", e.target.value)
                  }
                  required
                />
              </label>
            </div>

            <div className={styles.inputWrapper}>
              <label>
                <strong>Provider:</strong>
                <select
                  value={chatbotDetails.provider}
                  onChange={(e) =>
                    handleChatbotDetailsChange("provider", e.target.value)
                  }
                  required
                  disabled={isEdit}
                >
                  <option value="">Select provider</option>
                  <option value="gemini">Gemini</option>
                  <option value="predibase">Predibase</option>
                </select>
              </label>
            </div>

            <div className={styles.inputWrapper}>
              <label>
                <strong>API Key:</strong>
                <input
                  type="text"
                  disabled={isEdit}
                  placeholder="Provider API key"
                  value={chatbotDetails.apiKey}
                  onChange={(e) =>
                    handleChatbotDetailsChange("apiKey", e.target.value)
                  }
                  required
                />
              </label>
            </div>

            <div className={styles.inputWrapper}>
  <label>
    <strong>Files:</strong>
    <input
      type="file"
      multiple
      onChange={(e) => setFiles((prevFiles) => [...prevFiles, ...Array.from(e.target.files)])}
      required={!isEdit}
    />
  </label>

  {/* Display file list */}
  {files.length > 0 && (
    <div className={styles.fileList}>
      <p>Selected files:</p>
      <ul>
        {files.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </div>
  )}
</div>

            {chatbotDetails.provider === "predibase" && (
              <>
                <div className={styles.inputWrapper}>
                  <label>
                    <strong>Adapter Source:</strong>
                    <input
                     disabled={isEdit}
                      type="text"
                      value={chatbotDetails.adapterSource}
                      onChange={(e) =>
                        handleChatbotDetailsChange(
                          "adapterSource",
                          e.target.value
                        )
                      }
                      required
                    />
                  </label>
                </div>

                <div className={styles.inputWrapper}>
                  <label>
                    <strong>Adapter ID:</strong>
                    <input
                      type="text"
                      value={chatbotDetails.adapterId}
                      onChange={(e) =>
                        handleChatbotDetailsChange("adapterId", e.target.value)
                      }
                      disabled={isEdit}
                      required
                    />
                  </label>
                </div>

                <div className={styles.inputWrapper}>
                  <label>
                    <strong>Max New Tokens:</strong>
                    <input
                      type="text"
                      value={chatbotDetails.maxNewTokens}
                      onChange={(e) =>
                        handleChatbotDetailsChange(
                          "maxNewTokens",
                          e.target.value
                        )
                      }
                      disabled={isEdit}
                      required
                    />
                  </label>
                </div>

                <div className={styles.inputWrapper}>
                  <label>
                    <strong>Tenant ID:</strong>
                    <input
                      type="text"
                      value={chatbotDetails.tenantId}
                      onChange={(e) =>
                        handleChatbotDetailsChange("tenantId", e.target.value)
                      }
                      disabled={isEdit}
                      required
                    />
                  </label>
                </div>
              </>
            )}
            <div
              className={styles.inputWrapper}
              style={{ width: "100%", maxWidth: "100%" }}
            >
              <label>
                <strong>Base Prompt:</strong>
                <textarea
                  placeholder="System prompt for the chatbot"
                  value={chatbotDetails.basePrompt}
                  onChange={(e) =>
                    handleChatbotDetailsChange("basePrompt", e.target.value)
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
              {isEdit?"Edit":"Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
