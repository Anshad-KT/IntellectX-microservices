// components/PopupButton.js

import React, { useState } from 'react';
import PopupBox from './PopupBox';

const PopupButton = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
 <div onClick={togglePopup} className='bg-primary w-40 h-10 flex items-center justify-center rounded-md text-sm text-secondary hover:text-orange-500'>New thread</div>
      {showPopup && <PopupBox onClose={togglePopup} />}
    </>
  );
};

export default PopupButton;
