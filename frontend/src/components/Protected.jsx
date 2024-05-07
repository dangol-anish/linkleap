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
          throw new Error("Failed to verify user token");
        }

        console.log("User token verified successfully");
        setAuthenticated(true);
      } catch (error) {
        navigate("/login");
      }
    };

    fetchData();
  }, []);

  if (!authenticated) {
    return null;
  }

  return <Outlet />;
};

export default Protected;
