import { authenticationService } from "./authentication.service";
import axios from "axios";

export const dataService = {
  getEmployees,
  getDepartments,
  addBonus,
  addAttendance,
  addEmployee,
  editEmployee,
  addDepartment,
  editDepartment,
  getSalary,
  deleteEmployee,
  deleteDepartment,
};

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Do something with response error
    try {
      console.log("Error: ", error.response);

      console.log("OK: ", error.response.status);
      if ([401, 403].indexOf(error.response.status) !== -1) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        authenticationService.logout();
        window.location.reload(true);
      }

      const err =
        (error.response && error.response.data.message) ||
        error.response.statusText;
      return Promise.reject(err);
    } catch {}
  }
);

let config = {
  baseURL: "http://127.0.0.1:5000/",
};

function getEmployees() {
  return axios({
    url: "/employees",
    method: "GET",
    headers: { "x-access-token": authenticationService.currentUserValue.token },
    ...config,
  }).then((response) => {
    return response.data;
  });
}

function editEmployee({
  firstName,
  lastName,
  email,
  dob,
  department,
  hourlyRate,
  departmentId,
  id,
}) {
  const value = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    date_of_birth: dob,
    department_title: department,
    hourly_rate: hourlyRate,
    department_id: departmentId,
  };
  console.log("value put emp::: ", value);
  return axios({
    url: `/employees/${id}`,
    method: "PUT",
    headers: { "x-access-token": authenticationService.currentUserValue.token },
    data: {
      first_name: firstName,
      last_name: lastName,
      email: email,
      date_of_birth: dob,
      department_title: department,
      hourly_rate: hourlyRate,
      department_id: departmentId,
    },
    ...config,
  }).then((response) => {
    return response;
  });
}

function addEmployee({
  firstName,
  lastName,
  email,
  dob,
  department,
  hourlyRate,
  departmentId,
}) {
  return axios({
    url: "/employees",
    method: "POST",
    headers: { "x-access-token": authenticationService.currentUserValue.token },
    data: {
      first_name: firstName,
      last_name: lastName,
      email: email,
      date_of_birth: dob,
      department_title: department,
      hourly_rate: hourlyRate,
      department_id: departmentId,
    },
    ...config,
  }).then((response) => {
    return response;
  });
}

function deleteEmployee(employeeID) {
  return axios({
    url: `/employees/${employeeID}`,
    method: "DELETE",
    headers: { "x-access-token": authenticationService.currentUserValue.token },
    ...config,
  }).then((response) => {
    return response;
  });
}

function addDepartment({ numEmployees, departmentTitle }) {
  return axios({
    url: "/departments",
    method: "POST",
    headers: { "x-access-token": authenticationService.currentUserValue.token },
    data: {
      no_of_employees: numEmployees,
      department_title: departmentTitle,
    },
    ...config,
  }).then((response) => {
    return response;
  });
}
function getDepartments() {
  // console.log(`SALARYYY\n\n\n${getBonusCuts()}`);
  return axios({
    url: "/departments",
    method: "GET",
    headers: { "x-access-token": authenticationService.currentUserValue.token },
    ...config,
  }).then((response) => {
    return response.data;
  });
}

function editDepartment({ numEmployees, id, departmentTitle }) {
  console.log("value put id dep::: ", id);
  return axios({
    url: `/departments/${id}`,
    method: "PUT",
    headers: { "x-access-token": authenticationService.currentUserValue.token },
    data: {
      no_of_employees: numEmployees,
      department_title: departmentTitle,
    },
    ...config,
  }).then((response) => {
    return response;
  });
}

function deleteDepartment(depId) {
  return axios({
    url: `/departments/${depId}`,
    method: "DELETE",
    headers: { "x-access-token": authenticationService.currentUserValue.token },
    ...config,
  }).then((response) => {
    return response;
  });
}

function addBonus(bonus) {
  return axios({
    url: "/bonus",
    method: "POST",
    headers: {
      "x-access-token": authenticationService.currentUserValue.token,
    },
    data: {
      employee_id: bonus.employeeId,
      date: bonus.date,
      amount: bonus.amount,
      remark: bonus.remark,
    },
    ...config,
  }).then((response) => {
    return response;
  });
}

function addAttendance(attendance) {
  return axios({
    url: "/attendance",
    method: "POST",
    headers: {
      "x-access-token": authenticationService.currentUserValue.token,
    },
    data: {
      employee_id: attendance.employeeId,
      work_time: attendance.hoursWorked,
      date: new Date(),
    },
    ...config,
  }).then((response) => {
    return response;
  });
}

function getSalary(employee_id) {
  return axios({
    url: `/salary/${employee_id}`,
    method: "GET",
    headers: { "x-access-token": authenticationService.currentUserValue.token },
    ...config,
  }).then((response) => {
    return response;
  });
}

// function getBonusCuts() {
//   // console.log(`SALARYYY\n\n\n${getSalary(34)}`)
//   return axios({
//     url: "/bonus_cuts",
//     method: "GET",
//     headers: { "x-access-token": authenticationService.currentUserValue.token },
//     ...config,
//   }).then((response) => {
//     console.log(response.data);
//   });
// }

console.log("I AM IN DATA.SERVICE.JS");

function test_bonuscuts() {}
