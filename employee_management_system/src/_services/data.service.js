import { authenticationService } from "./authentication.service";
import axios from "axios";
import React from "react";
import { Role } from "../_helpers/role";

export const dataService = {
  getEmployees,
  getDepartments,
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
  console.log(`SALARYYY\n\n\n${getBonusCuts()}`);
  return axios({
    url: "/departments",
    method: "GET",
    headers: { "x-access-token": authenticationService.currentUserValue.token },
    ...config,
  }).then((response) => {
    return response.data;
  });
}

console.log("I AM IN DATA.SERVICE.JS");
