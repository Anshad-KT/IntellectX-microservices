"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Navbar from '@/components/PrimaryNavbar/Navbar';
import SideBar from '@/components/threads/sidebar/SideBar';
import Link from 'next/link';
import employeeSlice from '@/app/GlobalRedux/Features/employee/employeeSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import InviteLinkGenerator from '@/components/InviteLinkGenerator/InviteLinkGenerator';
import useSWR from 'swr';
import auth from '@/services/axios';

const Page = () => {

   
    const channelData: any = useSelector((state: RootState) => state.employee)
    // const { data  } = useSWR(``, fetchData);
    return (
        <main className='font-default'>
            <Navbar />
            <div className='grid grid-cols-12'>
                {/* sidebar div */}
                <SideBar isOpen={true} isSuperUser={true} />
                {/* content div */}
                <div className='lg:w-full lg:h-screenc lg:pt-5  bg-secondary lg:col-span-10 col-span-12'>
                    <div className="h-1/6 bg-secondary flex justify-center items-end">
                        <div className='w-2/3 bg-secondary h-2/4 lg:flex relative'>
                            <div className='lg:flex-col justify-start items-center ml-2 bg-secondary lg:w-3/4 w-3/4 block z-0'>
                                <div>
                                    <h1 className='text-4xl'>Employee Management</h1>
                                    <p className='my-5'>Public - closed threads are hidden</p>
                                </div>
                                



                            </div>
                        </div>
                        <div  className='w-/3  h-2/4 lg:flex relative'>
                           
                                   <InviteLinkGenerator />
                                
                        </div>
                       





                    </div>

                    <div className="lg:h-5/6 bg-secondary flex justify-center mt-32 lg:mt-2 lg:flex lg:justify-center">


                      





                    </div>


                </div>
            </div>
        </main >
    )
}

export default Page