import React from 'react'

const TextBubble = () => {
    return (
        <div className='max-w-2xl bg-sidebar rounded-md mt-2 flex items-start pl-3 pr-5 py-1 cursor-pointer'>
            <div>
                <svg className='w-10 h-8 mr-3 text-primary' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </div>
            <div className='flex flex-col p-4 shadow-lg'>
                <h4 className='text-mini'>~Finance discussion</h4>
                <div className="flex-col items-center">
                    <p className='text-sm'>new finance modi, et unde quos qui, veritatis repudiandae dolor, officiis rem itaque? Praesentium laudantium voluptates quam? Expedita vitae harum suscipit distinctio.</p>
                </div>
                <div className='flex justify-end text-gray-500 text-mini'>10 mins ago</div>
            </div>
        </div>
    )
}

export default TextBubble