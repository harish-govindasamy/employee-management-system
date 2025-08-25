import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EmployeeProvider } from "./context/EmployeeContext";
import Header from "./components/Header";
import EmployeeList from "./pages/EmployeeList";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import EmployeeDetail from "./pages/EmployeeDetail";
import "./App.css";

// TODO: maybe add error boundary later? not sure if we need it
// routes setup - keeping it simple for now
function App() {
  return (
    <EmployeeProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<EmployeeList />} />
              <Route path="/add-employee" element={<AddEmployee />} />
              <Route path="/edit-employee/:id" element={<EditEmployee />} />
              <Route path="/employee/:id" element={<EmployeeDetail />} />
              {/* TODO: 404 page */}
            </Routes>
          </main>
        </div>
      </Router>
    </EmployeeProvider>
  );
}

export default App;
