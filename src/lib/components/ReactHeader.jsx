import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../styleSheets/header.css';

export default function ReactHeader() {
    // const { campaignId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    let campaignId = location.pathname.split('/')[2];

    const styles = {
        margin: '0px',
        color: 'black',
        marginLeft: '10px',
        fontWeight: '600',
        padding: '6px 10px',
        borderRadius: '7px',
        cursor: 'pointer'
    };
    const selectedStyles = {
        margin: '0px',
        color: 'white',
        marginLeft: '10px',
        fontWeight: '600',
        padding: '6px 10px',
        borderRadius: '7px',
        cursor: 'pointer',
        backgroundColor: '#39A6F5',
    };
    return (
    <div className='headerContainer'>
        <div style={{ display: 'flex', gap: '10px', marginLeft: '10px' }}>
      <h3
        style={
          location.pathname.includes('splash_screen') ? selectedStyles : styles
        }
        onClick={() => window.location.href = (`/editor/${campaignId}/splash_screen`)}
      >
        Splash screen
      </h3>
      <h3
        style={
          location.pathname.includes('landing_screen') ? selectedStyles : styles
        }
        onClick={() => window.location.href = (`/editor/${campaignId}/landing_screen`)}
      >
        Landing screen
      </h3>
      {/* <h3
        style={
          location.pathname.includes('publish') ? selectedStyles : styles
        }
        onClick={() => window.location.href = (`/editor/publish/${campaignId}`)}
      >
        Publish
      </h3> */}
    </div>
    {/* <div className='headerRightSide'>
        <button>Save</button>

    </div> */}
    </div>
    );
}
