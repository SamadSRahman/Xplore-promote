import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import PropTypes from "prop-types";
import { FaArrowRightLong } from "react-icons/fa6";


const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    if (input.trim() !== "") {
      onSearch(input);
      setInput("");
    }
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Ask anything..."
        className={styles.input}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button className={styles.searchButton} onClick={handleSearch}>
        <FaArrowRightLong/>
      </button>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
