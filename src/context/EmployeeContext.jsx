import React, { createContext, useContext, useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const EmployeeContext = createContext();

// dummy data - TODO: replace with real API later
const INITIAL_EMPLOYEES = [
  {
    id: uuidv4(),
    name: "John Doe",
    email: "john.doe@company.com",
    department: "Engineering",
    role: "Senior Developer",
    dateOfJoining: "2023-01-15",
    status: "Active",
  },
  {
    id: uuidv4(),
    name: "Jane Smith",
    email: "jane.smith@company.com",
    department: "HR",
    role: "HR Manager",
    dateOfJoining: "2022-06-10",
    status: "Active",
  },
  {
    id: uuidv4(),
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    department: "Marketing",
    role: "Marketing Specialist",
    dateOfJoining: "2023-03-20",
    status: "Inactive", // left the company
  },
  {
    id: uuidv4(),
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    department: "Engineering",
    role: "Frontend Developer",
    dateOfJoining: "2023-08-01",
    status: "Active",
  },
  {
    id: uuidv4(),
    name: "David Brown",
    email: "david.brown@company.com",
    department: "Finance",
    role: "Financial Analyst",
    dateOfJoining: "2022-11-15",
    status: "Active",
  },
];

const employeeReducer = (state, action) => {
  switch (action.type) {
    case "SET_EMPLOYEES":
      return { ...state, employees: action.payload };

    case "ADD_EMPLOYEE": {
      const newEmp = { ...action.payload, id: uuidv4() };
      const updated = [...state.employees, newEmp];
      // persist to localStorage
      localStorage.setItem("hrms_employees", JSON.stringify(updated));
      return { ...state, employees: updated };
    }

    case "UPDATE_EMPLOYEE": {
      const updatedList = state.employees.map((emp) =>
        emp.id === action.payload.id ? action.payload : emp
      );
      localStorage.setItem("hrms_employees", JSON.stringify(updatedList));
      return { ...state, employees: updatedList };
    }

    case "DELETE_EMPLOYEE": {
      const filtered = state.employees.filter(
        (emp) => emp.id !== action.payload
      );
      localStorage.setItem("hrms_employees", JSON.stringify(filtered));
      return { ...state, employees: filtered };
    }

    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };

    case "SET_FILTER":
      return { ...state, filter: { ...state.filter, ...action.payload } };

    default:
      return state;
  }
};

export const EmployeeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(employeeReducer, {
    employees: [],
    searchTerm: "",
    filter: { department: "", status: "" },
  });

  useEffect(() => {
    // check if we have saved data
    const savedData = localStorage.getItem("hrms_employees");
    if (savedData) {
      try {
        dispatch({ type: "SET_EMPLOYEES", payload: JSON.parse(savedData) });
      } catch (e) {
        console.log("failed to parse saved data, using defaults");
        dispatch({ type: "SET_EMPLOYEES", payload: INITIAL_EMPLOYEES });
      }
    } else {
      dispatch({ type: "SET_EMPLOYEES", payload: INITIAL_EMPLOYEES });
      localStorage.setItem("hrms_employees", JSON.stringify(INITIAL_EMPLOYEES));
    }
  }, []);

  return (
    <EmployeeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployeeContext must be used within EmployeeProvider");
  }
  return context;
};
