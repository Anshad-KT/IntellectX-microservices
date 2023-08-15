import React from 'react'
import Image from 'next/image'
import Navbar from '@/components/SecondaryNavbar/Navbar'

const Page = () => {
    return (
        <main>
            <Navbar />

            <div className="grid lg:grid-cols-2  lg:place-items-center h-screen">

                <div className='w-2/4 flex flex-col  mb-48 sm:w-full sm:p-5'>
                    <div className='bg-violet-100 w-20 h-14 flex items-center justify-center lg:ml-40 mt-16 rounded-md'>Step 2</div>
                    <div className="items-center justify-around">
                        <div className='lg:my-2 lg:p-5 lg:w-3/4 lg:h-3/4 lg:ml-36 mt-10'>
                            <h2 className='text-4xl '>What project is your </h2>
                            <h2 className='text-4xl'> team currenlty working</h2>
                            <h2 className='text-4xl'>on?</h2>
                            <div className="mt-10">
                                {/* <div className=''><p className="ml-44 bold">OR</p></div> */}
                                <div className='relative text-center my-5 border w-96 h-12 bg-white border-gray-300 rounded-md'><div className='absolute text-sm ml-1'>Channel Name</div><input className='w-full h-full rounded-md' type="text" name="" id="" /></div>
                                <button className='text-center my-5 border w-96 h-12 text-white bg-blue-950 border-gray-300 rounded-md'>Create your Channel</button>
                                <div className='flex w-full font-light text-sm mb-10'>
                                    <p >This will create a new channel in your server,<br /> you can create new channels later</p>
                                </div>
                            </div>

                        </div>
                    </div>



                </div>


                <div className='hidden lg:w-3/4 lg:flex lg:items-center lg:justify-center lg:mb-32'>
                    <div>
                        <Image className=''
                            src="/landing-images/landing-5.jpg"
                            width={800}
                            height={800}
                            alt="Picture of the author"
                        />
                    </div>
                </div>
            </div>



        </main>
    )
}

export default Page