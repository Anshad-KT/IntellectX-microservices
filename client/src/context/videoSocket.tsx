"use client"
import React, { createContext, useContext, Dispatch, SetStateAction, useState, useMemo } from "react";
import { io, Socket } from "socket.io-client"; 
type DataType = {
  firstName: string;
};

const SERVER = "https://www.intellectx.cloud/";

const VideoContext = createContext<Socket | null>(null); // Specify the type as Socket | null


export const VideoContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Create the socket using useMemo
  const socket = useMemo(() => io(SERVER), []);

  return (
    <VideoContext.Provider value={socket}>
      {children}
    </VideoContext.Provider>
  );
};

export const useSocket = (): Socket | null => {
  const socket = useContext(VideoContext);
  return socket;
};
