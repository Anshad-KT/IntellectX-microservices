"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Navbar from '@/components/PrimaryNavbar/Navbar';
import SideBar from '@/components/employee/SideBar/SideBar';
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
                <SideBar />
                {/* content div */}
                <div className='lg:w-full lg:h-screenc lg:pt-5  bg-secondary lg:col-span-10 col-span-12'>
                    <div className="h-1/6 bg-secondary flex justify-center items-end">
                        <div className='w-2/3 bg-secondary h-2/4 lg:flex relative'>
                            <div className='lg:flex-col justify-start items-center ml-2 bg-secondary lg:w-3/4 w-3/4 block'>
                                <div>
                                    <h1 className='text-4xl'>Employee Management</h1>
                                    <p className='my-5'>Public - closed threads are hidden</p>
                                </div>
                                



                            </div>
                        </div>
                        <div  className='w-/3 bg-secondary h-2/4 lg:flex relative'>
                           
                                   <InviteLinkGenerator />
                                
                        </div>
                       





                    </div>

                    <div className="lg:h-5/6 bg-secondary flex justify-center mt-32 lg:mt-2 lg:flex lg:justify-center">


                        <div className='w-4/6 h-full mt-10 bg-slate-400'>
                            <div className='flex'>
                                <div className='w-2/4 flex justify-start'>
                                    <h6 className='text-sm'>employees</h6>
                                </div>

                                
                            </div>



                            {/* threads */}
                            <div>
                                {channelData.value.map((employee: any, index: string) => (

                                    <Link key={employee.id} href={`/employee/${employee.id}`}>
                                        <div className='w-full my-2 h-24 hover:bg-primaryhover hover:text-white shadow bg-sidebar rounded-md mt-2 flex items-center pl-3 cursor-pointer'>
                                            <svg className='w-14 h-12 my-4' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <div className='flex-col'>
                                                <h4>{employee.userDetails.username}</h4>
                                                <div className="flex">
                                                    <h6 className='text-sm'>Me:  new finance issues</h6>
                                                </div>
                                            </div>
                                            {/* <div className="ml-auto mr-3 text-sm">
                                                        <p>5 min</p>
                                                    </div> */}
                                        </div>
                                    </Link>
                                ))}


                            </div>
                        </div>





                    </div>


                </div>
            </div>
        </main >
    )
}

export default Page