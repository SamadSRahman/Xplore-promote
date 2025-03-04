import React from "react";
import { IoMdAdd } from "react-icons/io";
import NewScreenPopup from "../../lib/components/QrPopup/NewScreenPopup";

export default function ScreensSection() {
  const containerStyles = {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    padding: "1rem",
    boxSizing: "border-box",
  };
  const addBtnStyles = {
    backgroundColor: " #E6E6E6",
    border: "none",
    borderRadius: "0.5rem",
    padding: "0.5rem 1rem",
    fontWeight: "bold",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    cursor: "pointer",
  };
  const selectStyles = {
    backgroundColor: " #E6E6E6",
    border: "none",
    borderRadius: "0.5rem",
    padding: "0.5rem",
    fontWeight: "bold",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    cursor: "pointer",
  };

  const segments = window.location.pathname.split("/");
  const currentScreenName = segments[3];
  const campaignId = segments[2];
  const origin = window.location.origin;

  const handleScreenChange = (event) => {
    console.log(event.target.value);
    window.location.href = `${origin}/editor/${campaignId}/${event.target.value}`;
  };

  const screens = JSON.parse(localStorage.getItem("screens")) || [];
  return (
    <div style={containerStyles}>
         <NewScreenPopup  onClose={() => setIsNewScreenPopupVisible(false)} campaignId={campaignId} />
      <select
        style={selectStyles}
        name="screens"
        onChange={handleScreenChange}
        value={currentScreenName}
      >
        {screens.map((screen, index) => (
          <option key={index} value={screen.path}>
            {screen.name}
          </option>
        ))}
      </select>
      <button
        style={addBtnStyles}
        onClick={() =>
         ""
        }
      >
        Add Screen <IoMdAdd size={16} />
      </button>
    </div>
  );
}
