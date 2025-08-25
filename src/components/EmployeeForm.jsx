import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useEmployeeContext } from "../context/EmployeeContext";
import { useFormValidation } from "../hooks/useCustomHooks";
import { validationRules, departments, roles } from "../utils/helpers";

const EmployeeForm = ({ employee, isEditing = false }) => {
  const navigate = useNavigate();
  const { dispatch } = useEmployeeContext();

  const initialValues = {
    name: "",
    email: "",
    department: "",
    role: "",
    dateOfJoining: "",
    status: "Active", // default to active
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    setValues,
  } = useFormValidation(initialValues, validationRules);

  useEffect(() => {
    if (isEditing && employee) {
      setValues(employee);
    }
  }, [employee, isEditing, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateAll()) {
      if (isEditing) {
        dispatch({ type: "UPDATE_EMPLOYEE", payload: values });
      } else {
        dispatch({ type: "ADD_EMPLOYEE", payload: values });
      }
      navigate("/"); // back to list
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>{isEditing ? "Edit Employee" : "Add New Employee"}</h2>
      </div>

      <form onSubmit={handleSubmit} className="employee-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.name && touched.name ? "error" : ""}
              placeholder="Enter full name"
            />
            {errors.name && touched.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.email && touched.email ? "error" : ""}
              placeholder="employee@company.com"
            />
            {errors.email && touched.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="department">Department *</label>
            <select
              id="department"
              name="department"
              value={values.department}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.department && touched.department ? "error" : ""}
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && touched.department && (
              <span className="error-message">{errors.department}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="role">Role *</label>
            <select
              id="role"
              name="role"
              value={values.role}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.role && touched.role ? "error" : ""}
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            {errors.role && touched.role && (
              <span className="error-message">{errors.role}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="dateOfJoining">Joining Date *</label>
            <input
              type="date"
              id="dateOfJoining"
              name="dateOfJoining"
              value={values.dateOfJoining}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.dateOfJoining && touched.dateOfJoining ? "error" : ""
              }
            />
            {errors.dateOfJoining && touched.dateOfJoining && (
              <span className="error-message">{errors.dateOfJoining}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="status">Status *</label>
            <select
              id="status"
              name="status"
              value={values.status}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.status && touched.status ? "error" : ""}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            {errors.status && touched.status && (
              <span className="error-message">{errors.status}</span>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {isEditing ? "Update Employee" : "Add Employee"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
