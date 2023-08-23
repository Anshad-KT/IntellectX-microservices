"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Navbar from '@/components/PrimaryNavbar/Navbar'
import SideBar from '@/components/threads/sidebar/SideBar'
import TextBubble from '@/components/ChatBubble/Text/TextBubble'
import TextBubbleClient from '@/components/ChatBubble/Text/TextBubbleClient'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/GlobalRedux/store'
import auth from '@/api/axios'
import { useParams } from 'next/navigation'
import Cookies from 'js-cookie';
import ScrollableFeed from 'react-scrollable-feed'
import io, { Socket } from 'socket.io-client'
import https from 'https';
import ImageBubble from '@/components/ChatBubble/imageBubble/ImageBubble'
import VideoBubble from '@/components/ChatBubble/videoBubble/videoBubble'
import DocumentBubble from '@/components/ChatBubble/DocumentBubble/DocumentBubble'
import FileUpload from '@/components/FileUpload/FileUpload'
import AWS from 'aws-sdk';


// const socketManager: Socket = io('https://cybrosis.intellectx.com', {
//   agent: new https.Agent({ rejectUnauthorized: false }),
// });
const Page = () => {
    const { value } = useSelector((state: RootState) => state.id)
    const chatContainerRef = useRef(null);
    const { id } = useParams()
    const [message, setMessage] = useState<string>()
    const [displayChat, setDisplayChat] = useState<any>()
    const socket = io("http://brototype.intellectx.com");
    const channel: any = useSelector((state: RootState) => state.channel)
    const currentChannel: any = useSelector((state: RootState) => state.currentChannel)



    const fetchMessages = useCallback(async () => {
        try {


            const chats = await auth.get(`/api/communication/chat/getchat/${id}`)
         
            socket.emit("join chat", id);
            return chats?.data


        } catch (error) {
            console.log(error);

        }
    }, [id])
    useEffect(() => {
        async function hello() {
            const msgs = await fetchMessages();
            setDisplayChat(msgs);
      
        }
        hello();
        socket.emit("setup", id)

    }, [])
    const handleKeyDown = useCallback(async (e: any) => {
        if (e.key === "Enter" && message) {
            try {
                const msgData = { from: value, fileType: "text", content: e.target.value, threadName: id }
                console.log(msgData)
                const { data } = await auth.post("/api/communication/chat/addchat", msgData)
                // const hello = await fetchMessages()
                // console.log(data, "hokko" ,hello);
             
                

                setMessage('')
                if (chatContainerRef.current) {
                    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
                }
                socket.emit("new message", {...data,id})
            } catch (error) {
                console.log(error);
            }
        }
    }, [message, value, id, fetchMessages]);

    useEffect(() => {


    }, [handleKeyDown]);

    useEffect(() => {
        socket.on("message received", (newMessageRecieved) => {
          
setDisplayChat((prevChat: any) => ({
                    ...prevChat,
                    chat: [...prevChat.chat, newMessageRecieved]
                }));
        })
    })



    const typingHandler = (e: any) => {
        setMessage(e.target.value)

    }
    const fileInputRef: any = useRef(null);

    const handleSvgClick = () => {
        fileInputRef.current.click();
    };
    const uploadVideoToS3 = async (file: File) => {
        const s3 = new AWS.S3({
            accessKeyId: "AKIAQWJPN76GYOSDY3EB",
            secretAccessKey: "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",
        });


        const params = {
            Bucket: "intellectx",
            Key: `videos/${file.name}`,
            Body: file,
            ContentType: file.type,
        };

        try {


            const response = await s3.upload(params).promise();
            console.log('File uploaded:', response?.Location);
            return response?.Location
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
    const handleFileChange = async (event: any) => {
        const selectedFile = event.target.files[0];
        // Do something with the selected file
    
        const fileName = selectedFile.name;
    
        // Get the file extension
        const fileExtension = fileName.split('.').pop();
        // const data1 ={ from: value, fileType: fileExtension, content: "uploading", threadName: id }
        // setDisplayChat(displayChat?.chat?.push(data1))
        const response = await uploadVideoToS3(selectedFile)




        // Do something with the selected file and its extension
        console.log('Selected file:', selectedFile);
        console.log('File extension:', fileExtension);
        const msgData = { from: value, fileType: fileExtension, content: response, threadName: id }
    
        const { data } = await auth.post("/api/communication/chat/addchat", msgData)
        // const hello = await fetchMessages()
        // console.log(hello, "hokko");
        // setDisplayChat(hello)

        
        socket.emit("new message", {...data,id})

    };


    return (
        <main className='font-default max-h-screen'>
            <Navbar />
            <div className='grid grid-cols-12'>
                {/* sidebar div */}
                <SideBar />
                {/* content div */}
                <div className='lg:w-full lg:h-full   bg-secondary lg:col-span-10 col-span-12'>
                    <div className="h-1/6 bg-secondary flex justify-center items-end">
                        <div className='w-2/3 bg-secondary h-2/4 lg:flex relative'>
                            <div className='lg:flex-col justify-start items-center ml-2 bg-secondary lg:w-2/4 w-3/4 block'>
                                <h1 className='text-4xl'>{displayChat?.threadName}</h1>
                                <p className='mb-5'>{channel?.value[0]?.previlagedUsers.length} participants</p>
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
                    <div className="lg:h-4/6 h-full bg-secondary flex justify-center mt-32 lg:mt-2 lg:flex lg:justify-center">

                        <div className='w-4/6 bg-white mt-3  relative'>
                            {/* Chat bubbles */}
                            <div className='flex-grow:1 h-full'>
                                <ScrollableFeed>
                                    <div ref={chatContainerRef}>
                                        {displayChat ? (


                                            displayChat?.chat?.map((item: any) => {
                                               

                                                if (item.fileType === 'text') {
                                                    return (
                                                        <TextBubble
                                                            key={item._id}
                                                            isClient={false}
                                                            from={item.from.username}
                                                            content={item.content}
                                                            time={item.createdAt}
                                                        />
                                                    );
                                                } else if (item.fileType === 'webm' || item.fileType === 'jpg' || item.fileType === 'svg' || item.fileType === 'png' || item.fileType === 'jpeg') {
                                                    return (
                                                        <ImageBubble
                                                            key={item._id}
                                                            isClient={false}
                                                            from={item.from.username}
                                                            time={item.createdAt}
                                                        />
                                                    );
                                                } else if (item.fileType === 'mp4' || item.fileType === 'hvm' || item.fileType === 'mlv') {
                                                    return (
                                                        <VideoBubble
                                                            key={item._id}
                                                            isClient={false}
                                                            from={item.from.username}
                                                            time={item.createdAt}
                                                        />
                                                    );
                                                } else {
                                                    return (
                                                        <DocumentBubble
                                                            key={item._id}
                                                            from={item.from.username}
                                                            content={item.content}
                                                            time={item.createdAt}
                                                        // Change 'fileName' to the actual field name
                                                        />
                                                    );
                                                }
                                            })
                                        ) : (
                                            "no chat"
                                        )}
                                    </div>

                                </ScrollableFeed>
                            </div>


                            {/* Input box for chat */}
                            <div className='sticky bottom-0 left-0 p-4 bg-white border-t shadow flex'>
                                <input
                                    type='text'
                                    value={message}
                                    placeholder='Type your message...'
                                    className='shadow flex-grow bg-secondary border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring ring-[#2e4057] ring-opacity-25 transition-colors duration-300'
                                    onKeyDown={handleKeyDown}
                                    onChange={typingHandler}
                                />
                                <div className='ml-3 p-2 rounded-md bg-primary text-white hover:bg-primary-dark transition-colors duration-300'>
                                    <svg onClick={handleSvgClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                    </svg>

                                    <input
                                        type='file'
                                        accept='image/*' // Modify this to specify the allowed file types
                                        style={{ display: 'none' }}
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                    />

                                </div>
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

        </main >
    )

}

export default Page

