"use client"
import PopupButton from '@/components/Popup/PopupButton'
import React from 'react'

const SideBar = () => {
  return (
    <div className='lg:w-full lg:h-screen lg:bg-sidebar lg:col-span-2 lg:text-sm hidden lg:block'>

                    <div className='flex items-center justify-start w-full h-12'>
                        <svg className='w-9 h-9 ml-4' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>

                        <div className='justify-start ml-2'><p className='font-semibold'>wisebox</p></div>
 <PopupButton />


                        <div className='ml-auto mr-2'>
                            <svg className='w-4 h-4 ml-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                            </svg>

                        </div>

                    </div>
                    <div className='flex-col items-center justify-evenly p-5 text-sm'>
                        <div className='flex mb-2 border'>
                            <svg className='w-4 h-4 mt-1 mr-1' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                            </svg>


                            <p className='mt-1'>Announements</p>

                        </div>
                        <div className='flex mb-2 border'>
                            <svg className='w-4 h-4 mt-1 mr-1' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
                            </svg>

                            <p className='mt-1'>Tasks</p>
                        </div>
                        <div className='flex mb-2 border'>
                            <svg className='w-4 h-4 mt-1 mr-1' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                            </svg>


                            <p className='mt-1'>Messages</p>
                        </div>
                        <div className='flex mb-2 border'>
                            <svg className='w-4 h-4 mt-1 mr-1' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                            </svg>


                            <p className='mt-1'>Saved</p>
                        </div>
                    </div>
                    <div className='ml-5 font-extralight bold'>Channels</div>
                    <div className='flex-col items-center justify-evenly p-5'>
                        <div className='flex mb-2'>
                            <h3>#</h3>
                            <p className='ml-2'>Announements</p>

                        </div>
                        <div className='flex mb-2'>
                            <h3>#</h3>
                            <p className='ml-2'>Tasks</p>
                        </div>
                        <div className='flex mb-2'>
                            <h3>#</h3>
                            <p className='ml-2'>Messages</p>
                        </div>
                        <div className='flex mb-2'>
                            <h3>#</h3>
                            <p className='ml-2'>Saved</p>
                        </div>
                    </div>
                    <div className='ml-5'>+ New Channel</div>
                    <div className='ml-5'>+<span className='ml-1'>Inivite your team </span></div>
                </div>
  )
}

export default SideBar