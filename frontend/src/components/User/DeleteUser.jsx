import React from "react";
import deleteBtn from "../../assets/delete.svg";

const deleteUser = () => {
  const handleUserDelete = async () => {};
  return (
    <>
      <button onClick={handleUserDelete}>
        <img src={deleteBtn} alt="Delete Button" />
      </button>
    </>
  );
};

export default deleteUser;
