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

const router = createBrowserRouter(
  [
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
    <Navbar />
    <Toaster position="top-right" />
    <RouterProvider router={router} />
  </>
);
