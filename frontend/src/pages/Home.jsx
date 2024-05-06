import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div>This is homepage</div>
      <Link to="/login">Go to login page</Link>
    </>
  );
};

export default Home;
