import React from 'react'
import Image from 'next/image'
const navbar = () => {
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
             <div className='w-1/6 h-12  flex justify-center items-center shadow hover:text-orange-600 cursor-pointer'>
                <h6>hiring</h6>
                <svg className='w-3 h-3 ml-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
             </div>
             <div className='w-1/6 h-12  flex justify-center items-center shadow hover:text-orange-600 cursor-pointer'>
               <h6>employee</h6> 
               <svg className='w-3 h-3 ml-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
             </div>
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
             </div>
                </div>
                <div className="w-2/5 flex text-white items-center justify-end mr-3">

                        <div className='flex ml-auto justify-end '> <svg className='w-9 h-9' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg><p className='font-semibold'>wisebox</p></div>
                        <div className='flex items-center h-12'>
                        <svg className='w-4 h-4 ml-auto text-sm' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                        </div>

                </div>
             
             </div>
  )
}

export default navbar