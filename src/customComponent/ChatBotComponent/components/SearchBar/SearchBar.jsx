// src/components/SearchBar/SearchBar.jsx
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Ask anything..."
        className={styles.input}
      />
    </div>
  );
};

export default SearchBar;
