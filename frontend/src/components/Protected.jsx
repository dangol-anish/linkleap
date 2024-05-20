import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const Protected = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/verifyUserToken`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to verify user token");
        }

        setAuthenticated(true);
      } catch (error) {
        navigate("/");
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
