import React from 'react'
import Image from 'next/image'
import Navbar from '@/components/SecondaryNavbar/Navbar'

const Page = () => {
    return (
        <main>
            <Navbar />

            <div className="grid lg:grid-cols-2  lg:place-items-center h-screen">
                <div className='lg:ml-7 w-2/4 flex items-center flex-col justify-around mb-48 sm:w-full p-5'>
                    <div className='lg:my-2 lg:p-5 lg:w-3/4 lg:h-3/4 lg:ml-36 mt-100p-3'>
                        <h2 className='text-4xl'>Check your Email</h2>
                        <div className="lg:mt-10 mt-5">
                            <div className='flex w-full font-light text-sm mb-10'>
                                <p >by continuing with google or email, you agree to <br /> IntellectX terms of service and Privacy policy</p>
                            </div>
                            <input type='text' className='text-center my-5 border w-96 h-12 text-primary border-gray-300 rounded-md  hover:bg-gray-100 cursor-pointer ' />
                            <button className='text-center border w-96 h-12 bg-gray-100 border-gray-100 rounded-md hover:text-gray-100 hover:bg-blue-950 cursor-pointer hover:border-gray-100'>Submit</button>
                        </div>
                    </div>
                    <div className='flex w-full font-light text-sm mb-10 justify-center'>
                        <p className=''>by continuing with google or email, you agree to <br /> IntellectX terms of service and Privacy policy</p>
                    </div>
                </div>
                <div className='hidden lg:w-3/4 lg:flex lg:items-center lg:justify-center lg:mb-32'>
                    <div>
                        <Image className=''
                            src="/landing-images/landin.jpg"
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