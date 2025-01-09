// src/components/Footer/Footer.jsx
import styles from "./Footer.module.css";
import { FaHome, FaSearch, FaUser } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.icon}>
        <FaHome />
        <span>Home</span>
      </div>
      <div className={styles.icon}>
        <FaSearch />
        <span>Search</span>
      </div>
      <div className={styles.icon}>
        <FaUser />
        <span>Profile</span>
      </div>
    </footer>
  );
};

export default Footer;
