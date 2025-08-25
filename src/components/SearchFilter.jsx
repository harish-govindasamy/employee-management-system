import React from "react";
import { useEmployeeContext } from "../context/EmployeeContext";
import { departments } from "../utils/helpers";

const SearchFilter = () => {
  const { searchTerm, filter, dispatch } = useEmployeeContext();

  const handleSearchChange = (e) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "SET_FILTER",
      payload: { [name]: value },
    });
  };

  const clearFilters = () => {
    dispatch({ type: "SET_SEARCH_TERM", payload: "" });
    dispatch({ type: "SET_FILTER", payload: { department: "", status: "" } });
  };

  return (
    <div className="search-filter">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <div className="filters">
        <select
          name="department"
          value={filter.department}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <select
          name="status"
          value={filter.status}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button onClick={clearFilters} className="btn btn-secondary">
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
