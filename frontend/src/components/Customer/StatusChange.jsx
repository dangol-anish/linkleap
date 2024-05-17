import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const StatusChange = ({ currentStatus, customerId }) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const userData = JSON.parse(localStorage.getItem("data"));
  const userId = userData.id;

  const handleChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const getBackgroundColor = (status) => {
    switch (status) {
      case "Won":
        return "bg-[#ECFDF3] text-[#027A48]";
      case "Lost":
        return "bg-[#FFBFBF] text-[#D80000]";
      default:
        return "bg-[#545554] text-white";
    }
  };

  useEffect(() => {
    const changeStatus = async () => {
      if (selectedStatus !== currentStatus) {
        try {
          const res = await fetch(
            `http://localhost:3000/api/customer/changeStatus/${selectedStatus}&${customerId}&${userId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },

              credentials: "include",
            }
          );
          const data = await res.json();
        } catch (error) {
          console.error("Error", error);
        }
      }
    };
    changeStatus();
  }, [selectedStatus]);

  return (
    <select
      className={`appearance-none px-[8px] py-[2px] text-white bg-[#545554]   focus:outline-none rounded-[16px]  text-center ${getBackgroundColor(
        selectedStatus
      )}`}
      name=""
      id=""
      onChange={handleChange}
    >
      <option>{currentStatus}</option>
      <option value="Qualified">Qualified</option>
      <option value="To Contact">To Contact</option>
      <option value="Contacted">Contacted</option>
      <option value="Negotiation">Negotiation</option>
      <option value="Proposal Sent">Proposal Sent</option>
      <option value="Won">Won</option>
      <option value="Lost">Lost</option>
    </select>
  );
};

export default StatusChange;
