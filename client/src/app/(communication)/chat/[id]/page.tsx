"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '@/components/PrimaryNavbar/Navbar'
import SideBar from '@/components/threads/sidebar/SideBar'
import TextBubble from '@/components/ChatBubble/Text/TextBubble'
import TextBubbleClient from '@/components/ChatBubble/Text/TextBubbleClient'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/GlobalRedux/store'
import auth from '@/api/axios'
import { useParams } from 'next/navigation'

const Page = () => {
    const {value} = useSelector((state:RootState)=>state.id)
    const {id} = useParams()
    const [message,setMessage] = useState<string>()
    useEffect(() => {
        fetchMessages()
    }, [])
    const fetchMessages = async () => {
        try {
           const chats = await auth.get(`/api/communication/chat/getchat/${id}`)
           console.log(chats);
           console.log("chatss");
           
        } catch (error) {
            console.log(error);
            
        }
    }
    const handleKeyDown = async (e:any) => {
        console.log("keydown");
        
        if(e.key=="Enter" && message){
            try {
                const msgData = {from:value,fileType:"text",content:e.target.value,threadName:id}
                console.log(msgData);
                
                const {data} = await auth.post("/api/communication/chat/addchat",msgData)
                console.log(data);
            } catch (error) {
                console.log(error);
                
            }
        }
    }
    const typingHandler = (e:any) => {
        setMessage(e.target.value)

    }

    return (
        <main className='font-default min-h-screen'>
            <Navbar />
            <div className='grid grid-cols-12'>
                {/* sidebar div */}
                <SideBar />
                {/* content div */}
                <div className='lg:w-full lg:h-screen lg:pt-5  bg-secondary lg:col-span-10 col-span-12'>
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
                    <div className="lg:h-5/6 max-h-screen bg-secondary flex justify-center mt-32 lg:mt-2 lg:flex lg:justify-center">

                        <div className='w-4/6 bg-white h-full mt-3 overflow-y-scroll relative'>
                            {/* Chat bubbles */}
                            <div className='flex-grow'>
                                <TextBubble isClient={false} />
                                <TextBubble isClient={false} />
                                <TextBubble isClient={false} />
                                <TextBubble isClient={true} />
                                <TextBubble isClient={true} />
                                <TextBubble isClient={false} />
                            </div>

                            {/* Input box for chat */}
                            <div className='sticky bottom-0 left-0 p-4 bg-white border-t shadow flex'>
                                <input
                                    type='text'
                                    placeholder='Type your message...'
                                    className='shadow flex-grow bg-secondary border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring ring-[#2e4057] ring-opacity-25 transition-colors duration-300'
                                    onKeyDown={handleKeyDown}
                                    onChange={typingHandler}
                                />
                                <button className='ml-2 p-2 rounded-md bg-primary text-white hover:bg-primary-dark transition-colors duration-300'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                    </svg>

                                </button>
                            </div>



                        </div>





                    </div>
                </div>
            </div>
        </main>
    )
}

export default Page

