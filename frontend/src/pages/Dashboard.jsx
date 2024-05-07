import React from "react";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <>
      <main className="flex min-h-screen">
        <Sidebar />
        <p>Dashboard</p>
      </main>
    </>
  );
};

export default Dashboard;
