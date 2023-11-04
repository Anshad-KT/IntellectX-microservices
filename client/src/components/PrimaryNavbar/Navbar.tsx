"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
const Navbar = () => {
  const router = useRouter()
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("superUser")
   
    
    router.push('/login')
  }
  return (
    <div className='w-full h-14 bg-primary flex'>
              <div className='w-3/5 h-14  flex justify-evenly items-center text-white text-sm'>
                <div className='w-1/6 h-12  flex pt-8 justify-center items-center shadow'>
                <Image
              src="/logo/nexuscomplete.png"
              width={800}
              height={800}
              alt="Picture of the author"
              />
             </div>
             <div className='w-1/6 h-12  flex justify-center items-center shadow hover:text-orange-600 cursor-pointer '>
                <h6>communication</h6>
                <svg className='w-3 h-3 ml-2 ' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
             </div>
{/* 
             <Link href={'/employee'}><div className='w-1/6 h-12  flex justify-center items-center shadow hover:text-orange-600 cursor-pointer'>
               <h6>employee</h6> 
               <svg className='w-3 h-3 ml-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
             </div></Link>
             <div className='w-1/6 h-12  flex justify-center items-center shadow hover:text-orange-600 cursor-pointer'>
               <h6>attendance</h6> 
               <svg className='w-3 h-3 ml-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
             </div>
             <div className='w-1/6 h-12 flex justify-center items-center shadow hover:text-orange-600 cursor-pointer'>
              <h6>resource</h6>
              <svg className='w-3 h-3 ml-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
             </div> */}
                </div>
                <div className="w-2/5 flex text-white items-center justify-end mr-3">

                        <div onClick={handleLogout} className='flex ml-auto justify-end '> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
</svg>
<p className='font-semibold'>Logout</p></div>
                        <div className='flex items-center h-12'>
                        <svg className='w-4 h-4 ml-auto text-sm' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                        </div>

                </div>
             
             </div>
  )
}

export default Navbar