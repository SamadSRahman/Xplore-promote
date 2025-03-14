import React from 'react'
import styles from './DeleteAlert.module.css'
import close from '../../../assets/closeIcon.svg'

export default function DeleteAlert({title, text, onClose, onDelete}) {
  return (
    <div className={styles.overlay}>

        <div className={styles.container}>
            <header >
                <h6>{title}</h6>
                    <img src={close} alt="" onClick={onClose} />
            </header>
            <div className={styles.body}>
                <p>{text}</p>
            </div>
            <div className={styles.footer}>
                <button onClick={onClose} className={styles.cancelBtn}>No, don’t delete it</button>
                <button onClick={onDelete} className={styles.deleteBtn}>Yes, delete it</button>
            </div>
        </div>
    </div>
  )
}
 