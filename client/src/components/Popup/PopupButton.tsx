// components/PopupButton.js

import React, { useState } from 'react';
import PopupBox from './PopupBox';

const PopupButton = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
                               <svg onClick={togglePopup} className='w-4 h-4 ml-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
      {showPopup && <PopupBox onClose={togglePopup} />}
    </div>
  );
};

export default PopupButton;
