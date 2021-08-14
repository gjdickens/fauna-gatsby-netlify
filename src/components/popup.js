import React from 'react';
import { X } from 'react-feather';

import { handleKeyDown } from '../utils/utils';

import './styles/popup.css';

const Popup = ( { children, showPopup, setShowPopup } ) => {


  return (
    <>
      {showPopup ? (
        <div className="popup-overlay">
          <div
            className="popup-background"
            onClick={ (e) => setShowPopup(false) }
            onKeyDown={ (e) => handleKeyDown(e, showPopup, setShowPopup) }
            tabIndex={0}
            aria-label="Toggle Popup"
            role="button"
          ></div>
          <div className="popup-inner">
            <X
              className="popup-close"
              onClick={ (e) => setShowPopup(false) }
              onKeyDown={ (e) => handleKeyDown(e, showPopup, setShowPopup) }
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
