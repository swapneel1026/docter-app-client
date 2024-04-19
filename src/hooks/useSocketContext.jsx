import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";

// Create a context for the socket
const SocketContext = createContext();
const API_URL =
  import.meta.env.VITE_ENV === "production"
    ? import.meta.env.VITE_PROD_BASE_URL
    : import.meta.env.VITE_DEV_BASE_URL;

// Custom hook to provide access to the socket throughout the app
export const useSocket = () => useContext(SocketContext);

// Socket provider component to manage the socket connection
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(API_URL);
    setSocket(newSocket);

    // Clean up socket connection on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
