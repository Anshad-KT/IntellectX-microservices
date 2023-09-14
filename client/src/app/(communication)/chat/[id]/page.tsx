"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Navbar from '@/components/PrimaryNavbar/Navbar'
import SideBar from '@/components/threads/sidebar/SideBar'
import TextBubble from '@/components/ChatBubble/Text/TextBubble'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/GlobalRedux/store'
import auth from '@/services/axios'
import { useParams } from 'next/navigation'
import ScrollableFeed from 'react-scrollable-feed'
import io from 'socket.io-client'
import ImageBubble from '@/components/ChatBubble/imageBubble/ImageBubble'
import VideoBubble from '@/components/ChatBubble/videoBubble/videoBubble'
import DocumentBubble from '@/components/ChatBubble/DocumentBubble/DocumentBubble'
import AWS from 'aws-sdk';
import OptionsPopup from '@/components/OptionsPopup/OptionsPopup'


// const socketManager: Socket = io('https://cybrosis.intellectx.com', {
//   agent: new https.Agent({ rejectUnauthorized: false }),
// });
const Page = () => {
    const { value } = useSelector((state: RootState) => state.id)
    const chatContainerRef = useRef(null);
    const { id } = useParams()
    const [message, setMessage] = useState<string>()
    const [displayChat, setDisplayChat] = useState<any>()
    const [responseData, setResponseData] = useState<any>(null);
    const socket = io("https://brototype.intellectx.com");
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
                setMessage('')
                console.log(chatContainerRef,chatContainerRef.current);
                
                if (chatContainerRef.current) {
                    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
                }
                console.log("sencee");
                
                socket.emit("new message", { ...data, id })
            } catch (error) {
                console.log(error);
            }
        }
    }, [message, value, id, fetchMessages]);

    useEffect(() => {

    }, [handleKeyDown]);

    useEffect(() => {
        socket.on("message received", (newMessageRecieved) => {
console.log("message recieved");

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

    const handleResponseData = async (datas: any) => {
        const meetLink = `https://brototype.intellectx.com/conference/${datas}`
        const msgData = { from: value, fileType: "videocall", content: meetLink, threadName: id }
        console.log(msgData)
        const { data } = await auth.post("/api/communication/chat/addchat", msgData)
        setMessage('')
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
        socket.emit("new message", { ...data, id })
      };

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
    const saveThread = async (event: any) => {
        console.log(displayChat);
        console.log(displayChat.id);
        console.log(value);
        
        
        const { data } = await auth.post('/api/communication/thread/saveThread', { threadId:displayChat.id,id:value })
    }
    const handleFileChange = async (event: any) => {
        const selectedFile = event.target.files[0];
        const fileName = selectedFile.name;
        const fileExtension = fileName.split('.').pop();
        const response = await uploadVideoToS3(selectedFile)
        const msgData = { from: value, fileType: fileExtension, content: response, threadName: id }
        const { data } = await auth.post("/api/communication/chat/addchat", msgData)
        socket.emit("new message", { ...data, id })
    };


    return (
        <main className='font-default max-h-screen'>
            <Navbar />
            <div className='grid grid-cols-12'>
                {/* sidebar div */}
                <SideBar />
                {/* content div */}
                {responseData}
                <div className='lg:w-full lg:h-full   bg-secondary lg:col-span-10 col-span-12'>
                    <div className="h-1/6 bg-secondary flex justify-center items-end">
                        <div className='w-2/3 bg-secondary h-2/4 lg:flex relative'>
                            <div className='lg:flex-col justify-start items-center ml-2 bg-secondary lg:w-2/4 w-3/4 block'>
                                <h1 className='text-4xl'>{displayChat?.threadName}</h1>
                                <p className='mb-5'>{channel?.value[0]?.previlagedUsers.length} participants</p>
                            </div>
                            <div className='block pl-2 lg:flex h-full items-center justify-end mr-16 mb-auto bg-secondary  w-2/4 relative cursor-pointer'>
                                <OptionsPopup onResponseData={handleResponseData} />
                                
                                
                                        <div onClick={saveThread} className='bg-slate-400 ml-2 w-14 border-primary h-10 flex items-center justify-center rounded-md text-sm text-secondary hover:text-orange-500'>save</div>
                                    
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

                                                console.log(item.content);
                                                
                                                if (item.fileType === 'videocall') {
                                                    return (
                                                        <TextBubble
                                                            key={item._id}
                                                            isClient={false}
                                                            from={item.from.username}
                                                            content={item.content}
                                                            time={item.createdAt}
                                                        />
                                                    );
                                                }
                                                else if (item.fileType === 'text') {
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
                                                            content={item.content}
                                                            key={item._id}
                                                            isClient={false}
                                                            from={item.from.username}
                                                            time={item.createdAt}
                                                        />
                                                    );
                                                } else if (item.fileType === 'mp4' || item.fileType === 'hvm' || item.fileType === 'mlv') {
                                                    return (
                                                        <VideoBubble
                                                            content={item.content}
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
                                        <path strokeLinecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
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

