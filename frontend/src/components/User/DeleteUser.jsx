import React from "react";
import deleteBtn from "../../assets/delete.svg";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const DeleteUser = ({ userId, getUserData }) => {
  const handleUserDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/user/deleteUser/${userId}`,
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
        toast.success("User has been deleted!");
        getUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error: " + error);
    }
  };
  return (
    <>
      <button onClick={handleUserDelete}>
        <img src={deleteBtn} alt="Delete Button" />
      </button>
    </>
  );
};

export default DeleteUser;
