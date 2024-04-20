import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import FindBookings from "./compo/findBookings.jsx";
import Signup from "./compo/Signup.jsx";
import Signin from "./compo/login.jsx";
import CreateBooking from "./compo/createBooking.jsx";
import Navbar from "./compo/Navbar.jsx";
import Profile from "./compo/Profile.jsx";
import { Toaster } from "sonner";
import LandingPage from "./compo/LandingPage.jsx";
import { SocketProvider } from "./hooks/useSocketContext.jsx";
import { NotificationsProvider } from "./hooks/useNotificationContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <SocketProvider>
      <NotificationsProvider>
        <BrowserRouter>
          <Navbar />
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<FindBookings />} />
            <Route path="/createbooking" element={<CreateBooking />} />
          </Routes>
        </BrowserRouter>
      </NotificationsProvider>
    </SocketProvider>
  </>
);
