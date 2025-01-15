import React, { useEffect } from "react";
import styles from "./FontsList.module.css";
import { IoIosAdd } from "react-icons/io";
import file from "../../../assets/fontFile.svg";
import useFonts from "../../utils/useFonts";

export default function FontsList({ selectedFont, setSelectedFont, }) {
  const { getAllFonts, fonts, setFonts } = useFonts();
  const data = [
    {
      id: "ef1ffba3-cf7c-400b-8ea7-5a973e9e2c64",
      name: "apprikart",
      fontWeight: {
        bold: "https://xplore.objectstore.e2enetworks.net/1734613702418-77335fb29ec7e17d.ttf",
      },
      createdAt: "2024-12-19T13:08:22.576Z",
      updatedAt: "2024-12-19T13:08:22.576Z",
      campaignID: "57b59308-a110-4266-945c-fd90e349a0e7",
      campaign: {
        campaignID: "57b59308-a110-4266-945c-fd90e349a0e7",
      },
    },
    {
      id: "84b4e680-0450-4eb2-9fe5-778499f5a683",
      name: "preeti",
      fontWeight: {
        regular:
          "https://xplore.objectstore.e2enetworks.net/1734613563718-b0937ac724cd6b0f.ttf",
        bold: "https://xplore.objectstore.e2enetworks.net/1734613635487-2181aeea684f94de.ttf",
      },
      createdAt: "2024-12-19T13:06:03.898Z",
      updatedAt: "2024-12-19T13:07:15.627Z",
      campaignID: "57b59308-a110-4266-945c-fd90e349a0e7",
      campaign: {
        campaignID: "57b59308-a110-4266-945c-fd90e349a0e7",
      },
    },
  ];
  useEffect(() => {
    getAllFonts();
  }, []);
  useEffect(() => {
    if (fonts.length > 0 && !selectedFont.id) {
      setSelectedFont(fonts[0]);
    }
  }, [fonts]);
  return (
    <div className={styles.container}>
      <div className={styles.listHeader}>
        <span> Fonts </span>
        <button>
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
