import React from 'react';
import styles from './CollectionCard.module.css';
import placeholderImage from "../../../assets/placeholder-image.png";
import useClickOutside from '../../utils/useClickOutside';

const CollectionCard = ({ imageUrl, name, onEdit, onDelete }) => {
  
  const { ref, isOpen, toggle, close } = useClickOutside();

  return (
    <div className={styles.card}>
      <img src={imageUrl||placeholderImage} alt={name} className={styles.image} />
      
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
      </div>

      <div className={styles.menuContainer}  ref={ref}>
        <button 
          className={styles.menuButton}
          onClick={toggle}
        >
          <svg className={styles.dotsIcon} viewBox="0 0 24 24">
            <path d="M12 16a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2z"/>
          </svg>
        </button>

        {isOpen && (
          <div className={styles.menu}>
            <button className={styles.menuItem}  onClick={() => {
              onEdit();
              close();
            }}>Edit</button>
            <button className={styles.menuItem} onClick={() => {
              onDelete();
              close();
            }}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionCard;