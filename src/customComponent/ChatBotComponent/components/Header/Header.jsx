// src/components/Header/Header.jsx
import styles from "./Header.module.css";
import { MdOutlineClose } from "react-icons/md";
import PropTypes from 'prop-types'
import React from "react";


const Header = ({setChatBot}) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Chat Bot</div>
      <div className={styles.icons}>
            <MdOutlineClose onClick={()=>setChatBot(false)}/>
      </div>
    </header>
  );
};

export default Header;
Header.propTypes = {
  setChatBot : PropTypes.bool
}
