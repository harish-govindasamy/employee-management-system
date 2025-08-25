import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { useEmployeeContext } from "../context/EmployeeContext";
import EmployeeForm from "../components/EmployeeForm";

const EditEmployee = () => {
  const { id } = useParams();
  const { employees } = useEmployeeContext();

  const employee = employees.find((emp) => emp.id === id);

  if (!employee) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="page">
      <div className="container">
        <EmployeeForm employee={employee} isEditing={true} />
      </div>
    </div>
  );
};

export default EditEmployee;
