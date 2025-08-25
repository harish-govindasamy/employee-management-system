import React from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { useEmployeeContext } from "../context/EmployeeContext";
import { formatDate, getStatusBadgeClass } from "../utils/helpers";

const EmployeeDetail = () => {
  const { id } = useParams();
  const { employees, dispatch } = useEmployeeContext();

  const employee = employees.find((emp) => emp.id === id);

  if (!employee) {
    return <Navigate to="/" replace />;
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${employee.name}?`)) {
      dispatch({ type: "DELETE_EMPLOYEE", payload: employee.id });
      // Navigate back to home after deletion
      window.location.href = "/";
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="detail-header">
          <Link to="/" className="back-link">
            ← Back to Employee List
          </Link>
        </div>

        <div className="employee-detail">
          <div className="detail-card">
            <div className="detail-header-info">
              <h1>{employee.name}</h1>
              <span
                className={`status-badge ${getStatusBadgeClass(
                  employee.status
                )}`}
              >
                {employee.status}
              </span>
            </div>

            <div className="detail-grid">
              <div className="detail-item">
                <label>Employee ID</label>
                <span>{employee.id}</span>
              </div>

              <div className="detail-item">
                <label>Email Address</label>
                <span>{employee.email}</span>
              </div>

              <div className="detail-item">
                <label>Department</label>
                <span>{employee.department}</span>
              </div>

              <div className="detail-item">
                <label>Role</label>
                <span>{employee.role}</span>
              </div>

              <div className="detail-item">
                <label>Date of Joining</label>
                <span>{formatDate(employee.dateOfJoining)}</span>
              </div>

              <div className="detail-item">
                <label>Employment Status</label>
                <span
                  className={`status-badge ${getStatusBadgeClass(
                    employee.status
                  )}`}
                >
                  {employee.status}
                </span>
              </div>
            </div>

            <div className="detail-actions">
              <Link
                to={`/edit-employee/${employee.id}`}
                className="btn btn-primary"
              >
                Edit Employee
              </Link>
              <button onClick={handleDelete} className="btn btn-danger">
                Delete Employee
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
