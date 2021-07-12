import React from 'react';
import { X } from 'react-feather';

import './styles/popup.css';

const Popup = ( { children, showPopup, setShowPopup, handleKeyDown } ) => {


  return (
    <>
      {showPopup ? (
        <div className="popup-overlay">
          <div
            className="popup-background"
            onClick={ (e) => setShowPopup(!showPopup) }
            onKeyDown={ (e) => handleKeyDown() }
            tabIndex={0}
            aria-label="Toggle Popup"
            role="button"
          ></div>
          <div className="popup-inner">
            <X
              className="popup-close"
              onClick={ (e) => setShowPopup(!showPopup) }
              onKeyDown={ (e) => handleKeyDown() }
              tabIndex={0}
              aria-label="Toggle Popup"
              role="button"
            />
            {children}
          </div>
        </div>
      ) : null}
    </>
  )
}
export default Popup
