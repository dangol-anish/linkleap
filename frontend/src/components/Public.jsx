import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const Public = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/verifyUserToken", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          if (data.token) {
            navigate("/dashboard");
          }
        } else {
          throw new Error("Failed to verify user token");
        }
      } catch (error) {}
    };

    verifyUser();
  }, [navigate]);

  return <Outlet />;
};

export default Public;
