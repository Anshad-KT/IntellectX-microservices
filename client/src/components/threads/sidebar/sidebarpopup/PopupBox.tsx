"use client"
import auth from '@/services/axios';
import { addChannel } from '@/app/GlobalRedux/Features/channel/channelSlice';
import { RootState } from '@/app/GlobalRedux/store';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group'
import useSWR, { mutate } from 'swr';
import Image from "next/image"
import InviteLinkGenerator from '@/components/InviteLinkGenerator/InviteLinkGenerator';

const PopupBox = ({ onClose }: any) => {

  const dispatch = useDispatch()
  const router = useRouter()
  const { value } = useSelector((state: RootState) => state.channel)
  const [error, setError] = useState<string>()
  const id = useSelector((state: RootState) => state.id)

  const [ChatName, setChatName] = useState('');
 
  const companyName:string = useSelector((state: RootState) => state.company.name)

  // useEffect(()=>{

  // },[])  

  return (
    <div className="absolute  z-50 inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg p-8">
        <div className='flex justify-start items-center'>
          <svg className='w-9 h-9 ml-4' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
 
        <div className='justify-start ml-2'><p className='font-semibold'>{companyName}</p></div>
        </div>
           <p>invite your team</p>
           <InviteLinkGenerator />
        <button
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>

  );
};

export default PopupBox;
