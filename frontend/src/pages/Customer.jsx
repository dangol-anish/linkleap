import React from "react";
import Sidebar from "../components/Sidebar";
import sbAdd from "../assets/sidebar/sbAdd.svg";
import AddCustomer from "../components/Customer/AddCustomer";

const Customer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  return (
    <>
      <main className="flex min-h-screen">
        <Sidebar />
        <section className="w-full">
          <div className="flex w-full my-[32px] px-[32px] justify-between">
            <div>
              <h2 className="text-[30px] font-medium">Customers</h2>
              <p className="text-linkleap-gray">
                Track, manage, and forecast your customer and orders.
              </p>
            </div>
            <AddCustomer />
          </div>
        </section>
      </main>
    </>
  );
};

export default Customer;
