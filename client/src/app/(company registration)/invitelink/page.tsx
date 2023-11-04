"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Navbar from '@/components/SecondaryNavbar/Navbar'
import auth from '@/services/axios'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/GlobalRedux/store'
import { addCompany, addCompanyName } from '@/app/GlobalRedux/Features/company/companySlice'
import { addChannel } from '@/app/GlobalRedux/Features/channel/channelSlice'
const Page = () => {

    const router = useRouter()
    const dispatch = useDispatch()

    const [invitelink, setInviteLink] = useState<string>()
    const [error, setError] = useState<string>()
    const id = useSelector((state: RootState) => state.id)
    const { value }:any = useSelector((state: RootState) => state.channel)
    const signUpHandler = (event: React.FormEvent) => {
        event.preventDefault();
      console.log(id,"iddddddddddddddddddddddddd");
      
        auth.post('/api/company/verifylink', { id: id.value, link: invitelink })
            .then(response => {
                console.log(response);
                
                if (response.data.msg) {
                    setError('something went wrong')
                } else {
                    console.log(response.data);
                    dispatch(addCompanyName(response.data.companyName as string))
                    dispatch(addCompany(response.data.id));                    
                }
            })
            .catch(err => {
                console.log(err);

            })


        auth.get("/api/communication/getchannel")
            .then((responce) => {
                console.log(responce);
                
                dispatch(addChannel(responce.data));
                router?.push(`/thread/${responce.data[0].id}`);
                return responce.data
            })
            .catch((err) => {
                console.log(err);

            })

    };

return (
    <main>
        <Navbar />

        <div className="grid lg:grid-cols-2  lg:place-items-center h-screen">

            <div className='w-2/4 flex flex-col  mb-48 sm:w-full sm:p-5'>
                <div className='bg-violet-100 w-20 h-14 flex items-center justify-center lg:ml-40 mt-16 rounded-md'>Step 1</div>
                <div className="items-center justify-around">
                    <div className='lg:my-2 lg:p-5 lg:w-3/4 lg:h-3/4 lg:ml-36 mt-10'>
                        <h2 className='text-4xl mb-2'>Paste the invite </h2>
                        <h2 className='text-4xl'>link</h2>
                        <div className="mt-10">


                            <div className='relative text-center my-5 border w-96 h-12 bg-white border-gray-300 rounded-md'><div className='absolute text-sm ml-1'>Link</div><input onChange={(e: any) => setInviteLink(e.target.value)} className='w-full h-full rounded-md' type="text" name="" id="" /></div>

                            <p className='text-red-700 shadow'>{error}</p>
                            <button className='text-center my-5 border w-96 h-12 text-white bg-blue-950 border-gray-300 rounded-md' onClick={signUpHandler}>Continue with email</button>

                            <div className='flex w-full font-light text-sm mb-10'>
                                <p >by continuing with google or email, you agree to <br /> IntellectX terms of service and Privacy policy</p>
                            </div>
                        </div>

                    </div>
                </div>



            </div>


            <div className='hidden lg:w-3/4 lg:flex lg:items-center lg:justify-center lg:mb-32'>
                <div>
                    <Image className=''
                        src="/landing-images/landingf.jpg"
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