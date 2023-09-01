"use client"
import React, { useState } from 'react';
import MeetPopup from '../meetPopup/MeetPopup';


interface MeetPopupProps {
    onResponseData: (data: any) => void; // Define the prop to receive the callback function
  }
  const OptionsPopup: React.FC<MeetPopupProps> = ({ onResponseData }) => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>

            <div className="relative inline-block text-left">
                {/* <button  className="focus:outline-none">
        
      </button> */}
                <div onClick={togglePopup} className='bg-primary w-40 h-10 flex items-center justify-center rounded-md text-sm text-secondary'>Options</div>
                {/* <div className='w-10 h-10 flex items-center justify-center lg:ml-4 rounded-md text-sm text-secondary'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" class="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg> */}
                {/* </div> */}
                {isOpen && (
                    <div className="absolute z-10 mt-2 w-48 bg-white rounded-lg shadow-lg">
                        {/* Popup content here */}
                        <ul className="py-2 shadow-md">
                            <li>
                                
                                <MeetPopup onResponseData={onResponseData} />
                            </li>
                            {/* <li>
                                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-300">
                                    Option 2
                                </a>
                            </li> */}
                            {/* Add more options as needed */}
                        </ul>
                    </div>
                )}
            </div>
        </>

    );
}

export default OptionsPopup;
