import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styleSheets/header.css';
import NewScreenPopup from './QrPopup/NewScreenPopup';
import logo from '../../assets/xplore.svg';
import { MdDeleteOutline } from 'react-icons/md';
import useLayout from '../utils/useLayout';


export default function ReactHeader({ screens, refreshScreenNames }) {
    const navigate = useNavigate();
    const location = useLocation();
    const campaignId = location.pathname.split('/')[2];
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isNewScreenPopupVisible, setIsNewScreenPopupVisible] = useState(false);
    const popupRef = useRef();
    const { deleteLayout, } = useLayout();
  console.log('screens', screens);

    const currentScreen = screens.find(screen =>
        location.pathname.includes(screen?.path)
    ) || screens[0];
    useEffect(()=>{localStorage.setItem('screens', JSON.stringify(screens))},[screens])

    const handleScreenSelect = screenPath => {
        setDropdownOpen(false);
        navigate(`/editor/${campaignId}/${screenPath}`);
        // window.location.href = (`/editor/${campaignId}/${screenPath}`);
    };
    useEffect(() => {
        const handleClickOutside = event => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    return (
    <div className="headerContainer" style={{ display: 'flex', alignItems: 'left', gap: '10px' }}>
      <div onClick={()=>navigate('/campaigns')}
        style={{ cursor: 'pointer' }}>
        <img src={logo} alt="" />
      </div>
      {isNewScreenPopupVisible &&
      <NewScreenPopup refreshScreenNames={refreshScreenNames} onClose={() => setIsNewScreenPopupVisible(false)} campaignId={campaignId} />}
      <div className="dropdown" style={{ position: 'relative' }}>
        <button
          onClick={() => setDropdownOpen(!isDropdownOpen)}
          style={{
              color: 'white',
              backgroundColor: '#39A6F5',
              fontWeight: '600',
              padding: '8px 12px',
              borderRadius: '7px',
              cursor: 'pointer',
              border: 'none'
          }}
        >
          {currentScreen?.name}
        </button>
        {isDropdownOpen && (
          <div ref={popupRef} className="dropdownMenu" style={{
              position: 'absolute',
              top: '100%',
              left: '0',
              backgroundColor: '#fff',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '7px',
              overflow: 'hidden',
              zIndex: 10
          }}>
            {screens.map(screen => (
              <div
                key={screen.path}
                
                style={{
                    padding: '10px',
                    cursor: 'pointer',
                    backgroundColor: screen.path === currentScreen?.path ? '#e9f5ff' : '#fff',
                    color: screen.path === currentScreen?.path ? '#39A6F5' : '#000',
                    fontWeight: screen.path === currentScreen?.path ? '600' : 'normal',
                    fontSize:'13px',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'space-between'
                }}
              >
                <span onClick={() => handleScreenSelect(screen.path)}>{screen?.name}</span>
                <MdDeleteOutline size={20} onClick={()=>deleteLayout(screen.id)}/>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* <button
        onClick={() => setIsNewScreenPopupVisible(true)}
        style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            fontWeight: '600',
            padding: '6px 12px',
            borderRadius: '7px',
            cursor: 'pointer',
            border: 'none',
            marginLeft: '10px'
        }}
      >
        Add Screen
      </button> */}
    </div>
    );
}
