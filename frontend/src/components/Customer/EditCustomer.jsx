import { useState } from "react";
import editBtn from "../../assets/edit.svg";
import Modal from "react-modal";
import { toast } from "react-toastify";

const EditCustomer = ({ customerId, getCustomerData }) => {
  const [currentCustomerData, setCurrentCustomerData] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  console.log(currentCustomerData);

  const openModal = () => {
    setModalIsOpen(true);
    getCurrentCustomerData();
  };

  const closeModal = () => {
    setCurrentCustomerData({});
    setModalIsOpen(false);
  };
  const handleChange = (e) => {
    setCurrentCustomerData({
      ...currentCustomerData,
      [e.target.name]: e.target.value,
    });
  };

  const getCurrentCustomerData = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/customer/getCurrentCustomerData/${customerId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();

      if (data.success === true) {
        setCurrentCustomerData(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error: " + error);
    }
  };
  return (
    <>
      <button onClick={() => openModal()} className="">
        <img src={editBtn} alt="Edit Button" />
      </button>
    </>
  );
};

export default EditCustomer;
