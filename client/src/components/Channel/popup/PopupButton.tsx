// components/PopupButton.js

import React, { useState } from 'react';
import PopupBox from './PopupBox';

const PopupButton1 = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
 <div onClick={togglePopup} className='ml-5'>+ new channel</div>
      {showPopup && <PopupBox onClose={togglePopup} />}
    </>
  );
};

export default PopupButton1;
