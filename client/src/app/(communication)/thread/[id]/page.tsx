"use client"
import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image';
import Navbar from '@/components/PrimaryNavbar/Navbar';
import SideBar from '@/components/threads/sidebar/SideBar';
import useSWR from 'swr';
import auth from '@/services/axios';
import { useDispatch, useSelector } from 'react-redux';
import { addChannel } from '@/app/GlobalRedux/Features/channel/channelSlice';
import { toast, ToastContainer } from "react-toastify";

import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';
import PopupButton from '@/components/threads/popup/PopupButton';
import { addEmployee } from '@/app/GlobalRedux/Features/employee/employeeSlice';
import { RootState } from '@/app/GlobalRedux/store';
import Link from 'next/link';
import { currentThread } from '@/app/GlobalRedux/Features/currentThread/currentThreadSlice';
import { io } from 'socket.io-client';

const Page = () => {
    const socket = io("http://www.intellectx.cloud");
    const [notification, setNotification] = useState<boolean>(false)
    useEffect(() => {

    }, [])
    const [demos, setDemos] = useState<any>()
    const { id } = useParams();
    const dispatch = useDispatch()
    useEffect(() => {
        socket.on("message received", (newMessageRecieved) => {

            console.log("message received", newMessageRecieved);

            setDemos((prevChat: any) => ({
                ...prevChat,
                threads: prevChat.threads.map((threadItem: any) => {
                    // Check if the current thread item has the message with matching 'id'
                    if (threadItem.id === newMessageRecieved.id) {
                        // Create a new object with updated 'chat.content' property
                        const updatedChat = {
                            ...threadItem.chat,
                            content: newMessageRecieved.content,
                            status: true
                        };

                        // Update the 'chat' property of the matching item
                        threadItem.chat = updatedChat;
                        console.log(threadItem);
                        newMessage(threadItem?.chat?.from?.username, threadItem.chat?.content)
                        console.log("done");

                        return threadItem;
                    } else {
                        return threadItem;
                    }
                }),
            }));



        })
    })
    const fetchData = async (url: string) => {
        const response = await auth.get(url);
        dispatch(addChannel(response.data));
        return response.data
    };

    const fetchEmployee = async (url: string) => {
        const response = await auth.get(url);
        dispatch(addEmployee(response.data));
        return response.data
    };
    const newMessage = (user: string, content: string) => {
        console.log("toast here");

        toast.success(`${user}: ${content}`, {
            position: "top-right",
            autoClose: 3000,
        });
    }
    const [isPopupActive, setIsPopupActive] = useState<boolean>(false);

    const togglePopup = () => {
        setIsPopupActive(!isPopupActive); // Toggle the state from true to false or vice versa
    };
    const { value } = useSelector((state: RootState) => state.channel)
    const foundItem: any = value?.find((item: any) => item.id === id);

    useEffect(() => {
        setDemos(foundItem)
    }, [])
    const fetchMessages = useCallback(async () => {
        try {
            const hello = await Promise.all(
                foundItem?.threads?.map(async (item: any, index: number) => {
                    const chats = await auth.get(`/api/communication/chat/getchat/${item.id}`);
                    const chat = chats?.data?.chat;
                    console.log(chat[chat?.length - 1]);

                    // Create a new object with the updated 'chat' property
                    const updatedItem = { ...item, chat: chat[chat?.length - 1] };
                    console.log(item);

                    return updatedItem;
                })
            );
            const updatedFoundItem = { ...foundItem };
            // Update 'foundItem.threads' with the fetched chat data
            updatedFoundItem.threads = hello;

            // Set the state with the updated 'foundItem.threads'
            setDemos(updatedFoundItem); // Assuming 'setDemos' expects 'foundItem' as its argument


            console.log(hello);
        } catch (error) {
            console.log(error);
        }
    }, [foundItem, setDemos]);

    console.log(foundItem);
    useEffect(() => {
        fetchMessages()
    }, [fetchMessages])
    useEffect(() => {
        if (demos?.threads) {
            demos?.threads?.map((item: any, index: number) => {
                console.log("joined ", item.id);

                socket.emit("join chat", item.id);
            })
        } else {
            console.log("nah");

        }


    }, [demos?.threads, socket])

    const { data, error } = useSWR(`/api/communication/getchannel`, fetchData);
    const { data: employeeData, error: employeeError } = useSWR('/api/company/getemployee', fetchEmployee);
    const [superUser, setSuperUser] = useState<any>({});

    useEffect(() => {
        // Perform localStorage action

        const storedSuperUser = JSON.parse(localStorage.getItem("superUser") || "{}");
console.log(storedSuperUser);

        
        setSuperUser(storedSuperUser)


    }, []);

console.log(superUser);








    return (
        <main className={`font-default ${isPopupActive ? 'blurred' : 'normal'}`}>
            <Navbar />
            <ToastContainer />
            <div className='grid grid-cols-12'>
                {/* sidebar div */}

                {superUser?.user ? (
                    <SideBar isOpen={isPopupActive} isSuperUser={true} />
                ) : (
                    <SideBar isOpen={false} isSuperUser={false} />
                )}


                {/* content div */}
                <div className='lg:w-full lg:h-screenc lg:pt-5  bg-secondary lg:col-span-10 col-span-12'>
                    <div className="h-1/6 bg-secondary flex justify-center items-end">
                        <div className='w-2/3 h-2/4 lg:flex relative'>
                            <div className='lg:flex-col justify-start items-center ml-2 bg-secondary lg:w-2/4 w-3/4 block'>
                                {foundItem?.threads.length === 0 ? (<div>
                                    <h1 className='text-4xl'>No threads!</h1>
                                    <p className='my-5'>please create one</p>
                                </div>
                                ) : (<div>
                                    <h1 className='text-4xl'>{foundItem?.channelName}</h1>
                                    <p className='my-5'>Public - closed threads are hidden</p>
                                </div>
                                )
                                }

                            </div>

                            <div className='block pl-2 lg:flex h-full items-center justify-end mr-16 mb-auto bg-secondary  w-2/4 relative cursor-pointer'>

                                {superUser?.user ? <PopupButton /> : ""}
                                <div className='bg-slate-400 ml-2 w-14 border-primary h-10 flex items-center justify-center rounded-md text-sm text-secondary hover:text-orange-500'>save</div>


                                <div className='w-10 h-10 flex items-center justify-center lg:ml-4 rounded-md text-sm text-secondary'>
                                    <svg className='w-4 h-4 ml-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </div>

                            </div>



                        </div>
                    </div>
                    <div className="lg:h-5/6 bg-secondary flex justify-center mt-32 lg:mt-2 lg:flex lg:justify-center">


                        {foundItem?.threads.length === 0 ? (
                            <div className='w-4/6 h-full'>
                                <div className='ml-24 mb-14'>
                                    {/* Content for the "default" case */}
                                    <Image className=''
                                        src="/no-thread/smployee.png"
                                        width={600}
                                        height={600}
                                        alt="Picture of the author"
                                    />
                                </div>
                            </div>

                        ) : (
                            <div className='w-4/6 h-full mt-16'>
                                <div>
                                    <h6 className='text-sm'>Latest</h6>
                                    {/* threads */}

                                    {demos?.threads
                                        ?.slice()
                                        .sort((a:any, b:any) => (b.chat.status ? 1 : -1))
                                        .map((item: any, index: number) => {
                                            return (
                                                <Link key={item.id} href={`/chat/${item.id}`}>
                                                    <div className='w-full my-2 h-24 hover:bg-primaryhover hover:text-white shadow bg-sidebar rounded-md mt-2 flex items-center pl-3 cursor-pointer'>
                                                        <svg className='w-14 h-12 my-4' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        <div className='flex-col'>
                                                            <h4>{item.threadName}</h4>
                                                            <div className="flex">
                                                                <h6 className='text-sm'>
                                                                    {item?.chat?.from?.username}: {item?.chat?.content}
                                                                </h6>
                                                            </div>
                                                        </div>
                                                        {item?.chat?.status && (
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth="1.5"
                                                                stroke="currentColor"
                                                                className="w-6 h-6"
                                                            >

                                                            </svg>
                                                        )}
                                                        <div className="ml-auto mr-3 text-sm">
                                                            <p>5 min</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })}



                                </div>
                            </div>
                        )}




                    </div>
                </div>
            </div>
        </main >
    )
}

export default Page