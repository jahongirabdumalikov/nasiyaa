import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Calendar from "./components/Calendar";
import Customers from "./components/Customers";
import CreateCustomer from "./components/CreateCustomer";
import CustomerCredit from "./components/CustomerCredit";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/create" element={<CreateCustomer />} />
          <Route
            path="/customers/:customerId/:customerName/credit"
            element={<CustomerCredit />}
          />
          <Route path="/reports" element={<Dashboard />} />
          <Route path="/settings" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
