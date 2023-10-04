"use client"
import React from 'react';

const Popup = ({ user_id, onClose }:any) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>New User Request</h2>
        <p>User ID: {user_id}</p>
        <button onClick={()=>onClose("accept")}>Accept</button>
        <button onClick={()=>onClose("reject")}>Decline</button>
      </div>
    </div>
  );
};

export default Popup;
