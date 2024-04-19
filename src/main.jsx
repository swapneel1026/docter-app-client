import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FindBookings from "./compo/findBookings.jsx";
import Signup from "./compo/Signup.jsx";
import Signin from "./compo/login.jsx";
import CreateBooking from "./compo/createBooking.jsx";
import Navbar from "./compo/Navbar.jsx";
import Profile from "./compo/Profile.jsx";
import { Toaster } from "sonner";
import LandingPage from "./compo/LandingPage.jsx";
import { io } from "socket.io-client";
import { SocketProvider } from "./hooks/useSocketContext.jsx";
import { NotificationsProvider } from "./hooks/useNotificationContext.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/signin",
      element: <Signin />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/dashboard",
      element: <FindBookings />,
    },
    {
      path: "/createbooking",
      element: <CreateBooking />,
    },
  ],
  {
    basename: "/",
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <SocketProvider>
      <NotificationsProvider>
        <Navbar />
        <Toaster position="top-right" />
        <RouterProvider router={router} />
      </NotificationsProvider>
    </SocketProvider>
  </>
);
