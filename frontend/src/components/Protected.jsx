import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const Protected = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/verifyUserToken", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          // Handle non-successful responses, e.g., unauthorized access
          throw new Error("Failed to verify user token");
        }
        // Proceed with successful response
        console.log("User token verified successfully");
        setAuthenticated(true);
      } catch (error) {
        // Handle fetch errors
        console.error("Error verifying user token:", error);
        // Redirect or handle error state appropriately
        navigate("/login"); // Redirect to login page or handle error state
      }
    };

    fetchData();
  }, []); // Ensure fetchData is only called once, on component mount

  if (!authenticated) {
    // You might want to render a loading spinner or something similar here
    return null;
  }

  return <Outlet />;
};

export default Protected;
