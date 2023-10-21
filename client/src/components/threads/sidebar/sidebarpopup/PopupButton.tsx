// components/PopupButton.js

import React, { useState } from 'react';
import PopupBox from './PopupBox';

const PopupButtonAdd = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
 <div onClick={togglePopup} className='ml-5 z-50'>+ invite your team</div>
      {showPopup && <PopupBox onClose={togglePopup} />}
    </>
  );
};

export default PopupButtonAdd;
