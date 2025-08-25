import React from "react";
import SearchFilter from "../components/SearchFilter";
import EmployeeTable from "../components/EmployeeTable";

const EmployeeList = () => {
  return (
    <div className="page">
      <div className="container">
        <SearchFilter />
        <EmployeeTable />
      </div>
    </div>
  );
};

export default EmployeeList;
