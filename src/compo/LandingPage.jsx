import React, { useState } from "react";
import { getPayload } from "../helperFunctions/getPayload";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [userDetails] = useState(getPayload());
  const navigate = useNavigate();
  return (
    <div
      className={`flex flex-col items-center mt-[-3rem] justify-center min-h-screen  ${
        userDetails?.userType === "Docter"
          ? "from-blue-500 to-blue-950"
          : "from-teal-500 to-teal-950"
      } bg-gradient-to-b `}
    >
      <header className="p-2 mb-8 text-center text-white md:p-4">
        <h1 className="text-4xl font-bold md:text-7xl">
          Welcome to Book Docter App
        </h1>
        <p className="mt-4 text-lg capitalize md:text-xl">
          {userDetails?.userType === "Docter"
            ? "Enroll as a docter to book docter app"
            : "Book your doctor appointment hassle-free!"}
        </p>
      </header>

      <main className="text-center">
        <p className="mb-8 text-lg font-bold text-white capitalize md:text-xl">
          A healthier tommorow starts today.
          <br />
          Schedule your appointment.
          <br /> Your wellness,our expertise.
        </p>
        {userDetails ? (
          <button
            onClick={() => {
              (!userDetails && navigate("/signup")) ||
                (userDetails?.userType === "Docter" &&
                  navigate("/dashboard")) ||
                (userDetails?.userType === "User" &&
                  navigate("/createbooking"));
            }}
            className={`px-6 py-3 font-semibold ${
              userDetails?.userType === "Docter"
                ? "text-blue-500 hover:bg-blue-500"
                : "text-teal-500 hover:bg-teal-500"
            } transition duration-300 ease-in-out bg-white rounded-full shadow-lg  hover:text-white`}
          >
            {(userDetails?.userType === "Docter" && "Go to Dashboard") ||
              (userDetails?.userType === "User" && "Book Now")}
          </button>
        ) : (
          <div className="flex justify-between">
            <button
              onClick={() => {
                navigate("/signup");
              }}
              className={`px-6 py-3 font-semibold text-teal-500 hover:bg-teal-500 transition duration-300 ease-in-out bg-white rounded-full shadow-lg  hover:text-white`}
            >
              Book Now
            </button>
            <button
              onClick={() => {
                navigate("/signup");
              }}
              className={`px-6 py-3 font-semibold flex flex-col items-center text-teal-500 hover:bg-teal-500 transition duration-300 ease-in-out bg-white rounded-full shadow-lg  hover:text-white`}
            >
              Enroll Now <span className="text-xs">(As Docter)</span>
            </button>
          </div>
        )}
      </main>

      <footer className="mt-8 text-center text-white">
        <p>
          &copy; {new Date().getFullYear()} Doctor Booking App. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
