// form validation rules
export const validationRules = {
  name: [
    (value) => (!value?.trim() ? "Name is required" : ""),
    (value) => (value?.trim().length < 2 ? "Name too short" : ""),
  ],
  email: [
    (value) => (!value?.trim() ? "Email is required" : ""),
    (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !emailRegex.test(value) ? "Invalid email format" : "";
    },
  ],
  department: [(value) => (!value?.trim() ? "Please select department" : "")],
  role: [(value) => (!value?.trim() ? "Role is required" : "")],
  dateOfJoining: [
    (value) => (!value ? "Date is required" : ""),
    (value) => {
      const selectedDate = new Date(value);
      const today = new Date();
      return selectedDate > today ? "Date cannot be in future" : "";
    },
  ],
  status: [(value) => (!value ? "Status is required" : "")],
};

// utility functions
export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const getStatusBadgeClass = (status) => {
  return status === "Active" ? "status-active" : "status-inactive";
};

// department list - maybe move to config file later?
export const departments = [
  "Engineering",
  "HR",
  "Marketing",
  "Finance",
  "Operations",
  "Sales",
  "Product",
];

export const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Senior Developer",
  "Team Lead",
  "Engineering Manager",
  "HR Manager",
  "HR Specialist",
  "Marketing Manager",
  "Marketing Specialist",
  "Financial Analyst",
  "Accountant",
  "Operations Manager",
  "Sales Manager",
  "Sales Representative",
  "Product Manager",
  "UI/UX Designer",
  "DevOps Engineer",
  "QA Engineer",
  "Data Analyst",
];

export const filterEmployees = (employees, searchTerm, filter) => {
  return employees.filter((emp) => {
    // check search term
    const matchesSearch =
      !searchTerm ||
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase());

    // check department filter
    const matchesDepartment =
      !filter.department || emp.department === filter.department;

    // check status filter
    const matchesStatus = !filter.status || emp.status === filter.status;

    return matchesSearch && matchesDepartment && matchesStatus;
  });
};
