"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Navbar from '@/components/SecondaryNavbar/Navbar'
import auth from '@/services/axios';
import { addId } from '@/app/GlobalRedux/Features/id/idSlice';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { GoogleCredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { RootState } from '@/app/GlobalRedux/store';
import useSWR, { mutate } from 'swr';
import { addChannel } from '@/app/GlobalRedux/Features/channel/channelSlice';

  
interface ApiError {
  message: string;
}
interface JwtPayload {
  sub: string;
  name: string;
  exp: number;
  email:string;
}


const Page = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const fetchData = async (url: string,method:string) => {
      if(method == "get"){
const response = await auth.get(url);
      console.log(response);
      
      
      return response.data
      }else{
        const response = await auth.post(url);
        console.log(response);
        
        
        return response.data
      }
      
  };
  
    
    const { value }:any = useSelector((state: RootState) => state.channel)
    const validateForm = () => {
      if (!email || !password) {
        setError('All fields are ruired');
        return false;
      }
      if (!isValidEmail(email)) {
        setError('Invalid emailc address');
        return false;
      }
      setError('');
      return true;
    };
  
    const isValidEmail = (email:string) => {
      // Basic email validation, you can use a library like 'validator' for more robust validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    };
  
    const signUpHandler = (event: { preventDefault: () => void; }) => {
      console.log("////////////////////////");
      
      event.preventDefault();
      if (!validateForm()) {
        return;
      }
      auth
        .post('/api/tenant/user/login', { email, password })
       
        
        .then((response) => {
      
          console.log(response);
          
          if (response.data.msg) {
            console.log(response,"nooppp");
            setError('Something went wrong');
          } else {
            localStorage.setItem("companyName", response.data as string)
           fetchData(`/api/communication/getchannel`,"get").then(async (data)=>{
            console.log(value);
            dispatch(addChannel(data));
            console.log(`/thread/${data[0].id}`);
            dispatch(addId(response.data.addedUser.id));
            console.log(response.data);
            const superUserdetails = await fetchData('api/company/getsuperuser',"post")
            if(!superUserdetails){
              localStorage.setItem(`user`, JSON.stringify({ token:response.data.jwt, user:response.data.addedUser}))
            }else{
              localStorage.setItem(`superUser`, JSON.stringify({ token:response.data.jwt, user:response.data.addedUser}))
            }
            
            router?.push(`/thread/${data[0].id}`);
          })
            
          }
          console.log("sreyas");
          
        })
        .catch((error) => {
          console.log("an error occurede",error);
          
          setError('An error occurred');
        });
    };
    
    return (
        
        <main>
            <Navbar />
            <div className="grid lg:grid-cols-2 lg:mt-3 lg:place-items-center h-screen">
                <div className='w-2/4 flex items-center flex-col justify-around mb-48 sm:w-full'>

                    <div className='lg:my-2 lg:p-5 lg:w-3/4 lg:h-3/4 lg:ml-36 mt-10'>
                        <h2 className='text-4xl'>Log in to your account</h2>
                        <div className="mt-10">
                            <button className='opacity-0 text-center my-5 border w-96 h-12 bg-white border-gray-300 rounded-md'>
                                {/* <div className='flex justify-center items-center'>
                                    <Image className='mr-2' width={30}
                                        height={30}
                                        alt="Picture of the author" src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEkUlEQVR4nO2Zb0wbZRzHn3taesUtRpOJYbo/DoQM5c/GMgryzxkYxbGBiQsbNBCEFGaIY8zCCuaUMSiQAQMGQWAgcSY2GeuNuzpc8NqNvRoCItE3841Dthj3ToNzbX+mVRBI197Zo2VJv8n3XZ+nn89dn6dPrwj5448/HgcoJIWqgGIoxywU4HuQTfwJSsIKBxBAKgJIQzbIJhZBhX+BE/g6VAUU2ccgXwc0UgWU4tvwNmGBJASCqiQsoMa3QRsQ433wOlk4qPEsvCkQ2llTEUAxnoEaFOIdeA3RCumEzWPwtT2IrHCK0K0f+HkUCMX4B9HBk9b0PTwNFJKJC9+NngcVfrDu8En/toJoFw9+EMnhOPGr1+DLCE40eIeAGn/vPXgsMvyHRIfgrbEMT0IlroUmaQpQaAtQKAjOSN6C05hy7Db21zgbW4pN4sI3kyGQQVh5g5+W9PJZfEChZ+ADydAqkVKR4R1vVIHv8IIvwPNwDr0oeP4aFAJ5+P76wJvl22CcfAQaCUCyC/gSPAV6JEEbLWAmdWAmwdHeAIB0wvmV35DweiQBs2x+WcDeURmACv8Hn0lYoAK9hDZiwCSPXwW/VI4E0En/ObuclPSjjRowybROBZY6FPAAyhGJNmrATF5xKWCSdQiZL1gzC2I0XDthO9rUd9e9gImccynAkRm+EAjWzMIbddcW+Qg8dCMQ6iuB3TW3rHwEHrkWQJt9JbCjehKeaoHtVd+C5x+hm7IwXwns1t60Pd2L+JNRHovYTI642UY7fSVwRDc8z0NAduZJ8A+5Z6Geif/jvF4RiEROy3D+puiPvrG4Eii/0DjqXoALVDiDnx0PBhWthENXs6HDGHtJbIGTnfX97u6Arq/iuHsBQBjMsntL4DYzCfRYOGQbDjvg7c2jlZaL11/bJhZ8W496Z2SNyeoK/vVas4XiKH5P88BENtrhfzdthrNMwjL4ylaPJi9wXIrHjwcpjpIeafxswd3VL2lrm+A9KXCBL98df+GvEjrdKfxSP2YTZjyRoDhKmt/SM+d2/6+egsbuylhBkzcwihlX8CvvRP/X4VuFwvfeiNhe1lX3E5/d51hz75zQ+RE9FvZKPq208pHIp5WWzq/2DlCDKXJ38w6PRW1qZ/b15RmU1pyRHDja2uH2FEp9ekrQl+dyutmY1iweAitFGljFdJdxL6VnIw5cGdsVdJkL2zJgjEq8aNxTV8ckTNpfs3JM1kgOFPZQsLXqO6cC77c3dSNPomPjpvkKeNKiwXLYWX1nFfy7TQM/Ik+j10fINHTqfW9IFH5RCJG1Jgd8ev2Xv53o6hJ0cHxiOG7HczVM4oI3JI7pc0HVemGeGq4MEgV+hYT8LBM/K2RN/J+eYxXTRmPo+v3m7jNGNecaMq2iX3lDprWXjWlG3sgwvSe0gY2beseQ5TF4ztXDjqt++caru5C3MzQWGdvM7L9VZDj4WCh4AZ3xuJGJm/icifb+n3xrowck6WeiC1uN+0a1TOLPajptUWVQWu13yH4IzDVk2tSGtMWqa8nzLex+ts8YU2Afg/zxxx/kaf4GzSVnCicBYF0AAAAASUVORK5CYII="} />
                                    <p className='ml-1'>continue with google</p>
                                </div> */}

                            </button>
                            {/* <div className=''><p className="ml-44 bold">OR</p></div> */}
                            <div className='relative text-center my-5 border w-96 h-12 bg-white border-gray-300 rounded-md'><div className='absolute text-sm ml-1'>Email</div><input onChange={(e:any)=>setEmail(e.target.value)} className='w-full h-full rounded-md' type="email" name="" id="" /></div>
                            <div className='relative text-center my-5 border w-96 h-12 bg-white border-gray-300 rounded-md'><div className='absolute text-sm ml-1'>Password</div><input onChange={(e:any)=>setPassword(e.target.value)} className='w-full h-full rounded-md' type="text" name="" id="" /></div>
                            <button onClick={signUpHandler} className='text-center my-5 border w-96 h-12 text-white bg-primary border-gray-300 rounded-md'>Login</button>
                            <div className='flex w-full font-light text-sm mb-10'>
                                <p >by continuing with google or email, you agree to <br /> IntellectX terms of service and Privacy policy</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='hidden lg:w-3/4 lg:flex lg:items-center lg:justify-center lg:mb-32'>
                    <div>
                        <Image className=''
                            src="/landing-images/landing-1.jpg"
                            width={800}
                            height={800}
                            alt="Picture of the author"
                        />
                    </div>
                </div>
                <div className='flex w-full font-light text-sm mb-10'>
                    <p >by continuing with google or email, you agree to <br /> IntellectX terms of service and Privacy policy</p>
                </div>

            </div>




        </main>
    )
}

export default Page