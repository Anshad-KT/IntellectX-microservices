"use client"
import { addvideoConferenceIsRoomHost } from '@/app/GlobalRedux/Features/videoConfererence/videoConferenceSlice';
import { RootState } from '@/app/GlobalRedux/store';
import auth from '@/services/axios';
import { createNewRoom } from '@/utils/wss';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

interface MeetPopupProps {
    onResponseData: (data: any) => void; // Define the prop to receive the callback function
}

const MeetPopup: React.FC<MeetPopupProps> = ({onResponseData}) => {
    const dispatch = useDispatch()
    const { value } = useSelector((state: RootState) => state.id)
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = (buttonName:string) => {
        console.log(buttonName);
        if(buttonName==="create"){

            const roomID = uuidv4();
            onResponseData(roomID)
            dispatch(addvideoConferenceIsRoomHost(true))
            console.log("create");
            
        }
        setIsOpen(!isOpen);
    };

    return (
        <>
            <p onClick={()=>toggleModal('video')} className="block px-4 py-2 text-gray-800 hover:bg-gray-300 text-sm">
                Create a Video Meeting
            </p>

            <div
                id="small-modal"
                className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}
            >
                <div className="relative w-full max-w-md">
                    <div className="bg-secondary rounded-lg shadow ">
                        <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white"></h3>
                            <button onClick={()=>toggleModal('close')}
                                type="button"
                                name='close'
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="small-modal"
                            >
                                <svg 
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    ></path>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                               create instant meeting now?
                            </p>
                            
                        </div>
                        <div className="flex items-center p-6 space-x-2  border-gray-200 rounded-b dark:border-gray-600">
                            <button onClick={()=>toggleModal('create')}
                                name='create'
                                data-modal-hide="small-modal"
                                type="button"
                                className="text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none hover:text-black hover:border font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                            >
                                create
                            </button>
                            <button onClick={()=>toggleModal('cancel')}
                               name='cancel'
                                data-modal-hide="small-modal"
                                type="button"
                                className="text-black bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5   dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                            >
                                not now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MeetPopup;
