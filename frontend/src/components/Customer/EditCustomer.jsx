import { useState, useEffect } from "react";
import editBtn from "../../assets/edit.svg";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { getCurrencySymbol } from "../../utils/currencyConverter";

const EditCustomer = ({ customerId, getCustomerData }) => {
  const userData = JSON.parse(localStorage.getItem("data"));
  const userId = userData.id;

  const [currentCustomerData, setCurrentCustomerData] = useState({
    customerName: "",
    customerEmail: "",
    customerJobTitle: "",
    customerDealValue: "",
    dealValueCurrency: "USD",
    customerDescription: "",
    customerCompanyId: "",
    customerStatus: "",
  });

  const [companyNames, setCompanyNames] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
    getCurrentCustomerData();
  };

  const closeModal = () => {
    setCurrentCustomerData({
      customerName: "",
      customerEmail: "",
      customerJobTitle: "",
      customerDealValue: "",
      dealValueCurrency: "USD",
      customerDescription: "",
      customerCompanyId: "",
      customerStatus: "",
    });
    setModalIsOpen(false);
  };

  const handleChange = (e) => {
    setCurrentCustomerData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCurrencyChange = (event) => {
    setCurrentCustomerData((prevData) => ({
      ...prevData,
      dealValueCurrency: event.target.value,
    }));
  };

  const handleCombinedChange = (event) => {
    handleCurrencyChange(event);
    handleChange(event);
  };

  useEffect(() => {
    const getCompanyData = async () => {
      try {
        const res = await fetch("/api/company/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
          credentials: "include",
        });
        const data = await res.json();

        const companyName = data.message;
        setCompanyNames(companyName);
      } catch (error) {
        console.error("Error", error);
      }
    };
    getCompanyData();
  }, []);

  const getCurrentCustomerData = async () => {
    try {
      const res = await fetch(
        `/api/customer/getCurrentCustomerData/${customerId}`,
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

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (
      !currentCustomerData.customerName ||
      !currentCustomerData.customerEmail ||
      !currentCustomerData.customerJobTitle ||
      !currentCustomerData.customerDealValue ||
      !currentCustomerData.dealValueCurrency ||
      !currentCustomerData.customerDescription ||
      !currentCustomerData.customerCompanyId ||
      !currentCustomerData.customerStatus
    ) {
      toast.error("All input fields are required");
      return;
    }

    try {
      const res = await fetch(
        `/api/customer/updateCustomerData/${customerId}&${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentCustomerData),
          credentials: "include",
        }
      );

      const data = await res.json();

      if ((data.success = true)) {
        closeModal();

        getCustomerData();
        toast.success("Customer data updated!");
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
          onSubmit={handleUpdate}
          className="bg-white h-auto w-[95%] max-w-md p-6 rounded-lg flex flex-col gap-8 "
        >
          <div className="flex flex-col gap-[20px]">
            <div className="flex gap-[8px] flex-col justify-center items-center">
              <h3 className="text-[18px] font-semibold">Edit Customer</h3>
              <p
                className="text-linkleap-gray text-[14px] font-normal
                  "
              >
                Edit the details of customer
              </p>
            </div>
            <div className="flex flex-col gap-[16px]">
              <label className="flex flex-col gap-[6px]" htmlFor="">
                <p className="text-[14px] font-medium">Full Name</p>
                <input
                  className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px]"
                  value={currentCustomerData.customerName}
                  type="text"
                  placeholder="Shrijan Dangol"
                  name="customerName"
                  id="customerName"
                  onChange={handleChange}
                />
              </label>
              <label className="flex flex-col gap-[6px]" htmlFor="">
                <p className="text-[14px] font-medium">Email</p>
                <input
                  className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px]"
                  value={currentCustomerData.customerEmail}
                  type="email"
                  placeholder="shrijan@gmail.com"
                  name="customerEmail"
                  id="customerEmail"
                  onChange={handleChange}
                />
              </label>
              <label className="flex flex-col gap-[6px]" htmlFor="">
                <p className="text-[14px] font-medium">Job Title</p>
                <input
                  className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px]"
                  value={currentCustomerData.customerJobTitle}
                  type="text"
                  placeholder="Manager"
                  name="customerJobTitle"
                  id="customerJobTitle"
                  onChange={handleChange}
                />
              </label>
              <label className="flex flex-col gap-[6px]" htmlFor="">
                <p className="text-[14px] font-medium">Deal Value</p>
                <div className="flex w-full focus:border focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] justify-between rounded-[8px] items-center ">
                  <span className="text-gray-700 pr-[8px]">
                    {getCurrencySymbol(currentCustomerData.dealValueCurrency)}
                  </span>
                  <input
                    type="number"
                    className="w-full focus:outline-none appearance-none"
                    min="1"
                    name="customerDealValue"
                    id="customerDealValue"
                    defaultValue={currentCustomerData.customerDealValue}
                    onChange={handleChange}
                  />

                  <select
                    value={currentCustomerData.dealValueCurrency}
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
                  name="customerDescription"
                  value={currentCustomerData.customerDescription}
                  id="customerDescription"
                  onChange={handleChange}
                ></textarea>
              </label>
              <label className="flex flex-col gap-[6px]" htmlFor="">
                <p className="text-[14px] font-medium">Company</p>
                <select
                  className="w-full appearance-none focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px] custom-select cursor-pointer"
                  name="customerCompanyId"
                  id="customerCompanyId"
                  onChange={handleChange}
                >
                  <option value="">Select a Company</option>
                  {companyNames.map((companyName) => (
                    <option
                      key={companyName.company_id}
                      className=""
                      value={companyName.company_id}
                    >
                      {companyName.company_name}
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
              Update
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EditCustomer;
