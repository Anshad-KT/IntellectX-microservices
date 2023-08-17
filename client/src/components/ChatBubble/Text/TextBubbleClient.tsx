import React from 'react'

const TextBubble = () => {
    return (
        <div className='max-w-2xl bg-sidebar rounded-md mt-2 flex pl-3 pr-5 py-1 cursor-pointer'>
            
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