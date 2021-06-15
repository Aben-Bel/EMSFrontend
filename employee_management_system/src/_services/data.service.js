import { authenticationService } from "./authentication.service";
import axios from "axios";

export const dataService = {
  getEmployees,
  getDepartments,
  addBonus,
  addAttendance,
};

// let token =
//   (JSON.parse(localStorage.getItem("currentUser")) &&
//     JSON.parse(localStorage.getItem("currentUser")).token) ||
//   " ";

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Do something with response error
    console.log("Error: ", error.response);
    try {
      if (
        error.response ||
        error.response.data.message === "Token is invalid"
      ) {
        authenticationService.logout();
      }
    } catch {}

    return Promise.reject(error);
  }
);

let config = {
  baseURL: "http://127.0.0.1:5000/",
};

function getEmployees(username, password) {
  return axios({
    url: "/employees",
    method: "GET",
    headers: { "x-access-token": authenticationService.currentUserValue.token },
    ...config,
  }).then((response) => {
    return response.data;
  });
}
function getBonusCuts() {
  // console.log(`SALARYYY\n\n\n${getSalary(34)}`)
  return axios({
    url: "/bonus_cuts",
    method: "GET",
    headers: { "x-access-token": authenticationService.currentUserValue.token },
    ...config,
  }).then((response) => {
    console.log(response.data);
  });
}
function getSalary(employee_id) {
  return axios({
    url: "/salary",
    method: "GET",
    headers: { "x-access-token": authenticationService.currentUserValue.token },
    ...config,
  }).then((response) => {
    console.log(response.data);
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

console.log("I AM IN DATA.SERVICE.JS");

function test_bonuscuts() {}
