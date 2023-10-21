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
                <SideBar isOpen={true} isSuperUser={true} /> 
                {/* content div */}
                <div className=' w-full h-full lg:col-span-10 '>
                    <div className='flex-col mt-5 bg-red-300 w-full p-3 h-1/3'>
                       <div>
                        <h3>Attendance</h3>
                       </div>
                       <div className='flex-col mt-5 bg-blue-300 w-full p-3 h-3/4'>
                       </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default page