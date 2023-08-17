"use client"
import auth from '@/api/axios';
import { addChannel } from '@/app/GlobalRedux/Features/channel/channelSlice';
import { RootState } from '@/app/GlobalRedux/store';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group'
import useSWR, { mutate } from 'swr';

const PopupBox = ({ onClose }: any) => {
  const dispatch = useDispatch()
  const { value } = useSelector((state: RootState) => state.channel)
  const [threadName, setThreadName] = useState('');
  const [selectedChannelId, setSelectedChannelId] = useState<string[]>(['']);

  const handleThreadNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThreadName(e.target.value);
  };

  const handleChannelIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Use the selectedOptions property to extract the selected values from the multiple select
    const selectedOptions = e.target.selectedOptions;
    const selectedIds = Array.from(selectedOptions).map(option => option.value);
    setSelectedChannelId(selectedIds);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Perform the action to add the new thread using threadName and selectedChannelId
    // Reset form values after submission

    setThreadName('');
    setSelectedChannelId(['']);
    const fetchData = async (url: string) => {
      const response = await auth.post(url,{threadName,channelName:value,previlagedUsers:selectedChannelId});
      dispatch(addChannel(response.data));
      console.log(response.data, "ucl");
      return response.data
    };
   const hello = await fetchData('/api/communication/thread/addthread')
   
   
    onClose()
    console.log("podapatti");
  
  
    console.log(Date.now());
    
  };
  const channelData: any = useSelector((state: RootState) => state.employee)
  if (!channelData) {
    console.log("channelData is undefined");
  } else {
    console.log(channelData, "pop");
  }
  
  // useEffect(()=>{

  // },[])  

  return (
    <CSSTransition in={true} timeout={300} classNames="popup-fade" unmountOnExit>
      <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
        <div className="bg-white rounded-lg p-8">
          <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg p-8">
              <div className='flex justify-start items-center'>
                <div>
                  <p>Add new thread{selectedChannelId}</p>
                </div>
                <div className='justify-start ml-2'>
                  <p className='font-semibold'>wisebox</p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mt-4">
                  <label htmlFor="threadName" className="block font-medium mb-1">Thread Name</label>
                  <input
                    type="text"
                    id="threadName"
                    value={threadName}
                    onChange={handleThreadNameChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div className="mt-4">
                  <label htmlFor="channelId" className="block font-medium mb-1">Select Channel</label>
                  <select
                    id="channelId"
                    value={selectedChannelId}
                    onChange={handleChannelIdChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    multiple   >
                    {channelData.value.map((item: any, index: string) => (
                      <option value={item.id} key={index}>
                        {item.username}
                      </option>
                    ))}

                    {/* Map over your channel data and generate options */}
                    {/* Example: */}
                    {/* {channelData.map((channel) => (
    <option key={channel.id} value={channel.id}>{channel.name}</option>
  ))} */}
                  </select>

                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                  >
                    Add Thread
                  </button>
                  <button
                    className="ml-4 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default PopupBox;
