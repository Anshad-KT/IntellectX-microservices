"use client"
import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from '@/components/PrimaryNavbar/Navbar';
import SideBar from '@/components/threads/sidebar/SideBar';

const page = () => {
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
                                <h1 className='text-4xl'>Product Discussion</h1>
                                <p className='my-5'>Public - closed threads are hidden</p>
                            </div>
                            <div className='block pl-2 lg:flex h-full items-center justify-end mr-16 mb-auto bg-secondary  w-2/4 relative cursor-pointer'>
                                <div className='bg-primary w-40 h-10 flex items-center justify-center rounded-md text-sm text-secondary'>New thread</div>
                                <div className='w-10 h-10 flex items-center justify-center lg:ml-4 rounded-md text-sm text-secondary'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" >
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                                </div>
                                {/* <p>Public - closed threads are hidden</p> */}
                            </div>

                        </div>
                    </div>
                    <div className="lg:h-5/6 bg-secondary flex justify-center mt-32 lg:mt-2 lg:flex lg:justify-center">

                        <div className='w-4/6 h-full mt-16'>
                            <h6 className='text-sm'>Latest</h6>
                            {/* threads */}
                            <div className='w-full my-2 h-24 hover:bg-primaryhover hover:text-white shadow bg-sidebar rounded-md mt-2 flex items-center pl-3 cursor-pointer'>
                                <svg className='w-14 h-12 my-4' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <div className='flex-col'>
                                    <h4>Finance discussion</h4>
                                    <div className="flex">
                                        <h6 className='text-sm'>Me:  new finance issues</h6>
                                    </div>

                                </div>
                                <div className="ml-auto mr-3 text-sm">
                                    <p>5 min</p>
                                </div>
                            </div>
                            <div className='w-full my-2 h-24 hover:bg-primaryhover hover:text-white bg-sidebar shadow  rounded-md mt-2 flex items-center pl-3 cursor-pointer'>
                                <svg className='w-14 h-12 my-4' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <div className='flex-col'>
                                    <h4>Finance discussion</h4>
                                    <div className="flex">
                                        <h6 className='text-sm'>Me:  new finance issues</h6>
                                    </div>

                                </div>
                                <div className="ml-auto mr-3 text-sm">
                                    <p>5 min</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </main>
    )
}

export default page