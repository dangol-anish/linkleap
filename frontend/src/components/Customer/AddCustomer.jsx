import React, { useEffect, useState } from "react";
import sbAdd from "../../assets/sidebar/sbAdd.svg";

import Modal from "react-modal";
import { toast } from "react-toastify";

const AddCustomer = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [companyNames, setCompanyNames] = useState([]);
  const [currency, setCurrency] = useState("USD");
  const userData = JSON.parse(localStorage.getItem("data"));
  const userId = userData.id;
  const [customerData, setCustomerData] = useState({
    dealValueCurrency: "USD",
    customerStatus: "To Contact",
    companyName: "Anish's Company",
    userId: userId,
  });

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.id]: e.target.value });
  };

  const handleCombinedChange = (event) => {
    handleCurrencyChange(event);
    handleChange(event);
  };

  useEffect(() => {
    const getCompanyData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/company/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
          credentials: "include",
        });
        const data = await res.json();

        const companyName = data.message.map((company) => company.company_name);
        setCompanyNames(companyName);
      } catch (error) {
        console.error("Error", error);
      }
    };
    getCompanyData();
  }, []);

  const getCurrencySymbol = (currency) => {
    switch (currency) {
      case "USD":
        return "$";
      case "EUR":
        return "€";
      case "GBP":
        return "£";
      case "NPR":
        return "रु";
      default:
        return "$";
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(customerData);
    if (
      !customerData.customerName ||
      !customerData.customerEmail ||
      !customerData.customerJobTitle ||
      !customerData.customerDealValue ||
      !customerData.dealValueCurrency ||
      !customerData.customerDescription ||
      !customerData.customerCompany ||
      !customerData.customerStatus
    ) {
      toast.error("All input fields are required");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:3000/api/customer/addNewCustomer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customerData),
          credentials: "include",
        }
      );
      const data = await res.json();

      if (data.success === true) {
        closeModal();

        toast.success("New Customer Added!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error: " + error);
    }
  };

  return (
    <>
      <button
        onClick={() => openModal()}
        className="bg-linkleap-login-btn flex gap-[8px] rounded-[8px] justify-center items-center px-[16px] py-[10px] h-[40px]"
      >
        <img src={sbAdd} alt="sbAdd" />
        <span className="text-[14px] font-medium text-white">Add</span>
      </button>

      <Modal
        id="addCustomerModal"
        className="flex flex-col justify-center items-center h-full"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName={{
          base: "fixed inset-0 bg-black bg-opacity-50 ",
          afterOpen: "bg-black bg-opacity-50 ",
          beforeClose: "bg-black bg-opacity-50",
        }}
        ariaHideApp={false}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white h-[750px] w-[410px]  p-[24px] rounded-[12px] flex flex-col gap-[32px]"
        >
          <div className="flex flex-col gap-[20px]">
            <div className="flex gap-[8px] flex-col justify-center items-center">
              <h3 className="text-[18px] font-semibold">Add New Customer</h3>
              <p
                className="text-linkleap-gray text-[14px] font-normal
                  "
              >
                Enter the details of new customer
              </p>
            </div>
            <div className="flex flex-col gap-[16px]">
              <label className="flex flex-col gap-[6px]" htmlFor="">
                <p className="text-[14px] font-medium">Full Name</p>
                <input
                  className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px]"
                  type="text"
                  placeholder="Shrijan Dangol"
                  id="customerName"
                  onChange={handleChange}
                />
              </label>
              <label className="flex flex-col gap-[6px]" htmlFor="">
                <p className="text-[14px] font-medium">Email</p>
                <input
                  className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px]"
                  type="email"
                  placeholder="shrijan@gmail.com"
                  id="customerEmail"
                  onChange={handleChange}
                />
              </label>
              <label className="flex flex-col gap-[6px]" htmlFor="">
                <p className="text-[14px] font-medium">Job Title</p>
                <input
                  className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px]"
                  type="text"
                  placeholder="Manager"
                  id="customerJobTitle"
                  onChange={handleChange}
                />
              </label>
              <label className="flex flex-col gap-[6px]" htmlFor="">
                <p className="text-[14px] font-medium">Deal Value</p>
                <div className="flex w-full focus:border focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] justify-between rounded-[8px] items-center ">
                  <span className="text-gray-700 pr-[8px]">
                    {getCurrencySymbol(currency)}
                  </span>
                  <input
                    type="number"
                    className="w-full focus:outline-none appearance-none"
                    defaultValue=""
                    min="1"
                    id="customerDealValue"
                    onChange={handleChange}
                  />

                  <select
                    value={currency}
                    id="dealValueCurrency"
                    onChange={handleCombinedChange}
                    className="w-[20%] appearance-none focus:border-linkleap-login-btn focus:outline-none  custom-select cursor-pointer"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="NPR">NPR</option>
                  </select>
                </div>
              </label>

              <label className="flex flex-col gap-[6px]" htmlFor="">
                <p className="text-[14px] font-medium">Customer Description</p>
                <textarea
                  className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px] h-[60px] resize-none"
                  name=""
                  id="customerDescription"
                  onChange={handleChange}
                ></textarea>
              </label>
              <label className="flex flex-col gap-[6px]" htmlFor="">
                <p className="text-[14px] font-medium">Company</p>
                <select
                  className="w-full appearance-none focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px] custom-select cursor-pointer"
                  name=""
                  id="customerCompany"
                  onChange={handleChange}
                >
                  {companyNames.map((companyName) => (
                    <option key={companyName} className="" value={companyName}>
                      {companyName}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <div className="flex gap-[8px]">
            <button
              className="w-[175px] py-[10px] px-[18px] border-[1px] rounded-[8px] text-[16px] font-medium"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button className="w-[175px] py-[10px] px-[18px] rounded-[8px] bg-linkleap-login-btn text-[16px] font-medium text-white ">
              Add
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddCustomer;
