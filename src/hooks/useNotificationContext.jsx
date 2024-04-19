import React, { createContext, useContext, useState } from "react";

// Create a context for notifications
const NotificationsContext = createContext();

// Custom hook to provide access to notifications throughout the app
export const useNotifications = () => useContext(NotificationsContext);

// Notifications provider component to manage notifications state
export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  return (
    <NotificationsContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationsContext.Provider>
  );
};
