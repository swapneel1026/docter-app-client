import React, { useState } from "react";
import { getPayload } from "../helperFunctions/getPayload";

const LandingPage = () => {
  const [userDetails] = useState(getPayload());
  return (
    <div
      className={`font-extrabold text-center ${
        userDetails?.userType === "User" ? "text-teal-600" : "text-blue-500"
      }  text-7xl`}
    >
      Welcome To BooKDocteR 👨‍⚕️
    </div>
  );
};

export default LandingPage;
