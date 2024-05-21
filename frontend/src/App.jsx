import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customer from "./pages/Customer";
import Company from "./pages/Company";
import User from "./pages/User";
import Protected from "./components/Protected";
import Public from "./components/Public";
import CompanyDetails from "./pages/CompanyDetails";
import NotFound from "./pages/NotFound";
import CustomerDetails from "./pages/CustomerDetails";

function App() {
  alert(
    "If you didn't come here from my Github, the username and password are => superadmin"
  );
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Public />}>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<Login />} />
          </Route>

          <Route element={<Protected />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/company" element={<Company />} />
            <Route path="/company/:companyId" element={<CompanyDetails />} />
            <Route path="/customer/:customerId" element={<CustomerDetails />} />
            <Route path="/user" element={<User />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
