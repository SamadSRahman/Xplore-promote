import { useState } from 'react';
import styles from './ProductCard.module.css';

const ProductCard = ({ imageUrl, name, price, collectionName, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={name} className={styles.image} />
      
      <div className={styles.content}>
        <div className={styles.row}>
          <h3 className={styles.name}>{name}</h3>
          <span className={styles.price}>${price}</span>
        </div>
        <p className={styles.collection}>{collectionName}</p>
      </div>

      <div className={styles.menuContainer}>
        <button 
          className={styles.menuButton}
          onClick={() => setShowMenu(!showMenu)}
        >
          <svg className={styles.dotsIcon} viewBox="0 0 24 24">
            <path d="M12 16a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2z"/>
          </svg>
        </button>

        {showMenu && (
          <div className={styles.menu}>
            <button className={styles.menuItem} onClick={onEdit}>Edit</button>
            <button className={styles.menuItem} onClick={onDelete}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;