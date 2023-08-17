"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Navbar from '@/components/PrimaryNavbar/Navbar';
import SideBar from '@/components/threads/sidebar/SideBar';
import useSWR from 'swr';
import auth from '@/api/axios';
import { useDispatch, useSelector } from 'react-redux';
import { addChannel } from '@/app/GlobalRedux/Features/channel/channelSlice';


import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';
import PopupButton from '@/components/threads/popup/PopupButton';
import { addEmployee } from '@/app/GlobalRedux/Features/employee/employeeSlice';
import { RootState } from '@/app/GlobalRedux/store';
import Link from 'next/link';

const Page = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
  
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

    const { data,  error  } = useSWR(`/api/communication/getchannel`, fetchData);
    const { data: employeeData, error: employeeError } = useSWR('/api/company/getemployee', fetchEmployee);
    const { value } = useSelector((state: RootState) => state.channel)
  
    
    const foundItem:any = value?.find((item:any) => item.id === id);
 
    

   

    return (
        <main className='font-default'>
            <Navbar />
            <div className='grid grid-cols-12'>
                {/* sidebar div */}
                <SideBar />
                {/* content div */}
                <div className='lg:w-full lg:h-screenc lg:pt-5  bg-secondary lg:col-span-10 col-span-12'>
                    <div className="h-1/6 bg-secondary flex justify-center items-end">
                        <div className='w-2/3 bg-secondary h-2/4 lg:flex relative'>
                            <div className='lg:flex-col justify-start items-center ml-2 bg-secondary lg:w-2/4 w-3/4 block'>
                                {foundItem?.threads.length === 0  ? (<div>
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
                            {/* {id === "default" ? (<div>

                            </div>
                            ) : (<> */}
                                <div className='block pl-2 lg:flex h-full items-center justify-end mr-16 mb-auto bg-secondary  w-2/4 relative cursor-pointer'>
                                <PopupButton />
                                    <div className='w-10 h-10 flex items-center justify-center lg:ml-4 rounded-md text-sm text-secondary'>
                                    <svg className='w-4 h-4 ml-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                                    </div>

                                </div>
                            {/* </>
                            )
                            } */}


                        </div>
                    </div>
                    <div className="lg:h-5/6 bg-secondary flex justify-center mt-32 lg:mt-2 lg:flex lg:justify-center">

                        
                            {foundItem?.threads.length === 0  ? (
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
                                    {foundItem?.threads?.map((item:any,index:number)=>{
                                        return(
                                            <Link key={item.id} href={`/chat/${item.id}`}> 
                                            <div className='w-full my-2 h-24 hover:bg-primaryhover hover:text-white shadow bg-sidebar rounded-md mt-2 flex items-center pl-3 cursor-pointer'>
                                            <svg className='w-14 h-12 my-4' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <div className='flex-col'>
                                                <h4>{item.threadName}</h4>
                                                <div className="flex">
                                                    <h6 className='text-sm'>Me:  new finance issues</h6>
                                                </div>
                                            </div>
                                            <div className="ml-auto mr-3 text-sm">
                                                <p>5 min</p>
                                            </div>
                                        </div>
                                        </Link>

                                        )
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