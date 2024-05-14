import React from "react";
import deleteBtn from "../../assets/delete.svg";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const DeleteCompany = ({ companyId, getCompanyData }) => {
  const handleCompanyDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/company/deleteCompany/${companyId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",
        }
      );
      const data = await res.json();

      if (data.success === true) {
        toast.success("Company has been removed!");
        getCompanyData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error: " + error);
    }
  };

  return (
    <>
      <button onClick={handleCompanyDelete}>
        <img src={deleteBtn} alt="Delete Button" />
      </button>
    </>
  );
};

export default DeleteCompany;
