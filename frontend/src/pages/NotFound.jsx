import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex justify-center flex-col items-center gap-[12px]">
      <h1 className="text-[96px]"> 404 </h1>
      <p className="text-[24px]">Looks like this page doesn't exist!</p>
      <p className="text-[16px]">
        Go back to dashboard and continue exploring.
      </p>
      <Link
        to="/dashboard"
        className="bg-linkleap-login-btn p-2 rounded-[8px] text-white"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
