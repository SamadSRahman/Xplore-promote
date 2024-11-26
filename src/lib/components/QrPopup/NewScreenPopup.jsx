import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import styles from './QrPopup.module.css';
import useLayout from '../../utils/useLayout';
import { blankBackgroundJSON } from '../../utils/splashScreenData';

export default function NewScreenPopup({ onClose, campaignId, refreshScreenNames }) {
    const [screenName, setScreenName] = useState('');
    const { createLayout, isLayoutCreated } = useLayout();
    function handleOnSubmit() {
        if(screenName === "contact_us_screen"){
            alert("Cannot create screen with this name. Please use the Contact Us component to create a screen with this name.")
            return
        }
        if (screenName.length > 5) {
            createLayout(JSON.stringify(blankBackgroundJSON), campaignId, screenName);
        } else {
            alert('Screen name should be of atleast 5 letters');
        }
    }

    useEffect(() => {
        if (isLayoutCreated) {
            refreshScreenNames();
            alert(`${screenName} added!`);
            onClose();
        }
    }, [isLayoutCreated]);
    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <div className={styles.headers}>
                    <span>Add New Screen</span>
                    <div className={styles.closeButton} onClick={onClose}>
                        <IoMdClose size={24} />
                    </div>
                </div>
                <div style={{ marginTop: '1rem' }} className={styles.content}>
                    <div >
                        <label htmlFor="pageName">Screen Name(Should be unique)</label>
                        <input value={screenName} onChange={e => setScreenName(e.target.value)} type="text" name='pageName' />
                        <button
                            onClick={handleOnSubmit}
                            style={{
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                fontWeight: '600',
                                padding: '6px 12px',
                                borderRadius: '7px',
                                cursor: 'pointer',
                                border: 'none',
                            }}
                        >Create Screen</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
