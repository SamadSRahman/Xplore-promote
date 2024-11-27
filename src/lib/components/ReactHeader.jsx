import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../styleSheets/header.css';
import NewScreenPopup from './QrPopup/NewScreenPopup';
import logo from '../../assets/xplore.svg';
import { MdDeleteOutline, MdNavigation } from 'react-icons/md';
import useLayout from '../utils/useLayout';
import { AiFillStar } from 'react-icons/ai';
import { useRecoilValue } from 'recoil';
import { screensAtom } from '../../recoil/atoms';



export default function ReactHeader( {}) {
    const navigate = useNavigate();
    const location = useLocation();
    const {campaignId} = useParams();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isNewScreenPopupVisible, setIsNewScreenPopupVisible] = useState(false);
    const popupRef = useRef();
    const { deleteLayout, setInitialLayout, getAllLayout,  getAllLayoutNames } = useLayout();
    const [selectedScreen, setSelectedScreen] = useState(null);
    const [popupPosition, setPopupPosition] = useState(null);
    const screens = useRecoilValue(screensAtom)

    const currentScreen = screens.find(screen =>
        location.pathname.includes(screen?.path)
    ) || screens[0];
    useEffect(()=>{localStorage.setItem('screens', JSON.stringify(screens))

      console.log("screens updated", screens);
    },[screens])
 
    

    useEffect(() => {
      getAllLayout(campaignId)
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setSelectedScreen(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleScreenClick = (screen, event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPopupPosition({
            top: rect.bottom + 5,
            left: rect.left
        });
        setSelectedScreen(screen);
    };
    const handleScreenNavigate = (screen) => {
        navigate(`/editor/${campaignId}/${screen.path}`);
        setSelectedScreen(null);
    };

    const handleDelete = (screenId) => {
        deleteLayout(screenId, campaignId);
        getAllLayoutNames(campaignId);
        setSelectedScreen(null);
    };

    const handleSetInitial = (screenId) => {
        setInitialLayout(screenId, campaignId);
        setSelectedScreen(null);
    };

    return (
    <div className="headerContainer" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div onClick={()=>navigate('/campaigns')}
        style={{ cursor: 'pointer' }}>
        <img src={logo} alt="" />
      </div>
      {isNewScreenPopupVisible &&
      <NewScreenPopup  onClose={() => setIsNewScreenPopupVisible(false)} campaignId={campaignId} />}
      <div 
      className='screensContainer'>
        {screens.map(screen => (
          <div
          className='screen'
            key={screen.path}
            onClick={(e) => handleScreenClick(screen, e)}
            style={{
              backgroundColor: screen.path === currentScreen?.path ? '#39A6F5' : '#e9f5ff',
              color: screen.path === currentScreen?.path ? 'white' : '#39A6F5',
            }}
          >
            <span>{screen.name}</span>
            {screen.isInitial && <AiFillStar color="#FFD700" />}
          </div>
        ))}
      </div>

      <button
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
      </button>

      {selectedScreen && popupPosition && (
        <div
          ref={popupRef}
          style={{
            color: '#000',
            position: 'fixed',
            backgroundColor: '#fff',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
            padding: '5px',
            zIndex: 10,
            top: popupPosition.top + 'px',
            left: popupPosition.left + 'px',
            fontSize: '12px',
            minWidth: '120px'
          }}
        >
          <div
            onClick={() => handleScreenNavigate(selectedScreen)}
            style={{
              padding: '6px 12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              ':hover': { backgroundColor: '#f5f5f5' }
            }}
          >
            <MdNavigation size={14} />
            <span>Navigate</span>
          </div>
          <div
            onClick={() => handleDelete(selectedScreen.id)}
            style={{
              padding: '6px 12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              ':hover': { backgroundColor: '#f5f5f5' }
            }}
          >
            <MdDeleteOutline size={14} />
            <span>Delete</span>
          </div>
          <div
            onClick={()=>handleSetInitial(selectedScreen.id)}
            style={{
              padding: '6px 12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              ':hover': { backgroundColor: '#f5f5f5' }
            }}
          >
            <AiFillStar size={14} />
            <span>Set as Initial</span>
          </div>
        </div>
      )}
    </div>
    );
}
