import React, { useEffect } from "react";
import styles from "./FontsList.module.css";
import { IoIosAdd } from "react-icons/io";
import file from "../../../assets/fontFile.svg";
import useFonts from "../../utils/useFonts";
import { fontWeights } from "../../utils/services";

export default function FontsList({ selectedFont, setSelectedFont, }) {
  const { getAllFonts, fonts, setFonts } = useFonts();
  
  useEffect(() => {
    getAllFonts();
  }, []);
  useEffect(() => {
    if (fonts.length > 0 && !selectedFont.id) {
      setSelectedFont(fonts[0]);
    }
  }, [fonts]);
  const handleAddFont = ()=>{
    setFonts((prev) => [...prev, { name: "Untitled", fontWeight: {} }]);
  }
  return (
    <div className={styles.container}>
      <div className={styles.listHeader}>
        <span> Fonts </span>
        <button onClick={handleAddFont}>
          Add <IoIosAdd size={18} />
        </button>
      </div>
      <div className={styles.listContainer}>
        {fonts.map((font) => (
          <div
            key={font.id}
            className={styles.listItem}
            onClick={() => setSelectedFont(font)}
            style={
              font.id === selectedFont.id
                ? {
                    backgroundColor: "#ECE1FF",
                    borderColor: "#7654EE",
                    fontWeight: 500,
                    color: "#7654EE",
                  }
                : {}
            }
          >
            <img src={file} alt="" />
            {font.name}
          </div>
        ))}
      </div>
    </div>
  );
}
