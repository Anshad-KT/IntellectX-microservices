import React from 'react'
import Navbar from '@/components/PrimaryNavbar/Navbar'
import SideBar from '@/components/threads/sidebar/SideBar'
import TextBubble from '@/components/ChatBubble/Text/TextBubble'

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
                                <p className='mb-5'>2 participants</p>
                            </div>
                            <div className='block pl-2 lg:flex h-full items-center justify-end mr-16 mb-auto bg-secondary  w-2/4 relative cursor-pointer'>
                                <div className='bg-primary w-40 h-10 flex items-center justify-center rounded-md text-sm text-secondary'>New thread</div>
                                <div className='w-10 h-10 flex items-center justify-center lg:ml-4 rounded-md text-sm text-secondary'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" class="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                                </div>
                                {/* <p>Public - closed threads are hidden</p> */}
                            </div>

                        </div>
                    </div>
                    <div className="lg:h-5/6 h-full bg-secondary flex justify-center mt-32 lg:mt-2 lg:flex lg:justify-center">

                        <div className='w-4/6 bg-white h-full mt-3'>

                            {/* threads */}
                            <TextBubble />
                            <TextBubble />
                            
                        </div>


                    </div>
                </div>
            </div>
        </main>
    )
}

export default page

