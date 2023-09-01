"use client"
import auth from '@/services/axios';
import { addChannel } from '@/app/GlobalRedux/Features/channel/channelSlice';
import { RootState } from '@/app/GlobalRedux/store';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group'
import useSWR, { mutate } from 'swr';
import Image from "next/image"
import Select from 'react-select';


const PopupBox = ({ onClose }: any) => {
  const dispatch = useDispatch()
  const { value } = useSelector((state: RootState) => state.channel)
  const h = useSelector((state: RootState) => state.currentChannel)
  const [threadName, setThreadName] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selectedItems: any) => {
    setSelectedOptions(selectedItems);
  };
  const [selectedChannelId, setSelectedChannelId] = useState<string[]>(['']);
  const matchingChannel = value.find((channel: any) => {

   console.log(channel.channelName, "----------",h.value );
   

    return channel?.channelName === h.value;
  });
  const handleThreadNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThreadName(e.target.value);
  };

  const handleChannelIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

    const selectedOptions = e.target.selectedOptions;
    const selectedIds = Array.from(selectedOptions).map(option => option.value);
    setSelectedChannelId(selectedIds);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setThreadName('');
    setSelectedChannelId(['']);
    const fetchData = async (url: string) => {
      // console.log(value);
      console.log({ threadName, channelName: matchingChannel, previlagedUsers: selectedChannelId },"valueeeeeee");

      console.log(value,"nnottttvalueeeeeee");


      const response = await auth.post(url, { threadName, channelName: matchingChannel, previlagedUsers: selectedChannelId });
      dispatch(addChannel(response.data));

      return response.data
    };
    const hello = await fetchData('/api/communication/thread/addthread')


    onClose()


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
                  <p>Add new thread</p>
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
                    className="w-full border text-black border-gray-300 rounded px-3 py-2"
                    multiple   >

                    {channelData.value.map((item: any, index: number) => {
                      console.log(item); // Log the item

                      return (
                        <option value={item.id} key={index}>
                          {item.userDetails.username}
                        </option>
                      );
                    })}


                  </select>
                  <Select
                    isMulti
                    options={channelData.value}
                    value={selectedOptions}
                    onChange={handleChange}
                    placeholder="Select tags..."
                    closeMenuOnSelect={false}
                    isSearchable
                    isClearable

                  />


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
