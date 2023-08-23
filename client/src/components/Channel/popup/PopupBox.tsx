"use client"
import auth from '@/api/axios';
import { addChannel } from '@/app/GlobalRedux/Features/channel/channelSlice';
import { RootState } from '@/app/GlobalRedux/store';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group'
import useSWR, { mutate } from 'swr';
import Image from "next/image"

const PopupBox = ({ onClose }: any) => {

  const dispatch = useDispatch()
  const router = useRouter()
  const { value } = useSelector((state: RootState) => state.channel)
  const [error, setError] = useState<string>()
  const id = useSelector((state: RootState) => state.id)

  const [ChatName, setChatName] = useState('');
  const [selectedChannelId, setSelectedChannelId] = useState<string[]>(['']);

  const handleChatNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatName(e.target.value);
  };

  const handleChannelIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Use the selectedOptions property to extract the selected values from the multiple select
    const selectedOptions = e.target.selectedOptions;
    const selectedIds = Array.from(selectedOptions).map(option => option.value);
    setSelectedChannelId(selectedIds);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Perform the action to add the new thread using ChatName and selectedChannelId
    // Reset form values after submission

    setChatName('');
    setSelectedChannelId(['']);
    const fetchData = async () => {
      const data = { creator: id.value, channelName: ChatName, superUsers: [id.value], previlagedUsers: [id.value], threads: [] }


      try {
        const responce = await auth
          .post('/api/communication/addchannel', data)
          mutate('/api/communication/getchannel');
        //  dispatch(addChannel(responce.data));
        return responce
      } catch (error) {
        setError("something went wrong")
      }

      onClose()
    };
    fetchData()



  };
  const channelData: any = useSelector((state: RootState) => state.employee)
 

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
                  <label htmlFor="ChatName" className="block font-medium mb-1">Thread Name</label>
                  <input
                    type="text"
                    id="ChatName"
                    value={ChatName}
                    onChange={handleChatNameChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div className="mt-4">
                  <label htmlFor="channelId" className="block font-medium mb-1">Select Channel</label>
                  <select
                    id="channelId"
                    value={selectedChannelId}
                    onChange={handleChannelIdChange}
                    className="w-full border  rounded px-3 py-2"
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
                    Add channel
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
