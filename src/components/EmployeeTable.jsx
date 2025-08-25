import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useEmployeeContext } from "../context/EmployeeContext";
import {
  formatDate,
  getStatusBadgeClass,
  filterEmployees,
} from "../utils/helpers";

const EmployeeTable = () => {
  const { employees, searchTerm, filter, dispatch } = useEmployeeContext();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // memoize filtered results for better performance
  const filteredEmployees = useMemo(() => {
    return filterEmployees(employees, searchTerm, filter);
  }, [employees, searchTerm, filter]);

  // handle resize - switch between table/card view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDelete = (employeeId, employeeName) => {
    // confirm before deleting
    if (window.confirm(`Delete ${employeeName}? This can't be undone.`)) {
      dispatch({ type: "DELETE_EMPLOYEE", payload: employeeId });
    }
  };

  if (filteredEmployees.length === 0) {
    return (
      <div className="no-results">
        <h3>No employees found</h3>
        <p>
          {employees.length === 0
            ? "No employees added yet."
            : "Try different search criteria."}
        </p>
        {employees.length === 0 && (
          <Link to="/add-employee" className="btn btn-primary">
            Add First Employee
          </Link>
        )}
      </div>
    );
  }

  // mobile card layout
  if (isMobile) {
    return (
      <div className="table-container">
        <div className="table-header">
          <h2>Employees ({filteredEmployees.length})</h2>
        </div>

        <div className="employee-cards">
          {filteredEmployees.map((employee) => (
            <div key={employee.id} className="employee-card">
              <div className="card-header">
                <div className="employee-info">
                  <h3 className="employee-name">
                    <Link
                      to={`/employee/${employee.id}`}
                      className="employee-link"
                    >
                      {employee.name}
                    </Link>
                  </h3>
                  <span
                    className={`status-badge ${getStatusBadgeClass(
                      employee.status
                    )}`}
                  >
                    {employee.status}
                  </span>
                </div>
              </div>

              <div className="card-content">
                <div className="info-row">
                  <span className="label">Email:</span>
                  <span className="value">{employee.email}</span>
                </div>
                <div className="info-row">
                  <span className="label">Department:</span>
                  <span className="value">{employee.department}</span>
                </div>
                <div className="info-row">
                  <span className="label">Role:</span>
                  <span className="value">{employee.role}</span>
                </div>
                <div className="info-row">
                  <span className="label">Joined:</span>
                  <span className="value">
                    {formatDate(employee.dateOfJoining)}
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">ID:</span>
                  <span className="value employee-id">
                    {employee.id.slice(0, 8)}...
                  </span>
                </div>
              </div>

              <div className="card-actions">
                <Link
                  to={`/edit-employee/${employee.id}`}
                  className="btn btn-sm btn-secondary"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(employee.id, employee.name)}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // desktop table
  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Employees ({filteredEmployees.length})</h2>
      </div>

      <div className="table-wrapper">
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id}>
                <td className="employee-id">{emp.id.slice(0, 8)}...</td>
                <td className="employee-name">
                  <Link to={`/employee/${emp.id}`} className="employee-link">
                    {emp.name}
                  </Link>
                </td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>{emp.role}</td>
                <td>{formatDate(emp.dateOfJoining)}</td>
                <td>
                  <span
                    className={`status-badge ${getStatusBadgeClass(
                      emp.status
                    )}`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td className="actions">
                  <Link
                    to={`/edit-employee/${emp.id}`}
                    className="btn btn-sm btn-secondary"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(emp.id, emp.name)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
